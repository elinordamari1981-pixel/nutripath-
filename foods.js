/*
 * מאגר המזון של האפליקציה — ערכים ל-100 גרם.
 * category: protein | carb | fat | veg | fruit | dairy | dessert
 * tags: מאפיינים לסינון לפי סוג תזונה / העדפות
 *   keto  = מתאים לתזונה קטוגנית (דל פחמימות)
 *   vegan = טבעוני
 *   veg   = צמחוני (כולל טבעוני)
 * unit: יחידת מדידה טבעית להצגה (למשל "ביצה", "כף", "כוס") ומשקל היחידה בגרם
 */
const FOODS = [
  // ---- חלבונים ----
  { id: 'chicken_breast', name: 'חזה עוף', category: 'protein', kcal: 165, protein: 31, carbs: 0, fat: 3.6, tags: ['keto'], unit: { label: 'גרם', grams: 1 } },
  { id: 'turkey_breast', name: 'חזה הודו', category: 'protein', kcal: 135, protein: 30, carbs: 0, fat: 1, tags: ['keto'], unit: { label: 'גרם', grams: 1 } },
  { id: 'beef_lean', name: 'בשר בקר רזה', category: 'protein', kcal: 217, protein: 26, carbs: 0, fat: 12, tags: ['keto'], unit: { label: 'גרם', grams: 1 } },
  { id: 'salmon', name: 'סלמון', category: 'protein', kcal: 208, protein: 20, carbs: 0, fat: 13, tags: ['keto'], unit: { label: 'גרם', grams: 1 } },
  { id: 'tuna', name: 'טונה במים', category: 'protein', kcal: 116, protein: 26, carbs: 0, fat: 1, tags: ['keto'], unit: { label: 'גרם', grams: 1 } },
  { id: 'egg', name: 'ביצה', category: 'protein', kcal: 155, protein: 13, carbs: 1.1, fat: 11, tags: ['keto', 'veg'], unit: { label: 'ביצה', grams: 50 } },
  { id: 'tofu', name: 'טופו', category: 'protein', kcal: 144, protein: 17, carbs: 3, fat: 9, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'lentils', name: 'עדשים מבושלות', category: 'protein', kcal: 116, protein: 9, carbs: 20, fat: 0.4, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'chickpeas', name: 'חומוס (גרגירים)', category: 'protein', kcal: 164, protein: 9, carbs: 27, fat: 2.6, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },

  // ---- פחמימות ----
  { id: 'rice', name: 'אורז מבושל', category: 'carb', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'quinoa', name: 'קינואה מבושלת', category: 'carb', kcal: 120, protein: 4.4, carbs: 21, fat: 1.9, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'sweet_potato', name: 'בטטה', category: 'carb', kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'potato', name: 'תפוח אדמה', category: 'carb', kcal: 77, protein: 2, carbs: 17, fat: 0.1, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'oats', name: 'שיבולת שועל', category: 'carb', kcal: 389, protein: 17, carbs: 66, fat: 7, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'whole_bread', name: 'לחם מלא', category: 'carb', kcal: 247, protein: 13, carbs: 41, fat: 3.4, tags: ['veg', 'vegan'], unit: { label: 'פרוסה', grams: 30 } },
  { id: 'pasta', name: 'פסטה מלאה מבושלת', category: 'carb', kcal: 124, protein: 5, carbs: 25, fat: 1.1, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },

  // ---- שומנים ----
  { id: 'avocado', name: 'אבוקדו', category: 'fat', kcal: 160, protein: 2, carbs: 9, fat: 15, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'olive_oil', name: 'שמן זית', category: 'fat', kcal: 884, protein: 0, carbs: 0, fat: 100, tags: ['keto', 'veg', 'vegan'], unit: { label: 'כף', grams: 15 } },
  { id: 'almonds', name: 'שקדים', category: 'fat', kcal: 579, protein: 21, carbs: 22, fat: 50, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'walnuts', name: 'אגוזי מלך', category: 'fat', kcal: 654, protein: 15, carbs: 14, fat: 65, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'peanut_butter', name: 'חמאת בוטנים', category: 'fat', kcal: 588, protein: 25, carbs: 20, fat: 50, tags: ['keto', 'veg', 'vegan'], unit: { label: 'כף', grams: 16 } },
  { id: 'tahini', name: 'טחינה גולמית', category: 'fat', kcal: 595, protein: 17, carbs: 21, fat: 54, tags: ['keto', 'veg', 'vegan'], unit: { label: 'כף', grams: 15 } },

  // ---- מוצרי חלב ----
  { id: 'greek_yogurt', name: 'יוגורט יווני 5%', category: 'dairy', kcal: 97, protein: 9, carbs: 4, fat: 5, tags: ['keto', 'veg'], unit: { label: 'גרם', grams: 1 } },
  { id: 'cottage', name: 'גבינת קוטג\' 5%', category: 'dairy', kcal: 103, protein: 11, carbs: 3, fat: 5, tags: ['keto', 'veg'], unit: { label: 'גרם', grams: 1 } },
  { id: 'white_cheese', name: 'גבינה לבנה 5%', category: 'dairy', kcal: 90, protein: 10, carbs: 3.5, fat: 5, tags: ['keto', 'veg'], unit: { label: 'גרם', grams: 1 } },
  { id: 'mozzarella', name: 'מוצרלה', category: 'dairy', kcal: 280, protein: 22, carbs: 2.2, fat: 21, tags: ['keto', 'veg'], unit: { label: 'גרם', grams: 1 } },

  // ---- ירקות ----
  { id: 'broccoli', name: 'ברוקולי', category: 'veg', kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'cucumber', name: 'מלפפון', category: 'veg', kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'tomato', name: 'עגבנייה', category: 'veg', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'spinach', name: 'תרד', category: 'veg', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'mixed_salad', name: 'סלט ירקות', category: 'veg', kcal: 25, protein: 1, carbs: 5, fat: 0.3, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },

  // ---- פירות ----
  { id: 'banana', name: 'בננה', category: 'fruit', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, tags: ['veg', 'vegan'], unit: { label: 'יחידה', grams: 120 } },
  { id: 'apple', name: 'תפוח', category: 'fruit', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, tags: ['veg', 'vegan'], unit: { label: 'יחידה', grams: 180 } },
  { id: 'berries', name: 'פירות יער', category: 'fruit', kcal: 43, protein: 1.1, carbs: 10, fat: 0.3, tags: ['keto', 'veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },

  // ---- קינוחים (מותאמים לפי תזונה) ----
  { id: 'protein_balls', name: 'כדורי חלבון תמרים ואגוזים', category: 'dessert', kcal: 210, protein: 8, carbs: 28, fat: 8, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
  { id: 'keto_choco_mousse', name: 'מוס שוקולד קטוגני (אבוקדו וקקאו)', category: 'dessert', kcal: 180, protein: 3, carbs: 6, fat: 16, tags: ['keto', 'veg'], unit: { label: 'גרם', grams: 1 } },
  { id: 'yogurt_berries', name: 'יוגורט יווני עם פירות יער', category: 'dessert', kcal: 90, protein: 8, carbs: 9, fat: 3, tags: ['keto', 'veg'], unit: { label: 'גרם', grams: 1 } },
  { id: 'baked_apple', name: 'תפוח אפוי עם קינמון', category: 'dessert', kcal: 95, protein: 0.5, carbs: 22, fat: 0.5, tags: ['veg', 'vegan'], unit: { label: 'גרם', grams: 1 } },
];
