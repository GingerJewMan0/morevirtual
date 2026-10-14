import React from 'react';
import { ShieldAlert, AlertTriangle, Scale, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GiluyDaatTab: React.FC<{ onAcknowledge?: () => void }> = ({ onAcknowledge }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 animate-fadeIn">
      <div className="rounded-2xl border p-6 md:p-8 transition-colors bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-lg">
        
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800/50">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-amber-400">
              {t('giluyDaatTitle', "Giluy Da'at y Deslinde Halájico")}
            </h2>
            <span className="text-xs font-serif text-slate-500 dark:text-slate-400 block" dir="rtl">
              גילוי דעת והודעה הלכתית חשובה
            </span>
          </div>
        </div>

        {/* Advertencia Estricta */}
        <div className="mb-6 p-4 rounded-xl border bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-sm leading-relaxed flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">{t('strictNoticeTitle', 'Advertencia estricta:')}</strong>{' '}
            {t('strictNoticeText', 'Este educador digital tiene un propósito estrictamente pedagógico y de Limud Torá (estudio de textos bíblicos y rabínicos).')}{' '}
            <strong className="underline decoration-amber-500 underline-offset-2">
              {t('noPsakNotice', 'No emite ni sustituye bajo ningún concepto un Psak Halajá (dictamen legal judío vinculante para la práctica).')}
            </strong>
          </div>
        </div>

        {/* Sección: ¿Por qué un sistema digital no puede dar Psak Halajá? */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-slate-900 dark:text-amber-400">
            <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            {t('whyNoPsakTitle', '¿Por qué un sistema digital no puede dar Psak Halajá?')}
          </h3>

          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
              <span>
                <strong>{t('caseAssessmentTitle', 'Evaluación personalizada del caso:')}</strong>{' '}
                {t('caseAssessmentDesc', 'En la Halajá (jurisprudencia judía), cada veredicto toma en cuenta circunstancias individuales únicas: estado físico, salud mental, apremio económico (Jevsed Merubé), paz matrimonial (Shalom Bait) y gravedad de la situación (Sha\'at HaDjak).')}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
              <span>
                <strong>{t('minhagTitle', 'Tradición y Minhag de la comunidad:')}</strong>{' '}
                {t('minhagDesc', 'Existen diversas tradiciones normativas (Sefaradí, Ashkenazí, Yemenita, Teimanim, Edot HaMizraj, Jasídica, etc.). Un dictamen requiere conocer el Minhag y la afiliación de la persona.')}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
              <span>
                <strong>{t('semichaTitle', 'Investidura de autoridad (Semijá y Moré Hora\'ah):')}</strong>{' '}
                {t('semichaDesc', 'Solo un Rabino humano competente y ordenado tiene la responsabilidad moral, espiritual y legal ante el Creador de asumir el peso de una resolución halájica.')}
              </span>
            </li>
          </ul>
        </div>

        {/* Caja de Información */}
        <div className="mb-6 p-4 rounded-xl border bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-sm">
          <h4 className="font-bold flex items-center gap-2 mb-2 text-slate-900 dark:text-amber-400">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            {t('purposeTitle', '¿PARA QUÉ SIRVE ESTE MORÉ TORÁ?')}
          </h4>
          <p className="leading-relaxed">
            {t('purposeDesc', 'Para investigar el Perek (capítulo) y Pasuk (versículo) exacto en el Tanaj, conocer el texto en hebreo, leer las explicaciones pedagógicas de Rashi y otros comentaristas tradicionales, generar hojas de estudio para Javruta y profundizar en la sabiduría ética y teológica de Israel.')}
          </p>
        </div>

        {onAcknowledge && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={onAcknowledge}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition shadow-xs cursor-pointer"
            >
              {t('understandAndContinue', 'Entendido, ir al Diálogo Rabínico')}
            </button>
          </div>
        )}

        {/* Cita */}
        <p className="mt-4 text-center text-xs italic text-slate-500 dark:text-slate-400 font-serif">
          "Ase leja Rav, ukne leja Javer" — Pirkei Avot 1:6
        </p>

      </div>
    </div>
  );
};
export default GiluyDaatTab;