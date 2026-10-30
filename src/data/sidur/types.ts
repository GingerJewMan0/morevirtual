export interface RezoItem {
  id: string;
  titleHebrew: string;
  titleSpanish: string;
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
  despertar: RezoItem[]; 
  alimentos: RezoItem[]; 
  cuerpo: RezoItem[];    
}