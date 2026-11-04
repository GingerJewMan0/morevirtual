import React, { useState } from 'react';
import { TEFILLIN_BLESSINGS } from '../data/sidur/tefillinData';
import { Info, BookOpen, ZoomIn, X, ZoomOut, RotateCcw } from 'lucide-react';

interface TefillinTabProps {
  activeLang: 'es' | 'en' | 'fr' | 'pt' | 'he';
  communityId: string;
}

export const TefillinTab: React.FC<TefillinTabProps> = ({ activeLang, communityId }) => {
  const isAshkenazi = communityId === 'ashkenazi';
  const isHebrew = activeLang === 'he';

  // Estados para el control del modal y el zoom interactivo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);

  // Ruta de la imagen por idioma (.png)
  const getImageByLanguage = (lang: string) => {
    try {
      return new URL(`../assets/tefillin/tefillin_${lang}.png`, import.meta.url).href;
    } catch (error) {
      return new URL(`../assets/tefillin/tefillin_es.png`, import.meta.url).href;
    }
  };

  // Textos traducidos para la interfaz y las notas de costumbre
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
    },
    ashkenaziNote: {
      es: 'Solo para Ashkenazí: Se dice al terminar de ajustar el Tefilín de la cabeza.',
      en: 'Ashkenazi custom only: Said after adjusting the head Tefillin.',
      fr: 'Coutume ashkénaze uniquement : Dites après avoir ajusté les téfilines de la tête.',
      pt: 'Costume ashkenazi apenas: Dito após ajustar o Tefilin da cabeça.',
      he: 'מנהג אשכנז בלבד: אומרים לאחר הידוק תפילין של ראש.'
    },
    otherCommunitiesNote: {
      es: 'Para otras comunidades: Se dice únicamente si hablaste de cosas irrelevantes entre el tefilín de la mano y el de la cabeza.',
      en: 'For other communities: Said only if you spoke about irrelevant matters between the hand and head Tefillin.',
      fr: 'Pour les autres communautés : Dit uniquement si vous avez parlé de choses non pertinentes entre le téfilin de la main et celui de la tête.',
      pt: 'Para outras comunidades: Dito apenas se você falou sobre assuntos irrelevantes entre o tefilin da mão e o da cabeça.',
      he: 'לשאר הקהילות: מברכים רק אם דיברת דברים שאינם קשורים בין תפילין של יד לשל ראש.'
    }
  };

  const currentImageSrc = getImageByLanguage(activeLang);

  // Funciones de control de zoom
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setScale(1);
  };

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
          onClick={() => { setScale(1); setIsModalOpen(true); }}
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

          {/* Overlay flotante */}
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

        {/* ================= MODAL DE PANTALLA COMPLETA AMPLIADO ================= */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in overflow-hidden"
            onClick={handleCloseModal}
          >
            {/* Barra de herramientas superior flotante */}
            <div 
              className="absolute top-4 z-30 flex items-center justify-between gap-3 px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 1}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  title="Alejar"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono font-bold text-amber-400 px-2 min-w-[50px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  title="Acercar"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                {scale > 1 && (
                  <button
                    onClick={handleResetZoom}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-400 transition-colors cursor-pointer ml-1"
                    title="Restablecer zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Botón de cierre */}
              <button 
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors cursor-pointer"
                aria-label="Cerrar"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenedor desplazable que abarca todo el ancho y alto */}
            <div 
              className="w-full h-full overflow-auto flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="transition-transform duration-200 ease-out origin-center cursor-grab active:cursor-grabbing flex items-center justify-center min-w-full min-h-full"
                style={{ transform: `scale(${scale})` }}
                onClick={() => {
                  setScale((prev) => (prev === 1 ? 2 : 1));
                }}
              >
                <img 
                  src={currentImageSrc} 
                  alt="Tefilín Ampliado"
                  className="w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain select-none mx-auto my-auto"
                  draggable={false}
                />
              </div>
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

            {!isHebrew && (
              <>
                <p className="text-xs italic text-slate-600 dark:text-slate-300 border-t border-amber-500/20 pt-2">
                  "{isAshkenazi ? TEFILLIN_BLESSINGS['al-mitzvat'].phonetic.ashkenazi : TEFILLIN_BLESSINGS['al-mitzvat'].phonetic.sefardi}"
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-400">
                  {TEFILLIN_BLESSINGS['al-mitzvat'].translation[activeLang] || TEFILLIN_BLESSINGS['al-mitzvat'].translation.es}
                </p>

                {/* Notas condicionales según la costumbre / comunidad */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-start gap-2 text-[11px] text-amber-700 dark:text-amber-300/95">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>{uiTexts.ashkenaziNote[activeLang] || uiTexts.ashkenaziNote.es}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    <span>{uiTexts.otherCommunitiesNote[activeLang] || uiTexts.otherCommunitiesNote.es}</span>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};