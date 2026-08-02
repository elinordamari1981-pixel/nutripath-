/*
 * לוגיקת הממשק — קושר בין הטפסים למנוע התזונה ומציג את התפריט.
 */

const STORAGE_KEY = 'tezuna_profile';
const SHOPPING_CHECKED_KEY = 'tezuna_shopping_checked';
let profile = null;
let targets = null;
let currentDay = 0; // 0 = היום, -1 = אתמול, 1 = מחר

const $ = (sel) => document.querySelector(sel);

function loadShoppingChecked() {
  try { return JSON.parse(localStorage.getItem(SHOPPING_CHECKED_KEY)) || {}; } catch (e) { return {}; }
}
function saveShoppingChecked(state) {
  try { localStorage.setItem(SHOPPING_CHECKED_KEY, JSON.stringify(state)); } catch (e) { /* התעלמות */ }
}
function toggleShoppingItem(input) {
  const state = loadShoppingChecked();
  const name = input.dataset.ingredient;
  if (input.checked) state[name] = true; else delete state[name];
  saveShoppingChecked(state);
  document.getElementById('row-' + input.id).classList.toggle('sl-checked', input.checked);
}
function markAllShoppingPurchased() {
  const state = loadShoppingChecked();
  document.querySelectorAll('#week-shopping input[type=checkbox]').forEach((cb) => {
    cb.checked = true;
    state[cb.dataset.ingredient] = true;
    document.getElementById('row-' + cb.id).classList.add('sl-checked');
  });
  saveShoppingChecked(state);
}

// אייקוני SVG לארוחות — צבע יורש מ-CSS (currentColor), תואם לפלטת המותג במקום אימוג'ים צבעוניים
const MEAL_ICONS = {
  sunrise: '<circle cx="12" cy="13" r="4.2"/><line x1="12" y1="5" x2="12" y2="7.3"/><line x1="4.5" y1="19" x2="19.5" y2="19"/><line x1="6.5" y1="8.5" x2="8" y2="10"/><line x1="17.5" y1="8.5" x2="16" y2="10"/>',
  fruit: '<circle cx="12" cy="13.5" r="5.5"/><path d="M12 8c0-2 1.2-3 2.5-3.4"/>',
  plate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/>',
  nuts: '<circle cx="9" cy="12" r="4"/><circle cx="15.4" cy="12" r="3.4"/>',
  moon: '<path d="M19 13.5A7.5 7.5 0 1 1 10.5 5 6 6 0 0 0 19 13.5Z" fill="currentColor" stroke="none"/>',
};
function mealIcon(key) {
  const paths = MEAL_ICONS[key] || '';
  return `<svg class="meal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">${paths}</svg>`;
}

const DIFFICULTY_LABELS = { 1: 'קל', 2: 'בינוני', 3: 'מתקדם' };
function difficultyStars(level) {
  return '⭐'.repeat(level) + ' ' + (DIFFICULTY_LABELS[level] || '');
}

/* ---------- "למה הארוחה הזו?" — הסבר דינמי לפי המאקרו בפועל מול היעד ---------- */
function mealExplanation(meal, slotDef) {
  const proteinPct = Math.round((meal.totals.protein / targets.protein) * 100);
  const kcalTargetForSlot = targets.calories * slotDef.share;
  const kcalPct = Math.round((meal.totals.kcal / kcalTargetForSlot) * 100);

  if (profile.diet === 'keto') {
    return `נבחרה כי היא דלת פחמימות (${meal.totals.carbs} גר' בלבד) ותורמת כ-${proteinPct}% מיעד החלבון היומי שלך, בלי לחרוג ממסגרת הקלוריות שהוקצתה לארוחה זו (כ-${kcalPct}% ממנה).`;
  }
  if (profile.diet === 'chittuv' || profile.diet === 'masa') {
    return `נבחרה כי היא מספקת ${meal.totals.protein} גר' חלבון (כ-${proteinPct}% מהיעד היומי שלך), ומתאימה לכ-${kcalPct}% מהקלוריות שהוקצו לארוחה זו.`;
  }
  return `נבחרה כי היא שומרת על איזון בין חלבון, פחמימה ושומן בהתאם לתפריט המאוזן שלך, ומתאימה לכ-${kcalPct}% מהקלוריות שהוקצו לארוחה זו.`;
}

