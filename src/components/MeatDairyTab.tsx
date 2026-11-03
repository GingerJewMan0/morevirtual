import React, { useState, useEffect } from 'react';
import { Timer, Bell, CheckCircle2, RotateCcw, Utensils } from 'lucide-react';

interface MeatDairyTabProps {
  t: (key: string, fallback: string) => string;
}

const SIX_HOURS_MS = 6 * 60 * 60 * 1000; // 6 Horas en milisegundos

export function MeatDairyTab({ t }: MeatDairyTabProps) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Cargar estado guardado al montar el componente
  useEffect(() => {
    const savedStartTime = localStorage.getItem('meat_timer_start_time');
    if (savedStartTime) {
      const parsedTime = parseInt(savedStartTime, 10);
      setStartTime(parsedTime);
    }
  }, []);

  // Lógica del conteo regresivo
  useEffect(() => {
    if (!startTime) {
      setTimeLeft(0);
      setIsCompleted(false);
      return;
    }

    const checkTimer = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = SIX_HOURS_MS - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setIsCompleted(true);
        sendNotification();
      } else {
        setTimeLeft(remaining);
        setIsCompleted(false);
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  };

  const sendNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(t('timerNotifTitle', '¡Esperas de Carne concluidas! 🥛'), {
        body: t('timerNotifBody', 'Ha transcurrido el tiempo estipulado (6 horas). Ya puedes consumir alimentos lácteos.'),
        icon: '/pwa-192x192.png'
      });
    }
  };

  const startTimer = async () => {
    await requestNotificationPermission();
    const now = Date.now();
    localStorage.setItem('meat_timer_start_time', now.toString());
    setStartTime(now);
  };

  const resetTimer = () => {
    localStorage.removeItem('meat_timer_start_time');
    setStartTime(null);
    setTimeLeft(0);
    setIsCompleted(false);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = startTime 
    ? Math.min(100, Math.max(0, ((SIX_HOURS_MS - timeLeft) / SIX_HOURS_MS) * 100))
    : 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6 backdrop-blur-md transition-colors duration-300">
      
      {/* Encabezado */}
      <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
        <Timer className="w-6 h-6 animate-pulse" />
        <h2 className="text-xl font-serif font-bold tracking-wide">
          {t('meatTimerTitle', 'Temporizador Carne a Leche')}
        </h2>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {t('meatTimerSubtitle', 'Conteo regresivo de 6 horas para la espera entre carne y lácteos.')}
      </p>

      {/* Reloj y Estado */}
      <div className="relative py-8 px-4 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-inner space-y-4">
        {isCompleted ? (
          <div className="space-y-3 py-4 animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {t('dairyAllowedTitle', '¡Ya puedes comer lácteos!')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
              {t('dairyAllowedDesc', 'Han concluido las 6 horas de espera desde que consumiste carne.')}
            </p>
          </div>
        ) : (
          <>
            <div className="text-5xl font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400">
              {startTime ? formatTime(timeLeft) : '06:00:00'}
            </div>

            {startTime && (
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Botones de control */}
      <div className="flex gap-3 justify-center">
        {!startTime ? (
          <button
            onClick={startTimer}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            {t('startMeatTimer', 'Acabo de comer carne (Iniciar 6h)')}
          </button>
        ) : (
          <button
            onClick={resetTimer}
            className="w-full py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            {t('resetTimer', 'Reiniciar Temporizador')}
          </button>
        )}
      </div>

      {/* Indicador de Notificación */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <Bell className="w-3.5 h-3.5 text-amber-500" />
        <span>{t('notifHint', 'Recibirás una notificación automática al finalizar.')}</span>
      </div>

    </div>
  );
}