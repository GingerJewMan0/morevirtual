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
}