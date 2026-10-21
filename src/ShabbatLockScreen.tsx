import React from 'react';
import { Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ShabbatLockScreen() {
  const { i18n } = useTranslation();

  // ==========================================================================
  // DETECCIÓN Y SELECCIÓN DE IDIOMA PARA LA PANTALLA DE REPOSO
  // ==========================================================================
  const rawLang = i18n.language || localStorage.getItem('i18nextLng') || 'es';
  const currentLang = rawLang.toLowerCase().includes('he')
    ? 'he'
    : rawLang.toLowerCase().includes('en')
    ? 'en'
    : rawLang.toLowerCase().includes('pt')
    ? 'pt'
    : rawLang.toLowerCase().includes('fr')
    ? 'fr'
    : 'es';

  const isHebrew = currentLang === 'he';

  // Textos traducidos para el bloqueo de Shabat / Yom Tov
  const content = {
    he: {
      title: 'שבת שלום או חג שמח',
      desc: 'הרב הווירטואלי נמצא במנוחת שבת או יום טוב. שיהיה לך שבת או יום טוב מלא בשלום, אור וברכה. ניפגש במוצאי השבת.',
      mode: 'מצב הלכתי גלובלי פעיל • פעולות מושעות',
    },
    en: {
      title: 'Shabbat Shalom or Hag Sameach',
      desc: 'The Virtual Rabbi is resting for Shabbat or Yom Tov. May you have a Shabbat or Yom Tov full of peace, light, and blessing. We will reconnect after Shabbat.',
      mode: 'Global Halachic Mode Active • Operations Suspended',
    },
    pt: {
      title: 'Shabbat Shalom ou Hag Sameach',
      desc: 'O Rabino Virtual está em descanso de Shabat ou Yom Tov. Que você tenha um Shabat ou Yom Tov cheio de paz, luz e bênção. Nos reencontramos após o término.',
      mode: 'Modo Halájico Global Ativo • Operações Suspensas',
    },
    fr: {
      title: 'Chabbat Chalom ou Hag Sameach',
      desc: "Le Rabbin Virtuel est en repos pour Chabbat ou Yom Tov. Que vous passiez un Chabbat ou un Yom Tov plein de paix, de lumière et de bénédiction. Nous nous retrouvons à la sortie.",
      mode: 'Mode Halachique Global Actif • Opérations Suspendues',
    },
    es: {
      title: 'Shabat Shalom o Jag Saméaj',
      desc: 'El Rabino Virtual se encuentra en descanso sabático o por yom tov. Que tengas un Shabat o yom tov lleno de paz, luz y bendición. Nos reencontramos a la salida.',
      mode: 'Modo Halájico Global Activo • Operaciones Suspendidas',
    },
  };

  const t = content[currentLang as keyof typeof content] || content.es;

  // ==========================================================================
  // RENDERIZADO DE LA PANTALLA DE BLOQUEO
  // ==========================================================================
  return (
    <div 
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none font-sans"
      dir={isHebrew ? 'rtl' : 'ltr'}
    >
      <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 text-amber-400 animate-pulse">
        <Flame className="w-12 h-12" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 mb-3 tracking-wide">
        {t.title}
      </h1>

      <p className="max-w-md text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
        {t.desc}
      </p>

      <div className="text-xs font-mono text-slate-500 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
        <span>{t.mode}</span>
      </div>
    </div>
  );
}

export default ShabbatLockScreen;