/* ---------- מפתח תאריך יומי — משותף להחלפת ארוחות ומעקב השלמה ---------- */
function dateKeyForDay(dayOffset) {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return d.toISOString().slice(0, 10);
}

/* ---------- מעקב השלמת ארוחות ---------- */
const MEAL_DONE_KEY = 'tezuna_meal_done';
function loadMealDone() {
  try { return JSON.parse(localStorage.getItem(MEAL_DONE_KEY)) || {}; } catch (e) { return {}; }
}
function saveMealDone(state) {
  try { localStorage.setItem(MEAL_DONE_KEY, JSON.stringify(state)); } catch (e) { /* התעלמות */ }
}
function toggleMealDone(slotKey, checked) {
  const state = loadMealDone();
  const dateKey = dateKeyForDay(currentDay);
  if (!state[dateKey]) state[dateKey] = {};
  if (checked) state[dateKey][slotKey] = true; else delete state[dateKey][slotKey];
  saveMealDone(state);
  renderProgress();
}
function renderProgress() {
  const rawMenu = generateDailyMenu(profile, targets, currentDay);
  if (!rawMenu.ready) { $('#progress-label').textContent = ''; $('#progress-fill').style.width = '0%'; return; }
  const totalSlots = rawMenu.meals.filter((m) => !m.empty).length;
  const doneForDay = loadMealDone()[dateKeyForDay(currentDay)] || {};
  const doneCount = MEAL_SLOTS.filter((s, i) => !rawMenu.meals[i].empty && doneForDay[s.key]).length;
  $('#progress-label').textContent = `${doneCount} מתוך ${totalSlots} ארוחות הושלמו`;
  $('#progress-fill').style.width = totalSlots ? `${(doneCount / totalSlots) * 100}%` : '0%';
}

/* ---------- החלפת ארוחה בודדת ---------- */
const MEAL_OVERRIDES_KEY = 'tezuna_meal_overrides';
function loadMealOverrides() {
  try { return JSON.parse(localStorage.getItem(MEAL_OVERRIDES_KEY)) || {}; } catch (e) { return {}; }
}
function saveMealOverrides(state) {
  try { localStorage.setItem(MEAL_OVERRIDES_KEY, JSON.stringify(state)); } catch (e) { /* התעלמות */ }
}

// בונה עותק של התפריט עם החלפות ידניות (אם קיימות ליום זה), ומחשב מחדש את סיכום המאקרו היומי.
// לא ממש את אובייקט ה-menu המוחזר מ-generateDailyMenu — הוא שמור ב-memo הפנימי ואסור לשנות אותו במקום.
function applyMealOverrides(rawMenu, dayOffset) {
  if (!rawMenu.ready) return rawMenu;
  const overridesForDay = loadMealOverrides()[dateKeyForDay(dayOffset)] || {};
  const meals = rawMenu.meals.map((m, i) => {
    const slotDef = MEAL_SLOTS[i];
    const overrideId = overridesForDay[slotDef.key];
    if (!overrideId) return m;
    const rawMeal = MEALS.find((x) => x.id === overrideId);
    if (!rawMeal) return m;
    const scaled = scaleMeal(rawMeal, targets.calories * slotDef.share);
    return { emoji: slotDef.emoji, slotName: slotDef.name, ...scaled };
  });
  const dayTotals = sumItems(meals.filter((m) => !m.empty).flatMap((m) => m.items));
  return { ...rawMenu, meals, dayTotals };
}

