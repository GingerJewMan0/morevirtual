/**
 * ============================================================================
 * COMPONENTE DE PESTAÑA DE PARASHÁ (ParashaTab.tsx)
 * ============================================================================
 * Propósito: Muestra el contenido detallado de la porción semanal de la Torá (Parashá),
 * organizando la información en subpestañas (Resumen, Aliyot, Rashi y Jasidut).
 * Incluye traducción dinámica asistida por IA según el idioma activo del usuario.
 */

import { useState, useEffect } from 'react';
import { Scroll, MessageCircle, Sparkles, ChevronRight, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PARASHOT_DATA } from '../data/parashot.ts';

/**
 * Propiedades requeridas por el componente ParashaTab.
 */
interface ParashaTabProps {
  /** Callback para iniciar una consulta directa con el asistente sobre la Parashá actual. */
  onAskAboutParasha: (question: string) => void;
}

/**
 * Función auxiliar para calcular de forma automática la Parashá de la semana actual por defecto.
 */
function getCurrentParashaId(): string {
  const today = new Date();
  const startYearDate = new Date(today.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((today.getTime() - startYearDate.getTime()) / 86400000 + startYearDate.getDay() + 1) / 7);
  const index = weekNumber % PARASHOT_DATA.length;
  return PARASHOT_DATA[index]?.id || 'bereshit';
}

/**
 * Componente principal ParashaTab para la visualización y estudio del Limud Torá Semanal.
 */
