import { useState, useEffect } from 'react';
import { Flame, Moon, Clock, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CITIES_ZMANIM } from '../data/citiesZmanim.ts';

export function CalendarZmanimTab() {
  const { t } = useTranslation();
  const [selectedCityId, setSelectedCityId] = useState<string>('cdmx');
  const [loading, setLoading] = useState<boolean>(false);
  
  const [shabbatData, setShabbatData] = useState<any>(null);
  const [zmanimDaily, setZmanimDaily] = useState<any>(null);

  const city = CITIES_ZMANIM.find((c) => c.id === selectedCityId) || CITIES_ZMANIM[0];

  useEffect(() => {
    async function fetchHebcalData() {
      setLoading(true);
      try {
        // 1. Obtener datos oficiales de Shabat y zona horaria de la ciudad
        const shabbatRes = await fetch(
          `https://www.hebcal.com/shabbat?geonameid=${(city as any).geonameId}&cfg=json`
        );
        const shabbatJson = await shabbatRes.json();
        
        const cityTimeZone = shabbatJson.location?.tz || 'UTC';

        // Función auxiliar ultra segura para formatear fechas sin errores de zona horaria
        const formatSafeTime = (dateInput: string | Date) => {
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

        const candleItem = shabbatJson.items?.find((item: any) => item.category === 'candles');
        const havdalahItem = shabbatJson.items?.find((item: any) => item.category === 'havdalah');

        let candleFormatted = candleItem ? formatSafeTime(candleItem.date) : '--:--';
        let havdalahFormatted = havdalahItem ? formatSafeTime(havdalahItem.date) : '--:--';

        // 2. Obtener Zmanim diarios y respaldar cálculo si la API de shabbat viene vacía
        const todayStr = new Date().toISOString().split('T')[0];
        const zmanimRes = await fetch(
          `https://www.hebcal.com/zmanim?geonameid=${(city as any).geonameId}&cfg=json&start=${todayStr}&end=${todayStr}`
        );
        const zmanimJson = await zmanimRes.json();
        
        if (zmanimJson.times) {
          const times = zmanimJson.times;

          setZmanimDaily({
            alotHaShajar: formatSafeTime(times.alotHaShajar),
            netzHaChama: formatSafeTime(times.sunrise),
            sofZmanShemaGra: formatSafeTime(times.sofZmanShemaGRA),
            sofZmanTefilah: formatSafeTime(times.sofZmanTefilahGRA),
            chatzot: formatSafeTime(times.chatzot),
            minchaGedolah: formatSafeTime(times.minchaGedolah),
            plagHaMincha: formatSafeTime(times.plagHaMincha),
            shekia: formatSafeTime(times.sunset),
            tzaitHakochavim: formatSafeTime(times.tzeitHakochavim),
          });

          // Si faltaban los datos de shabbat, los calculamos exactamente con la puesta de sol de zmanim
          if ((candleFormatted === '--:--' || havdalahFormatted === '--:--') && times.sunset) {
            const sunsetDate = new Date(times.sunset);
            if (!isNaN(sunsetDate.getTime())) {
              const minutesBefore = city.candleLightingMinutesBeforeSunset || 18;
              
              if (candleFormatted === '--:--') {
                const candleDate = new Date(sunsetDate.getTime() - minutesBefore * 60000);
                candleFormatted = formatSafeTime(candleDate);
              }

              if (havdalahFormatted === '--:--') {
                const tzeitDate = times.tzeitHakochavim 
                  ? new Date(times.tzeitHakochavim) 
                  : new Date(sunsetDate.getTime() + 50 * 60000);
                havdalahFormatted = formatSafeTime(tzeitDate);
              }
            }
          }
        }

        setShabbatData({
          candleLighting: candleFormatted,
          havdalah: havdalahFormatted,
          parashah: shabbatJson.title || zmanimJson.location?.city ? `Shabat en ${zmanimJson.location?.city || city.name}` : ''
        });

      } catch (error) {
        console.error('Error al conectar con la API de Hebcal:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHebcalData();
  }, [selectedCityId]);

  return (
    <div className="max-w-5xl mx-auto py-4 px-3 sm:px-6 space-y-6 animate-fadeIn">
      
      {/* BANNER SUPERIOR */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 text-white border border-amber-500/35 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{t('zmanimBannerTitle', 'Calendario Judío & Tiempos Halájicos (Zmanim)')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-amber-200 leading-tight">
            {t('zmanimTitle', 'Horarios Halájicos y Velas de Shabat')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {city.communityFlavor} {shabbatData?.parashah && `• ${shabbatData.parashah}`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 bg-slate-950/60 p-4 rounded-2xl border border-amber-500/30 shrink-0 self-start lg:self-center">
          <label className="text-xs text-amber-300 font-medium flex items-center gap-1.5 whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('selectCity', 'Ciudad:')}</span>
          </label>
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-amber-200 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-sm"
          >
            {CITIES_ZMANIM.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name} ({c.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-2 text-amber-600 dark:text-amber-400 text-xs gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Sincronizando horarios astronómicos internacionales con Hebcal...</span>
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
                    {t('shabbatCandles', 'Encendido de Velas')}
                  </h3>
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400" dir="rtl">
                    הדלקת נרות שבת קודש
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-200/80 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                {t('friday', 'Viernes')}
              </span>
            </div>

            <div className="pt-2 text-center py-4 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-amber-200/50 dark:border-amber-900/40">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-amber-700 dark:text-amber-400 tracking-tight">
                {shabbatData?.candleLighting || '--:--'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {city.candleLightingMinutesBeforeSunset} {t('minutesBeforeSunset', 'minutos antes de la puesta del sol')}
              </p>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-amber-200/40 dark:border-slate-800">
              <strong className="text-amber-800 dark:text-amber-300 block mb-1">
                {t('communityNuance', 'Matiz Comunitario:')}
              </strong>
              • <strong>Sefaradí, Jalabí y Shamí:</strong> {t('sefaradiCandleRule', 'La mujer primero pronuncia la bendición y luego enciende las velas.')}<br />
              • <strong>Ashkenazí y Jabad:</strong> {t('ashkenaziCandleRule', 'Primero se encienden las velas, luego se cubren los ojos y se recita la bendición.')}
            </div>
          </div>

          <div className="pt-3 border-t border-amber-200/60 dark:border-slate-800 text-[11px] text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1.5">
            <span>🔴 {t('mandatoryTitle', 'OBLIGATORIO')}: Mitzvá Derabanan (Shalom Bait y Kavod Shabat)</span>
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
                    {t('havdalah', 'Havdalá / Salida de Shabat')}
                  </h3>
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400" dir="rtl">
                    הבדלה ומוצאי שבת
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-200/80 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200">
                {t('saturdayNight', 'Sábado Noche')}
              </span>
            </div>

            <div className="pt-2 text-center py-4 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-indigo-200/50 dark:border-indigo-900/40 space-y-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {t('standard3Stars', 'Estándar (Salida de 3 estrellas)')}
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-indigo-700 dark:text-indigo-400">
                  {shabbatData?.havdalah || '--:--'}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-indigo-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-indigo-200/40 dark:border-slate-800">
              <strong className="text-indigo-800 dark:text-indigo-300 block mb-1">
                {t('havdalahElements', 'Los 4 Elementos de la Havdalá:')}
              </strong>
              1. <strong>Yayin:</strong> Copa de vino.<br />
              2. <strong>Besamim:</strong> Especias aromáticas.<br />
              3. <strong>Ner:</strong> Vela trenzada.<br />
              4. <strong>Hamavdil:</strong> Bendición de distinción.
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-200/60 dark:border-slate-800 text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold flex items-center gap-1.5">
            <span>🔴 {t('mandatoryTitle', 'OBLIGATORIO')}: Mitzvá Deoraita / Derabanan</span>
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
          <span className="text-xs text-slate-400">Tiempo Real (Hebcal)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">Alot HaShajar</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.alotHaShajar || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunrise', 'Amanecer (Netz)')}</span>
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
            <span className="text-slate-400 block text-[11px]">Fin Tefilá</span>
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
            <span className="text-slate-400 block text-[11px]">Minjá Guedolá</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.minchaGedolah || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">Plag HaMinjá</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.plagHaMincha || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunset', 'Puesta del Sol')}</span>
            <span className="font-mono font-bold text-sm text-orange-600 dark:text-orange-400 mt-1 block">
              {zmanimDaily?.shekia || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">Tzeit HaKojavim</span>
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