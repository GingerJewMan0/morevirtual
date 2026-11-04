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

  // Textos traducidos para la interfaz
  const uiTexts = {
    title: {
      es: 'Cómo Colocarse los Tefilín',
      en: 'How to Put on Tefillin',
      fr: 'Comment Mettre les Tefillines',
      pt: 'Como Colocar Tefilin'
    },
    subtitle: {
      es: 'Guía visual completa con las diferentes tradiciones de las comunidades.',
      en: 'Complete visual guide with the different community traditions.',
      fr: 'Guide visuel complet avec les différentes traditions des communautés.',
      pt: 'Guia visual completo com as diferentes tradições das comunidades.'
    },
    guideTitle: {
      es: 'Guía General por Comunidad',
      en: 'General Guide by Community',
      fr: 'Guide Général par Communauté',
      pt: 'Guia Geral por Comunidade'
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      {/* Encabezado */}
      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-amber-500/40 shadow-sm transition-colors text-center space-y-2">
        <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <span>{uiTexts.title[activeLang] || uiTexts.title.es}</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          {uiTexts.subtitle[activeLang] || uiTexts.subtitle.es}
        </p>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-colors space-y-5">
        
        {/* Título de la sección traducido */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 capitalize">
            {uiTexts.guideTitle[activeLang] || uiTexts.guideTitle.es}
          </h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase">
            {activeLang}
          </span>
        </div>

        {/* Contenedor de la Imagen */}
        <div className="w-full bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative shadow-inner min-h-[300px]">
          <img
            key={activeLang}
            src={getImageByLanguage(activeLang)}
            alt={`Guía de Tefilín - ${activeLang}`}
            className="w-full h-auto max-h-[700px] object-contain p-2"
            onError={(e) => {
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
              Imagen no encontrada en la carpeta src/assets/tefillin/
            </p>
          </div>
        </div>

        {/* SECCIÓN DE BENDICIONES (Mano y Cabeza) */}
        <div className="space-y-4 pt-2">
          
          {/* 1. Bendición de la Mano (Lehaniaj) */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                {activeLang === 'en' ? 'Laying Tefillin (Hand)' : activeLang === 'fr' ? 'Poser les Tefillines (Main)' : activeLang === 'pt' ? 'Colocar Tefilin (Mão)' : TEFILLIN_BLESSINGS.lehaniach.titleSpanish}
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

          {/* 2. Bendición de la Cabeza (Al Mitzvat - Shel Rosh) */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                {activeLang === 'en' ? 'Mitzvah of Tefillin (Head)' : activeLang === 'fr' ? 'Mitzvah des Tefillines (Tête)' : activeLang === 'pt' ? 'Preceito de Tefilin (Cabeça)' : TEFILLIN_BLESSINGS['al-mitzvat'].titleSpanish}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-300 dir-rtl font-serif">
                {TEFILLIN_BLESSINGS['al-mitzvat'].titleHebrew}
              </span>
            </div>

            <p className="text-lg text-right font-serif text-slate-900 dark:text-amber-200 leading-loose dir-rtl">
              {TEFILLIN_BLESSINGS['al-mitzvat'].hebrew}
            </p>

            <p className="text-xs italic text-slate-600 dark:text-slate-300 border-t border-amber-500/20 pt-2">
              "{isAshkenazi ? TEFILLIN_BLESSINGS['al-mitzvat'].phonetic.ashkenazi : TEFILLIN_BLESSINGS['al-mitzvat'].phonetic.sefardi}"
            </p>

            <p className="text-xs text-slate-700 dark:text-slate-400">
              {TEFILLIN_BLESSINGS['al-mitzvat'].translation[activeLang] || TEFILLIN_BLESSINGS['al-mitzvat'].translation.es}
            </p>

            {TEFILLIN_BLESSINGS['al-mitzvat'].note && (
              <div className="flex items-start gap-2 text-[11px] text-amber-700 dark:text-amber-300/90 pt-1">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{TEFILLIN_BLESSINGS['al-mitzvat'].note[activeLang] || TEFILLIN_BLESSINGS['al-mitzvat'].note.es}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};