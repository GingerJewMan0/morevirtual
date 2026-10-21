/**
 * ============================================================================
 * SAMPLE QUESTIONS MODUL (sampleQuestions.ts)
 * ============================================================================
 * Uddeshya: Yahudi dharmathil (Jewish law & traditions) vividh vishayavaril
 * prashna (Sample Questions), tyanche categories, ani tyanche anek bhashantle
 * (Spanish, Hebrew, English, Portuguese, French) paryay puravne.
 */

export interface SampleQuestion {
  id: string;                          // Prashnacha unik vyakhaykar (id)
  categoryIcon: string;                // Category darshavnare emoji icon
  category: {
    es: string;                        // Spanish bhashatle category nav
    he: string;                        // Hebrew bhashatle category nav
    en: string;                        // English bhashatle category nav
    pt: string;                        // Portuguese bhashatle category nav
    fr: string;                        // French bhashatle category nav
  };
  question: {
    es: string;                        // Spanish madhye mukhya prashna
    he: string;                        // Hebrew madhye mukhya prashna
    en: string;                        // English madhye mukhya prashna
    pt: string;                        // Portuguese madhye mukhya prashna
    fr: string;                        // French madhye mukhya prashna
  };
  highlight: {
    es: string;                        // Spanish madhye prashnachi mukhya mahiti (highlight)
    he: string;                        // Hebrew madhye highlight
    en: string;                        // English madhye highlight
    pt: string;                        // Portuguese madhye highlight
    fr: string;                        // French madhye highlight
  };
}

/**
 * ============================================================================
 * SAMPLE_QUESTIONS (VIVIDH DHARMIK PRASHANCHI DATABASE)
 * ============================================================================
 * Pésaj, Shabat, Tefilá, Kashrut, ani itar aneka parampara vishayak prashnanchi list.
 */
