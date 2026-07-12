/*
 * מיפוי מרכיבים → מותג ישראלי אמיתי + קטגוריה, לרשימת הקניות השבועית.
 * בשר/עוף/דג טריים מסומנים "ללא מותג" (נקנים מהקצביה/דוכן הדגים, לא מוצר ארוז).
 */

// נרמול שמות: גרסאות שונות של אותו מוצר בפועל מתמזגות לשורה אחת ברשימת הקניות
const SHOPPING_NORMALIZE = {
  'ביצה': 'ביצים', 'ביצים קשות': 'ביצים', 'ביצים (למילוי)': 'ביצים',
  'בננה קפואה': 'בננות', 'בננה בשלה מעוכה': 'בננות', 'בננות בשלות מעוכות': 'בננות', 'בננה': 'בננות',
  'שיבולת שועל מהירה': 'שיבולת שועל', 'שיבולת שועל טחונה': 'שיבולת שועל',
  'שמן זית (לטיגון)': 'שמן זית',
  'קמח שקדים (לקרום)': 'קמח שקדים',
  'גבינת שמנת 30% (למילוי)': 'גבינת שמנת 30%',
  'אגוזי מלך קצוצים': 'אגוזי מלך',
};

const BRANDS = {
  // עוף ובקר/הודו/טלה טריים — ללא מותג, רק סוג (נקנים מהקצביה)
  'חזה עוף': { brand: 'עוף (טרי, ללא מותג)', cat: 'protein' },
  'חזה עוף עם עור': { brand: 'עוף (טרי, ללא מותג)', cat: 'protein' },
  'פרגית עוף (עם עור)': { brand: 'עוף (טרי, ללא מותג)', cat: 'protein' },
  'עוף טחון': { brand: 'עוף (טרי, ללא מותג)', cat: 'protein' },
  'חזה הודו': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'חזה הודו פרוס': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'בשר הודו טחון': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'בשר בקר רזה': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'בשר בקר טחון רזה': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'בקר טחון (רגיל)': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'כתף בקר לצלייה': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'סטייק אנטריקוט': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  'בשר טלה טחון': { brand: 'בשר (טרי, ללא מותג)', cat: 'protein' },
  // דגים — טריים ללא מותג, מעושן/משומר עם מותג אמיתי
  'פילה סלמון': { brand: 'דג (טרי, ללא מותג)', cat: 'protein' },
  'סלמון מעושן': { brand: 'סקאי סלמון', cat: 'protein' },
  'טונה במים': { brand: 'עדן', cat: 'protein' },
  'סטייק טונה טרי': { brand: 'דג (טרי, ללא מותג)', cat: 'protein' },
  'פילה דג ים (לברק/דניס)': { brand: 'דג (טרי, ללא מותג)', cat: 'protein' },
  'אבקת חלבון': { brand: 'Optimum Nutrition (או מותג מועדף)', cat: 'protein' },
  'אבקת חלבון בטעם וניל': { brand: 'Optimum Nutrition (או מותג מועדף)', cat: 'protein' },

  'ביצים': { brand: 'חופית', cat: 'protein' },
  'חלבוני ביצה': { brand: 'תנובה', cat: 'protein' },

  'יוגורט יווני 0%': { brand: 'יופלה', cat: 'dairy' },
  'יוגורט יווני 5%': { brand: 'יופלה', cat: 'dairy' },
  'יוגורט יווני 10%': { brand: 'יופלה', cat: 'dairy' },
  'יוגורט טבעי 3%': { brand: 'תנובה', cat: 'dairy' },
  'חלב 2%': { brand: 'תנובה', cat: 'dairy' },
  'חלב קוקוס (שימורים)': { brand: 'יכין', cat: 'dairy' },
  'גבינה לבנה 5%': { brand: 'תנובה', cat: 'dairy' },
  "גבינת קוטג' 5%": { brand: 'תנובה', cat: 'dairy' },
  "קוטג' 12%": { brand: 'תנובה', cat: 'dairy' },
  'גבינה צהובה 9%': { brand: 'תנובה עמק לייט', cat: 'dairy' },
  'גבינה צהובה 28%': { brand: 'תנובה עמק', cat: 'dairy' },
  'גבינה בולגרית 5%': { brand: 'גד', cat: 'dairy' },
  'פטה בולגרית 14%': { brand: 'גד', cat: 'dairy' },
  'גבינת שמנת 30%': { brand: 'פילדלפיה', cat: 'dairy' },
  'שמנת מתוקה 38%': { brand: 'תנובה', cat: 'dairy' },
  'שמנת חמוצה 15% (למילוי)': { brand: 'תנובה', cat: 'dairy' },
  'חמאה': { brand: 'תנובה', cat: 'dairy' },
  'חמאה נמסה (לקרום)': { brand: 'תנובה', cat: 'dairy' },
  "גבינת קוטג' 1%": { brand: 'תנובה', cat: 'dairy' },
  "גבינת קוטג' 3%": { brand: 'תנובה', cat: 'dairy' },
  'ריקוטה קלה': { brand: 'גליל', cat: 'dairy' },
  'לבנה': { brand: 'מחלבות גד', cat: 'dairy' },
  'מוצרלה מלאה': { brand: 'תנובה', cat: 'dairy' },

  'אורז מלא מבושל': { brand: 'סוגת', cat: 'grains' },
  'אורז לבן מבושל': { brand: 'סוגת', cat: 'grains' },
  'אטריות אורז מבושלות': { brand: 'יו', cat: 'grains' },
  'שיבולת שועל': { brand: 'קוואקר', cat: 'grains' },
  'פסטה מלאה מבושלת': { brand: 'ברילה', cat: 'grains' },
  'קינואה מבושלת': { brand: 'סוגת', cat: 'grains' },
  'בורגול מבושל': { brand: 'סוגת', cat: 'grains' },
  'קוסקוס מלא מבושל': { brand: 'סוגת', cat: 'grains' },
  'עדשים מבושלות': { brand: 'סוגת', cat: 'grains' },
  'קמח מלא': { brand: 'סוגת', cat: 'grains' },
  'קמח שקדים': { brand: 'נטורה', cat: 'grains' },
  'לחם מלא': { brand: "אנג'ל", cat: 'bakery' },
  'פיתה מלאה קטנה': { brand: "אנג'ל", cat: 'bakery' },
  'פיתה מלאה': { brand: "אנג'ל", cat: 'bakery' },
  'פריכיות אורז מלא': { brand: 'אסאדו', cat: 'bakery' },
  'חומוס': { brand: 'אחלה', cat: 'pantry' },

  'שמן זית': { brand: 'יד מרדכי', cat: 'pantry' },
  'שמן קוקוס': { brand: 'טבע חיים', cat: 'pantry' },
  'שמן שומשום': { brand: 'האגם', cat: 'pantry' },
  'טחינה גולמית': { brand: 'אחוה', cat: 'pantry' },
  'חמאת בוטנים טבעית': { brand: 'מרום', cat: 'pantry' },
  'חמאת שקדים טבעית': { brand: 'טבע חיים', cat: 'pantry' },
  'דבש': { brand: 'יד מרדכי', cat: 'pantry' },
  'רוטב עגבניות': { brand: 'יכין', cat: 'pantry' },
  'רוטב סויה דל נתרן': { brand: 'קיקומן', cat: 'pantry' },
  'קקאו טהור ללא סוכר': { brand: 'עלית', cat: 'pantry' },
  "שוקולד מריר (צ'יפס)": { brand: 'עלית', cat: 'pantry' },
  'גרנולה טבעית ללא סוכר': { brand: 'טבע חיים', cat: 'pantry' },
  'קוקוס טחון ללא סוכר': { brand: 'יכין', cat: 'pantry' },

  'אגוזי מלך': { brand: 'שופרסל / תפזורת', cat: 'pantry' },
  'אגוזי מקדמיה': { brand: 'שופרסל / תפזורת', cat: 'pantry' },
  'פקאן': { brand: 'שופרסל / תפזורת', cat: 'pantry' },
  'שקדים': { brand: 'שופרסל / תפזורת', cat: 'pantry' },
  'פיסטוקים קלויים': { brand: 'שופרסל / תפזורת', cat: 'pantry' },
  'תמרים': { brand: 'קינג סולומון', cat: 'pantry' },
  'צימוקים': { brand: 'שופרסל / תפזורת', cat: 'pantry' },
  'משמשים מיובשים': { brand: 'שופרסל / תפזורת', cat: 'pantry' },
};

