export interface SampleQuestion {
  id: string;
  category: string;
  categoryIcon: string;
  question: string;
  language: 'es' | 'he' | 'en' | 'pt' | 'fr';
  highlight: string;
}

export const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: 'q1',
    category: 'Pésaj y Kashrut',
    categoryIcon: '🍷',
    question: '¿Cuál es la diferencia entre Sefaradí, Ashkenazí, Maguen David y Monte Sinai con respecto al arroz y legumbres (kitniyot) en Pésaj?',
    language: 'es',
    highlight: 'Compara el consumo de arroz, revisión de granos y usanzas culinarias entre comunidades.',
  },
  {
    id: 'q2',
    category: 'Shabat',
    categoryIcon: '🕯️',
    question: '¿Cómo y cuándo se encienden las velas de Shabat según cada tradición y cuál es el nivel halájico de esta mitzvá?',
    language: 'es',
    highlight: 'Explica si se bendice antes o después de encender, cuántas velas y la costumbre de niñas en Jabad.',
  },
  {
    id: 'q3',
    category: 'Tefilá y Rezo',
    categoryIcon: '📖',
    question: '¿Qué diferencias hay al colocarse los Tefilín durante Jol HaMoed (días intermedios de festividades)?',
    language: 'es',
    highlight: 'Muestra la práctica en Sefaradí, Jalabí, Shamí, Ashkenazí y Jabad Lubavitch.',
  },
  {
    id: 'q4',
    category: 'Selijot y Yamim Noraim',
    categoryIcon: '🎺',
    question: '¿Por qué en las comunidades Sefaradí, Maguen David y Monte Sinai se rezan Selijot durante todo el mes de Elul, mientras en Ashkenazí inician pocos días antes de Rosh Hashaná?',
    language: 'es',
    highlight: 'Historia de los 40 días de misericordia de Moshé Rabenu y el origen de cada costumbre.',
  },
  {
    id: 'q5',
    category: 'Kashrut Diaria',
    categoryIcon: '🥩',
    question: '¿Cuánto tiempo se debe esperar entre carne y leche según la halajá y cómo varía según las tradiciones?',
    language: 'es',
    highlight: '6 horas completas, 3 horas, 1 hora y el nivel de Deoraita vs Derabanan vs Minhag.',
  },
  {
    id: 'q6',
    category: 'Rosh Hashaná',
    categoryIcon: '🍯',
    question: '¿Cuáles son los Simanim (alimentos simbólicos) en la mesa de Rosh Hashaná en la tradición Jalabí (Maguen David), Shamí (Monte Sinai), Sefaradí y Ashkenazí?',
    language: 'es',
    highlight: 'Diferencias en bendiciones, calabaza, ejotes, cabeza de cordero y recetas familiares.',
  },
  {
    id: 'q7',
    category: 'Tefilá (עברית)',
    categoryIcon: '✡️',
    question: 'מהם ההבדלים העיקריים בין מנהג עדות המזרח, מגן דוד (חלבי), מונטה סיני (שאמי), אשכנז וחב״ד בנוסח התפילה וברכת כהנים?',
    language: 'he',
    highlight: 'מענה מעמיק בעברית עם מקורות הלכתיים וסיווג מנהגים.',
  },
  {
    id: 'q8',
    category: 'Life Cycle (English)',
    categoryIcon: '💍',
    question: 'What are the customs and halachic levels regarding wearing a Tallit Gadol before vs. after marriage across Sephardic, Ashkenazic, Syrian (Halabi/Shami), and Chabad communities?',
    language: 'en',
    highlight: 'Bar Mitzvah vs Chuppah customs with halachic breakdown.',
  },
  {
    id: 'q9',
    category: 'Shabat (Português)',
    categoryIcon: '✨',
    question: 'Qual é a diferença entre Deoraita, Derabanan e Minhag na observância do Shabat, e como se aplicam as tradições Sefaradi, Asquenazi, Maguen David, Monte Sinai e Chabad?',
    language: 'pt',
    highlight: 'Classificação haláchica em português com abordagem calorosa.',
  },
  {
    id: 'q10',
    category: 'Fêtes (Français)',
    categoryIcon: '🕎',
    question: 'Comment allume-t-on la Hanoukkia selon les traditions Séfarade, Ashkénaze, Maguen David, Monte Sinai et Habad Loubavitch ?',
    language: 'fr',
    highlight: 'Ordre des bougies, lieu d\'allumage et coutumes communautaires.',
  },
];
