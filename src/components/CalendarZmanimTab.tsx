import { useState, useEffect } from 'react';
import { Flame, Moon, Clock, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CITIES_ZMANIM } from '../data/citiesZmanim.ts';

// Mapa explícito de husos horarios IANA por ID de ciudad
const CITY_TIMEZONES: Record<string, string> = {
  cdmx: 'America/Mexico_City',
  monterrey: 'America/Monterrey',
  newyork: 'America/New_York',
  brooklyn: 'America/New_York',
  miami: 'America/New_York',
  losangeles: 'America/Los_Angeles',
  chicago: 'America/Chicago',
  panama: 'America/Panama',
  buenosaires: 'America/Argentina/Buenos_Aires',
  saopaulo: 'America/Sao_Paulo',
  riodejaneiro: 'America/Sao_Paulo',
  paris: 'Europe/Paris',
  madrid: 'Europe/Madrid',
  barcelona: 'Europe/Madrid',
  jerusalem: 'Asia/Jerusalem',
};

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
        const cityTimeZone = CITY_TIMEZONES[city.id] || 'UTC';

        // Función estricta para formatear fechas a la zona horaria IANA de la ciudad
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
        let parashahTitle = `${t('shabbatIn')} ${t(`city_${city.id}_name`)}`;

        const todayStr = new Date().toISOString().split('T')[0];

        const fallbackCoords: Record<string, { lat: number; lon: number }> = {
          saopaulo: { lat: -23.5505, lon: -46.6333 },
          riodejaneiro: { lat: -22.9068, lon: -43.1729 },
          buenosaires: { lat: -34.6037, lon: -58.3816 },
          cdmx: { lat: 19.4326, lon: -99.1332 },
          monterrey: { lat: 25.6866, lon: -100.3161 },
          newyork: { lat: 40.7128, lon: -74.0060 },
          brooklyn: { lat: 40.6782, lon: -73.9442 },
          miami: { lat: 25.7617, lon: -80.1918 },
          losangeles: { lat: 34.0522, lon: -118.2437 },
          chicago: { lat: 41.8781, lon: -87.6298 },
          panama: { lat: 8.9824, lon: -79.5199 },
          paris: { lat: 48.8566, lon: 2.3522 },
          madrid: { lat: 40.4168, lon: -3.7038 },
          barcelona: { lat: 41.3851, lon: 2.1734 },
          jerusalem: { lat: 31.7683, lon: 35.2137 }
        };

        const cityCoords = (city as any).lat && (city as any).lon 
          ? { lat: (city as any).lat, lon: (city as any).lon } 
          : (fallbackCoords[city.id] || { lat: 19.4326, lon: -99.1332 });

        const zmanimUrl = `https://www.hebcal.com/zmanim?latitude=${cityCoords.lat}&longitude=${cityCoords.lon}&cfg=json&start=${todayStr}&end=${todayStr}`;

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
              const minutesBefore = city.candleLightingMinutesBeforeSunset || 18;
              
              const candleDate = new Date(sunsetDate.getTime() - minutesBefore * 60000);
              candleFormatted = formatExactTime(candleDate);

              const tzeitDate = tzeitRaw ? new Date(tzeitRaw) : new Date(sunsetDate.getTime() + 50 * 60000);
              havdalahFormatted = formatExactTime(tzeitDate);
            }
          }
        }

        setShabbatData({
          candleLighting: candleFormatted,
          havdalah: havdalahFormatted,
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

  return (
    <div className="max-w-7xl mx-auto py-4 px-3 sm:px-6 space-y-6 animate-fadeIn">
      
      {/* CUADRO PRINCIPAL CON GRID Y MARGEN INFERIOR EXPLÍCITO */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/80 to-slate-900 text-white border border-amber-500/35 shadow-xl grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Columna de textos */}
        <div className="xl:col-span-7 space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{t('zmanimBannerTitle')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-amber-200 leading-tight">
            {t('zmanimTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t(`city_${city.id}_flavor`)} {shabbatData?.parashah && `• ${shabbatData.parashah}`}
          </p>
        </div>

        {/* Columna del Selector de Ciudad con xl:mt-12 para bajarlo exactamente a la altura del rectángulo rojo */}
        <div className="xl:col-span-5 flex flex-col gap-2 bg-slate-950/90 p-4 rounded-2xl border border-amber-500/50 shadow-inner w-full xl:mt-12">
          <label className="text-xs text-amber-300 font-medium flex items-center gap-1.5 whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('selectCity', 'Ciudad:')}</span>
          </label>
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 text-amber-200 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-sm truncate"
          >
            {CITIES_ZMANIM.filter(c => c.id !== 'marsella').map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {t(`city_${c.id}_name`)} ({t(`city_${c.id}_country`)})
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
                    {t('shabbatCandles')}
                  </h3>
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400" dir="rtl">
                    הדלקת נרות שבת קודש
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-200/80 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                {t('friday')}
              </span>
            </div>

            <div className="pt-2 text-center py-4 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-amber-200/50 dark:border-amber-900/40">
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-amber-700 dark:text-amber-400 tracking-tight">
                {shabbatData?.candleLighting || '--:--'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {city.candleLightingMinutesBeforeSunset} {t('minutesBeforeSunset')}
              </p>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-amber-200/40 dark:border-slate-800">
              <strong className="text-amber-800 dark:text-amber-300 block mb-1">
                {t('communityNuance')}
              </strong>
              • <strong>Sefaradí, Jalabí y Shamí:</strong> {t('sefaradiCandleRule')}<br />
              • <strong>Ashkenazí y Jabad:</strong> {t('ashkenaziCandleRule')}
            </div>
          </div>

          <div className="pt-3 border-t border-amber-200/60 dark:border-slate-800 text-[11px] text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1.5 mt-4">
            <span>🔴 {t('mandatoryTitle')}: {t('mitzvahDerabanan', 'Mitzvá Derabanan (Shalom Bait y Kavod Shabat)')}</span>
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
                    {t('havdalah')}
                  </h3>
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400" dir="rtl">
                    הבדלה ומוצאי שבת
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-200/80 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200">
                {t('saturdayNight')}
              </span>
            </div>

            <div className="pt-2 text-center py-4 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-indigo-200/50 dark:border-indigo-900/40 space-y-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {t('standard3Stars')}
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-indigo-700 dark:text-indigo-400">
                  {shabbatData?.havdalah || '--:--'}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-indigo-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-indigo-200/40 dark:border-slate-800">
              <strong className="text-indigo-800 dark:text-indigo-300 block mb-1">
                {t('havdalahElements')}
              </strong>
              1. <strong>Yayin:</strong> {t('yayinDesc')}<br />
              2. <strong>Besamim:</strong> {t('besamimDesc')}<br />
              3. <strong>Ner:</strong> {t('nerDesc')}<br />
              4. <strong>Hamavdil:</strong> {t('hamavdilDesc')}
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-200/60 dark:border-slate-800 text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold flex items-center gap-1.5 mt-4">
            <span>🔴 {t('mandatoryTitle')}: {t('mitzvahDeoraita', 'Mitzvá Deoraita / Derabanan')}</span>
          </div>
        </div>

      </div>

      {/* ZMANIM DIARIOS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {t('dailyZmanimTitle')} — {t(`city_${city.id}_name`)}
            </h3>
          </div>
          <span className="text-xs text-slate-400">{t('realTimeHebcal', 'Tiempo Real (Hebcal)')}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('alotHaShajar', 'Alot HaShajar')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.alotHaShajar || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunrise')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.netzHaChama || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('shemaLimit')}</span>
            <span className="font-mono font-bold text-sm text-amber-700 dark:text-amber-400 mt-1 block">
              {zmanimDaily?.sofZmanShemaGra || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('tefilahLimit', 'Fin Tefilá')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.sofZmanTefilah || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('chatzot')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.chatzot || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('minchaGedolah', 'Minjá Guedolá')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.minchaGedolah || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('plagHaMincha', 'Plag HaMinjá')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {zmanimDaily?.plagHaMincha || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunset')}</span>
            <span className="font-mono font-bold text-sm text-orange-600 dark:text-orange-400 mt-1 block">
              {zmanimDaily?.shekia || '--:--'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">{t('tzeitHakochavim', 'Tzeit HaKojavim')}</span>
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