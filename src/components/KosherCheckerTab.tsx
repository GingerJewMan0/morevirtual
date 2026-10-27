import React, { useState } from 'react';
import { 
  Globe,
  Search, 
  AlertTriangle, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Directorio oficial de agencias y listas de certificación kosher reconocidas mundialmente.
 */
const OFFICIAL_KOSHER_DIRECTORIES = [
  {
    name: 'OU Kosher Product Search',
    agency: 'OU (Orthodox Union)',
    description: 'Buscador oficial en tiempo real de la agencia de certificación kosher más grande del mundo[cite: 15].',
    url: 'https://oukosher.org/product-search/',
    category: 'Global / Masivo'
  },
  {
    name: 'OK Kosher Consumer Directory',
    agency: 'OK Kosher',
    description: 'Base de datos global de productos e ingredientes certificados por OK Kosher.',
    url: 'https://www.ok.org/consumer/search/',
    category: 'Global / Industrial'
  },
  {
    name: 'Star-K Food Directory',
    agency: 'Star-K',
    description: 'Directorio completo de productos aprobados, medicamentos y guías de Pésaj[cite: 15].',
    url: 'https://www.star-k.org/articles/food-directory',
    category: 'Global / Alimentos y Medicamentos'
  },
  {
    name: 'Badatz Eida HaChareidit',
    agency: 'Badatz Jerusalem',
    description: 'Supervisión estricta Mehadrin para productos en Israel y de importación[cite: 15].',
    url: 'https://www.edahatzchareidit.org/',
    category: 'Mehadrin / Israel'
  },
  {
    name: 'Kashrut.com (Alertas y Listas)',
    agency: 'Kashrut.com',
    description: 'Portal independiente de referencia mundial con enlaces a alertas de kashrut y guías globales[cite: 15].',
    url: 'https://www.kashrut.com/',
    category: 'Guías y Alertas'
  }
];

interface KosherCheckerTabProps {
  onAskRabbi?: (question: string) => void;
}

export const KosherCheckerTab: React.FC<KosherCheckerTabProps> = ({ onAskRabbi }) => {
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('all');

  // Filtrar directorios oficiales según la búsqueda y agencia seleccionada
  const filteredDirectories = OFFICIAL_KOSHER_DIRECTORIES.filter(dir => {
    const matchesSearch = 
      dir.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      dir.agency.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      dir.description.toLowerCase().includes(searchTerm.toLowerCase().trim());
    
    const matchesAgency = 
      selectedAgency === 'all' || 
      dir.agency.toLowerCase().includes(selectedAgency.toLowerCase());

    return matchesSearch && matchesAgency;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 animate-fadeIn" dir={isHebrew ? 'rtl' : 'ltr'}>
      <div className="rounded-3xl border p-6 md:p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-100">
        
        {/* Cabecera */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
            <Globe className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-amber-400">
              {isHebrew ? 'מנוע חיפוש כשרות עולמי' : 'Buscador y Enlaces Kosher Global'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isHebrew 
                ? 'חיפוש ישיר במאגרים ובאתרים הרשמיים של גופי הכשרות המובילים בעולם.'
                : 'Buscador directo en las páginas web y directorios oficiales de certificación kosher[cite: 15].'}
            </p>
          </div>
        </div>

        {/* Alerta importante */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p className="font-bold text-amber-900 dark:text-amber-200">
              {isHebrew ? 'הודעת אזהרה חשובה על תוקף כשרות' : 'Aviso importante sobre fuentes oficiales'}
            </p>
            <p>
              {isHebrew 
                ? 'המידע נשאב ישירות מאתרי האינטרנט הרשמיים של גופי הכשרות. מומלץ לוודא תמיד את תוקף המוצר במקור.'
                : 'Esta sección te conecta directamente con los buscadores oficiales de las agencias de kashrut para garantizar información actualizada en tiempo real[cite: 15].'}
            </p>
          </div>
        </div>

        {/* Formulario de Búsqueda de Agencias */}
        <div className="space-y-3 mb-8">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isHebrew ? 'חפש לפי גוף כשרות או מילת מפתח...' : 'Filtra por agencia o categoría (ej. OU, Star-K, Badatz)...'}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition shadow-sm"
            />
          </div>

          <div className="w-full">
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm"
            >
              <option value="all">{isHebrew ? 'כל גופי הכשרות בעולם' : 'Todas las Agencias (Global)'}</option>
              <option value="ou">OU (Orthodox Union)</option>
              <option value="ok">OK Kosher</option>
              <option value="star-k">Star-K</option>
              <option value="badatz">Badatz Jerusalem</option>
            </select>
          </div>
        </div>

        {/* LISTA DE ENLACES A PÁGINAS Y DIRECTORIOS OFICIALES */}
        <div className="pt-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              {isHebrew ? 'קישורים למאגרים רשמיים' : 'Páginas y Directorios Oficiales Certificados'}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {filteredDirectories.length} {isHebrew ? 'זמינים' : 'disponibles'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDirectories.map((dir, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-amber-500/50 transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-slate-900 dark:text-white text-base">
                      {dir.name}
                    </h4>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shrink-0">
                      {dir.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {dir.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {dir.agency}
                  </span>
                  <a
                    href={dir.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isHebrew ? 'פתח אתר' : 'Consultar en Web'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredDirectories.length === 0 && (
            <div className="text-center py-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500">
                {isHebrew ? 'לא נמצאו מדריכים תואמים.' : 'No se encontraron agencias oficiales exactas para este filtro.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default KosherCheckerTab;