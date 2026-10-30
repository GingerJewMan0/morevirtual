/**
 * Rabino Virtual — ParashaTab
 * Datos: ../data/parashot.ts (54 parashot, aliyot, Rashi, Jabad y 10 lecciones).
 * i18n: react-i18next; las claves ausentes muestran el texto español original.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Scroll, BookOpen, Flame, Sparkles, MessageSquare, ChevronRight, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  PARASHOT_DATA,
  fetchWeeklyParasha,
  translateParasha,
  type WeeklyParasha,
} from '../data/parashot';
import { requestNotificationPermissions } from '../utils/notifications';

const handleRequestPermission = async () => {
  const granted = await requestNotificationPermissions();
  if (granted) {
    // Aquí llamas a tu función de producción real:
    // await scheduleShabbatAlert(fechaCalculadaShabat, nombreParashaActual);
    
    alert("¡Permisos concedidos con éxito! Recibirás los avisos de Shabat automáticamente.");
  } else {
    alert("Los permisos fueron denegados. Puedes habilitarlos manualmente en la configuración de tu teléfono.");
  }
};

type SubTab = 'summary' | 'aliyot' | 'rashi' | 'jasidut';

interface ParashaTabProps {
  onAskAboutParasha: (questionText: string) => void;
  /** true para el calendario de Israel, false (por defecto) para la diáspora. */
  israel?: boolean;
}

const BOOKS = ['Bereshit', 'Shemot', 'Vayikra', 'Bamidbar', 'Devarim'] as const;
const cleanText = (text: string): string => (text || '').split('[cite:')[0].trim();

