import React from 'react';
import { Moon } from 'lucide-react';

export function ShabbatLockScreen() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 text-amber-400 animate-pulse">
        <Moon className="w-12 h-12" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 mb-3">
        שבת שלום — Shabat Shalom
      </h1>
      <p className="max-w-md text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
        El Rabino Virtual se encuentra en descanso sabático o por yom tov. Que tengas un Shabat o yom tov lleno de paz, luz y bendición. Nos reencontramos a la salida.
      </p>
      <div className="text-xs font-mono text-slate-500 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
        Modo Halájico Global Activo • Operaciones suspendidas
      </div>
    </div>
  );
}