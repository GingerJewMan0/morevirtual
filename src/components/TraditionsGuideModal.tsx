import { useState } from 'react';
import { X, BookOpen, MapPin, Feather, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TRADITIONS } from '../data/traditions.ts';
import { TraditionId } from '../types.ts';

interface TraditionsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTraditionFilter: (id: TraditionId) => void;
  currentFilter: TraditionId;
}

export function TraditionsGuideModal({
  isOpen,
  onClose,
  onSelectTraditionFilter,
  currentFilter,
}: TraditionsGuideModalProps) {
  const { t } = useTranslation();
  
  // Pestaña activa según el filtro actual
  const [activeTab, setActiveTab] = useState<string>(
    currentFilter === 'all' ? 'maguen_david' : currentFilter
  );

  if (!isOpen) return null;

  const currentTradition = TRADITIONS.find((trad) => trad.id === activeTab) || TRADITIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-200/50 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* ==================================================================== */}
        {/* CABECERA                                                             */}
        {/* ==================================================================== */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✡️</span>
            <div>
              <h2 className="text-xl font-bold font-serif tracking-wide">
                {t('communityGuideTitle', 'Guía de Diversidad Comunitaria')}
              </h2>
              <p className="text-xs text-amber-200">
                {t('communityGuideSubtitle', 'Las 5 grandes vertientes explicadas por Rabino Virtual')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition text-slate-300 hover:text-white cursor-pointer"
            aria-label={t('close', 'Cerrar')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ==================================================================== */}
        {/* PESTAÑAS DE NAVEGACIÓN ENTRE TRADICIONES                              */}
        {/* ==================================================================== */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 overflow-x-auto px-4 pt-3 gap-2 scrollbar-none">
          {TRADITIONS.map((tradition) => {
            const isActive = activeTab === tradition.id;
            return (
              <button
                key={tradition.id}
                onClick={() => setActiveTab(tradition.id)}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 border-amber-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <span>{tradition.icon}</span>
                <span>{tradition.name}</span>
              </button>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* CONTENIDO DETALLADO DE LA TRADICIÓN SELECCIONADA                     */}
        {/* ==================================================================== */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentTradition.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
                    {currentTradition.name}
                  </h3>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                    {currentTradition.subname}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Origen histórico: {currentTradition.origin}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectTraditionFilter(currentTradition.id);
                onClose();
              }}
              className="self-start sm:self-center px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{t('prioritizeInQueries', 'Priorizar en mis consultas')}</span>
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              {t('historyAndContext', 'Historia y Contexto Comunitario')}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50/40 dark:bg-slate-800/40 p-4 rounded-xl border border-amber-100 dark:border-slate-800">
              {currentTradition.historicalContext}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
              <Feather className="w-4 h-4 text-amber-600" />
              {t('keyTraitsTitle', 'Rasgos y Filosofía Distintiva')}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentTradition.keyTraits}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              {t('sourcesAndSages', 'Principales Fuentes y Sabios (Poskim / Jajamim)')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentTradition.authorities.map((auth, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-lg font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  📜 {auth}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              {t('customExamples', 'Ejemplos Característicos de Halajá y Costumbres (Minhaguim)')}
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {currentTradition.examples.map((ex, i) => (
                <li
                  key={i}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* PIE DE PÁGINA                                                        */}
        {/* ==================================================================== */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center text-xs text-slate-500">
          <span>Rabino Virtual compara siempre las 5 tradiciones comunitarias.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            {t('close', 'Cerrar')}
          </button>
        </div>

      </div>
    </div>
  );
}

export default TraditionsGuideModal;