function replaceMeal(slotIndex) {
  const slotDef = MEAL_SLOTS[slotIndex];
  const rawMenu = generateDailyMenu(profile, targets, currentDay);
  const originalMeal = rawMenu.meals[slotIndex];
  if (!rawMenu.ready || !originalMeal || originalMeal.empty) return;

  const dateKey = dateKeyForDay(currentDay);
  const overrides = loadMealOverrides();
  if (!overrides[dateKey]) overrides[dateKey] = {};
  const dayOverrides = overrides[dateKey];

  // history = כל המנות שכבר הוצגו בסלוט הזה היום (המקורית + כל ההחלפות) — נמנעים מלחזור עליהן
  const historyKey = slotDef.key + '_history';
  const history = dayOverrides[historyKey] || [originalMeal.id];
  const currentId = history[history.length - 1];
  const targetKcalShare = targets.calories * slotDef.share;
  const currentScaled = scaleMeal(MEALS.find((m) => m.id === currentId), targetKcalShare);

  let pool = mealsFor(slotDef.key, profile).filter((m) => !history.includes(m.id));
  if (!pool.length) pool = mealsFor(slotDef.key, profile).filter((m) => m.id !== currentId);
  if (!pool.length) return;

  // הימנעות נוספת ממנות שהופיעו לאותו סלוט ב-3 הימים האחרונים, כשיש חלופה
  const recentIds = new Set();
  for (let back = 1; back <= 3; back++) {
    const prevMenu = generateDailyMenu(profile, targets, currentDay - back);
    const prevMeal = prevMenu.ready ? prevMenu.meals[slotIndex] : null;
    if (prevMeal && !prevMeal.empty) recentIds.add(prevMeal.id);
  }
  const notRecent = pool.filter((m) => !recentIds.has(m.id));
  const finalPool = notRecent.length ? notRecent : pool;

  // בוחרים את המנה עם המאקרו הכי דומה למנה המוצגת כרגע (אחרי כיוונון לאותו יעד קלורי)
  let best = null;
  let bestErr = Infinity;
  finalPool.forEach((m) => {
    const scaled = scaleMeal(m, targetKcalShare);
    const err = Math.abs(scaled.totals.protein - currentScaled.totals.protein)
      + Math.abs(scaled.totals.carbs - currentScaled.totals.carbs)
      + Math.abs(scaled.totals.fat - currentScaled.totals.fat);
    if (err < bestErr) { bestErr = err; best = m; }
  });
  if (!best) return;

  dayOverrides[slotDef.key] = best.id;
  dayOverrides[historyKey] = [...history, best.id];
  saveMealOverrides(overrides);

  renderMenu();
}

/* ---------- ניווט בין מסכים ---------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  $('#' + id).classList.add('active');
  window.scrollTo(0, 0);
}

/* ---------- טעינת פרופיל שמור ---------- */
function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* התעלמות */ }
  return null;
}

function saveProfile(p) {
  p.updatedAt = new Date().toISOString();
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) { /* התעלמות */ }
}

// כשבוחרים תזונה בריאותית, ברירת המחדל היא בלי ספירת קלוריות (התזונה מיועדת לאיזון, לא למעקב)
document.querySelectorAll('#diet-grid input[name=diet]').forEach((input) => {
  input.addEventListener('change', () => {
    const diet = DIETS[input.value];
    const counting = $('#profile-form').showCounting;
    counting.checked = !diet.defaultNoCounting;
  });
});

/* ---------- אשף שאלות ההרשמה (quiz) ---------- */
const quizForm = $('#profile-form');
const quizSteps = Array.from(quizForm.querySelectorAll('.quiz-step'));
const QUIZ_TOTAL = quizSteps.length;
let quizStep = 1;

function showQuizStep(n) {
  quizStep = Math.max(1, Math.min(QUIZ_TOTAL, n));
  quizSteps.forEach((s) => s.classList.toggle('active', +s.dataset.step === quizStep));
  $('#quiz-progress-fill').style.width = `${(quizStep / QUIZ_TOTAL) * 100}%`;
  $('#quiz-step-label').textContent = `שאלה ${quizStep} מתוך ${QUIZ_TOTAL}`;
  $('#quiz-back').hidden = quizStep === 1;
  const isLast = quizStep === QUIZ_TOTAL;
  $('#quiz-next').hidden = isLast;
  $('#quiz-submit').hidden = !isLast;
}

function currentStepValid() {
  const step = quizSteps[quizStep - 1];
  const requiredInputs = Array.from(step.querySelectorAll('[required]'));
  // עבור קבוצת radio מספיק שאחד מסומן — לא צריך שכולם יעברו checkValidity בנפרד
  const seenRadioGroups = new Set();
  for (const input of requiredInputs) {
    if (input.type === 'radio') {
      if (seenRadioGroups.has(input.name)) continue;
      seenRadioGroups.add(input.name);
      const group = step.querySelectorAll(`input[name="${input.name}"]`);
      if (!Array.from(group).some((r) => r.checked)) { input.reportValidity(); return false; }
      continue;
    }
    if (!input.checkValidity()) { input.reportValidity(); return false; }
  }
  return true;
}

