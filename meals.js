/*
 * מאגר הארוחות — ארוחות אמיתיות ומלוכדות, כל אחת מנה שלמה והגיונית.
 * כל המאכלים כשרים: אין ערבוב בשר וחלב באותה מנה, ואין רכיבים לא-כשרים.
 *
 * כל ארוחה:
 *   slot   : breakfast | snack1 | lunch | snack2 | dinner | dessert
 *   diets  : לאילו סוגי תזונה הארוחה מתאימה (chittuv / masa)
 *   tags   : veg (צמחוני) / vegan (טבעוני)
 *   ingredients: [{ name, grams, liquid?, count?, unit?, home?, season?, kcal, protein, carbs, fat }]
 *     grams   = משקל מדויק בגרמים (מקור האמת לחישוב הקלוריות)
 *     liquid  = true עבור נוזלים בכמות גדולה (חלב וכו') — מוצג במ"ל במקום גרם
 *     count+unit = תצוגת יחידה טבעית (למשל 2 ביצים, כף, כפית) — אלו כבר יחידות נפח/ספירה
 *     home    = תיאור ביתי למצב "בלי ספירה"
 *     season  = תבלין/תיבול (בלי גרמים/קלוריות בתצוגה)
 *   steps  : שלבי הכנה קצרים
 *
 * הערכים התזונתיים הם למשקל הבסיס (grams) של המרכיב. המנוע מכוונן מנות ליעד.
 */
