export interface RezoItem {
  id: string;
  titleHebrew: string;
  titleSpanish: string;
  hebrew: string;
  phonetic: string;
  translation: string;
}

// Nueva estructura que divide el Sidur por momentos del día
export interface SidurStructure {
  shajarit: RezoItem[];
  minja: RezoItem[];
  arbit: RezoItem[];
  berajot: RezoItem[];
}