$('#quiz-next').addEventListener('click', () => {
  if (!currentStepValid()) return;
  showQuizStep(quizStep + 1);
});
$('#quiz-back').addEventListener('click', () => showQuizStep(quizStep - 1));
showQuizStep(1);

/* ---------- שליחת טופס ההרשמה ---------- */
quizForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentStepValid()) return;
  const fd = new FormData(e.target);
  const weightGoalRaw = fd.get('weightGoal');
  const workoutsRaw = fd.get('workoutsPerWeek');
  profile = {
    firstName: fd.get('firstName').trim(),
    lastName: fd.get('lastName').trim(),
    age: +fd.get('age'),
    gender: fd.get('gender'),
    weight: +fd.get('weight'),
    height: +fd.get('height'),
    weightGoal: weightGoalRaw ? +weightGoalRaw : null,
    activity: fd.get('activity'),
    workoutsPerWeek: workoutsRaw ? +workoutsRaw : null,
    diet: fd.get('diet'),
    prefs: fd.getAll('prefs'),
    allergens: fd.getAll('allergens'),
    showCounting: fd.get('showCounting') === 'on',
  };
  saveProfile(profile);
  targets = calcTargets(profile);
  currentDay = 0;
  renderMenu();
  showScreen('screen-menu');
});

/* ---------- כפתורי ניווט במסך התפריט ---------- */
$('#btn-edit').addEventListener('click', () => {
  prefillForm(profile);
  showScreen('screen-onboarding');
});
$('#btn-quick-meals').addEventListener('click', () => {
  profile.quickMeals = !profile.quickMeals;
  saveProfile(profile);
  renderMenu();
});
$('#prev-day').addEventListener('click', () => { currentDay--; renderMenu(); });
$('#next-day').addEventListener('click', () => { currentDay++; renderMenu(); });

/* ---------- מסך תצוגה שבועית + רשימת קניות ---------- */
$('#btn-open-week').addEventListener('click', () => {
  renderWeekScreen();
  showScreen('screen-week');
});
$('#btn-back-to-menu').addEventListener('click', () => showScreen('screen-menu'));

document.querySelectorAll('.week-tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.week-tab').forEach((b) => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.week-panel').forEach((p) => p.classList.remove('active'));
    $('#week-' + btn.dataset.tab).classList.add('active');
  });
});

function renderWeekScreen() {
  $('#week-diet-badge').textContent = DIETS[profile.diet].name;
  renderWeekDays();
  renderWeekShopping();
}

