/*
 * מנוע התזונה — לב האפליקציה.
 * מחשב יעד קלורי + מאקרו לפי נוסחה מקצועית לכל תזונה,
 * ומרכיב יום שלם מארוחות אמיתיות מתוך מאגר הארוחות (meals.js).
 */

// מקדמי רמת פעילות (מכפילים את ה-BMR ל-TDEE)
const ACTIVITY_FACTORS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

// מטא-דאטה של סוגי התזונה + נוסחת היעדים לכל אחת
const DIETS = {
  chittuv: {
    name: 'תזונה לחיטוב',
    ready: true, // מאגר הארוחות נבנה
    // נוסחה שאושרה: גירעון 20%, חלבון 2.2 ג'/ק"ג, שומן 0.9 ג'/ק"ג, פחמימה = הנותר
    targets(profile, tdee) {
      const calories = Math.round(tdee * 0.80);
      const protein = Math.round(2.2 * profile.weight);
      const fat = Math.round(0.9 * profile.weight);
      const carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));
      return { calories, protein, carbs, fat };
    },
  },
  masa: {
    name: 'תזונה למסה',
    ready: true, // מאגר הארוחות נבנה
    // נוסחה שאושרה: עודף 15%, חלבון 2.0 ג'/ק"ג, שומן 1.0 ג'/ק"ג, פחמימה = הנותר
    targets(profile, tdee) {
      const calories = Math.round(tdee * 1.15);
      const protein = Math.round(2.0 * profile.weight);
      const fat = Math.round(1.0 * profile.weight);
      const carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));
      return { calories, protein, carbs, fat };
    },
  },
  // תזונה בריאותית: תחזוקה (0% התאמה), 25% חלבון / 45% פחמימה / 30% שומן — יחס מאוזן ים-תיכוני.
  // מיועדת לאיזון ובריאות כללית, לא לירידה/עלייה במשקל — לכן ברירת המחדל היא בלי ספירת קלוריות.
  health: { name: 'תזונה בריאותית', ready: true, defaultNoCounting: true, targets: pctTargets(0, 0.25, 0.45, 0.30) },
  // קיטו סטנדרטי (SKD): תחזוקה (0% התאמה), 20% חלבון / 10% פחמימה / 70% שומן
  keto: { name: 'תזונה קטוגנית', ready: true, targets: pctTargets(0, 0.20, 0.10, 0.70) },
};

// נוסחת ברירת מחדל מבוססת אחוזים (לתזונות שעדיין לא אופיינו לעומק)
function pctTargets(adjust, p, c, f) {
  return function (profile, tdee) {
    const calories = Math.round(tdee * (1 + adjust));
    return {
      calories,
      protein: Math.round((calories * p) / 4),
      carbs: Math.round((calories * c) / 4),
      fat: Math.round((calories * f) / 9),
    };
  };
}

// חלוקת הקלוריות היומית בין 5 הארוחות
// emoji כאן הוא מפתח לאייקון SVG מותאם (ראו MEAL_ICONS ב-app.js), לא תו אימוג'י
const MEAL_SLOTS = [
  { key: 'breakfast', name: 'ארוחת בוקר', share: 0.25, emoji: 'sunrise' },
  { key: 'snack1', name: 'ארוחת ביניים', share: 0.10, emoji: 'fruit' },
  { key: 'lunch', name: 'ארוחת צהריים', share: 0.30, emoji: 'plate' },
  { key: 'snack2', name: 'חטיף', share: 0.10, emoji: 'nuts' },
  { key: 'dinner', name: 'ארוחת ערב', share: 0.25, emoji: 'moon' },
];

/* ---------- חישוב יעדים ---------- */

// נוסחת Mifflin-St Jeor — הסטנדרט המקצועי לחישוב BMR
function calcBMR({ gender, weight, height, age }) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

function calcTargets(profile) {
  const bmr = calcBMR(profile);
  const tdee = bmr * (ACTIVITY_FACTORS[profile.activity] || 1.2);
  const diet = DIETS[profile.diet];
  const t = diet.targets(profile, tdee);
  return { bmr: Math.round(bmr), tdee: Math.round(tdee), ...t };
}

/* ---------- אקראיות דטרמיניסטית (אותו יום = אותו תפריט) ---------- */

