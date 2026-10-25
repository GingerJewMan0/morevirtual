/**
 * ============================================================================
 * COMPONENTE DE PESTAÑA DE PARASHÁ (ParashaTab.tsx)
 * ============================================================================
 * Propósito: Muestra el contenido detallado de la porción semanal de la Torá (Parashá),
 * organizando la información en subpestañas (Resumen, Aliyot, Rashi y Jasidut/Jabad).
 * Incluye traducción dinámica asistida por IA según el idioma activo del usuario.
 */

import { useState, useEffect } from 'react';
import { Scroll, Music, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PARASHOT_DATA } from '../data/parashot.ts';

/**
 * Propiedades requeridas por el componente ParashaTab.
 */
interface ParashaTabProps {
  /** Callback para iniciar una consulta directa con el asistente sobre la Parashá actual. */
  onAskAboutParasha: (question: string) => void;
}

/**
 * Función auxiliar para calcular de forma automática la Parashá de la semana actual.
 */
function getCurrentParashaId(): string {
  const today = new Date();
  const startYearDate = new Date(today.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((today.getTime() - startYearDate.getTime()) / 86400000 + startYearDate.getDay() + 1) / 7);
  const index = weekNumber % PARASHOT_DATA.length;
  return PARASHOT_DATA[index]?.id || 'bereshit';
}

/**
 * Componente principal ParashaTab para la visualización y estudio del Limud Torá Semanal.
 */
