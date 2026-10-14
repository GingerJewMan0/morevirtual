export type Role = 'user' | 'assistant';

export type TraditionId = 'all' | 'sefaradi' | 'ashkenazi' | 'maguen_david' | 'monte_sinai' | 'chabad';

export interface TraditionInfo {
  id: TraditionId;
  name: string;
  subname: string;
  origin: string;
  badgeClass: string;
  borderClass: string;
  bgLightClass: string;
  textClass: string;
  icon: string;
  authorities: string[];
  keyTraits: string;
  historicalContext: string;
  examples: string[];
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  traditionFocus?: TraditionId;
  isStreaming?: boolean;
  isError?: boolean;
  errorQuery?: string;
}

export interface HalachicClassification {
  level: 'obligatorio' | 'costumbre' | 'opcional';
  title: string;
  description: string;
  color: string;
  icon: string;
}

export interface SavedNote {
  id: string;
  question: string;
  snippet: string;
  fullResponse: string;
  savedAt: number;
  traditionFocus?: string;
}