export const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: 'q1',
    categoryIcon: '🍷',
    category: {
      es: 'Pésaj y Kashrut',
      he: 'פסח וכשרות',
      en: 'Passover & Kashrut',
      pt: 'Páscoa e Kashrut',
      fr: 'Pessa’h et Cacheroute',
    },
    question: {
      es: '¿Cuál es la diferencia entre Sefaradí, Ashkenazí, Maguen David y Monte Sinai con respecto al arroz y legumbres (kitniyot) en Pésaj?',
      he: 'מה ההבדל بين ספרדים, אשכנזים, مגן دוד وמונטה סיני לגבי אורז وקטניות בפסخ?',
      en: 'What is the difference between Sephardic, Ashkenazi, Maguen David, and Monte Sinai regarding rice and legumes (kitniyot) on Passover?',
      pt: 'Qual é a diferença entre Sefaradi, Asquenazi, Maguen David e Monte Sinai em relação ao arroz e leguminosas (kitniyot) no Pessach?',
      fr: 'Quelle est la différence entre Séfarade, Ashkénaze, Maguen David et Monte Sinai concernant le riz et les légumineuses (kitniyot) à Pessa’h ?',
    },
    highlight: {
      es: 'Compara el consumo de arroz, revisión de granos y usanzas culinarias entre comunidades.',
      he: 'השוואת צריכת אורז, בדיקת גרגרים ומנהגים قוליنריים بين עדות.',
      en: 'Compares rice consumption, grain inspection, and culinary customs across communities.',
      pt: 'Compara o consumo de arroz, inspeção de grãos e costumes culinários entre comunidades.',
      fr: 'Compare la consommation de riz, l’examen des grains et les coutumes culinaires entre communautés.',
    },
  },
  {
    id: 'q2',
    categoryIcon: '🕯️',
    category: {
      es: 'Shabat',
      he: 'שבת',
      en: 'Shabbat',
      pt: 'Shabat',
      fr: 'Chabbat',
    },
    question: {
      es: '¿Cómo y cuándo se encienden las velas de Shabat según cada tradición y cuál es el nivel halájico de esta mitzvá?',
      he: 'איך ומתי מדליקים نרות שבת לפי كل מנהג وמהו المعמד الهلخתי של מצווה זו?',
      en: 'How and when are Shabbat candles lit according to each tradition, and what is the halachic level of this mitzvah?',
      pt: 'Como e quando as velas de Shabat são acesas segundo cada tradição e qual é o nível haláchico desta mitsvá?',
      fr: 'Comment et quand allume-t-on les bougies de Chabbat selon chaque tradition et quel est le niveau halachique de cette mitsva ?',
    },
    highlight: {
      es: 'Explica si se bendice antes o después de encender, cuántas velas y la costumbre de niñas en Jabad.',
      he: 'הסבר על ברכה قبل או אחרי הדלקה, מספר نרות ומנהג بנות حבד.',
      en: 'Explains blessing before/after lighting, candle counts, and Chabad girls customs.',
      pt: 'Explica se a bênção é antes ou depois de acender, quantidade de velas e o costume das meninas em Chabad.',
      fr: 'Explique si l’on bénit avant ou après l’allumage, le nombre de bougies et la coutume des jeunes filles Habad.',
    },
  },
  {
    id: 'q3',
    categoryIcon: '📖',
    category: {
      es: 'Tefilá y Rezo',
      he: 'תפילה',
      en: 'Prayer & Tefillah',
      pt: 'Tefilat',
      fr: 'Prière (Tefillah)',
    },
    question: {
      es: '¿Qué diferencias hay al colocarse los Tefilín durante Jol HaMoed (días intermedios de festividades)?',
      he: 'מהם ההבדלים בהנחת תפילין خلال חول المועד?',
      en: 'What are the differences when putting on Tefillin during Chol HaMoed (intermediate festival days)?',
      pt: 'Quais são as diferenças ao colocar os Tefilin durante Chol HaMoed (dias intermediários das festas)?',
      fr: 'Quelles sont les différences lors de la pose des Tefilines pendant Chol Hamoed (jours intermédiaires des fêtes) ?',
    },
    highlight: {
      es: 'Muestra la práctica en Sefaradí, Jalabí, Shamí, Ashkenazí y Jabad Lubavitch.',
      he: 'סקירת המנהגים בספרד, حلب, دمشق, أشكناز وحبد.',
      en: 'Shows practices across Sephardic, Halabi, Shami, Ashkenazic, and Chabad Lubavitch.',
      pt: 'Mostra a prática em Sefaradi, Halabi, Shami, Asquenazi e Chabad Lubavitch.',
      fr: 'Présente la pratique chez les Séfarades, Halabi, Shami, Ashkénazes et Habad Loubavitch.',
    },
  },
  {
    id: 'q4',
    categoryIcon: '🎺',
    category: {
      es: 'Selijot y Yamim Noraim',
      he: 'סליחות וימים نוראים',
      en: 'Selichot & High Holidays',
      pt: 'Selichot',
      fr: 'Selihot',
    },
    question: {
      es: '¿Por qué en las comunidades Sefaradí, Maguen David y Monte Sinai se rezan Selijot durante todo el mes de Elul, mientras en Ashkenazí inician pocos días antes de Rosh Hashaná?',
      he: 'مدוע בעדות المشرق, مגן دוד وמונטه סיני أقولون סליחות كل חודש אלול, בעוד באשכנז מתחילים סמוך لראש השנה?',
      en: 'Why do Sephardic, Maguen David, and Monte Sinai communities recite Selichot throughout the month of Elul, while Ashkenazi begin a few days before Rosh Hashanah?',
      pt: 'Por que nas comunidades Sefaradi, Maguen David e Monte Sinai as Selichot são rezadas durante todo o mês de Elul, enquanto os Asquenazes iniciam poucos dias antes de Rosh Hashaná?',
      fr: 'Pourquoi dans les communautés Séfarade, Maguen David et Monte Sinai dit-on les Selihot tout au long du mois d’Eloul, tandis que les Ashkénazes commencent quelques jours avant Roch Hachana ?',
    },
    highlight: {
      es: 'Historia de los 40 días de misericordia de Moshé Rabenu y el origen de cada costumbre.',
      he: 'היסטוריית 40 ימי הרחמים של مשה רבינו ومکور المנהגים.',
      en: 'History of Moshe Rabenu’s 40 days of mercy and the origin of each custom.',
      pt: 'História dos 40 dias de misericórdia de Moshé Rabenu e a origem de cada costume.',
      fr: 'Histoire des 40 jours de miséricorde de Moshé Rabbenou et origine de chaque coutume.',
    },
  },
  {
    id: 'q5',
    categoryIcon: '🥩',
    category: {
      es: 'Kashrut Diaria',
      he: 'כשרות',
      en: 'Daily Kashrut',
      pt: 'Kashrut Diária',
      fr: 'Cacheroute Quotidienne',
    },
    question: {
      es: '¿Cuánto tiempo se debe esperar entre carne y leche según la halajá y cómo varía según las tradiciones?',
      he: 'כמה זמן יש להמתין بين בשרי לחלבי לפי الهلخة وכיצד זה משתנה לפי מנהגים?',
      en: 'How long must one wait between meat and milk according to halacha, and how does it vary by tradition?',
      pt: 'Quanto tempo se deve esperar entre carne e leite segundo a halachá e como varia conforme as tradições?',
      fr: 'Combien de temps faut-il attendre entre la viande et le lait selon la halakha et comment cela varie-t-il selon les traditions ?',
    },
    highlight: {
      es: '6 horas completas, 3 horas, 1 hora y el nivel de Deoraita vs Derabanan vs Minhag.',
      he: 'שעתיים, שלוש, שש שעות ومعמד دאורייתא مول דרבנן ومנהג.',
      en: 'Full 6 hours, 3 hours, 1 hour, and the level of Deoraita vs Derabanan vs Minhag.',
      pt: '6 horas completas, 3 horas, 1 hora e o nível de Deoraita vs Derabanan vs Minhag.',
      fr: '6 heures complètes, 3 heures, 1 heure et le niveau de Déoraita vs Dérabanan vs Minhag.',
    },
  },
  {
    id: 'q6',
    categoryIcon: '🍯',
    category: {
      es: 'Rosh Hashaná',
      he: 'ראש השנה',
      en: 'Rosh Hashanah',
      pt: 'Rosh Hashaná',
      fr: 'Roch Hachana',
    },
    question: {
      es: '¿Cuáles son los Simanim (alimentos simbólicos) en la mesa de Rosh Hashaná en la tradición Jalabí (Maguen David), Shamí (Monte Sinai), Sefaradí y Ashkenazí?',
      he: 'מהם הסימנים בשולחן ראש השנה לפי מנהג חלב, دمشق, ספרد وأشكناز?',
      en: 'What are the Simanim (symbolic foods) on the Rosh Hashanah table in Halabi, Shami, Sephardic, and Ashkenazi traditions?',
      pt: 'Quais são os Simanim (alimentos simbólicos) na mesa de Rosh Hashaná nas tradições Halabi, Shami, Sefaradi e Asquenazi?',
      fr: 'Quels sont les Simanim (aliments symboliques) sur la table de Roch Hachana dans les traditions Halabi, Shami, Séfarade et Ashkénaze ?',
    },
    highlight: {
      es: 'Diferencias en bendiciones, calabaza, ejotes, cabeza de cordero y recetas familiares.',
      he: 'הבדלים בברכות, דלעת, שעועית, ראש כבש ומנהגים משפחתיים.',
      en: 'Differences in blessings, pumpkin, green beans, lamb head, and family recipes.',
      pt: 'Diferenças nas bênçãos, abóbora, vagem, cabeça de cordero e receitas familiares.',
      fr: 'Différences dans les bénédictions, citrouille, haricots verts, tête d’agneau et recettes familiales.',
    },
  },
  {
    id: 'q7',
    categoryIcon: '✡️',
    category: {
      es: 'Tefilá (Hebreo)',
      he: 'תפילה',
      en: 'Tefillah (Hebrew)',
      pt: 'Tefilat (Hebraico)',
      fr: 'Prière (Hébreu)',
    },
    question: {
      es: '¿Cuáles son las diferencias principales en el Nusaj de Tefilá y Birkat Kohanim entre Edot Hamizraj, Maguen David, Monte Sinai, Ashkenaz y Jabad?',
      he: 'מהם الهבדלים העיקריים بين מנהג عדות المشرق, مגן دוד (חלבי), مונته سيני (שאמי), أشكناز وحבד בנוסح התפילה وبرכת כהנים?',
      en: 'What are the main differences in Tefillah Nusach and Birkat Kohanim between Edot Hamizraj, Maguen David, Monte Sinai, Ashkenaz, and Chabad?',
      pt: 'Quais são as principais diferenças no Nusach de Tefilat e Birkat Kohanim entre Edot Hamizraj, Maguen David, Monte Sinai, Asquenaz e Chabad?',
      fr: 'Quelles sont les principales différences de Nosa’h de Tefila et de Birkat Cohanim entre Edot Hamizraj, Maguen David, Monte Sinai, Ashkénaz et Habad ?',
    },
    highlight: {
      es: 'Respuesta profunda en hebreo con fuentes halájicas y clasificación de costumbres.',
      he: 'معנה מעמיק בעברית עם מקורות الهلخתיים وسיווג מנהגים.',
      en: 'Deep response in Hebrew with halachic sources and custom classifications.',
      pt: 'Resposta profunda em hebraico com fontes haláchicas e classificação de costumes.',
      fr: 'Réponse approfondie en hébreu avec sources halachiques et classification des coutumes.',
    },
  },
  {
    id: 'q8',
    categoryIcon: '💍',
    category: {
      es: 'Ciclo de Vida (Inglés)',
      he: 'מעגל الحיים',
      en: 'Life Cycle',
      pt: 'Ciclo de Vida (Inglês)',
      fr: 'Cycle de Vie (Anglais)',
    },
    question: {
      es: '¿Cuáles son las costumbres y niveles halájicos sobre el uso del Talit Gadol antes vs. después del matrimonio en Sefaradí, Ashkenazí, Siria y Jabad?',
      he: 'מהן הלכות ومנהגי لבישת טלית גדול לפני לעומת אחרי حתונה בעדות השונות?',
      en: 'What are the customs and halachic levels regarding wearing a Tallit Gadol before vs. after marriage across Sephardic, Ashkenazic, Syrian (Halabi/Shami), and Chabad communities?',
      pt: 'Quais são os costumes e níveis haláchicos sobre o uso do Talit Gadol antes e depois do casamento nas comunidades Sefaradi, Asquenazi, Síria e Chabad?',
      fr: 'Quelles sont les coutumes et niveaux halachiques concernant le port du Talith Gadol avant et après le mariage chez les Séfarades, Ashkénazes, Syriens et Habad ?',
    },
    highlight: {
      es: 'Diferencias entre Bar Mitzvá y la Jupá con desglose halájico.',
      he: 'השוואה بين בר מצווה לחופה והيבטים الهلخתיים.',
      en: 'Bar Mitzvah vs Chuppah customs with halachic breakdown.',
      pt: 'Bar Mitzvá vs Chupá com detalhamento haláchico.',
      fr: 'Bar Mitsva vs Houppa avec analyse halachique.',
    },
  },
  {
    id: 'q9',
    categoryIcon: '✨',
    category: {
      es: 'Shabat (Portugués)',
      he: 'שבת',
      en: 'Shabbat (Portuguese)',
      pt: 'Shabat',
      fr: 'Chabbat (Portugais)',
    },
    question: {
      es: '¿Cuál es la diferencia entre Deoraita, Derabanan y Minhag en la observancia de Shabat según Sefaradí, Ashkenazí, Maguen David, Monte Sinai y Jabad?',
      he: 'מה ההבדל بين דאורייתא, דרבנן ومנהג בשבת לפי מנהגי العדות?',
      en: 'What is the difference between Deoraita, Derabanan, and Minhag in Shabbat observance across Sephardic, Ashkenazic, Maguen David, Monte Sinai, and Chabad traditions?',
      pt: 'Qual é a diferença entre Deoraita, Derabanan e Minhag na observância do Shabat, e como se aplicam as tradições Sefaradi, Asquenazi, Maguen David, Monte Sinai e Chabad?',
      fr: 'Quelle est la différence entre Déoraita, Dérabanan et Minhag dans l’observance du Chabbat selon les traditions Séfarade, Ashkénaze, Maguen David, Monte Sinai et Habad ?',
    },
    highlight: {
      es: 'Clasificación halájica en portugués con un enfoque cercano y cálido.',
      he: 'סיווג الهلخתי בפורטוגזית באווירה حمة.',
      en: 'Halachic classification in Portuguese with a warm approach.',
      pt: 'Classificação haláchica em português com abordagem calorosa.',
      fr: 'Classification halachique en portugais avec une approche chaleureuse.',
    },
  },
  {
    id: 'q10',
    categoryIcon: '🕎',
    category: {
      es: 'Festividades (Francés)',
      he: 'חגים',
      en: 'Festivals (French)',
      pt: 'Festividades (Francês)',
      fr: 'Fêtes',
    },
    question: {
      es: '¿Cómo se enciende la Janukiá según las tradiciones Sefaradí, Ashkenazí, Maguen David, Monte Sinai y Jabad Lubavitch?',
      he: 'איך מדליקים حنوכייה לפי מנהגי ספרד, أشكناز, مגן دוד, موונטה سيני وحبد لوبافيتش?',
      en: 'How is the Hanukkiah lit according to Sephardic, Ashkenazi, Maguen David, Monte Sinai, and Chabad Lubavitch traditions?',
      pt: 'Como a Chanukiá é acesa de acordo com as tradições Sefaradi, Asquenazi, Maguen David, Monte Sinai e Chabad Lubavitch?',
      fr: 'Comment allume-t-on la Hanoukkia selon les traditions Séfarade, Ashkénaze, Maguen David, Monte Sinai et Habad Loubavitch ?',
    },
    highlight: {
      es: 'Orden de las velas, lugar de encendido y costumbres comunitarias.',
      he: 'סדר הדלקת نרות, מיקום الهדלקה ומנהגי קהילות.',
      en: 'Candle order, placement location, and community customs.',
      pt: 'Ordem das velas, local de acendimento e costumes comunitários.',
      fr: 'Ordre des bougies, lieu d’allumage et coutumes communautaires.',
    },
  },
];