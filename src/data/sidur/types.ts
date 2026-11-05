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