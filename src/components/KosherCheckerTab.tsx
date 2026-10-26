import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Globe,
  AlertTriangle,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Base de datos global de referencia rápida
const GLOBAL_KOSHER_DATABASE = [
  { name: 'Papas Sabritas (Original / Sal)', agency: 'KMD México / OU', type: 'Parve', notes: 'Verificar sello KMD o OU en el empaque frontal o posterior.' },
  { name: 'Sabritas Paketaxo / Crujitos (Selección)', agency: 'KMD México', type: 'Parve / Lácteo', notes: 'Revisar si especifica lácteo en la tabla nutrimental y sello KMD.' },
  { name: 'Doritos Nacho / Pringles (Original)', agency: 'OU (Orthodox Union - USA)', type: 'Lácteo (Chalav Stam)', notes: 'Contiene sólidos de leche. Certificado por OU Kosher.' },
  { name: 'Barcel Takis / Chips (Variedades seleccionadas)', agency: 'KMD México', type: 'Parve', notes: 'Bajo supervisión de KMD. Verificar sello en la bolsa.' },
  { name: 'Coca-Cola (Regular, Light, Zero)', agency: 'OU (Orthodox Union - USA)', type: 'Parve', notes: 'Aceptado globalmente todo el año (no apto para Pésaj sin sello especial K-P).' },
  { name: 'Pepsi / 7Up / Mirinda', agency: 'OU / OK Kosher', type: 'Parve', notes: 'Certificado kosher year-round bajo supervisión regular.' },
  { name: 'Jumex (Néctares en lata seleccionados)', agency: 'KMD México', type: 'Parve', notes: 'Variedades de manzana y durazno con supervisión KMD.' },
  { name: 'Café Nescafé Clásico / Legal', agency: 'KMD México / OU', type: 'Parve', notes: 'Café soluble puro sin aditivos lácteos.' },
  { name: 'Aceite 123 / Aceite Capullo', agency: 'KMD México', type: 'Parve', notes: 'Aceites vegetales puros aptos para uso diario bajo KMD.' },
  { name: 'Atún Dolores / Tuny (Agua y Aceite)', agency: 'KMD México', type: 'Parve (Beshul Israel / Itkaj)', notes: 'Requiere supervisión estricta de KMD en latas comerciales.' },
  { name: 'Bimbo (Pan Blanco y Bimbolatín seleccionado)', agency: 'KMD México', type: 'Parve (L’Mehadrin)', notes: 'Líneas especiales bajo supervisión estricta de la Comunidad Magen David.' },
  { name: 'Nestlé Chocolate Abuelita', agency: 'KMD México / Certificación Internacional', type: 'Lácteo', notes: 'Contiene derivados lácteos. Verificar sello de la comunidad.' },
  { name: 'Heinz (Catsup y Salsas seleccionadas)', agency: 'OU (Orthodox Union)', type: 'Parve', notes: 'La mayoría de catsup Heinz cuenta con certificación OU (verificar sello en la botella).' },
];

interface KosherCheckerTabProps {
  onAskRabbi?: (question: string) => void;
}

