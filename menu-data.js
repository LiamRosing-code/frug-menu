/*
 * פרוג ושות' — נתוני התפריט
 * ---------------------------------------------------------------
 * זה הקובץ היחיד שצריך לערוך כדי לעדכן מנה, מחיר או תמונה.
 *   name   שם המנה
 *   desc   תיאור / מרכיבים (אפשר להשאיר ריק)
 *   price  מחיר בשקלים (מספר)
 *   note   הערה קטנה מתחת לתיאור (תוספות, אופציות)
 *   tags   תגיות, למשל ["טבעוני"]
 *   img    שם קובץ התמונה בתיקייה assets/dishes (בלי הסיומת).
 *          לכל תמונה יש שני קבצים: name.jpg (גדולה) ו-name-thumb.jpg (קטנה).
 *   video  סרטון קצר שמוצג בחלון המנה (אופציונלי)
 *   tall   true כשהתמונה הגדולה היא לאורך (800×1000), למשל קוקטיילים
 *
 *   prices כמה מחירים למנה אחת, במקום price:
 *            [32, 69]                                   מוצג "32/69"
 *            [{ l: "כוס", v: 36 }, { l: "בקבוק", v: 125 }]   מוצג עם תוויות
 *
 * קטגוריה:
 *   compact: true   שורות צפופות (שם מימין, מחיר משמאל) — מתאים לשתייה
 *   groups: [{ title, items }]   תת־קבוצות בתוך קטגוריה (במקום items)
 *   sub      שורת הסבר מתחת לכותרת
 *   deals: true     מסגרת מודגשת למבצעים
 * banner של קטגוריה: { image: "..." } או { video: "...", poster: "..." }
 *   אפשר להוסיף ratio (למשל "1 / 1") ו-caption (כיתוב קטן על התמונה)
 * gallery: תמונות ({ src, alt }) או סרטונים ({ video, src (תמונת פתיחה), alt })
 *
 * אנגלית (כפתור EN):
 *   לכל מנה, קטגוריה, תת־קבוצה ותמונה אפשר להוסיף en: { ... } עם אותם שדות באנגלית,
 *   למשל en: { name: "Margherita", desc: "Tomato sauce, ...", note: "..." }.
 *   מחירים ותגיות לא צריך לתרגם. שדה שחסר באנגלית מוצג בעברית.
 */
