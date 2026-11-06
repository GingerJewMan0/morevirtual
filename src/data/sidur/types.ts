export interface BerajaItem {
  id: string;
  titleHebrew: string;
  titleSpanish: string;
  title?: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
  warning?: {
    es: string;
    en: string;
    fr: string;
    pt: string;
    he?: string;
  };
  hebrew: string;
  phonetic: string;
  translation: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
}

export interface BerajotDayStructure {
  despertar: BerajaItem[];
  alimentos: BerajaItem[];
  cuerpo: BerajaItem[];
  'antes_de_dormir'?: BerajaItem[];
  'birkat-hamazon'?: BerajaItem[];
}

//integración tefilim:

export interface TefillinStepContent {
  es: string;
  en: string;
  fr: string;
  pt: string;
}

export interface TefillinStep {
  id: number;
  title: TefillinStepContent;
  description: {
    default: TefillinStepContent;
    ashkenazi?: TefillinStepContent;
    sefardi?: TefillinStepContent;
    jabad?: TefillinStepContent;
    maguenDavid?: TefillinStepContent;
    monteSinai?: TefillinStepContent;
  };
  imagePlaceholder: string;
  hasBlessing?: boolean;
  blessingId?: 'lehaniach' | 'al-mitzvat';
}

export interface TefillinBlessing {
  id: 'lehaniach' | 'al-mitzvat';
  titleHebrew: string;
  titleSpanish: string;
  hebrew: string;
  phonetic: {
    sefardi: string;
    ashkenazi: string;
  };
  translation: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
  note?: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
}
// Interfaz base para cada elemento individual de rezo
export interface TefilahItem {
  id: string;
  titleHebrew: string;
  titleSpanish: string;
  title: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
  hebrew: string;
  phonetic: string;
  translation: {
    es: string;
    en: string;
    fr: string;
    pt: string;
  };
}

// Tipos permitidos para los ritos (Nusach)
export type NusachType = 'sefaradi' | 'ashkenazi' | 'chabad';

// Tipos permitidos para los tiempos de oración principales
export type PrayerTimeType = 'shajarit' | 'minja' | 'arbit';

// Estructura para agrupar los bloques por rito y tiempo de oración
export interface PrayerRouteConfig {
  nusach: NusachType;
  time: PrayerTimeType;
  items: TefilahItem[];
}