export const KosherCheckerTab: React.FC<KosherCheckerTabProps> = ({ onAskRabbi }) => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim() && selectedAgency === 'all') return;

    setHasSearched(true);
    const query = searchTerm.toLowerCase().trim();

    const filtered = GLOBAL_KOSHER_DATABASE.filter((item) => {
      const matchesText = item.name.toLowerCase().includes(query) || item.notes.toLowerCase().includes(query);
      const matchesAgency = selectedAgency === 'all' || item.agency.toLowerCase().includes(selectedAgency.toLowerCase());
      return matchesText && matchesAgency;
    });

    setSearchResult(filtered);
  };

  const handleConsultAI = () => {
    if (onAskRabbi && searchTerm.trim()) {
      onAskRabbi(`¿El producto o marca "${searchTerm}" cuenta con certificación Kosher vigente y bajo qué supervisión se encuentra a nivel global?`);
    }
  };

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
              {isHebrew ? 'מנוע חיפוש כשרות עולמי' : 'Buscador Kosher Global'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isHebrew 
                ? 'חיפוש מרכזי המשולב עם KMD, OU, OK, Badatz, Kosher Alef, One Kosher ועוד מכל העולם.'
                : 'Directorio unificado de KMD, OU, OK, Badatz, Kosher Alef, One Kosher y certificaciones internacionales.'}
            </p>
          </div>
        </div>

        {/* Alerta importante sobre vigencia y fuentes online */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p className="font-bold text-amber-900 dark:text-amber-200">
              {isHebrew ? 'הודעת אזהרה חשובה על תוקף כשרות' : 'Aviso importante sobre vigencia y fuentes globales'}
            </p>
            <p>
              {isHebrew 
                ? 'רשימות אלו משמשות כהوجایا בלבד. אם המוצר אינו מופיע, תוכל לבדוק אותו ישירות מול מקורות מוסמכים בעזרת הבינה המלאכותית בלשונית "דיאלוג רבני".'
                : 'Las certificaciones de kashrut son dinámicas. Este directorio sirve como referencia rápida; si buscas marcas globales (como Heinz u otras) que no aparezcan aquí, puedes consultar su estatus en tiempo real con la IA o mediante fuentes confiables en la pestaña de Diálogo Rabínico.'}
            </p>
          </div>
        </div>

        {/* Formulario adaptativo para Portrait y Landscape */}
        <form onSubmit={handleSearch} className="space-y-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            
            {/* Campo de texto de búsqueda */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isHebrew ? 'חפש מוצר, מותג או רכיב...' : 'Escribe producto o marca (ej. Heinz, Sabritas)...'}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              />
            </div>

            {/* Selector de Agencias */}
            <div className="w-full lg:w-64 shrink-0">
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 truncate"
              >
                <option value="all">{isHebrew ? 'כל גופי הכשרות בעולם' : 'Todas las Agencias (Global)'}</option>
                <option value="kmd">KMD (México)</option>
                <option value="ou">OU / OK (USA / Global)</option>
                <option value="badatz">Badatz / הרבנות (Israel)</option>
                <option value="alef">Kosher Alef & One Kosher</option>
              </select>
            </div>

            {/* Botón Buscar */}
            <button
              type="submit"
              className="w-full lg:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-600/25 transition cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>{isHebrew ? 'חפש' : 'Buscar'}</span>
            </button>
          </div>
        </form>

        {/* Resultados */}
        {hasSearched && searchResult && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              {isHebrew ? 'תוצאות במאגר העולמי' : 'Resultados en el Directorio Global'} ({searchResult.length})
            </h3>

            {searchResult.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-amber-50/50 dark:bg-slate-800/40 border border-amber-200 dark:border-amber-900/40 text-slate-600 dark:text-slate-300 space-y-3">
                <AlertCircle className="w-8 h-8 mx-auto text-amber-600" />
                <p className="text-sm font-semibold">
                  {isHebrew ? 'המוצר אינו ברשימה המהירה.' : `No se encontró "${searchTerm}" en el directorio rápido local.`}
                </p>
                <p className="text-xs text-slate-500">
                  {isHebrew 
                    ? 'ניתן לשאול את הרב המדווח לבדוק במקורות מידע מקוונים.'
                    : 'Puedes consultar su estatus oficial en tiempo real utilizando el buscador inteligente del Rabino Virtual.'}
                </p>
                {searchTerm.trim() && onAskRabbi && (
                  <button
                    onClick={handleConsultAI}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isHebrew ? 'שאל את הרב בשיחה' : `Consultar estatus global de "${searchTerm}" con IA`}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {searchResult.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                          {item.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800/40">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {item.notes}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block text-[11px] uppercase font-bold text-slate-400">{isHebrew ? 'גוף כשרות' : 'Supervisión'}</span>
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">{item.agency}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default KosherCheckerTab;