window.FRUG_MENU = {
  // מונה כניסות (GoatCounter, בלי עוגיות). שם הקוד מ-goatcounter.com; ריק = כבוי.
  analytics: { goatcounter: "frug-menu" },

  venue: {
    name: "פרוג ושות'",
    nameEn: "Frug & Co.",
    address: "ארלוזורוב 29, רמת גן",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%D7%A4%D7%A8%D7%95%D7%92+%D7%95%D7%A9%D7%95%D7%AA+%D7%90%D7%A8%D7%9C%D7%95%D7%96%D7%95%D7%A8%D7%95%D7%91+29+%D7%A8%D7%9E%D7%AA+%D7%92%D7%9F",
    phone: "+972537727762",
    phoneDisplay: "053-772-7762",
    instagram: "https://www.instagram.com/frug.rmg/",
    instagramHandle: "@frug.rmg",
    booking: "https://ontopo.com/he/il/page/66519014",
    wolt: "https://wolt.com/he/isr/tel-aviv/restaurant/frug-co",
    // פסי הודעה מתחת לכותרת. href (אופציונלי) מקפיץ לקטגוריה. כדי להסתיר: notices: []
    notices: [
      { title: "Happy Hour", text: "ימים א׳–ה׳ · 18:30-19:30 · 25% הנחה על כל התפריט*", en: { text: "Sun–Thu · 18:30-19:30 · 25% off the entire menu*" } },
      { title: "לייט נייט", text: "מ-22:00 · פיצה ושתייה החל מ-99 ₪", href: "#late-night", en: { title: "Late Night", text: "From 22:00 · pizza & a drink from ₪99" } }
    ],
    // שורות קטנות בתחתית הדף
    finePrint: [
      "* ההנחה ב-Happy Hour לא חלה על קנקני בירה, בקבוקי יין, צ'ייסרים וקארפצ'יו",
      "התמונות להמחשה בלבד"
    ],
    // English version of the venue texts (the language button). Anything missing falls back to Hebrew.
    en: {
      name: "Frug & Co.",
      address: "Arlozorov 29, Ramat Gan",
      finePrint: [
        "* The Happy Hour discount does not apply to beer pitchers, wine bottles, chasers and carpaccio",
        "Photos are for illustration only"
      ]
    }
  },

  sections: [
    {
      id: "starters",
      title: "ראשונות",
      en: { title: "Starters" },
      items: [
        { name: "פוקצ'ה מתבלים", desc: "טחינה, סלסה, זיתים סורים", price: 29, img: "focaccia", en: { name: "Spiced Focaccia", desc: "Tahini, salsa, Syrian olives" } },
        { name: "צלחת גבינות", desc: "", price: 68, en: { name: "Cheese Plate" } },
        { name: "בטטה מדורה", desc: "שמנת של פעם, עירית קצוצה", price: 43, img: "batata", en: { name: "Campfire Sweet Potato", desc: "Old-fashioned sour cream, chopped chives" } },
        { name: "פרחי כרובית", desc: "כרובית ב-350 מעלות, טחינה לבנה, עירית קצוצה", price: 55, img: "cauliflower", en: { name: "Cauliflower Florets", desc: "Cauliflower roasted at 350°C, white tahini, chopped chives" } },
        { name: "נאצ'וס סן דייגו", desc: "פיקו דה גאיו, גוואקמולי, שמנת חמוצה, חלפניו כבוש", price: 59, en: { name: "San Diego Nachos", desc: "Pico de gallo, guacamole, sour cream, pickled jalapeño" } },
        { name: "ארטישוק בלאבנה", desc: "ארטישוק צרוב, שום, פטרוזיליה, צנוברים ואורוגולה", price: 49, en: { name: "Artichoke & Labneh", desc: "Seared artichoke, garlic, parsley, pine nuts and arugula" } },
        { name: "קארפצ'יו סינטה", desc: "שמן זית, בלסמיקו, אורוגולה, פרמג'ן", note: "לא כלול בהנחת Happy Hour", price: 68, en: { name: "Sirloin Carpaccio", desc: "Olive oil, balsamic, arugula, parmesan", note: "Not included in the Happy Hour discount" } }
      ]
    },
    {
      id: "salads",
      title: "סלטים",
      en: { title: "Salads" },
      banner: { video: "assets/media/salad.mp4", poster: "assets/media/salad-poster.jpg", ratio: "4 / 5" },
      items: [
        { name: "קיסר", desc: "לבבות חסה, בצל סגול, קרוטונים, פרמג'ן", note: "תוספת עוף / ארטישוק · 12 ₪", price: 58, img: "caesar", en: { name: "Caesar", desc: "Lettuce hearts, red onion, croutons, parmesan", note: "Add chicken / artichoke · ₪12" } },
        { name: "פנצנלה", desc: "עגבניות שרי צבעוניות, מלפפון, גמבה, בצל סגול, זיתי קלמטה, קרוטונים, מוצרלה טריה, ויניגרט שרי", price: 58, img: "panzanella", en: { name: "Panzanella", desc: "Colorful cherry tomatoes, cucumber, bell pepper, red onion, Kalamata olives, croutons, fresh mozzarella, cherry vinaigrette" } },
        { name: "עלים עונתי", desc: "חסה לאליק וקיסר, פרי העונה, נענע, בזיליקום, אגוזי לוז מקורמלים, ויניגרט הדרים, גבינה כחולה", price: 61, img: "seasonal", en: { name: "Seasonal Greens", desc: "Lalique and romaine lettuce, seasonal fruit, mint, basil, caramelized hazelnuts, citrus vinaigrette, blue cheese" } }
      ]
    },
    {
      id: "pizza",
      title: "פיצות מתנור אבן",
      en: { title: "Stone-Oven Pizza", short: "Pizza" },
      short: "פיצות",
      banner: { video: "assets/media/dough.mp4", poster: "assets/media/dough-poster.jpg" },
      items: [
        { name: "מרגריטה", desc: "רוטב עגבניות, מוצרלה, פרמג'ן, בזיליקום", note: "(אפשר להוסיף זיתים ירוקים בתוספת 5 ₪)", price: 74, img: "margherita", en: { name: "Margherita", desc: "Tomato sauce, mozzarella, parmesan, basil", note: "(Add green olives for ₪5)" } },
        { name: "אלה רומנה", desc: "רוטב עגבניות, מוצרלה, גבינת פטה, ארטישוק רומאי, זיתי קלמטה, שרי צלויות, בלסמי מצומצם", price: 79, img: "romana", en: { name: "Alla Romana", desc: "Tomato sauce, mozzarella, feta, Roman artichoke, Kalamata olives, roasted cherry tomatoes, balsamic reduction" } },
        { name: "ספייסי פפרוני", desc: "רוטב עגבניות, מוצרלה, בצל סגול, צ'ילי טרי, פפרוני איטלקי, פרמג'ן", price: 79, img: "pepperoni", en: { name: "Spicy Pepperoni", desc: "Tomato sauce, mozzarella, red onion, fresh chili, Italian pepperoni, parmesan" } },
        { name: "פונגי", desc: "שמנת כמהין, פטריות שמפיניון, קונפי שום, אורגנו טרי, פרמג'ן", price: 79, img: "funghi", en: { name: "Funghi", desc: "Truffle cream, champignon mushrooms, garlic confit, fresh oregano, parmesan" } },
        { name: "עיזים ודבש", desc: "רוטב ביאנקה, מוצרלה, גבינת עיזים, שום גרוס, אורגנו טרי, דבש חריף", price: 78, en: { name: "Goat Cheese & Honey", desc: "Bianca sauce, mozzarella, goat cheese, crushed garlic, fresh oregano, hot honey" } },
        { name: "פולנטה", desc: "קרם פולנטה, גבינת עיזים, מרווה, אורגנו טרי ושום קונפי", price: 78, img: "polenta", en: { name: "Polenta", desc: "Polenta cream, goat cheese, sage, fresh oregano and garlic confit" } },
        { name: "בייקון עגל ואננס", desc: "בייקון עגל, אננס", price: 88, en: { name: "Veal Bacon & Pineapple", desc: "Veal bacon, pineapple" } },
        { name: "בטטה קריספי", desc: "רוטב ביאנקה, בצל, בטטה, גבינת עיזים", price: 78, img: "batata-pizza", en: { name: "Crispy Sweet Potato", desc: "Bianca sauce, onion, sweet potato, goat cheese" } }
      ]
    },
    {
      id: "sandwiches",
      title: "כריכים ושות'",
      en: { title: "Sandwiches & Co.", short: "Sandwiches" },
      short: "כריכים",
      banner: { image: "assets/media/sandwich-banner.jpg" },
      items: [
        { name: "רוסטביף", desc: "מיונז, חרדל דיז'ון, בצל סגול, עגבניה, מלפפון חמוץ, אורוגולה", price: 59, img: "roastbeef", en: { name: "Roast Beef", desc: "Mayonnaise, Dijon mustard, red onion, tomato, pickle, arugula" } },
        { name: "קובני סטייל", desc: "חזה אווז מעושן, גאודה הולנדית, צ'יפוטלה, עגבניה, בצל סגול, מלפפון חמוץ", price: 61, img: "cuban", en: { name: "Cuban Style", desc: "Smoked goose breast, Dutch gouda, chipotle, tomato, red onion, pickle" } },
        { name: "סופלאקי שווארמה של בוזו", desc: "בצל סומק, לימון כבוש, טחינה, עגבניות, פלפל שיפקה, קורנישון, פטרוזיליה", price: 59, img: "souvlaki", en: { name: "Bozo's Shawarma Souvlaki", desc: "Sumac onion, preserved lemon, tahini, tomatoes, shipka pepper, cornichons, parsley" } },
        { name: "לחמעג'ון", desc: "בשר רוסטביף קצוץ, עגבניות מרוסקות, בצל, שמן זית, פטרוזיליה, טחינה", price: 59, img: "lahmajun", en: { name: "Lahmajun", desc: "Chopped roast beef, crushed tomatoes, onion, olive oil, parsley, tahini" } },
        { name: "טוסט ירושלמי", desc: "גאודה, גבינת פטה, עגבניה, בצל סגול, זיתי קלמטה, זעתר", price: 55, img: "toast", en: { name: "Jerusalem Toast", desc: "Gouda, feta, tomato, red onion, Kalamata olives, za'atar" } },
        { name: "טוסט טבעוני", desc: "גבינה טבעונית, עגבניה, בצל, זיתי קלמטה, זעתר", price: 52, img: "toast-vegan", tags: ["טבעוני"], en: { name: "Vegan Toast", desc: "Vegan cheese, tomato, onion, Kalamata olives, za'atar" } }
      ]
    },
    {
      id: "desserts",
      title: "קינוחים",
      en: { title: "Desserts" },
      banner: { video: "assets/media/dessert.mp4", poster: "assets/media/dessert-poster.jpg" },
      items: [
        { name: "קינוח מתחלף", desc: "מוס שוקולד, שמן זית, מלח גס", tags: ["חלבי"], price: 36, en: { name: "Rotating Dessert", desc: "Chocolate mousse, olive oil, coarse salt" } },
        { name: "ברד פודינג", desc: "קצפת וקרמל מלוח", price: 48, img: "bread-pudding", en: { name: "Bread Pudding", desc: "Whipped cream and salted caramel" } },
        { name: "קלצונה נוטלה", desc: "הבצק שלנו במילוי נוטלה, קרם וניל", note: "אופציה לטבעוני", price: 48, img: "calzone", video: "assets/media/dessert.mp4", en: { name: "Nutella Calzone", desc: "Our dough filled with Nutella, vanilla cream", note: "Vegan option available" } }
      ]
    },
    {
      id: "late-night",
      title: "לייט נייט",
      en: { title: "Late Night", sub: "From 22:00 until the kitchen closes" },
      sub: "מ-22:00 ועד סגירת המטבח",
      deals: true,
      compact: true,
      items: [
        { name: "פיצה מרגריטה", desc: "+ קנקן בירה / שתי כוסות יין", price: 99, en: { name: "Margherita pizza", desc: "+ beer pitcher / two glasses of wine" } },
        { name: "פיצה עם תוספות", desc: "+ קנקן בירה / שתי כוסות יין", price: 114, en: { name: "Pizza with toppings", desc: "+ beer pitcher / two glasses of wine" } },
        { name: "פיצה מרגריטה + קינוח", desc: "+ קנקן בירה / שתי כוסות יין", price: 134, en: { name: "Margherita pizza + dessert", desc: "+ beer pitcher / two glasses of wine" } },
        { name: "פיצה עם תוספות + קינוח", desc: "+ קנקן בירה / שתי כוסות יין", price: 149, en: { name: "Pizza with toppings + dessert", desc: "+ beer pitcher / two glasses of wine" } }
      ]
    },
    {
      id: "beer",
      title: "בירות",
      en: { title: "Beer" },
      compact: true,
      groups: [
        {
          title: "מהחבית", en: { title: "On Tap" },
          items: [
            { name: "קרלסברג", desc: "5%", prices: [{ l: "פיינט", v: 32 }, { l: "ליטר", v: 69 }], en: { name: "Carlsberg" } },
            { name: "טובורג", desc: "5.2%", prices: [{ l: "פיינט", v: 32 }, { l: "ליטר", v: 69 }], en: { name: "Tuborg" } },
            { name: "שקמה IPA", desc: "6%", prices: [{ l: "פיינט", v: 37 }, { l: "ליטר", v: 76 }], en: { name: "Shikma IPA" } },
            { name: "בלאנק 1664", desc: "5%", prices: [{ l: "פיינט", v: 36 }, { l: "ליטר", v: 74 }], en: { name: "1664 Blanc" } },
            { name: "גינס", desc: "4.2%", prices: [{ l: "שליש", v: 33 }, { l: "פיינט", v: 42 }, { l: "ליטר", v: 85 }], en: { name: "Guinness" } }
          ]
        },
        {
          title: "בבקבוק", en: { title: "Bottled" },
          items: [
            { name: "ויינשטפן", desc: "שליש · 5.4%", price: 28, en: { name: "Weihenstephan", desc: "330 ml · 5.4%" } },
            { name: "ויינשטפן וויטוס", desc: "חצי · 7.7%", price: 41, en: { name: "Weihenstephan Vitus", desc: "500 ml · 7.7%" } },
            { name: "בלאנק 1664 רוזה", desc: "4.5%", price: 29, en: { name: "1664 Rosé" } },
            { name: "סומרסבי תפוח", desc: "4.5%", price: 32, en: { name: "Somersby Apple" } },
            { name: "קורונה", desc: "4.5%", price: 34, en: { name: "Corona" } },
            { name: "דאורה דאם", desc: "5.4% · ללא גלוטן", price: 33, en: { name: "Daura Damm", desc: "5.4% · gluten-free" } },
            { name: "קרלסברג 0", desc: "0.0%", price: 28, en: { name: "Carlsberg 0.0" } }
          ]
        }
      ]
    },
    {
      id: "wine",
      title: "יין",
      en: { title: "Wine", sub: "Second bottle 50% off" },
      sub: "בקבוק שני ב-50%",
      compact: true,
      groups: [
        {
          title: "לבן", en: { title: "White" },
          items: [
            { name: "שרדונה דאקור", desc: "שרדונה חד ומרענן עם טעמים ירקרקים", tags: ["כשר"], prices: [{ l: "כוס", v: 36 }, { l: "בקבוק", v: 125 }], en: { name: "Chardonnay D'Accord", desc: "A crisp, refreshing Chardonnay with green notes" } },
            { name: "שנין בלאן", desc: "פמיל בוגרייה, צרפת — קלאסיקה מעמק הלואר. יין מלא טעם, עסיסי וקצת מתקתק", prices: [{ l: "כוס", v: 36 }, { l: "בקבוק", v: 125 }], en: { name: "Chenin Blanc", desc: "Famille Bougrier, France — a Loire Valley classic. Full-flavored, juicy and slightly sweet" } },
            { name: "פינו גריג'יו", desc: "קסטלו דלה רוסה, איטליה — יבש, רענן ועשיר בארומות פירותיות", prices: [{ l: "כוס", v: 39 }, { l: "בקבוק", v: 135 }], en: { name: "Pinot Grigio", desc: "Castello della Rosa, Italy — dry, fresh and rich in fruity aromas" } },
            { name: "גוורצטרמינר", desc: "אלמנטס, ארטיזנל, ישראל — יין חצי יבש נהדר. ניחוח עוצמתי של פירות אקזוטיים ותבלינים", tags: ["כשר"], prices: [{ l: "כוס", v: 39 }, { l: "בקבוק", v: 135 }], en: { name: "Gewürztraminer", desc: "Elements, Artisanal, Israel — a lovely off-dry wine with an intense bouquet of exotic fruit and spice" } },
            { name: "קוסטוזה", desc: "מונטה דל פרא, איטליה — בלנד לבן פירותי, רענן וחד מאזור ונטו בצפון איטליה", prices: [{ l: "בקבוק", v: 156 }], en: { name: "Custoza", desc: "Monte del Frà, Italy — a fruity, fresh and crisp white blend from Veneto in northern Italy" } },
            { name: "סוביניון בלאן טוריין", desc: "פמיל בוגרייה, צרפת — ארומטי עם פירותיות נעימה ורעננות", prices: [{ l: "בקבוק", v: 172 }], en: { name: "Touraine Sauvignon Blanc", desc: "Famille Bougrier, France — aromatic, with pleasant fruit and freshness" } },
            { name: "סוביניון בלאן סקורפיוס", desc: "אסטרולאב, ניו זילנד — ארומה ממכרת של פירות טרופיים וגויאבה", prices: [{ l: "בקבוק", v: 196 }], en: { name: "Scorpius Sauvignon Blanc", desc: "Astrolabe, New Zealand — an irresistible aroma of tropical fruit and guava" } },
            { name: "אסרטיקו", desc: "קיר־יאני, יוון — עסיסי, מלא, עם ארומות פרחוניות ונעימות ומליחות בסיומת", prices: [{ l: "בקבוק", v: 208 }], en: { name: "Assyrtiko", desc: "Kir-Yianni, Greece — juicy and full, with pleasant floral aromas and a saline finish" } },
            { name: "שאבלי", desc: "ברנרד דפה, צרפת — מאוזן ומפנק מאחד מאזורי הגידול המפורסמים בעולם", prices: [{ l: "בקבוק", v: 299 }], en: { name: "Chablis", desc: "Bernard Defaix, France — balanced and indulgent, from one of the world's most famous growing regions" } }
          ]
        },
        {
          title: "רוזה", en: { title: "Rosé" },
          items: [
            { name: "רוזה", desc: "פמיל בוגרייה, צרפת — טעמי פטל ודובדבן וסיומת נעימה", prices: [{ l: "כוס", v: 36 }, { l: "בקבוק", v: 125 }], en: { name: "Rosé", desc: "Famille Bougrier, France — raspberry and cherry flavors with a pleasant finish" } },
            { name: "רוזה ברברה אלמנטס", desc: "ארטיזנל, ישראל — רענן, חד ומאוזן עם ארומות של פירות אדומים", tags: ["כשר"], prices: [{ l: "כוס", v: 39 }, { l: "בקבוק", v: 135 }], en: { name: "Barbara Rosé, Elements", desc: "Artisanal, Israel — fresh, crisp and balanced, with red fruit aromas" } },
            { name: "רוזה ברדולינו", desc: "מונטה דל פרא, איטליה — יבש וצלול. מרענן, מלוח, עשיר", prices: [{ l: "בקבוק", v: 176 }], en: { name: "Bardolino Rosé", desc: "Monte del Frà, Italy — dry and clear. Refreshing, saline, rich" } },
            { name: "רוזה אקס", desc: "צרפת — המותג הוורוד מדרום צרפת. קיצי, פירותי וקליל", prices: [{ l: "בקבוק", v: 225 }], en: { name: "AIX Rosé", desc: "France — the pink icon of southern France. Summery, fruity and light" } }
          ]
        },
        {
          title: "אדום", en: { title: "Red" },
          items: [
            { name: "מלבק", desc: "אנוביס, סוזנה באלבו, ארגנטינה — נעים ומלא בטעמי פרי ושוקולד", prices: [{ l: "כוס", v: 36 }, { l: "בקבוק", v: 125 }], en: { name: "Malbec", desc: "Anubis, Susana Balbo, Argentina — smooth and full of fruit and chocolate flavors" } },
            { name: "פרימיטיבו", desc: "טרולי, איטליה — פירותי ואלגנטי עם טעמי פטל ועישון", prices: [{ l: "כוס", v: 39 }, { l: "בקבוק", v: 135 }], en: { name: "Primitivo", desc: "Trulli, Italy — fruity and elegant, with raspberry and smoky notes" } },
            { name: "שיראז", desc: "אלמנטס, ארטיזנל, ישראל — שיראז גלילי רענן ואלגנטי. התיישן 12 חודשים בחבית עץ אלון צרפתי", tags: ["כשר"], prices: [{ l: "כוס", v: 39 }, { l: "בקבוק", v: 135 }], en: { name: "Shiraz", desc: "Elements, Artisanal, Israel — a fresh, elegant Galilee Shiraz, aged 12 months in French oak barrels" } },
            { name: "ריוחה", desc: "קריאנזה, לופז דה הארו, ספרד — מרוכז, מלא טעמי פרי שחור, שוקולד ותבלינים", prices: [{ l: "בקבוק", v: 156 }], en: { name: "Rioja", desc: "Crianza, López de Haro, Spain — concentrated, full of black fruit, chocolate and spice" } },
            { name: "ואלפוליצ'לה", desc: "מונטה דל פרא, איטליה — יין אדום קליל וכיף, מלא בטעמי דובדבנים מרוכזים", prices: [{ l: "בקבוק", v: 199 }], en: { name: "Valpolicella", desc: "Monte del Frà, Italy — a light, fun red full of concentrated cherry flavors" } }
          ]
        },
        {
          title: "מבעבע", en: { title: "Sparkling" },
          items: [
            { name: "פרוסקו", desc: "צינזאנו, איטליה", price: 125, en: { name: "Prosecco", desc: "Cinzano, Italy" } }
          ]
        }
      ]
    },
    {
      id: "soft",
      title: "שתייה קלה",
      en: { title: "Soft Drinks" },
      compact: true,
      items: [
        { name: "מים מינרלים", price: 12, en: { name: "Mineral water" } },
        { name: "שתייה מוגזת בבקבוק", price: 15, en: { name: "Bottled soda" } },
        { name: "שתייה קלה", price: 12, en: { name: "Soft drink" } },
        { name: "סודה נורדיק", price: 12, en: { name: "Nordic soda" } },
        { name: "תוספת שתייה קלה", price: 8, en: { name: "Soft drink (add-on)" } }
      ]
    },
    {
      id: "cocktails",
      title: "קוקטיילים",
      en: { title: "Cocktails" },
      banner: { image: "assets/media/gallery-cocktails-four.jpg", ratio: "4 / 5" },
      items: [
        { name: "החרב וקורי העכביש", desc: "וודקה זוטא לבנה, פסיפלורה, אננס, ליצ'י, לימון", price: 53, img: "ck-hacherev", tall: true, en: { name: "The Sword & the Spider Webs", desc: "Vodka, white zuta (wild mint), passion fruit, pineapple, lychee, lemon" } },
        { name: "לפנות ערב", desc: "ג'ין, בזיליקום, פסיפלורה, לימון, טוניק", price: 52, img: "ck-lifnot-erev", tall: true, en: { name: "At Dusk", desc: "Gin, basil, passion fruit, lemon, tonic" } },
        { name: "אגדת הכוס", desc: "טקילה, אפרול, מחית מנגו, לימון, מעט מזקל, תמצית פלפל חריף", price: 53, img: "ck-agadat-hakos", tall: true, video: "assets/media/cocktail.mp4", en: { name: "Legend of the Glass", desc: "Tequila, Aperol, mango purée, lemon, a dash of mezcal, hot pepper extract" } },
        { name: "חול וכוכבים", desc: "ג'ין, סירופ ליצ'י, סירופ למון גראס, קאווה, אבקת כסף", price: 52, img: "ck-chol-vekochavim", tall: true, en: { name: "Sand & Stars", desc: "Gin, lychee syrup, lemongrass syrup, cava, silver dust" } },
        { name: "פרח המדבר", desc: "ערק, סירופ אבטיח, חמוציות, לימון, אשכוליות מוגזות", price: 51, img: "ck-perach-hamidbar", tall: true, en: { name: "Desert Flower", desc: "Arak, watermelon syrup, cranberry, lemon, grapefruit soda" } },
        { name: "מרגריטה מנגו", desc: "קפואה · טקילה, מחית מנגו, לימון", price: 51, en: { name: "Mango Margarita", desc: "Frozen · tequila, mango purée, lemon" } },
        { name: "ברד אפרול", desc: "אפרול, מחית פסיפלורה, לימון", price: 51, en: { name: "Aperol Slush", desc: "Aperol, passion fruit purée, lemon" } },
        { name: "סנגריית הבית", desc: "קרה, או חמה בחורף", prices: [{ l: "כוס", v: 39 }, { l: "קנקן", v: 72 }], en: { name: "House Sangria", desc: "Served cold, or hot in winter" } }
      ]
    }
  ],

  gallery: [
    { src: "assets/media/gallery-bar.jpg", alt: "הבר של פרוג ושות'", en: { alt: "The bar at Frug & Co." } },
    { src: "assets/media/gallery-cocktails-day.jpg", alt: "קוקטיילים על השולחן", en: { alt: "Cocktails on the table" } },
    { video: "assets/media/cocktail.mp4", src: "assets/media/cocktail-poster.jpg", alt: "מזיגת קוקטייל על הבר", en: { alt: "Pouring a cocktail at the bar" } },
    { src: "assets/media/gallery-pass.jpg", alt: "פיצות יוצאות מהתנור", en: { alt: "Pizzas coming out of the oven" } },
    { src: "assets/media/gallery-cocktails-two.jpg", alt: "שני קוקטיילים ותפריט", en: { alt: "Two cocktails and a menu" } }
  ]
};