function seededRandom(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ---------- סינון מאגר הארוחות ---------- */

function mealsFor(slot, profile) {
  return MEALS.filter((m) => {
    if (m.slot !== slot) return false;
    if (!m.diets.includes(profile.diet)) return false;
    if (profile.prefs.includes('vegan') && !m.tags.includes('vegan')) return false;
    if (profile.prefs.includes('vegetarian') && !m.tags.includes('veg')) return false;
    if ((profile.allergens || []).some((a) => m.tags.includes(a))) return false;
    return true;
  });
}

/* ---------- כיוונון מנה ליעד קלורי ---------- */

const SINGULAR = { 'ביצים': 'ביצה', 'חלבונים': 'חלבון', 'פרוסות': 'פרוסה', 'יחידות': 'יחידה', 'כפות': 'כף', 'סקופים': 'סקופ' };

function roundGrams(g) {
  if (g < 20) return Math.max(1, Math.round(g)); // כמויות קטנות — דיוק לגרם
  return Math.round(g / 5) * 5; // כמויות גדולות — עיגול ל-5 גרם
}

// עיגול ספירת יחידות: שלמות/חצי לביצים ופרוסות, רבעים לשאר
const HALF_UNITS = ['ביצים', 'חלבונים', 'פרוסה', 'פרוסות'];
function roundCount(c, unit) {
  return HALF_UNITS.includes(unit) ? Math.max(0.5, Math.round(c * 2) / 2) : Math.max(0.25, Math.round(c * 4) / 4);
}

function fmtNum(n) {
  if (Number.isInteger(n)) return String(n);
  const frac = { 0.25: '¼', 0.5: '½', 0.75: '¾' };
  const whole = Math.floor(n);
  const rem = +(n - whole).toFixed(2);
  if (frac[rem]) return whole ? `${whole}${frac[rem]}` : frac[rem];
  return String(+n.toFixed(2));
}

// בונה את שני תיאורי הכמות (עם ספירה = גרמים/מ"ל מדויקים, בלי ספירה = תיאור ביתי)
function ingredientAmount(ing, s) {
  if (ing.season) {
    const t = ing.home || 'לפי הטעם';
    return { counting: t, home: t };
  }
  const grams = roundGrams(ing.grams * s);
  const weightUnit = ing.liquid ? 'מ"ל' : 'גרם';
  let counting;
  if (ing.count) {
    const c = roundCount(ing.count * s, ing.unit);
    const label = c === 1 && SINGULAR[ing.unit] ? SINGULAR[ing.unit] : ing.unit;
    counting = `${fmtNum(c)} ${label} · ${grams} ${ing.liquid ? 'מ"ל' : "ג'"}`;
  } else {
    counting = `${grams} ${weightUnit}`;
  }
  return { counting, home: ing.home || counting };
}

// מרכיב את מנת הארוחה המכווננת לפי מקדם s (לפי יעד קלורי)
function scaleMeal(meal, targetKcal) {
  const baseKcal = meal.ingredients.reduce((s, i) => s + i.kcal, 0);
  const s = clamp(targetKcal / baseKcal, 0.6, 1.6);

  const items = meal.ingredients.map((ing) => {
    const amt = ingredientAmount(ing, s);
    return {
      name: ing.name,
      amountText: amt.counting,
      homeText: amt.home,
      kcal: Math.round(ing.kcal * s),
      protein: +(ing.protein * s).toFixed(1),
      carbs: +(ing.carbs * s).toFixed(1),
      fat: +(ing.fat * s).toFixed(1),
    };
  });

  const totals = sumItems(items);
  return { id: meal.id, name: meal.name, steps: meal.steps, items, totals };
}

function sumItems(items) {
  return items.reduce(
    (acc, it) => ({
      kcal: acc.kcal + it.kcal,
      protein: +(acc.protein + it.protein).toFixed(1),
      carbs: +(acc.carbs + it.carbs).toFixed(1),
      fat: +(acc.fat + it.fat).toFixed(1),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

/* ---------- יצירת תפריט יומי מלא ---------- */

// מזהה "משפחת מזון" של ארוחה לפי שם המנה — משמש למניעת חזרתיות באותו יום
// (למשל: לא יוגורט גם בבוקר וגם בארוחת הביניים)
const FOOD_FAMILIES = [
  ['yogurt', 'יוגורט'], ['egg', 'ביצ'], ['shake', 'שייק'], ['chicken', 'עוף'],
  ['turkey', 'הודו'], ['beef', 'בקר'], ['lamb', 'טלה'], ['salmon', 'סלמון'],
  ['tuna', 'טונה'], ['cottage', 'קוטג'], ['cheese', 'גבינ'], ['nuts', 'אגוז'],
  ['sandwich', 'כריך'], ['pasta', 'פסטה'], ['rice', 'אורז'], ['avocado', 'אבוקדו'],
];
function foodFamily(meal) {
  for (const [key, heb] of FOOD_FAMILIES) {
    if (meal.name.includes(heb)) return key;
  }
  return meal.id; // אין התאמה — נחשבת ייחודית
}

// בונה שילוב יום אחד (מנה לכל ארוחה) לפי בחירה אקראית, תוך הימנעות מחזרה
// על אותה משפחת מזון פעמיים באותו יום (כשיש חלופה זמינה)
function buildCombination(profile, targets, rnd) {
  const usedFamilies = new Set();
  const meals = MEAL_SLOTS.map((slot) => {
    const candidates = mealsFor(slot.key, profile);
    if (!candidates.length) return { emoji: slot.emoji, slotName: slot.name, empty: true };
    const fresh = candidates.filter((m) => !usedFamilies.has(foodFamily(m)));
    const pool = fresh.length ? fresh : candidates;
    const chosen = pool[Math.floor(rnd() * pool.length)];
    usedFamilies.add(foodFamily(chosen));
    const scaled = scaleMeal(chosen, targets.calories * slot.share);
    return { emoji: slot.emoji, slotName: slot.name, ...scaled };
  });
  const dayTotals = sumItems(meals.filter((m) => !m.empty).flatMap((m) => m.items));
  return { meals, dayTotals };
}

// מודד כמה שילוב רחוק מיעדי המאקרו (הקלוריות תמיד כמעט מדויקות)
function macroError(totals, targets) {
  return Math.abs(totals.protein - targets.protein)
    + Math.abs(totals.carbs - targets.carbs)
    + Math.abs(totals.fat - targets.fat);
}

function generateDailyMenu(profile, targets, dayOffset = 0) {
  const diet = DIETS[profile.diet];
  if (!diet.ready) return { ready: false, dietName: diet.name };

  // זרע לפי היום — כל יום מקבל שילוב אחר אך יציב
  const rnd = seededRandom(1000 + dayOffset * 97);

  // בוחנים כמה שילובים ובוחרים את זה שהכי קרוב לכל יעדי המאקרו
  let best = null;
  let bestErr = Infinity;
  for (let i = 0; i < 18; i++) {
    const combo = buildCombination(profile, targets, rnd);
    const err = macroError(combo.dayTotals, targets);
    if (err < bestErr) { bestErr = err; best = combo; }
  }

  return { ready: true, meals: best.meals, dayTotals: best.dayTotals };
}

// מתכון הקינוח השבועי — מתחלף פעם בשבוע. מוצג בגודל מנה מלא (בלי כיוונון),
// כי זה מתכון להכנה מראש שאפשר לשלב ביומיום.
function weeklyDessert(profile) {
  const candidates = mealsFor('dessert', profile);
  if (!candidates.length) return null;
  const week = Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
  const rnd = seededRandom(555 + week);
  const chosen = candidates[Math.floor(rnd() * candidates.length)];
  const baseKcal = chosen.ingredients.reduce((sum, i) => sum + i.kcal, 0);
  return { ...scaleMeal(chosen, baseKcal), yield: chosen.yield, serving: chosen.serving };
}

// מתכון מאפה שבועי (למשל לחם קיטו) — אותה לוגיקה כמו הקינוח השבועי
function weeklyBakery(profile) {
  const candidates = mealsFor('bakery', profile);
  if (!candidates.length) return null;
  const week = Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
  const rnd = seededRandom(999 + week);
  const chosen = candidates[Math.floor(rnd() * candidates.length)];
  const baseKcal = chosen.ingredients.reduce((sum, i) => sum + i.kcal, 0);
  return { ...scaleMeal(chosen, baseKcal), yield: chosen.yield, serving: chosen.serving };
}

/* ---------- רשימת קניות שבועית ---------- */

// מצרף את כל המרכיבים מ-7 ימי התפריט (החל מ-startDay) + הקינוח והמאפה השבועיים,
// מנרמל שמות כפולים, ומחזיר {name: {grams, liquid, isEgg}} מוכן לסיווג ותיוג מותג (ב-brands.js)
function buildWeeklyShoppingList(profile, targets, startDay = 0) {
  const totals = {};
  const add = (rawName, grams, liquid, isEggUnit) => {
    const key = SHOPPING_NORMALIZE[rawName] || rawName;
    if (!totals[key]) totals[key] = { grams: 0, liquid: !!liquid, isEgg: key === 'ביצים' };
    totals[key].grams += grams;
  };

  for (let d = startDay; d < startDay + 7; d++) {
    const menu = generateDailyMenu(profile, targets, d);
    if (!menu.ready) continue;
    menu.meals.forEach((m) => {
      if (m.empty) return;
      const rawMeal = MEALS.find((x) => x.id === m.id);
      const baseKcal = rawMeal.ingredients.reduce((s, i) => s + i.kcal, 0);
      const scale = baseKcal > 0 ? m.totals.kcal / baseKcal : 1;
      rawMeal.ingredients.forEach((ing) => {
        if (ing.season) return;
        add(ing.name, ing.grams * scale, ing.liquid, ing.unit === 'ביצים');
      });
    });
  }

  [weeklyDessert(profile), weeklyBakery(profile)].forEach((rec) => {
    if (!rec) return;
    const rawMeal = MEALS.find((x) => x.id === rec.id);
    rawMeal.ingredients.forEach((ing) => {
      if (ing.season) return;
      add(ing.name, ing.grams, ing.liquid, ing.unit === 'ביצים');
    });
  });

  return totals;
}
