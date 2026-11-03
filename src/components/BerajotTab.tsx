import React, { useState } from 'react';
import { BookOpen, Sun, Coffee, Shield, AlertTriangle } from 'lucide-react';

import { maguenDavidSidur } from '../data/sidur/maguenDavid';
import { monteSinaiSidur } from '../data/sidur/monteSinai';
import { sefaradiSidur } from '../data/sidur/sefaradi';
import { ashkenaziSidur } from '../data/sidur/ashkenazi';
import { jabadSidur } from '../data/sidur/jabad';

type SupportedLang = 'es' | 'en' | 'fr' | 'pt' | 'he';

interface BerajotTabProps {
  t: (key: string, fallback: string) => string;
  currentLang?: string;
}

type Tradition = 'maguen-david' | 'monte-sinai' | 'ashkenazi' | 'sefaradi' | 'jabad';
type ViewMode = 'hebrew' | 'phonetic' | 'translation';
type BerajotCategory = 'despertar' | 'cuerpo' | 'alimentos';

export function BerajotTab({ t, currentLang }: BerajotTabProps) {
  const [selectedTradition, setSelectedTradition] = useState<Tradition>('maguen-david');
  const [activeCategory, setActiveCategory] = useState<BerajotCategory>('despertar');
  const [viewMode, setViewMode] = useState<ViewMode>('translation');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Detecta si el idioma activo es Hebreo ('he') u otros ('es', 'en', 'fr', 'pt')
  const getActiveLanguage = (): SupportedLang => {
    if (currentLang) {
      const propLang = currentLang.toLowerCase().slice(0, 2);
      if (['es', 'en', 'fr', 'pt', 'he'].includes(propLang)) {
        return propLang as SupportedLang;
      }
    }

    const storedLang = (
      localStorage.getItem('i18nextLng') ||
      localStorage.getItem('language') ||
      localStorage.getItem('app_lang') ||
      ''
    ).toLowerCase().slice(0, 2);

    if (['es', 'en', 'fr', 'pt', 'he'].includes(storedLang)) {
      return storedLang as SupportedLang;
    }

    return 'es';
  };

  const activeLang = getActiveLanguage();
  const isHebrewLang = activeLang === 'he';

  // Si el usuario tiene seleccionada la interfaz en Hebreo, forzamos siempre la vista en Hebreo
  const effectiveViewMode: ViewMode = isHebrewLang ? 'hebrew' : viewMode;

  const getBerajotData = () => {
    switch (selectedTradition) {
      case 'monte-sinai': return monteSinaiSidur;
      case 'sefaradi': return sefaradiSidur;
      case 'ashkenazi': return ashkenaziSidur;
      case 'jabad': return jabadSidur;
      case 'maguen-david':
      default: return maguenDavidSidur;
    }
  };

  const currentData = getBerajotData();
  const currentList = currentData[activeCategory] || [];
  
  const currentItem = currentList[currentIndex] || {
    titleHebrew: '...',
    titleSpanish: '...',
    hebrew: '',
    phonetic: '',
    translation: { es: '', en: '', fr: '', pt: '' }
  };

  const traditionsList: { id: Tradition; name: string }[] = [
    { id: 'maguen-david', name: t('traditionMaguenDavid', isHebrewLang ? 'מגן דוד' : 'Maguen David') },
    { id: 'monte-sinai', name: t('traditionMonteSinai', isHebrewLang ? 'הר סיני' : 'Monte Sinai') },
    { id: 'sefaradi', name: t('traditionSefaradi', isHebrewLang ? 'ספרדי' : 'Sefaradí') },
    { id: 'ashkenazi', name: t('traditionAshkenazi', isHebrewLang ? 'אשכנזי' : 'Ashkenazí') },
    { id: 'jabad', name: t('traditionJabad', isHebrewLang ? 'חב"ד (אריז"ל)' : 'Jabad (Ari)') }
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 backdrop-blur-md transition-colors duration-300">
      
      {/* Título de la pestaña */}
      <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-xl font-serif font-bold tracking-wide">
          {t('menuBerajotTitle', isHebrewLang ? 'ברכות יומיות' : 'Berajot Cotidianas')}
        </h2>
      </div>

      {/* Selector de Comunidad */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block text-center">
          {t('berajotCommunity', isHebrewLang ? 'קהילה / מנהג' : 'COMUNIDAD / TRADICIÓN')}
        </label>
        <select
          value={selectedTradition}
          onChange={(e) => {
            setSelectedTradition(e.target.value as Tradition);
            setCurrentIndex(0); 
          }}
          className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
        >
          {traditionsList.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* Categorías */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button 
          onClick={() => { setActiveCategory('despertar'); setCurrentIndex(0); }} 
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex-1 justify-center transition-colors ${
            activeCategory === 'despertar' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sun className="w-3.5 h-3.5" /> {t('berajotWake', isHebrewLang ? 'ברכות השחר' : 'Al Despertar')}
        </button>
        <button 
          onClick={() => { setActiveCategory('cuerpo'); setCurrentIndex(0); }} 
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex-1 justify-center transition-colors ${
            activeCategory === 'cuerpo' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" /> {t('berajotBody', isHebrewLang ? 'גוף' : 'Cuerpo')}
        </button>
        <button 
          onClick={() => { setActiveCategory('alimentos'); setCurrentIndex(0); }} 
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex-1 justify-center transition-colors ${
            activeCategory === 'alimentos' 
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" /> {t('berajotFood', isHebrewLang ? 'מאכלים' : 'Alimentos')}
        </button>
      </div>

      {/* Selector de Modos de visualización: Oculto si el idioma es Hebreo */}
      {!isHebrewLang && (
        <div className="flex justify-center gap-1.5 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] transition-colors">
          {(['hebrew', 'phonetic', 'translation'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                viewMode === mode 
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {mode === 'hebrew' ? 'עברית' : mode === 'phonetic' ? t('berajotPhonetic', 'Fonética') : t('berajotTranslation', 'Traducción')}
            </button>
          ))}
        </div>
      )}

      {/* Tarjeta principal del rezo */}
<div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner transition-colors">
  
  {/* Encabezado con títulos */}
  <div className="flex justify-between items-center">
    <span className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
      {currentItem.titleHebrew}
    </span>
    {!isHebrewLang && (
      <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
      {(currentItem as any).title?.[activeLang] || currentItem.titleSpanish}
    </h3>
    )}
  </div>

  {/* AVISO / ADVERTENCIA HALÁJICA */}
{(currentItem as any).warning && (
  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs rounded-xl flex items-center justify-center gap-2 font-medium text-center">
    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
    <span>
      {(currentItem as any).warning[activeLang] || (currentItem as any).warning.es}
    </span>
  </div>
)}

        <div className="min-h-[140px] flex items-center justify-center text-center">
          {effectiveViewMode === 'hebrew' && (
            <p className="text-xl font-serif leading-relaxed text-right text-slate-900 dark:text-slate-100" dir="rtl">
              {currentItem.hebrew}
            </p>
          )}
          {effectiveViewMode === 'phonetic' && (
            <p className="text-sm font-sans italic text-slate-700 dark:text-slate-300 leading-relaxed px-2">
              "{currentItem.phonetic}"
            </p>
          )}
          {effectiveViewMode === 'translation' && (
            <p className="text-sm font-sans text-slate-800 dark:text-slate-200 leading-relaxed px-2">
              {currentItem.translation[activeLang as keyof typeof currentItem.translation] || currentItem.translation.es}
            </p>
          )}
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentList.length - 1))}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {t('prev', isHebrewLang ? 'הקודם' : 'Anterior')}
          </button>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
          {currentList.length > 0 ? (
            isHebrewLang 
              ? `${currentIndex + 1} מתוך ${currentList.length}` 
              : `${currentIndex + 1} ${activeLang === 'en' ? 'of' : activeLang === 'fr' ? 'sur' : 'de'} ${currentList.length}`
          ) : (
            `0 ${activeLang === 'en' ? 'of' : activeLang === 'fr' ? 'sur' : 'de'} 0`
          )}
        </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev < currentList.length - 1 ? prev + 1 : 0))}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {t('next', isHebrewLang ? 'הבא' : 'Siguiente')}
          </button>
        </div>
      </div>

    </div>
  );
}