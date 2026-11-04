import React from 'react';
import { TEFILLIN_BLESSINGS } from '../data/sidur/tefillinData';
import { Info, BookOpen } from 'lucide-react';

interface TefillinTabProps {
  activeLang: 'es' | 'en' | 'fr' | 'pt';
  communityId: string;
}

export const TefillinTab: React.FC<TefillinTabProps> = ({ activeLang, communityId }) => {
  const isAshkenazi = communityId === 'ashkenazi';

  // Ruta de la imagen por idioma (.png)
 const getImageByLanguage = (lang: string) => {
    try {
      return new URL(`../assets/tefillin/tefillin_${lang}.png`, import.meta.url).href;
    } catch (error) {
      return new URL(`../assets/tefillin/tefillin_es.png`, import.meta.url).href;
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
          {activeLang === 'en'
            ? 'Visual guide containing all community traditions.'
            : 'Guía visual completa con las diferentes tradiciones de las comunidades.'}
        </p>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-colors space-y-5">
        
        {/* Título de la sección */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 capitalize">
            {activeLang === 'en' ? 'General Guide by Community' : 'Guía General Por Comunidad'}
          </h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase">
            {activeLang}
          </span>
        </div>

        {/* 🖼️ CONTENEDOR DE LA IMAGEN (Asegúrate de que este bloque sí esté presente) */}
        <div className="w-full bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative shadow-inner min-h-[300px]">
          <img
            key={activeLang}
            src={getImageByLanguage(activeLang)}
            alt={`Guía de Tefilín - ${activeLang}`}
            className="w-full h-auto max-h-[700px] object-contain p-2"
            onError={(e) => {
              // Si la imagen falla en cargar, muestra el texto de respaldo abajo
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'flex';
              }
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center text-slate-400 bg-slate-950/80 flex-col space-y-2 p-4 text-center">
            <span className="text-xs font-mono text-amber-400">/assets/tefillin/tefillin_{activeLang}.png</span>
            <p className="text-[11px] text-slate-300">
              Imagen no encontrada en la carpeta public/assets/tefillin/
            </p>
          </div>
        </div>

        {/* SECCIÓN DE BENDICIONES */}
        <div className="space-y-4 pt-2">
          {/* Bendición de la Mano */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                {TEFILLIN_BLESSINGS.lehaniach.titleSpanish}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-300 dir-rtl font-serif">
                {TEFILLIN_BLESSINGS.lehaniach.titleHebrew}
              </span>
            </div>

            <p className="text-lg text-right font-serif text-slate-900 dark:text-amber-200 leading-loose dir-rtl">
              {TEFILLIN_BLESSINGS.lehaniach.hebrew}
            </p>

            <p className="text-xs italic text-slate-600 dark:text-slate-300 border-t border-amber-500/20 pt-2">
              "{isAshkenazi ? TEFILLIN_BLESSINGS.lehaniach.phonetic.ashkenazi : TEFILLIN_BLESSINGS.lehaniach.phonetic.sefardi}"
            </p>

            <p className="text-xs text-slate-700 dark:text-slate-400">
              {TEFILLIN_BLESSINGS.lehaniach.translation[activeLang] || TEFILLIN_BLESSINGS.lehaniach.translation.es}
            </p>
          </div>

          {/* Bendición de la Cabeza (Solo Ashkenazí) */}
          {isAshkenazi && (
            <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  {TEFILLIN_BLESSINGS['al-mitzvat'].titleSpanish}
                </span>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-300 dir-rtl font-serif">
                  {TEFILLIN_BLESSINGS['al-mitzvat'].titleHebrew}
                </span>
              </div>

              <p className="text-lg text-right font-serif text-slate-900 dark:text-amber-200 leading-loose dir-rtl">
                {TEFILLIN_BLESSINGS['al-mitzvat'].hebrew}
              </p>

              <p className="text-xs italic text-slate-600 dark:text-slate-300 border-t border-amber-500/20 pt-2">
                "{TEFILLIN_BLESSINGS['al-mitzvat'].phonetic.ashkenazi}"
              </p>

              <p className="text-xs text-slate-700 dark:text-slate-400">
                {TEFILLIN_BLESSINGS['al-mitzvat'].translation[activeLang] || TEFILLIN_BLESSINGS['al-mitzvat'].translation.es}
              </p>

              {TEFILLIN_BLESSINGS['al-mitzvat'].note && (
                <div className="flex items-start gap-2 text-[11px] text-amber-700 dark:text-amber-300/90 pt-1">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{TEFILLIN_BLESSINGS['al-mitzvat'].note[activeLang]}</span>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};