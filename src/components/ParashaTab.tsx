/**
 * ============================================================================
 * COMPONENTE: ParashaTab.tsx
 * Pestaña de Parashá limpia de citas y con las 10 Ideas Maestras de la Jasidut
 * ============================================================================
 */

import React, { useState } from 'react';
import { Scroll, BookOpen, Bookmark, Flame, Sparkles, MessageSquare, ChevronRight, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Aliyah {
  number: number;
  name: string;
  verses: string;
  summary: string;
}

interface ChasidutIdea {
  parasha: string;
  title: string;
  snippet: string;
  question: string;
}

interface ParashaData {
  id: string;
  nameEs: string;
  nameHe: string;
  sefer: string;
  reading: string;
  haftarah: string;
  summary: string;
  halachaPoint: string;
  rashiComment: string;
  chasidutThought: string;
  aliyot: Aliyah[];
}

// Función auxiliar para limpiar cualquier resto de etiquetas de citas
const cleanText = (text: string): string => {
  if (!text) return '';
  // Elimina cualquier texto a partir de "[cite:" de forma limpia
  return text.split('[cite:')[0].trim();
};

const CHASIDIC_IDEAS_LIST: ChasidutIdea[] = [
  {
    parasha: 'Parashá Bereshit',
    title: 'Una Morada en los Mundos Inferiores (Dira Betajtonim)',
    snippet: 'El propósito de la creación no es ascender puramente al plano espiritual, sino transformar este mundo físico y material en un santuario para lo divino.',
    question: 'Explícame el concepto jasídico de Dira Betajtonim y cómo elevar la materialidad cotidiana.'
  },
  {
    parasha: 'Parashá Noaj',
    title: 'El Arca como Espacio de Conciencia Interior (Teivá)',
    snippet: 'Las palabras y letras de la Torá y el rezo actúan como un refugio interior ("Teivá") que resguarda la mente y el alma en medio de las inundaciones del ego.',
    question: '¿Cómo se interpreta el Arca de Noaj en la Jasidut como refugio espiritual de la mente?'
  },
  {
    parasha: 'Parashá Lej Lecha',
    title: 'El Viaje hacia la Esencia Interior (Lej Lecha)',
    snippet: 'La orden dada a Avraham de "Ir hacia ti mismo" representa el despertar para trascender las limitaciones psicológicas y conectar con la esencia divina.',
    question: 'Profundiza en el concepto de "Lej Lecha" como un viaje de autodescubrimiento y conexión con el Creador.'
  },
  {
    parasha: 'Parashá Vayetze',
    title: 'La Escalera: Conexión entre lo Terrenal y lo Celestial',
    snippet: 'Nuestros pies están arraigados en las tareas cotidianas del mundo, pero nuestra conciencia puede elevarse hasta los cielos mediante la intención recta.',
    question: '¿Qué enseña el sueño de la escalera de Yaakov en la Jasidut sobre el equilibrio entre materia y espíritu?'
  },
  {
    parasha: 'Parashá Vyeshev',
    title: 'La Luz que Brota de la Oscuridad (Yosef en Egipto)',
    snippet: 'Las pruebas más difíciles y los momentos de oscuridad ocultan las semillas de nuestro crecimiento espiritual y salvación futura.',
    question: 'Explícame la perspectiva jasídica de cómo la luz se revela a través de las pruebas de Yosef.'
  },
  {
    parasha: 'Parashá Shemot',
    title: 'La Chispa Interior Indestructible en el Exilio',
    snippet: 'A pesar de las presiones del entorno y las ataduras del materialismo, la chispa esencial del alma judía permanece intacta y libre.',
    question: '¿Cómo aborda la Jasidut la supervivencia espiritual de la chispa divina en medio del exilio?'
  },
  {
    parasha: 'Parashá Yitró',
    title: 'Acción y Comprensión ("Naaseh VeNishma")',
    snippet: 'La disposición a actuar con compromiso antes de comprender racionalmente abre las puertas a una sabiduría superior e intuitiva.',
    question: 'Profundiza en el significado jasídico de "Naaseh VeNishma" en la entrega de la Torá.'
  },
  {
    parasha: 'Parashá Terumah',
    title: 'El Santuario en el Corazón de Cada Persona',
    snippet: 'El mandamiento de construir el Tabernáculo se traduce en convertir nuestro propio corazón en un espacio receptivo a la presencia divina.',
    question: '¿Cómo interpreta la Jasidut la construcción del Mishkán (Santuario) dentro del corazón humano?'
  },
  {
    parasha: 'Parashá Vayikrá',
    title: 'La Llamada de Amor y Cercanía ("Vayikrá")',
    snippet: 'El término afectuoso con el que Dios llama a Moshé denota que cada acercamiento espiritual se basa en el amor y la humildad sincera.',
    question: 'Explícame el matiz de amor en la palabra "Vayikrá" según las enseñanzas del Baal Shem Tov.'
  },
  {
    parasha: 'Parashá Bamidbar',
    title: 'El Desierto como Espacio de Apertura y Escucha',
    snippet: 'La Torá fue entregada en un desierto estéril y neutral, enseñando que para recibir inspiración superior debemos vaciar nuestro ego.',
    question: '¿Por qué la Torá se entregó en el desierto según la visión de la Jasidut?'
  }
];

const PARASHOT_DATABASE: Record<string, ParashaData> = {
  vaetjanan: {
    id: 'vaetjanan',
    nameEs: 'Parashat Vaetjanán',
    nameHe: 'וָאֶתְחַנַּן',
    sefer: 'Sefer Devarim (Deuteronomio)',
    reading: 'Devarim 3:23 – 7:11',
    haftarah: 'Isaías 40:1 – 40:26 (Najamu)',
    summary: 'Moshé relata su ruego (*Vaetjanán*) a Dios para entrar a la tierra, siendo denegado y ordenado subir al monte Pisgá. Repetición de los **Diez Mandamientos**. Proclamación del **Shemá Israel**: *"Escucha Israel, el Eterno es nuestro Dios, el Eterno es Uno"*. Advertencia contra la asimilación y mandato de amar a Dios.',
    halachaPoint: 'Las leyes de recitación del Shemá dos veces al día, la colocación de la Mezuzá en las puertas, y la prohibición de idolatría.',
    rashiComment: 'Rashi explica que Moshé suplicó quinientas quince oraciones (*Vaetjanán* equivale numéricamente a 515) hasta que Dios le dijo: *"Basta ya, no me hables más de este asunto"* (Devarim 3:26).',
    chasidutThought: 'El *Shemá Israel* es la declaración de fe más sublime del judaísmo. Afirma que detrás de toda la multiplicidad del universo físico opera una única e indivisible voluntad divina.',
    aliyot: [
      { number: 1, name: '1ª Aliyá (Kohén)', verses: '3:23 – 4:4', summary: 'Moshé ruega entrar a la tierra; Dios le ordena contemplarla desde la cima y designar a Yehoshúa.' },
      { number: 2, name: '2ª Aliyá (Leví)', verses: '4:5 – 4:40', summary: 'Exhortación apasionada a cumplir los estatutos de la Torá y prohibición de idolatría y esculturas.' },
      { number: 3, name: '3ª Aliyá (Israel)', verses: '4:41 – 4:49', summary: 'Establecimiento de las tres Ciudades de Refugio al este del río Jordán.' },
      { number: 4, name: '4ª Aliyá (Israel)', verses: '5:1 – 5:18', summary: 'Repetición solemne de los Diez Mandamientos dados en el Sinaí.' },
      { number: 5, name: '5ª Aliyá (Israel)', verses: '5:19 – 6:3', summary: 'Temor reverente del pueblo y proclamación de la unicidad divina.' },
      { number: 6, name: '6ª Aliyá (Israel)', verses: '6:4 – 6:25', summary: 'El **Shemá Israel**, el mandamiento del amor absoluto a Dios, el estudio continuo y la colocación de la Mezuzá.' },
      { number: 7, name: '7ª Aliyá (Israel)', verses: '7:1 – 7:11', summary: 'Mandato de destruir los altares paganos de Canaán y recordatorio de que Israel es el pueblo elegido.' }
    ]
  },
  bereshit: {
    id: 'bereshit',
    nameEs: 'Parashat Bereshit',
    nameHe: 'בְּרֵאשִׁית',
    sefer: 'Sefer Bereshit (Génesis)',
    reading: 'Bereshit 1:1 – 6:8',
    haftarah: 'Isaías 42:5 – 43:10',
    summary: 'La Creación del universo en seis días, el Shabat como coronación, la formación del hombre y la mujer en el Gan Edén, la prueba del fruto prohibido, el episodio de Caín y Abel, y la generación previa al Diluvio.',
    halachaPoint: 'La santidad del Shabat, el cuidado de la palabra y la responsabilidad ética en el uso de los recursos del mundo.',
    rashiComment: 'Rashi inicia comentando por qué la Torá comienza con la Creación y no con los mandamientos: para demostrar que el Creador tiene derecho soberano de otorgar la Tierra de Israel a los pueblos según Su voluntad.',
    chasidutThought: 'El versículo "Bereshit creó Dios..." enseña que el mundo entero es una morada potencial para lo Divino. Cada acto material esconde una chispa espiritual que busca elevarse hacia su origen.',
    aliyot: [
      { number: 1, name: '1ª Aliyá (Kohén)', verses: '1:1 – 2:3', summary: 'Los seis días de la Creación y la bendición del séptimo día (Shabat).' },
      { number: 2, name: '2ª Aliyá (Leví)', verses: '2:4 – 2:19', summary: 'Formación del hombre (Adam) y colocación en el Jardín del Edén.' },
      { number: 3, name: '3ª Aliyá (Israel)', verses: '2:20 – 3:21', summary: 'Creación de Javá (Eva), la serpiente, el pecado del fruto prohibido y el decreto divino.' },
      { number: 4, name: '4ª Aliyá (Israel)', verses: '3:22 – 4:18', summary: 'Expulsión del Edén, nacimiento de Caín y Abel, y el primer homicidio de la historia.' },
      { number: 5, name: '5ª Aliyá (Israel)', verses: '4:19 – 4:26', summary: 'La descendencia de Caín y el nacimiento de Shet.' },
      { number: 6, name: '6ª Aliyá (Israel)', verses: '5:1 – 5:24', summary: 'Genealogía desde Adam hasta Janoj, quien caminó con Dios.' },
      { number: 7, name: '7ª Aliyá (Israel)', verses: '5:25 – 6:8', summary: 'Generaciones hasta Noaj y el decreto del Diluvio ante la corrupción del mundo.' }
    ]
  }
};

interface ParashaTabProps {
  onAskAboutParasha: (questionText: string) => void;
}

export function ParashaTab({ onAskAboutParasha }: ParashaTabProps) {
  const { i18n } = useTranslation();
  const [selectedParashaKey, setSelectedParashaKey] = useState<string>('vaetjanan');
  const [activeSubTab, setActiveSubTab] = useState<'summary' | 'aliyot' | 'rashi' | 'jasidut'>('summary');

  const parasha = PARASHOT_DATABASE[selectedParashaKey] || PARASHOT_DATABASE['vaetjanan'];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      {/* Cabecera Principal de la Parashá */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/30 shadow-xl text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Scroll className="w-4 h-4" />
              <span>{cleanText(parasha.sefer)}</span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
                {cleanText(parasha.nameEs)}
              </h1>
              <span className="text-2xl sm:text-3xl font-serif text-amber-400" dir="rtl">
                {cleanText(parasha.nameHe)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 pt-1">
              <strong>Lectura:</strong> {cleanText(parasha.reading)} &nbsp;|&nbsp; <strong>Haftará:</strong> {cleanText(parasha.haftarah)}
            </p>
          </div>

          {/* Selector de Parashá */}
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-amber-500/40 space-y-1.5 shrink-0">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Seleccionar Parashá:
            </label>
            <select
              value={selectedParashaKey}
              onChange={(e) => setSelectedParashaKey(e.target.value)}
              className="w-full bg-slate-800 text-amber-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 border border-amber-500/40 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="vaetjanan">Vaetjanán (ואתחנן)</option>
              <option value="bereshit">Bereshit (בראשית)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pestañas internas de la Parashá */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'summary', label: 'Resumen y Temas', icon: BookOpen },
          { id: 'aliyot', label: '7 Aliyot (Lectura)', icon: Layers },
          { id: 'rashi', label: 'Perla de Rashi', icon: Sparkles },
          { id: 'jasidut', label: 'Dimensión Jasídica', icon: Flame },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido según la subpestaña seleccionada */}
      <div className="space-y-6">
        {/* SUBPESTAÑA 1: Resumen y Temas */}
        {activeSubTab === 'summary' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fadeIn">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
              Resumen de {cleanText(parasha.nameEs)}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {cleanText(parasha.summary)}
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block">
                Punto Central de Halajá y Vida Judía:
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {cleanText(parasha.halachaPoint)}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500 italic">
                ¿Deseas profundizar en algún pasuk, halajá o comentario de esta Parashá?
              </span>
              <button
                onClick={() => onAskAboutParasha(`Explícame con mayor profundidad los detalles y enseñanzas centrales de ${parasha.nameEs}.`)}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultar al Rabino sobre {cleanText(parasha.nameEs)}</span>
              </button>
            </div>
          </div>
        )}

        {/* SUBPESTAÑA 2: 7 Aliyot (Lectura limpia y ordenada) */}
        {activeSubTab === 'aliyot' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                División de las 7 Aliyot en Shabat por la Mañana
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {parasha.aliyot.map((aliyah) => (
                <div
                  key={aliyah.number}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-bold text-xs">
                        {aliyah.number}ª Aliyá
                      </span>
                      <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                        {cleanText(aliyah.name)}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                      {cleanText(aliyah.summary)}
                    </p>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <span className="inline-block px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-mono font-semibold text-xs border border-slate-200 dark:border-slate-700">
                      {cleanText(aliyah.verses)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => onAskAboutParasha(`Explícame detalladamente cada una de las 7 aliyot de ${parasha.nameEs} y sus profundidades místicas y halájicas.`)}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultar al Rabino sobre las Aliyot</span>
              </button>
            </div>
          </div>
        )}

        {/* SUBPESTAÑA 3: Perla de Rashi */}
        {activeSubTab === 'rashi' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                  Enseñanza de Rashi (Rabí Shelomó Itzjaki)
                </h2>
                <p className="text-xs text-slate-500">Comentario clásico sobre el texto sagrado</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-l-4 border-amber-600 text-slate-800 dark:text-slate-200 italic font-serif text-base leading-relaxed">
              "{cleanText(parasha.rashiComment)}"
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500 italic">
                ¿Quieres profundizar en los matices lingüísticos y exegéticos de Rashi?
              </span>
              <button
                onClick={() => onAskAboutParasha(`Analiza el comentario de Rashi en ${parasha.nameEs} y explícame su profundidad exegética.`)}
                className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultar sobre Rashi</span>
              </button>
            </div>
          </div>
        )}

        {/* SUBPESTAÑA 4: Dimensión Espiritual y Jasídica (Enseñanza específica + Las 10 Ideas Maestras) */}
        {activeSubTab === 'jasidut' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                    Dimensión Espiritual y Jasídica de {cleanText(parasha.nameEs)}
                  </h2>
                  <p className="text-xs text-slate-500">Sabiduría interior y aplicación para el alma</p>
                </div>
              </div>

              {/* Enseñanza Jasídica Específica de la Parashá actual */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/10 border border-amber-500/30 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                  Enseñanza Jasídica de {cleanText(parasha.nameEs)}:
                </span>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                  {cleanText(parasha.chasidutThought)}
                </p>
              </div>
            </div>

            {/* Cuadrícula de las 10 Ideas Maestras de la Jasidut a través del Ciclo Anual */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>10 Ideas Maestras de la Jasidut a través del Ciclo Anual</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CHASIDIC_IDEAS_LIST.map((idea, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                        {idea.parasha}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {idea.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {idea.snippet}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                      <button
                        onClick={() => onAskAboutParasha(idea.question)}
                        className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1 transition cursor-pointer"
                      >
                        <span>Profundizar con el Rabino</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParashaTab;