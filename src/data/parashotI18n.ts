/**
 * Traducciones complementarias de ParashaTab (React i18next).
 * Se integran al i18n existente SIN reemplazar las traducciones de otras pantallas.
 *
 * Cobertura: 54 nombres y 54 resúmenes adaptados en en/he/fr/pt.
 * Para Bereshit se incluyen además aliyot, Rashi, Jabad, Halajá y 10 lecciones.
 * Los demás contenidos largos siguen utilizando el texto español hasta que
 * se añadan sus traducciones en estas mismas claves. No es traducción automática.
 */
export const parashotLocaleResources = {
  "es": {
    "currentWeeklyParasha": "Parashá de esta semana",
    "combinedWeeklyReading": "Lectura semanal combinada",
    "combinedReadingHint": "Selecciona cada porción para estudiarla.",
    "weeklyParashaUnavailable": "No se pudo confirmar la lectura semanal con Hebcal; puedes elegir una parashá.",
    "aliyahName": "Aliyá",
    "consultAliyot": "Consultar al Rabino sobre las Aliyot",
    "rashiPrompt": "¿Quieres profundizar en el comentario de Rashi?",
    "consultRashi": "Consultar sobre Rashi",
    "exploreWithRabbi": "Profundizar con el Rabino",
    "books": {
      "Bereshit": "Sefer Bereshit (Génesis)",
      "Shemot": "Sefer Shemot (Éxodo)",
      "Vayikra": "Sefer Vayikra (Levítico)",
      "Bamidbar": "Sefer Bamidbar (Números)",
      "Devarim": "Sefer Devarim (Deuteronomio)"
    }
  },
  "he": {
    "currentWeeklyParasha": "פרשת השבוע",
    "combinedWeeklyReading": "קריאה שבועית מחוברת",
    "combinedReadingHint": "בחרו בכל פרשה כדי ללמוד אותה.",
    "weeklyParashaUnavailable": "לא ניתן לאמת את פרשת השבוע באמצעות Hebcal. ניתן לבחור פרשה ידנית.",
    "aliyahName": "עלייה",
    "consultAliyot": "שאל את הרב על העליות",
    "rashiPrompt": "רוצים להעמיק בפירוש רש״י?",
    "consultRashi": "שאל על רש״י",
    "exploreWithRabbi": "להעמיק עם הרב",
    "books": {
      "Bereshit": "בראשית",
      "Shemot": "שמות",
      "Vayikra": "ויקרא",
      "Bamidbar": "במדבר",
      "Devarim": "דברים"
    },
    "parashot": {
      "bereshit": {
        "name": "בְּרֵאשִׁית",
        "summary": "בריאת העולם והאדם, גן עדן, קין והבל והדורות הראשונים.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 1:1 – 6:8",
        "rashiInsight": "רש״י שואל מדוע התורה פותחת בבריאת העולם ולא במצווה הראשונה שניתנה לישראל (שמות יב, ב). הוא מסביר שהקב״ה ברא את כל הארץ ובידו לתתה למי שירצה.",
        "chabadInsight": "תורת חב״ד מלמדת שתכלית הבריאה היא לעשות מן העולם הגשמי דירה לקב״ה בתחתונים.",
        "halachaFocus": "קדושת השבת והקידוש מעידים שהקב״ה ברא את העולם.",
        "aliyot": {
          "1": {
            "description": "ששת ימי הבריאה וקידוש השבת."
          },
          "2": {
            "description": "יצירת אדם מעפר האדמה והנחתו בגן עדן."
          },
          "3": {
            "description": "בריאת חוה, הנחש והפרי האסור."
          },
          "4": {
            "description": "הגירוש מגן עדן וסיפור קין והבל."
          },
          "5": {
            "description": "צאצאי קין והולדת שת."
          },
          "6": {
            "description": "הדורות מאדם עד חנוך."
          },
          "7": {
            "description": "הולדת נח וההידרדרות המוסרית שלפני המבול."
          }
        },
        "jasidicLessons": {
          "1": {
            "title": "1. התחלה בחכמה",
            "snippet": "בכל התחלה חדשה טמונה ניצוץ מכוונת הבורא."
          },
          "2": {
            "title": "2. האור הראשון",
            "snippet": "האור הגנוז של הבריאה ממשיך להאיר בלימוד התורה."
          },
          "3": {
            "title": "3. נשמת חיים",
            "snippet": "הנשימה האלוהית מחברת את הנשמה למקורה."
          },
          "4": {
            "title": "4. אתגר הניגודים",
            "snippet": "האדם נקרא לזכך את הניגודים שבחיי החומר."
          },
          "5": {
            "title": "5. בחירה חופשית",
            "snippet": "האזהרה לקין מלמדת שאפשר להתגבר על דחפים הרסניים."
          },
          "6": {
            "title": "6. צמיחת התודעה",
            "snippet": "הדורות הראשונים מלמדים על הפוטנציאל הרוחני של האנושות."
          },
          "7": {
            "title": "7. ירידה לצורך עלייה",
            "snippet": "נפילה רוחנית יכולה להפוך לדרך של צמיחה."
          },
          "8": {
            "title": "8. הניצוץ הנסתר",
            "snippet": "אפשר להעלות כל חפץ גשמי באמצעות מטרה קדושה."
          },
          "9": {
            "title": "9. ברכת השבת",
            "snippet": "היום השביעי מביא ברכה לכל ימות השבוע."
          },
          "10": {
            "title": "10. להתהלך עם ה׳",
            "snippet": "חנוך מדגים דבקות מתמדת בחיי היום יום."
          }
        }
      },
      "noaj": {
        "name": "נֹחַ",
        "summary": "נח בונה את התיבה; המבול, ברית הקשת ומגדל בבל.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 6:9 – 11:32"
      },
      "lej_leja": {
        "name": "לֶךְ־לְךָ",
        "summary": "אברהם נקרא לעזוב את ארצו; הבטחות הארץ והזרע וברית המילה.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 12:1 – 17:27"
      },
      "vayeira": {
        "name": "וַיֵּרָא",
        "summary": "אברהם מכניס אורחים, מתפלל על סדום, יצחק נולד ועקדת יצחק.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 18:1 – 22:24"
      },
      "chayei_sarah": {
        "name": "חַיֵּי שָׂרָה",
        "summary": "פטירת שרה, קניית מערת המכפלה ובחירת רבקה לאשת יצחק.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 23:1 – 25:18"
      },
      "toldot": {
        "name": "תּוֹלְדֹת",
        "summary": "לידת יעקב ועשו, מכירת הבכורה וברכות יצחק.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 25:19 – 28:9"
      },
      "vayetzei": {
        "name": "וַיֵּצֵא",
        "summary": "חלום הסולם של יעקב, נישואיו ללאה ולרחל, הקמת משפחתו ועזיבת לבן.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 28:10 – 32:3"
      },
      "vayishlach": {
        "name": "וַיִּשְׁלַח",
        "summary": "יעקב נאבק במלאך, מקבל את השם ישראל ונפגש עם עשו.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 32:4 – 36:43"
      },
      "vayeshev": {
        "name": "וַיֵּשֶׁב",
        "summary": "חלומות יוסף מעוררים את אחיו; הוא נמכר למצרים ונכלא.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 37:1 – 40:23"
      },
      "mikeitz": {
        "name": "מִקֵּץ",
        "summary": "יוסף פותר את חלומות פרעה, עולה לשלטון במצרים ופוגש את אחיו.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 41:1 – 44:17"
      },
      "vayigash": {
        "name": "וַיִּגַּשׁ",
        "summary": "יהודה ניגש למען בנימין, יוסף מתגלה ומשפחת יעקב יורדת למצרים.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 44:18 – 47:27"
      },
      "vayechi": {
        "name": "וַיְחִי",
        "summary": "יעקב מברך את בניו לפני מותו, ויוסף סולח לאחיו.",
        "bookSpanish": "בראשית",
        "reference": "בראשית 47:28 – 50:26"
      },
      "shemot": {
        "name": "שְׁמוֹת",
        "summary": "שעבוד ישראל במצרים, לידת משה, הסנה הבוער ושליחותו.",
        "bookSpanish": "שמות",
        "reference": "שמות 1:1 – 6:1"
      },
      "vaera": {
        "name": "וָאֵרָא",
        "summary": "הבטחת הגאולה, עימות משה עם פרעה והמכות הראשונות.",
        "bookSpanish": "שמות",
        "reference": "שמות 6:2 – 9:35"
      },
      "bo": {
        "name": "בֹּא",
        "summary": "המכות האחרונות במצרים, קרבן פסח ויציאת ישראל מעבדות.",
        "bookSpanish": "שמות",
        "reference": "שמות 10:1 – 13:16"
      },
      "beshalach": {
        "name": "בְּשַׁלַּח",
        "summary": "קריעת ים סוף, שירת הים והמן במדבר.",
        "bookSpanish": "שמות",
        "reference": "שמות 13:17 – 17:16"
      },
      "yitro": {
        "name": "יִתְרוֹ",
        "summary": "יתרו מייעץ למשה ובמעמד הר סיני ניתנות עשרת הדיברות.",
        "bookSpanish": "שמות",
        "reference": "שמות 18:1 – 20:23"
      },
      "mishpatim": {
        "name": "מִשְׁפָּטִים",
        "summary": "משפטי צדק, אחריות וחמלה, וחידוש הברית.",
        "bookSpanish": "שמות",
        "reference": "שמות 21:1 – 24:18"
      },
      "terumah": {
        "name": "תְּרוּמָה",
        "summary": "הציווי לבנות את המשכן וכליו הקדושים.",
        "bookSpanish": "שמות",
        "reference": "שמות 25:1 – 27:19"
      },
      "tetzaveh": {
        "name": "תְּצַוֶּה",
        "summary": "בגדי הכהונה, המנורה וחנוכת הכהנים.",
        "bookSpanish": "שמות",
        "reference": "שמות 27:20 – 30:10"
      },
      "ki_tisa": {
        "name": "כִּי תִשָּׂא",
        "summary": "חטא העגל מאיים על הברית; משה מתפלל והלוחות מתחדשים.",
        "bookSpanish": "שמות",
        "reference": "שמות 30:11 – 34:35"
      },
      "vayakhel": {
        "name": "וַיַּקְהֵל",
        "summary": "נדבת העם ותחילת מלאכת המשכן.",
        "bookSpanish": "שמות",
        "reference": "שמות 35:1 – 38:20"
      },
      "pekudei": {
        "name": "פְּקוּדֵי",
        "summary": "הקמת המשכן והשראת השכינה בתוכו.",
        "bookSpanish": "שמות",
        "reference": "שמות 38:21 – 40:38"
      },
      "vayikra": {
        "name": "וַיִּקְרָא",
        "summary": "דיני הקרבנות ועבודת המקדש.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 1:1 – 5:26"
      },
      "tzav": {
        "name": "צַו",
        "summary": "תפקידי הכהנים, הקרבנות וחנוכת אהרן ובניו.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 6:1 – 8:36"
      },
      "shemini": {
        "name": "שְׁמִינִי",
        "summary": "תחילת עבודת המשכן, מות נדב ואביהוא ודיני מאכלות אסורות.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 9:1 – 11:47"
      },
      "tazria": {
        "name": "תַזְרִיעַ",
        "summary": "דיני יולדת וטומאה, ובכללם נגעי עור.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 12:1 – 13:59"
      },
      "metzora": {
        "name": "מְצֹרָע",
        "summary": "טהרת המצורע ודינים נוספים של טומאה וטהרה.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 14:1 – 15:33"
      },
      "acharei_mot": {
        "name": "אַחֲרֵי מוֹת",
        "summary": "עבודת יום הכיפורים ודיני קדושה ועריות.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 16:1 – 18:30"
      },
      "kedoshim": {
        "name": "קְדֹשִׁים",
        "summary": "קריאה לקדושה באמצעות מוסר, צדק ואהבת הרע.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 19:1 – 20:27"
      },
      "emor": {
        "name": "אֱמֹר",
        "summary": "דיני הכהונה, מועדי ה׳ וספירת העומר.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 21:1 – 24:23"
      },
      "behar": {
        "name": "בְּהַר",
        "summary": "שמיטה ויובל, כבוד לארץ וצדק כלכלי.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 25:1 – 26:2"
      },
      "behukotai": {
        "name": "בְּחֻקֹּתַי",
        "summary": "ברכות ותוכחות הברית, נדרים והקדשות.",
        "bookSpanish": "ויקרא",
        "reference": "ויקרא 26:3 – 27:34"
      },
      "bamidbar": {
        "name": "בְּמִדְבַּר",
        "summary": "מפקד ישראל וסידור השבטים סביב המשכן.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 1:1 – 4:20"
      },
      "naso": {
        "name": "נָשֹׂא",
        "summary": "תפקידי הלויים, נזירות וברכת כהנים.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 4:21 – 7:89"
      },
      "behaalotecha": {
        "name": "בְּהַעֲלֹתְךָ",
        "summary": "הדלקת המנורה, מסעות ישראל במדבר ותלונות העם.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 8:1 – 12:16"
      },
      "shelach": {
        "name": "שְׁלַח־לְךָ",
        "summary": "המרגלים תרים את הארץ והפחד מוביל לגזרת ארבעים שנה במדבר.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 13:1 – 15:41"
      },
      "korach": {
        "name": "קֹרַח",
        "summary": "קרח מערער על הנהגת משה ואהרן ומתבררת משמעות הכהונה.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 16:1 – 18:32"
      },
      "chukat": {
        "name": "חֻקַּת",
        "summary": "פרה אדומה, מות מרים, מי מריבה ומות אהרן.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 19:1 – 22:1"
      },
      "balak": {
        "name": "בָּלָק",
        "summary": "בלק שוכר את בלעם לקלל את ישראל אך הקללות נהפכות לברכות.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 22:2 – 25:9"
      },
      "pinchas": {
        "name": "פִּינְחָס",
        "summary": "פינחס מקבל שכר על קנאותו, מפקד חדש ודיני נחלה.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 25:10 – 30:1"
      },
      "matot": {
        "name": "מַטּוֹת",
        "summary": "דיני נדרים, מלחמת מדיין ובקשת נחלה בעבר הירדן.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 30:2 – 32:42"
      },
      "masei": {
        "name": "מַסְעֵי",
        "summary": "סיכום מסעות ישראל ודיני נחלת הארץ וערי מקלט.",
        "bookSpanish": "במדבר",
        "reference": "במדבר 33:1 – 36:13"
      },
      "devarim": {
        "name": "דְּבָרִים",
        "summary": "משה סוקר את מסעות ישראל ואתגריהם בפתח נאומו האחרון.",
        "bookSpanish": "דברים",
        "reference": "דברים 1:1 – 3:22"
      },
      "vaetchanan": {
        "name": "וָאֶתְחַנַּן",
        "summary": "משה חוזר על עשרת הדיברות ומלמד את שמע ישראל ואהבת ה׳.",
        "bookSpanish": "דברים",
        "reference": "דברים 3:23 – 7:11"
      },
      "ekev": {
        "name": "עֵקֶב",
        "summary": "קריאה לזכור את ה׳, להודות ולשמור מצוות.",
        "bookSpanish": "דברים",
        "reference": "דברים 7:12 – 11:25"
      },
      "reeh": {
        "name": "רְאֵה",
        "summary": "ברכה וקללה, דיני עבודת ה׳, צדקה ושלוש רגלים.",
        "bookSpanish": "דברים",
        "reference": "דברים 11:26 – 16:17"
      },
      "shoftim": {
        "name": "שֹׁפְטִים",
        "summary": "שופטים, מלכים ונביאים מצווים על הצדק, ודיני מלחמה.",
        "bookSpanish": "דברים",
        "reference": "דברים 16:18 – 21:9"
      },
      "ki_titzei": {
        "name": "כִּי־תֵצֵא",
        "summary": "מצוות רבות בענייני משפחה, עבודה, צדק ואחריות.",
        "bookSpanish": "דברים",
        "reference": "דברים 21:10 – 25:19"
      },
      "ki_tavo": {
        "name": "כִּי־תָבוֹא",
        "summary": "ביכורים, מעשרות וברכות ותוכחות הברית.",
        "bookSpanish": "דברים",
        "reference": "דברים 26:1 – 29:8"
      },
      "nitzavim": {
        "name": "נִצָּבִים",
        "summary": "כל ישראל ניצבים לחדש את הברית ולבחור בחיים.",
        "bookSpanish": "דברים",
        "reference": "דברים 29:9 – 30:20"
      },
      "vayelech": {
        "name": "וַיֵּלֶךְ",
        "summary": "משה ממנה את יהושע, כותב את התורה ומצווה על הקהל.",
        "bookSpanish": "דברים",
        "reference": "דברים 31:1 – 31:30"
      },
      "haazinu": {
        "name": "הַאֲזִינוּ",
        "summary": "שירת האזינו מזכירה את הברית, צדק ה׳ ועתיד ישראל.",
        "bookSpanish": "דברים",
        "reference": "דברים 32:1 – 32:52"
      },
      "vezot_habracha": {
        "name": "וְזֹאת הַבְּרָכָה",
        "summary": "משה מברך את השבטים, רואה את הארץ המובטחת ונפטר; יהושע מנהיג אחריו.",
        "bookSpanish": "דברים",
        "reference": "דברים 33:1 – 34:12"
      }
    }
  },
  "en": {
    "currentWeeklyParasha": "This week’s Torah portion",
    "combinedWeeklyReading": "Combined weekly reading",
    "combinedReadingHint": "Select either portion to study it.",
    "weeklyParashaUnavailable": "Could not confirm the weekly Torah portion with Hebcal. You can select one manually.",
    "aliyahName": "Aliyah",
    "consultAliyot": "Ask the Rabbi about the Aliyot",
    "rashiPrompt": "Would you like to explore Rashi’s commentary further?",
    "consultRashi": "Ask about Rashi",
    "exploreWithRabbi": "Explore with the Rabbi",
    "books": {
      "Bereshit": "Genesis",
      "Shemot": "Exodus",
      "Vayikra": "Leviticus",
      "Bamidbar": "Numbers",
      "Devarim": "Deuteronomy"
    },
    "parashot": {
      "bereshit": {
        "name": "Bereshit",
        "summary": "God creates the world and humanity. The Garden of Eden, Cain and Abel, and the first generations.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 1:1 – 6:8",
        "rashiInsight": "Rashi asks why the Torah begins with Creation rather than the first commandment given to Israel (Exodus 12:2). He explains that God created the entire earth and has authority over whom to entrust it to.",
        "chabadInsight": "Chabad teaches that Creation has a purpose: to make this material world a dwelling place for the Divine (dirah betachtonim).",
        "halachaFocus": "The holiness of Shabbat and Kiddush testify that God created the world.",
        "aliyot": {
          "1": {
            "description": "The six days of Creation and the sanctification of Shabbat."
          },
          "2": {
            "description": "The formation of Adam from the dust and his placement in the Garden of Eden."
          },
          "3": {
            "description": "The creation of Eve, the serpent and the forbidden fruit."
          },
          "4": {
            "description": "Expulsion from Eden and the story of Cain and Abel."
          },
          "5": {
            "description": "The descendants of Cain and the birth of Seth."
          },
          "6": {
            "description": "The generations from Adam to Enoch."
          },
          "7": {
            "description": "The birth of Noah and the moral decline before the Flood."
          }
        },
        "jasidicLessons": {
          "1": {
            "title": "1. Beginning with Wisdom",
            "snippet": "Each new beginning contains a spark of the Creator’s intention."
          },
          "2": {
            "title": "2. The Primordial Light",
            "snippet": "The concealed light of Creation continues to shine through Torah study."
          },
          "3": {
            "title": "3. The Breath of Life",
            "snippet": "The divine breath connects the soul to its source."
          },
          "4": {
            "title": "4. The Challenge of Opposites",
            "snippet": "Human beings are called to refine the opposites within material life."
          },
          "5": {
            "title": "5. Free Will",
            "snippet": "The warning to Cain teaches that we can resist destructive impulses."
          },
          "6": {
            "title": "6. Growing Awareness",
            "snippet": "The earliest generations show humanity’s spiritual potential."
          },
          "7": {
            "title": "7. Descent for the Sake of Ascent",
            "snippet": "A spiritual setback can become a path toward growth."
          },
          "8": {
            "title": "8. The Hidden Spark",
            "snippet": "Every physical object can be elevated through a holy purpose."
          },
          "9": {
            "title": "9. The Blessing of Shabbat",
            "snippet": "The seventh day brings blessing to the rhythm of the week."
          },
          "10": {
            "title": "10. Walking with God",
            "snippet": "Enoch exemplifies constant devotion in everyday life."
          }
        }
      },
      "noaj": {
        "name": "Noach",
        "summary": "Noah builds the ark; the Flood, the rainbow covenant and the Tower of Babel follow.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 6:9 – 11:32"
      },
      "lej_leja": {
        "name": "Lech Lecha",
        "summary": "God calls Abraham to leave his homeland; promises of land and descendants, and the covenant of circumcision.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 12:1 – 17:27"
      },
      "vayeira": {
        "name": "Vayera",
        "summary": "Abraham welcomes visitors, pleads for Sodom, celebrates Isaac’s birth and faces the binding of Isaac.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 18:1 – 22:24"
      },
      "chayei_sarah": {
        "name": "Chayei Sarah",
        "summary": "Sarah dies; Abraham purchases Machpelah, and Rebecca is chosen as Isaac’s wife.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 23:1 – 25:18"
      },
      "toldot": {
        "name": "Toldot",
        "summary": "Jacob and Esau are born, the birthright is sold, and Isaac gives his blessings.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 25:19 – 28:9"
      },
      "vayetzei": {
        "name": "Vayetzei",
        "summary": "Jacob dreams of a ladder, marries Leah and Rachel, builds his family and leaves Laban.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 28:10 – 32:3"
      },
      "vayishlach": {
        "name": "Vayishlach",
        "summary": "Jacob struggles with an angel, receives the name Israel and reunites with Esau.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 32:4 – 36:43"
      },
      "vayeshev": {
        "name": "Vayeshev",
        "summary": "Joseph’s dreams provoke his brothers; he is sold into Egypt and later imprisoned.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 37:1 – 40:23"
      },
      "mikeitz": {
        "name": "Miketz",
        "summary": "Joseph interprets Pharaoh’s dreams, becomes ruler in Egypt and meets his brothers.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 41:1 – 44:17"
      },
      "vayigash": {
        "name": "Vayigash",
        "summary": "Judah pleads for Benjamin; Joseph reveals himself and Jacob’s family moves to Egypt.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 44:18 – 47:27"
      },
      "vayechi": {
        "name": "Vayechi",
        "summary": "Jacob blesses his children before his death; Joseph forgives his brothers.",
        "bookSpanish": "Genesis",
        "reference": "Genesis 47:28 – 50:26"
      },
      "shemot": {
        "name": "Shemot",
        "summary": "Israel suffers slavery in Egypt; Moses is born, encounters God at the burning bush and receives his mission.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 1:1 – 6:1"
      },
      "vaera": {
        "name": "Vaera",
        "summary": "God promises redemption; Moses confronts Pharaoh and the first plagues strike Egypt.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 6:2 – 9:35"
      },
      "bo": {
        "name": "Bo",
        "summary": "The final plagues strike Egypt; the Passover offering is commanded and Israel leaves slavery.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 10:1 – 13:16"
      },
      "beshalach": {
        "name": "Beshalach",
        "summary": "Israel crosses the sea, sings a song of praise and receives manna in the wilderness.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 13:17 – 17:16"
      },
      "yitro": {
        "name": "Yitro",
        "summary": "Jethro advises Moses; at Sinai, Israel receives the Ten Commandments.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 18:1 – 20:23"
      },
      "mishpatim": {
        "name": "Mishpatim",
        "summary": "Civil laws guide justice, responsibility and compassion; Israel renews the covenant.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 21:1 – 24:18"
      },
      "terumah": {
        "name": "Terumah",
        "summary": "Israel is instructed to build the Tabernacle and its sacred furnishings.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 25:1 – 27:19"
      },
      "tetzaveh": {
        "name": "Tetzaveh",
        "summary": "Priestly garments, the menorah and priestly consecration are described.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 27:20 – 30:10"
      },
      "ki_tisa": {
        "name": "Ki Tisa",
        "summary": "The golden calf threatens the covenant; Moses intercedes and the tablets are renewed.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 30:11 – 34:35"
      },
      "vayakhel": {
        "name": "Vayakhel",
        "summary": "The people contribute generously and artisans begin constructing the Tabernacle.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 35:1 – 38:20"
      },
      "pekudei": {
        "name": "Pekudei",
        "summary": "The completed Tabernacle is assembled and the Divine Presence fills it.",
        "bookSpanish": "Exodus",
        "reference": "Exodus 38:21 – 40:38"
      },
      "vayikra": {
        "name": "Vayikra",
        "summary": "The Torah introduces offerings and the service of the sanctuary.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 1:1 – 5:26"
      },
      "tzav": {
        "name": "Tzav",
        "summary": "Priestly duties, offerings and the consecration of Aaron and his sons are detailed.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 6:1 – 8:36"
      },
      "shemini": {
        "name": "Shemini",
        "summary": "The sanctuary service begins; Nadab and Abihu die, and dietary laws are given.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 9:1 – 11:47"
      },
      "tazria": {
        "name": "Tazria",
        "summary": "Laws of childbirth and ritual impurity, including skin afflictions, are presented.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 12:1 – 13:59"
      },
      "metzora": {
        "name": "Metzora",
        "summary": "Procedures of purification after skin afflictions and other sources of impurity are explained.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 14:1 – 15:33"
      },
      "acharei_mot": {
        "name": "Acharei Mot",
        "summary": "The Yom Kippur service and laws of holiness and forbidden relationships are taught.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 16:1 – 18:30"
      },
      "kedoshim": {
        "name": "Kedoshim",
        "summary": "Israel is called to holiness through ethical conduct, justice and love of neighbor.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 19:1 – 20:27"
      },
      "emor": {
        "name": "Emor",
        "summary": "The laws of priesthood, sacred festivals and the counting of the Omer are presented.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 21:1 – 24:23"
      },
      "behar": {
        "name": "Behar",
        "summary": "The sabbatical and jubilee years teach care for land and economic justice.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 25:1 – 26:2"
      },
      "behukotai": {
        "name": "Bechukotai",
        "summary": "Blessings and warnings frame the covenant; vows and sacred dedications are discussed.",
        "bookSpanish": "Leviticus",
        "reference": "Leviticus 26:3 – 27:34"
      },
      "bamidbar": {
        "name": "Bamidbar",
        "summary": "Israel is counted and the tribes are organized around the Tabernacle.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 1:1 – 4:20"
      },
      "naso": {
        "name": "Naso",
        "summary": "Duties of the Levites, the Nazirite vow and the priestly blessing are taught.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 4:21 – 7:89"
      },
      "behaalotecha": {
        "name": "Beha’alotcha",
        "summary": "The menorah is lit; Israel journeys in the desert and faces complaints and challenges.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 8:1 – 12:16"
      },
      "shelach": {
        "name": "Shelach",
        "summary": "Scouts explore Canaan; fear leads to a decree of forty years in the wilderness.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 13:1 – 15:41"
      },
      "korach": {
        "name": "Korach",
        "summary": "Korach challenges Moses and Aaron; the meaning of leadership and priesthood is affirmed.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 16:1 – 18:32"
      },
      "chukat": {
        "name": "Chukat",
        "summary": "The red heifer, Miriam’s death, the waters of Meribah and Aaron’s death are recounted.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 19:1 – 22:1"
      },
      "balak": {
        "name": "Balak",
        "summary": "Balak hires Balaam to curse Israel, but the curses become blessings.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 22:2 – 25:9"
      },
      "pinchas": {
        "name": "Pinchas",
        "summary": "Pinchas is rewarded for his zeal; a new census and inheritance rules follow.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 25:10 – 30:1"
      },
      "matot": {
        "name": "Matot",
        "summary": "Vows are regulated, the war with Midian is recounted and tribes request land east of the Jordan.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 30:2 – 32:42"
      },
      "masei": {
        "name": "Masei",
        "summary": "Israel’s journeys are reviewed and laws about the land and cities of refuge are established.",
        "bookSpanish": "Numbers",
        "reference": "Numbers 33:1 – 36:13"
      },
      "devarim": {
        "name": "Devarim",
        "summary": "Moses recalls Israel’s journey and challenges as he begins his final address.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 1:1 – 3:22"
      },
      "vaetchanan": {
        "name": "Vaetchanan",
        "summary": "Moses repeats the Ten Commandments and teaches the Shema and love of God.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 3:23 – 7:11"
      },
      "ekev": {
        "name": "Eikev",
        "summary": "Israel is urged to remember God, practice gratitude and keep the commandments.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 7:12 – 11:25"
      },
      "reeh": {
        "name": "Re’eh",
        "summary": "Moses presents blessing and curse, rules for worship, charity and the pilgrimage festivals.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 11:26 – 16:17"
      },
      "shoftim": {
        "name": "Shoftim",
        "summary": "Judges, kings and prophets must uphold justice; laws of warfare are taught.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 16:18 – 21:9"
      },
      "ki_titzei": {
        "name": "Ki Teitzei",
        "summary": "Numerous commandments govern family life, work, justice and responsibility.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 21:10 – 25:19"
      },
      "ki_tavo": {
        "name": "Ki Tavo",
        "summary": "First fruits, tithes and the blessings and warnings of the covenant are described.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 26:1 – 29:8"
      },
      "nitzavim": {
        "name": "Nitzavim",
        "summary": "Israel stands together to renew the covenant and choose life.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 29:9 – 30:20"
      },
      "vayelech": {
        "name": "Vayelech",
        "summary": "Moses appoints Joshua, writes the Torah and commands public reading at Hakhel.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 31:1 – 31:30"
      },
      "haazinu": {
        "name": "Haazinu",
        "summary": "Moses’ poetic song recalls the covenant, divine justice and Israel’s future.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 32:1 – 32:52"
      },
      "vezot_habracha": {
        "name": "Vezot Haberakhah",
        "summary": "Moses blesses the tribes, sees the Promised Land and dies; Joshua assumes leadership.",
        "bookSpanish": "Deuteronomy",
        "reference": "Deuteronomy 33:1 – 34:12"
      }
    }
  },
  "fr": {
    "currentWeeklyParasha": "Paracha de cette semaine",
    "combinedWeeklyReading": "Lecture hebdomadaire double",
    "combinedReadingHint": "Choisissez chaque paracha pour l’étudier.",
    "weeklyParashaUnavailable": "Impossible de confirmer la lecture hebdomadaire avec Hebcal. Vous pouvez choisir une paracha.",
    "aliyahName": "Aliya",
    "consultAliyot": "Interroger le rabbin sur les Aliyot",
    "rashiPrompt": "Souhaitez-vous approfondir le commentaire de Rachi ?",
    "consultRashi": "Interroger sur Rachi",
    "exploreWithRabbi": "Approfondir avec le rabbin",
    "books": {
      "Bereshit": "Genèse",
      "Shemot": "Exode",
      "Vayikra": "Lévitique",
      "Bamidbar": "Nombres",
      "Devarim": "Deutéronome"
    },
    "parashot": {
      "bereshit": {
        "name": "Bereshit",
        "summary": "Dieu crée le monde et l’humanité. Le jardin d’Éden, Caïn et Abel et les premières générations.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 1:1 – 6:8",
        "rashiInsight": "Rachi demande pourquoi la Torah commence par la Création plutôt que par le premier commandement donné à Israël (Exode 12:2). Il explique que Dieu a créé toute la terre et décide à qui la confier.",
        "chabadInsight": "La pensée Habad enseigne que la Création a un but : faire de ce monde matériel une demeure pour la Présence divine (dira batahtonim).",
        "halachaFocus": "La sainteté du Chabbat et le Kiddouch témoignent que Dieu a créé le monde.",
        "aliyot": {
          "1": {
            "description": "Les six jours de la Création et la sanctification du Chabbat."
          },
          "2": {
            "description": "La formation d’Adam à partir de la poussière et son installation dans le jardin d’Éden."
          },
          "3": {
            "description": "La création d’Ève, le serpent et le fruit défendu."
          },
          "4": {
            "description": "L’expulsion de l’Éden et l’histoire de Caïn et Abel."
          },
          "5": {
            "description": "Les descendants de Caïn et la naissance de Seth."
          },
          "6": {
            "description": "Les générations d’Adam jusqu’à Hénoch."
          },
          "7": {
            "description": "La naissance de Noé et le déclin moral précédant le Déluge."
          }
        },
        "jasidicLessons": {
          "1": {
            "title": "1. Commencer avec sagesse",
            "snippet": "Tout commencement porte une étincelle de l’intention du Créateur."
          },
          "2": {
            "title": "2. La lumière primordiale",
            "snippet": "La lumière cachée de la Création rayonne encore dans l’étude de la Torah."
          },
          "3": {
            "title": "3. Le souffle de vie",
            "snippet": "Le souffle divin relie l’âme à sa source."
          },
          "4": {
            "title": "4. Le défi des contraires",
            "snippet": "L’être humain est appelé à élever les contraires de la vie matérielle."
          },
          "5": {
            "title": "5. Le libre arbitre",
            "snippet": "L’avertissement à Caïn enseigne que nous pouvons dominer les impulsions destructrices."
          },
          "6": {
            "title": "6. Une conscience qui grandit",
            "snippet": "Les premières générations révèlent le potentiel spirituel de l’humanité."
          },
          "7": {
            "title": "7. Descendre pour s’élever",
            "snippet": "Un revers spirituel peut devenir un chemin de croissance."
          },
          "8": {
            "title": "8. L’étincelle cachée",
            "snippet": "Chaque objet matériel peut être élevé par un usage sacré."
          },
          "9": {
            "title": "9. La bénédiction du Chabbat",
            "snippet": "Le septième jour apporte sa bénédiction à toute la semaine."
          },
          "10": {
            "title": "10. Marcher avec Dieu",
            "snippet": "Hénoch illustre une dévotion constante dans la vie quotidienne."
          }
        }
      },
      "noaj": {
        "name": "Noaj",
        "summary": "Noé construit l’arche ; viennent ensuite le Déluge, l’alliance de l’arc-en-ciel et la tour de Babel.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 6:9 – 11:32"
      },
      "lej_leja": {
        "name": "Lej Lejá",
        "summary": "Dieu appelle Abraham à quitter son pays ; promesses de terre et de descendance, et alliance de la circoncision.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 12:1 – 17:27"
      },
      "vayeira": {
        "name": "Vayeirá",
        "summary": "Abraham accueille des visiteurs, intercède pour Sodome, célèbre la naissance d’Isaac et affronte la ligature d’Isaac.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 18:1 – 22:24"
      },
      "chayei_sarah": {
        "name": "Chayei Sará",
        "summary": "Sara meurt ; Abraham achète Makhpéla et Rébecca est choisie pour épouser Isaac.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 23:1 – 25:18"
      },
      "toldot": {
        "name": "Toldot",
        "summary": "Jacob et Ésaü naissent, le droit d’aînesse est vendu et Isaac donne ses bénédictions.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 25:19 – 28:9"
      },
      "vayetzei": {
        "name": "Vayetzei",
        "summary": "Jacob rêve d’une échelle, épouse Léa et Rachel, fonde sa famille et quitte Laban.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 28:10 – 32:3"
      },
      "vayishlach": {
        "name": "Vayishlach",
        "summary": "Jacob lutte avec un ange, reçoit le nom d’Israël et retrouve Ésaü.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 32:4 – 36:43"
      },
      "vayeshev": {
        "name": "Vayeshev",
        "summary": "Les rêves de Joseph provoquent ses frères ; il est vendu en Égypte, puis emprisonné.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 37:1 – 40:23"
      },
      "mikeitz": {
        "name": "Mikeitz",
        "summary": "Joseph interprète les rêves de Pharaon, devient dirigeant en Égypte et retrouve ses frères.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 41:1 – 44:17"
      },
      "vayigash": {
        "name": "Vayigash",
        "summary": "Juda plaide pour Benjamin ; Joseph se révèle et la famille de Jacob s’installe en Égypte.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 44:18 – 47:27"
      },
      "vayechi": {
        "name": "Vayeji",
        "summary": "Jacob bénit ses enfants avant sa mort ; Joseph pardonne à ses frères.",
        "bookSpanish": "Genèse",
        "reference": "Genèse 47:28 – 50:26"
      },
      "shemot": {
        "name": "Shemot",
        "summary": "Israël subit l’esclavage en Égypte ; Moïse naît, rencontre Dieu au buisson ardent et reçoit sa mission.",
        "bookSpanish": "Exode",
        "reference": "Exode 1:1 – 6:1"
      },
      "vaera": {
        "name": "Vaerá",
        "summary": "Dieu promet la délivrance ; Moïse affronte Pharaon et les premières plaies frappent l’Égypte.",
        "bookSpanish": "Exode",
        "reference": "Exode 6:2 – 9:35"
      },
      "bo": {
        "name": "Bo",
        "summary": "Les dernières plaies frappent l’Égypte ; le sacrifice pascal est prescrit et Israël sort de l’esclavage.",
        "bookSpanish": "Exode",
        "reference": "Exode 10:1 – 13:16"
      },
      "beshalach": {
        "name": "Beshalaj",
        "summary": "Israël traverse la mer, chante un cantique de louange et reçoit la manne dans le désert.",
        "bookSpanish": "Exode",
        "reference": "Exode 13:17 – 17:16"
      },
      "yitro": {
        "name": "Yitro",
        "summary": "Jéthro conseille Moïse ; au Sinaï, Israël reçoit les Dix Commandements.",
        "bookSpanish": "Exode",
        "reference": "Exode 18:1 – 20:23"
      },
      "mishpatim": {
        "name": "Mishpatim",
        "summary": "Des lois civiles guident la justice, la responsabilité et la compassion ; Israël renouvelle l’alliance.",
        "bookSpanish": "Exode",
        "reference": "Exode 21:1 – 24:18"
      },
      "terumah": {
        "name": "Terumá",
        "summary": "Israël reçoit l’ordre de construire le Tabernacle et son mobilier sacré.",
        "bookSpanish": "Exode",
        "reference": "Exode 25:1 – 27:19"
      },
      "tetzaveh": {
        "name": "Tetzavé",
        "summary": "Les vêtements sacerdotaux, la ménorah et la consécration des prêtres sont décrits.",
        "bookSpanish": "Exode",
        "reference": "Exode 27:20 – 30:10"
      },
      "ki_tisa": {
        "name": "Ki Tisá",
        "summary": "Le veau d’or menace l’alliance ; Moïse intercède et les tables sont renouvelées.",
        "bookSpanish": "Exode",
        "reference": "Exode 30:11 – 34:35"
      },
      "vayakhel": {
        "name": "Vayakhel",
        "summary": "Le peuple donne généreusement et les artisans commencent la construction du Tabernacle.",
        "bookSpanish": "Exode",
        "reference": "Exode 35:1 – 38:20"
      },
      "pekudei": {
        "name": "Pekudei",
        "summary": "Le Tabernacle achevé est dressé et la Présence divine le remplit.",
        "bookSpanish": "Exode",
        "reference": "Exode 38:21 – 40:38"
      },
      "vayikra": {
        "name": "Vayikra",
        "summary": "La Torah présente les offrandes et le service du sanctuaire.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 1:1 – 5:26"
      },
      "tzav": {
        "name": "Tzav",
        "summary": "Les tâches des prêtres, les offrandes et la consécration d’Aaron et de ses fils sont détaillées.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 6:1 – 8:36"
      },
      "shemini": {
        "name": "Sheminí",
        "summary": "Le service du sanctuaire débute ; Nadab et Abihou meurent et les lois alimentaires sont données.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 9:1 – 11:47"
      },
      "tazria": {
        "name": "Tazria",
        "summary": "Les lois de l’accouchement et de l’impureté rituelle, dont les affections cutanées, sont présentées.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 12:1 – 13:59"
      },
      "metzora": {
        "name": "Metzorá",
        "summary": "Les procédures de purification après les affections cutanées et d’autres impuretés sont expliquées.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 14:1 – 15:33"
      },
      "acharei_mot": {
        "name": "Ajarei Mot",
        "summary": "Le service de Yom Kippour et des lois de sainteté et de relations interdites sont enseignés.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 16:1 – 18:30"
      },
      "kedoshim": {
        "name": "Kedoshim",
        "summary": "Israël est appelé à la sainteté par l’éthique, la justice et l’amour du prochain.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 19:1 – 20:27"
      },
      "emor": {
        "name": "Emor",
        "summary": "Les lois des prêtres, les fêtes sacrées et le compte de l’Omer sont présentés.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 21:1 – 24:23"
      },
      "behar": {
        "name": "Behar",
        "summary": "Les années sabbatique et jubilaire enseignent le respect de la terre et la justice économique.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 25:1 – 26:2"
      },
      "behukotai": {
        "name": "Behukotai",
        "summary": "Bénédictions et avertissements encadrent l’alliance ; vœux et consécrations sont abordés.",
        "bookSpanish": "Lévitique",
        "reference": "Lévitique 26:3 – 27:34"
      },
      "bamidbar": {
        "name": "Bamidbar",
        "summary": "Israël est recensé et les tribus sont organisées autour du Tabernacle.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 1:1 – 4:20"
      },
      "naso": {
        "name": "Nasó",
        "summary": "Les devoirs des Lévites, le vœu du nazir et la bénédiction sacerdotale sont enseignés.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 4:21 – 7:89"
      },
      "behaalotecha": {
        "name": "Behaalotejá",
        "summary": "La ménorah est allumée ; Israël voyage dans le désert et affronte plaintes et épreuves.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 8:1 – 12:16"
      },
      "shelach": {
        "name": "Shelach Lejá",
        "summary": "Des explorateurs parcourent Canaan ; la peur entraîne quarante années au désert.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 13:1 – 15:41"
      },
      "korach": {
        "name": "Koraj",
        "summary": "Coré défie Moïse et Aaron ; le sens de la direction et du sacerdoce est réaffirmé.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 16:1 – 18:32"
      },
      "chukat": {
        "name": "Jukat",
        "summary": "La vache rousse, la mort de Myriam, les eaux de Mériba et la mort d’Aaron sont racontées.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 19:1 – 22:1"
      },
      "balak": {
        "name": "Balak",
        "summary": "Balak engage Balaam pour maudire Israël, mais les malédictions deviennent des bénédictions.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 22:2 – 25:9"
      },
      "pinchas": {
        "name": "Pinjas",
        "summary": "Pinhas est récompensé pour son zèle ; suivent un nouveau recensement et des lois d’héritage.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 25:10 – 30:1"
      },
      "matot": {
        "name": "Matot",
        "summary": "Les vœux sont réglementés, la guerre contre Madian est racontée et des tribus demandent des terres à l’est du Jourdain.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 30:2 – 32:42"
      },
      "masei": {
        "name": "Masé",
        "summary": "Les étapes d’Israël sont rappelées et des lois sur le territoire et les villes de refuge sont établies.",
        "bookSpanish": "Nombres",
        "reference": "Nombres 33:1 – 36:13"
      },
      "devarim": {
        "name": "Devarim",
        "summary": "Moïse rappelle le voyage et les épreuves d’Israël en commençant son discours final.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 1:1 – 3:22"
      },
      "vaetchanan": {
        "name": "Vaetjanán",
        "summary": "Moïse répète les Dix Commandements et enseigne le Chema et l’amour de Dieu.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 3:23 – 7:11"
      },
      "ekev": {
        "name": "Ekev",
        "summary": "Israël est exhorté à se souvenir de Dieu, à pratiquer la gratitude et à garder les commandements.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 7:12 – 11:25"
      },
      "reeh": {
        "name": "Reé",
        "summary": "Moïse présente bénédiction et malédiction, les règles du culte, de la charité et des fêtes de pèlerinage.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 11:26 – 16:17"
      },
      "shoftim": {
        "name": "Shoftim",
        "summary": "Juges, rois et prophètes doivent servir la justice ; les lois de la guerre sont enseignées.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 16:18 – 21:9"
      },
      "ki_titzei": {
        "name": "Ki Tetzei",
        "summary": "De nombreux commandements régissent la vie familiale, le travail, la justice et la responsabilité.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 21:10 – 25:19"
      },
      "ki_tavo": {
        "name": "Ki Tavó",
        "summary": "Les prémices, les dîmes et les bénédictions et avertissements de l’alliance sont décrits.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 26:1 – 29:8"
      },
      "nitzavim": {
        "name": "Nitzavim",
        "summary": "Israël se tient uni pour renouveler l’alliance et choisir la vie.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 29:9 – 30:20"
      },
      "vayelech": {
        "name": "Vayelech",
        "summary": "Moïse désigne Josué, écrit la Torah et ordonne sa lecture publique lors du Hakhel.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 31:1 – 31:30"
      },
      "haazinu": {
        "name": "Haazinu",
        "summary": "Le cantique poétique de Moïse rappelle l’alliance, la justice divine et l’avenir d’Israël.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 32:1 – 32:52"
      },
      "vezot_habracha": {
        "name": "Vezot HaBerachá",
        "summary": "Moïse bénit les tribus, contemple la Terre promise et meurt ; Josué prend la direction du peuple.",
        "bookSpanish": "Deutéronome",
        "reference": "Deutéronome 33:1 – 34:12"
      }
    }
  },
  "pt": {
    "currentWeeklyParasha": "Porção da Torá desta semana",
    "combinedWeeklyReading": "Leitura semanal combinada",
    "combinedReadingHint": "Selecione cada porção para estudá-la.",
    "weeklyParashaUnavailable": "Não foi possível confirmar a leitura semanal pelo Hebcal. Você pode escolher uma parashá.",
    "aliyahName": "Aliá",
    "consultAliyot": "Consultar o rabino sobre as Aliyot",
    "rashiPrompt": "Quer aprofundar o comentário de Rashi?",
    "consultRashi": "Consultar sobre Rashi",
    "exploreWithRabbi": "Aprofundar com o rabino",
    "books": {
      "Bereshit": "Gênesis",
      "Shemot": "Êxodo",
      "Vayikra": "Levítico",
      "Bamidbar": "Números",
      "Devarim": "Deuteronômio"
    },
    "parashot": {
      "bereshit": {
        "name": "Bereshit",
        "summary": "Deus cria o mundo e a humanidade. O jardim do Éden, Caim e Abel e as primeiras gerações.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 1:1 – 6:8",
        "rashiInsight": "Rashi pergunta por que a Torá começa com a Criação, e não com o primeiro mandamento dado a Israel (Êxodo 12:2). Ele explica que Deus criou toda a terra e decide a quem confiá-la.",
        "chabadInsight": "A tradição Chabad ensina que a Criação tem um propósito: fazer deste mundo material uma morada para a Presença Divina (dirá betachtonim).",
        "halachaFocus": "A santidade do Shabat e o Kidush testemunham que Deus criou o mundo.",
        "aliyot": {
          "1": {
            "description": "Os seis dias da Criação e a santificação do Shabat."
          },
          "2": {
            "description": "A formação de Adão a partir do pó e sua colocação no jardim do Éden."
          },
          "3": {
            "description": "A criação de Eva, a serpente e o fruto proibido."
          },
          "4": {
            "description": "A expulsão do Éden e a história de Caim e Abel."
          },
          "5": {
            "description": "Os descendentes de Caim e o nascimento de Sete."
          },
          "6": {
            "description": "As gerações de Adão até Enoque."
          },
          "7": {
            "description": "O nascimento de Noé e o declínio moral antes do Dilúvio."
          }
        },
        "jasidicLessons": {
          "1": {
            "title": "1. O começo com sabedoria",
            "snippet": "Cada novo começo contém uma centelha da intenção do Criador."
          },
          "2": {
            "title": "2. A luz primordial",
            "snippet": "A luz oculta da Criação continua brilhando no estudo da Torá."
          },
          "3": {
            "title": "3. O sopro de vida",
            "snippet": "O sopro divino liga a alma à sua origem."
          },
          "4": {
            "title": "4. O desafio dos opostos",
            "snippet": "O ser humano é chamado a elevar os opostos da vida material."
          },
          "5": {
            "title": "5. O livre-arbítrio",
            "snippet": "O aviso a Caim ensina que podemos vencer impulsos destrutivos."
          },
          "6": {
            "title": "6. Consciência em crescimento",
            "snippet": "As primeiras gerações revelam o potencial espiritual da humanidade."
          },
          "7": {
            "title": "7. Descer para subir",
            "snippet": "Uma queda espiritual pode se tornar caminho de crescimento."
          },
          "8": {
            "title": "8. A centelha oculta",
            "snippet": "Cada objeto material pode ser elevado por um propósito sagrado."
          },
          "9": {
            "title": "9. A bênção do Shabat",
            "snippet": "O sétimo dia traz bênçãos ao ritmo da semana."
          },
          "10": {
            "title": "10. Caminhar com Deus",
            "snippet": "Enoque exemplifica uma devoção constante na vida cotidiana."
          }
        }
      },
      "noaj": {
        "name": "Noaj",
        "summary": "Noé constrói a arca; seguem-se o Dilúvio, a aliança do arco-íris e a Torre de Babel.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 6:9 – 11:32"
      },
      "lej_leja": {
        "name": "Lej Lejá",
        "summary": "Deus chama Abraão a deixar sua terra; promessas de terra e descendência e a aliança da circuncisão.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 12:1 – 17:27"
      },
      "vayeira": {
        "name": "Vayeirá",
        "summary": "Abraão acolhe visitantes, intercede por Sodoma, celebra o nascimento de Isaac e enfrenta a ligação de Isaac.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 18:1 – 22:24"
      },
      "chayei_sarah": {
        "name": "Chayei Sará",
        "summary": "Sara falece; Abraão compra Macpela, e Rebeca é escolhida como esposa de Isaac.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 23:1 – 25:18"
      },
      "toldot": {
        "name": "Toldot",
        "summary": "Jacó e Esaú nascem, a primogenitura é vendida e Isaac concede suas bênçãos.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 25:19 – 28:9"
      },
      "vayetzei": {
        "name": "Vayetzei",
        "summary": "Jacó sonha com uma escada, casa-se com Lia e Raquel, forma sua família e deixa Labão.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 28:10 – 32:3"
      },
      "vayishlach": {
        "name": "Vayishlach",
        "summary": "Jacó luta com um anjo, recebe o nome Israel e reencontra Esaú.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 32:4 – 36:43"
      },
      "vayeshev": {
        "name": "Vayeshev",
        "summary": "Os sonhos de José provocam seus irmãos; ele é vendido ao Egito e depois preso.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 37:1 – 40:23"
      },
      "mikeitz": {
        "name": "Mikeitz",
        "summary": "José interpreta os sonhos do faraó, torna-se governante no Egito e encontra seus irmãos.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 41:1 – 44:17"
      },
      "vayigash": {
        "name": "Vayigash",
        "summary": "Judá intercede por Benjamim; José revela sua identidade e a família de Jacó vai ao Egito.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 44:18 – 47:27"
      },
      "vayechi": {
        "name": "Vayeji",
        "summary": "Jacó abençoa seus filhos antes de morrer; José perdoa seus irmãos.",
        "bookSpanish": "Gênesis",
        "reference": "Gênesis 47:28 – 50:26"
      },
      "shemot": {
        "name": "Shemot",
        "summary": "Israel sofre a escravidão no Egito; Moisés nasce, encontra Deus na sarça ardente e recebe sua missão.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 1:1 – 6:1"
      },
      "vaera": {
        "name": "Vaerá",
        "summary": "Deus promete a redenção; Moisés enfrenta o faraó e as primeiras pragas atingem o Egito.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 6:2 – 9:35"
      },
      "bo": {
        "name": "Bo",
        "summary": "As últimas pragas atingem o Egito; é ordenado o sacrifício pascal e Israel sai da escravidão.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 10:1 – 13:16"
      },
      "beshalach": {
        "name": "Beshalaj",
        "summary": "Israel atravessa o mar, canta um cântico de louvor e recebe o maná no deserto.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 13:17 – 17:16"
      },
      "yitro": {
        "name": "Yitro",
        "summary": "Jetro aconselha Moisés; no Sinai, Israel recebe os Dez Mandamentos.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 18:1 – 20:23"
      },
      "mishpatim": {
        "name": "Mishpatim",
        "summary": "Leis civis orientam a justiça, a responsabilidade e a compaixão; Israel renova a aliança.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 21:1 – 24:18"
      },
      "terumah": {
        "name": "Terumá",
        "summary": "Israel recebe a ordem de construir o Tabernáculo e seus utensílios sagrados.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 25:1 – 27:19"
      },
      "tetzaveh": {
        "name": "Tetzavé",
        "summary": "São descritas as vestes sacerdotais, a menorá e a consagração dos sacerdotes.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 27:20 – 30:10"
      },
      "ki_tisa": {
        "name": "Ki Tisá",
        "summary": "O bezerro de ouro ameaça a aliança; Moisés intercede e as tábuas são renovadas.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 30:11 – 34:35"
      },
      "vayakhel": {
        "name": "Vayakhel",
        "summary": "O povo contribui generosamente e os artesãos começam a construir o Tabernáculo.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 35:1 – 38:20"
      },
      "pekudei": {
        "name": "Pekudei",
        "summary": "O Tabernáculo é concluído e a Presença Divina o preenche.",
        "bookSpanish": "Êxodo",
        "reference": "Êxodo 38:21 – 40:38"
      },
      "vayikra": {
        "name": "Vayikra",
        "summary": "A Torá apresenta as oferendas e o serviço do santuário.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 1:1 – 5:26"
      },
      "tzav": {
        "name": "Tzav",
        "summary": "São detalhados os deveres dos sacerdotes, as oferendas e a consagração de Aarão e seus filhos.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 6:1 – 8:36"
      },
      "shemini": {
        "name": "Sheminí",
        "summary": "Começa o serviço do santuário; Nadabe e Abiú morrem e são dadas as leis alimentares.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 9:1 – 11:47"
      },
      "tazria": {
        "name": "Tazria",
        "summary": "São apresentadas as leis do parto e da impureza ritual, incluindo afecções da pele.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 12:1 – 13:59"
      },
      "metzora": {
        "name": "Metzorá",
        "summary": "São explicados os rituais de purificação após afecções da pele e outras impurezas.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 14:1 – 15:33"
      },
      "acharei_mot": {
        "name": "Ajarei Mot",
        "summary": "São ensinados o serviço de Yom Kippur e as leis de santidade e relações proibidas.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 16:1 – 18:30"
      },
      "kedoshim": {
        "name": "Kedoshim",
        "summary": "Israel é chamado à santidade por meio da ética, da justiça e do amor ao próximo.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 19:1 – 20:27"
      },
      "emor": {
        "name": "Emor",
        "summary": "São apresentadas as leis dos sacerdotes, as festas sagradas e a contagem do Ômer.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 21:1 – 24:23"
      },
      "behar": {
        "name": "Behar",
        "summary": "Os anos sabático e do jubileu ensinam o cuidado com a terra e a justiça econômica.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 25:1 – 26:2"
      },
      "behukotai": {
        "name": "Behukotai",
        "summary": "Bênçãos e advertências marcam a aliança; votos e consagrações são abordados.",
        "bookSpanish": "Levítico",
        "reference": "Levítico 26:3 – 27:34"
      },
      "bamidbar": {
        "name": "Bamidbar",
        "summary": "Israel é recenseado e as tribos são organizadas ao redor do Tabernáculo.",
        "bookSpanish": "Números",
        "reference": "Números 1:1 – 4:20"
      },
      "naso": {
        "name": "Nasó",
        "summary": "São ensinados os deveres dos levitas, o voto de nazireu e a bênção sacerdotal.",
        "bookSpanish": "Números",
        "reference": "Números 4:21 – 7:89"
      },
      "behaalotecha": {
        "name": "Behaalotejá",
        "summary": "A menorá é acesa; Israel viaja pelo deserto e enfrenta queixas e desafios.",
        "bookSpanish": "Números",
        "reference": "Números 8:1 – 12:16"
      },
      "shelach": {
        "name": "Shelach Lejá",
        "summary": "Espiões exploram Canaã; o medo leva ao decreto de quarenta anos no deserto.",
        "bookSpanish": "Números",
        "reference": "Números 13:1 – 15:41"
      },
      "korach": {
        "name": "Koraj",
        "summary": "Corá desafia Moisés e Aarão; reafirma-se o sentido da liderança e do sacerdócio.",
        "bookSpanish": "Números",
        "reference": "Números 16:1 – 18:32"
      },
      "chukat": {
        "name": "Jukat",
        "summary": "São narradas a novilha vermelha, a morte de Miriam, as águas de Meribá e a morte de Aarão.",
        "bookSpanish": "Números",
        "reference": "Números 19:1 – 22:1"
      },
      "balak": {
        "name": "Balak",
        "summary": "Balac contrata Balaão para amaldiçoar Israel, mas as maldições se tornam bênçãos.",
        "bookSpanish": "Números",
        "reference": "Números 22:2 – 25:9"
      },
      "pinchas": {
        "name": "Pinjas",
        "summary": "Pinchas é recompensado por seu zelo; seguem-se um novo censo e leis de herança.",
        "bookSpanish": "Números",
        "reference": "Números 25:10 – 30:1"
      },
      "matot": {
        "name": "Matot",
        "summary": "Os votos são regulamentados, relata-se a guerra com Midiã e tribos pedem terras a leste do Jordão.",
        "bookSpanish": "Números",
        "reference": "Números 30:2 – 32:42"
      },
      "masei": {
        "name": "Masé",
        "summary": "As jornadas de Israel são relembradas e são estabelecidas leis sobre a terra e as cidades de refúgio.",
        "bookSpanish": "Números",
        "reference": "Números 33:1 – 36:13"
      },
      "devarim": {
        "name": "Devarim",
        "summary": "Moisés recorda a jornada e os desafios de Israel ao iniciar seu discurso final.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 1:1 – 3:22"
      },
      "vaetchanan": {
        "name": "Vaetjanán",
        "summary": "Moisés repete os Dez Mandamentos e ensina o Shemá e o amor a Deus.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 3:23 – 7:11"
      },
      "ekev": {
        "name": "Ekev",
        "summary": "Israel é exortado a lembrar-se de Deus, agradecer e guardar os mandamentos.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 7:12 – 11:25"
      },
      "reeh": {
        "name": "Reé",
        "summary": "Moisés apresenta bênção e maldição, regras de culto, caridade e festas de peregrinação.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 11:26 – 16:17"
      },
      "shoftim": {
        "name": "Shoftim",
        "summary": "Juízes, reis e profetas devem defender a justiça; são ensinadas as leis da guerra.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 16:18 – 21:9"
      },
      "ki_titzei": {
        "name": "Ki Tetzei",
        "summary": "Diversos mandamentos regem a vida familiar, o trabalho, a justiça e a responsabilidade.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 21:10 – 25:19"
      },
      "ki_tavo": {
        "name": "Ki Tavó",
        "summary": "São descritos os primeiros frutos, os dízimos e as bênçãos e advertências da aliança.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 26:1 – 29:8"
      },
      "nitzavim": {
        "name": "Nitzavim",
        "summary": "Israel permanece unido para renovar a aliança e escolher a vida.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 29:9 – 30:20"
      },
      "vayelech": {
        "name": "Vayelech",
        "summary": "Moisés nomeia Josué, escreve a Torá e ordena a leitura pública no Hakhel.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 31:1 – 31:30"
      },
      "haazinu": {
        "name": "Haazinu",
        "summary": "O cântico poético de Moisés recorda a aliança, a justiça divina e o futuro de Israel.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 32:1 – 32:52"
      },
      "vezot_habracha": {
        "name": "Vezot HaBerachá",
        "summary": "Moisés abençoa as tribos, contempla a Terra Prometida e morre; Josué assume a liderança.",
        "bookSpanish": "Deuteronômio",
        "reference": "Deuteronômio 33:1 – 34:12"
      }
    }
  }
} as const;
