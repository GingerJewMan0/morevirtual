import React, { useState } from 'react';
import { TEFILLIN_STEPS, TEFILLIN_BLESSINGS } from '../data/sidur/tefillinData';
import { TefillinStep, TefillinBlessing } from '../data/sidur/types'; // O '../types' dependiendo de tu estructura de carpetas
import { ChevronRight, ChevronLeft, Info, BookOpen } from 'lucide-react';

interface TefillinTabProps {
  activeLang: 'es' | 'en' | 'fr' | 'pt';
  communityId: string; // 'ashkenazi' | 'sefardi' | 'jabad' | 'maguenDavid' | 'monteSinai'
}

export const TefillinTab: React.FC<TefillinTabProps> = ({ activeLang, communityId }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = TEFILLIN_STEPS[currentStepIndex];
  const isAshkenazi = communityId === 'ashkenazi';

  const getStepDescription = (step: TefillinStep, commId: string, lang: 'es' | 'en' | 'fr' | 'pt') => {
    const communitySpecific = step.description[commId as keyof typeof step.description];
    if (communitySpecific && communitySpecific[lang]) {
      return communitySpecific[lang];
    }
    return step.description.default[lang] || step.description.default.es;
  };

  // Función para obtener la imagen correspondiente a la comunidad seleccionada
  const getCommunityImageSrc = (commId: string) => {
    // Puedes ajustar las rutas según hayas nombrado tus archivos en la carpeta assets
    switch (commId) {
      case 'ashkenazi':
        return '/assets/tefillin/ashkenazi.png'; // O la ruta de tu imagen de Ashkenazi
      case 'sefardi':
        return '/assets/tefillin/sefaradi.jpg';
      case 'jabad':
        return '/assets/tefillin/jabad.png';
      case 'maguenDavid':
        return '/assets/tefillin/MD.png';
      case 'monteSinai':
        return '/assets/tefillin/MS.png';
      default:
        return '/assets/tefillin/ashkenazi.png';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      {/* Encabezado */}
      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-amber-500/40 shadow-sm transition-colors text-center space-y-2">
        <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <span>
            {activeLang === 'en' ? 'How to Put on Tefillin' : activeLang === 'fr' ? 'Comment Mettre les Tefillines' : activeLang === 'pt' ? 'Como Colocar Tefilin' : 'Cómo Colocarse los Tefilín'}
          </span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          {isAshkenazi
            ? (activeLang === 'en' ? 'Ashkenazi Tradition: Recite 2 blessings (Hand & Head).' : 'Tradición Ashkenazí: Se recitan 2 bendiciones (Mano y Cabeza).')
            : (activeLang === 'en' ? 'Sefardic / Chabad Tradition: 1 blessing for the hand.' : 'Tradición Sefaradí / Jabad / Maguen David / Monte Sinaí: Se recita 1 sola bendición para la mano.')}
        </p>
      </div>

      {/* Tarjeta con la Infografía / Imagen Dinámica de la Comunidad */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-colors space-y-5">
        
        {/* Título de la sección o paso */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 capitalize">
            {activeLang === 'en' ? `Community Guide: ${communityId}` : `Guía de Comunidad: ${communityId}`}
          </h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            {communityId.toUpperCase()}
          </span>
        </div>

        {/* Contenedor de la Imagen Dinámica según la Comunidad */}
        <div className="w-full bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative shadow-inner">
          <img
            key={communityId} // Esto fuerza a React a recargar la imagen al cambiar de comunidad con una transición limpia
            src={getCommunityImageSrc(communityId)}
            alt={`Guía de Tefilín - ${communityId}`}
            className="w-full h-auto max-h-[500px] object-contain p-2"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'flex';
              }
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center text-slate-400 bg-slate-950/80 flex-col space-y-2 p-4 text-center">
            <span className="text-xs font-mono text-amber-400">/assets/tefillin/{communityId}.jpg</span>
            <p className="text-[11px] text-slate-300">
              {activeLang === 'en' ? `Infographic for ${communityId}` : `Infografía correspondiente a la comunidad ${communityId}`}
            </p>
          </div>
        </div>

        {/* Sección de Pasos e Instrucciones Detalladas (Paso actual) */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {step.title[activeLang] || step.title.es}
            </h4>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {currentStepIndex + 1} / {TEFILLIN_STEPS.length}
            </span>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {getStepDescription(step, communityId, activeLang)}
          </p>
        </div>

        {/* Sección de Bendición (si aplica al paso) */}
        {step.hasBlessing && step.blessingId && (
          (step.blessingId === 'lehaniach' || isAshkenazi) && (
            <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  {TEFILLIN_BLESSINGS[step.blessingId].titleSpanish}
                </span>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-300 dir-rtl font-serif">
                  {TEFILLIN_BLESSINGS[step.blessingId].titleHebrew}
                </span>
              </div>

              <p className="text-lg text-right font-serif text-slate-900 dark:text-amber-200 leading-loose dir-rtl">
                {TEFILLIN_BLESSINGS[step.blessingId].hebrew}
              </p>

              <p className="text-xs italic text-slate-600 dark:text-slate-300 border-t border-amber-500/20 pt-2">
                "{isAshkenazi ? TEFILLIN_BLESSINGS[step.blessingId].phonetic.ashkenazi : TEFILLIN_BLESSINGS[step.blessingId].phonetic.sefardi}"
              </p>

              <p className="text-xs text-slate-700 dark:text-slate-400">
                {TEFILLIN_BLESSINGS[step.blessingId].translation[activeLang] || TEFILLIN_BLESSINGS[step.blessingId].translation.es}
              </p>

              {TEFILLIN_BLESSINGS[step.blessingId].note && isAshkenazi && (
                <div className="flex items-start gap-2 text-[11px] text-amber-700 dark:text-amber-300/90 pt-1">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{TEFILLIN_BLESSINGS[step.blessingId].note![activeLang]}</span>
                </div>
              )}
            </div>
          )
        )}

        {/* Controles de Navegación de Pasos */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{activeLang === 'en' ? 'Previous' : activeLang === 'fr' ? 'Précédent' : activeLang === 'pt' ? 'Anterior' : 'Anterior'}</span>
          </button>

          <button
            onClick={() => setCurrentStepIndex(prev => Math.min(TEFILLIN_STEPS.length - 1, prev + 1))}
            disabled={currentStepIndex === TEFILLIN_STEPS.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <span>{activeLang === 'en' ? 'Next' : activeLang === 'fr' ? 'Suivant' : activeLang === 'pt' ? 'Próximo' : 'Siguiente'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};