export function ParashaTab({ onAskAboutParasha }: ParashaTabProps) {
  const { t, i18n } = useTranslation();
  
  // Estado inicial temporal por defecto (mientras consulta internet)
  const [selectedParashaId, setSelectedParashaId] = useState<string>('lej_lejá');

  // Consulta automática por internet de la Parashá actual de la semana
  useEffect(() => {
    async function fetchWeeklyParasha() {
      try {
        const response = await fetch('https://www.hebcal.com/hebcal?v=1&cfg=json&geonameid=3530597&m=on&s=on');
        const data = await response.json();
        
        const parashaItem = data.items?.find((item: any) => item.category === 'parashat');
        
        if (parashaItem && parashaItem.title) {
          const rawTitle = parashaItem.title.replace('Parashat ', '').toLowerCase().trim();
          
          const matchedParasha = PARASHOT_DATA.find(p => 
            p.name.toLowerCase().includes(rawTitle) || 
            p.id.toLowerCase().includes(rawTitle.replace(/\s+/g, '_'))
          );

          if (matchedParasha) {
            setSelectedParashaId(matchedParasha.id);
          }
        }
      } catch (error) {
        console.error('Error al obtener la Parashá de internet:', error);
      }
    }

    fetchWeeklyParasha();
  }, []);
  
  // Estado local para la subpestaña activa dentro de la vista de la Parashá
  const [activeSubTab, setActiveSubTab] = useState<'resumen' | 'aliyot' | 'rashi' | 'chabad'>('resumen');

  // Búsqueda de la Parashá actual basada en el ID seleccionado (con respaldo a la primera por defecto)
  const parasha = PARASHOT_DATA.find((p) => p.id === selectedParashaId) || PARASHOT_DATA[0];
  
  // Obtención del código de idioma actual (ej. 'es', 'en', 'he')
  const currentLang = i18n.language?.substring(0, 2) || 'es';

  // Estados para gestionar la traducción dinámica asíncrona mediante IA
  const [translatedContent, setTranslatedContent] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  /**
   * Efecto secundario para realizar la traducción dinámica de la Parashá 
   * utilizando el endpoint del backend cuando el idioma no es español.
   */
  useEffect(() => {
    async function fetchParashaTranslation() {
      // Si el idioma es español, no se requiere traducción adicional
      if (currentLang === 'es') {
        setTranslatedContent(null);
        return;
      }

      setIsTranslating(true);
      try {
        const res = await fetch('/api/translate-parasha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            parashaName: parasha.name,
            reference: parasha.reference,
            targetLanguage: currentLang,
            originalSummary: parasha.summary,
            halachaFocus: parasha.halachaFocus,
            rashiInsight: parasha.rashiInsight,
            chabadInsight: parasha.chabadInsight,
            aliyot: parasha.aliyot,
          } as any)
        });
        const json = await res.json();
        if (json.success && json.data) {
          setTranslatedContent(json.data);
        }
      } catch (e) {
        console.error('Error traduciendo parashá con IA:', e);
      } finally {
        setIsTranslating(false);
      }
    }

    fetchParashaTranslation();
  }, [currentLang, selectedParashaId]);

  /**
   * Función auxiliar para extraer el texto localizado de un campo que puede ser un objeto multilingüe o un string.
   * @param field - Campo de texto o diccionario de traducciones.
   * @returns El texto correspondiente al idioma actual o español por defecto.
   */
  const getLocalized = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field['es'] || Object.values(field)[0] || '';
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-3 sm:px-4 space-y-6 overflow-x-hidden animate-fadeIn">
      
      {/* ==================================================================== */}
      {/* BANNER PRINCIPAL DE LA PARASHÁ Y SELECTOR (ESTRICTAMENTE SIN DESBORDE) */}
      {/* ==================================================================== */}
      <div className="w-full p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 text-white border border-amber-500/30 shadow-xl space-y-5 overflow-hidden box-border">
        
        {/* Encabezado: Secreto contra desbordamiento con flex-col en portrait y flex-row seguro en landscape */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 w-full">
          
          {/* Bloque de Títulos */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Scroll className="w-4 h-4 shrink-0" />
              <span className="truncate">Limud Torá Semanal • Sefer {getLocalized(parasha.bookSpanish)}</span>
            </div>
            
            {/* Título y hebreo envueltos de manera flexible para evitar cortes */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 w-full">
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-amber-200 break-words max-w-full">
                Parashat {getLocalized(parasha.name)}
              </h2>
              <span className="text-xl sm:text-3xl font-serif font-bold text-amber-400 shrink-0" dir="rtl">
                {parasha.hebrewName}
              </span>
            </div>
          </div>

          {/* Selector desplegable de Parashot 100% contenido */}
          <div className="flex flex-col items-start gap-1.5 w-full lg:w-72 shrink-0">
            <label className="text-xs text-amber-300 font-medium">{t('selectParasha', 'Seleccionar Parashá:')}</label>
            <select
              value={selectedParashaId}
              onChange={(e) => setSelectedParashaId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-amber-200 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-md truncate"
            >
              {PARASHOT_DATA.map((p) => (
                <option key={p.id} value={p.id} className="truncate">
                  {getLocalized(p.name)} ({p.hebrewName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Referencias y Haftará */}
        <div className="pt-3 border-t border-amber-500/20 text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1 w-full">
          <span><strong>{t('readParasha', 'Lectura')}:</strong> {parasha.reference}</span>
          <span>•</span>
          <span><strong>{t('haftarah', 'Haftará')}:</strong> {parasha.haftarah}</span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARRA DE PESTAÑAS SECUNDARIAS                                        */}
      {/* ==================================================================== */}
      <div className="w-full flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-2xl p-1.5 shadow-xs overflow-x-auto gap-1 scrollbar-none">
        <button
          onClick={() => setActiveSubTab('resumen')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'resumen'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📖 {t('summaryTab', 'Resumen y Temas')}
        </button>

        <button
          onClick={() => setActiveSubTab('aliyot')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'aliyot'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📜 {t('aliyotTab', '7 Aliyot (Lectura)')}
        </button>

        <button
          onClick={() => setActiveSubTab('rashi')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'rashi'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          💡 {t('rashiTab', 'Perla de Rashi')}
        </button>

        <button
          onClick={() => setActiveSubTab('chabad')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'chabad'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔥 {t('chabadTab', 'Jasidut (Jabad)')}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* CONTENIDO DE LA PESTAÑA ACTIVA                                      */}
      {/* ==================================================================== */}
      <div className="w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 overflow-hidden">
        
        {/* Subpestaña: Resumen y Temas */}
        {activeSubTab === 'resumen' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                {t('summaryOf', 'Resumen de Parashat')} {getLocalized(parasha.name)}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                {isTranslating ? '✨ Traduciendo contenido con IA...' : (translatedContent?.summary || parasha.summary)}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-800 dark:text-amber-300">
                {t('halachaCentralPoint', 'Punto Central de Halajá y Vida Judía:')}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium break-words">
                {isTranslating ? '...' : (translatedContent?.halachaFocus || parasha.halachaFocus)}
              </p>
            </div>
          </div>
        )}

        {/* Subpestaña: 7 Aliyot */}
        {activeSubTab === 'aliyot' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              {t('aliyotBreakdown', 'División de las 7 Aliyot en Shabat por la Mañana')}
            </h3>
            <div className="space-y-3">
              {parasha.aliyot.map((aliya, index) => {
                const targetAliya = translatedContent?.aliyot?.[index];
                const translatedDesc = typeof targetAliya === 'string' 
                  ? targetAliya 
                  : (targetAliya?.description || targetAliya?.text);

                return (
                  <div
                    key={aliya.number}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3.5 hover:border-amber-400 dark:hover:border-amber-700 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
                      {aliya.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {targetAliya?.title || `${aliya.number}ª Aliyá (${aliya.number === 1 ? 'Kohén' : aliya.number === 2 ? 'Leví' : 'Israel'})`}
                        </h4>
                        <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold shrink-0">
                          {aliya.reference}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed break-words">
                        {isTranslating ? '✨ Traduciendo Aliyot...' : (translatedDesc || aliya.description)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Subpestaña: Perla de Rashi */}
        {activeSubTab === 'rashi' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {t('rashiInsightTitle', 'Enseñanza de Rashi (Rabí Shelomó Itzjakí)')}
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <p className="font-serif italic text-base text-amber-900 dark:text-amber-300 break-words">
                "{isTranslating ? '✨ Traduciendo...' : (translatedContent?.rashiInsight || parasha.rashiInsight)}"
              </p>
            </div>
          </div>
        )}

        {/* Subpestaña: Jasidut / Jabad */}
        {activeSubTab === 'chabad' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {t('chabadInsightTitle', 'Dimensión Espiritual y Jasídica (Jabad Lubavitch)')}
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-slate-800/80 border border-rose-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <p className="font-serif text-base text-rose-950 dark:text-rose-200 break-words">
                {isTranslating ? '✨ Traduciendo...' : (translatedContent?.chabadInsight || parasha.chabadInsight)}
              </p>
            </div>
          </div>
        )}
        
        {/* Botón de consulta directa al Rabino */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            {t('askAboutParashaPrompt', '¿Deseas profundizar en algún pasuk, halajá o comentario de esta Parashá?')}
          </span>
          <button
            onClick={() => {
              onAskAboutParasha(
                `Rabino, me gustaría profundizar en las enseñanzas y halajot principales de Parashat ${getLocalized(parasha.name)}.`
              );
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('consultRabbiParasha', 'Consultar al Rabino sobre')} {getLocalized(parasha.name)}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default ParashaTab;