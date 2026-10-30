import React, { useState } from 'react';
import { BookOpen, Sun, Coffee, Shield } from 'lucide-react';

import { maguenDavidSidur } from '../data/sidur/maguenDavid';
import { monteSinaiSidur } from '../data/sidur/monteSinai';
import { sefaradiSidur } from '../data/sidur/sefaradi';
import { ashkenaziSidur } from '../data/sidur/ashkenazi';
import { jabadSidur } from '../data/sidur/jabad';

interface BerajotTabProps {
  t: (key: string, fallback: string) => string;
}

type Tradition = 'maguen-david' | 'monte-sinai' | 'ashkenazi' | 'sefaradi' | 'jabad';
type TextDisplayMode = 'hebrew' | 'phonetic' | 'translation';
type BerajotCategory = 'despertar' | 'cuerpo' | 'alimentos';

export function BerajotTab({ t }: BerajotTabProps) {
  const [selectedTradition, setSelectedTradition] = useState<Tradition>('maguen-david');
  const [activeCategory, setActiveCategory] = useState<BerajotCategory>('despertar');
  const [displayMode, setDisplayMode] = useState<TextDisplayMode>('phonetic');
  const [currentIndex, setCurrentIndex] = useState(0);

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
    titleHebrew: '...', titleSpanish: 'En construcción', hebrew: '', phonetic: '', translation: 'Agregando contenido...'
  };

  const traditionsList: { id: Tradition; name: string }[] = [
    { id: 'maguen-david', name: 'Maguen David' },
    { id: 'monte-sinai', name: 'Monte Sinai' },
    { id: 'sefaradi', name: 'Sefaradí' },
    { id: 'ashkenazi', name: 'Ashkenazí' },
    { id: 'jabad', name: 'Jabad (Ari)' }
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 transition-colors duration-300">
      
      {/* Cabecera conectada a tu función t(...) de i18n */}
      <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-xl font-serif font-bold tracking-wide">
          {t('berajotTitle', 'Berajot Cotidianas')}
        </h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block text-center">
          {t('berajotCommunity', 'Comunidad / Tradición')}
        </label>
        <select
          value={selectedTradition}
          onChange={(e) => {
            setSelectedTradition(e.target.value as Tradition);
            setCurrentIndex(0); 
          }}
          className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-amber-700 dark:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
        >
          {traditionsList.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* Submenú de Categorías de Berajot */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button 
          onClick={() => { setActiveCategory('despertar'); setCurrentIndex(0); }} 
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-1 justify-center ${
            activeCategory === 'despertar' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Sun className="w-3.5 h-3.5" /> {t('berajotWake', 'Al Despertar')}
        </button>
        <button 
          onClick={() => { setActiveCategory('cuerpo'); setCurrentIndex(0); }} 
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-1 justify-center ${
            activeCategory === 'cuerpo' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Shield className="w-3.5 h-3.5" /> {t('berajotBody', 'Cuerpo')}
        </button>
        <button 
          onClick={() => { setActiveCategory('alimentos'); setCurrentIndex(0); }} 
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-1 justify-center ${
            activeCategory === 'alimentos' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" /> {t('berajotFood', 'Alimentos')}
        </button>
      </div>

      {/* Modos de visualización de texto (Hebreo, Fonética, Traducción del idioma activo) */}
      <div className="flex justify-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px]">
        {(['hebrew', 'phonetic', 'translation'] as TextDisplayMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setDisplayMode(mode)}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              displayMode === mode ? 'bg-slate-800 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {mode === 'hebrew' ? 'עברית' : mode === 'phonetic' ? t('berajotPhonetic', 'Fonética') : t('berajotTranslation', 'Traducción')}
          </button>
        ))}
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner transition-colors duration-300">
        <div className="flex justify-between items-center">
          <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
            {currentItem.titleHebrew}
          </span>
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            {currentItem.titleSpanish}
          </h3>
        </div>

        <div className="min-h-[140px] flex items-center justify-center text-center">
          {displayMode === 'hebrew' && (
            <p className="text-xl font-serif leading-relaxed text-right text-slate-900 dark:text-slate-100" dir="rtl">
              {currentItem.hebrew}
            </p>
          )}
          {displayMode === 'phonetic' && (
            <p className="text-sm font-sans italic text-slate-700 dark:text-slate-300 leading-relaxed px-2">
              "{currentItem.phonetic}"
            </p>
          )}
          {displayMode === 'translation' && (
            <p className="text-sm font-sans text-slate-600 dark:text-slate-300 leading-relaxed px-2">
              {currentItem.translation[(localStorage.getItem('language') || 'es') as keyof typeof currentItem.translation] || currentItem.translation.es}
              </p>
            )}
        </div>

        <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentList.length - 1))}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {t('prev', 'Anterior')}
          </button>
          <span className="text-slate-400 text-[11px] self-center">
            {currentList.length > 0 ? `${currentIndex + 1} de ${currentList.length}` : '0 de 0'}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev < currentList.length - 1 ? prev + 1 : 0))}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {t('next', 'Siguiente')}
          </button>
        </div>
      </div>

    </div>
  );
}