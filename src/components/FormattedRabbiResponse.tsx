/**
 * ============================================================================
 * COMPONENTE DE RESPUESTA FORMATEADA DEL RABINO (FormattedRabbiResponse.tsx)
 * ============================================================================
 * Propósito: Renderiza la respuesta de la IA aplicando formato enriquecido en 
 * Markdown, resaltando bloques halájicos (obligatorio, costumbre, opcional),
 * manejando la síntesis de voz neuronal (Text-to-Speech con ElevenLabs) y 
 * ofreciendo herramientas interactivas como copia de texto, marcadores y preguntas de reflexión.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Propiedades requeridas por el componente FormattedRabbiResponse.
 */
interface FormattedRabbiResponseProps {
  /** Texto plano o estructurado devuelto por el modelo de IA. */
  content: string;
  /** Indica si la respuesta actual se encuentra en proceso de streaming en tiempo real. */
  isStreaming?: boolean;
  /** Callback opcional para enviar una pregunta de seguimiento basada en la reflexión. */
  onAskFollowUp?: (questionText: string) => void;
  /** Estado que indica si la respuesta ha sido guardada en favoritos/notas. */
  isBookmarked?: boolean;
  /** Callback para alternar el estado de guardado de la enseñanza. */
  onToggleBookmark?: () => void;
}

/**
 * Componente principal FormattedRabbiResponse para mostrar y dar formato interactivo
 * a las respuestas del asistente rabínico.
 */
