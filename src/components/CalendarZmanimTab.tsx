import { useState } from 'react';
import { Flame, Moon, Clock, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CITIES_ZMANIM } from '../data/citiesZmanim.ts';

export function CalendarZmanimTab() {
  const { t } = useTranslation();
  const [selectedCityId, setSelectedCityId] = useState<string>('cdmx');
  const [activeBlessingTab, setActiveBlessingTab] = useState<'shabbat' | 'havdalah'>('shabbat');

  const city = CITIES_ZMANIM.find((c) => c.id === selectedCityId) || CITIES_ZMANIM[0];

  return (
    <div className="max-w-4xl mx-auto py-4 px-3 sm:px-4 space-y-6 animate-fadeIn">
      
      {/* ==================================================================== */}
      {/* BANNER SUPERIOR Y SELECTOR DE CIUDAD                                 */}
      {/* ==================================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 text-white border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span>{t('zmanimBannerTitle', 'Calendario Judío & Tiempos Halájicos (Zmanim)')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
            {t('zmanimTitle', 'Horarios Halájicos y Velas de Shabat')}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            {city.communityFlavor}
          </p>
        </div>

        {/* Selector de Ciudad */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-xs text-amber-300 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('selectCity', 'Ciudad:')}</span>
          </label>
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-amber-200 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-sm"
          >
            {CITIES_ZMANIM.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name} ({c.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TARJETAS PRINCIPALES: ENCENDIDO DE VELAS Y HAVDALÁ                   */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Tarjeta de Encendido de Velas */}
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
                {city.sampleCandleLighting}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {city.candleLightingMinutesBeforeSunset} {t('minutesBeforeSunset', 'minutos antes de la puesta del sol')} ({city.sampleSunsetFriday})
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

        {/* Tarjeta de Havdalá */}
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
                  {city.sampleHavdalahStandard}
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-100 dark:border-indigo-950">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {t('rabenuTamTitle', 'Rabenu Tam (72 min)')}
                </span>
                <div className="text-xl sm:text-2xl font-mono font-bold text-slate-800 dark:text-slate-200">
                  {city.sampleHavdalahRabenuTam}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-indigo-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-indigo-200/40 dark:border-slate-800">
              <strong className="text-indigo-800 dark:text-indigo-300 block mb-1">
                {t('havdalahElements', 'Los 4 Elementos de la Havdalá:')}
              </strong>
              1. <strong>Yayin:</strong> {t('havdalahYayin', 'Copa de vino o jugo de uva.')}<br />
              2. <strong>Besamim:</strong> {t('havdalahBesamim', 'Especias aromáticas.')}<br />
              3. <strong>Ner:</strong> {t('havdalahNer', 'Vela trenzada.')}<br />
              4. <strong>Hamavdil:</strong> {t('havdalahHamavdil', 'Bendición de distinción.')}
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-200/60 dark:border-slate-800 text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold flex items-center gap-1.5">
            <span>🔴 {t('mandatoryTitle', 'OBLIGATORIO')}: {t('havdalahMandatoryNotice', 'Mitzvá Deoraita / Derabanan al terminar Shabat')}</span>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* TABLA DE TIEMPOS DEL DÍA (ZMANIM HALAJIIM)                           */}
      {/* ==================================================================== */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {t('dailyZmanimTitle', 'Tiempos del Día (Zmanim Halajiim)')} — {city.name}
            </h3>
          </div>
          <span className="text-xs text-slate-400">{t('localTime', 'Horario Local')}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">Alot HaShajar</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {city.zmanim.alotHaShajar}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunrise', 'Amanecer (Netz)')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {city.zmanim.netzHaChama}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('shemaLimit', 'Fin Shemá')}</span>
            <span className="font-mono font-bold text-sm text-amber-700 dark:text-amber-400 mt-1 block">
              {city.zmanim.sofZmanShemaGra}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">Fin Tefilá</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {city.zmanim.sofZmanTefilah}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('chatzot', 'Mediodía')}</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {city.zmanim.chatzot}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">Minjá Guedolá</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {city.zmanim.minchaGedolah}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">Plag HaMinjá</span>
            <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 block">
              {city.zmanim.plagHaMincha}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-slate-400 block text-[11px]">{t('sunset', 'Puesta del Sol')}</span>
            <span className="font-mono font-bold text-sm text-orange-600 dark:text-orange-400 mt-1 block">
              {city.zmanim.shekia}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">Tzeit HaKojavim</span>
            <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400 mt-1 block">
              {city.zmanim.tzaitHakochavim}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BENDICIONES TRADICIONALES EN HEBREO Y FONÉTICA                       */}
      {/* ==================================================================== */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-3">
          <button
            onClick={() => setActiveBlessingTab('shabbat')}
            className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition cursor-pointer ${
              activeBlessingTab === 'shabbat'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            🕯️ {t('shabbatCandleBlessing', 'Bendición de Velas de Shabat')}
          </button>
          <button
            onClick={() => setActiveBlessingTab('havdalah')}
            className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition cursor-pointer ${
              activeBlessingTab === 'havdalah'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            🍷 {t('havdalahBlessing', 'Bendición de Havdalá')}
          </button>
        </div>

        {activeBlessingTab === 'shabbat' ? (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/50 dark:border-slate-700 text-right space-y-1" dir="rtl">
              <p className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white leading-relaxed">
                בָּרוּךְ אַתָּה ה' אֱ-לֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת.
              </p>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <p>
                <strong>Fonética:</strong> <em>Baruj Atá Adon-ai Elo-henu Mélej HaOlam, asher kideshanu bemitzvotav vetzivanu lehadlik ner shel Shabat.</em>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-200/50 dark:border-slate-700 text-right space-y-2" dir="rtl">
              <p className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white leading-relaxed">
                בָּרוּךְ אַתָּה ה' אֱ-לֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמַּבְדִּיל בֵּין קֹדֶשׁ לְחוֹל, בֵּין אוֹר לְחֹשֶׁךְ, בֵּין יִשְׂרָאֵל לָעַמִּים, בֵּין יוֹם הַשְּׁבִיעִי לְשֵׁשֶׁת יְמֵי הַמַּעֲשֶׂה.
              </p>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <p>
                <strong>Fonética:</strong> <em>Baruj Atá Adon-ai Elo-henu Mélej HaOlam, hamavdil bein kódesh lejol, bein or lejóshej, bein Yisrael la'amim, bein yom hashevi'i leshéshet yemei hama'asé.</em>
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default CalendarZmanimTab;