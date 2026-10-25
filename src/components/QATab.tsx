import React from 'react';
import { Info, HelpCircle, Shield, RefreshCw, Smartphone } from 'lucide-react';

export function QATab() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn py-4">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Cabecera de la sección */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
              Preguntas Frecuentes (Q&A)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Aclaraciones sobre tu cuenta, suscripciones, restauración y funcionamiento de la aplicación.
            </p>
          </div>
        </div>

        {/* Lista de Preguntas y Respuestas */}
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
          
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/80 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
              <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
              <h3>¿Qué pasa si formateo mi teléfono o cambio de dispositivo? ¿Pierdo mi suscripción?</h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              No. Las compras y suscripciones prémium están vinculadas directamente a tu cuenta personal de la tienda de aplicaciones (Apple ID en iOS o Google Play en Android). Al reinstalar la aplicación e iniciar sesión con la misma cuenta, tu acceso prémium se recupera de manera automática.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/80 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
              <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
              <h3>¿Cómo puedo restaurar mis compras si la app no reconoce mi estatus prémium?</h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Puedes utilizar la opción de "Restaurar compras" integrada en los ajustes o en la pasarela de pago de la aplicación para sincronizar de inmediato tu cuenta con los servidores oficiales de la tienda.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/80 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
              <Shield className="w-4 h-4 text-amber-600 shrink-0" />
              <h3>¿Cómo funciona el bloqueo automático de Shabat?</h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              La aplicación detecta las coordenadas de tu ubicación actual y calcula con absoluta precisión la entrada y salida del Shabat y festividades judías (Yom Tov) para pausar la interacción activa de acuerdo con los lineamientos de la halajá.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}