const MEALS = [
  /* ========================================================================= */
  /* =========================== תזונת חיטוב 🔥 =============================== */
  /* ========================================================================= */

  /* ===================== ארוחות בוקר — חיטוב ===================== */
  {
    id: 'b_tofu_scramble_chittuv',
    slot: 'breakfast', diets: ['chittuv'], tags: ['veg', 'vegan', 'gluten'],
    name: 'טופו מקושקש עם ירקות ופטריות על טוסט לחם מלא',
    ingredients: [
      { name: 'טופו קשה', grams: 150, home: 'חצי חבילה', kcal: 216, protein: 23.25, carbs: 4.5, fat: 13.05 },
      { name: 'פטריות', grams: 60, home: 'חופן', kcal: 13, protein: 1.9, carbs: 2, fat: 0.2 },
      { name: 'בצל', grams: 40, home: 'חצי בצל קטן', kcal: 16, protein: 0.4, carbs: 3.6, fat: 0 },
      { name: 'לחם מלא', grams: 30, count: 1, unit: 'פרוסה', home: 'פרוסה', kcal: 60, protein: 3, carbs: 10.5, fat: 0.75 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'כורכום, פפריקה ומלח', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מפוררים טופו קשה ביד לגריסים גסים.',
      'מטגנים בצל ופטריות בשמן זית עד ריכוך.',
      'מוסיפים טופו מפורר, כורכום ופפריקה ומטגנים כ-5 דקות תוך ערבוב, עד שנוצר מרקם דמוי-ביצים מקושקשות.',
      'מגישים עם טוסט לחם מלא.',
    ],
  },
  {
    id: 'b_omelet_avocado',
    slot: 'breakfast', diets: ['chittuv'], tags: ['veg', 'gluten', 'egg'],
    name: 'חביתת תרד ופטריות על טוסט אבוקדו',
    ingredients: [
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1, fat: 11 },
      { name: 'חלבוני ביצה', grams: 66, count: 2, unit: 'חלבונים', home: '2 חלבונים', kcal: 34, protein: 7, carbs: 0, fat: 0 },
      { name: 'תרד טרי', grams: 30, home: 'חופן', kcal: 7, protein: 1, carbs: 1, fat: 0 },
      { name: 'פטריות', grams: 80, home: 'חופן פטריות', kcal: 18, protein: 2.5, carbs: 3, fat: 0.3 },
      { name: 'לחם מלא', grams: 40, count: 1, unit: 'פרוסה', home: 'פרוסה', kcal: 80, protein: 4, carbs: 14, fat: 1 },
      { name: 'אבוקדו', grams: 40, home: 'רבע אבוקדו', kcal: 64, protein: 0.8, carbs: 3.6, fat: 6 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'מלח, פלפל שחור ופפריקה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים תרד ופטריות בכפית שמן זית עד ריכוך, מתבלים במלח, פלפל ופפריקה.',
      'טורפים ביצים וחלבונים, יוצקים למחבת ומבשלים לחביתה.',
      'מועכים אבוקדו על הטוסט הקלוי ומגישים לצד החביתה.',
    ],
  },
  {
    id: 'b_yogurt_granola',
    slot: 'breakfast', diets: ['chittuv'], tags: ['veg', 'gluten', 'dairy', 'nuts'],
    name: 'קערת יוגורט 0% עם גרנולה טבעית ופירות יער',
    ingredients: [
      { name: 'יוגורט יווני 0%', grams: 200, home: 'גביע גדול', kcal: 120, protein: 20, carbs: 8, fat: 0 },
      { name: 'גרנולה טבעית ללא סוכר', grams: 30, home: '3 כפות', kcal: 130, protein: 4, carbs: 18, fat: 5 },
      { name: 'פירות יער', grams: 80, home: 'חופן', kcal: 34, protein: 1, carbs: 8, fat: 0 },
      { name: 'אגוזי מלך', grams: 10, home: 'כף', kcal: 65, protein: 1.5, carbs: 1.4, fat: 6.5 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מעבירים את היוגורט לקערה.',
      'מפזרים מעל גרנולה הטבעית, פירות יער ואגוזים קצוצים.',
      'מתבלים בקינמון ומגישים.',
    ],
  },
  {
    id: 'b_protein_pancakes',
    slot: 'breakfast', diets: ['chittuv'], tags: ['veg', 'gluten', 'dairy', 'egg'],
    name: 'פנקייק שיבולת שועל וחלבון עם פירות יער',
    ingredients: [
      { name: 'שיבולת שועל', grams: 40, home: '4 כפות', kcal: 156, protein: 6.8, carbs: 26, fat: 2.8 },
      { name: 'אבקת חלבון בטעם וניל', grams: 30, count: 1, unit: 'סקופ', home: 'סקופ', kcal: 115, protein: 24, carbs: 3, fat: 1 },
      { name: 'ביצה', grams: 50, count: 1, unit: 'ביצים', home: 'ביצה', kcal: 78, protein: 6.5, carbs: 0.5, fat: 5.5 },
      { name: 'בננה', grams: 60, home: 'חצי בננה', kcal: 53, protein: 0.6, carbs: 14, fat: 0.3 },
      { name: 'פירות יער', grams: 60, home: 'חופן', kcal: 26, protein: 0.7, carbs: 6, fat: 0 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'טוחנים היטב בבלנדר שיבולת שועל, אבקת חלבון, ביצה וחצי מהבננה — עד לבלילה חלקה לגמרי (בלי גרגרים).',
      'מטגנים פנקייקים קטנים במחבת מונעת הידבקות, כדקה מכל צד.',
      'פורסים את שאר הבננה ומגישים עם פירות יער וקינמון מעל.',
    ],
  },
  {
    id: 'b_egg_toast',
    slot: 'breakfast', diets: ['chittuv'], tags: ['veg', 'gluten', 'egg'],
    name: 'טוסט לחם מלא עם ביצים קשות, אבוקדו ועגבנייה',
    ingredients: [
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 160, protein: 8, carbs: 28, fat: 2 },
      { name: 'ביצים קשות', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1, fat: 11 },
      { name: 'אבוקדו', grams: 40, home: 'רבע אבוקדו', kcal: 64, protein: 0.8, carbs: 3.6, fat: 6 },
      { name: 'עגבנייה', grams: 120, count: 1, unit: 'יחידה', home: 'עגבנייה', kcal: 22, protein: 1, carbs: 5, fat: 0 },
      { name: 'מלח, פלפל שחור וזעתר', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'קולים את פרוסות הלחם.',
      'מועכים אבוקדו ומורחים על הטוסט.',
      'פורסים מעל ביצים קשות ועגבנייה, מתבלים במלח, פלפל וזעתר.',
    ],
  },
  {
    id: 'b_kiwi_yogurt',
    slot: 'breakfast', diets: ['chittuv'], tags: ['veg', 'dairy', 'nuts'],
    name: 'קערת יוגורט 0% עם קיווי, תפוח ירוק ואגוזי מלך',
    ingredients: [
      { name: 'יוגורט יווני 0%', grams: 200, home: 'גביע גדול', kcal: 120, protein: 20, carbs: 8, fat: 0 },
      { name: 'קיווי', grams: 120, count: 2, unit: 'יחידות', home: '2 קיווי', kcal: 73, protein: 1.3, carbs: 18, fat: 0.6 },
      { name: 'תפוח ירוק', grams: 120, count: 1, unit: 'יחידה', home: 'תפוח ירוק', kcal: 62, protein: 0.4, carbs: 17, fat: 0.2 },
      { name: 'אגוזי מלך', grams: 15, home: 'חופן קטן', kcal: 98, protein: 2.3, carbs: 2.1, fat: 9.8 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'קוצצים קיווי ותפוח ירוק לקוביות.',
      'מניחים על היוגורט ומפזרים אגוזי מלך קצוצים.',
      'מתבלים בקינמון ומגישים.',
    ],
  },
  {
    id: 'b_egg_white_veg_scramble',
    slot: 'breakfast', diets: ['chittuv'], tags: ['veg', 'gluten', 'egg'],
    name: 'חביתת חלבוני ביצה עם פלפל אדום, בצל ופטריות על טוסט לחם מלא',
    ingredients: [
      { name: 'חלבוני ביצה', grams: 150, home: '4-5 חלבונים', kcal: 78, protein: 16.5, carbs: 1, fat: 0.3 },
      { name: 'פלפל אדום', grams: 80, home: 'חצי פלפל', kcal: 25, protein: 0.8, carbs: 4.8, fat: 0.2 },
      { name: 'בצל', grams: 40, home: 'חצי בצל קטן', kcal: 16, protein: 0.4, carbs: 3.6, fat: 0 },
      { name: 'פטריות', grams: 60, home: 'חופן', kcal: 13, protein: 1.9, carbs: 2, fat: 0.2 },
      { name: 'לחם מלא', grams: 30, count: 1, unit: 'פרוסה', home: 'פרוסה', kcal: 60, protein: 3, carbs: 10.5, fat: 0.75 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'פפריקה, אורגנו, מלח ופלפל שחור', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים פלפל, בצל ופטריות בשמן זית עד ריכוך.',
      'מוסיפים חלבוני ביצה ומבשלים תוך ערבוב עד להתגבשות.',
      'מתבלים בפפריקה ואורגנו ומגישים עם טוסט לחם מלא.',
    ],
  },

  /* ===================== ארוחות ביניים — חיטוב ===================== */
  {
    id: 's1_apple_almonds',
    slot: 'snack1', diets: ['chittuv'], tags: ['veg', 'vegan', 'nuts'],
    name: 'תפוח ירוק עם חופן שקדים',
    ingredients: [
      { name: 'תפוח ירוק', grams: 150, count: 1, unit: 'יחידה', home: 'תפוח ירוק', kcal: 78, protein: 0.5, carbs: 21, fat: 0.3 },
      { name: 'שקדים', grams: 15, home: 'חופן קטן', kcal: 87, protein: 3.2, carbs: 3.3, fat: 7.5 },
    ],
    steps: ['פורסים את התפוח לפלחים ומגישים לצד השקדים.'],
  },
  {
    id: 's1_yogurt_berries',
    slot: 'snack1', diets: ['chittuv'], tags: ['veg', 'dairy'],
    name: 'יוגורט יווני 0% עם פירות יער',
    ingredients: [
      { name: 'יוגורט יווני 0%', grams: 200, home: 'גביע', kcal: 120, protein: 20, carbs: 8, fat: 0 },
      { name: 'פירות יער', grams: 80, home: 'חופן', kcal: 34, protein: 1, carbs: 8, fat: 0 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['מערבבים יוגורט עם פירות יער וקינמון.'],
  },
  {
    id: 's1_cheese_veg',
    slot: 'snack1', diets: ['chittuv'], tags: ['veg', 'dairy'],
    name: 'גבינה לבנה 5% עם מלפפון, פלפל אדום וגזר',
    ingredients: [
      { name: 'גבינה לבנה 5%', grams: 150, home: 'גביע', kcal: 135, protein: 15, carbs: 5, fat: 7.5 },
      { name: 'מלפפון', grams: 60, home: 'חצי מלפפון', kcal: 9, protein: 0.4, carbs: 2.2, fat: 0.1 },
      { name: 'פלפל אדום', grams: 50, home: 'חצי פלפל', kcal: 15.5, protein: 0.5, carbs: 3, fat: 0.15 },
      { name: 'גזר', grams: 40, home: 'גזר קטן', kcal: 16.4, protein: 0.36, carbs: 4, fat: 0.08 },
      { name: 'זעתר', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['חותכים ירקות לאצבעות ומגישים לצד הגבינה, מתבלים בזעתר.'],
  },
  {
    id: 's1_nectarine_pistachio',
    slot: 'snack1', diets: ['chittuv'], tags: ['veg', 'vegan', 'nuts'],
    name: 'נקטרינה עם חופן פיסטוקים קלויים',
    ingredients: [
      { name: 'נקטרינה', grams: 130, count: 1, unit: 'יחידה', home: 'נקטרינה', kcal: 57, protein: 1.4, carbs: 14.3, fat: 0.4 },
      { name: 'פיסטוקים קלויים', grams: 20, home: 'חופן', kcal: 112, protein: 4, carbs: 5.6, fat: 9 },
    ],
    steps: ['מגישים יחד כחטיף מרענן.'],
  },
  {
    id: 's1_tuna_salad_snack',
    slot: 'snack1', diets: ['chittuv'], tags: [],
    name: 'סלט טונה עם מלפפון, עגבנייה ולימון',
    ingredients: [
      { name: 'טונה במים', grams: 80, home: 'קופסה קטנה', kcal: 93, protein: 20.8, carbs: 0, fat: 0.8 },
      { name: 'מלפפון', grams: 80, home: 'מלפפון קטן', kcal: 12, protein: 0.56, carbs: 2.9, fat: 0.08 },
      { name: 'עגבנייה', grams: 80, home: 'עגבנייה בינונית', kcal: 14, protein: 0.7, carbs: 3, fat: 0.15 },
      { name: 'לימון, מלח ופלפל שחור', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['מסננים את הטונה, חותכים ירקות לקוביות ומערבבים הכל יחד עם סחיטת לימון.'],
  },
  {
    id: 's1_cottage1_veg',
    slot: 'snack1', diets: ['chittuv'], tags: ['veg', 'dairy'],
    name: 'קוטג\' 1% עם מלפפון, עגבניות שרי ופלפל צהוב',
    ingredients: [
      { name: 'גבינת קוטג\' 1%', grams: 150, home: 'גביע', kcal: 108, protein: 18, carbs: 5.25, fat: 1.5 },
      { name: 'מלפפון', grams: 60, home: 'חצי מלפפון', kcal: 9, protein: 0.42, carbs: 2.16, fat: 0.06 },
      { name: 'עגבניות שרי', grams: 50, home: 'חופן', kcal: 9, protein: 0.45, carbs: 1.95, fat: 0.1 },
      { name: 'פלפל צהוב', grams: 40, home: 'רבע פלפל', kcal: 10.4, protein: 0.4, carbs: 2, fat: 0.08 },
    ],
    steps: ['חותכים ירקות לקוביות קטנות ומערבבים עם הקוטג\'.'],
  },
  {
    id: 's1_hummus_veg_chittuv',
    slot: 'snack1', diets: ['chittuv'], tags: ['veg', 'vegan'],
    name: 'חומוס עם מקלות גזר, מלפפון ופלפל',
    ingredients: [
      { name: 'חומוס', grams: 60, home: '4 כפות', kcal: 99.6, protein: 4.74, carbs: 8.4, fat: 5.76 },
      { name: 'גזר, מלפפון ופלפל', grams: 120, home: 'קערית', kcal: 30, protein: 1.2, carbs: 6.5, fat: 0.3 },
    ],
    steps: ['חותכים ירקות לאצבעות וטובלים בחומוס.'],
  },

  /* ===================== ארוחות צהריים — חיטוב ===================== */
  {
    id: 'l_tofu_teriyaki_rice',
    slot: 'lunch', diets: ['chittuv'], tags: ['veg', 'vegan', 'gluten'],
    name: 'טופו בטריאקי עם אורז מלא וירקות מוקפצים',
    ingredients: [
      { name: 'טופו קשה', grams: 180, home: 'חבילה', kcal: 259, protein: 27.9, carbs: 5.4, fat: 15.7 },
      { name: 'אורז מלא מבושל', grams: 150, home: '3/4 כוס', kcal: 168, protein: 3.9, carbs: 35.25, fat: 1.35 },
      { name: 'ברוקולי, גזר ופלפל צהוב', grams: 150, home: 'קערה', kcal: 45, protein: 2.5, carbs: 9, fat: 0.3 },
      { name: 'רוטב סויה דל נתרן', grams: 15, home: 'כף', kcal: 8, protein: 1, carbs: 1, fat: 0 },
      { name: 'שמן שומשום', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום וג\'ינג\'ר', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מייבשים את הטופו במגבת נייר וחותכים לקוביות.',
      'מטגנים את הטופו במחבת חמה עם מעט שמן שומשום עד להשחמה מכל הצדדים.',
      'מוסיפים ירקות, שום וג\'ינג\'ר ומקפיצים כ-3-4 דקות.',
      'מוסיפים רוטב סויה ומערבבים, ומגישים על אורז מלא.',
    ],
  },
  {
    id: 'l_veg_frittata_feta',
    slot: 'lunch', diets: ['chittuv'], tags: ['veg', 'dairy', 'egg'],
    name: 'פריטטת ירקות אפויה עם פטה בולגרית',
    ingredients: [
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 232.5, protein: 19.5, carbs: 1.65, fat: 16.5 },
      { name: 'קישוא, פלפל ובצל', grams: 150, home: 'קערה', kcal: 40, protein: 2, carbs: 7, fat: 0.3 },
      { name: 'פטה בולגרית 14%', grams: 40, home: 'קוביה', kcal: 106, protein: 5.6, carbs: 1.2, fat: 8.4 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'אורגנו ומלח', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים ירקות בשמן זית עד ריכוך.',
      'טורפים ביצים, יוצקים מעל הירקות במחבת שניתנת לתנור, ומפזרים פטה מפוררת.',
      'אופים בתנור ב-180° כ-15-18 דקות עד שהביצים נקרשות ומשחימות קלות מלמעלה.',
    ],
  },
  {
    id: 'l_chicken_quinoa',
    slot: 'lunch', diets: ['chittuv'], tags: [],
    name: 'חזה עוף בגריל עם קינואה וסלט ירקות צבעוני',
    ingredients: [
      { name: 'חזה עוף', grams: 150, home: 'חזה בינוני', kcal: 248, protein: 47, carbs: 0, fat: 5.4 },
      { name: 'קינואה מבושלת', grams: 120, home: 'כוס', kcal: 144, protein: 5.3, carbs: 25, fat: 2.3 },
      { name: 'מלפפון, עגבנייה, פלפל צהוב ובצל סגול', grams: 150, home: 'קערה', kcal: 38, protein: 1.5, carbs: 8, fat: 0.4 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום גרוס, פפריקה מתוקה, כמון, אורגנו ומיץ לימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'משרים את חזה העוף בשום גרוס, פפריקה, כמון, אורגנו, מיץ לימון ומלח כ-10 דקות.',
      'צולים על מחבת פסים 5-6 דק\' מכל צד.',
      'מכינים סלט ירקות טרי וקצוץ, מתבלים בשמן זית ולימון, ומגישים את העוף על מצע קינואה לצידו.',
    ],
  },
  {
    id: 'l_salmon_sweetpotato',
    slot: 'lunch', diets: ['chittuv'], tags: [],
    name: 'סלמון אפוי עם בטטה וברוקולי',
    ingredients: [
      { name: 'פילה סלמון', grams: 130, home: 'פילה בינוני', kcal: 270, protein: 26, carbs: 0, fat: 17 },
      { name: 'בטטה', grams: 150, home: 'בטטה בינונית', kcal: 129, protein: 2.4, carbs: 30, fat: 0.2 },
      { name: 'ברוקולי', grams: 100, home: 'קערית', kcal: 34, protein: 2.8, carbs: 7, fat: 0.4 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום, שמיר טרי, פפריקה ומיץ לימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים בטטה לקוביות, מתבלים בשמן זית ופפריקה ואופים ב-200° כ-25 דק\'.',
      'מתבלים את הסלמון בשום ושמיר, ומוסיפים אותו ואת הברוקולי לתבנית ל-12 הדקות האחרונות.',
      'מסיימים בטפטוף מיץ לימון.',
    ],
  },
  {
    id: 'l_tuna_pasta',
    slot: 'lunch', diets: ['chittuv'], tags: ['gluten'],
    name: 'פסטה מלאה עם טונה, עגבניות ובזיליקום',
    ingredients: [
      { name: 'פסטה מלאה מבושלת', grams: 150, home: 'צלחת', kcal: 186, protein: 7.5, carbs: 37, fat: 1.6 },
      { name: 'טונה במים', grams: 120, count: 1, unit: 'קופסה', home: 'קופסה', kcal: 139, protein: 31, carbs: 0, fat: 1.2 },
      { name: 'עגבניות שרי', grams: 80, home: 'קערית', kcal: 14.4, protein: 0.72, carbs: 3.1, fat: 0.16 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום, אורגנו, פתיתי צ\'ילי ובזיליקום טרי', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מחממים במחבת עגבניות שרי חצויות עם שום כתוש וכפית שמן זית.',
      'מוסיפים טונה מסוננת, אורגנו ופתיתי צ\'ילי ומערבבים.',
      'מוסיפים את הפסטה המבושלת, בזיליקום טרי קצוץ ומגישים.',
    ],
  },
  {
    id: 'l_turkey_root_veg',
    slot: 'lunch', diets: ['chittuv'], tags: [],
    name: 'חזה הודו אפוי עם ירקות שורש ברוזמרין ושום',
    ingredients: [
      { name: 'חזה הודו', grams: 180, home: 'חזה בינוני', kcal: 243, protein: 54, carbs: 0, fat: 1.8 },
      { name: 'בטטה', grams: 150, home: 'בטטה בינונית', kcal: 129, protein: 2.4, carbs: 30, fat: 0.15 },
      { name: 'גזר', grams: 100, home: '2 גזרים', kcal: 41, protein: 0.9, carbs: 10, fat: 0.2 },
      { name: 'בצל', grams: 50, home: 'בצל קטן', kcal: 20, protein: 0.55, carbs: 4.5, fat: 0.05 },
      { name: 'שמן זית', grams: 10, count: 2, unit: 'כפית', home: '2 כפיות', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'רוזמרין טרי, שום כתוש, מלח ופלפל שחור', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים בטטה, גזר ובצל לקוביות ומתבלים בשמן זית, רוזמרין ושום.',
      'מניחים את חזה ההודו על אותה תבנית ואופים ב-200° כ-30 דקות.',
      'מגישים חם.',
    ],
  },
  {
    id: 'l_chicken_meatballs_rice',
    slot: 'lunch', diets: ['chittuv'], tags: [],
    name: 'קציצות עוף עם אורז מלא וסלט צבעוני',
    ingredients: [
      { name: 'עוף טחון', grams: 180, home: 'מנה', kcal: 288, protein: 37.8, carbs: 0, fat: 14.4 },
      { name: 'אורז מלא מבושל', grams: 150, home: 'כוס', kcal: 165, protein: 3.45, carbs: 34.5, fat: 1.35 },
      { name: 'פלפל אדום', grams: 50, home: 'חצי פלפל', kcal: 15.5, protein: 0.5, carbs: 3, fat: 0.15 },
      { name: 'כרוב סגול', grams: 50, home: 'חופן קצוץ', kcal: 15.5, protein: 0.7, carbs: 3.7, fat: 0.1 },
      { name: 'גזר', grams: 50, home: 'גזר קטן', kcal: 20.5, protein: 0.45, carbs: 5, fat: 0.1 },
      { name: 'שום, כמון, כוסברה, מלח ופלפל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מערבבים עוף טחון עם שום כתוש, כמון וכוסברה, ומגלגלים קציצות.',
      'צולים על מחבת עד להזהבה מכל הצדדים ובישול מלא.',
      'מגישים על אורז מלא לצד סלט כרוב סגול, פלפל וגזר קצוצים.',
    ],
  },

  /* ===================== חטיפים — חיטוב ===================== */
  {
    id: 's2_popcorn_light',
    slot: 'snack2', diets: ['chittuv'], tags: ['veg', 'vegan'],
    name: 'פופקורן ביתי מוקפץ באוויר (דל שומן)',
    ingredients: [
      { name: 'תירס פופקורן (גרעינים)', grams: 25, home: '2 כפות גרעינים', kcal: 97, protein: 3.2, carbs: 19.5, fat: 1.1 },
      { name: 'מלח, פפריקה ושמרי בירה (אופציונלי)', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מקפיצים את הגרעינים בסיר עם מכסה על אש בינונית תוך נענוע קל, ללא שמן (או במכשיר Air Popper), עד שכל הגרעינים נפתחו.',
      'מפזרים מלח ופפריקה (או שמרי בירה לטעם "גבינתי") ומגישים חם.',
    ],
  },
  {
    id: 's2_protein_brownie',
    slot: 'snack2', diets: ['chittuv'], tags: ['veg', 'dairy', 'egg'],
    name: 'בראוני חלבון אישי בתנור',
    ingredients: [
      { name: 'ביצה', grams: 50, count: 1, unit: 'ביצה', home: 'ביצה', kcal: 78, protein: 6.5, carbs: 0.5, fat: 5.5 },
      { name: 'בננה בשלה מעוכה', grams: 60, home: 'חצי בננה', kcal: 53, protein: 0.6, carbs: 14, fat: 0.3 },
      { name: 'אבקת חלבון בטעם שוקולד', grams: 30, count: 1, unit: 'סקופ', home: 'סקופ', kcal: 115, protein: 24, carbs: 3, fat: 1 },
      { name: 'קקאו טהור ללא סוכר', grams: 10, home: 'כף גדושה', kcal: 23, protein: 2, carbs: 5.8, fat: 1.4 },
      { name: 'דבש', grams: 10, home: 'חצי כף', kcal: 30, protein: 0.03, carbs: 8.24, fat: 0 },
      { name: 'אבקת אפייה', season: true, home: 'חצי כפית', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מועכים בננה למחית, מוסיפים ביצה טרופה ודבש ומערבבים.',
      'מקפלים פנימה אבקת חלבון, קקאו ואבקת אפייה עד לבלילה סמיך ואחיד.',
      'יוצקים לתבנית קטנה (רמקין) משומנת קלות, ואופים בתנור שחומם מראש ל-175° כ-12-15 דקות עד שקיסם יוצא כמעט יבש.',
      'לחלופין: אפשר לבשל במיקרוגל בעוצמה גבוהה כ-60-90 שניות ("מאג-בראוני").',
    ],
  },
  {
    id: 's2_protein_balls',
    slot: 'snack2', diets: ['chittuv'], tags: ['veg', 'vegan', 'gluten', 'dairy', 'nuts'],
    name: 'כדורי חלבון ללא אפייה',
    ingredients: [
      { name: 'שיבולת שועל', grams: 30, home: '3 כפות', kcal: 116, protein: 5.1, carbs: 19.4, fat: 2.1 },
      { name: 'אבקת חלבון בטעם וניל', grams: 20, home: 'שני שליש סקופ', kcal: 77, protein: 16, carbs: 2, fat: 0.7 },
      { name: 'חמאת בוטנים טבעית', grams: 20, home: 'כף גדושה', kcal: 117, protein: 5, carbs: 4, fat: 10 },
      { name: 'דבש', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 46, protein: 0.05, carbs: 12.4, fat: 0 },
      { name: 'קוקוס טחון ללא סוכר', grams: 5, home: 'לציפוי', kcal: 33, protein: 0.35, carbs: 1.2, fat: 3.2 },
    ],
    steps: [
      'מערבבים שיבולת שועל, אבקת חלבון וחמאת בוטנים בקערה.',
      'מוסיפים דבש ומערבבים היטב לבלילה דביקה (אם יבש מדי — מוסיפים כפית מים).',
      'מעצבים כ-6 כדורים קטנים ומגלגלים בקוקוס טחון.',
      'מקררים במקרר לפחות 20 דקות עד להתקשות.',
    ],
  },
  {
    id: 's2_choc_chip_cookies_light',
    slot: 'snack2', diets: ['chittuv'], tags: ['veg', 'gluten', 'dairy'],
    name: '2 עוגיות שוקולד צ\'יפס בריאות ודלות קלוריות',
    ingredients: [
      { name: 'שיבולת שועל טחונה', grams: 20, home: '2 כפות', kcal: 78, protein: 3.4, carbs: 13, fat: 1.4 },
      { name: 'בננה בשלה מעוכה', grams: 30, home: 'רבע בננה', kcal: 27, protein: 0.3, carbs: 7, fat: 0.15 },
      { name: 'אבקת חלבון בטעם וניל', grams: 7.5, home: 'רבע סקופ', kcal: 29, protein: 6, carbs: 0.75, fat: 0.25 },
      { name: "שוקולד מריר (צ'יפס)", grams: 7.5, home: 'כפית גדושה', kcal: 41, protein: 0.4, carbs: 4.6, fat: 2.3 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מועכים בננה למחית חלקה, מערבבים עם קמח שיבולת שועל ואבקת חלבון לבלילה אחיד.',
      'מקפלים פנימה את שברי השוקולד המריר וקורט קינמון.',
      'מעצבים 2 עוגיות שטוחות על נייר אפייה ואופים בתנור שחומם מראש ל-175° כ-10-12 דקות עד להזהבה קלה.',
    ],
  },

  /* ===================== ארוחות ערב — חיטוב ===================== */
  {
    id: 'd_lentil_quinoa_patties_chittuv',
    slot: 'dinner', diets: ['chittuv'], tags: ['veg', 'vegan'],
    name: 'קציצות עדשים וקינואה ברוטב עגבניות',
    ingredients: [
      { name: 'עדשים מבושלות', grams: 150, home: '3/4 כוס', kcal: 174, protein: 13.5, carbs: 30, fat: 0.6 },
      { name: 'קינואה מבושלת', grams: 80, home: 'חצי כוס', kcal: 96, protein: 3.5, carbs: 17, fat: 1.5 },
      { name: 'בצל', grams: 40, home: 'חצי בצל קטן', kcal: 16, protein: 0.4, carbs: 3.6, fat: 0 },
      { name: 'רוטב עגבניות', grams: 100, home: 'קערית', kcal: 30, protein: 1.5, carbs: 6, fat: 0.3 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'כמון, פפריקה ושום', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים בצל בשמן זית עד להזהבה, מוסיפים כמון, פפריקה ושום.',
      'מוסיפים עדשים וקינואה מבושלים, מועכים מעט ומעצבים לקציצות.',
      'מטגנים קלות משני הצדדים או אופים ב-200° כ-15 דק\', ומגישים ברוטב עגבניות מחומם.',
    ],
  },
  {
    id: 'd_turkey_meatballs',
    slot: 'dinner', diets: ['chittuv'], tags: [],
    name: 'קציצות הודו ברוטב עגבניות עם אורז מלא',
    ingredients: [
      { name: 'בשר הודו טחון', grams: 150, home: 'מנה', kcal: 198, protein: 32, carbs: 0, fat: 7.5 },
      { name: 'אורז מלא מבושל', grams: 120, home: 'כוס', kcal: 132, protein: 2.8, carbs: 28, fat: 1 },
      { name: 'רוטב עגבניות', grams: 100, home: 'מצקת', kcal: 35, protein: 1.5, carbs: 7, fat: 0.3 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום, בצל, אורגנו ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מגלגלים קציצות מבשר ההודו הטחון עם שום, בצל קצוץ ואורגנו.',
      'מבשלים ברוטב עגבניות כ-15 דק\'.',
      'מפזרים פטרוזיליה קצוצה ומגישים על מצע אורז מלא.',
    ],
  },
  {
    id: 'd_chicken_stirfry',
    slot: 'dinner', diets: ['chittuv'], tags: [],
    name: 'חזה עוף מוקפץ עם ברוקולי, גזר ופלפל על אורז מלא',
    ingredients: [
      { name: 'חזה עוף', grams: 130, home: 'חזה בינוני', kcal: 215, protein: 40, carbs: 0, fat: 4.7 },
      { name: 'ברוקולי, גזר ופלפל אדום', grams: 150, home: 'קערה', kcal: 55, protein: 3, carbs: 11, fat: 0.5 },
      { name: 'אורז מלא מבושל', grams: 100, home: 'כוס קטנה', kcal: 110, protein: 2.3, carbs: 23, fat: 0.9 },
      { name: 'שמן שומשום', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום, ג\'ינג\'ר טרי ורוטב סויה דל נתרן', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים חזה עוף לרצועות ומקפיצים בשמן שומשום על אש גבוהה.',
      'מוסיפים שום, ג\'ינג\'ר טרי קצוץ, ירקות ורוטב סויה דל נתרן, ומקפיצים 4-5 דק\'.',
      'מגישים על אורז מלא.',
    ],
  },
  {
    id: 'd_shakshuka',
    slot: 'dinner', diets: ['chittuv'], tags: ['veg', 'gluten', 'dairy', 'egg'],
    name: 'שקשוקה עם גבינה בולגרית 5% וסלט',
    ingredients: [
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1, fat: 11 },
      { name: 'רוטב עגבניות ופלפלים', grams: 150, home: 'מחבת קטנה', kcal: 60, protein: 2.5, carbs: 11, fat: 0.5 },
      { name: 'גבינה בולגרית 5%', grams: 30, home: 'פרוסה', kcal: 43.5, protein: 4.5, carbs: 0.9, fat: 2.4 },
      { name: 'לחם מלא', grams: 30, count: 1, unit: 'פרוסה', home: 'פרוסה', kcal: 60, protein: 3, carbs: 10.5, fat: 0.75 },
      { name: 'סלט ירקות', grams: 100, home: 'קערית', kcal: 25, protein: 1, carbs: 5, fat: 0.3 },
      { name: 'פפריקה מתוקה, כמון, שום ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מחממים רוטב עגבניות ופלפלים עם פפריקה, כמון ושום במחבת.',
      'שוברים פנימה ביצים ומבשלים בכיסוי עד שהחלבון נקרש.',
      'מפוררים מעל גבינה בולגרית, מפזרים פטרוזיליה ומגישים עם פרוסת לחם וסלט.',
    ],
  },
  {
    id: 'd_salmon_veg_couscous',
    slot: 'dinner', diets: ['chittuv'], tags: ['gluten'],
    name: 'סלמון אפוי עם קוסקוס מלא וירקות',
    ingredients: [
      { name: 'פילה סלמון', grams: 130, home: 'פילה בינוני', kcal: 270, protein: 26, carbs: 0, fat: 17 },
      { name: 'קוסקוס מלא מבושל', grams: 120, home: 'כוס', kcal: 134, protein: 4.6, carbs: 27.6, fat: 0.24 },
      { name: 'קישוא', grams: 80, home: 'קישוא קטן', kcal: 13.6, protein: 0.96, carbs: 2.5, fat: 0.24 },
      { name: 'פלפל צהוב', grams: 50, home: 'חצי פלפל', kcal: 15.5, protein: 0.5, carbs: 3, fat: 0.15 },
      { name: 'עגבניות שרי', grams: 60, home: 'חופן', kcal: 10.8, protein: 0.54, carbs: 2.3, fat: 0.12 },
      { name: 'שום, מיץ לימון, כורכום וכוסברה טרייה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים את הסלמון בשום, כורכום ומיץ לימון ואופים ב-200° כ-15 דק\'.',
      'מאדים קישוא, פלפל ועגבניות שרי ומערבבים עם הקוסקוס המבושל.',
      'מפזרים כוסברה טרייה ומגישים לצד הסלמון.',
    ],
  },

  /* ===================== מתכוני קינוח שבועי — חיטוב ===================== */
  {
    id: 'ds_protein_cookies',
    slot: 'dessert', diets: ['chittuv'], tags: ['veg', 'gluten', 'dairy', 'nuts', 'egg'],
    name: 'עוגיות חלבון ושיבולת שועל (ללא סוכר לבן)',
    yield: 'כ-10 עוגיות',
    serving: { label: '2 עוגיות', kcal: 195, protein: 12, carbs: 21, fat: 7 },
    ingredients: [
      { name: 'שיבולת שועל', grams: 100, home: 'כוס', kcal: 389, protein: 17, carbs: 66, fat: 7 },
      { name: 'אבקת חלבון בטעם וניל', grams: 60, count: 2, unit: 'סקופים', home: '2 סקופים', kcal: 230, protein: 48, carbs: 6, fat: 2 },
      { name: 'בננה בשלה מעוכה', grams: 120, count: 1, unit: 'יחידה', home: 'בננה גדולה', kcal: 107, protein: 1.3, carbs: 27, fat: 0.4 },
      { name: 'חמאת בוטנים טבעית', grams: 30, count: 2, unit: 'כפות', home: '2 כפות', kcal: 176, protein: 7.5, carbs: 6, fat: 15 },
      { name: 'ביצה', grams: 50, count: 1, unit: 'ביצים', home: 'ביצה', kcal: 78, protein: 6.5, carbs: 0.5, fat: 5.5 },
      { name: 'קינמון ואבקת אפייה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מערבבים את כל המרכיבים בקערה עד לבלילה סמיכה.',
      'יוצרים 10 עוגיות על תבנית מרופדת בנייר אפייה.',
      'אופים ב-180° כ-12 דקות עד הזהבה. שומרים בקופסה אטומה.',
    ],
  },
  {
    id: 'ds_banana_cake',
    slot: 'dessert', diets: ['chittuv'], tags: ['veg', 'nuts', 'egg'],
    name: 'עוגת בננה ושקדים ללא תוספת סוכר',
    yield: 'כ-8 פרוסות',
    serving: { label: 'פרוסה', kcal: 185, protein: 6, carbs: 12, fat: 12 },
    ingredients: [
      { name: 'קמח שקדים', grams: 120, home: 'כוס', kcal: 640, protein: 24, carbs: 24, fat: 56 },
      { name: 'בננות בשלות מעוכות', grams: 240, count: 2, unit: 'יחידות', home: '2 בננות', kcal: 214, protein: 2.6, carbs: 54, fat: 0.8 },
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 233, protein: 19.5, carbs: 1.5, fat: 16.5 },
      { name: 'שמן קוקוס', grams: 20, count: 1, unit: 'כף', home: 'כף', kcal: 180, protein: 0, carbs: 0, fat: 20 },
      { name: 'וניל, קינמון ואבקת אפייה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מועכים בננות וטורפים עם הביצים ושמן הקוקוס.',
      'מוסיפים קמח שקדים, וניל, קינמון ואבקת אפייה ומערבבים לבלילה אחידה.',
      'אופים בתבנית אינגליש קייק ב-175° כ-30-35 דקות. מקררים ופורסים.',
    ],
  },

  /* ========================================================================= */
  /* =========================== תזונת מסה 💪 ================================ */
  /* ========================================================================= */

  /* ===================== ארוחות בוקר — מסה ===================== */
  {
    id: 'mb_eggs_potatoes_avocado',
    slot: 'breakfast', diets: ['masa'], tags: ['veg', 'dairy', 'egg'],
    name: 'ביצים מקושקשות עם אבוקדו, גבינה צהובה ותפוחי אדמה מטוגנים',
    ingredients: [
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 232.5, protein: 19.5, carbs: 1.65, fat: 16.5 },
      { name: 'תפוחי אדמה', grams: 200, home: 'תפוח אדמה בינוני', kcal: 154, protein: 4, carbs: 34, fat: 0.2 },
      { name: 'אבוקדו', grams: 80, home: 'שני שליש אבוקדו', kcal: 128, protein: 1.6, carbs: 7.2, fat: 12 },
      { name: 'גבינה צהובה 28%', grams: 30, home: 'פרוסה', kcal: 105, protein: 7.5, carbs: 0.6, fat: 8.4 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'מלח, פפריקה ופלפל שחור', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים תפוחי אדמה לקוביות ומטגנים בשמן זית עד להזהבה ורכות (או צולים בתנור 200° כ-20 דק\').',
      'טורפים ביצים ומבשלים במחבת נפרדת עד שנוצרות ביצים מקושקשות רכות.',
      'מגישים יחד עם פרוסות אבוקדו וגבינה צהובה מגוררת מעל, מתובל במלח ופפריקה.',
    ],
  },
  {
    id: 'mb_avocado_hummus_toast',
    slot: 'breakfast', diets: ['masa'], tags: ['veg', 'vegan', 'gluten', 'nuts'],
    name: 'טוסט אבוקדו וחומוס עם אגוזי מלך',
    ingredients: [
      { name: 'לחם מלא', grams: 90, count: 3, unit: 'פרוסות', home: '3 פרוסות', kcal: 180, protein: 9, carbs: 31.5, fat: 2.25 },
      { name: 'אבוקדו', grams: 100, count: 1, unit: 'יחידה', home: 'אבוקדו שלם', kcal: 160, protein: 2, carbs: 9, fat: 15 },
      { name: 'חומוס', grams: 60, home: '4 כפות', kcal: 99.6, protein: 4.74, carbs: 8.4, fat: 5.76 },
      { name: 'אגוזי מלך', grams: 15, home: 'חופן קטן', kcal: 98, protein: 2.25, carbs: 2.1, fat: 9.75 },
      { name: 'לימון ומלח ים', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מורחים חומוס על פרוסות הלחם המלא.',
      'מועכים אבוקדו עם לימון ומלח ים ומורחים מעל.',
      'מפזרים אגוזי מלך קצוצים לסיום.',
    ],
  },
  {
    id: 'mb_pb_banana_pancakes',
    slot: 'breakfast', diets: ['masa'], tags: ['veg', 'gluten', 'dairy', 'nuts', 'egg'],
    name: 'פנקייקים עם חמאת בוטנים ובננה',
    ingredients: [
      { name: 'קמח מלא', grams: 60, home: 'חצי כוס', kcal: 204, protein: 8.2, carbs: 43.2, fat: 1.5 },
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1, fat: 11 },
      { name: 'חלב 2%', grams: 100, liquid: true, home: 'חצי כוס', kcal: 50, protein: 3.3, carbs: 4.7, fat: 1.7 },
      { name: 'שמן קוקוס', grams: 10, home: 'כף (לטיגון)', kcal: 90, protein: 0, carbs: 0, fat: 10 },
      { name: 'חמאת בוטנים טבעית', grams: 20, home: 'כף גדושה', kcal: 117, protein: 5, carbs: 4, fat: 10 },
      { name: 'בננה', grams: 100, count: 1, unit: 'יחידה', home: 'בננה', kcal: 89, protein: 1, carbs: 23, fat: 0.3 },
      { name: 'דבש', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 46, protein: 0.05, carbs: 12.4, fat: 0 },
      { name: 'אבקת אפייה', season: true, home: 'כפית', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'טורפים ביצים עם חלב, ומוסיפים קמח מלא ואבקת אפייה עד לבלילה חלקה.',
      'מחממים מחבת עם מעט שמן קוקוס, יוצקים מנות קטנות מהבלילה ומטגנים כ-2 דקות לכל צד עד הזהבה.',
      'פורסים בננה ומגישים לצד הפנקייקים עם חמאת בוטנים וטפטוף דבש מעל.',
    ],
  },
  {
    id: 'mb_eggs_cheese_toast',
    slot: 'breakfast', diets: ['masa'], tags: ['veg', 'gluten', 'dairy', 'egg'],
    name: 'חביתת 3 ביצים עם גבינה צהובה 9%, טוסטים ואבוקדו',
    ingredients: [
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 233, protein: 19.5, carbs: 1.5, fat: 16.5 },
      { name: 'גבינה צהובה 9%', grams: 30, count: 1, unit: 'פרוסה', home: 'פרוסה', kcal: 64.5, protein: 8.1, carbs: 0.3, fat: 2.7 },
      { name: 'לחם מלא', grams: 90, count: 3, unit: 'פרוסות', home: '3 פרוסות', kcal: 240, protein: 12, carbs: 42, fat: 3 },
      { name: 'אבוקדו', grams: 50, home: 'חצי אבוקדו קטן', kcal: 80, protein: 1, carbs: 4.5, fat: 7.5 },
      { name: 'עגבנייה', grams: 120, count: 1, unit: 'יחידה', home: 'עגבנייה', kcal: 22, protein: 1, carbs: 5, fat: 0 },
      { name: 'מלח, פלפל שחור ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים חביתה מ-3 ביצים ומוסיפים גבינה צהובה שתימס מעל.',
      'קולים את פרוסות הלחם ומועכים עליהן אבוקדו.',
      'מגישים את החביתה עם הטוסטים ועגבנייה חתוכה, מפוזרת בפטרוזיליה.',
    ],
  },
  {
    id: 'mb_oatmeal_protein',
    slot: 'breakfast', diets: ['masa'], tags: ['veg', 'gluten', 'dairy', 'nuts'],
    name: 'קוואקר חם עם חלב, חלבון, בננה ואגוזים',
    ingredients: [
      { name: 'שיבולת שועל', grams: 80, home: 'כוס', kcal: 311, protein: 13.6, carbs: 53, fat: 5.6 },
      { name: 'חלב 2%', grams: 200, liquid: true, home: 'כוס', kcal: 100, protein: 6.6, carbs: 9.6, fat: 3.4 },
      { name: 'אבקת חלבון', grams: 30, count: 1, unit: 'סקופ', home: 'סקופ', kcal: 115, protein: 24, carbs: 3, fat: 1 },
      { name: 'בננה', grams: 120, count: 1, unit: 'יחידה', home: 'בננה', kcal: 107, protein: 1.3, carbs: 27, fat: 0.4 },
      { name: 'חמאת בוטנים טבעית', grams: 20, count: 1, unit: 'כף', home: 'כף', kcal: 118, protein: 5, carbs: 4, fat: 10 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מבשלים שיבולת שועל עם החלב על אש בינונית עד להסמכה.',
      'מסירים מהאש ומערבבים פנימה אבקת חלבון.',
      'מגישים עם בננה פרוסה, חמאת בוטנים וקינמון מעל.',
    ],
  },
  {
    id: 'mb_shakshuka_mass',
    slot: 'breakfast', diets: ['masa'], tags: ['veg', 'gluten', 'dairy', 'egg'],
    name: 'שקשוקה עשירה עם גבינה בולגרית 5% ולחם מלא',
    ingredients: [
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 233, protein: 19.5, carbs: 1.5, fat: 16.5 },
      { name: 'רוטב עגבניות ופלפלים', grams: 200, home: 'מחבת', kcal: 80, protein: 3.3, carbs: 14.7, fat: 0.67 },
      { name: 'גבינה בולגרית 5%', grams: 50, home: '2 פרוסות', kcal: 72.5, protein: 7.5, carbs: 1.5, fat: 4 },
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 120, protein: 6, carbs: 21, fat: 1.5 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'פפריקה, כמון, שום ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מחממים רוטב עגבניות ופלפלים עם שום, פפריקה וכמון בשמן זית.',
      'שוברים פנימה ביצים ומבשלים בכיסוי עד שהחלבון נקרש.',
      'מפוררים גבינה בולגרית מעל, מפזרים פטרוזיליה ומגישים עם לחם מלא.',
    ],
  },
  {
    id: 'mb_french_toast_protein',
    slot: 'breakfast', diets: ['masa'], tags: ['gluten', 'egg'],
    name: 'טוסט צרפתי (ביצים) מטוגן עם בננה ודבש',
    ingredients: [
      { name: 'לחם מלא', grams: 90, count: 3, unit: 'פרוסות', home: '3 פרוסות', kcal: 180, protein: 9, carbs: 31.5, fat: 2.25 },
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1, fat: 11 },
      { name: 'חלבוני ביצה', grams: 66, count: 2, unit: 'חלבונים', home: '2 חלבונים', kcal: 34, protein: 7, carbs: 0, fat: 0 },
      { name: 'בננה', grams: 120, count: 1, unit: 'יחידה', home: 'בננה', kcal: 107, protein: 1.3, carbs: 27, fat: 0.3 },
      { name: 'דבש', grams: 20, count: 1, unit: 'כף', home: 'כף', kcal: 61, protein: 0.06, carbs: 16.5, fat: 0 },
      { name: 'קינמון וניל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'טורפים ביצים וחלבונים עם קינמון, וטובלים בהם את פרוסות הלחם.',
      'מטגנים במחבת מרופדת בתרסיס שמן עד להזהבה משני הצדדים.',
      'מגישים עם בננה פרוסה וטפטוף דבש מעל.',
    ],
  },

  /* ===================== ארוחות ביניים — מסה ===================== */
  {
    id: 'ms1_yogurt_granola_mass',
    slot: 'snack1', diets: ['masa'], tags: ['veg', 'gluten', 'dairy'],
    name: 'יוגורט יווני 5% עם גרנולה טבעית ובננה',
    ingredients: [
      { name: 'יוגורט יווני 5%', grams: 150, home: 'גביע', kcal: 145.5, protein: 13.5, carbs: 6, fat: 7.5 },
      { name: 'גרנולה טבעית ללא סוכר', grams: 25, home: '2 כפות', kcal: 108, protein: 3.3, carbs: 15, fat: 4 },
      { name: 'בננה', grams: 80, home: 'חצי בננה', kcal: 71, protein: 0.9, carbs: 18, fat: 0.2 },
    ],
    steps: ['מערבבים יוגורט עם גרנולה הטבעית ובננה פרוסה.'],
  },
  {
    id: 'ms1_turkey_sandwich',
    slot: 'snack1', diets: ['masa'], tags: ['gluten'],
    name: 'כריך חזה הודו, אבוקדו ופלפל אדום בלחם מלא',
    ingredients: [
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 160, protein: 8, carbs: 28, fat: 2 },
      { name: 'חזה הודו פרוס', grams: 60, count: 3, unit: 'פרוסות', home: '3 פרוסות', kcal: 81, protein: 18, carbs: 0, fat: 0.6 },
      { name: 'אבוקדו', grams: 30, home: 'רבע אבוקדו', kcal: 48, protein: 0.6, carbs: 2.7, fat: 4.5 },
      { name: 'פלפל אדום וחסה', grams: 50, home: 'לפי הטעם', kcal: 12.5, protein: 0.5, carbs: 2.5, fat: 0.15 },
    ],
    steps: ['מרכיבים כריך מלחם מלא עם הודו, אבוקדו מרוח, פלפל אדום וחסה.'],
  },
  {
    id: 'ms1_strawberry_banana_shake',
    slot: 'snack1', diets: ['masa'], tags: ['veg', 'dairy'],
    name: 'שייק תותים, בננה ויוגורט יווני 5%',
    ingredients: [
      { name: 'יוגורט יווני 5%', grams: 150, home: 'גביע', kcal: 145.5, protein: 13.5, carbs: 6, fat: 7.5 },
      { name: 'תותים', grams: 100, home: 'חופן', kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
      { name: 'בננה', grams: 100, home: 'בננה', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 },
      { name: 'דבש', grams: 10, home: 'חצי כף', kcal: 30, protein: 0.03, carbs: 8.2, fat: 0 },
    ],
    steps: [
      'מכניסים את כל המרכיבים לבלנדר.',
      'טוחנים לשייק חלק וקרמי — בלי שיבולת שועל, מרקם חלק מובטח.',
    ],
  },
  {
    id: 'ms1_rice_cakes_pb',
    slot: 'snack1', diets: ['masa'], tags: ['veg', 'vegan', 'nuts'],
    name: 'פריכיות אורז עם חמאת בוטנים ובננה',
    ingredients: [
      { name: 'פריכיות אורז מלא', grams: 27, count: 3, unit: 'יחידות', home: '3 פריכיות', kcal: 104.5, protein: 2.2, carbs: 21.9, fat: 0.8 },
      { name: 'חמאת בוטנים טבעית', grams: 30, count: 2, unit: 'כפות', home: '2 כפות', kcal: 176, protein: 7.5, carbs: 6, fat: 15 },
      { name: 'בננה', grams: 60, home: 'חצי בננה', kcal: 53, protein: 0.66, carbs: 13.8, fat: 0.18 },
    ],
    steps: ['מורחים חמאת בוטנים על הפריכיות ומניחים פרוסות בננה מעל.'],
  },
  {
    id: 'ms1_cottage3_banana_honey',
    slot: 'snack1', diets: ['masa'], tags: ['veg', 'dairy'],
    name: 'קוטג\' 3% עם בננה ודבש',
    ingredients: [
      { name: 'גבינת קוטג\' 3%', grams: 150, home: 'גביע', kcal: 135, protein: 16.5, carbs: 5.25, fat: 4.5 },
      { name: 'בננה', grams: 100, count: 1, unit: 'יחידה', home: 'בננה', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 },
      { name: 'דבש', grams: 10, home: 'חצי כף', kcal: 30, protein: 0.03, carbs: 8.24, fat: 0 },
    ],
    steps: ['פורסים בננה על הקוטג\' ומטפטפים דבש.'],
  },
  {
    id: 'ms1_labneh_zaatar_pita',
    slot: 'snack1', diets: ['masa'], tags: ['veg', 'gluten', 'dairy'],
    name: 'לבנה עם זעתר ושמן זית על פיתה מלאה',
    ingredients: [
      { name: 'לבנה', grams: 150, home: 'קערית', kcal: 180, protein: 10.5, carbs: 7.5, fat: 12 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'פיתה מלאה', grams: 60, count: 1, unit: 'יחידה', home: 'פיתה', kcal: 147, protein: 5.4, carbs: 28.8, fat: 0.9 },
      { name: 'זעתר', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['שופכים שמן זית על הלבנה, מפזרים זעתר ומגישים עם פיתה חמה.'],
  },

  /* ===================== ארוחות צהריים — מסה ===================== */
  {
    id: 'ml_lentil_coconut_curry',
    slot: 'lunch', diets: ['masa'], tags: ['veg', 'vegan', 'nuts'],
    name: 'קארי עדשים וירקות עם אורז מלא ושקדים',
    ingredients: [
      { name: 'עדשים מבושלות', grams: 200, home: 'כוס', kcal: 232, protein: 18, carbs: 40, fat: 0.8 },
      { name: 'חלב קוקוס (שימורים)', grams: 100, liquid: true, home: 'חצי קופסה', kcal: 180, protein: 2, carbs: 3, fat: 18 },
      { name: 'אורז מלא מבושל', grams: 180, home: 'כוס', kcal: 202, protein: 4.7, carbs: 42.3, fat: 1.6 },
      { name: 'בצל, גזר וקישוא', grams: 150, home: 'קערה', kcal: 55, protein: 2, carbs: 10, fat: 0.5 },
      { name: 'שמן קוקוס', grams: 10, home: 'כף', kcal: 90, protein: 0, carbs: 0, fat: 10 },
      { name: 'שקדים', grams: 15, home: 'חופן קטן (לקישוט)', kcal: 87, protein: 3.2, carbs: 3.25, fat: 7.5 },
      { name: 'כורכום, כמון וכוסברה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים בצל, גזר וקישוא בשמן קוקוס עם כורכום, כמון וכוסברה.',
      'מוסיפים עדשים מבושלות וחלב קוקוס ומבשלים כ-8-10 דקות עד שהרוטב מסמיך.',
      'מגישים על אורז מלא ומפזרים שקדים קלויים מעל.',
    ],
  },
  {
    id: 'ml_creamy_mushroom_pasta',
    slot: 'lunch', diets: ['masa'], tags: ['veg', 'gluten', 'dairy'],
    name: 'פסטה ברוטב שמנת עם פטריות וגבינה צהובה',
    ingredients: [
      { name: 'פסטה מלאה מבושלת', grams: 200, home: 'שני כוסות', kcal: 248, protein: 10.6, carbs: 50, fat: 2 },
      { name: 'פטריות', grams: 150, home: 'קערה', kcal: 32.5, protein: 4.75, carbs: 5, fat: 0.5 },
      { name: 'שמנת מתוקה 38%', grams: 80, home: '5 כפות', kcal: 272, protein: 1.6, carbs: 2.4, fat: 28.8 },
      { name: 'גבינה צהובה 28%', grams: 30, home: 'פרוסה', kcal: 105, protein: 7.5, carbs: 0.6, fat: 8.4 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מבשלים פסטה מלאה לפי ההוראות שעל האריזה.',
      'מטגנים פטריות ושום בשמן זית עד ריכוך.',
      'מוסיפים שמנת מתוקה ומביאים לרתיחה קלה, מערבבים פנימה גבינה צהובה מגוררת עד שנמסה.',
      'מערבבים עם הפסטה ומפזרים פטרוזיליה קצוצה.',
    ],
  },
  {
    id: 'ml_chicken_rice_legumes',
    slot: 'lunch', diets: ['masa'], tags: [],
    name: 'חזה עוף עם אורז מלא, עדשים וסלט ירקות',
    ingredients: [
      { name: 'חזה עוף', grams: 200, home: 'חזה גדול', kcal: 330, protein: 62, carbs: 0, fat: 7.2 },
      { name: 'אורז מלא מבושל', grams: 300, home: 'צלחת גדולה', kcal: 330, protein: 6.9, carbs: 69, fat: 2.7 },
      { name: 'עדשים מבושלות', grams: 120, home: 'כוס', kcal: 139, protein: 10.8, carbs: 24, fat: 0.5 },
      { name: 'מלפפון, עגבנייה, פלפל ובצל סגול', grams: 150, home: 'קערה', kcal: 38, protein: 1.5, carbs: 8, fat: 0.4 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'כמון, כורכום, שום ופפריקה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים חזה עוף בכמון, כורכום, שום ופפריקה וצולים על מחבת פסים.',
      'מחממים אורז מלא ועדשים מבושלים.',
      'מגישים הכול לצד סלט ירקות טרי בתיבול שמן זית ולימון.',
    ],
  },
  {
    id: 'ml_beef_potato',
    slot: 'lunch', diets: ['masa'], tags: [],
    name: 'בשר בקר רזה עם תפוחי אדמה וירקות צלויים',
    ingredients: [
      { name: 'בשר בקר רזה', grams: 170, home: 'סטייק', kcal: 369, protein: 44, carbs: 0, fat: 20.4 },
      { name: 'תפוחי אדמה', grams: 400, home: '3 בינוניים', kcal: 308, protein: 8, carbs: 68, fat: 0.4 },
      { name: 'קישוא, פלפל ובצל', grams: 150, home: 'מנה', kcal: 60, protein: 2, carbs: 12, fat: 1 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'רוזמרין, שום, פפריקה, מלח ופלפל שחור גרוס', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'צורבים את הבקר במחבת חמה לדרגת העשייה הרצויה, מתבלים במלח ופלפל גרוס.',
      'אופים תפוחי אדמה וירקות בתנור ב-200° עם שמן זית, רוזמרין ושום.',
      'מגישים יחד חם.',
    ],
  },
  {
    id: 'ml_bolognese',
    slot: 'lunch', diets: ['masa'], tags: ['gluten'],
    name: 'פסטה מלאה בולונז עם בשר טחון',
    ingredients: [
      { name: 'פסטה מלאה מבושלת', grams: 380, home: 'צלחת גדולה', kcal: 471, protein: 19, carbs: 93.7, fat: 4.1 },
      { name: 'בשר בקר טחון רזה', grams: 130, home: 'מנה', kcal: 283, protein: 33.8, carbs: 0, fat: 15.6 },
      { name: 'רוטב עגבניות', grams: 150, home: 'מצקת גדולה', kcal: 53, protein: 2, carbs: 11, fat: 0.5 },
      { name: 'שום, בצל, אורגנו, בזיליקום טרי, עלה דפנה ופתיתי צ\'ילי', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים בשר טחון עם שום ובצל קצוץ עד להשחמה.',
      'מוסיפים רוטב עגבניות, אורגנו, בזיליקום ועלה דפנה, ומבשלים על אש נמוכה כ-15 דק\'.',
      'מערבבים עם הפסטה המבושלת ומגישים חם. (מנה בשרית — ללא תוספת גבינה, בהתאם לכשרות.)',
    ],
  },
  {
    id: 'ml_beef_rice_veg',
    slot: 'lunch', diets: ['masa'], tags: ['gluten'],
    name: 'נתחי בקר מוקפצים עם אורז וירקות ברוטב סויה קליל',
    ingredients: [
      { name: 'בשר בקר רזה', grams: 180, home: 'מנה', kcal: 390.6, protein: 46.8, carbs: 0, fat: 21.6 },
      { name: 'אורז לבן מבושל', grams: 250, home: 'צלחת', kcal: 325, protein: 6.75, carbs: 70, fat: 0.75 },
      { name: 'ברוקולי, גזר ופלפל אדום', grams: 180, home: 'קערה', kcal: 61, protein: 3.2, carbs: 12.6, fat: 0.6 },
      { name: 'שמן שומשום', grams: 7, count: 1, unit: 'כפית', home: 'כפית', kcal: 62, protein: 0, carbs: 0, fat: 7 },
      { name: 'רוטב סויה דל נתרן', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 8, protein: 0.8, carbs: 0.8, fat: 0 },
      { name: 'שום וג\'ינג\'ר טרי', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים בקר לרצועות ומקפיצים בשמן שומשום על אש גבוהה.',
      'מוסיפים שום, ג\'ינג\'ר וירקות ומקפיצים עוד 3-4 דק\'.',
      'מוסיפים רוטב סויה, מערבבים ומגישים על אורז.',
    ],
  },

  /* ===================== ארוחות ערב — מסה ===================== */
  {
    id: 'md_chickpea_quinoa_patties',
    slot: 'dinner', diets: ['masa'], tags: ['veg', 'vegan'],
    name: 'קציצות חומוס וקינואה עם בטטה אפויה',
    ingredients: [
      { name: 'חומוס', grams: 150, home: 'קופסה', kcal: 249, protein: 11.85, carbs: 21, fat: 14.4 },
      { name: 'קינואה מבושלת', grams: 100, home: 'חצי כוס', kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
      { name: 'בטטה', grams: 200, count: 1, unit: 'יחידה', home: 'בטטה בינונית', kcal: 180, protein: 4, carbs: 42, fat: 0.2 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'כמון, פפריקה ושום', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מערבבים חומוס וקינואה מבושלת עם כמון ופפריקה, ומעצבים לקציצות.',
      'אופים קציצות בתנור ב-200° כ-20 דק\' עד להזהבה (הופכים באמצע).',
      'צולים בטטה חתוכה לקוביות עם שמן זית ב-200° כ-25-30 דק\'.',
      'מגישים יחד.',
    ],
  },
  {
    id: 'md_veg_lasagna',
    slot: 'dinner', diets: ['masa'], tags: ['veg', 'gluten', 'dairy'],
    name: 'לזניית ירקות עם מוצרלה וריקוטה',
    ingredients: [
      { name: 'פסטה מלאה מבושלת', grams: 150, home: 'יריעות/פסטה', kcal: 186, protein: 8, carbs: 37.5, fat: 1.5 },
      { name: 'קישוא', grams: 150, home: 'קישוא בינוני', kcal: 25.5, protein: 1.8, carbs: 4.65, fat: 0.45 },
      { name: 'רוטב עגבניות', grams: 150, home: 'קערית', kcal: 45, protein: 2.25, carbs: 9, fat: 0.45 },
      { name: 'מוצרלה מלאה', grams: 80, home: 'כדור', kcal: 224, protein: 17.6, carbs: 1.6, fat: 16.8 },
      { name: 'ריקוטה קלה', grams: 100, home: 'גביע', kcal: 110, protein: 10, carbs: 4, fat: 6 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'אורגנו ובזיליקום', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מבשלים את הפסטה לפי ההוראות שעל האריזה.',
      'מטגנים קישוא בשמן זית עד ריכוך, ומערבבים עם רוטב העגבניות.',
      'מסדרים בתבנית שכבות לסירוגין: פסטה, רוטב ירקות, ריקוטה, מוצרלה מגוררת — וחוזר חלילה.',
      'אופים בתנור ב-190° כ-25 דקות עד שהגבינה מוזהבת ומבעבעת.',
    ],
  },
  {
    id: 'md_salmon_rice',
    slot: 'dinner', diets: ['masa'], tags: [],
    name: 'סלמון אפוי עם אורז מלא ובטטה',
    ingredients: [
      { name: 'פילה סלמון', grams: 150, home: 'פילה בינוני', kcal: 312, protein: 30, carbs: 0, fat: 19.5 },
      { name: 'אורז מלא מבושל', grams: 250, home: 'צלחת', kcal: 275, protein: 5.8, carbs: 57.5, fat: 2.3 },
      { name: 'בטטה', grams: 200, home: 'בטטה גדולה', kcal: 172, protein: 3.2, carbs: 40, fat: 0.3 },
      { name: 'ברוקולי', grams: 100, home: 'קערית', kcal: 34, protein: 2.8, carbs: 7, fat: 0.4 },
      { name: 'שום, שמיר טרי ופפריקה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים סלמון בשום, שמיר ופפריקה ואופים ב-200° יחד עם הבטטה כ-20 דק\'.',
      'מוסיפים ברוקולי לקיטור ל-8 הדקות האחרונות.',
      'מגישים על מצע אורז מלא.',
    ],
  },
  {
    id: 'md_chicken_rice_salad',
    slot: 'dinner', diets: ['masa'], tags: [],
    name: 'חזה עוף עם אורז מלא, אבוקדו וסלט כרוב',
    ingredients: [
      { name: 'חזה עוף', grams: 200, home: 'חזה גדול', kcal: 330, protein: 62, carbs: 0, fat: 7.2 },
      { name: 'אורז מלא מבושל', grams: 280, home: 'צלחת גדולה', kcal: 308, protein: 6.4, carbs: 64.4, fat: 2.5 },
      { name: 'כרוב סגול, גזר ופלפל צהוב', grams: 150, home: 'קערה', kcal: 42, protein: 1.7, carbs: 9, fat: 0.3 },
      { name: 'אבוקדו', grams: 40, home: 'רבע אבוקדו', kcal: 64, protein: 0.8, carbs: 3.6, fat: 6 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'פפריקה, כמון ושום', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים חזה עוף בפפריקה, כמון ושום וצולים.',
      'מכינים סלט כרוב סגול, גזר ופלפל עם אבוקדו ושמן זית.',
      'מגישים על מצע אורז מלא.',
    ],
  },
  {
    id: 'md_chicken_noodles',
    slot: 'dinner', diets: ['masa'], tags: [],
    name: 'חזה עוף מוקפץ עם אטריות אורז וירקות',
    ingredients: [
      { name: 'חזה עוף', grams: 170, home: 'חזה בינוני', kcal: 281, protein: 53.3, carbs: 0, fat: 6.1 },
      { name: 'אטריות אורז מבושלות', grams: 300, home: 'צלחת גדולה', kcal: 324, protein: 6, carbs: 72, fat: 0.6 },
      { name: 'ברוקולי, גזר ופלפל צהוב', grams: 150, home: 'קערה', kcal: 55, protein: 3, carbs: 11, fat: 0.5 },
      { name: 'שמן שומשום', grams: 7, count: 1, unit: 'כפית', home: 'כפית', kcal: 62, protein: 0, carbs: 0, fat: 7 },
      { name: 'שום, ג\'ינג\'ר ורוטב סויה דל נתרן', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מקפיצים רצועות עוף בשמן שומשום על אש גבוהה.',
      'מוסיפים שום, ג\'ינג\'ר וירקות, מקפיצים ומתבלים בסויה דלת מלח.',
      'מוסיפים את האטריות המבושלות, מערבבים ומגישים.',
    ],
  },
  {
    id: 'md_beef_sweet_potato_mash',
    slot: 'dinner', diets: ['masa'], tags: [],
    name: 'קציצות בקר עם מחית בטטה ואפונה ירוקה',
    ingredients: [
      { name: 'בשר בקר טחון רזה', grams: 180, home: 'מנה', kcal: 390.6, protein: 46.8, carbs: 0, fat: 21.6 },
      { name: 'בטטה (למחית)', grams: 250, home: '2 בטטות', kcal: 215, protein: 4, carbs: 50, fat: 0.25 },
      { name: 'אפונה ירוקה', grams: 80, home: 'חצי כוס', kcal: 65, protein: 4.3, carbs: 11.6, fat: 0.3 },
      { name: 'ברוקולי', grams: 70, home: 'קערית', kcal: 24, protein: 2, carbs: 4.9, fat: 0.3 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'שום, פפריקה, טימין, מלח ופלפל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מערבבים בשר טחון עם שום ופפריקה ומגלגלים קציצות, צולים במחבת.',
      'מבשלים בטטה עד ריכוך ומועכים למחית חלקה עם שמן זית וטימין.',
      'מאדים אפונה וברוקולי ומגישים לצד הקציצות והמחית.',
    ],
  },

  /* ===================== חטיפים — מסה ===================== */
  {
    id: 'ms2_pb_banana_sandwich',
    slot: 'snack2', diets: ['masa'], tags: ['veg', 'vegan', 'gluten', 'nuts'],
    name: 'כריך חמאת בוטנים ובננה',
    ingredients: [
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 160, protein: 8, carbs: 28, fat: 2 },
      { name: 'חמאת בוטנים טבעית', grams: 30, count: 2, unit: 'כפות', home: '2 כפות', kcal: 176, protein: 7.5, carbs: 6, fat: 15 },
      { name: 'בננה', grams: 60, home: 'חצי בננה', kcal: 53, protein: 0.6, carbs: 14, fat: 0.3 },
    ],
    steps: ['מורחים חמאת בוטנים על הלחם ומסדרים פרוסות בננה מעל.'],
  },
  {
    id: 'ms2_tuna_sandwich',
    slot: 'snack2', diets: ['masa'], tags: ['gluten'],
    name: 'כריך טונה עם עגבנייה ומלפפון בלחם מלא',
    ingredients: [
      { name: 'טונה במים', grams: 80, home: 'קופסה קטנה', kcal: 93, protein: 20.8, carbs: 0, fat: 0.8 },
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 160, protein: 8, carbs: 28, fat: 2 },
      { name: 'עגבנייה', grams: 40, home: 'חצי עגבנייה', kcal: 7, protein: 0.35, carbs: 1.5, fat: 0.08 },
      { name: 'מלפפון', grams: 40, home: 'חצי מלפפון קטן', kcal: 6, protein: 0.28, carbs: 1.45, fat: 0.04 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
    ],
    steps: ['מסננים את הטונה ומערבבים עם שמן זית, מניחים על פרוסת לחם עם עגבנייה ומלפפון פרוסים וסוגרים בפרוסה השנייה.'],
  },
  {
    id: 'ms2_mozzarella_caprese',
    slot: 'snack2', diets: ['masa'], tags: ['veg', 'dairy'],
    name: 'מוצרלה עם עגבניות שרי ובזיליקום (קפרזה)',
    ingredients: [
      { name: 'מוצרלה מלאה', grams: 60, home: 'כדור קטן', kcal: 168, protein: 13.2, carbs: 1.2, fat: 12.6 },
      { name: 'עגבניות שרי', grams: 80, home: 'חופן', kcal: 14.4, protein: 0.72, carbs: 3.1, fat: 0.16 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'בזיליקום טרי', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['פורסים מוצרלה, מסדרים עם עגבניות שרי, מטפטפים שמן זית ומפזרים בזיליקום.'],
  },
  {
    id: 'ms2_dates_almond_butter',
    slot: 'snack2', diets: ['masa'], tags: ['veg', 'vegan', 'nuts'],
    name: 'תמרים במילוי חמאת שקדים',
    ingredients: [
      { name: 'תמרים', grams: 60, home: '3-4 תמרים', kcal: 169, protein: 1.5, carbs: 45, fat: 0.24 },
      { name: 'חמאת שקדים טבעית', grams: 20, home: 'כף גדושה', kcal: 120, protein: 4, carbs: 4, fat: 10 },
    ],
    steps: ['חוצים כל תמר ומוציאים את הגלעין, וממלאים בחמאת שקדים בעזרת כפית.'],
  },

  /* ===================== מתכוני קינוח — מסה ===================== */
  {
    id: 'mds_energy_balls',
    slot: 'dessert', diets: ['masa'], tags: ['veg', 'gluten', 'dairy', 'nuts'],
    name: 'בולי אנרגיה חמאת בוטנים, שיבולת שועל ושוקולד מריר',
    yield: 'כ-12 בולים',
    serving: { label: '2 בולים', kcal: 238, protein: 11, carbs: 24, fat: 12 },
    ingredients: [
      { name: 'שיבולת שועל', grams: 100, home: 'כוס', kcal: 389, protein: 17, carbs: 66, fat: 7 },
      { name: 'חמאת בוטנים טבעית', grams: 100, home: '6 כפות', kcal: 588, protein: 25, carbs: 20, fat: 50 },
      { name: 'דבש', grams: 40, count: 2, unit: 'כפות', home: '2 כפות', kcal: 122, protein: 0, carbs: 33, fat: 0 },
      { name: 'שוקולד מריר (צ\'יפס)', grams: 40, home: '3 כפות', kcal: 210, protein: 2, carbs: 24, fat: 13 },
      { name: 'אבקת חלבון', grams: 30, count: 1, unit: 'סקופ', home: 'סקופ', kcal: 115, protein: 24, carbs: 3, fat: 1 },
    ],
    steps: [
      'מערבבים את כל המרכיבים בקערה עד שנוצרת עיסה דביקה.',
      'מגלגלים ל-12 כדורים ומצננים במקרר כ-30 דקות.',
      'שומרים בקופסה אטומה — חטיף אנרגיה מושלם בין ארוחות.',
    ],
  },
  {
    id: 'mds_banana_muffins',
    slot: 'dessert', diets: ['masa'], tags: ['veg', 'gluten', 'dairy', 'nuts', 'egg'],
    name: 'מאפינס בננה וחלבון',
    yield: 'כ-8 מאפינס',
    serving: { label: 'מאפין', kcal: 180, protein: 11, carbs: 18, fat: 5 },
    ingredients: [
      { name: 'שיבולת שועל טחונה', grams: 120, home: 'כוס', kcal: 467, protein: 20, carbs: 79, fat: 8.4 },
      { name: 'בננות בשלות מעוכות', grams: 240, count: 2, unit: 'יחידות', home: '2 בננות', kcal: 214, protein: 2.6, carbs: 54, fat: 0.8 },
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1, fat: 11 },
      { name: 'אבקת חלבון', grams: 60, count: 2, unit: 'סקופים', home: '2 סקופים', kcal: 230, protein: 48, carbs: 6, fat: 2 },
      { name: 'חמאת בוטנים טבעית', grams: 30, count: 2, unit: 'כפות', home: '2 כפות', kcal: 176, protein: 7.5, carbs: 6, fat: 15 },
      { name: 'אבקת אפייה וקינמון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מועכים בננות וטורפים עם הביצים.',
      'מוסיפים שיבולת שועל טחונה, אבקת חלבון, חמאת בוטנים ואבקת אפייה ומערבבים.',
      'יוצקים לתבנית מאפינס ואופים ב-180° כ-20 דקות.',
    ],
  },

  /* ========================================================================= */
  /* =========================== תזונה קטוגנית 🥑 ============================= */
  /* בשר/עוף/הודו/כבש לא מעורבבים עם חלב באותה מנה — כשרות נשמרת גם כאן.        */
  /* קירור השומן במנות בשריות: שמן זית בלבד. שומן מהחלב (חמאה/שמנת/גבינה)      */
  /* שמור לדגים ולמנות חלביות/פרווה בלבד.                                       */
  /* ========================================================================= */

  /* ===================== ארוחות בוקר — קיטו ===================== */
  {
    id: 'kb_cheese_omelet_avocado',
    slot: 'breakfast', diets: ['keto'], tags: ['veg', 'dairy', 'egg'],
    name: 'חביתת גבינה ותרד עם אבוקדו וזיתים',
    ingredients: [
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 232.5, protein: 19.5, carbs: 1.65, fat: 16.5 },
      { name: 'גבינה צהובה 28%', grams: 30, home: 'פרוסה', kcal: 105, protein: 7.5, carbs: 0.6, fat: 8.4 },
      { name: 'תרד טרי', grams: 30, home: 'חופן', kcal: 6.9, protein: 0.87, carbs: 1.08, fat: 0.12 },
      { name: 'אבוקדו', grams: 50, home: 'חצי אבוקדו קטן', kcal: 80, protein: 1, carbs: 4.5, fat: 7.5 },
      { name: 'זיתים', grams: 20, home: 'כ-6 זיתים', kcal: 23, protein: 0.16, carbs: 1.2, fat: 2.2 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'מלח ופלפל שחור', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים תרד בשמן זית עד ריכוך.',
      'טורפים ביצים, יוצקים למחבת ומבשלים לחביתה, מפזרים גבינה מגוררת שתימס.',
      'מגישים עם אבוקדו וזיתים לצד החביתה.',
    ],
  },
  {
    id: 'kb_yogurt_macadamia',
    slot: 'breakfast', diets: ['keto'], tags: ['veg', 'dairy', 'nuts'],
    name: 'קערת יוגורט יווני 10% עם פירות יער, אגוזי מקדמיה וקוקוס',
    ingredients: [
      { name: 'יוגורט יווני 10%', grams: 200, home: 'גביע גדול', kcal: 260, protein: 16, carbs: 8, fat: 18 },
      { name: 'פירות יער', grams: 40, home: 'חופן קטן', kcal: 17, protein: 0.44, carbs: 4, fat: 0.12 },
      { name: 'אגוזי מקדמיה', grams: 20, home: 'חופן', kcal: 144, protein: 1.6, carbs: 2.8, fat: 15.2 },
      { name: 'קוקוס טחון ללא סוכר', grams: 10, home: 'כף', kcal: 66, protein: 0.69, carbs: 2.4, fat: 6.4 },
    ],
    steps: ['מערבבים יוגורט עם פירות יער, אגוזי מקדמיה קצוצים וקוקוס טחון.'],
  },
  {
    id: 'kb_shakshuka_feta',
    slot: 'breakfast', diets: ['keto'], tags: ['veg', 'dairy', 'egg'],
    name: 'שקשוקה קטוגנית עם כרוב, זיתים ופטה',
    ingredients: [
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
      { name: 'כרוב לבן פרוס דק', grams: 100, home: 'כ-1.5 כוסות פרוס', kcal: 25, protein: 1.3, carbs: 5.8, fat: 0.1 },
      { name: 'עגבניות שרי', grams: 50, home: 'חופן קטן', kcal: 9, protein: 0.45, carbs: 1.95, fat: 0.1 },
      { name: 'זיתים', grams: 25, home: 'כ-7 זיתים', kcal: 29, protein: 0.2, carbs: 1.5, fat: 2.75 },
      { name: 'פטה בולגרית 14%', grams: 40, home: 'קוביה', kcal: 106, protein: 5.6, carbs: 1.2, fat: 8.4 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'פפריקה, כמון ושום', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים כרוב פרוס בשמן זית עם פפריקה, כמון ושום עד ריכוך.',
      'מוסיפים עגבניות שרי חצויות וזיתים, ושוברים פנימה ביצים.',
      'מבשלים בכיסוי עד שהחלבון נקרש, מפוררים פטה מעל ומגישים.',
    ],
  },
  {
    id: 'kb_eggs_avocado_tahini',
    slot: 'breakfast', diets: ['keto'], tags: ['veg', 'egg'],
    name: 'קערת בוקר ישראלית: ביצים קשות, אבוקדו, מלפפון, זיתים וטחינה',
    ingredients: [
      { name: 'ביצים קשות', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
      { name: 'אבוקדו', grams: 60, home: 'חצי אבוקדו', kcal: 96, protein: 1.2, carbs: 5.4, fat: 9 },
      { name: 'מלפפון', grams: 100, home: 'מלפפון', kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
      { name: 'זיתים', grams: 25, home: 'כ-7 זיתים', kcal: 29, protein: 0.2, carbs: 1.5, fat: 2.75 },
      { name: 'טחינה גולמית', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 89, protein: 2.55, carbs: 3.15, fat: 8.1 },
      { name: 'זעתר, מלח ולימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים ביצים קשות, אבוקדו ומלפפון לקוביות.',
      'מסדרים בקערה עם זיתים ומטפטפים טחינה גולמית.',
      'מתבלים בזעתר, מלח ולימון.',
    ],
  },
  {
    id: 'kb_green_shake',
    slot: 'breakfast', diets: ['keto'], tags: ['veg', 'vegan', 'dairy'],
    name: 'שייק ירוק קטוגני — אבוקדו, חלב קוקוס ותרד',
    ingredients: [
      { name: 'אבוקדו', grams: 70, home: 'שני שליש אבוקדו', kcal: 112, protein: 1.4, carbs: 6.3, fat: 10.5 },
      { name: 'חלב קוקוס (שימורים)', grams: 150, liquid: true, home: 'כוס', kcal: 345, protein: 3.45, carbs: 8.25, fat: 36 },
      { name: 'אבקת חלבון בטעם וניל', grams: 30, count: 1, unit: 'סקופ', home: 'סקופ', kcal: 115, protein: 24, carbs: 3, fat: 1 },
      { name: 'תרד טרי', grams: 20, home: 'חופן קטן', kcal: 4.6, protein: 0.58, carbs: 0.72, fat: 0.08 },
      { name: 'קרח וקינמון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מכניסים את כל המרכיבים לבלנדר עם כמה קוביות קרח.',
      'טוחנים לשייק חלק וקרמי.',
    ],
  },

  /* ===================== ארוחות ביניים — קיטו ===================== */
  {
    id: 'ks1_avocado_macadamia_olives',
    slot: 'snack1', diets: ['keto'], tags: ['veg', 'vegan', 'nuts'],
    name: 'אבוקדו ואגוזי מקדמיה עם זיתים בשמן זית ולימון',
    ingredients: [
      { name: 'אבוקדו', grams: 80, home: 'שני שליש אבוקדו', kcal: 128, protein: 1.6, carbs: 7.2, fat: 12 },
      { name: 'אגוזי מקדמיה', grams: 20, home: 'חופן קטן', kcal: 143.6, protein: 1.58, carbs: 2.76, fat: 15.16 },
      { name: 'זיתים', grams: 20, home: 'כ-5 זיתים', kcal: 23, protein: 0.16, carbs: 1.2, fat: 2.2 },
      { name: 'לימון ומלח ים', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['חותכים אבוקדו לקוביות, מערבבים עם אגוזי מקדמיה וזיתים, ומתבלים בלימון ומלח ים.'],
  },
  {
    id: 'ks1_cream_cheese_veg',
    slot: 'snack1', diets: ['keto'], tags: ['veg', 'dairy'],
    name: 'גבינת שמנת 30% עם מקלות מלפפון, סלרי וכרוב סגול',
    ingredients: [
      { name: 'גבינת שמנת 30%', grams: 50, home: '3 כפות', kcal: 171, protein: 3, carbs: 2, fat: 17 },
      { name: 'מלפפון', grams: 60, home: 'חצי מלפפון', kcal: 9, protein: 0.42, carbs: 2.16, fat: 0.06 },
      { name: 'סלרי', grams: 40, home: 'קלמה', kcal: 6.4, protein: 0.28, carbs: 1.2, fat: 0.08 },
      { name: 'כרוב סגול', grams: 40, home: 'מקלות כרוב', kcal: 11, protein: 0.55, carbs: 2.5, fat: 0.06 },
    ],
    steps: ['חותכים ירקות לאצבעות וטובלים בגבינת השמנת.'],
  },
  {
    id: 'ks1_smoked_salmon_cream_cheese',
    slot: 'snack1', diets: ['keto'], tags: ['dairy'],
    name: 'סלמון מעושן עם גבינת שמנת 30% ומלפפון',
    ingredients: [
      { name: 'סלמון מעושן', grams: 60, home: '4-5 פרוסות', kcal: 70, protein: 10.8, carbs: 0, fat: 2.6 },
      { name: 'גבינת שמנת 30%', grams: 30, home: '2 כפות', kcal: 103, protein: 1.8, carbs: 1.2, fat: 10.2 },
      { name: 'מלפפון', grams: 80, home: 'מלפפון קטן', kcal: 12, protein: 0.56, carbs: 2.9, fat: 0.08 },
      { name: 'פלפל שחור גרוס', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'פורסים מלפפון לפרוסות דקות.',
      'מורחים על כל פרוסה מעט גבינת שמנת ומניחים מעליה פרוסת סלמון מעושן.',
      'מתבלים בפלפל שחור גרוס ומגישים כמו "מגש טעימות" קטן. (דג עם גבינת שמנת — מותר לפי כשרות.)',
    ],
  },
  {
    id: 'ks1_yogurt_coconut_walnuts',
    slot: 'snack1', diets: ['keto'], tags: ['veg', 'dairy', 'nuts'],
    name: 'יוגורט יווני 10% עם קוקוס טחון ואגוזי מלך',
    ingredients: [
      { name: 'יוגורט יווני 10%', grams: 150, home: 'גביע', kcal: 195, protein: 12, carbs: 6, fat: 13.5 },
      { name: 'קוקוס טחון ללא סוכר', grams: 10, home: 'כף', kcal: 66, protein: 0.69, carbs: 2.4, fat: 6.4 },
      { name: 'אגוזי מלך', grams: 15, home: 'חופן קטן', kcal: 98, protein: 2.25, carbs: 2.1, fat: 9.75 },
    ],
    steps: ['מערבבים יוגורט עם קוקוס טחון ואגוזי מלך קצוצים.'],
  },
  {
    id: 'ks1_mozzarella_caprese',
    slot: 'snack1', diets: ['keto'], tags: ['veg', 'dairy'],
    name: 'מוצרלה עם עגבניות שרי, בזיליקום ושמן זית (קפרזה)',
    ingredients: [
      { name: 'מוצרלה מלאה', grams: 100, home: 'כדור', kcal: 280, protein: 22, carbs: 2, fat: 21 },
      { name: 'עגבניות שרי', grams: 50, home: 'חופן', kcal: 9, protein: 0.45, carbs: 1.95, fat: 0.1 },
      { name: 'שמן זית', grams: 10, count: 2, unit: 'כפית', home: '2 כפיות', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'בזיליקום טרי', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['פורסים מוצרלה ועגבניות שרי, מטפטפים שמן זית ומפזרים עלי בזיליקום.'],
  },
  {
    id: 'ks1_cucumber_boats_cream',
    slot: 'snack1', diets: ['keto'], tags: ['veg', 'dairy'],
    name: 'סירות מלפפון ממולאות בגבינת שמנת',
    ingredients: [
      { name: 'מלפפון', grams: 150, home: '2 מלפפונים קטנים', kcal: 22.5, protein: 0.98, carbs: 5.4, fat: 0.17 },
      { name: 'גבינת שמנת 30%', grams: 60, home: '4 כפות', kcal: 205, protein: 3.6, carbs: 2.4, fat: 20.4 },
      { name: 'פפריקה ושמיר', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['חוצים את המלפפונים לאורך ומגרדים מעט מהמרכז ליצירת "סירה".', 'ממלאים בגבינת שמנת בעזרת כפית או שק זילוף, ומפזרים פפריקה ושמיר.'],
  },

  /* ===================== ארוחות צהריים — קיטו ===================== */
  {
    id: 'kl_cauliflower_cheddar_frittata',
    slot: 'lunch', diets: ['keto'], tags: ['veg', 'dairy', 'egg'],
    name: 'פריטטת כרובית וגבינה צהובה',
    ingredients: [
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 232.5, protein: 19.5, carbs: 1.65, fat: 16.5 },
      { name: 'כרובית', grams: 100, home: 'קערית', kcal: 25, protein: 1.9, carbs: 5, fat: 0.3 },
      { name: 'גבינה צהובה 28%', grams: 50, home: 'פרוסה וחצי', kcal: 175, protein: 12.5, carbs: 1, fat: 14 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'מלח, פלפל שחור ואגוז מוסקט', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מחתכים כרובית לפרחים קטנים ומאדים/מטגנים בשמן זית עד ריכוך.',
      'טורפים ביצים, מוסיפים כרובית וגבינה מגוררת, ומערבבים.',
      'יוצקים למחבת שניתנת לתנור ואופים ב-190° כ-15 דקות עד שהחביתה נקרשת ומוזהבת.',
    ],
  },
  {
    id: 'kl_tofu_avocado_macadamia_salad',
    slot: 'lunch', diets: ['keto'], tags: ['veg', 'vegan', 'nuts'],
    name: 'סלט אבוקדו, זיתים ואגוזי מקדמיה עם טופו מטוגן',
    ingredients: [
      { name: 'טופו קשה', grams: 150, home: 'חצי חבילה', kcal: 216, protein: 23.25, carbs: 4.5, fat: 13.05 },
      { name: 'חסה, מלפפון וכרוב סגול', grams: 150, home: 'קערה', kcal: 30, protein: 1.5, carbs: 4.5, fat: 0.3 },
      { name: 'אבוקדו', grams: 100, count: 1, unit: 'יחידה', home: 'אבוקדו שלם', kcal: 160, protein: 2, carbs: 9, fat: 15 },
      { name: 'זיתים', grams: 30, home: 'כ-8 זיתים', kcal: 34.8, protein: 0.24, carbs: 1.8, fat: 3.3 },
      { name: 'אגוזי מקדמיה', grams: 20, home: 'חופן קטן', kcal: 143.6, protein: 1.58, carbs: 2.76, fat: 15.16 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'לימון ומלח', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מייבשים טופו קשה במגבת נייר, חותכים לקוביות ומטגנים במחבת עם מעט שמן זית עד להשחמה מכל הצדדים.',
      'מכינים מצע מסלט ירקות, מוסיפים אבוקדו פרוס, זיתים ואגוזי מקדמיה קצוצים.',
      'מניחים את הטופו המטוגן מעל, ומתבלים בשמן זית ולימון.',
    ],
  },
  {
    id: 'kl_ribeye_greens',
    slot: 'lunch', diets: ['keto'], tags: [],
    name: 'סטייק אנטריקוט עם שעועית ירוקה, ברוקולי ואבוקדו',
    ingredients: [
      { name: 'סטייק אנטריקוט', grams: 130, home: 'סטייק בינוני', kcal: 378, protein: 31.85, carbs: 0, fat: 26.9 },
      { name: 'שעועית ירוקה', grams: 100, home: 'קערית', kcal: 31, protein: 1.8, carbs: 7, fat: 0.1 },
      { name: 'ברוקולי', grams: 80, home: 'קערית', kcal: 27, protein: 2.24, carbs: 5.6, fat: 0.32 },
      { name: 'אבוקדו', grams: 40, home: 'רבע אבוקדו', kcal: 64, protein: 0.8, carbs: 3.6, fat: 6 },
      { name: 'שמן זית', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 132, protein: 0, carbs: 0, fat: 15 },
      { name: 'שום, רוזמרין, מלח ופלפל שחור', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מוציאים את הסטייק מהמקרר כ-20 דקות מראש כדי שיגיע לטמפרטורת החדר.',
      'מורחים את הסטייק משני הצדדים בשמן זית, מלח גס ופלפל שחור גרוס, ומעסים קלות.',
      'מחממים מחבת (רצוי פסים או יצוקה) על אש גבוהה, שופכים לתוכה מעט שמן זית נוסף, וצולים את הסטייק לפי מידת העשייה הרצויה (כ-3-4 דק\' לכל צד למידה medium). מניחים לנוח 5 דק\' לפני החיתוך.',
      'מקפיצים שעועית וברוקולי בשמן זית ורוזמרין, ומגישים לצד הסטייק ופרוסות אבוקדו.',
    ],
  },
  {
    id: 'kl_chicken_skin_salad',
    slot: 'lunch', diets: ['keto'], tags: [],
    name: 'חזה עוף עם עור צלוי וסלט אבוקדו ושמן זית',
    ingredients: [
      { name: 'חזה עוף עם עור', grams: 150, home: 'חזה בינוני', kcal: 296, protein: 30, carbs: 0, fat: 18 },
      { name: 'חסה, מלפפון, כרוב סגול ובצל סגול', grams: 150, home: 'קערה', kcal: 30, protein: 1.5, carbs: 4.5, fat: 0.3 },
      { name: 'אבוקדו', grams: 70, home: 'שני שליש אבוקדו', kcal: 112, protein: 1.4, carbs: 6.3, fat: 10.5 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'פפריקה, שום ולימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים חזה עוף עם העור בפפריקה, שום ומלח, ומורחים במעט שמן זית.',
      'צולים בתנור או במחבת עם מעט שמן זית עד שהעור פריך והעוף מבושל במלואו.',
      'מכינים סלט ירקות טרי עם אבוקדו, מתבלים בשמן זית ולימון, ומגישים יחד.',
    ],
  },
  {
    id: 'kl_salmon_asparagus_butter',
    slot: 'lunch', diets: ['keto'], tags: ['dairy'],
    name: 'סלמון בתנור עם אספרגוס ברוטב חמאה-לימון',
    ingredients: [
      { name: 'פילה סלמון', grams: 150, home: 'פילה בינוני', kcal: 312, protein: 30, carbs: 0, fat: 19.5 },
      { name: 'אספרגוס', grams: 120, home: 'חבילה קטנה', kcal: 24, protein: 2.64, carbs: 4.68, fat: 0.12 },
      { name: 'חמאה', grams: 25, count: 1, unit: 'כף', home: 'כף גדושה', kcal: 179, protein: 0.23, carbs: 0.03, fat: 20.25 },
      { name: 'שום ומיץ לימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'משמנים תבנית אפייה בשמן זית, מניחים עליה סלמון ואספרגוס ואופים ב-200° כ-15 דק\'.',
      'ממיסים חמאה עם שום כתוש ומיץ לימון.',
      'מטפטפים את רוטב החמאה מעל לפני ההגשה. (דג עם חמאה — מותר לפי כשרות, בניגוד לבשר.)',
    ],
  },
  {
    id: 'kl_lamb_cauliflower_tahini',
    slot: 'lunch', diets: ['keto'], tags: [],
    name: 'קציצות טלה עם כרובית וטחינה',
    ingredients: [
      { name: 'בשר טלה טחון', grams: 130, home: 'מנה', kcal: 364, protein: 32.5, carbs: 0, fat: 24.7 },
      { name: 'כרובית', grams: 120, home: 'קערה', kcal: 30, protein: 2.28, carbs: 6, fat: 0.36 },
      { name: 'טחינה גולמית', grams: 30, count: 2, unit: 'כפות', home: '2 כפות', kcal: 179, protein: 5.1, carbs: 6.3, fat: 16.2 },
      { name: 'כמון, כוסברה, שום ומלח', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מערבבים טלה טחון עם כמון, כוסברה ושום כתוש, ומגלגלים קציצות.',
      'צולים במחבת עם שמן זית או שמן קוקוס (לבחירה) עד לבישול מלא והזהבה משני הצדדים.',
      'מאדים או צולים כרובית ומגישים לצד הקציצות עם טחינה גולמית מטפטפת.',
    ],
  },

  /* ===================== חטיפים — קיטו ===================== */
  {
    id: 'ks2_kale_chips',
    slot: 'snack2', diets: ['keto'], tags: ['veg', 'vegan'],
    name: 'צ\'יפס קייל אפוי בשמן זית ומלח ים',
    ingredients: [
      { name: 'קייל', grams: 100, home: 'צרור', kcal: 49, protein: 4.3, carbs: 8.8, fat: 0.9 },
      { name: 'שמן זית', grams: 10, count: 2, unit: 'כפית', home: '2 כפיות', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'מלח ים ופפריקה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'קורעים עלי קייל לחתיכות ומסירים את הגבעול המרכזי.',
      'מערבבים עם שמן זית ומלח ים.',
      'אופים ב-150° כ-12-15 דק\' עד לפריכות, תוך הפיכה באמצע.',
    ],
  },
  {
    id: 'ks2_olives_feta',
    slot: 'snack2', diets: ['keto'], tags: ['veg', 'dairy'],
    name: 'זיתים ופטה בולגרית עם שמן זית',
    ingredients: [
      { name: 'זיתים', grams: 60, home: '15 זיתים', kcal: 69, protein: 0.48, carbs: 3.6, fat: 6.6 },
      { name: 'פטה בולגרית 14%', grams: 50, home: 'קוביה', kcal: 132, protein: 7, carbs: 1.5, fat: 10.5 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
    ],
    steps: ['מערבבים זיתים וקוביות פטה בקערית ומטפטפים שמן זית.'],
  },
  {
    id: 'ks2_avocado_lemon',
    slot: 'snack2', diets: ['keto'], tags: ['veg', 'vegan'],
    name: 'אבוקדו במלח ים ולימון',
    ingredients: [
      { name: 'אבוקדו', grams: 100, count: 1, unit: 'יחידה', home: 'אבוקדו שלם', kcal: 160, protein: 2, carbs: 9, fat: 15 },
      { name: 'מלח ים, לימון ופלפל שחור', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['חוצים אבוקדו, מתבלים במלח ים גס, לימון ופלפל שחור ואוכלים בכפית.'],
  },
  {
    id: 'ks2_deviled_eggs_avocado',
    slot: 'snack2', diets: ['keto'], tags: ['veg', 'egg'],
    name: 'ביצים ממולאות באבוקדו',
    ingredients: [
      { name: 'ביצים קשות', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
      { name: 'אבוקדו', grams: 40, home: 'רבע אבוקדו', kcal: 64, protein: 0.8, carbs: 3.6, fat: 6 },
      { name: 'פפריקה חריפה ומיץ לימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חוצים ביצים קשות לאורך ומוציאים את החלמון.',
      'מועכים את החלמון עם אבוקדו, מיץ לימון ופפריקה חריפה.',
      'ממלאים בחזרה את חצאי הביצה בתערובת.',
    ],
  },

  /* ===================== ארוחות ערב — קיטו ===================== */
  {
    id: 'kd_roasted_cauliflower_butter_cheese',
    slot: 'dinner', diets: ['keto'], tags: ['veg', 'dairy', 'egg'],
    name: 'כרובית אפויה שלמה עם חמאה, שום וגבינה',
    ingredients: [
      { name: 'כרובית', grams: 250, home: 'ראש כרובית קטן', kcal: 62.5, protein: 4.75, carbs: 12.5, fat: 0.75 },
      { name: 'חמאה', grams: 30, home: '2 כפות', kcal: 215.1, protein: 0.26, carbs: 0.03, fat: 24.33 },
      { name: 'גבינה צהובה 28%', grams: 40, home: 'פרוסה גדולה', kcal: 140, protein: 10, carbs: 0.8, fat: 11.2 },
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים קשות', kcal: 155, protein: 13, carbs: 1, fat: 11 },
      { name: 'שום ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חוצים כרובית לפרחים גדולים ומניחים בתבנית אפייה.',
      'ממיסים חמאה עם שום כתוש ומטפטפים מעל הכרובית, מתבלים במלח ופלפל.',
      'אופים בתנור ב-200° כ-25-30 דקות עד לריכוך והזהבה, ומפזרים גבינה מגוררת ב-5 הדקות האחרונות להמסה.',
      'מגישים עם ביצים קשות פרוסות ופטרוזיליה קצוצה.',
    ],
  },
  {
    id: 'kd_tofu_spinach_coconut_curry',
    slot: 'dinner', diets: ['keto'], tags: ['veg', 'vegan'],
    name: 'קארי טופו ותרד בחלב קוקוס',
    ingredients: [
      { name: 'טופו קשה', grams: 150, home: 'חצי חבילה', kcal: 216, protein: 23.25, carbs: 4.5, fat: 13.05 },
      { name: 'תרד טרי', grams: 100, home: 'חופן גדול', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
      { name: 'חלב קוקוס (שימורים)', grams: 150, liquid: true, home: 'שלושת רבעי קופסה', kcal: 270, protein: 3, carbs: 4.5, fat: 27 },
      { name: 'שמן קוקוס', grams: 10, home: 'כף', kcal: 90, protein: 0, carbs: 0, fat: 10 },
      { name: 'כורכום, כמון וקארי', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מייבשים טופו קשה, חותכים לקוביות ומטגנים בשמן קוקוס עד להשחמה קלה.',
      'מוסיפים כורכום, כמון וקארי ומטגנים דקה עד שהתבלינים מפיצים ריח.',
      'יוצקים חלב קוקוס ומביאים לרתיחה עדינה, מבשלים כ-5 דקות.',
      'מוסיפים תרד ומבשלים עוד 2-3 דקות עד שנובל, ומגישים חם.',
    ],
  },
  {
    id: 'kd_chicken_thigh_broccoli',
    slot: 'dinner', diets: ['keto'], tags: [],
    name: 'פרגית עוף בתנור עם ברוקולי וכרובית',
    ingredients: [
      { name: 'פרגית עוף (עם עור)', grams: 130, home: 'ירך בינונית', kcal: 325, protein: 33.8, carbs: 0, fat: 20.8 },
      { name: 'ברוקולי', grams: 80, home: 'קערית', kcal: 27, protein: 2.24, carbs: 5.6, fat: 0.32 },
      { name: 'כרובית', grams: 80, home: 'קערית', kcal: 20, protein: 1.52, carbs: 4, fat: 0.24 },
      { name: 'שמן זית', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 132, protein: 0, carbs: 0, fat: 15 },
      { name: 'טחינה גולמית', grams: 10, home: 'דריזל', kcal: 60, protein: 1.7, carbs: 2.1, fat: 5.4 },
      { name: 'שום, טימין, מלח ופלפל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מחממים תנור ל-200°. מייבשים את הפרגית במגבת נייר כדי שהעור ייצא פריך יותר.',
      'מערבבים שום כתוש, טימין, מלח, פלפל ומחצית משמן הזית, ומורחים היטב את הפרגית משני הצדדים ומתחת לעור.',
      'מניחים בתבנית כשהעור כלפי מעלה ואופים 20 דק\'.',
      'מוסיפים לתבנית את הברוקולי והכרובית מעורבבים בשאר שמן הזית, וממשיכים לאפות יחד עוד כ-10-12 דק\' עד שהעוף מוכן במלואו והעור פריך.',
      'מטפטפים טחינה גולמית מעל לפני ההגשה.',
    ],
  },
  {
    id: 'kd_beef_burger_avocado',
    slot: 'dinner', diets: ['keto'], tags: [],
    name: 'המבורגר בקר עסיסי (ללא לחמנייה) עם אבוקדו ובצל סגול',
    ingredients: [
      { name: 'בקר טחון (רגיל)', grams: 180, home: 'קציצה גדולה', kcal: 457, protein: 30.6, carbs: 0, fat: 36 },
      { name: 'אבוקדו', grams: 60, home: 'חצי אבוקדו', kcal: 96, protein: 1.2, carbs: 5.4, fat: 9 },
      { name: 'בצל סגול', grams: 30, home: 'כמה טבעות', kcal: 12, protein: 0.33, carbs: 2.7, fat: 0.03 },
      { name: 'חסה ועגבנייה', grams: 80, home: 'לפי הטעם', kcal: 15, protein: 0.8, carbs: 2.8, fat: 0.1 },
      { name: 'מלח, פלפל שחור ופפריקה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מעצבים קציצת המבורגר עבה, מתבלים במלח, פלפל ופפריקה.',
      'מחממים מחבת עם מעט שמן זית (אופציונלי — הבשר עצמו משחרר שומן) או צולים על גריל, לדרגת העשייה הרצויה.',
      'מגישים על מצע חסה עם עגבנייה, בצל סגול ופרוסות אבוקדו (בלי לחמנייה ובלי גבינה — שומרים על מנה בשרית נקייה).',
    ],
  },
  {
    id: 'kd_salmon_spinach_cream',
    slot: 'dinner', diets: ['keto'], tags: ['dairy'],
    name: 'פילה סלמון עם קרם תרד וגבינה',
    ingredients: [
      { name: 'פילה סלמון', grams: 150, home: 'פילה בינוני', kcal: 312, protein: 30, carbs: 0, fat: 19.5 },
      { name: 'תרד טרי', grams: 100, home: 'חבילה', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
      { name: 'שמנת מתוקה 38%', grams: 60, liquid: true, home: '4 כפות', kcal: 204, protein: 1.32, carbs: 1.8, fat: 21.6 },
      { name: 'גבינה צהובה 28%', grams: 20, home: 'קוביה', kcal: 70, protein: 5, carbs: 0.4, fat: 5.6 },
      { name: 'שום ואגוז מוסקט', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'צולים את הסלמון במחבת עם מעט שמן זית עד להזהבה.',
      'באותה מחבת מקפיצים תרד עם שום, מוסיפים שמנת וגבינה ומבשלים לרוטב סמיך.',
      'מגישים את הסלמון עם קרם התרד מעל. (דג עם שמנת וגבינה — מותר לפי כשרות.)',
    ],
  },
  {
    id: 'kd_beef_roast_zucchini',
    slot: 'dinner', diets: ['keto'], tags: [],
    name: 'נתחי בקר צלויים עם כרובית וקישוא ברוזמרין',
    ingredients: [
      { name: 'כתף בקר לצלייה', grams: 130, home: 'מנה', kcal: 325, protein: 33.8, carbs: 0, fat: 20.8 },
      { name: 'כרובית', grams: 80, home: 'קערית', kcal: 20, protein: 1.52, carbs: 4, fat: 0.24 },
      { name: 'קישוא', grams: 80, home: 'קישוא קטן', kcal: 13.6, protein: 0.96, carbs: 2.48, fat: 0.24 },
      { name: 'שמן זית', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 132, protein: 0, carbs: 0, fat: 15 },
      { name: 'רוזמרין, שום, מלח ופלפל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים בקר לקוביות גדולות, מתבלים ברוזמרין, שום, מלח ופלפל.',
      'צולים בתנור ב-200° עם כרובית וקישוא ושמן זית כ-25 דק\'.',
      'מגישים חם.',
    ],
  },

  /* ===================== מתכוני קינוח שבועי — קיטו ===================== */
  {
    id: 'kds_avocado_mousse',
    slot: 'dessert', diets: ['keto'], tags: ['veg', 'vegan'],
    name: 'מוס שוקולד אבוקדו קטוגני',
    yield: 'כ-4 מנות',
    serving: { label: 'מנה', kcal: 155, protein: 3, carbs: 10, fat: 14.5 },
    ingredients: [
      { name: 'אבוקדו', grams: 200, count: 2, unit: 'יחידות', home: '2 אבוקדו', kcal: 320, protein: 4, carbs: 18, fat: 30 },
      { name: 'קקאו טהור ללא סוכר', grams: 30, home: '3 כפות', kcal: 68, protein: 5.9, carbs: 17.4, fat: 4.1 },
      { name: 'חלב קוקוס (שימורים)', grams: 100, liquid: true, home: 'כוס', kcal: 230, protein: 2.3, carbs: 5.5, fat: 24 },
      { name: 'ממתיק קטוגני (אריתריטול/סטיביה) ווניל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'טוחנים בבלנדר אבוקדו, קקאו, חלב קוקוס וממתיק עד למרקם חלק וקרמי.',
      'מחלקים ל-4 כוסות הגשה ומצננים במקרר לפחות שעה.',
      'מגישים קר.',
    ],
  },
  {
    id: 'kds_keto_cheesecake',
    slot: 'dessert', diets: ['keto'], tags: ['veg', 'dairy', 'nuts', 'egg'],
    name: 'עוגת גבינה קיטוגנית',
    yield: 'כ-8 פרוסות',
    serving: { label: 'פרוסה', kcal: 367, protein: 9.6, carbs: 6.5, fat: 34.8 },
    ingredients: [
      { name: 'קמח שקדים (לקרום)', grams: 150, home: '1.5 כוסות', kcal: 800, protein: 30, carbs: 30, fat: 70.5 },
      { name: 'חמאה נמסה (לקרום)', grams: 50, home: 'כ-3 כפות', kcal: 359, protein: 0.45, carbs: 0.05, fat: 40.5 },
      { name: 'גבינת שמנת 30% (למילוי)', grams: 400, home: '1.5 חבילות', kcal: 1368, protein: 24, carbs: 16, fat: 136 },
      { name: 'ביצים (למילוי)', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 232.5, protein: 19.5, carbs: 1.65, fat: 16.5 },
      { name: 'שמנת חמוצה 15% (למילוי)', grams: 100, home: 'גביע', kcal: 180, protein: 3, carbs: 4, fat: 15 },
      { name: 'ממתיק קטוגני (אריתריטול/סטיביה) ווניל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'קרום: מערבבים קמח שקדים עם חמאה נמסה וממתיק, ומהדקים לתחתית תבנית עגולה (כ-20 ס"מ) מרופדת בנייר אפייה. אופים ב-175° כ-10 דק\' ומצננים.',
      'מילוי: טורפים גבינת שמנת רכה עם ממתיק ווניל עד חלק. מוסיפים ביצים אחת אחת תוך טריפה קלה, ולבסוף מערבבים פנימה שמנת חמוצה.',
      'יוצקים את המילוי על הקרום ואופים ב-160° כ-45-50 דק\' עד שהמרכז כמעט יציב (רועד קלות במגע). מכבים את התנור ומשאירים את העוגה בפנים עם הדלת פתוחה כ-10 דק\'.',
      'מקררים לחלוטין ומצננים במקרר לפחות 4 שעות (עדיף לילה) לפני ההגשה.',
    ],
  },

  /* ===================== מאפים קטוגניים — קיטו ===================== */
  {
    id: 'kbk_egg_cottage_bread',
    slot: 'bakery', diets: ['keto'], tags: ['veg', 'dairy', 'nuts', 'egg'],
    name: 'לחם קיטו — ביצים, קוטג\' 12% ושמן זית',
    yield: 'כ-10 פרוסות',
    serving: { label: 'פרוסה', kcal: 133, protein: 8.1, carbs: 2.4, fat: 10.6 },
    ingredients: [
      { name: 'ביצים', grams: 300, count: 6, unit: 'ביצים', home: '6 ביצים', kcal: 465, protein: 39, carbs: 3.3, fat: 33 },
      { name: 'קוטג\' 12%', grams: 250, home: 'גביע גדול', kcal: 410, protein: 29.5, carbs: 8.5, fat: 30 },
      { name: 'קמח שקדים', grams: 60, home: '6 כפות', kcal: 320, protein: 12, carbs: 12, fat: 28.2 },
      { name: 'שמן זית', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 132, protein: 0, carbs: 0, fat: 15 },
      { name: 'אבקת אפייה ומלח', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מחממים תנור ל-160°. מברישים תבנית אינגליש קייק (כ-20 ס"מ) בשמן זית.',
      'טוחנים בבלנדר (או מערבלים בקערה) ביצים, קוטג\' וקמח שקדים עד לתערובת חלקה.',
      'מוסיפים אבקת אפייה ומלח, מערבבים בעדינות ויוצקים לתבנית.',
      'אופים כ-40-45 דק\' עד שקיסם שנכנס למרכז יוצא נקי והלחם משחים מלמעלה. מצננים לגמרי לפני פריסה.',
    ],
  },

  /* ========================================================================= */
  /* =========================== תזונה בריאותית 🥗 ============================ */
  /* יחס ים-תיכוני מאוזן: דגנים מלאים, קטניות, ירקות ופירות מגוונים, דגים ועוף, */
  /* מעט בשר אדום, שמן זית כמקור שומן מרכזי. בלי מטרת ירידה/עלייה במשקל.        */
  /* ========================================================================= */

  /* ===================== ארוחות בוקר — בריאותית ===================== */
  {
    id: 'hb_cottage_quinoa_berries',
    slot: 'breakfast', diets: ['health'], tags: ['veg', 'dairy'],
    name: 'קערת קוטג\' עם קינואה, פירות יער ודבש',
    ingredients: [
      { name: "גבינת קוטג' 5%", grams: 150, home: 'גביע', kcal: 154.5, protein: 16.5, carbs: 5.1, fat: 7.5 },
      { name: 'קינואה מבושלת', grams: 80, home: 'חצי כוס', kcal: 96, protein: 3.5, carbs: 17, fat: 1.5 },
      { name: 'פירות יער', grams: 80, home: 'חופן', kcal: 34.6, protein: 0.93, carbs: 8, fat: 0 },
      { name: 'דבש', grams: 10, home: 'חצי כף', kcal: 30, protein: 0.03, carbs: 8.24, fat: 0 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מערבבים קוטג\' עם קינואה מבושלת קרה.',
      'מוסיפים פירות יער טריים, מטפטפים דבש ומפזרים קינמון.',
    ],
  },
  {
    id: 'hb_avocado_tahini_toast',
    slot: 'breakfast', diets: ['health'], tags: ['veg', 'vegan', 'gluten'],
    name: 'טוסט אבוקדו וטחינה עם עגבניות שרי',
    ingredients: [
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 120, protein: 6, carbs: 21, fat: 1.5 },
      { name: 'אבוקדו', grams: 80, home: 'שני שליש אבוקדו', kcal: 128, protein: 1.6, carbs: 7.2, fat: 12 },
      { name: 'טחינה גולמית', grams: 15, home: 'כף גדושה', kcal: 90, protein: 2.55, carbs: 3.15, fat: 8.1 },
      { name: 'עגבניות שרי', grams: 60, home: 'חופן', kcal: 10.8, protein: 0.54, carbs: 2.34, fat: 0.12 },
      { name: 'לימון ומלח ים', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מועכים אבוקדו עם לימון ומלח ים.',
      'מורחים טחינה גולמית על פרוסות הלחם המלא ומעליה את מחית האבוקדו.',
      'מסדרים עגבניות שרי חצויות מעל ומגישים.',
    ],
  },
  {
    id: 'hb_oats_apple_walnuts',
    slot: 'breakfast', diets: ['health'], tags: ['veg', 'gluten', 'dairy', 'nuts'],
    name: 'קערת שיבולת שועל חמה עם תפוח, קינמון ואגוזי מלך',
    ingredients: [
      { name: 'שיבולת שועל', grams: 50, home: '5 כפות', kcal: 194.5, protein: 8.5, carbs: 33, fat: 3.5 },
      { name: 'חלב 2%', grams: 200, liquid: true, home: 'כוס', kcal: 100, protein: 6.6, carbs: 9.6, fat: 4 },
      { name: 'תפוח', grams: 100, count: 1, unit: 'יחידה', home: 'תפוח', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2 },
      { name: 'אגוזי מלך', grams: 15, home: 'חופן קטן', kcal: 98, protein: 2.25, carbs: 2.1, fat: 9.75 },
      { name: 'קינמון', season: true, home: 'קורט', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מבשלים שיבולת שועל עם החלב על אש בינונית תוך ערבוב, כ-5 דק\' עד להסמכה.',
      'פורסים תפוח לקוביות ומוסיפים לקערה.',
      'מפזרים אגוזי מלך קצוצים וקינמון מעל.',
    ],
  },
  {
    id: 'hb_avocado_poached_egg',
    slot: 'breakfast', diets: ['health'], tags: ['veg', 'gluten', 'egg'],
    name: 'טוסט אבוקדו עם ביצה עלומה על לחם מלא',
    ingredients: [
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 123, protein: 6, carbs: 21, fat: 1.5 },
      { name: 'ביצה', grams: 50, count: 1, unit: 'ביצים', home: 'ביצה עלומה', kcal: 77.5, protein: 6.5, carbs: 0.55, fat: 5.5 },
      { name: 'אבוקדו', grams: 60, home: 'חצי אבוקדו', kcal: 96, protein: 1.2, carbs: 5.4, fat: 9 },
      { name: 'עגבניות שרי', grams: 30, home: 'כמה עגבניות', kcal: 5.4, protein: 0.27, carbs: 1.17, fat: 0.06 },
      { name: 'מלח, פלפל ופתיתי צ\'ילי', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מביאים סיר מים לרתיחה עדינה, מוסיפים מעט חומץ ויוצרים מערבולת. שוברים פנימה ביצה ומבשלים כ-3 דק\' לביצה עלומה.',
      'קולים את פרוסות הלחם ומועכים עליהן אבוקדו.',
      'מניחים את הביצה העלומה מעל, מוסיפים עגבניות שרי ומתבלים במלח, פלפל ופתיתי צ\'ילי.',
    ],
  },
  {
    id: 'hb_yogurt_granola_grapes',
    slot: 'breakfast', diets: ['health'], tags: ['veg', 'gluten', 'dairy'],
    name: 'יוגורט טבעי עם גרנולה טבעית וענבים',
    ingredients: [
      { name: 'יוגורט טבעי 3%', grams: 200, home: 'גביע', kcal: 124, protein: 7, carbs: 9.4, fat: 6 },
      { name: 'גרנולה טבעית ללא סוכר', grams: 30, home: '3 כפות', kcal: 130, protein: 4, carbs: 18, fat: 5 },
      { name: 'ענבים', grams: 80, home: 'אשכול קטן', kcal: 55, protein: 0.56, carbs: 14.4, fat: 0.16 },
    ],
    steps: ['מעבירים יוגורט לקערה, מפזרים גרנולה ומוסיפים ענבים.'],
  },
  {
    id: 'hb_mediterranean_shakshuka',
    slot: 'breakfast', diets: ['health'], tags: ['veg', 'gluten', 'egg'],
    name: 'שקשוקה ים-תיכונית עם לחם מלא',
    ingredients: [
      { name: 'ביצים', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
      { name: 'רוטב עגבניות ופלפלים', grams: 200, home: 'מחבת', kcal: 80, protein: 3.33, carbs: 14.67, fat: 0.67 },
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 123, protein: 6, carbs: 21, fat: 1.5 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'פפריקה, כמון, שום ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מטגנים פלפלים ובצל בשמן זית עם פפריקה, כמון ושום עד ריכוך.',
      'מוסיפים רוטב עגבניות ומבשלים כ-5 דק\'.',
      'שוברים פנימה ביצים ומבשלים בכיסוי עד שהחלבון נקרש. מפזרים פטרוזיליה ומגישים עם לחם מלא.',
    ],
  },
  {
    id: 'hb_israeli_cottage_veg',
    slot: 'breakfast', diets: ['health'], tags: ['veg', 'gluten', 'dairy'],
    name: 'קערת בוקר ישראלית: גבינה לבנה, ירקות טריים ולחם מלא',
    ingredients: [
      { name: 'גבינה לבנה 5%', grams: 150, home: 'גביע', kcal: 135, protein: 15, carbs: 5.25, fat: 7.5 },
      { name: 'מלפפון, עגבנייה ופלפל', grams: 150, home: 'קערה', kcal: 37.5, protein: 1.5, carbs: 7.5, fat: 0.3 },
      { name: 'לחם מלא', grams: 60, count: 2, unit: 'פרוסות', home: '2 פרוסות', kcal: 123, protein: 6, carbs: 21, fat: 1.5 },
      { name: 'זיתים', grams: 20, home: 'כ-6 זיתים', kcal: 23, protein: 0.16, carbs: 1.2, fat: 2.2 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'זעתר ומלח', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים ירקות טריים לקוביות קטנות.',
      'מסדרים בקערה גבינה לבנה, ירקות וזיתים.',
      'מטפטפים שמן זית, מתבלים בזעתר ומגישים עם לחם מלא.',
    ],
  },

  /* ===================== ארוחות ביניים — בריאותית ===================== */
  {
    id: 'hs1_cottage3_peach',
    slot: 'snack1', diets: ['health'], tags: ['veg', 'dairy'],
    name: 'קוטג\' 3% עם אפרסק פרוס',
    ingredients: [
      { name: 'גבינת קוטג\' 3%', grams: 150, home: 'גביע', kcal: 135, protein: 16.5, carbs: 5.25, fat: 4.5 },
      { name: 'אפרסק', grams: 120, count: 1, unit: 'יחידה', home: 'אפרסק', kcal: 46.8, protein: 1.08, carbs: 12, fat: 0.36 },
    ],
    steps: ['פורסים אפרסק ומערבבים עם הקוטג\'.'],
  },
  {
    id: 'hs1_labneh_veg_dip',
    slot: 'snack1', diets: ['health'], tags: ['veg', 'dairy'],
    name: 'לבנה עם ירקות חתוכים ושמן זית',
    ingredients: [
      { name: 'לבנה', grams: 150, home: 'קערית', kcal: 180, protein: 10.5, carbs: 7.5, fat: 12 },
      { name: 'מלפפון ופלפל', grams: 100, home: 'קערית', kcal: 20, protein: 1, carbs: 4, fat: 0.2 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
    ],
    steps: ['חותכים ירקות לאצבעות, מטפטפים שמן זית על הלבנה וטובלים.'],
  },
  {
    id: 'hs1_hummus_veg_pita',
    slot: 'snack1', diets: ['health'], tags: ['veg', 'vegan', 'gluten'],
    name: 'חומוס עם מקלות ירקות ופיתה מלאה',
    ingredients: [
      { name: 'חומוס', grams: 60, home: '4 כפות', kcal: 99.6, protein: 4.74, carbs: 8.4, fat: 5.76 },
      { name: 'גזר ומלפפון', grams: 100, home: 'קערית', kcal: 28, protein: 0.8, carbs: 6.8, fat: 0.15 },
      { name: 'פיתה מלאה קטנה', grams: 30, home: 'פיתה קטנה', kcal: 73.5, protein: 2.7, carbs: 14.4, fat: 0.45 },
    ],
    steps: ['חותכים ירקות לאצבעות וטובלים בחומוס לצד הפיתה.'],
  },
  {
    id: 'hs1_yogurt_honey_walnuts',
    slot: 'snack1', diets: ['health'], tags: ['veg', 'dairy', 'nuts'],
    name: 'יוגורט טבעי עם דבש ואגוזי מלך',
    ingredients: [
      { name: 'יוגורט טבעי 3%', grams: 180, home: 'גביע', kcal: 111.6, protein: 6.3, carbs: 8.46, fat: 5.4 },
      { name: 'דבש', grams: 10, home: 'חצי כף', kcal: 30, protein: 0.03, carbs: 8.24, fat: 0 },
      { name: 'אגוזי מלך', grams: 15, home: 'חופן קטן', kcal: 98, protein: 2.25, carbs: 2.1, fat: 9.75 },
    ],
    steps: ['מערבבים יוגורט עם דבש ואגוזי מלך קצוצים.'],
  },
  {
    id: 'hs1_dates_tahini_coconut',
    slot: 'snack1', diets: ['health'], tags: ['veg', 'vegan'],
    name: 'תמרים ממולאים בטחינה וקוקוס',
    ingredients: [
      { name: 'תמרים', grams: 48, count: 2, unit: 'יחידות', home: '2 תמרים', kcal: 133, protein: 0.9, carbs: 36, fat: 0.2 },
      { name: 'טחינה גולמית', grams: 10, home: 'כפית גדושה', kcal: 59.5, protein: 1.7, carbs: 2.1, fat: 5.4 },
      { name: 'קוקוס טחון ללא סוכר', grams: 5, home: 'קורט', kcal: 33, protein: 0.35, carbs: 1.2, fat: 3.2 },
    ],
    steps: ['פותחים כל תמר, ממלאים בטחינה גולמית ומפזרים קוקוס טחון מעל.'],
  },

  /* ===================== ארוחות צהריים — בריאותית ===================== */
  {
    id: 'hl_salmon_quinoa_veg',
    slot: 'lunch', diets: ['health'], tags: [],
    name: 'סלמון בתנור עם קינואה וירקות אפויים',
    ingredients: [
      { name: 'פילה סלמון', grams: 130, home: 'פילה בינוני', kcal: 270, protein: 26, carbs: 0, fat: 16.9 },
      { name: 'קינואה מבושלת', grams: 120, home: 'כוס', kcal: 144, protein: 5.28, carbs: 25.2, fat: 2.28 },
      { name: 'קישוא, פלפל ובצל', grams: 150, home: 'תבנית ירקות', kcal: 30, protein: 1.5, carbs: 6, fat: 0.3 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'שום, פפריקה ולימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים ירקות לקוביות, מתבלים בשמן זית, שום ופפריקה ואופים ב-200° כ-15 דק\'.',
      'מוסיפים את הסלמון לתבנית וממשיכים לאפות כ-12 דק\' נוספות.',
      'מגישים על מצע קינואה עם סחיטת לימון.',
    ],
  },
  {
    id: 'hl_lentil_feta_salad',
    slot: 'lunch', diets: ['health'], tags: ['veg', 'dairy'],
    name: 'סלט עדשים עם ירקות, פטה וזעתר',
    ingredients: [
      { name: 'עדשים מבושלות', grams: 200, home: '1.5 כוס', kcal: 232, protein: 18, carbs: 40, fat: 0.8 },
      { name: 'מלפפון, עגבנייה ופלפל', grams: 150, home: 'קערה', kcal: 37.5, protein: 1.5, carbs: 7.5, fat: 0.3 },
      { name: 'פטה בולגרית 14%', grams: 40, home: 'קוביה', kcal: 106, protein: 5.6, carbs: 1.2, fat: 8.4 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'זעתר, שום ולימון', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מערבבים עדשים מבושלות עם הירקות הקצוצים.',
      'מפוררים פטה מעל ומתבלים בשמן זית, זעתר, שום כתוש ומיץ לימון.',
    ],
  },
  {
    id: 'hl_chicken_bulgur_salad',
    slot: 'lunch', diets: ['health'], tags: ['gluten'],
    name: 'חזה עוף על מצע בורגול עם סלט ירוק',
    ingredients: [
      { name: 'חזה עוף', grams: 150, home: 'חזה בינוני', kcal: 248, protein: 47, carbs: 0, fat: 5.4 },
      { name: 'בורגול מבושל', grams: 150, home: 'כוס', kcal: 124.5, protein: 4.65, carbs: 27.9, fat: 0.3 },
      { name: 'חסה, מלפפון ועגבנייה', grams: 100, home: 'קערה', kcal: 20, protein: 1, carbs: 4, fat: 0.2 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'כמון, שום, לימון ופטרוזיליה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים חזה עוף בכמון, שום ולימון וצולים על מחבת פסים.',
      'מגישים על מצע בורגול לצד סלט ירקות טרי, מתבלים בשמן זית ופטרוזיליה.',
    ],
  },
  {
    id: 'hl_mujadara',
    slot: 'lunch', diets: ['health'], tags: ['veg', 'vegan'],
    name: 'מג\'דרה — אורז מלא ועדשים עם בצל מקורמל וסלט ירקות',
    ingredients: [
      { name: 'אורז מלא מבושל', grams: 150, home: 'כוס', kcal: 165, protein: 3.45, carbs: 34.5, fat: 1.35 },
      { name: 'עדשים מבושלות', grams: 150, home: 'כוס', kcal: 174, protein: 13.5, carbs: 30, fat: 0.6 },
      { name: 'בצל', grams: 80, home: 'בצל גדול', kcal: 32, protein: 0.88, carbs: 7.2, fat: 0.08 },
      { name: 'שמן זית', grams: 15, count: 1, unit: 'כף', home: 'כף', kcal: 132, protein: 0, carbs: 0, fat: 15 },
      { name: 'מלפפון ועגבנייה', grams: 100, home: 'קערה', kcal: 20, protein: 1, carbs: 4, fat: 0.2 },
      { name: 'כמון, שום ומלח', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'פורסים בצל דק וקולים בשמן זית על אש בינונית-נמוכה כ-20 דק\', תוך ערבוב מדי פעם, עד להזהבה עמוקה וקרמול.',
      'מבשלים אורז מלא ועדשים במים עם מלח עד לריכוך.',
      'מערבבים אורז ועדשים עם מחצית מהבצל המקורמל, כמון ושום.',
      'מגישים עם שאר הבצל מפוזר מעל, לצד סלט ירקות טרי.',
    ],
  },

  /* ===================== חטיפים — בריאותית ===================== */
  {
    id: 'hs2_carrot_cucumber_hummus',
    slot: 'snack2', diets: ['health'], tags: ['veg', 'vegan'],
    name: 'גזר ומלפפון עם חומוס',
    ingredients: [
      { name: 'גזר', grams: 60, home: 'גזר קטן', kcal: 24.6, protein: 0.54, carbs: 6, fat: 0.12 },
      { name: 'מלפפון', grams: 60, home: 'חצי מלפפון', kcal: 9, protein: 0.42, carbs: 2.16, fat: 0.06 },
      { name: 'חומוס', grams: 50, home: '3 כפות', kcal: 83, protein: 3.95, carbs: 7, fat: 4.8 },
    ],
    steps: ['חותכים גזר ומלפפון לאצבעות וטובלים בחומוס.'],
  },
  {
    id: 'hs2_cottage1_grapes',
    slot: 'snack2', diets: ['health'], tags: ['veg', 'dairy'],
    name: 'קוטג\' 1% עם ענבים',
    ingredients: [
      { name: 'גבינת קוטג\' 1%', grams: 150, home: 'גביע', kcal: 108, protein: 18, carbs: 5.25, fat: 1.5 },
      { name: 'ענבים', grams: 100, home: 'אשכול קטן', kcal: 69, protein: 0.7, carbs: 18, fat: 0.2 },
    ],
    steps: ['מערבבים ענבים חצויים עם הקוטג\'.'],
  },
  {
    id: 'hs2_boiled_eggs_paprika',
    slot: 'snack2', diets: ['health'], tags: ['veg', 'egg'],
    name: 'ביצים קשות עם מלח ים ופפריקה',
    ingredients: [
      { name: 'ביצים קשות', grams: 100, count: 2, unit: 'ביצים', home: '2 ביצים', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
      { name: 'מלח ים ופפריקה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: ['פורסים ביצים קשות ומתבלים במלח ים ופפריקה.'],
  },
  {
    id: 'hs2_bulgarit_veg',
    slot: 'snack2', diets: ['health'], tags: ['veg', 'dairy'],
    name: 'מלפפון ופלפל עם גבינה בולגרית 5%',
    ingredients: [
      { name: 'מלפפון ופלפל', grams: 100, home: 'קערית', kcal: 20, protein: 1, carbs: 4, fat: 0.2 },
      { name: 'גבינה בולגרית 5%', grams: 50, home: 'קוביות', kcal: 72.5, protein: 7.5, carbs: 1.5, fat: 4 },
    ],
    steps: ['חותכים ירקות לקוביות ומערבבים עם גבינה בולגרית מפוררת.'],
  },

  /* ===================== ארוחות ערב — בריאותית ===================== */
  {
    id: 'hd_seabream_root_veg',
    slot: 'dinner', diets: ['health'], tags: [],
    name: 'דג ים אפוי עם ירקות שורש ותפוח אדמה',
    ingredients: [
      { name: 'פילה דג ים (לברק/דניס)', grams: 180, home: 'פילה', kcal: 172.8, protein: 36, carbs: 0, fat: 3.06 },
      { name: 'תפוח אדמה', grams: 200, home: '2 בינוניים', kcal: 154, protein: 4, carbs: 34, fat: 0.2 },
      { name: 'גזר ובצל', grams: 100, home: 'קערית', kcal: 35, protein: 0.7, carbs: 8, fat: 0.15 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'שום, לימון, פפריקה ורוזמרין', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'חותכים תפוח אדמה, גזר ובצל לקוביות, מתבלים בשמן זית ורוזמרין ואופים ב-200° כ-20 דק\'.',
      'מניחים את הדג מעל, מתבלים בשום, פפריקה ולימון, וממשיכים לאפות כ-12-15 דק\' עד שהדג מוכן.',
    ],
  },
  {
    id: 'hd_lentil_veg_patties',
    slot: 'dinner', diets: ['health'], tags: ['veg', 'vegan', 'gluten'],
    name: 'קציצות עדשים וירקות עם טחינה',
    ingredients: [
      { name: 'עדשים מבושלות', grams: 200, home: '1.5 כוס', kcal: 232, protein: 18, carbs: 40, fat: 0.8 },
      { name: 'גזר מגורד ובצל', grams: 80, home: 'קערית', kcal: 30, protein: 0.7, carbs: 7, fat: 0.15 },
      { name: 'קמח מלא', grams: 20, home: '2 כפות', kcal: 68, protein: 2.6, carbs: 14.4, fat: 0.5 },
      { name: 'טחינה גולמית', grams: 20, home: 'כף גדושה', kcal: 119, protein: 3.4, carbs: 4.2, fat: 10.8 },
      { name: 'שמן זית (לטיגון)', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'כמון, כוסברה ושום', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מועכים חלק מהעדשים, מערבבים עם גזר, בצל, קמח מלא, כמון וכוסברה ליצירת בלילה שניתן לעצב.',
      'מעצבים קציצות וצולים במחבת עם שמן זית עד להזהבה משני הצדדים.',
      'מגישים עם טחינה גולמית מטפטפת מעל.',
    ],
  },
  {
    id: 'hd_chicken_sweetpotato_broccoli',
    slot: 'dinner', diets: ['health'], tags: [],
    name: 'עוף בתנור עם בטטה וברוקולי',
    ingredients: [
      { name: 'חזה עוף', grams: 150, home: 'חזה בינוני', kcal: 248, protein: 47, carbs: 0, fat: 5.4 },
      { name: 'בטטה', grams: 150, home: 'בטטה בינונית', kcal: 129, protein: 2.4, carbs: 30, fat: 0.15 },
      { name: 'ברוקולי', grams: 100, home: 'קערית', kcal: 34, protein: 2.8, carbs: 7, fat: 0.4 },
      { name: 'שמן זית', grams: 10, count: 1, unit: 'כף', home: 'כף', kcal: 88, protein: 0, carbs: 0, fat: 10 },
      { name: 'פפריקה, שום וטימין', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים חזה עוף בפפריקה, שום וטימין ומורחים בשמן זית.',
      'חותכים בטטה לקוביות ואופים יחד עם העוף ב-200° כ-22 דק\'.',
      'מוסיפים ברוקולי ל-8 הדקות האחרונות ומגישים חם.',
    ],
  },
  {
    id: 'hd_seared_tuna_quinoa_avocado',
    slot: 'dinner', diets: ['health'], tags: [],
    name: 'טונה צלויה עם סלט קינואה ואבוקדו',
    ingredients: [
      { name: 'סטייק טונה טרי', grams: 150, home: 'סטייק', kcal: 195, protein: 42, carbs: 0, fat: 1.5 },
      { name: 'קינואה מבושלת', grams: 100, home: 'כוס', kcal: 120, protein: 4.4, carbs: 21, fat: 1.9 },
      { name: 'אבוקדו', grams: 50, home: 'חצי אבוקדו קטן', kcal: 80, protein: 1, carbs: 4.5, fat: 7.5 },
      { name: 'עגבניות שרי ובצל סגול', grams: 80, home: 'קערית', kcal: 20, protein: 0.8, carbs: 4, fat: 0.15 },
      { name: 'שמן זית', grams: 5, count: 1, unit: 'כפית', home: 'כפית', kcal: 44, protein: 0, carbs: 0, fat: 5 },
      { name: 'לימון, שום וכוסברה טרייה', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מתבלים סטייק טונה במלח ופלפל וצולים במחבת חמה עם מעט שמן זית כ-1-2 דק\' לכל צד (רוזי מבפנים).',
      'מערבבים קינואה עם עגבניות שרי, בצל סגול, לימון וכוסברה.',
      'פורסים ומגישים את הטונה על מצע הקינואה עם פרוסות אבוקדו.',
    ],
  },

  /* ===================== מתכוני קינוח שבועי — בריאותית ===================== */
  {
    id: 'hds_oat_banana_cookies',
    slot: 'dessert', diets: ['health'], tags: ['veg', 'vegan', 'gluten', 'nuts'],
    name: 'עוגיות שיבולת שועל ובננה בריאותיות (ללא סוכר לבן)',
    yield: 'כ-12 עוגיות',
    serving: { label: '2 עוגיות', kcal: 196, protein: 5.9, carbs: 31.6, fat: 6.2 },
    ingredients: [
      { name: 'שיבולת שועל', grams: 150, home: '1.5 כוסות', kcal: 583.5, protein: 25.5, carbs: 99, fat: 10.5 },
      { name: 'בננות בשלות מעוכות', grams: 240, count: 2, unit: 'יחידות', home: '2 בננות', kcal: 213.6, protein: 2.64, carbs: 55.2, fat: 0.72 },
      { name: 'אגוזי מלך קצוצים', grams: 40, home: 'חופן גדול', kcal: 261.6, protein: 6, carbs: 5.6, fat: 26 },
      { name: 'צימוקים', grams: 40, home: 'חופן קטן', kcal: 120, protein: 1.2, carbs: 30, fat: 0.2 },
      { name: 'קינמון ווניל', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'מועכים בננות בשלות במזלג עד לפירה חלק.',
      'מערבבים עם שיבולת שועל, אגוזי מלך קצוצים, צימוקים, קינמון ווניל לבלילה אחיד.',
      'יוצרים 12 עוגיות שטוחות על תבנית מרופדת בנייר אפייה.',
      'אופים ב-180° כ-15-18 דק\' עד הזהבה קלה. מצננים לפני ההגשה.',
    ],
  },
  {
    id: 'hds_carrot_cake',
    slot: 'dessert', diets: ['health'], tags: ['veg', 'gluten', 'nuts', 'egg'],
    name: 'עוגת גזר בריאה עם קמח מלא ואגוזי מלך',
    yield: 'כ-10 פרוסות',
    serving: { label: 'פרוסה', kcal: 180, protein: 4.7, carbs: 18.5, fat: 10.7 },
    ingredients: [
      { name: 'גזר מגורד', grams: 200, home: '3 גזרים', kcal: 82, protein: 1.8, carbs: 20, fat: 0.4 },
      { name: 'קמח מלא', grams: 150, home: '1.5 כוסות', kcal: 510, protein: 19.5, carbs: 108, fat: 3.75 },
      { name: 'ביצים', grams: 150, count: 3, unit: 'ביצים', home: '3 ביצים', kcal: 232.5, protein: 19.5, carbs: 1.65, fat: 16.5 },
      { name: 'שמן זית', grams: 60, home: '4 כפות', kcal: 530.4, protein: 0, carbs: 0, fat: 60 },
      { name: 'דבש', grams: 60, count: 3, unit: 'כפות', home: '3 כפות', kcal: 182.4, protein: 0.18, carbs: 49.4, fat: 0 },
      { name: 'אגוזי מלך', grams: 40, home: 'חופן גדול', kcal: 261.6, protein: 6, carbs: 5.6, fat: 26 },
      { name: 'קינמון, אבקת אפייה ואגוז מוסקט', season: true, home: 'לפי הטעם', kcal: 0, protein: 0, carbs: 0, fat: 0 },
    ],
    steps: [
      'טורפים ביצים עם שמן זית ודבש עד לתערובת אחידה.',
      'מוסיפים גזר מגורד, קמח מלא, קינמון ואבקת אפייה ומערבבים לבלילה אחיד.',
      'מקפלים פנימה אגוזי מלך קצוצים, יוצקים לתבנית אינגליש קייק ואופים ב-175° כ-40-45 דק\' עד שקיסם יוצא נקי.',
    ],
  },
];