function renderWeekDays() {
  const el = $('#week-days');
  const showC = profile.showCounting;
  const today = new Date();
  const rows = [];
  for (let d = 0; d < 7; d++) {
    const menu = generateDailyMenu(profile, targets, d);
    if (!menu.ready) { rows.push(`<div class="footer-note">תפריטי ${menu.dietName} בבנייה — בקרוב!</div>`); break; }
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dayName = date.toLocaleDateString('he-IL', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' });
    const mealLines = menu.meals.filter((m) => !m.empty).map((m) => {
      const kcalTag = showC ? `<span class="wd-kcal">${m.totals.kcal} קק"ל</span>` : '';
      return `<div class="wd-meal"><span>${mealIcon(m.emoji)} ${m.name}</span>${kcalTag}</div>`;
    }).join('');
    rows.push(`
      <details class="week-day-card" ${d === 0 ? 'open' : ''}>
        <summary><span>${d === 0 ? 'היום · ' : ''}${dayName}, ${dateStr}</span><span class="chev">▾</span></summary>
        <div class="wd-meals">${mealLines}</div>
      </details>`);
  }
  el.innerHTML = rows.join('');
}

function renderWeekShopping() {
  const el = $('#week-shopping');
  const showC = profile.showCounting;
  const totals = buildWeeklyShoppingList(profile, targets, 0);

  const byCat = {};
  Object.entries(totals).forEach(([name, info]) => {
    const { brand, cat } = classifyIngredient(name);
    if (!byCat[cat]) byCat[cat] = [];
    byCat[cat].push({ name, brand, qty: formatShoppingQty(info) });
  });
  Object.values(byCat).forEach((list) => list.sort((a, b) => a.name.localeCompare(b.name, 'he')));

  const totalItems = Object.values(byCat).reduce((s, l) => s + l.length, 0);
  const checkedState = loadShoppingChecked();
  const categoriesHtml = SHOPPING_CAT_ORDER.filter((c) => byCat[c]).map((c) => {
    const items = byCat[c].map((item, i) => {
      const noBrand = item.brand.includes('ללא מותג');
      const brandHtml = noBrand
        ? `<span class="sl-nobrand">${item.brand}</span>`
        : `מותג: <span class="sl-tag">${item.brand}</span>`;
      const id = `sl-${c}-${i}`;
      const isChecked = !!checkedState[item.name];
      return `
        <div class="sl-item${isChecked ? ' sl-checked' : ''}" id="row-${id}">
          <input type="checkbox" id="${id}" data-ingredient="${item.name}" ${isChecked ? 'checked' : ''} onchange="toggleShoppingItem(this)" />
          <label for="${id}">
            <div class="sl-name">${item.name}</div>
            <div class="sl-brand">${brandHtml}</div>
          </label>
          <div class="sl-qty">${item.qty}</div>
        </div>`;
    }).join('');
    return `
      <details class="sl-category" open>
        <summary><span>${SHOPPING_CAT_LABELS[c]}</span><span class="n">${byCat[c].length}</span></summary>
        <div class="sl-list">${items}</div>
      </details>`;
  }).join('');

  el.innerHTML = `
    <div class="sl-meta-row">
      <div class="sl-meta">${totalItems} פריטים · שבוע שלם, מותאם אישית ליעדים שלך</div>
      <button type="button" class="btn-ghost" onclick="markAllShoppingPurchased()">✓ סמנו הכל כנקנה</button>
    </div>
    ${categoriesHtml}
    <div class="footer-note">💡 מותגים הם המלצות זמינות בסופרים בישראל — אפשר להחליף בכל מותג מקביל. בשר/דג טרי נקנים מהקצביה/דוכן הדגים ללא מותג ספציפי.</div>
  `;
}

/* ---------- מילוי הטופס מחדש בעריכה ---------- */
function prefillForm(p) {
  const f = $('#profile-form');
  f.firstName.value = p.firstName;
  f.lastName.value = p.lastName;
  f.age.value = p.age;
  const genderInput = f.querySelector(`input[name=gender][value=${p.gender}]`);
  if (genderInput) genderInput.checked = true;
  f.weight.value = p.weight;
  f.height.value = p.height;
  f.weightGoal.value = p.weightGoal || '';
  f.activity.value = p.activity;
  f.workoutsPerWeek.value = p.workoutsPerWeek || '';
  f.querySelector(`input[name=diet][value=${p.diet}]`).checked = true;
  f.querySelectorAll('input[name=prefs]').forEach((c) => { c.checked = p.prefs.includes(c.value); });
  f.querySelectorAll('input[name=allergens]').forEach((c) => { c.checked = (p.allergens || []).includes(c.value); });
  f.showCounting.checked = p.showCounting;
  showQuizStep(1);
}

/* ---------- הצגת התפריט ---------- */
/* ---------- אזהרות בטיחות: יעד קיצוני / קלוריות שהותאמו לרצפה בטוחה ---------- */
function renderSafetyWarnings() {
  const el = $('#safety-warnings');
  const messages = assessGoalSafety(profile);
  if (targets.safetyClamped) {
    messages.push(`יעד הקלוריות היומי חושב כנמוך מדי, ולכן הועלה לרמה בטוחה יותר (${targets.calories} קק"ל). לפני גירעון קלורי משמעותי כדאי להתייעץ עם דיאטן/ית קליני/ת או רופא/ה.`);
  }
  if (!messages.length) { el.innerHTML = ''; return; }
  el.innerHTML = messages.map((msg) => `<div class="footer-note disclaimer safety-warning">⚠️ ${msg}</div>`).join('');
}

function renderMenu() {
  const showC = profile.showCounting;
  $('#greeting').textContent = `שלום ${profile.firstName}`;
  $('#diet-badge').textContent = DIETS[profile.diet].name;
  $('#btn-quick-meals').classList.toggle('active', !!profile.quickMeals);
  renderSafetyWarnings();

  const rawMenu = generateDailyMenu(profile, targets, currentDay);
  const menu = applyMealOverrides(rawMenu, currentDay);
  const summary = $('#summary-bar');
  const mealsEl = $('#meals');
  const dessertEl = $('#dessert');
  const bakeryEl = $('#bakery');

  // תזונה שעדיין לא נבנתה
  if (!menu.ready) {
    summary.classList.add('hidden-counting');
    summary.innerHTML = `<div class="summary-cell"><div class="lbl">תפריטי <b>${menu.dietName}</b> בבנייה — בקרוב! כרגע מוכן תפריט חיטוב מלא. אפשר לשנות סוג תזונה ב"עריכת פרטים".</div></div>`;
    mealsEl.innerHTML = '';
    dessertEl.style.display = 'none';
    bakeryEl.style.display = 'none';
    return;
  }

  // שורת סיכום יומי
  if (showC) {
    summary.classList.remove('hidden-counting');
    summary.innerHTML = `
      <div class="summary-cell"><div class="val">${targets.calories}</div><div class="lbl">קלוריות ליום</div></div>
      <div class="summary-cell"><div class="val">${targets.protein}<small>ג'</small></div><div class="lbl">חלבון</div></div>
      <div class="summary-cell"><div class="val">${targets.carbs}<small>ג'</small></div><div class="lbl">פחמימה</div></div>
      <div class="summary-cell"><div class="val">${targets.fat}<small>ג'</small></div><div class="lbl">שומן</div></div>`;
  } else {
    summary.classList.add('hidden-counting');
    summary.innerHTML = `
      <div class="summary-cell"><div class="lbl">תפריט מותאם אישית ל${DIETS[profile.diet].name} — פשוט לבשל ולאכול לפי הארוחות, בלי לספור כלום 🌿</div></div>`;
  }

  // תווית יום — שם היום האמיתי בשבוע (ראשון-שבת), עם ציון "היום" כשרלוונטי
  const dayDate = new Date();
  dayDate.setDate(dayDate.getDate() + currentDay);
  const weekdayName = dayDate.toLocaleDateString('he-IL', { weekday: 'long' });
  $('#day-label').textContent = currentDay === 0 ? `היום · ${weekdayName}` : weekdayName;

  renderProgress();

  // ארוחות
  const doneForDay = loadMealDone()[dateKeyForDay(currentDay)] || {};
  mealsEl.innerHTML = menu.meals.map((meal, i) => renderMeal(meal, showC, i, !!doneForDay[MEAL_SLOTS[i].key])).join('');

  // מתכון הקינוח השבועי + מתכון המאפה השבועי (אותה תבנית תצוגה)
  renderWeeklyRecipe(dessertEl, weeklyDessert(profile), showC, '🍰', 'מתכון הקינוח השבועי');
  renderWeeklyRecipe(bakeryEl, weeklyBakery(profile), showC, '🍞', 'מתכון המאפה השבועי');
}

function renderWeeklyRecipe(el, recipe, showC, emoji, title) {
  if (!recipe) { el.style.display = 'none'; return; }
  const ings = recipe.items.map((it) => {
    const amt = showC ? it.amountText : it.homeText;
    return `<div class="d-ing"><span>${it.name}</span><span class="d-amt">${amt}</span></div>`;
  }).join('');
  const sv = recipe.serving;
  const servingLine = sv
    ? `מנה: ${sv.label}${showC ? ` · ${sv.kcal} קק"ל · חלבון ${sv.protein}ג' · פחמימה ${sv.carbs}ג' · שומן ${sv.fat}ג'` : ''}`
    : '';
  const steps = recipe.steps && recipe.steps.length
    ? `<details class="recipe"><summary>אופן הכנה 👩‍🍳</summary><ol>${recipe.steps.map((st) => `<li>${st}</li>`).join('')}</ol></details>`
    : '';
  el.innerHTML = `
    <h3>${emoji} ${title}</h3>
    <div class="name">${recipe.name}</div>
    <div class="d-yield">${recipe.yield || ''}${servingLine ? ' · ' + servingLine : ''}</div>
    <div class="d-ings">${ings}</div>
    ${steps}`;
  el.style.display = 'block';
}

function renderMeal(meal, showC, slotIndex, isDone) {
  if (meal.empty) {
    return `
      <div class="meal">
        <div class="meal-head"><div class="meal-title">${mealIcon(meal.emoji)} ${meal.slotName}</div></div>
        <div class="meal-empty">אין ארוחה שמתאימה להעדפות שבחרת בשלב זה עדיין 🙏</div>
      </div>`;
  }

  const items = meal.items.map((it) => {
    const amount = showC ? it.amountText : it.homeText;
    const macros = showC
      ? `<div class="food-macros">${it.kcal} קק"ל · <b>ח${it.protein}</b> פ${it.carbs} ש${it.fat}</div>`
      : '';
    return `
      <div class="food-item">
        <div>
          <div class="food-name">${it.name}</div>
          <div class="food-amount">${amount}</div>
        </div>
        ${macros}
      </div>`;
  }).join('');

  const steps = meal.steps && meal.steps.length
    ? `<details class="recipe"><summary>אופן הכנה 👩‍🍳</summary><ol>${meal.steps.map((s) => `<li>${s}</li>`).join('')}</ol></details>`
    : '';

  const kcalLine = showC
    ? `<span class="meal-kcal">${meal.totals.kcal} קק"ל · ח${meal.totals.protein} פ${meal.totals.carbs} ש${meal.totals.fat}</span>`
    : '';

  const metaLine = `
    <div class="meal-meta">
      <span class="meal-badge">⏱ ${meal.prepMinutes} דק'</span>
      <span class="meal-badge">${difficultyStars(meal.difficulty)}</span>
    </div>`;

  const slotDef = MEAL_SLOTS[slotIndex];
  const slotKey = slotDef.key;
  const whyMeal = `<details class="why-meal"><summary>💡 למה הארוחה הזו?</summary><p>${mealExplanation(meal, slotDef)}</p></details>`;
  return `
    <div class="meal${isDone ? ' meal-done' : ''}">
      <div class="meal-head">
        <label class="meal-done-check" title="סמנו כשהושלמה">
          <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleMealDone('${slotKey}', this.checked); this.closest('.meal').classList.toggle('meal-done', this.checked);" />
        </label>
        <div>
          <div class="slot-label">${mealIcon(meal.emoji)} ${meal.slotName}</div>
          <div class="meal-title">${meal.name}</div>
          ${metaLine}
        </div>
        <button type="button" class="btn-replace" onclick="replaceMeal(${slotIndex})" title="החלף ארוחה זו במנה דומה">🔄 החלפה</button>
      </div>
      ${items}
      ${kcalLine ? `<div class="meal-total">${kcalLine}</div>` : ''}
      ${whyMeal}
      ${steps}
    </div>`;
}

/* ---------- מסך "ברוך שובך" למשתמש חוזר ---------- */
$('#btn-go-to-menu').addEventListener('click', () => {
  renderMenu();
  showScreen('screen-menu');
});
$('#btn-restart-quiz').addEventListener('click', () => {
  prefillForm(profile);
  showScreen('screen-onboarding');
});

/* ---------- דף נחיתה למשתמש חדש ---------- */
function startQuizFromLanding() {
  showScreen('screen-onboarding');
  showQuizStep(1);
}
$('#btn-landing-start').addEventListener('click', startQuizFromLanding);
$('#btn-landing-start-2').addEventListener('click', startQuizFromLanding);

/* ---------- אתחול ---------- */
const SPLASH_MS = 2200;
(function init() {
  const saved = loadProfile();
  setTimeout(() => {
    if (saved) {
      profile = saved;
      targets = calcTargets(profile);
      prefillForm(profile);
      $('#welcome-back-greeting').textContent = `ברוך שובך, ${profile.firstName}! 👋`;
      const updated = profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString('he-IL') : '';
      $('#welcome-back-updated').textContent = updated ? `עודכן לאחרונה: ${updated}` : '';
      showScreen('screen-welcome-back');
    } else {
      showScreen('screen-landing');
    }
  }, SPLASH_MS);
})();

// רישום Service Worker — מאפשר "התקנה" כאפליקציה. עובד רק כשמוגש דרך שרת (http/localhost), לא file://
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* התעלמות אם נכשל */ });
  });
}
