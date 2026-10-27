/**
 * ============================================================================
 * COMPONENTE: KosherCheckerTab.tsx
 * Buscador interactivo de productos Kosher con resultados y enlaces directos
 * ============================================================================
 */

import React, { useState } from 'react';
import { Search, ShieldCheck, ExternalLink, Sparkles, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface KosherProduct {
  id: string;
  name: string;
  category: string;
  agency: string;
  certification: string;
  status: 'Certificado' | 'Revisar Alerta' | 'Parve / Lactosa';
  agencyUrl: string;
}

const KOSHER_DATABASE: KosherProduct[] = [
  { id: '1', name: 'Chocolate con Leche Lindt (Variedades seleccionadas)', category: 'Dulces y Chocolates', agency: 'OU Kosher', certification: 'OU-D (Lácteo)', status: 'Certificado', agencyUrl: 'https://oukosher.org' },
  { id: '2', name: 'Chocolate Oscuro Ghirardelli 60%', category: 'Dulces y Chocolates', agency: 'OK Kosher', certification: 'OK Kosher (Parve / Lácteo según lote)', status: 'Certificado', agencyUrl: 'https://www.ok.org' },
  { id: '3', name: 'Galletas Oreo (Originales USA)', category: 'Galletas y Snacks', agency: 'OU Kosher', certification: 'OU-Dairy', status: 'Certificado', agencyUrl: 'https://oukosher.org' },
  { id: '4', name: 'Aceite de Oliva Extra Virgen Kirkland Signature', category: 'Aceites y Semillas', agency: 'Star-K', certification: 'Star-K Kosher for Passover', status: 'Certificado', agencyUrl: 'https://www.star-k.org' },
  { id: '5', name: 'Cereal Cheerios Original', category: 'Cereales', agency: 'OU Kosher', certification: 'OU Kosher', status: 'Certificado', agencyUrl: 'https://oukosher.org' },
  { id: '6', name: 'Vino Kosher Barkan Classic Cabernet Sauvignon', category: 'Bebidas y Vinos', agency: 'Badatz Jerusalem', certification: 'Badatz Mehadrin', status: 'Certificado', agencyUrl: 'https://www.badatz.org' },
  { id: '7', name: 'Mantequilla sin Sal Lurpak', category: 'Lácteos', agency: 'OK Kosher', certification: 'Cholov Yisroel / Chalav Yisrael', status: 'Certificado', agencyUrl: 'https://www.ok.org' },
  { id: '8', name: 'Arroz Blanco Extra Grano (Marcas Generales)', category: 'Granos y Abarrotes', agency: 'Star-K', certification: 'Aprobado sin Pésaj / Todo el año', status: 'Certificado', agencyUrl: 'https://www.star-k.org' },
];

const OFFICIAL_AGENCIES = [
  {
    name: 'OU Kosher Product Search',
    tagline: 'Global / Masivo',
    desc: 'Buscador oficial en tiempo real de la agencia de certificación kosher más grande del mundo.',
    agencyKey: 'OU (Orthodox Union)',
    url: 'https://oukosher.org/product-search/',
  },
  {
    name: 'OK Kosher Consumer Directory',
    tagline: 'Global / Industrial',
    desc: 'Base de datos global de productos e ingredientes certificados por OK Kosher.',
    agencyKey: 'OK Kosher',
    url: 'https://www.ok.org/consumers/kosher-search/',
  },
  {
    name: 'Star-K Food Directory',
    tagline: 'Global / Alimentos y Medicamentos',
    desc: 'Directorio completo de productos aprobados, medicamentos y guías de Pésaj.',
    agencyKey: 'Star-K',
    url: 'https://www.star-k.org/articles/food-directory/',
  },
  {
    name: 'Badatz Eida HaChareidit',
    tagline: 'Mehadrin / Israel',
    desc: 'Supervisión estricta Mehadrin para productos en Israel y de importación.',
    agencyKey: 'Badatz Jerusalem',
    url: 'https://www.badatz.org/',
  },
  {
    name: 'Kashrut.com (Alertas y Listas)',
    tagline: 'Guías y Alertas',
    desc: 'Portal independiente de referencia mundial con enlaces a alertas de kashrut y guías globales.',
    agencyKey: 'Kashrut.com',
    url: 'https://www.kashrut.com/',
  },
];

interface KosherCheckerTabProps {
  onAskRabbi: (questionText: string) => void;
}

export function KosherCheckerTab({ onAskRabbi }: KosherCheckerTabProps) {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgencyFilter, setSelectedAgencyFilter] = useState('all');

  const filteredProducts = KOSHER_DATABASE.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.certification.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAgency = selectedAgencyFilter === 'all' || item.agency === selectedAgencyFilter;

    return matchesQuery && matchesAgency;
  });

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8 animate-fadeIn">
      {/* Cabecera */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/20 via-amber-500/10 to-slate-900/5 border border-emerald-500/30 shadow-lg text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-emerald-400">
          {i18n.language === 'he' ? 'בדיקת כשרות מוצרים' : 'Buscador y Verificador Kosher'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Escribe un producto (ej. <em>Chocolate</em>, <em>Vino</em>, <em>Galletas</em>) para buscar en nuestra base de datos o consulta directamente los directorios oficiales de las principales agencias de kashrut en el mundo.
        </p>
      </div>

      {/* Barra de Búsqueda Interactiva de Productos */}
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-amber-600" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Escribe un producto para buscar kashrut (ej. chocolate, aceite, vino)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-300/80 dark:border-amber-600/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-sm text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Filtro rápido por Agencia */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-amber-600" /> Filtrar:
          </span>
          {['all', 'OU Kosher', 'OK Kosher', 'Star-K', 'Badatz Jerusalem'].map((agency) => (
            <button
              key={agency}
              onClick={() => setSelectedAgencyFilter(agency)}
              className={`px-3 py-1.5 rounded-xl font-medium transition shrink-0 cursor-pointer ${
                selectedAgencyFilter === agency
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
              }`}
            >
              {agency === 'all' ? 'Todas las Agencias' : agency}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados de la Búsqueda de Productos */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Resultados de Productos Certificados ({filteredProducts.length})
        </h3>

        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              No se encontró un registro exacto en el índice rápido.
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Puedes verificar este producto directamente en las páginas oficiales de abajo o consultarlo con el Rabino Virtual.
            </p>
            <button
              onClick={() => onAskRabbi(`¿El producto "${searchQuery}" cuenta con certificación Kosher válida y qué agencia lo supervisa?`)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow transition cursor-pointer"
            >
              Preguntar al Rabino sobre "{searchQuery || 'este producto'}"
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                      {product.agency}
                    </span>
                    <span className="text-slate-400 text-[11px]">{product.category}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {product.name}
                  </h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sello: {product.certification}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ {product.status}
                  </span>
                  <a
                    href={product.agencyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-amber-800 dark:text-amber-300 font-semibold text-xs transition flex items-center gap-1"
                  >
                    <span>Verificar en web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enlaces y Directorios Oficiales de Agencias */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
            Páginas y Directorios Oficiales Certificados
          </h3>
          <p className="text-xs text-slate-500">
            Acceso directo a los buscadores oficiales de las principales agencias de kashrut del mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_AGENCIES.map((agency, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                    {agency.tagline}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  {agency.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {agency.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Directorio Oficial</span>
                <a
                  href={agency.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>Consultar en Web</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KosherCheckerTab;