export function ParashaTab({ onAskAboutParasha, israel = false }: ParashaTabProps) {
  const { t, i18n } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>(PARASHOT_DATA[0].id);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('summary');
  const [weekly, setWeekly] = useState<WeeklyParasha | null>(null);
  const [weeklyLoading, setWeeklyLoading] = useState(true);
  const userChangedSelection = useRef(false);

  // Conserva las claves i18n ya utilizadas por esta pantalla.
  const ui = (key: string, fallback: string): string => t(key, { defaultValue: fallback });
  // La referencia a i18n.language permite refrescar cuando el usuario cambia idioma.
  const language = i18n.resolvedLanguage ?? i18n.language;

  // Los ordinales de las aliyot se ajustan al idioma seleccionado.
  const aliyahNumberLabel = (number: number): string => {
    const lang = language.toLowerCase();
    if (lang.startsWith('en')) {
      const suffix = number === 1 ? 'st' : number === 2 ? 'nd' : number === 3 ? 'rd' : 'th';
      return `${number}${suffix}`;
    }
    if (lang.startsWith('fr')) return `${number}${number === 1 ? 're' : 'e'}`;
    if (lang.startsWith('he')) return String(number);
    return `${number}ª`;
  };
  const aliyahLabel = (number: number): string =>
    language.toLowerCase().startsWith('he')
      ? `${ui('aliyahName', 'עלייה')} ${number}`
      : `${aliyahNumberLabel(number)} ${ui('aliyahName', 'Aliyah')}`;

  const parasha = useMemo(() => {
    const source = PARASHOT_DATA.find(p => p.id === selectedId) ?? PARASHOT_DATA[0];
    return translateParasha(source, (key, fallback) => t(key, { defaultValue: fallback }));
  }, [selectedId, language, t]);

  useEffect(() => {
    let alive = true;
    setWeeklyLoading(true);
    fetchWeeklyParasha(new Date(), israel).then((value) => {
      if (!alive) return;
      setWeekly(value);
      if (value && !userChangedSelection.current) {
        setSelectedId(value.ids[0]);
      }
      setWeeklyLoading(false);
    });
    return () => { alive = false; };
  }, [israel]);

  const isSelectedWeekly = weekly?.ids.includes(selectedId) ?? false;
  const combinedNames = weekly?.ids.map(id => {
    const p = PARASHOT_DATA.find(item => item.id === id);
    return p ? t(`parashot.${p.id}.name`, { defaultValue: p.name }) : id;
  }).join(' + ');

  const changeSelection = (id: string) => {
    userChangedSelection.current = true;
    setSelectedId(id);
  };

  const ask = (message: string) => onAskAboutParasha(message);
  const nameForAsk = (PARASHOT_DATA.find(p => p.id === selectedId) ?? PARASHOT_DATA[0]).name;

  // El ordinal se adapta al idioma; evita mezclar «1ª» (español) con «Aliyah» (inglés).
  const aliyahTitle = (number: number): string => {
    const lng = language.toLowerCase().split('-')[0];
    const term = ui('aliyahName', 'Aliyá');
    if (lng === 'he') return `${term} ${number}`;
    if (lng === 'en') {
      const suffix = number % 100 >= 11 && number % 100 <= 13 ? 'th'
        : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[number % 10] ?? 'th';
      return `${number}${suffix} ${term}`;
    }
    if (lng === 'fr') return `${number === 1 ? '1re' : `${number}e`} ${term}`;
    return `${number}ª ${term}`;
  };

  return (
    <div dir={language.toLowerCase().startsWith('he') ? 'rtl' : 'ltr'} className="max-w-5xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/30 shadow-xl text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider flex-wrap">
              <Scroll className="w-4 h-4" />
              <span>{cleanText(ui(`books.${parasha.book}`, `Sefer ${parasha.book} (${parasha.bookSpanish})`))}</span>
              {isSelectedWeekly && (
                <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                  ✨ {ui('currentWeeklyParasha', 'Parashá de esta semana')}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
                {cleanText(parasha.name)}
              </h1>
              {!language.toLowerCase().startsWith('he') && <span className="text-2xl sm:text-3xl font-serif text-amber-400" dir="rtl">
                {cleanText(parasha.hebrewName)}
              </span>}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 pt-1">
              <strong>{ui('readParasha', 'Lectura')}:</strong> {cleanText(parasha.reference)}
              {' | '}<strong>{ui('haftarah', 'Haftará')}:</strong> {cleanText(parasha.haftarah)}
            </p>
            {isSelectedWeekly && weekly && weekly.ids.length > 1 && (
              <p className="text-xs text-amber-200">
                {ui('combinedWeeklyReading', 'Lectura semanal combinada')}: {combinedNames}.
                {' '}{ui('combinedReadingHint', 'Selecciona cada porción para estudiar su contenido.')}
              </p>
            )}
            {!weeklyLoading && !weekly && (
              <p className="text-xs text-slate-400">
                {ui('weeklyParashaUnavailable', 'No se pudo confirmar la lectura semanal con Hebcal. Puedes elegir una parashá del listado.')}
              </p>
            )}
          </div>
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-amber-500/40 space-y-1.5 shrink-0">
            <label htmlFor="parasha-selector" className="block text-[11px] font-bold uppercase tracking-wider text-amber-400">
              {ui('selectParasha', 'Seleccionar Parashá:')}
            </label>
            <select
              id="parasha-selector"
              value={selectedId}
              onChange={e => changeSelection(e.target.value)}
              className="w-full bg-slate-800 text-amber-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 border border-amber-500/40 focus:outline-none focus:border-amber-400 cursor-pointer max-w-[260px]"
            >
              {BOOKS.map(book => (
                <optgroup key={book} label={ui(`books.${book}`, `Sefer ${book} (${PARASHOT_DATA.find(p => p.book === book)?.bookSpanish ?? book})`)}>
                  {PARASHOT_DATA.filter(p => p.book === book).map(p => (
                    <option key={p.id} value={p.id}>
                      {t(`parashot.${p.id}.name`, { defaultValue: p.name })}{!language.toLowerCase().startsWith('he') ? ` (${p.hebrewName})` : ''}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {([
          { id: 'summary' as SubTab, label: ui('summaryTab', 'Resumen y Temas'), icon: BookOpen },
          { id: 'aliyot' as SubTab, label: ui('aliyotTab', 'Aliyot (Lectura)'), icon: Layers },
          { id: 'rashi' as SubTab, label: ui('rashiTab', 'Perla de Rashi'), icon: Sparkles },
          { id: 'jasidut' as SubTab, label: ui('chabadTab', 'Jasidut (Jabad)'), icon: Flame },
        ]).map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {activeSubTab === 'summary' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fadeIn">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
              {ui('summaryOf', 'Resumen de Parashat')} {cleanText(parasha.name)}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{cleanText(parasha.summary)}</p>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">
                {ui('halachaCentralPoint', 'Punto Central de Halajá y Vida Judía:')}
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{cleanText(parasha.halachaFocus)}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500 italic">
                {ui('askAboutParashaPrompt', '¿Deseas profundizar en algún pasuk, halajá o comentario de esta Parashá?')}
              </span>
              <button
                onClick={() => ask(`Explícame con mayor profundidad los detalles y enseñanzas centrales de la parashá ${nameForAsk}.`)}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{ui('consultRabbiParasha', 'Consultar al Rabino sobre')} {cleanText(parasha.name)}</span>
              </button>
            </div>
          </div>
        )}

        {activeSubTab === 'aliyot' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
              {parasha.aliyot.length === 7
                ? ui('aliyotBreakdown', 'División de las 7 Aliyot')
                : ui('aliyotBreakdownActual', 'Aliyot disponibles de esta parashá')}
              ({parasha.aliyot.length})
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {parasha.aliyot.map(aliyah => (
                <div key={aliyah.number} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-bold text-xs">
                        {aliyahLabel(aliyah.number)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">{cleanText(aliyah.description)}</p>
                  </div>
                  <span className="shrink-0 inline-block px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-mono font-semibold text-xs border border-slate-200 dark:border-slate-700">
                    {cleanText(aliyah.reference)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => ask(`Explícame detalladamente las ${parasha.aliyot.length} aliyot de la parashá ${nameForAsk} y su significado místico y halájico.`)}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{ui('consultAliyot', 'Consultar al Rabino sobre las Aliyot')}</span>
              </button>
            </div>
          </div>
        )}

        {activeSubTab === 'rashi' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {ui('rashiInsightTitle', 'Enseñanza de Rashi (Rabí Shelomó Itzjakí)')}
              </h2>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-l-4 border-amber-600 text-slate-800 dark:text-slate-200 italic font-serif text-base leading-relaxed">
              “{cleanText(parasha.rashiInsight)}”
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500 italic">
                {ui('rashiPrompt', '¿Quieres profundizar en los matices lingüísticos y exegéticos de Rashi?')}
              </span>
              <button
                onClick={() => ask(`Analiza el comentario de Rashi en ${nameForAsk} y explícame su profundidad exegética.`)}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{ui('consultRashi', 'Consultar sobre Rashi')}</span>
              </button>
            </div>
          </div>
        )}

        {activeSubTab === 'jasidut' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{ui('chabadInsightTitle', 'Dimensión Espiritual y Jasídica (Jabad Lubavitch)')} — {cleanText(parasha.name)}</span>
            </h2>
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
              {cleanText(parasha.chabadInsight)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parasha.jasidicLessons.map((lesson, index) => (
                <div key={`${selectedId}-${index}`} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-xs flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-sm text-amber-700 dark:text-amber-400 leading-snug">{cleanText(lesson.title)}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{cleanText(lesson.snippet)}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                    <button
                      onClick={() => ask(`Explícame en detalle la enseñanza jasídica "${lesson.title}" correspondiente a ${nameForAsk}.`)}
                      className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>{ui('exploreWithRabbi', 'Profundizar con el Rabino')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* 🌟 Botón para activar las notificaciones de Shabat */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={handleRequestPermission}
          className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 px-4 rounded-xl shadow transition w-full"
        >
          🔔 Activar Notificaciones de Shabat
        </button>
      </div>
    </div>
  );
}

export default ParashaTab;
