import { X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface HalachaLevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HalachaLevelsModal({ isOpen, onClose }: HalachaLevelsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-200/50 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* ==================================================================== */}
        {/* CABECERA                                                             */}
        {/* ==================================================================== */}
        <div className="p-6 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <h2 className="text-xl font-bold font-serif">Clasificación Halájica</h2>
              <p className="text-xs text-amber-200">
                Los tres niveles de autoridad y observancia en la vida judía
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition text-amber-200 hover:text-white"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ==================================================================== */}
        {/* CONTENIDO: NIVELES 🔴, 🟡 y 🟢                                       */}
        {/* ==================================================================== */}
        <div className="p-6 space-y-6 overflow-y-auto text-slate-700 dark:text-slate-300">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            En la tradición rabínica, distinguir el nivel normativo de una práctica es fundamental para saber cómo actuar, cómo resolver dudas y cuándo existe flexibilidad o rigor. Rabino Virtual clasifica siempre cada tema según estos tres niveles:
          </p>

          {/* Nivel 1: Obligatorio (🔴) */}
          <div className="p-4 rounded-xl border-2 border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔴</span>
              <h3 className="text-base font-bold text-red-900 dark:text-red-300">
                OBLIGATORIO: Deoraita o Derabanan
              </h3>
            </div>
            <p className="text-sm mb-3">
              Ley obligatoria para todo el pueblo judío. Se divide en dos categorías vinculantes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                <p className="font-semibold text-red-800 dark:text-red-300 mb-1">
                  Mitzvot Deoraita (de la Torá)
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Los 613 preceptos ordenados directamente por el Creador en la Torá escrita.
                  <span className="block mt-1 italic text-slate-500">
                    Ej: Cuidar Shabat, no comer jametz en Pésaj, Shofar en Rosh Hashaná, Tefilín.
                  </span>
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                <p className="font-semibold text-red-800 dark:text-red-300 mb-1">
                  Mitzvot Derabanan (rabínicas)
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Decretos y ordenanzas instituidos por los Profetas y el Sanedrín con fuerza legal completa.
                  <span className="block mt-1 italic text-slate-500">
                    Ej: Velas de Janucá, lectura de la Meguilá en Purim, bendiciones de la comida, Netilat Yadayim.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Nivel 2: Costumbre / Minhag (🟡) */}
          <div className="p-4 rounded-xl border-2 border-amber-300 dark:border-amber-800/50 bg-amber-50/60 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🟡</span>
              <h3 className="text-base font-bold text-amber-900 dark:text-amber-300">
                COSTUMBRE (MINHAG): Tradición Arraigada
              </h3>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Prácticas santas adoptadas voluntariamente por las comunidades a lo largo de las generaciones. Tienen un inmenso valor y fuerza moral (<em className="font-serif">"Minhag Avoteinu Torá Hi"</em>).
            </p>
            <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg text-xs border border-amber-200 dark:border-amber-900/30">
              <span className="font-semibold text-amber-800 dark:text-amber-300">Ejemplos: </span>
              <span className="text-slate-600 dark:text-slate-400">
                Los Simanim en Rosh Hashaná, no comer kitniyot en Ashkenazí vs sí comerlos en Sefaradí, Maguen David y Monte Sinai; los 40 días de Selijot en las comunidades orientales.
              </span>
            </div>
          </div>

          {/* Nivel 3: Opcional / Humrá (🟢) */}
          <div className="p-4 rounded-xl border-2 border-emerald-300 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🟢</span>
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-300">
                OPCIONAL / HUMRÁ: Práctica Piadosa o Preferencia Personal
              </h3>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Un nivel extra de rigor o elevación espiritual (Midat Jasidut) asumido por quien desea embellecer la mitzvá más allá del requerimiento estricto.
            </p>
            <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-lg text-xs border border-emerald-200 dark:border-emerald-900/30">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">Ejemplos: </span>
              <span className="text-slate-600 dark:text-slate-400">
                Colocarse dos pares de Tefilín (Rashi y Rabenu Tam), abstenerse de Gebrochts en Pésaj, extender el tiempo de espera entre carne y leche a 6 horas.
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* PIE DE PÁGINA                                                        */}
        {/* ==================================================================== */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-amber-900 bg-amber-200 hover:bg-amber-300 dark:bg-amber-800/50 dark:text-amber-200 dark:hover:bg-amber-700/60 rounded-xl transition cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}

export default HalachaLevelsModal;