import React, { useState } from 'react';
import { TEFILLIN_BLESSINGS } from '../data/sidur/tefillinData';
import { Info, BookOpen, ZoomIn, X } from 'lucide-react';

interface TefillinTabProps {
  activeLang: 'es' | 'en' | 'fr' | 'pt' | 'he';
  communityId: string;
}

export const TefillinTab: React.FC<TefillinTabProps> = ({ activeLang, communityId }) => {
  const isAshkenazi = communityId === 'ashkenazi';
  const isHebrew = activeLang === 'he';

  // Estado para controlar el zoom de la imagen
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      pt: 'Como Colocar Tefilin',
      he: 'הלכות הנחת תפילין'
    },
    subtitle: {
      es: 'Guía visual completa con las diferentes tradiciones de las comunidades.',
      en: 'Complete visual guide with the different community traditions.',
      fr: 'Guide visuel complet avec les différentes traditions des communautés.',
      pt: 'Guia visual completo com as diferentes tradições das comunidades.',
      he: 'מדריך ויזואלי מקיף לפי מנהגי הקהילות השונות.'
    },
    guideTitle: {
      es: 'Guía General por Comunidad',
      en: 'General Guide by Community',
      fr: 'Guide Général par Communauté',
      pt: 'Guia Geral por Comunidade',
      he: 'מדריך כללי לפי קהילות'
    },
    handTitle: {
      es: 'Lehaniaj Tefilín (Mano)',
      en: 'Laying Tefillin (Hand)',
      fr: 'Poser les Tefillines (Main)',
      pt: 'Colocar Tefilin (Mão)',
      he: 'ברכת הנחת תפילין של יד'
    },
    headTitle: {
      es: 'Al Mitzvat Tefilín (Cabeza)',
      en: 'Mitzvah of Tefillin (Head)',
      fr: 'Mitzvah des Tefillines (Tête)',
      pt: 'Preceito de Tefilin (Cabeça)',
      he: 'ברכת מצוות תפילין של ראש'
    },
    tapToZoom: {
      es: 'Tocar para ampliar',
      en: 'Tap to zoom',
      fr: 'Appuyer pour zoomer',
      pt: 'Toque para ampliar',
      he: 'הקש להגדלה'
    }
  };

  const currentImageSrc = getImageByLanguage(activeLang);

  return (
    <div className={`max-w-3xl mx-auto space-y-6 p-4 ${isHebrew ? 'dir-rtl text-right' : ''}`}>
      {/* Encabezado */}
      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-amber-500/40 shadow-sm transition-colors text-center space-y-2">
        <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <span>{uiTexts.title[activeLang] || uiTexts.title.es}</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-sans">
          {uiTexts.subtitle[activeLang] || uiTexts.subtitle.es}
        </p>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-colors space-y-5">
        
        {/* Título de la sección */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 capitalize font-sans">
            {uiTexts.guideTitle[activeLang] || uiTexts.guideTitle.es}
          </h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase">
            {activeLang}
          </span>
        </div>

        {/* Contenedor de la Imagen con opción de Zoom */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative shadow-inner min-h-[300px] group cursor-pointer"
        >
          <img
            key={activeLang}
            src={currentImageSrc}
            alt={`Guía de Tefilín - ${activeLang}`}
            className="w-full h-auto max-h-[700px] object-contain p-2 transition-transform duration-300 group-hover:scale-102"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'flex';
              }
            }}
          />

          {/* Overlay flotante al pasar el mouse o tocar para indicar zoom */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs">
            <ZoomIn className="w-5 h-5 text-amber-400" />
            <span>{uiTexts.tapToZoom[activeLang] || uiTexts.tapToZoom.es}</span>
          </div>

          <div className="absolute inset-0 hidden items-center justify-center text-slate-400 bg-slate-950/80 flex-col space-y-2 p-4 text-center pointer-events-none">
            <span className="text-xs font-mono text-amber-400">/assets/tefillin/tefillin_{activeLang}.png</span>
            <p className="text-[11px] text-slate-300">
              Imagen no encontrada en la carpeta src/assets/tefillin/
            </p>
          </div>
        </div>

        {/* ================= MODAL DE PANTALLA COMPLETA (ZOOM) ================= */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Botón de cierre */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Imagen ampliada */}
            <div 
              className="relative max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={currentImageSrc} 
                alt="Tefilín Ampliado"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        )}

        {/* SECCIÓN DE BENDICIONES */}
        <div className="space-y-4 pt-2">
          
          {/* 1. Bendición de la Mano (Lehaniaj) */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 space-y-3">
            <div className={`flex items-center justify-between ${isHebrew ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                {uiTexts.handTitle[activeLang] || uiTexts.handTitle.es}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-300 font-serif">
                {TEFILLIN_BLESSINGS.lehaniach.titleHebrew}
              </span>
            </div>

            <p className="text-xl text-right font-serif text-slate-900 dark:text-amber-200 leading-loose dir-rtl py-1">
              {TEFILLIN_BLESSINGS.lehaniach.hebrew}
            </p>

            {/* Solo se muestra si NO es hebreo */}
            {!isHebrew && (
              <>
                <p className="text-xs italic text-slate-600 dark:text-slate-300 border-t border-amber-500/20 pt-2">
                  "{isAshkenazi ? TEFILLIN_BLESSINGS.lehaniach.phonetic.ashkenazi : TEFILLIN_BLESSINGS.lehaniach.phonetic.sefardi}"
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-400">
                  {TEFILLIN_BLESSINGS.lehaniach.translation[activeLang] || TEFILLIN_BLESSINGS.lehaniach.translation.es}
                </p>
              </>
            )}
          </div>

          {/* 2. Bendición de la Cabeza (Al Mitzvat) */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 space-y-3">
            <div className={`flex items-center justify-between ${isHebrew ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                {uiTexts.headTitle[activeLang] || uiTexts.headTitle.es}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-300 font-serif">
                {TEFILLIN_BLESSINGS['al-mitzvat'].titleHebrew}
              </span>
            </div>

            <p className="text-xl text-right font-serif text-slate-900 dark:text-amber-200 leading-loose dir-rtl py-1">
              {TEFILLIN_BLESSINGS['al-mitzvat'].hebrew}
            </p>

            {/* Solo se muestra si NO es hebreo */}
            {!isHebrew && (
              <>
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
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};