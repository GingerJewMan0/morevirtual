import React, { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

// Importaciones de tus bases de datos
import { maguenDavidSidur } from '../data/sidur/maguenDavid';
import { monteSinaiSidur } from '../data/sidur/monteSinai';
import { sefaradiSidur } from '../data/sidur/sefaradi';
import { ashkenaziSidur } from '../data/sidur/ashkenazi';
import { jabadSidur } from '../data/sidur/jabad';

interface SidurTabProps {
  t: (key: string, fallback: string) => string;
}

type Tradition = 'maguen-david' | 'monte-sinai' | 'ashkenazi' | 'sefaradi' | 'jabad';
type ViewMode = 'hebrew' | 'phonetic' | 'translation';

export function SidurTab({ t }: SidurTabProps) {
  const [selectedTradition, setSelectedTradition] = useState<Tradition>('maguen-david');
  const [activeSection, setActiveSection] = useState<'sidur' | 'tehilim'>('sidur');
  const [viewMode, setViewMode] = useState<ViewMode>('phonetic');
  const [currentIndex, setCurrentIndex] = useState(0);

  // El sistema cambia la fuente de datos según la selección del usuario
  const getSidurData = () => {
    switch (selectedTradition) {
      case 'monte-sinai': return monteSinaiSidur;
      case 'sefaradi': return sefaradiSidur;
      case 'ashkenazi': return ashkenaziSidur;
      case 'jabad': return jabadSidur;
      case 'maguen-david':
      default: return maguenDavidSidur;
    }
  };

  const currentList = getSidurData();
  // Evita errores si un archivo está vacío temporalmente
  const currentItem = currentList[currentIndex] || {
    titleHebrew: '...', titleSpanish: 'En construcción', hebrew: '', phonetic: '', translation: 'Agregando rezos a esta tradición...'
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
      
      <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-xl font-serif font-bold tracking-wide">Sidur & Tehilim</h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block text-center">
          Tradición / Nusaj
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

      <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => { setActiveSection('sidur'); setCurrentIndex(0); }}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            activeSection === 'sidur' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Sidur Diario
        </button>
        <button
          onClick={() => { setActiveSection('tehilim'); setCurrentIndex(0); }}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            activeSection === 'tehilim' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Tehilim
        </button>
      </div>

      <div className="flex justify-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px]">
        {(['hebrew', 'phonetic', 'translation'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              viewMode === mode ? 'bg-slate-800 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {mode === 'hebrew' ? 'עברית' : mode === 'phonetic' ? 'Fonética' : 'Español'}
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

        <div className="min-h-[130px] flex items-center justify-center text-center">
          {viewMode === 'hebrew' && (
            <p className="text-2xl font-serif leading-relaxed text-right text-slate-900 dark:text-slate-100" dir="rtl">
              {currentItem.hebrew}
            </p>
          )}
          {viewMode === 'phonetic' && (
            <p className="text-sm font-sans italic text-slate-700 dark:text-slate-300 leading-relaxed px-2">
              "{currentItem.phonetic}"
            </p>
          )}
          {viewMode === 'translation' && (
            <p className="text-sm font-sans text-slate-600 dark:text-slate-300 leading-relaxed px-2">
              {currentItem.translation}
            </p>
          )}
        </div>

        <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentList.length - 1))}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-lg font-medium transition-colors"
          >
            Anterior
          </button>
          <span className="text-slate-400 text-[11px] self-center">
            {currentList.length > 0 ? `${currentIndex + 1} de ${currentList.length}` : '0 de 0'}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev < currentList.length - 1 ? prev + 1 : 0))}
            className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-lg font-medium transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400 italic text-center font-serif flex items-center justify-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
        <span>Tradición comunitaria: <strong className="uppercase">{selectedTradition.replace('-', ' ')}</strong></span>
      </div>

    </div>
  );
}