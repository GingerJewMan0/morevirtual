/**
 * ============================================================================
 * COMPONENTE: KosherCheckerTab.tsx
 * Buscador inteligente con enlaces directos a KMD, One Kosher, K-Alef y más
 * ============================================================================
 */

import React, { useState } from 'react';
import { Search, ShieldCheck, ExternalLink, Sparkles, Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface KosherAgency {
  name: string;
  region: string;
  description: string;
  baseUrl: string;
  searchExample: string;
}

const GLOBAL_AND_REGIONAL_AGENCIES: KosherAgency[] = [
  {
    name: 'KMD (Kashrut Maguen David)',
    region: 'México / LATAM',
    description: 'La agencia líder en certificación kosher en México y Latinoamérica con miles de productos y establecimientos registrados.',
    baseUrl: 'https://www.kosher.com.mx/',
    searchExample: 'Dulces, tequilas, lácteos y alimentos en México',
  },
  {
    name: 'One Kosher International',
    region: 'México / Internacional',
    description: 'Agencia de certificación de gran prestigio en Polanco, CDMX, con buscador directo de productos y banquetes certificados.',
    baseUrl: 'https://www.onekosher.org/buscador/',
    searchExample: 'Alimentos, restaurantes y servicios de banquete',
  },
  {
    name: 'K-Alef / KF Kosher',
    region: 'Internacional / UK',
    description: 'Organización reconocida internacionalmente que provee los más altos estándares de certificación kosher bajo supervisión rabínica.',
    baseUrl: 'https://kfkosher.org/',
    searchExample: 'Ingredientes industriales y productos importados',
  },
  {
    name: 'OU Kosher (Orthodox Union)',
    region: 'Global (EE.UU. / Mundial)',
    description: 'La agencia de certificación kosher más grande del mundo. Su base de datos cuenta con más de un millón de productos.',
    baseUrl: 'https://oukosher.org/product-search/',
    searchExample: 'Cualquier producto masivo o empacado importado',
  },
  {
    name: 'OK Kosher Certification',
    region: 'Global / Industrial',
    description: 'Sello de kashrut de prestigio mundial especializado en productos de consumo masivo, vinos e ingredientes.',
    baseUrl: 'https://www.ok.org/consumers/kosher-search/',
    searchExample: 'Bebidas, chocolates y materias primas',
  },
  {
    name: 'Star-K Kosher Certification',
    region: 'Global / Alimentos y Medicamentos',
    description: 'Directorio completo de productos aprobados, guías de Pésaj y certificación de medicamentos y suplementos.',
    baseUrl: 'https://www.star-k.org/articles/food-directory/',
    searchExample: 'Medicamentos, vitaminas y abarrotes',
  },
];

interface KosherCheckerTabProps {
  onAskRabbi: (questionText: string) => void;
}

export function KosherCheckerTab({ onAskRabbi }: KosherCheckerTabProps) {
  const { t } = useTranslation();
  const [productQuery, setProductQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productQuery.trim()) return;
    onAskRabbi(`¿Qué marcas y productos de "${productQuery}" están certificados por KMD, One Kosher, K-Alef u otras agencias de kashrut válidas?`);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8 animate-fadeIn">
      {/* Cabecera */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/20 via-amber-500/10 to-slate-900/5 border border-emerald-500/30 shadow-lg text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-emerald-400">
          {t('kosherHeaderTitle')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('kosherHeaderSubtitle')}
        </p>
      </div>

      {/* Buscador inteligente integrado con consulta al Rabino */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300/80 dark:border-amber-600/50 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>{t('kosherSearchSection')}</span>
        </div>
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-amber-600" />
            </span>
            <input
              type="text"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              placeholder={t('kosherSearchPlaceholder')}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!productQuery.trim()}
            className={`px-6 py-3.5 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer ${
              productQuery.trim()
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{t('kosherSearchBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Tarjetas con Enlaces Directos a las Páginas Web de Kosher */}
      <div className="space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
            {t('kosherDirectoriesTitle')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('kosherDirectoriesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOBAL_AND_REGIONAL_AGENCIES.map((agency, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
                    {agency.region}
                  </span>
                  <Globe className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  {agency.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {agency.description}
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 italic pt-1">
                  Ideal para: {agency.searchExample}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">{t('kosherOfficialSite')}</span>
                <a
                  href={agency.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>{t('kosherOpenWeb')}</span>
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