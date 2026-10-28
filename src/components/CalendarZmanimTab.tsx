import { useState, useEffect } from 'react';
import { Flame, Moon, Clock, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CITIES_DATABASE, getDefaultCity } from '../data/citiesZmanim';

export function CalendarZmanimTab() {
  const { t } = useTranslation();
  
  // Estado de la ciudad seleccionada (inicia detectando por geolocalización o región)
  const [selectedCityId, setSelectedCityId] = useState<string>(CITIES_DATABASE[0].id);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [shabbatData, setShabbatData] = useState<any>(null);
  const [zmanimDaily, setZmanimDaily] = useState<any>(null);

  // Detectar la ciudad del usuario por geolocalización al cargar el componente
  useEffect(() => {
    async function initUserCity() {
      try {
        const defaultCity = await getDefaultCity();
        if (defaultCity) {
          setSelectedCityId(defaultCity.id);
        }
      } catch (e) {
        console.error('Error al detectar geolocalización, usando valor por defecto:', e);
      }
    }
    initUserCity();
  }, []);

  // Objeto de la ciudad actual basada en el ID seleccionado
  const city = CITIES_DATABASE.find((c) => c.id === selectedCityId) || CITIES_DATABASE[0];

  useEffect(() => {
    if (!city) return;

    async function fetchHebcalData() {
      setLoading(true);
      try {
        const cityTimeZone = city.tzid || 'UTC';

        const formatExactTime = (dateInput: string | Date) => {
          if (!dateInput) return '--:--';
          try {
            const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
            if (isNaN(date.getTime())) return '--:--';
            
            return new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: cityTimeZone
            }).format(date);
          } catch (e) {
            return '--:--';
          }
        };

        let candleFormatted = '--:--';
        let havdalahFormatted = '--:--';
        let havdalahRabenuTamFormatted = '--:--';
        let parashahTitle = `${t('shabbatIn', 'Shabat en')} ${city.name}`;

        const todayStr = new Date().toISOString().split('T')[0];
        const zmanimUrl = `https://www.hebcal.com/zmanim?latitude=${city.latitude}&longitude=${city.longitude}&cfg=json&start=${todayStr}&end=${todayStr}`;

        const zmanimRes = await fetch(zmanimUrl);
        const zmanimJson = await zmanimRes.json();
        
        if (zmanimJson && zmanimJson.times) {
          const times = zmanimJson.times;
          
          const alotRaw = times.alotHaShajar || times.alutHaShahar || times.dawn || (times.sunrise ? new Date(new Date(times.sunrise).getTime() - 72 * 60000) : null);
          const shemaRaw = times.sofZmanShemaGRA || times.sofZmanShema || times.sof_zman_shema || times.sofZmanShemaMGA || 
                           (times.sunrise && times.sunset ? new Date(new Date(times.sunrise).getTime() + (new Date(times.sunset).getTime() - new Date(times.sunrise).getTime()) * 3 / 12) : null);
          const tefilahRaw = times.sofZmanTefilahGRA || times.sofZmanTefilah || times.sof_zman_tefilah || 
                             (times.sunrise && times.sunset ? new Date(new Date(times.sunrise).getTime() + (new Date(times.sunset).getTime() - new Date(times.sunrise).getTime()) * 4 / 12) : null);
          
          const tzeitRaw = times.tzeitHakochavim || times.tzeit || times.night || (times.sunset ? new Date(new Date(times.sunset).getTime() + 50 * 60000) : null);
          const tzeitRabenuTamRaw = times.tzeit72deg || (times.sunset ? new Date(new Date(sunsetTokenOrDate(times.sunset)).getTime() + 72 * 60000) : null);

          setZmanimDaily({
            alotHaShajar: formatExactTime(alotRaw),
            netzHaChama: formatExactTime(times.sunrise),
            sofZmanShemaGra: formatExactTime(shemaRaw),
            sofZmanTefilah: formatExactTime(tefilahRaw),
            chatzot: formatExactTime(times.chatzot),
            minchaGedolah: formatExactTime(times.minchaGedolah || times.minchaGedola),
            plagHaMincha: formatExactTime(times.plagHaMincha),
            shekia: formatExactTime(times.sunset),
            tzaitHakochavim: formatExactTime(tzeitRaw),
          });

          if (times.sunset) {
            const sunsetDate = new Date(times.sunset);
            if (!isNaN(sunsetDate.getTime())) {
              const minutesBefore = (city as any).candleLightingMinutesBeforeSunset || 18;
              
              const candleDate = new Date(sunsetDate.getTime() - minutesBefore * 60000);
              candleFormatted = formatExactTime(candleDate);

              const tzeitDate = tzeitRaw ? new Date(tzeitRaw) : new Date(sunsetDate.getTime() + 50 * 60000);
              havdalahFormatted = formatExactTime(tzeitDate);

              if (tzeitRabenuTamRaw) {
                havdalahRabenuTamFormatted = formatExactTime(tzeitRabenuTamRaw);
              }
            }
          }
        }

        setShabbatData({
          candleLighting: candleFormatted,
          havdalah: havdalahFormatted,
          havdalahRabenuTam: havdalahRabenuTamFormatted,
          parashah: parashahTitle
        });

      } catch (error) {
        console.error('Error general al conectar con la API de Hebcal:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHebcalData();
  }, [selectedCityId]);

  function sunsetTokenOrDate(val: any) {
    return val;
  }

  return (
    <div className="max-w-7xl mx-auto py-4 px-3 sm:px-6 space-y-6 animate-fadeIn">
      
      {/* CUADRO PRINCIPAL: DOS COLUMNAS CON SELECTOR ANCHO */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/80 to-slate-900 text-white border border-amber-500/35 shadow-xl grid grid-cols-1 xl:grid-cols-12 gap-6 items-end">
        
        <div className="xl:col-span-7 space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{t('zmanimBannerTitle', 'Calendario Judío & Tiempos Halájicos (Zmanim)')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-amber-200 leading-tight">
            {t('zmanimHeaderTitle', 'Tiempos Halájicos y Velas de Shabat')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {city.name}, {city.country} {shabbatData?.parashah && `• ${shabbatData.parashah}`}
          </p>
        </div>

        <div className="xl:col-span-5 flex flex-col gap-2 bg-slate-950/90 p-4 rounded-2xl border border-amber-500/50 shadow-inner w-full">
          <label className="text-xs text-amber-300 font-medium flex items-center gap-1.5 whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('zmanimCityLabel', 'Ciudad:')}</span>
          </label>
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-amber-200 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-sm truncate"
          >
            {CITIES_DATABASE.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-2 text-amber-600 dark:text-amber-400 text-xs gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{t('syncingZmanim', 'Sincronizando horarios astronómicos internacionales con Hebcal...')}</span>
        </div>
      )}

      {/* TARJETAS PRINCIPALES: VELAS Y HAVDALÁ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Encendido de Velas */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50/40 dark:from-slate-900 dark:via-amber-950/30 dark:to-slate-900 border-2 border-amber-400/60 dark:border-amber-700/60 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Flame className="w-6 h-6 fill-amber-500 text-amber-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                    {t('candleLightingTitle', 'Encendido de Velas')}
                  </h3>
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400" dir="rtl">
                    הדלקת נרות שבת קודש
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-200/80 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                {t('fridayLabel', 'Viernes')}
              </span>
            </div>

            <div className="pt-2 text-center py-4 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-amber-200/50 dark:border-amber-900/40">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-amber-700 dark:text-amber-400 tracking-tight">
                {shabbatData?.candleLighting || '--:--'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                18 {t('minutesBeforeSunset', 'minutos antes de la puesta del sol')}
              </p>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-amber-200/40 dark:border-slate-800">
              <strong className="text-amber-800 dark:text-amber-300 block mb-1">
                {t('communityNuanceTitle', 'Matiz Comunitario:')}
              </strong>
              {t('communityNuanceText1', '• Sefaradí, Jalabí y Shamí: La mujer recita la bendición primero y luego enciende las velas.')}<br />
              {t('communityNuanceText2', '• Ashkenazí y Jabad: Las velas se encienden primero, se cubren los ojos y luego se recita la bendición.')}
            </div>
          </div>

          <div className="pt-3 border-t border-amber-200/60 dark:border-slate-800 text-[11px] text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1.5 mt-4">
            <span>🔴 {t('mandatoryDerabanan', 'OBLIGATORIO: Mitzvá Derabanan (Shalom Bait y Kevod Shabat)')}</span>
          </div>
        </div>

        {/* Havdalá */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-indigo-50 to-blue-50/40 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 border-2 border-indigo-400/60 dark:border-indigo-700/60 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Moon className="w-6 h-6 fill-indigo-500 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                    {t('havdalahTitle', 'Havdalá / Salida de Shabat')}
                  </h3>
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400" dir="rtl">
                    הבדלה מוצאי שבת
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-200/80 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200">
                {t('saturdayNightLabel', 'Sábado por la noche')}
              </span>
            </div>

            <div className="pt-2 text-center py-4 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-indigo-200/50 dark:border-indigo-900/40 space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {t('standardStarsExit', 'ESTÁNDAR (SALIDA 3 ESTRELLAS)')}
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-indigo-700 dark:text-indigo-400">
                  {shabbatData?.havdalah || '--:--'}
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-200/40 dark:border-indigo-900/40 flex items-center justify-center gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {t('rabenuTamLabel', 'Rabenu Tam (72 min):')}
                </span>
                <span className="font-mono font-bold text-indigo-800 dark:text-indigo-300">
                  {shabbatData?.havdalahRabenuTam || '--:--'}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-indigo-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-indigo-200/40 dark:border-slate-800">
              <strong className="text-indigo-800 dark:text-indigo-300 block mb-1">
                {t('havdalahElementsTitle', 'Los 4 Elementos de la Havdalá:')}
              </strong>
              {t('havdalahEl1', '1. Yayin: Vino o jugo de uva.')}<br />
              {t('havdalahEl2', '2. Besamim: Especias aromáticas.')}<br />
              {t('havdalahEl3', '3. Ner: Vela trenzada de múltiples mechas.')}<br />
              {t('havdalahEl4', '4. Hamavdil: Bendición de distinción.')}
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-200/60 dark:border-slate-800 text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold flex items-center gap-1.5 mt-4">
            <span>🔴 {t('mandatoryDeoraita', 'OBLIGATORIO: Mitzvá Deoraita / Derabanan')}</span>
          </div>
        </div>

      </div>

      {/* ZMANIM DIARIOS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {t('dailyZmanimTitle', 'Tiempos del Día (Zmanim Halajiim)')} — {city.name}
            </h3>
          </div>
          <span className="text-xs text-slate-400">{t('realtimeHebcal', 'Tiempo Real (Hebcal)')}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('alotHaShachar', 'Alot HaShachar')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.alotHaShajar || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunriseNetz', 'Amanecer (Netz)')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.netzHaChama || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('shemaLimit', 'Fin Shemá')}</span>
            <span className="font-mono font-bold text-sm text-amber-700 dark:text-amber-400 mt-1 block">
              {zmanimDaily?.sofZmanShemaGra || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('finTefila', 'Fin Tefilá')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.sofZmanTefilah || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('chatzot', 'Mediodía')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.chatzot || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('minjaGuedola', 'Minja Guedola')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.minchaGedolah || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('plagHaMinja', 'Plag HaMinja')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.plagHaMincha || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunsetShkia', 'Puesta del Sol (Shkia)')}</span>
            <span className="font-mono font-bold text-sm text-orange-600 dark:text-orange-400 mt-1 block">
              {zmanimDaily?.shekia || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">{t('tzaitHakochavim', 'Tzait Hakochavim')}</span>
            <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400 mt-1 block">
              {zmanimDaily?.tzaitHakochavim || '--:--'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CalendarZmanimTab;