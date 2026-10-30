export interface RezoItem {
  id: string;
  titleHebrew: string;
  titleSpanish: string;
  hebrew: string;
  phonetic: string;
  translation: string;
}

export interface BerajotDayStructure {
  despertar: RezoItem[]; // Modé Aní, Netilat Yadaim matutino
  alimentos: RezoItem[]; // Hamotzi, Mezonot, Hagefen, Shehakol, Haetz, Haadam, Birkat Hamazon / Bore Nefashot
  cuerpo: RezoItem[];    // Asher Yatzar, Elohai Neshamá
}