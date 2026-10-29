import React, { useState } from 'react';
import { convertGregorianToHebrew, getFutureEvents } from '../utils/hebrewDateUtils';

export default function HebrewDateConverter() {
  const [gregorianDate, setGregorianDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isAfterSunset, setIsAfterSunset] = useState<boolean>(false);
  const [conversionResult, setConversionResult] = useState<any>(null);

  const [hebDay, setHebDay] = useState<number>(1);
  const [hebMonth, setHebMonth] = useState<string>('Nisan');
  const [hebYear, setHebYear] = useState<number>(5787);
  const [futureEvents, setFutureEvents] = useState<any[]>([]);

  const handleConvert = () => {
    if (!gregorianDate) return;
    try {
      const dateObj = new Date(gregorianDate);
      const result = convertGregorianToHebrew(dateObj, isAfterSunset);
      setConversionResult(result);
    } catch (e) {
      console.error("Error al convertir fecha:", e);
    }
  };

  const handleSearchEvents = () => {
    try {
      const events = getFutureEvents(hebDay, hebMonth, hebYear, 5);
      setFutureEvents(events);
    } catch (e) {
      console.error("Error al proyectar eventos:", e);
      setFutureEvents([]);
    }
  };

  return (
    // Padding enorme en línea que es imposible que el navegador ignore
    <div style={{ paddingTop: '150px', paddingBottom: '100px' }} className="w-full max-w-4xl mx-auto px-4 space-y-6">
      
      {/* Título de prueba */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-4 border-red-500 shadow-sm space-y-2">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
          🚨 NUEVO CONVERSOR HEBREO 🚨
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Si ves este texto y las sirenas, el código nuevo ya cargó.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          1. Convertidor: Gregoriano a Hebreo
        </h3>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Fecha Gregoriana:</label>
          <input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100" />
        </div>
        <div className="py-1">
          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked={isAfterSunset} onChange={(e) => setIsAfterSunset(e.target.checked)} className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4" />
            ¿Es después del atardecer? (Anochecer)
          </label>
        </div>
        <button onClick={handleConvert} className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-md transition cursor-pointer">
          Convertir a Hebreo
        </button>
        {conversionResult && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl text-xs text-amber-950 dark:text-amber-200 space-y-1">
            <span className="font-bold block uppercase tracking-wider text-[11px] text-amber-800 dark:text-amber-400">Resultado:</span>
            <p className="text-base font-serif font-semibold">{conversionResult.stringFormat}</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          2. Buscador de Fechas Hebreas (Próximos Años)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label className="block text-xs font-semibold mb-1.5">Día:</label><input type="number" value={hebDay} onChange={(e) => setHebDay(Number(e.target.value))} min={1} max={30} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" /></div>
          <div><label className="block text-xs font-semibold mb-1.5">Mes:</label><input type="text" value={hebMonth} onChange={(e) => setHebMonth(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" /></div>
          <div><label className="block text-xs font-semibold mb-1.5">Año Base:</label><input type="number" value={hebYear} onChange={(e) => setHebYear(Number(e.target.value))} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" /></div>
        </div>
        <button onClick={handleSearchEvents} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition cursor-pointer">Calcular Próximos Años</button>
        {futureEvents.length > 0 && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs space-y-2">
            <span className="font-bold block uppercase tracking-wider text-[11px]">Proyección:</span>
            <ul className="space-y-1.5 pl-4 list-disc">
              {futureEvents.map((ev, index) => (
                <li key={index}>Año {ev.hebrewYear} ({ev.hebrewDateString}) ➔ <strong>{new Date(ev.gregorianDate).toLocaleDateString()}</strong></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}