export function ParashaTab({ onAskAboutParasha }: ParashaTabProps) {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';
  
  // Estado inicial configurado por defecto con la Parashá de la semana actual calculada por fecha
  const [selectedParashaId, setSelectedParashaId] = useState<string>(getCurrentParashaId());

  // Consulta automática por internet de la Parashá actual de la semana
  useEffect(() => {
    async function fetchWeeklyParasha() {
      try {
        const response = await fetch('https://www.hebcal.com/hebcal?v=1&cfg=json&geonameid=3530597&m=on&s=on');
        const data = await response.json();
        
        const parashaItem = data.items?.find((item: any) => item.category === 'parashat');
        
        if (parashaItem && parashaItem.title) {
          const rawTitle = parashaItem.title.replace('Parashat ', '').toLowerCase().trim();
          
          const matchedParasha = PARASHOT_DATA.find(p => 
            p.name.toLowerCase().includes(rawTitle) || 
            p.id.toLowerCase().includes(rawTitle.replace(/\s+/g, '_'))
          );

          if (matchedParasha) {
            setSelectedParashaId(matchedParasha.id);
          }
        }
      } catch (error) {
        console.error('Error al obtener la Parashá de internet:', error);
      }
    }

    fetchWeeklyParasha();
  }, []);
  
  // Estado local para la subpestaña activa (resumen, aliyot, rashi, chasidut)
  const [activeSubTab, setActiveSubTab] = useState<'resumen' | 'aliyot' | 'rashi' | 'chasidut'>('resumen');

  // Búsqueda de la Parashá actual basada en el ID seleccionado
  const parasha = PARASHOT_DATA.find((p) => p.id === selectedParashaId) || PARASHOT_DATA[0];
  
  // Obtención del código de idioma actual (ej. 'es', 'en', 'he')
  const currentLang = i18n.language?.substring(0, 2) || 'es';

  // Estados para gestionar la traducción dinámica asíncrona mediante IA
  const [translatedContent, setTranslatedContent] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  /**
   * Efecto secundario para realizar la traducción dinámica de la Parashá 
   * utilizando el endpoint del backend cuando el idioma no es español.
   */
  useEffect(() => {
    async function fetchParashaTranslation() {
      if (currentLang === 'es') {
        setTranslatedContent(null);
        return;
      }

      setIsTranslating(true);
      try {
        const res = await fetch('/api/translate-parasha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            parashaName: parasha.name,
            reference: parasha.reference,
            targetLanguage: currentLang,
            originalSummary: parasha.summary,
            halachaFocus: parasha.halachaFocus,
            rashiInsight: parasha.rashiInsight,
            chabadInsight: parasha.chabadInsight,
            aliyot: parasha.aliyot,
          } as any)
        });
        const json = await res.json();
        if (json.success && json.data) {
          setTranslatedContent(json.data);
        }
      } catch (e) {
        console.error('Error traduciendo parashá con IA:', e);
      } finally {
        setIsTranslating(false);
      }
    }

    fetchParashaTranslation();
  }, [currentLang, selectedParashaId]);

  const getLocalized = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field['es'] || Object.values(field)[0] || '';
  };

  // 10 Ideas maestras de la Jasidut abarcando diferentes Parashot del ciclo anual
  const chasidicParashotIdeas = [
    {
      id: 1,
      parasha: isHebrew ? 'בראשית' : 'Parashá Bereshit',
      title: isHebrew ? 'דירה בתחתונים' : 'Una Morada en los Mundos Inferiores (Dira Betajtonim)',
      desc: isHebrew 
        ? 'התכלית של בריאת העולם אינה להישאר ברוחניות, אלא להפוך את העולם הגשמי לדירה אלוקית.' 
        : 'El propósito de la creación no es ascender puramente al plano espiritual, sino transformar este mundo físico y material en un santuario para lo divino[cite: 18].'
    },
    {
      id: 2,
      parasha: isHebrew ? 'נח' : 'Parashá Noaj',
      title: isHebrew ? 'התיבה כמרחב של מודעות' : 'El Arca como Espacio de Consciencia Interior (Teivá)',
      desc: isHebrew 
        ? 'התיבה מסמלת את המילים והאותיות של התורה והתפילה, המגינות על האדם מתוך סערות המציאות.' 
        : 'Las palabras y letras de la Torá y el rezo actúan como un refugio interior ("Teivá") que resguarda la mente y el alma en medio de las inundaciones del ego.'
    },
    {
      id: 3,
      parasha: isHebrew ? 'לך לך' : 'Parashá Lej Lecha',
      title: isHebrew ? 'המסע אל העצמיות' : 'El Viaje hacia la Esencia Interior (Lej Lecha)',
      desc: isHebrew 
        ? 'הציווי "לך לך" הוא קריאה לכל אדם לצאת ממגבלותיו אל המקום הגבוה ביותר בנשמתו.' 
        : 'La orden dada a Avraham de "ir hacia ti mismo" representa el despertar para trascender las limitaciones psicológicas y conectar con la esencia divina.'
    },
    {
      id: 4,
      parasha: isHebrew ? 'ויצא' : 'Parashá Vayetze',
      title: isHebrew ? 'סולם מוצב ארצה וראשו מגיע השמימה' : 'La Escalera: Conexión entre lo Terrenal y lo Celestial',
      desc: isHebrew 
        ? 'רגלי הסולם ניצבות בארץ וראשו בשמיים; כל פעולה גשמית יכולה להתעלות לקדושה.' 
        : 'Nuestros pies están arraigados en las tareas cotidianas del mundo, pero nuestra conciencia puede elevarse hasta los cielos mediante la intención recta.'
    },
    {
      id: 5,
      parasha: isHebrew ? 'וישב' : 'Parashá Vyeshev',
      title: isHebrew ? 'האור שבוקע מתוך החושך' : 'La Luz que Brota de la Oscuridad (Yosef en Egipto)',
      desc: isHebrew 
        ? 'הירידה של יוסף למצרים הייתה השלב ההכרחי והעמוק ביותר לבניית העתיד והגאולה.' 
        : 'Las pruebas más difíciles y los momentos de oscuridad ocultan las semillas de nuestro crecimiento espiritual y salvación futura.'
    },
    {
      id: 6,
      parasha: isHebrew ? 'שמות' : 'Parashá Shemot',
      title: isHebrew ? 'הנקודה שאינה נכנעת לגלות' : 'La Chispa Interior Indestructible en el Exilio',
      desc: isHebrew 
        ? 'למרות שעבודת הפרך במצרים, "ושמו עליהם שרים", תמצית הנשמה היהודית נותרה טהורה וחופשית.' 
        : 'A pesar de las presiones del entorno y las ataduras del materialismo, la chispa esencial del alma judía permanece intacta y libre.'
    },
    {
      id: 7,
      parasha: isHebrew ? 'יתרו' : 'Parashá Yitró',
      title: isHebrew ? 'נעשה ונשמע בפנימיות' : 'Acción y Comprensión ("Naaseh VeNishma")',
      desc: isHebrew 
        ? 'המחויבות המעשית למצוות קודמת להבנה השכלית, כי האמת האלוקית מעל השכל.' 
        : 'La disposición a actuar con compromiso antes de comprender racionalmente abre las puertas a una sabiduría superior e intuitiva.'
    },
    {
      id: 8,
      parasha: isHebrew ? 'תרומה' : 'Parashá Terumah',
      title: isHebrew ? 'מקדש בלב כל אחד ואחד' : 'El Santuario en el Corazón de Cada Persona',
      desc: isHebrew 
        ? '"ועשו לי מקדש ושכנתי בתוכם" — לא בתוך המקדש החיצוני בלבד, אלא בתוכו של כל אדם.' 
        : 'El mandamiento de construir el Tabernáculo se traduce en convertir nuestro propio corazón en un espacio receptivo a la presencia divina.'
    },
    {
      id: 9,
      parasha: isHebrew ? 'ויקרא' : 'Parashá Vayikrá',
      title: isHebrew ? 'הקריאה באהבה ובקרבה' : 'La Llamada de Amor y Cercanía ("Vayikrá")',
      desc: isHebrew 
        ? 'לשון "ויקרא" מבטאת קריאה של חיבה יתרה, המזמינה את האדם להתקרב לבורא מתוך ענווה.' 
        : 'El término afectuoso con el que Dios llama a Moshé denota que cada acercamiento espiritual se basa en el amor y la humildad sincera.'
    },
    {
      id: 10,
      parasha: isHebrew ? 'במדבר' : 'Parashá Bamidbar',
      title: isHebrew ? 'המדבר כמקום של פניות מוחלטת' : 'El Desierto como Espacio de Apertura y Escucha',
      desc: isHebrew 
        ? 'התורה ניתנה במדבר, מקום הפקר, ללמדנו שכדי לקבל תורה צריך ביטול גמור והתמסרות.' 
        : 'La Torá fue entregada en un desierto estéril y neutral, enseñando que para recibir inspiración superior debemos vaciar nuestro ego.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-3 sm:px-4 space-y-6 overflow-x-hidden animate-fadeIn" dir={isHebrew ? 'rtl' : 'ltr'}>
      
      {/* ==================================================================== */}
      {/* BANNER PRINCIPAL DE LA PARASHÁ Y SELECTOR                           */}
      {/* ==================================================================== */}
      <div className="w-full p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 text-white border border-amber-500/30 shadow-xl space-y-5 overflow-hidden box-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 w-full">
          
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Scroll className="w-4 h-4 shrink-0" />
              <span className="truncate">Limud Torá Semanal • Sefer {getLocalized(parasha.bookSpanish)}[cite: 20]</span>
            </div>
            
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 w-full">
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-amber-200 break-words max-w-full">
                Parashat {getLocalized(parasha.name)}[cite: 20]
              </h2>
              <span className="text-xl sm:text-3xl font-serif font-bold text-amber-400 shrink-0" dir="rtl">
                {parasha.hebrewName}[cite: 20]
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 w-full lg:w-72 shrink-0">
            <label className="text-xs text-amber-300 font-medium">{t('selectParasha', 'Seleccionar Parashá:')}</label>
            <select
              value={selectedParashaId}
              onChange={(e) => setSelectedParashaId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-amber-200 border border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer shadow-md truncate"
            >
              {PARASHOT_DATA.map((p) => (
                <option key={p.id} value={p.id} className="truncate">
                  {getLocalized(p.name)} ({p.hebrewName})[cite: 20]
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-amber-500/20 text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1 w-full">
          <span><strong>{t('readParasha', 'Lectura')}:</strong> {parasha.reference}[cite: 20]</span>
          <span>•</span>
          <span><strong>{t('haftarah', 'Haftará')}:</strong> {parasha.haftarah}[cite: 20]</span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARRA DE PESTAÑAS SECUNDARIAS (CON "Jasidut" GENERAL)                 */}
      {/* ==================================================================== */}
      <div className="w-full flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-2xl p-1.5 shadow-xs overflow-x-auto gap-1 scrollbar-none">
        <button
          onClick={() => setActiveSubTab('resumen')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'resumen'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📖 {t('summaryTab', 'Resumen y Temas')}[cite: 20]
        </button>

        <button
          onClick={() => setActiveSubTab('aliyot')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'aliyot'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📜 {t('aliyotTab', '7 Aliyot (Lectura)')}[cite: 20]
        </button>

        <button
          onClick={() => setActiveSubTab('rashi')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'rashi'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          💡 {t('rashiTab', 'Perla de Rashi')}[cite: 20]
        </button>

        <button
          onClick={() => setActiveSubTab('chasidut')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
            activeSubTab === 'chasidut'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔥 {isHebrew ? 'חסידות' : 'Jasidut'}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* CONTENIDO DE LA PESTAÑA ACTIVA                                      */}
      {/* ==================================================================== */}
      <div className="w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 overflow-hidden">
        
        {/* Subpestaña: Resumen y Temas */}
        {activeSubTab === 'resumen' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                {t('summaryOf', 'Resumen de Parashat')} {getLocalized(parasha.name)}[cite: 20]
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                {isTranslating ? '✨ Traduciendo contenido con IA...' : (translatedContent?.summary || parasha.summary)}[cite: 20]
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-800 dark:text-amber-300">
                {t('halachaCentralPoint', 'Punto Central de Halajá y Vida Judía:')}[cite: 20]
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium break-words">
                {isTranslating ? '...' : (translatedContent?.halachaFocus || parasha.halachaFocus)}[cite: 20]
              </p>
            </div>
          </div>
        )}

        {/* Subpestaña: 7 Aliyot */}
        {activeSubTab === 'aliyot' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              {t('aliyotBreakdown', 'División de las 7 Aliyot en Shabat por la Mañana')}[cite: 20]
            </h3>
            <div className="space-y-3">
              {parasha.aliyot.map((aliya, index) => {
                const targetAliya = translatedContent?.aliyot?.[index];
                const translatedDesc = typeof targetAliya === 'string' 
                  ? targetAliya 
                  : (targetAliya?.description || targetAliya?.text);

                return (
                  <div
                    key={aliya.number}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3.5 hover:border-amber-400 dark:hover:border-amber-700 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
                      {aliya.number}[cite: 20]
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {targetAliya?.title || `${aliya.number}ª Aliyá (${aliya.number === 1 ? 'Kohén' : aliya.number === 2 ? 'Leví' : 'Israel'})`}[cite: 20]
                        </h4>
                        <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold shrink-0">
                          {aliya.reference}[cite: 20]
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed break-words">
                        {isTranslating ? '✨ Traduciendo Aliyot...' : (translatedDesc || aliya.description)}[cite: 20]
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Subpestaña: Perla de Rashi */}
        {activeSubTab === 'rashi' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {t('rashiInsightTitle', 'Enseñanza de Rashi (Rabí Shelomó Itzjakí)')}[cite: 20]
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3">
              <p className="font-serif italic text-base text-amber-900 dark:text-amber-300 break-words">
                "{isTranslating ? '✨ Traduciendo...' : (translatedContent?.rashiInsight || parasha.rashiInsight)}"[cite: 20]
              </p>
            </div>
          </div>
        )}

        {/* Subpestaña: Jasidut (Incluye la perla propia y las 10 ideas maestras generales) */}
        {activeSubTab === 'chasidut' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                {isHebrew ? 'ממחשבת החסידות ופנימיות התורה' : 'Dimensión Espiritual y Jasídica'}
              </h3>
            </div>

            {/* Perla jasídica específica de la Parashá seleccionada */}
            <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-slate-800/80 border border-rose-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 block">
                {isHebrew ? `נקודה חסידית מפרשת ${getLocalized(parasha.name)}` : `Enseñanza jasídica de Parashat ${getLocalized(parasha.name)}`}[cite: 20]
              </span>
              <p className="font-serif text-base text-rose-950 dark:text-rose-200 break-words">
                {isTranslating ? '✨ Traduciendo...' : (translatedContent?.chabadInsight || parasha.chabadInsight)}[cite: 20]
              </p>
            </div>

            {/* Listado de las 10 ideas maestras de la Jasidut a través de las Parashot */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  {isHebrew ? '10 רעיונות חסידיים מרכזיים לאורך השנה' : '10 Ideas Maestras de la Jasidut a través del Ciclo Anual'}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chasidicParashotIdeas.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:border-amber-400 dark:hover:border-amber-600 transition space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                          {item.parasha}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h5 className="font-serif font-bold text-sm text-slate-900 dark:text-amber-200">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onAskAboutParasha(`Explícame en detalle la enseñanza jasídica de ${item.parasha} titulada "${item.title}" y su aplicación práctica.`)}
                        className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isHebrew ? 'הרחב עם הרב' : 'Profundizar con el Rabino'}</span>
                        <ChevronRight className={`w-3 h-3 ${isHebrew ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Botón de consulta directa al Rabino */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            {t('askAboutParashaPrompt', '¿Deseas profundizar en algún pasuk, halajá o comentario de esta Parashá?')}[cite: 20]
          </span>
          <button
            onClick={() => {
              onAskAboutParasha(
                `Rabino, me gustaría profundizar en las enseñanzas y halajot principales de Parashat ${getLocalized(parasha.name)}.`
              );
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('consultRabbiParasha', 'Consultar al Rabino sobre')} {getLocalized(parasha.name)}[cite: 20]</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default ParashaTab;