export function FormattedRabbiResponse({
  content,
  isStreaming,
  onAskFollowUp,
  isBookmarked,
  onToggleBookmark,
}: FormattedRabbiResponseProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  
  // Referencia mutable para controlar el elemento de audio HTML y su reproducción
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Diccionario de títulos localizados para la sección de preguntas de reflexión
  const reflectionTitles: Record<string, string> = {
    he: 'שאלה להתבוננות ולהמשך הדיון',
    en: 'Question for Reflection and Continuing the Dialogue',
    fr: 'Question de Réflexion et Continuation du Dialogue',
    pt: 'Pergunta para Refletir e Continuar o Diálogo',
    es: 'Pregunta para Reflexionar y Continuar el Diálogo',
  };

  // Obtención del idioma actual de la interfaz (con respaldo a español)
  const currentLang = (localStorage.getItem('i18nextLng') || 'es').substring(0, 2);
  const reflectionTitle = reflectionTitles[currentLang] || reflectionTitles.es;

  /**
   * Efecto secundario para limpiar y pausar el audio al desmontar el componente.
   */
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  /**
   * Copia el contenido completo de la respuesta al portapapeles del dispositivo
   * y activa temporalmente el indicador visual de éxito.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Gestiona la reproducción y pausa de la voz neuronal mediante el servicio de ElevenLabs.
   * Solicita el audio en formato base64 al backend, construye un objeto Blob y lo reproduce.
   */
  const handleToggleAudio = async () => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlayingAudio(false);
      return;
    }

    setIsLoadingAudio(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error en el servidor: ${errText}`);
      }

      const data = await response.json();
      if (!data.audioBase64) throw new Error('No se recibió audio de ElevenLabs');

      // Conversión de la cadena base64 a un buffer de bytes binarios
      const binaryString = atob(data.audioBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Creación del Blob de audio y URL temporal
      const audioBlob = new Blob([bytes], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Evento al finalizar la reproducción del audio
      audio.onended = () => {
        setIsPlayingAudio(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
      };

      // Manejo de errores durante la reproducción
      audio.onerror = (e) => {
        console.error('Error al reproducir audio de ElevenLabs:', e);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
        setIsPlayingAudio(false);
      };

      await audio.play();
      setIsPlayingAudio(true);
    } catch (e) {
      console.error('Fallo al obtener la voz neuronal:', e);
      alert('Hubo un error al conectar con ElevenLabs. Revisa la consola.');
      setIsPlayingAudio(false);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  /**
   * Parsea y formatea el texto plano de la respuesta línea por línea,
   * identificando encabezados, listas, insignias comunitarias y bloques halájicos.
   * @returns Elementos JSX estructurados para el renderizado del mensaje.
   */
  const renderFormattedContent = () => {
    const reflectionMatch = content.match(
      /(?:(?:Pregunta|Preguntas)\s+para\s+reflexionar|שאלה\s+למחשבה|Question\s+(?:for\s+reflection|to\s+reflect\s+on)|Pergunta\s+para\s+reflexão|Question\s+pour\s+réfléchir)[\s\S]*$/i
    );

    let mainText = content;
    let reflectionText = '';

    if (reflectionMatch && reflectionMatch.index !== undefined && !isStreaming) {
      mainText = content.slice(0, reflectionMatch.index).trim();
      reflectionText = content.slice(reflectionMatch.index).trim();
    }

    const lines = mainText.split('\n');

    return (
      <div className="space-y-3.5 text-slate-800 dark:text-slate-200 text-[14.5px] leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-2" />;

          // Bloque Obligatorio dinámico (Soporta español e hebreo)
          if (trimmed.match(/🔴\s*(OBLIGATORIO|חובה)/i)) {
            const isHebrewLine = /[\u0590-\u05FF]/.test(trimmed);
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl border-l-4 border-l-red-600 bg-red-50/80 dark:bg-red-950/30 border border-red-200/60 dark:border-red-900/40 shadow-xs"
                dir={isHebrewLine ? 'rtl' : 'ltr'}
              >
                <div className={`flex items-center gap-2 text-red-900 dark:text-red-300 font-bold text-sm ${isHebrewLine ? 'flex-row-reverse text-right' : ''}`}>
                  <span>🔴</span>
                  <span>{isHebrewLine ? 'חובה (OBLIGATORIO)' : `${t('mandatoryTitle', 'OBLIGATORIO')} (Deoraita / Derabanan)`}</span>
                </div>
                <div className={`text-xs text-red-950 dark:text-red-200 mt-1 ${isHebrewLine ? 'text-right pr-6' : 'pl-6'}`}>
                  {formatInlineText(trimmed.replace(/🔴\s*(OBLIGATORIO|חובה):?/i, ''))}
                </div>
              </div>
            );
          }

          // Bloque Costumbre dinámico (Soporta español e hebreo)
          if (trimmed.match(/🟡\s*(COSTUMBRE|מנהג)/i)) {
            const isHebrewLine = /[\u0590-\u05FF]/.test(trimmed);
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl border-l-4 border-l-amber-500 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 shadow-xs"
                dir={isHebrewLine ? 'rtl' : 'ltr'}
              >
                <div className={`flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm ${isHebrewLine ? 'flex-row-reverse text-right' : ''}`}>
                  <span>🟡</span>
                  <span>{isHebrewLine ? 'מנהג (COSTUMBRE)' : `${t('customTitle', 'COSTUMBRE (MINHAG)')}`}</span>
                </div>
                <div className={`text-xs text-amber-950 dark:text-amber-200 mt-1 ${isHebrewLine ? 'text-right pr-6' : 'pl-6'}`}>
                  {formatInlineText(trimmed.replace(/🟡\s*(COSTUMBRE(\s*\(MINHAG\))?|מנהג):?/i, ''))}
                </div>
              </div>
            );
          }

          // Bloque Opcional / Humrá dinámico (Soporta español e hebreo)
          if (
            trimmed.match(/🟢\s*(OPCIONAL|HUMRA|JUMRÁ|הידור|רשות)/i)
          ) {
            const isHebrewLine = /[\u0590-\u05FF]/.test(trimmed);
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl border-l-4 border-l-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 shadow-xs"
                dir={isHebrewLine ? 'rtl' : 'ltr'}
              >
                <div className={`flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm ${isHebrewLine ? 'flex-row-reverse text-right' : ''}`}>
                  <span>🟢</span>
                  <span>{isHebrewLine ? 'הידור / רשות (OPCIONAL)' : `${t('optionalTitle', 'OPCIONAL / HUMRÁ')} (Midat Jasidut)`}</span>
                </div>
                <div className={`text-xs text-emerald-950 dark:text-emerald-200 mt-1 ${isHebrewLine ? 'text-right pr-6' : 'pl-6'}`}>
                  {formatInlineText(trimmed.replace(/🟢\s*(OPCIONAL\s*\/?\s*HUMRA|JUMRÁ|הידור|רשות):?/i, ''))}
                </div>
              </div>
            );
          }

          if (trimmed.startsWith('### ')) {
            const isHebrew = /[\u0590-\u05FF]/.test(trimmed);
            return (
              <h4
                key={idx}
                className={`text-base font-bold text-amber-900 dark:text-amber-400 font-serif pt-2 border-b border-amber-100 dark:border-slate-800 pb-1 ${isHebrew ? 'text-right' : ''}`}
                dir={isHebrew ? 'rtl' : 'ltr'}
              >
                {formatInlineText(trimmed.replace('### ', ''))}
              </h4>
            );
          }

          if (trimmed.startsWith('## ')) {
            const isHebrew = /[\u0590-\u05FF]/.test(trimmed);
            return (
              <h3
                key={idx}
                className={`text-lg font-bold text-slate-900 dark:text-slate-100 font-serif pt-3 pb-1 ${isHebrew ? 'text-right' : ''}`}
                dir={isHebrew ? 'rtl' : 'ltr'}
              >
                {formatInlineText(trimmed.replace('## ', ''))}
              </h3>
            );
          }

          // Detección de menciones a tradiciones específicas para insertar insignias visuales
          const isMaguenDavid = trimmed.match(/(\*\*|\b)(Maguen David|Jalabí|Alepo)(\*\*|\b)/i);
          const isMonteSinai = trimmed.match(/(\*\*|\b)(Monte Sinai|Shamí|Damasco)(\*\*|\b)/i);
          const isSefaradi = trimmed.match(/(\*\*|\b)(Sefaradí|Sefardí|Maran)(\*\*|\b)/i);
          const isAshkenazi = trimmed.match(/(\*\*|\b)(Ashkenazí|Asquenazí|Ramá)(\*\*|\b)/i);
          const isChabad = trimmed.match(/(\*\*|\b)(Jabad|Chabad|Lubavitch|Alter Rebe)(\*\*|\b)/i);
          const isHebrew = /[\u0590-\u05FF]/.test(trimmed);

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div 
                key={idx} 
                className={`flex items-start gap-2.5 my-1.5 ${isHebrew ? 'flex-row-reverse text-right pr-2' : 'pl-2'}`}
                dir={isHebrew ? 'rtl' : 'ltr'}
              >
                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm leading-none mt-1">
                  •
                </span>
                <div className="flex-1">
                  {isMaguenDavid && (
                    <span className="inline-block mx-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      🏛️ Maguen David (Jalabí)
                    </span>
                  )}
                  {isMonteSinai && (
                    <span className="inline-block mx-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700">
                      🌄 Monte Sinai (Shamí)
                    </span>
                  )}
                  {isSefaradi && !isMaguenDavid && !isMonteSinai && (
                    <span className="inline-block mx-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                      📜 Sefaradí
                    </span>
                  )}
                  {isAshkenazi && (
                    <span className="inline-block mx-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                      🕯️ Ashkenazí
                    </span>
                  )}
                  {isChabad && (
                    <span className="inline-block mx-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                      🔥 Jabad Lubavitch
                    </span>
                  )}
                  {formatInlineText(trimmed.slice(2))}
                </div>
              </div>
            );
          }
          return (
            <p
              key={idx}
              className={`${isHebrew ? 'text-right font-serif text-[16px]' : ''}`}
              dir={isHebrew ? 'rtl' : 'ltr'}
            >
              {formatInlineText(trimmed)}
            </p>
          );
        })}

        {/* Sección de Pregunta para Reflexión */}
        {reflectionText && (
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/50 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-900/20 border-2 border-amber-300/80 dark:border-amber-700/60 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 mb-2 text-amber-900 dark:text-amber-300 font-serif font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
              <span>{reflectionTitle}</span>
            </div>
            <div className="text-sm italic text-slate-800 dark:text-slate-200 leading-relaxed pl-2 border-l-2 border-amber-400">
              {formatInlineText(
                reflectionText.replace(
                  /^(?:###\s*)?(?:(?:Pregunta|Preguntas)\s+para\s+reflexionar|שאלה\s+למחשבה|Question\s+(?:for\s+reflection|to\s+reflect\s+on)|Pergunta\s+para\s+reflexão|Question\s+pour\s+réfléchir):?\s*/i,
                  ''
                )
              )}
            </div>

            {onAskFollowUp && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    const qClean = reflectionText
                      .replace(
                        /^(?:###\s*)?(?:(?:Pregunta|Preguntas)\s+para\s+reflexionar|שאלה\s+למחשבה|Question\s+(?:for\s+reflection|to\s+reflect\s+on)|Pergunta\s+para\s+reflexão|Question\s+pour\s+réfléchir):?\s*/i,
                        ''
                      )
                      .trim();
                    onAskFollowUp(qClean);
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t('answerThisQuestion', 'Responder a esta pregunta')}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  /**
   * Da formato a elementos inline dentro del texto (negritas, cursivas y fragmentos de código).
   * @param text - Cadena de texto a formatear.
   * @returns Nodos React con etiquetas HTML apropiadas.
   */
  const formatInlineText = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-slate-700 dark:text-slate-300">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-amber-700 dark:text-amber-300"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="relative group">
      {renderFormattedContent()}

      {/* Barra de herramientas inferior (Audio, Copiar y Marcador) */}
      {!isStreaming && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleAudio}
              disabled={isLoadingAudio}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
              title={t('listenAudio', 'Escuchar respuesta con voz rabínica')}
            >
              {isLoadingAudio ? (
                <span className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
              ) : isPlayingAudio ? (
                <VolumeX className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
              <span>{isPlayingAudio ? t('pauseVoice', 'Pausar voz') : t('listen', 'Escuchar')}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={t('copyText', 'Copiar texto')}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {onToggleBookmark && (
              <button
                onClick={onToggleBookmark}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition cursor-pointer"
                title={isBookmarked ? t('savedInNotes', 'Guardada en notas') : t('saveTeaching', 'Guardar enseñanza')}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormattedRabbiResponse;