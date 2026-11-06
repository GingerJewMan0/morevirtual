import { BerajotDayStructure } from '../../types';

export const sefaradiSidur: BerajotDayStructure & { 'berajot-ajronot': BerajotDayStructure['alimentos'] } = {
  despertar: [
    {
      id: 'mode-ani',
      titleHebrew: 'מודה אני',
      titleSpanish: 'Modé Aní (Al Despertar)',
      title: {
      es: 'Modé Aní (Al Despertar)',
      en: 'Modeh Ani (Upon Waking)',
      fr: 'Modé Ani (Au Réveil)',
      pt: 'Modé Ani (Ao Acordar)'
    },
      hebrew: 'מוֹדֶה (נָשִׁים: מוֹדָה) אֲנִי לְפָנֶיךָ מֶלֶךְ חַי וְקַיָּם, שֶׁהֶחֱזַרְתָּ בִּי נִשְׁמָתִי בְּחֶמְלָה, רַבָּה אֱמוּנָתֶךָ.',
      phonetic: 'Modé aní (mujeres: Modá aní) lefanéja mélej jai vekayam, shehejezarta bi nishmatí bejemlá, rabá emunateja.',
      translation: {
        es: 'Te doy gracias (mujeres: Modá aní), oh Eterno Rey viviente y eterno, porque me has devuelto mi alma con misericordia; grande es Tu fidelidad.',
        en: 'I offer thanks before You, living and eternal King, for You have mercifully restored my soul within me; Your faithfulness is great.',
        fr: 'Je Te rends grâce, Roi vivant et éternel, de m\'avoir restitué mon âme avec compassion ; grande est Ta fidélité.',
        pt: 'Dou-Te graças, Rei vivo e eterno, porque restituíste a minha alma com misericórdia; grande é a Tua fidelidade.'
      }
    },
    {
      id: 'netilat-yadaim',
      titleHebrew: 'נטילת ידיים',
      titleSpanish: 'Netilat Yadaim',
      title: {
      es: 'Netilat Yadaim (Ablución de Manos)',
      en: 'Netilat Yadaim (Washing of Hands)',
      fr: 'Netilat Yadaim (Lavage des Mains)',
      pt: 'Netilat Yadaim (Lavagem das Mãos)'
    },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו, וְצִוָּנוּ עַל נְטִילַת יָדַיִם.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, asher kideshanu bemitzvotav, vetzivanu al netilat yadaim.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que nos santificó con Sus preceptos y nos ordenó el lavado de las manos.',
        en: 'Blessed are You, Lord our God, King of the universe, who has sanctified us with His commandments, and commanded us concerning the washing of the hands.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l’univers, qui nous a sanctifiés par Ses commandements et nous a ordonné le lavage des mains.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que nos santificou com os Seus mandamentos e nos ordenou a lavagem das mãos.'
      }
    }
  ],
  cuerpo: [
    {
      id: 'asher-yatzar',
      titleHebrew: 'אשר יצר',
      titleSpanish: 'Asher Yatzar',
      title: {
      es: 'Asher Yatzar (Después de ir al baño)',
      en: 'Asher Yatzar (After Using the Bathroom)',
      fr: 'Asher Yatzar (Après les besoins)',
      pt: 'Asher Yatzar (Depois de usar o banheiro)'
    },
      warning: {
        es: '⚠️ Recitar fuera del baño y con las manos lavadas.',
        en: '⚠️ Recite outside the bathroom after washing hands.',
        fr: '⚠️ À réciter hors de la salle de bain et après lavage des mains.',
        pt: '⚠️ Recitar fora do banheiro e com as mãos lavadas.',
        he: '⚠️ יש לברך מחוץ לחדר הנוחיות ולאחר נטילת ידיים.'
      },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר יָצַר אֶת הָאָדָם בְּחָכְמָה...',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, asher yatzar et haadam bejojmá...',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que formaste al hombre con sabiduría...',
        en: 'Blessed are You, Lord our God, King of the universe, who formed man with wisdom...',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l’univers, qui a formé l’homme avec sagesse...',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que formaste o homem com sabedoria...'
      }
    },
    {
      id: 'rayos-relampagos',
      titleHebrew: 'על הברקים',
      titleSpanish: 'Al ver un Rayo / Relámpago',
      title: {
      es: 'Al ver un Rayo / Relámpago',
      en: 'Upon Seeing Lightning',
      fr: 'En voyant un Éclair',
      pt: 'Ao ver um Relâmpago'
    },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, עֹשֵׂה מַעֲשֵׂה בְרֵאשִׁית.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, osé maasé bereshit.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que hace la obra de la Creación.',
        en: 'Blessed are You, Lord our God, King of the universe, who makes the work of Creation.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l\'univers, qui accomplit l\'œuvre de la Création.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que faz a obra da Criação.'
      }
    },
    {
      id: 'truenos',
      titleHebrew: 'על הרעמים',
      titleSpanish: 'Al escuchar un Trueno',
      title: {
      es: 'Al escuchar un Trueno',
      en: 'Upon Hearing Thunder',
      fr: 'En entendant le Tonnerre',
      pt: 'Ao ouvir um Trovão'
    },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁכֹּחוֹ וּגְבוּרָתוֹ מָלֵא עוֹלָם.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, shekojó ugburató malé olam.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, cuyo poder y fuerza llenan el mundo.',
        en: 'Blessed are You, Lord our God, King of the universe, whose power and might fill the world.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l\'univers, dont la puissance et la force remplissent le monde.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, cujo poder e força enchem o mundo.'
      }
    },
  ],
  alimentos: [
    {
      id: 'hamotzi',
      titleHebrew: 'המוציא לחם מן הארץ',
      titleSpanish: 'Hamotzi',
      title: {
      es: 'Hamotzí Lejem (Sobre el Pan)',
      en: 'Hamotzi Lechem (Over Bread)',
      fr: 'Hamotzi Lechem (Sur le Pain)',
      pt: 'Hamotzi Lechem (Sobre o Pão)'
    },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמוֹצִיא לֶחֶם מִן הָאָרֶץ.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, hamotzi lejem min haaretz.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que sacas el pan de la tierra.',
        en: 'Blessed are You, Lord our God, King of the universe, who brings forth bread from the earth.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l’univers, qui fait sortir le pain de la terre.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que fazes sair o pão da terra.'
      }
    },
    {
      id: 'shehakol',
      titleHebrew: 'שהכל נהיה בדברו',
      titleSpanish: 'Shehakol',
      title: {
      es: 'Shehakol Nihiyá Bidvaró (Bebidas y General)',
      en: 'Shehakol Nihiya Bidvaro (Drinks & General Food)',
      fr: 'Shehakol Nihiya Bidvaro (Boissons et Alimentation Générale)',
      pt: 'Shehakol Nihiyá Bidvaró (Bebidas e Geral)'
    },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁהַכֹּל נִהְיֶה בִּדְבָרוֹ.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, shehakol niheyá bidvaró.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, por cuya palabra todo fue creado.',
        en: 'Blessed are You, Lord our God, King of the universe, through whose word everything comes to be.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l’univers, par la parole duquel tout a été créé.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, cuja palavra traz à existência todas as coisas.'
      }
    },
    {
      id: 'bore-peri-haetz',
      titleHebrew: 'בורא פרי העץ',
      titleSpanish: 'Bore Peri Haetz',
      title: {
      es: 'Boré Perí Haetz (Frutas de Árbol)',
      en: 'Borei Peri Haetz (Tree Fruits)',
      fr: 'Boré Peri Haetz (Fruits de l\'Arbre)',
      pt: 'Boré Peri Haetz (Frutas da Árvore)'
    },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הָעֵץ.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, boré peri haetz.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que creas el fruto del árbol.',
        en: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the tree.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l’univers, qui crées le fruit de l’arbre.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que crias o fruto da árvore.'
      }
    },
    {
      id: 'bore-peri-haadama',
      titleHebrew: 'בורא פרי האדמה',
      titleSpanish: 'Bore Peri Haadamá',
      title: {
      es: 'Boré Perí Haadamá (Verduras y Vegetales)',
      en: 'Borei Peri Haadama (Vegetables & Earth Produce)',
      fr: 'Boré Peri Haadama (Légumes et Produits de la Terre)',
      pt: 'Boré Peri Haadamá (Vegetais e Frutos da Terra)'
    },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הָאֲדָמָה.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, boré peri haadamá.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que creas el fruto de la tierra.',
        en: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the earth.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l’univers, qui crées le fruit de la terre.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que crias o fruto da terra.'
      }
    },
    {
      id: 'mezonot',
      titleHebrew: 'בּוֹרֵא מִינֵי מְזוֹנוֹת',
      titleSpanish: 'Boré Miné Mezonot (Pastas y Harinas)',
      title: {
        es: 'Boré Miné Mezonot (Pastas y Harinas)',
        en: 'Borei Minei Mezonot (Grains & Pastries)',
        fr: 'Boré Miné Mezonot (Pâtisseries et Céréales)',
        pt: 'Boré Miné Mezonot (Massas e Cereais)'
      },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא מִינֵי מְזוֹנוֹת.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, boré miné mezonot.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que creas diversas especies de alimento.',
        en: 'Blessed are You, Lord our God, King of the universe, Who creates various kinds of nourishment.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l\'univers, Qui créas diverses sortes de nourritures.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que crias diversas espécies de alimento.'
      }
    },
    {
      id: 'bore-hagefen',
      titleHebrew: 'בורא פרי הגפן',
      titleSpanish: 'Bore Peri Hagefen',
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן.',
      title: {
      es: 'Boré Perí Hagefen (Sobre el Vino)',
      en: 'Borei Peri Hagefen (Over Wine)',
      fr: 'Boré Peri Hagefen (Sur le Vin)',
      pt: 'Boré Peri Hagefen (Sobre o Vinho)'
    },
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, boré peri hagefen.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, que creas el fruto de la vid.',
        en: 'Blessed are You, Lord our God, King of the universe, who creates the fruit of the vine.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l’univers, qui crées le fruit de la vigne.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, que crias o fruto da videira.'
      }
    }
  ],
  antes_de_dormir: [],
  'birkat-hamazon': [
  {
    "id": "hazan",
    "titleHebrew": "הזן את הכל",
    "titleSpanish": "1. Hazán Et Hakol — El sustento",
    "title": {
      "es": "1. Hazán Et Hakol — El sustento",
      "en": "1. Hazan — Sustenance",
      "fr": "1. Hazan — La subsistance",
      "pt": "1. Hazan — O sustento"
    },
    "hebrew": "בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם הָאֵל הַזָּן אוֹתָנוּ וְאֶת הָעוֹלָם כֻּלּוֹ בְּטוּבוֹ בְּחֵן בְּחֶסֶד בְּרֶוַח וּבְרַחֲמִים רַבִּים נוֹתֵן לֶחֶם לְכָל בָּשָׂר כִּי לְעוֹלָם חַסְדּוֹ. וּבְטוּבוֹ הַגָּדוֹל תָּמִיד לֹא חָסַר לָנוּ וְאַל יֶחְסַר לָנוּ מָזוֹן תָּמִיד לְעוֹלָם וָעֶד כִּי הוּא אֵל זָן וּמְפַרְנֵס לַכֹּל וְשֻׁלְחָנוֹ עָרוּךְ לַכֹּל וְהִתְקִין מִחְיָה וּמָזוֹן לְכָל בְּרִיּוֹתָיו אֲשֶׁר בָּרָא בְּרַחֲמָיו וּבְרוֹב חֲסָדָיו כָּאָמוּר פּוֹתֵחַ אֶת יָדֶךָ וּמַשְׂבִּיעַ לְכָל חַי רָצוֹן. בָּרוּךְ אַתָּה ה׳ הַזָּן אֶת הַכֹּל.",
    "phonetic": "Baruj atá Adonai Elohenu melej haolam, haEl hazán otanu veet haolam kulo betuvo, bejen, bejesed, berevaj uverajamim rabim. Notén lejem lejol basar ki leolam jasdó. Uvetuvó hagadol tamid lo jasar lanu veal yejsar lanu mazón tamid leolam vaed. Ki hu El zan umefarnés lakol, veshuljanó aruj lakol, vehitkin mijyá umazón lejol beriyotav asher bará berajamav uverov jasadav. Kaamur: poteaj et yadeja umasbia lejol jai ratzón. Baruj atá Adonai hazán et hakol.",
    "translation": {
      "es": "Bendito eres Tú, Eterno Dios nuestro, Rey del universo, que sustentas a todo el mundo con bondad, gracia y misericordia. Das alimento a toda criatura; Tu bondad es eterna. Nunca nos ha faltado sustento y que nunca nos falte. Provees a todas tus criaturas y sacias a todo ser viviente. Bendito eres Tú, que sustentas a todos.",
      "en": "Blessed are You, Lord our God, King of the universe, who nourishes the world with goodness, grace and mercy. You feed all creatures; Your kindness lasts forever. May we never lack sustenance. Blessed are You, who nourishes all.",
      "fr": "Béni sois-Tu, Éternel notre Dieu, Roi de l’univers, qui nourris le monde avec bonté, grâce et miséricorde. Tu nourris toute créature. Que la nourriture ne nous manque jamais. Béni sois-Tu, qui nourris tous.",
      "pt": "Bendito és Tu, Eterno nosso Deus, Rei do universo, que sustentas o mundo com bondade, graça e misericórdia. Alimentas todas as criaturas. Que nunca nos falte sustento. Bendito és Tu, que sustentas a todos."
    },
    "warning": {
      "es": "Texto base de días laborables. Para rezarlo, consultar el sidur de la comunidad: faltan aquí zimún, HaRajamán y las inserciones de Shabat y festividades.",
      "en": "Weekday core text. For prayer, consult your community siddur: zimun, HaRachaman and Shabbat/festival additions are not included here.",
      "fr": "Texte de base des jours ordinaires. Pour prier, consulter le sidour communautaire : zimoun, HaRaḥaman et ajouts des fêtes non inclus.",
      "pt": "Texto básico de dias comuns. Para rezar, consulte o sidur da comunidade: zimun, HaRachaman e acréscimos de Shabat e festas não estão incluídos.",
      "he": "נוסח בסיסי לימי חול. יש לעיין בסידור הקהילה לזימון, הרחמן ותוספות שבת ומועדים."
    }
  },
  {
    "id": "al-haaretz",
    "titleHebrew": "על הארץ ועל המזון",
    "titleSpanish": "2. Birkat Haáretz — La tierra",
    "title": {
      "es": "2. Birkat Haáretz — La tierra",
      "en": "2. Birkat Haaretz — The land",
      "fr": "2. Birkat Haaretz — La terre",
      "pt": "2. Birkat Haaretz — A terra"
    },
    "hebrew": "נוֹדֶה לְּךָ ה׳ אֱלֹהֵינוּ עַל שֶׁהִנְחַלְתָּ לַאֲבוֹתֵינוּ אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה בְּרִית וְתוֹרָה חַיִּים וּמָזוֹן עַל שֶׁהוֹצֵאתָנוּ מֵאֶרֶץ מִצְרַיִם וּפְדִיתָנוּ מִבֵּית עֲבָדִים וְעַל בְּרִיתְךָ שֶׁחָתַמְתָּ בִּבְשָׂרֵנוּ וְעַל תּוֹרָתְךָ שֶׁלִּמַּדְתָּנוּ וְעַל חֻקֵּי רְצוֹנְךָ שֶׁהוֹדַעְתָּנוּ וְעַל חַיִּים וּמָזוֹן שֶׁאַתָּה זָן וּמְפַרְנֵס אוֹתָנוּ. וְעַל הַכֹּל ה׳ אֱלֹהֵינוּ אֲנַחְנוּ מוֹדִים לָךְ וּמְבָרְכִים אֶת שִׁמְךָ כָּאָמוּר וְאָכַלְתָּ וְשָׂבָעְתָּ וּבֵרַכְתָּ אֶת ה׳ אֱלֹהֶיךָ עַל הָאָרֶץ הַטֹּבָה אֲשֶׁר נָתַן לָךְ. בָּרוּךְ אַתָּה ה׳ עַל הָאָרֶץ וְעַל הַמָּזוֹן.",
    "phonetic": "Nodé lejá Adonai Elohenu al shehinjalta laavotenu eretz jemdá tová urejavá, berit veTorá, jayim umazón. Al shehotzetanu meeretz Mitzrayim ufditanu mibeit avadim, veal beriteja shejatamta bivsarenu, veal Torateja shelimadtanu, veal jukei retzoneja shehodatanu, veal jayim umazón sheatá zan umefarnés otanu. Veal hakol Adonai Elohenu anajnu modim laj umevarejim et shimeja. Kaamur: veajalta vesavata uverajta et Adonai Eloheja al haaretz hatová asher natan laj. Baruj atá Adonai al haaretz veal hamazón.",
    "translation": {
      "es": "Te agradecemos por haber dado a nuestros antepasados una tierra buena y amplia, por la alianza, la Torá, la vida y el alimento, y por habernos liberado de Egipto. Por todo ello te damos gracias y bendecimos Tu nombre. Bendito eres Tú por la tierra y el sustento.",
      "en": "We thank You for giving our ancestors a good and spacious land, for the covenant, Torah, life and nourishment, and for redeeming us from Egypt. For all this we bless Your name. Blessed are You for the land and nourishment.",
      "fr": "Nous Te remercions pour la terre bonne et vaste, pour l’alliance, la Torah, la vie et la nourriture, et pour la sortie d’Égypte. Béni sois-Tu pour la terre et la nourriture.",
      "pt": "Agradecemos pela terra boa e ampla, pela aliança, pela Torá, pela vida e pelo alimento, e pela libertação do Egito. Bendito és Tu pela terra e pelo sustento."
    },
    "warning": {
      "es": "Texto base de días laborables. Para rezarlo, consultar el sidur de la comunidad: faltan aquí zimún, HaRajamán y las inserciones de Shabat y festividades.",
      "en": "Weekday core text. For prayer, consult your community siddur: zimun, HaRachaman and Shabbat/festival additions are not included here.",
      "fr": "Texte de base des jours ordinaires. Pour prier, consulter le sidour communautaire : zimoun, HaRaḥaman et ajouts des fêtes non inclus.",
      "pt": "Texto básico de dias comuns. Para rezar, consulte o sidur da comunidade: zimun, HaRachaman e acréscimos de Shabat e festas não estão incluídos.",
      "he": "נוסח בסיסי לימי חול. יש לעיין בסידור הקהילה לזימון, הרחמן ותוספות שבת ומועדים."
    }
  },
  {
    "id": "bne-yerushalayim",
    "titleHebrew": "בונה ירושלים",
    "titleSpanish": "3. Boné Yerushaláyim — Jerusalén",
    "title": {
      "es": "3. Boné Yerushaláyim — Jerusalén",
      "en": "3. Boneh Yerushalayim — Jerusalem",
      "fr": "3. Boné Yerushalayim — Jérusalem",
      "pt": "3. Bone Yerushalayim — Jerusalém"
    },
    "hebrew": "רַחֵם ה׳ אֱלֹהֵינוּ עָלֵינוּ וְעַל יִשְׂרָאֵל עַמָּךְ וְעַל יְרוּשָׁלַיִם עִירָךְ וְעַל הַר צִיּוֹן מִשְׁכַּן כְּבוֹדָךְ וְעַל הֵיכָלָךְ וְעַל מְעוֹנָךְ וְעַל דְּבִירָךְ וְעַל הַבַּיִת הַגָּדוֹל וְהַקָּדוֹשׁ שֶׁנִּקְרָא שִׁמְךָ עָלָיו. אָבִינוּ רְעֵנוּ זוּנֵנוּ פַּרְנְסֵנוּ וְכַלְכְּלֵנוּ וְהַרְוִיחֵנוּ לָנוּ מְהֵרָה מִכָּל צָרוֹתֵינוּ וְנָא אַל תַּצְרִיכֵנוּ ה׳ אֱלֹהֵינוּ לִידֵי מַתְּנוֹת בָּשָׂר וָדָם וְלֹא לִידֵי הַלְוָאָתָם אֶלָּא לְיָדְךָ הַמְּלֵאָה וְהָרְחָבָה הָעֲשִׁירָה וְהַפְּתוּחָה. יְהִי רָצוֹן שֶׁלֹּא נֵבוֹשׁ בָּעוֹלָם הַזֶּה וְלֹא נִכָּלֵם לְעוֹלָם וָעֶד וּמַלְכוּת בֵּית דָּוִד מְשִׁיחָךְ תַּחֲזִירֶנָּה לִמְקוֹמָהּ בִּמְהֵרָה בְּיָמֵינוּ. בָּרוּךְ אַתָּה ה׳ בּוֹנֵה יְרוּשָׁלָיִם.",
    "phonetic": "Rajém Adonai Elohenu alenu veal Yisrael amaj, veal Yerushalayim iraj, veal har Tzion mishkán kevodaj, veal hejalaj veal meonaj veal deviraj, veal habayit hagadol vehakadosh shenikrá shimja alav. Avinu reenu zunenu parnesenu vejaljelenu veharvijenu lanu meherá mikol tzarotenu. Vena al tatzrijenu Adonai Elohenu lidei matenot basar vadam velo lidei halvaatam, ela leyadeja hameleá veharejavá haashirá vehapetujá. Yehi ratzón shelo nevosh baolam hazé velo nikalem leolam vaed, umaljut beit David meshijaj tajazirená limkomá bimeherá veyamenu. Baruj atá Adonai boné Yerushalayim.",
    "translation": {
      "es": "Ten misericordia de Israel y Jerusalén, del monte Sión y del Templo. Aliméntanos y libéranos de la dependencia de otros. Restablece el reino de la casa de David. Bendito eres Tú, que reconstruyes Jerusalén.",
      "en": "Have mercy on Israel and Jerusalem, on Zion and the Temple. Sustain us and relieve us of dependence on others. Restore the kingdom of David’s house. Blessed are You, who rebuilds Jerusalem.",
      "fr": "Aie pitié d’Israël et de Jérusalem, de Sion et du Temple. Nourris-nous et délivre-nous de la dépendance d’autrui. Rétablis la maison de David. Béni sois-Tu, qui rebâtis Jérusalem.",
      "pt": "Tem misericórdia de Israel e Jerusalém, de Sião e do Templo. Sustenta-nos e livra-nos da dependência de outros. Restaura a casa de David. Bendito és Tu, que reconstróis Jerusalém."
    },
    "warning": {
      "es": "Texto base de días laborables. Para rezarlo, consultar el sidur de la comunidad: faltan aquí zimún, HaRajamán y las inserciones de Shabat y festividades.",
      "en": "Weekday core text. For prayer, consult your community siddur: zimun, HaRachaman and Shabbat/festival additions are not included here.",
      "fr": "Texte de base des jours ordinaires. Pour prier, consulter le sidour communautaire : zimoun, HaRaḥaman et ajouts des fêtes non inclus.",
      "pt": "Texto básico de dias comuns. Para rezar, consulte o sidur da comunidade: zimun, HaRachaman e acréscimos de Shabat e festas não estão incluídos.",
      "he": "נוסח בסיסי לימי חול. יש לעיין בסידור הקהילה לזימון, הרחמן ותוספות שבת ומועדים."
    }
  },
  {
    "id": "hatov-vehametiv",
    "titleHebrew": "הטוב והמטיב",
    "titleSpanish": "4. Hatov Vehametiv — El Bueno",
    "title": {
      "es": "4. Hatov Vehametiv — El Bueno",
      "en": "4. Hatov Vehametiv — The Benevolent",
      "fr": "4. Hatov Vehametiv — Le Bienfaisant",
      "pt": "4. Hatov Vehametiv — O Benevolente"
    },
    "hebrew": "בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם לָעַד הָאֵל אָבִינוּ מַלְכֵּנוּ אַדִּירֵנוּ בּוֹרְאֵנוּ גּוֹאֲלֵנוּ קְדוֹשֵׁנוּ קְדוֹשׁ יַעֲקֹב רוֹעֵנוּ רוֹעֵה יִשְׂרָאֵל הַמֶּלֶךְ הַטּוֹב וְהַמֵּטִיב לַכֹּל שֶׁבְּכָל יוֹם וָיוֹם הוּא הֵטִיב לָנוּ הוּא מֵטִיב לָנוּ הוּא יֵיטִיב לָנוּ הוּא גְמָלָנוּ הוּא גוֹמְלֵנוּ הוּא יִגְמְלֵנוּ לָעַד חֵן וָחֶסֶד וְרַחֲמִים וְרֶוַח וְהַצָּלָה וְכָל טוֹב.",
    "phonetic": "Baruj atá Adonai Elohenu melej haolam laad, haEl avinu malkenu adirenu boreenu goalenu kedoshenu, kedosh Yaakov, roenu roé Yisrael, hamelej hatov vehametiv lakol, shebejol yom vayom hu hetiv lanu hu metiv lanu hu yetiv lanu. Hu gemalanu hu gomlenu hu yigmelenu laad jen vajesed verajamim verevaj vehatzalá vejol tov.",
    "translation": {
      "es": "Bendito eres Tú, nuestro Dios y Rey, nuestro Padre, Creador y Redentor, el Rey bueno que hace bien a todos. Nos hiciste el bien, nos haces el bien y nos harás el bien siempre, con gracia y misericordia.",
      "en": "Blessed are You, our God and King, our Father, Creator and Redeemer, the good King who benefits all. You have done us good, do us good and will continue to do us good with grace and mercy.",
      "fr": "Béni sois-Tu, notre Dieu et Roi, Père, Créateur et Rédempteur, Roi bon et bienfaisant envers tous. Tu nous as fait du bien, Tu nous fais du bien et Tu nous en feras toujours.",
      "pt": "Bendito és Tu, nosso Deus e Rei, Pai, Criador e Redentor, Rei bom que faz o bem a todos. Fizeste-nos o bem, fazes-nos o bem e sempre nos farás o bem."
    },
    "warning": {
      "es": "Texto base de días laborables. Para rezarlo, consultar el sidur de la comunidad: faltan aquí zimún, HaRajamán y las inserciones de Shabat y festividades.",
      "en": "Weekday core text. For prayer, consult your community siddur: zimun, HaRachaman and Shabbat/festival additions are not included here.",
      "fr": "Texte de base des jours ordinaires. Pour prier, consulter le sidour communautaire : zimoun, HaRaḥaman et ajouts des fêtes non inclus.",
      "pt": "Texto básico de dias comuns. Para rezar, consulte o sidur da comunidade: zimun, HaRachaman e acréscimos de Shabat e festas não estão incluídos.",
      "he": "נוסח בסיסי לימי חול. יש לעיין בסידור הקהילה לזימון, הרחמן ותוספות שבת ומועדים."
    }
  }
],
  'berajot-ajronot': [
{
      id: 'bore-nefashot',
      titleHebrew: 'בּוֹרֵא נְפָשׁוֹת',
      titleSpanish: 'Boré Nefashot (Bendición Final General)',
      title: {
        es: 'Boré Nefashot (Bendición Final General)',
        en: 'Borei Nefashot (After Blessing for General Food)',
        fr: 'Boré Nefachot (Bénédiction Finale Générale)',
        pt: 'Boré Nefashot (Bênção Final Geral)'
      },
      hebrew: 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא נְפָשׁוֹת רַבּוֹת וְחֶסְרוֹנָן, עַל כָּל מַה שֶׁבָּרָאתָ לְהַחֲיוֹת בָּהֶם נֶפֶשׁ כָּל חָי, בָּרוּךְ חֵי הָעוֹלָמִים.',
      phonetic: 'Baruj atá Adonai, Elohenu melej haolam, boré nefashot rabot vejessronan, al kol ma shebarata lehajayot bahem nefesh kol jai, baruj jei haolamim.',
      translation: {
        es: 'Bendito eres Tú, oh Eterno nuestro Dios, Rey del universo, creador de numerosos seres vivos y de sus necesidades, por todo lo que creaste para mantener con ello la vida de todo ser viviente. Bendito es El que vive eternamente.',
        en: 'Blessed are You, Lord our God, King of the universe, Creator of numerous living beings and their needs, for all that You have created to sustain the life of every living soul. Blessed is the Life of the worlds.',
        fr: 'Béni soit Tu, Éternel notre Dieu, Roi de l\'univers, Créateur de nombreux êtres vivants et de leurs besoins, pour tout ce que Tu as créé afin de maintenir la vie de tout être vivant. Béni soit Le Vivant des mondes.',
        pt: 'Bendito és Tu, Senhor nosso Deus, Rei do universo, Criador de numerosos seres vivos e de suas necessidades, por tudo o que criaste para sustentar a vida de todo ser vivo. Bendito seja Aquele que vive eternamente.'
      }
    },

  {
    "id": "al-hamichya",
    "titleHebrew": "על המחיה",
    "titleSpanish": "Al Hamijyá — Cereales (Mezonot)",
    "title": {
      "es": "Al Hamijyá — Cereales (Mezonot)",
      "en": "Al Hamichyah — Grain foods",
      "fr": "Al Hamichya — Céréales",
      "pt": "Al Hamichya — Cereais"
    },
    "hebrew": "בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם עַל הַמִּחְיָה וְעַל הַכַּלְכָּלָה וְעַל תְּנוּבַת הַשָּׂדֶה וְעַל אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה שֶׁרָצִיתָ וְהִנְחַלְתָּ לַאֲבוֹתֵינוּ לֶאֱכֹל מִפִּרְיָהּ וְלִשְׂבֹּעַ מִטּוּבָהּ. רַחֵם נָא ה׳ אֱלֹהֵינוּ עַל יִשְׂרָאֵל עַמָּךְ וְעַל יְרוּשָׁלַיִם עִירָךְ וְעַל צִיּוֹן מִשְׁכַּן כְּבוֹדָךְ וְעַל מִזְבְּחָךְ וְעַל הֵיכָלָךְ. וּבְנֵה יְרוּשָׁלַיִם עִיר הַקֹּדֶשׁ בִּמְהֵרָה בְיָמֵינוּ וְהַעֲלֵנוּ לְתוֹכָהּ וְשַׂמְּחֵנוּ בָּהּ וּנְבָרֶכְךָ בִּקְדֻשָּׁה וּבְטָהֳרָה. כִּי אַתָּה ה׳ טוֹב וּמֵטִיב לַכֹּל וְנוֹדֶה לְךָ עַל הָאָרֶץ וְעַל הַמִּחְיָה. בָּרוּךְ אַתָּה ה׳ עַל הָאָרֶץ וְעַל הַמִּחְיָה.",
    "phonetic": "Baruj atá Adonai Elohenu melej haolam, al hamijyá veal hakalkalá, veal tenuvat hasadé, veal eretz jemdá tová urejavá sheratzita vehinjalta laavotenu leejol mipiryá velisboa mituvá. Rajem na Adonai Elohenu al Yisrael amaj veal Yerushalayim iraj veal Tzion mishkán kevodaj veal mizbejaj veal hejalaj. Uvné Yerushalayim ir hakodesh bimeherá veyamenu vehaalenu letojá vesamjenu bah unevarejeja bikdushá uvetahará. Ki atá Adonai tov umetiv lakol venodé lejá al haaretz veal hamijyá. Baruj atá Adonai al haaretz veal hamijyá.",
    "translation": {
      "es": "Bendito eres Tú por el sustento, los cereales y el fruto del campo; por la tierra buena que diste a nuestros padres. Ten piedad de Israel y Jerusalén, reconstruye la ciudad santa y permítenos alegrarnos en ella. Bendito eres Tú por la tierra y el sustento.",
      "en": "Blessed are You for sustenance, grain and the produce of the field; for the good land given to our ancestors. Have mercy on Israel and Jerusalem, rebuild the holy city and let us rejoice there. Blessed are You for the land and sustenance.",
      "fr": "Béni sois-Tu pour la nourriture, les céréales et les produits du champ; pour la bonne terre donnée à nos ancêtres. Aie pitié d’Israël et de Jérusalem; reconstruis la Ville sainte. Béni sois-Tu pour la terre et la nourriture.",
      "pt": "Bendito és Tu pelo sustento, pelos cereais e pelos frutos do campo; pela terra boa dada aos nossos antepassados. Tem misericórdia de Israel e Jerusalém; reconstrói a cidade santa. Bendito és Tu pela terra e pelo sustento."
    },
    "warning": {
      "es": "Versión básica para días de semana, para el alimento indicado. En Shabat, Rosh Jódesh, festividades o combinaciones de alimentos se debe emplear el texto adaptado del sidur.",
      "en": "Basic weekday form for the indicated food. On Shabbat, Rosh Chodesh, festivals or mixed food categories, use the adapted siddur text.",
      "fr": "Version ordinaire pour l’aliment indiqué. Le Chabbat, à Roch Ḥodech, les fêtes ou avec plusieurs catégories, utiliser le texte adapté du sidour.",
      "pt": "Versão básica para dias comuns e o alimento indicado. No Shabat, Rosh Chodesh, festas ou categorias combinadas, use o texto adaptado do sidur.",
      "he": "נוסח בסיסי לימי חול; בשבת, בראש חודש, בחגים או בצירוף מאכלים יש לעיין בנוסח המתאים בסידור."
    }
  },
  {
    "id": "al-hagefen",
    "titleHebrew": "על הגפן",
    "titleSpanish": "Al Haguefen — Vino o jugo de uva",
    "title": {
      "es": "Al Haguefen — Vino o jugo de uva",
      "en": "Al Hagefen — Wine or grape juice",
      "fr": "Al Hagefen — Vin ou jus de raisin",
      "pt": "Al Hagefen — Vinho ou suco de uva"
    },
    "hebrew": "בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם עַל הַגֶּפֶן וְעַל פְּרִי הַגֶּפֶן וְעַל תְּנוּבַת הַשָּׂדֶה וְעַל אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה שֶׁרָצִיתָ וְהִנְחַלְתָּ לַאֲבוֹתֵינוּ לֶאֱכֹל מִפִּרְיָהּ וְלִשְׂבֹּעַ מִטּוּבָהּ. רַחֵם נָא ה׳ אֱלֹהֵינוּ עַל יִשְׂרָאֵל עַמָּךְ וְעַל יְרוּשָׁלַיִם עִירָךְ וְעַל צִיּוֹן מִשְׁכַּן כְּבוֹדָךְ וְעַל מִזְבְּחָךְ וְעַל הֵיכָלָךְ. וּבְנֵה יְרוּשָׁלַיִם עִיר הַקֹּדֶשׁ בִּמְהֵרָה בְיָמֵינוּ וְהַעֲלֵנוּ לְתוֹכָהּ וְשַׂמְּחֵנוּ בָּהּ וּנְבָרֶכְךָ בִּקְדֻשָּׁה וּבְטָהֳרָה. כִּי אַתָּה ה׳ טוֹב וּמֵטִיב לַכֹּל וְנוֹדֶה לְךָ עַל הָאָרֶץ וְעַל פְּרִי הַגֶּפֶן. בָּרוּךְ אַתָּה ה׳ עַל הָאָרֶץ וְעַל פְּרִי הַגֶּפֶן.",
    "phonetic": "Baruj atá Adonai Elohenu melej haolam, al haguefen veal peri haguefen, veal tenuvat hasadé, veal eretz jemdá tová urejavá sheratzita vehinjalta laavotenu leejol mipiryá velisboa mituvá. Rajem na Adonai Elohenu al Yisrael amaj veal Yerushalayim iraj veal Tzion mishkán kevodaj veal mizbejaj veal hejalaj. Uvné Yerushalayim ir hakodesh bimeherá veyamenu vehaalenu letojá vesamjenu bah unevarejeja bikdushá uvetahará. Ki atá Adonai tov umetiv lakol venodé lejá al haaretz veal peri haguefen. Baruj atá Adonai al haaretz veal peri haguefen.",
    "translation": {
      "es": "Bendito eres Tú por la vid y su fruto, por la tierra buena y amplia. Ten piedad de Israel y Jerusalén, reconstruye la ciudad santa y danos alegría en ella. Bendito eres Tú por la tierra y el fruto de la vid.",
      "en": "Blessed are You for the vine and its fruit, and for the good and spacious land. Have mercy on Israel and Jerusalem, rebuild the holy city and grant us joy there. Blessed are You for the land and the fruit of the vine.",
      "fr": "Béni sois-Tu pour la vigne et son fruit, ainsi que pour la bonne et vaste terre. Aie pitié d’Israël et de Jérusalem et rebâtis la Ville sainte. Béni sois-Tu pour la terre et le fruit de la vigne.",
      "pt": "Bendito és Tu pela videira e seu fruto, e pela terra boa e ampla. Tem misericórdia de Israel e Jerusalém e reconstrói a Cidade Santa. Bendito és Tu pela terra e pelo fruto da videira."
    },
    "warning": {
      "es": "Versión básica para días de semana, para el alimento indicado. En Shabat, Rosh Jódesh, festividades o combinaciones de alimentos se debe emplear el texto adaptado del sidur.",
      "en": "Basic weekday form for the indicated food. On Shabbat, Rosh Chodesh, festivals or mixed food categories, use the adapted siddur text.",
      "fr": "Version ordinaire pour l’aliment indiqué. Le Chabbat, à Roch Ḥodech, les fêtes ou avec plusieurs catégories, utiliser le texte adapté du sidour.",
      "pt": "Versão básica para dias comuns e o alimento indicado. No Shabat, Rosh Chodesh, festas ou categorias combinadas, use o texto adaptado do sidur.",
      "he": "נוסח בסיסי לימי חול; בשבת, בראש חודש, בחגים או בצירוף מאכלים יש לעיין בנוסח המתאים בסידור."
    }
  },
  {
    "id": "al-haetz",
    "titleHebrew": "על העץ",
    "titleSpanish": "Al Haetz — Siete especies (cinco frutas)",
    "title": {
      "es": "Al Haetz — Siete especies (cinco frutas)",
      "en": "Al Haetz — Five special fruits",
      "fr": "Al Haetz — Cinq fruits spéciaux",
      "pt": "Al Haetz — Cinco frutas especiais"
    },
    "hebrew": "בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם עַל הָעֵץ וְעַל פְּרִי הָעֵץ וְעַל תְּנוּבַת הַשָּׂדֶה וְעַל אֶרֶץ חֶמְדָּה טוֹבָה וּרְחָבָה שֶׁרָצִיתָ וְהִנְחַלְתָּ לַאֲבוֹתֵינוּ לֶאֱכֹל מִפִּרְיָהּ וְלִשְׂבֹּעַ מִטּוּבָהּ. רַחֵם נָא ה׳ אֱלֹהֵינוּ עַל יִשְׂרָאֵל עַמָּךְ וְעַל יְרוּשָׁלַיִם עִירָךְ וְעַל צִיּוֹן מִשְׁכַּן כְּבוֹדָךְ וְעַל מִזְבְּחָךְ וְעַל הֵיכָלָךְ. וּבְנֵה יְרוּשָׁלַיִם עִיר הַקֹּדֶשׁ בִּמְהֵרָה בְיָמֵינוּ וְהַעֲלֵנוּ לְתוֹכָהּ וְשַׂמְּחֵנוּ בָּהּ וּנְבָרֶכְךָ בִּקְדֻשָּׁה וּבְטָהֳרָה. כִּי אַתָּה ה׳ טוֹב וּמֵטִיב לַכֹּל וְנוֹדֶה לְךָ עַל הָאָרֶץ וְעַל הַפֵּרוֹת. בָּרוּךְ אַתָּה ה׳ עַל הָאָרֶץ וְעַל הַפֵּרוֹת.",
    "phonetic": "Baruj atá Adonai Elohenu melej haolam, al haetz veal peri haetz, veal tenuvat hasadé, veal eretz jemdá tová urejavá sheratzita vehinjalta laavotenu leejol mipiryá velisboa mituvá. Rajem na Adonai Elohenu al Yisrael amaj veal Yerushalayim iraj veal Tzion mishkán kevodaj veal mizbejaj veal hejalaj. Uvné Yerushalayim ir hakodesh bimeherá veyamenu vehaalenu letojá vesamjenu bah unevarejeja bikdushá uvetahará. Ki atá Adonai tov umetiv lakol venodé lejá al haaretz veal haperot. Baruj atá Adonai al haaretz veal haperot.",
    "translation": {
      "es": "Bendito eres Tú por el árbol y su fruto, por la tierra buena y amplia. Ten piedad de Israel y Jerusalén y reconstruye la ciudad santa. Bendito eres Tú por la tierra y los frutos.",
      "en": "Blessed are You for the tree and its fruit, and for the good and spacious land. Have mercy on Israel and Jerusalem and rebuild the holy city. Blessed are You for the land and the fruits.",
      "fr": "Béni sois-Tu pour l’arbre et ses fruits et pour la bonne et vaste terre. Aie pitié d’Israël et de Jérusalem et rebâtis la Ville sainte. Béni sois-Tu pour la terre et les fruits.",
      "pt": "Bendito és Tu pela árvore e seus frutos e pela terra boa e ampla. Tem misericórdia de Israel e Jerusalém e reconstrói a Cidade Santa. Bendito és Tu pela terra e pelos frutos."
    },
    "warning": {
      "es": "Versión básica para días de semana, para el alimento indicado. En Shabat, Rosh Jódesh, festividades o combinaciones de alimentos se debe emplear el texto adaptado del sidur.",
      "en": "Basic weekday form for the indicated food. On Shabbat, Rosh Chodesh, festivals or mixed food categories, use the adapted siddur text.",
      "fr": "Version ordinaire pour l’aliment indiqué. Le Chabbat, à Roch Ḥodech, les fêtes ou avec plusieurs catégories, utiliser le texte adapté du sidour.",
      "pt": "Versão básica para dias comuns e o alimento indicado. No Shabat, Rosh Chodesh, festas ou categorias combinadas, use o texto adaptado do sidur.",
      "he": "נוסח בסיסי לימי חול; בשבת, בראש חודש, בחגים או בצירוף מאכלים יש לעיין בנוסח המתאים בסידור."
    }
  }

  ]
};
