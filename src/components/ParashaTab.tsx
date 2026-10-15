import { useState, useEffect } from 'react';
import { Scroll, Music, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PARASHOT_DATA } from '../data/parashot.ts';

interface ParashaTabProps {
  onAskAboutParasha: (question: string) => void;
}

export function ParashaTab({ onAskAboutParasha }: ParashaTabProps) {
  const { t, i18n } = useTranslation();
  const [selectedParashaId, setSelectedParashaId] = useState<string>('noaj');
  const [activeSubTab, setActiveSubTab] = useState<'resumen' | 'aliyot' | 'rashi' | 'chabad' | 'maqam'>('resumen');

  const parasha = PARASHOT_DATA.find((p) => p.id === selectedParashaId) || PARASHOT_DATA[0];

  const currentLang = i18n.language?.substring(0, 2) || 'es';

  // Estados para la traducción dinámica con IA
  const [translatedContent, setTranslatedContent] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    async function fetchParashaTranslation() {
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
            aliyot: parasha.aliyot // <--- Enviamos las aliyot al servidor para que la IA las traduzca
          })
        });
        const json = await res.json();
        if (json.success) {
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

  const getLocalized = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field['es'] || Object.values(field)[0] || '';
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-3 sm:px-4 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 text-white border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Scroll className="w-4 h-4" />
            <span>Limud Torá Semanal • Sefer {getLocalized(parasha.bookSpanish)}</span>
          </div>
          <div className="flex items-baseline gap-4 mt-1">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
              Parashat {getLocalized(parasha.name)}
            </h2>
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400" dir="rtl">
              {parasha.hebrewName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span><strong>{t('readParasha', 'Lectura')}:</strong> {parasha.reference}</span>
            <span>•</span>
            <span><strong>{t('haftarah', 'Haftará')}:</strong> {parasha.haftarah}</span>
          </p>
        </div>

        {/* Parasha Selector dropdown */}
        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
          <label className="text-xs text-amber-300 font-medium">{t('selectParasha', 'Seleccionar Parashá:')}</label>
          <select
            value={selectedParashaId}
            onChange={(e) => setSelectedParashaId(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-amber-200 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-md"
          >
            {PARASHOT_DATA.map((p) => (
              <option key={p.id} value={p.id}>
                {getLocalized(p.name)} ({p.hebrewName}) — {getLocalized(p.bookSpanish)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subnavigation Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-2xl p-1.5 shadow-xs overflow-x-auto gap-1 scrollbar-none">
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

        <button
          onClick={() => setActiveSubTab('maqam')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'maqam'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🎵 {t('maqamTab', 'Maqam Semanal')}
        </button>
      </div>

      {/* Main Tab Content Display */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {activeSubTab === 'resumen' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                {t('summaryOf', 'Resumen de Parashat')} {getLocalized(parasha.name)}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {isTranslating ? '✨ Traduciendo contenido con IA...' : (translatedContent?.summary || parasha.summary)}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-800 dark:text-amber-300">
                {t('halachaCentralPoint', 'Punto Central de Halajá y Vida Judía:')}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                {isTranslating ? '...' : (translatedContent?.halachaFocus || parasha.halachaFocus)}
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'aliyot' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              {t('aliyotBreakdown', 'División de las 7 Aliyot en Shabat por la Mañana')}
            </h3>
            <div className="space-y-3">
              {(translatedContent?.aliyot || parasha.aliyot).map((aliya: any) => (
                <div
                  key={aliya.number}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3.5 hover:border-amber-400 dark:hover:border-amber-700 transition"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
                    {aliya.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {aliya.number}ª Aliyá ({aliya.number === 1 ? 'Kohén' : aliya.number === 2 ? 'Leví' : 'Israel'})
                      </h4>
                      <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">
                        {aliya.reference}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {isTranslating ? '✨ Traduciendo...' : aliya.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'rashi' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {t('rashiInsightTitle', 'Enseñanza de Rashi (Rabí Shelomó Itzjakí)')}
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <p className="font-serif italic text-base text-amber-900 dark:text-amber-300">
                "{isTranslating ? '✨ Traduciendo...' : (translatedContent?.rashiInsight || parasha.rashiInsight)}"
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'chabad' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {t('chabadInsightTitle', 'Dimensión Espiritual y Jasídica (Jabad Lubavitch)')}
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-slate-800/80 border border-rose-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <p className="font-serif text-base text-rose-950 dark:text-rose-200">
                {isTranslating ? '✨ Traduciendo...' : (translatedContent?.chabadInsight || parasha.chabadInsight)}
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'maqam' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎵</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {t('maqamTitle', 'El Maqam Semanal en Alepo (Maguen David) y Damasco (Monte Sinai)')}
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-base">
                <Music className="w-5 h-5 text-emerald-600" />
                <span>{t('assignedMaqam', 'Maqam asignado')}: {parasha.maqamHalabi}</span>
              </div>
            </div>
          </div>
        )}

        {/* Ask Rabbi Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {t('askAboutParashaPrompt', '¿Deseas profundizar en algún pasuk, halajá o comentario de esta Parashá?')}
          </span>
          <button
            onClick={() => {
              onAskAboutParasha(
                `Rabino, me gustaría profundizar en las enseñanzas y halajot principales de Parashat ${getLocalized(parasha.name)}.`
              );
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('consultRabbiParasha', 'Consultar al Rabino sobre')} {getLocalized(parasha.name)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ParashaTab;