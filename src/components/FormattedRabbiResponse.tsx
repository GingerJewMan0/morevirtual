import React, { useState, useEffect } from 'react';
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

interface FormattedRabbiResponseProps {
  content: string;
  isStreaming?: boolean;
  onAskFollowUp?: (questionText: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

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

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsLoadingAudio(false);
      return;
    }

    setIsLoadingAudio(true);
    window.speechSynthesis.cancel();

    const cleanText = content
      .replace(/[#*`_~]/g, '')
      .replace(/🔴|🟡|🟢|🔹/g, '')
      .slice(0, 1000);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const currentLang = 
      (typeof window !== 'undefined' && document.documentElement.lang) || 
      (navigator.language ? navigator.language.substring(0, 2) : 'es');

    const langMap: Record<string, string> = {
      es: 'es-ES',
      en: 'en-US',
      he: 'he-IL',
      pt: 'pt-BR',
      fr: 'fr-FR',
    };
    const fullLang = langMap[currentLang] || 'es-ES';
    utterance.lang = fullLang;

    let availableVoices: any[] = window.speechSynthesis.getVoices() || [];
    const voice =
      availableVoices.find((v) => v.lang.startsWith(currentLang) && (v.name.toLowerCase().includes('male') || v.name.includes('Pablo') || v.name.includes('Raul') || v.name.includes('Alvaro') || v.name.includes('Jorge') || v.name.includes('Carlos'))) ||
      availableVoices.find((v) => v.lang === fullLang && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft'))) ||
      availableVoices.find((v) => v.lang === fullLang) ||
      availableVoices[0];

    if (voice) utterance.voice = voice;
    
    utterance.rate = 0.92;
    utterance.pitch = 0.75;

    utterance.onstart = () => {
      setIsLoadingAudio(false);
      setIsPlayingAudio(true);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsLoadingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsLoadingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  };

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

          if (trimmed.includes('🔴 OBLIGATORIO') || trimmed.includes('🔴 Obligatorio')) {
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl border-l-4 border-l-red-600 bg-red-50/80 dark:bg-red-950/30 border border-red-200/60 dark:border-red-900/40 shadow-xs"
              >
                <div className="flex items-center gap-2 text-red-900 dark:text-red-300 font-bold text-sm">
                  <span>🔴</span>
                  <span>{t('mandatoryTitle', 'OBLIGATORIO')} (Deoraita / Derabanan)</span>
                </div>
                <div className="text-xs text-red-950 dark:text-red-200 mt-1 pl-6">
                  {formatInlineText(trimmed.replace(/🔴\s*OBLIGATORIO:?/i, ''))}
                </div>
              </div>
            );
          }

          if (trimmed.includes('🟡 COSTUMBRE') || trimmed.includes('🟡 Costumbre')) {
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl border-l-4 border-l-amber-500 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 shadow-xs"
              >
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                  <span>🟡</span>
                  <span>{t('customTitle', 'COSTUMBRE (MINHAG)')}</span>
                </div>
                <div className="text-xs text-amber-950 dark:text-amber-200 mt-1 pl-6">
                  {formatInlineText(trimmed.replace(/🟡\s*COSTUMBRE(\s*\(MINHAG\))?:?/i, ''))}
                </div>
              </div>
            );
          }

          if (
            trimmed.includes('🟢 OPCIONAL') ||
            trimmed.includes('🟢 Opcional') ||
            trimmed.includes('🟢 HUMRA') ||
            trimmed.includes('🟢 JUMRÁ')
          ) {
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl border-l-4 border-l-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 shadow-xs"
              >
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm">
                  <span>🟢</span>
                  <span>{t('optionalTitle', 'OPCIONAL / HUMRÁ')} (Midat Jasidut)</span>
                </div>
                <div className="text-xs text-emerald-950 dark:text-emerald-200 mt-1 pl-6">
                  {formatInlineText(trimmed.replace(/🟢\s*(OPCIONAL\s*\/?\s*HUMRA|JUMRÁ):?/i, ''))}
                </div>
              </div>
            );
          }

          if (trimmed.startsWith('### ')) {
            return (
              <h4
                key={idx}
                className="text-base font-bold text-amber-900 dark:text-amber-400 font-serif pt-2 border-b border-amber-100 dark:border-slate-800 pb-1"
              >
                {formatInlineText(trimmed.replace('### ', ''))}
              </h4>
            );
          }

          if (trimmed.startsWith('## ')) {
            return (
              <h3
                key={idx}
                className="text-lg font-bold text-slate-900 dark:text-slate-100 font-serif pt-3 pb-1"
              >
                {formatInlineText(trimmed.replace('## ', ''))}
              </h3>
            );
          }

          const isMaguenDavid = trimmed.match(/(\*\*|\b)(Maguen David|Jalabí|Alepo)(\*\*|\b)/i);
          const isMonteSinai = trimmed.match(/(\*\*|\b)(Monte Sinai|Shamí|Damasco)(\*\*|\b)/i);
          const isSefaradi = trimmed.match(/(\*\*|\b)(Sefaradí|Sefardí|Maran)(\*\*|\b)/i);
          const isAshkenazi = trimmed.match(/(\*\*|\b)(Ashkenazí|Asquenazí|Ramá)(\*\*|\b)/i);
          const isChabad = trimmed.match(/(\*\*|\b)(Jabad|Chabad|Lubavitch|Alter Rebe)(\*\*|\b)/i);

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2 my-1.5">
                <span className="text-amber-600 dark:text-amber-400 font-bold text-sm leading-none mt-1">
                  •
                </span>
                <div className="flex-1">
                  {isMaguenDavid && (
                    <span className="inline-block mr-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      🏛️ Maguen David (Jalabí)
                    </span>
                  )}
                  {isMonteSinai && (
                    <span className="inline-block mr-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700">
                      🌄 Monte Sinai (Shamí)
                    </span>
                  )}
                  {isSefaradi && !isMaguenDavid && !isMonteSinai && (
                    <span className="inline-block mr-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                      📜 Sefaradí
                    </span>
                  )}
                  {isAshkenazi && (
                    <span className="inline-block mr-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                      🕯️ Ashkenazí
                    </span>
                  )}
                  {isChabad && (
                    <span className="inline-block mr-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                      🔥 Jabad Lubavitch
                    </span>
                  )}
                  {formatInlineText(trimmed.slice(2))}
                </div>
              </div>
            );
          }

          const isHebrew = /[\u0590-\u05FF]/.test(trimmed);

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

        {reflectionText && (
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/50 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-900/20 border-2 border-amber-300/80 dark:border-amber-700/60 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 mb-2 text-amber-900 dark:text-amber-300 font-serif font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
              <span>{t('reflectiveQuestionTitle', 'Pregunta para Reflexionar y Continuar el Diálogo')}</span>
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