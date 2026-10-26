import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Base de datos global ampliada con productos reales y agencias internacionales
const GLOBAL_KOSHER_DATABASE = [
  // Botanas y Snacks
  { name: 'Papas Sabritas (Original / Sal)', agency: 'KMD México / OU', type: 'Parve', notes: 'Verificar sello KMD o OU en el empaque frontal o posterior.' },
  { name: 'Sabritas Paketaxo / Crujitos (Selección)', agency: 'KMD México', type: 'Parve / Lácteo', notes: 'Revisar si especifica lácteo en la tabla nutrimental y sello KMD.' },
  { name: 'Doritos Nacho / Pringles (Original)', agency: 'OU (Orthodox Union - USA)', type: 'Lácteo (Chalav Stam)', notes: 'Contiene sólidos de leche. Certificado por OU Kosher.' },
  { name: 'Barcel Takis / Chips (Variedades seleccionadas)', agency: 'KMD México', type: 'Parve', notes: 'Bajo supervisión de KMD. Verificar sello en la bolsa.' },

  // Bebidas
  { name: 'Coca-Cola (Regular, Light, Zero)', agency: 'OU (Orthodox Union - USA)', type: 'Parve', notes: 'Aceptado globalmente todo el año (no apto para Pésaj sin sello especial K-P).' },
  { name: 'Pepsi / 7Up / Mirinda', agency: 'OU / OK Kosher', type: 'Parve', notes: 'Certificado kosher year-round bajo supervisión regular.' },
  { name: 'Jumex (Néctares en lata seleccionados)', agency: 'KMD México', type: 'Parve', notes: 'Variedades de manzana y durazno con supervisión KMD.' },
  { name: 'Café Nescafé Clásico / Legal', agency: 'KMD México / OU', type: 'Parve', notes: 'Café soluble puro sin aditivos lácteos.' },

  // Abarrotes y Aceites
  { name: 'Aceite 123 / Aceite Capullo', agency: 'KMD México', type: 'Parve', notes: 'Aceites vegetales puros aptos para uso diario bajo KMD.' },
  { name: 'Atún Dolores / Tuny (Agua y Aceite)', agency: 'KMD México', type: 'Parve (Beshul Israel / Itkaj)', notes: 'Requiere supervisión estricta de KMD en latas comerciales.' },
  { name: 'Fórmulas y Harinas de Trigo Selectas', agency: 'KMD México / OU', type: 'Parve', notes: 'Harinas certificadas libres de plagas e insectos (Check Itkaj).' },

  // Panadería y Galletas
  { name: 'Bimbo (Pan Blanco y Bimbolatín seleccionado)', agency: 'KMD México', type: 'Parve (L’Mehadrin)', notes: 'Líneas especiales bajo supervisión estricta de la Comunidad Magen David.' },
  { name: 'Galletas Gamesa (Marías / Emperador seleccionadas)', agency: 'KMD México / OU', type: 'Lácteo / Parve', notes: 'Verificar el tipo de sello impreso en la envoltura.' },

  // Chocolates y Dulces
  { name: 'Nestlé Chocolate Abuelita', agency: 'KMD México / Certificación Internacional', type: 'Lácteo', notes: 'Contiene derivados lácteos. Verificar sello de la comunidad.' },
  { name: 'Hershey’s (Jarabe de Chocolate / Barras)', agency: 'OU (Orthodox Union)', type: 'Lácteo / Parve', notes: 'Dependiendo de la barra, verificar si es lácteo (Dairy) o parve.' },

  // Productos de Israel y Europa
  { name: 'Alimentos y Vinos de Israel (Lior / Carmel)', agency: 'Badatz / הרבנות הראשית לישראל', type: 'Parve / Lácteo', notes: 'Cumple con los máximos estándares de kashrut de Badatz Jerusalem.' },
  { name: 'Galletas y Chocolates importados de Europa', agency: 'KLBD (London Beth Din) / OU Europe', type: 'Variado', notes: 'Común en tiendas de importación kosher.' }
];

export const KosherCheckerTab: React.FC = () => {
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

        {/* Alerta importante sobre sellos y vigencia */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p className="font-bold text-amber-900 dark:text-amber-200">
              {isHebrew ? 'הודעת אזהרה חשובה על תוקף כשרות' : 'Aviso importante sobre vigencia de sellos'}
            </p>
            <p>
              {isHebrew 
                ? 'רשימות אלו משמשות כהوجایا בלבד. מוצרים רבים עשויים לשנות את ססטוס הכשרות שלהם מעת לעת. תמיד חובה לוודא את חותמת הכשרות המקורית על גבי אריזת המוצר.'
                : 'Las certificaciones de kashrut son dinámicas y pueden cambiar con el tiempo (pérdida de sello, cambio de planta, etc.). Esta lista es una referencia orientativa; siempre debes verificar físicamente el sello de supervisión vigente en el envase del producto.'}
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSearch} className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isHebrew ? 'חפש מוצר, מותג או רכיב...' : 'Escribe producto o marca (ej. Sabritas, Coca-Cola, Bimbo)...'}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
              />
            </div>

            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              <option value="all">{isHebrew ? 'כל גופי הכשרות בעולם' : 'Todas las Agencias (Global)'}</option>
              <option value="kmd">KMD (México)</option>
              <option value="ou">OU / OK (USA / Global)</option>
              <option value="badatz">Badatz / הרבנות (Israel)</option>
              <option value="alef">Kosher Alef & One Kosher</option>
            </select>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-600/25 transition cursor-pointer flex items-center justify-center gap-2 shrink-0"
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
              <div className="p-6 text-center rounded-2xl bg-amber-50/50 dark:bg-slate-800/40 border border-amber-200 dark:border-amber-900/40 text-slate-600 dark:text-slate-300">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <p className="text-sm font-semibold">
                  {isHebrew ? 'המוצר אינו ברשימה המהירה. מומלץ לשאול את הרב בשיחה.' : 'No está en la lista rápida global. Puedes preguntarle directamente al Rabino Virtual en el chat adjuntando una foto de la etiqueta.'}
                </p>
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

        {/* Nota global */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300/60 dark:border-amber-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
            <p className="font-semibold text-amber-900 dark:text-amber-200">
              {isHebrew ? 'כיצד לוודא כשרות מוצרים מיובאים?' : '¿Cómo verificar productos importados de todo el mundo?'}
            </p>
            <p>
              {isHebrew 
                ? 'המערכת משלבת סטנדרטים מכל העולם. תמיד יש לוודא את חותמת הכשרות המקורית המאושרת על ידי הקהילה המקومیות שלך.'
                : 'Este directorio unifica pautas de KMD, OU, Badatz y agencias globales. Si tienes dudas sobre si un producto mantiene su certificación actual, utiliza la cámara en la pestaña de Diálogo Rabínico para que la IA verifique la etiqueta directamente.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KosherCheckerTab;