/**
 * ============================================================================
 * MÓDULO DE DEFINICIONES DE TIPOS Y MODELOS DE DATOS (types.ts)
 * ============================================================================
 * Propósito: Proveer los contratos de TypeScript (tipos e interfaces) que 
 * estructuran los mensajes de chat, las tradiciones comunitarias, los niveles 
 * halájicos y las notas guardadas en todo el sistema del Rabino Virtual.
 */

/**
 * Define los roles posibles de los participantes en el chat.
 * - 'user': Representa la consulta o mensaje enviado por el usuario.
 * - 'assistant': Representa la respuesta generada por el Rabino Virtual.
 */
export type Role = 'user' | 'assistant';

/**
 * Identificadores únicos para las diferentes vertientes y tradiciones comunitarias
 * soportadas por la plataforma (incluyendo opción global y comunidades específicas).
 */
export type TraditionId = 'all' | 'sefaradi' | 'ashkenazi' | 'maguen_david' | 'monte_sinai' | 'chabad';

/**
 * Estructura de información detallada para cada tradición comunitaria.
 * Utilizada para poblar guías, contextos históricos, autoridades y estilos visuales.
 */
export interface TraditionInfo {
  id: TraditionId;            // Identificador único de la tradición
  name: string;               // Nombre principal de la comunidad / vertiente
  subname: string;            // Subtítulo o descripción breve de origen
  origin: string;             // Región geográfica o raíz histórica
  badgeClass: string;         // Clases CSS de Tailwind para las insignias
  borderClass: string;        // Clases CSS de Tailwind para los bordes temáticos
  bgLightClass: string;       // Clases CSS de Tailwind para fondos claros
  textClass: string;          // Clases CSS de Tailwind para color de texto
  icon: string;               // Nombre o referencia del icono representativo
  authorities: string[];      // Lista de principales Poskim (sabios/autoridades)
  keyTraits: string;          // Rasgos filosóficos y metodológicos distintivos
  historicalContext: string;  // Reseña del contexto histórico y desarrollo
  examples: string[];         // Ejemplos característicos de costumbres y halajá
}

/**
 * Estructura de datos que modela un mensaje individual dentro del historial de chat.
 */
export interface ChatMessage {
  id: string;                         // Identificador único del mensaje
  role: Role;                         // Rol (usuario o asistente)
  content: string;                    // Contenido textual principal del mensaje
  translations?: Record<string, string>; // Traducciones opcionales del mensaje en otros idiomas
  timestamp: number;                  // Marca de tiempo (milisegundos) de envío
  traditionFocus?: TraditionId;       // Vertiente comunitaria enfocada en la respuesta
  isStreaming?: boolean;              // Indica si el mensaje se está escribiendo en tiempo real
  isError?: boolean;                  // Indica si ocurrió un error en la solicitud
  errorQuery?: string;                // Consulta original que generó el error (si aplica)
}

/**
 * Estructura para la clasificación pedagógica de la halajá.
 * Permite distinguir visualmente el grado de obligatoriedad de una ley o costumbre.
 */
export interface HalachicClassification {
  level: 'obligatorio' | 'costumbre' | 'opcional'; // Nivel normativo (🔴, 🟡, 🟢)
  title: string;                                   // Título descriptivo del nivel
  description: string;                             // Explicación halájica de la categoría
  color: string;                                   // Color distintivo (ej. rojo, amarillo, verde)
  icon: string;                                    // Icono representativo
}

/**
 * Estructura de datos para las enseñanzas y respuestas guardadas por el usuario.
 */
export interface SavedNote {
  id: string;                 // Identificador único de la nota guardada
  question: string;           // Pregunta original realizada al Rabino Virtual
  snippet: string;            // Extracto o resumen corto de la respuesta
  fullResponse: string;       // Respuesta completa almacenada
  savedAt: number;            // Marca de tiempo de cuándo fue guardada
  traditionFocus?: string;    // Tradición comunitaria vinculada a la enseñanza
}