const PRODUCE_KEYWORDS = ['אבוקדו', 'בטטה', 'בננ', 'בצל', 'ברוקולי', 'גזר', 'זית', 'חסה', 'כרוב', 'מלפפון', 'נקטרינה', 'סלרי', 'עגבני', 'ענבים', 'פלפל', 'קישוא', 'קיווי', 'קייל', 'שעועית ירוקה', 'תותים', 'תפוז', 'תפוח', 'אספרגוס', 'תרד', 'פטריות', 'פירות יער', 'רימון', 'אננס', 'אפרסק', 'ירקות'];

const SHOPPING_CAT_LABELS = {
  protein: '🥩 חלבונים (בשר, עוף, דגים, ביצים)',
  dairy: '🧀 מוצרי חלב',
  produce: '🥬 ירקות ופירות טריים',
  grains: '🌾 דגנים וקטניות',
  bakery: '🍞 מאפייה',
  pantry: '🫙 מזווה (שמנים, ממרחים, יבשים)',
  other: '📦 אחר',
};
const SHOPPING_CAT_ORDER = ['protein', 'dairy', 'produce', 'grains', 'bakery', 'pantry', 'other'];

function classifyIngredient(name) {
  if (BRANDS[name]) return BRANDS[name];
  if (PRODUCE_KEYWORDS.some((k) => name.includes(k))) return { brand: 'ירקן/פארם טרי (ללא מותג)', cat: 'produce' };
  return { brand: '—', cat: 'other' };
}

function formatShoppingQty(info) {
  if (info.isEgg) {
    const count = Math.ceil(info.grams / 50);
    return count === 1 ? 'ביצה אחת' : `${count} ביצים`;
  }
  if (info.liquid) {
    if (info.grams >= 500) return `${(info.grams / 1000).toFixed(1).replace('.0', '')} ליטר`;
    return `${Math.round(info.grams)} מ"ל`;
  }
  if (info.grams >= 1000) return `${(info.grams / 1000).toFixed(2).replace(/0+$/, '').replace(/\.$/, '')} ק"ג`;
  return `${Math.round(info.grams)} גרם`;
}
