/**
 * ============================================================================
 * COMPONENTE: ParashaTab.tsx
 * Pestaña con las 54 Parashot, limpieza de citas y cálculo automático local.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Scroll, BookOpen, Flame, Sparkles, MessageSquare, ChevronRight, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Aliyah {
  number: number;
  name: string;
  verses: string;
  summary: string;
}

interface ChasidutLesson {
  title: string;
  snippet: string;
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
  jasidicLessons: ChasidutLesson[];
  aliyot: Aliyah[];
}

// Función auxiliar para limpiar texto de citas
const cleanText = (text: string): string => {
  if (!text) return '';
  return text.split('[cite:')[0].trim();
};

// Lista ordenada de las 54 Parashot del ciclo anual de la Torá
const PARASHOT_SEQUENCE = [
  'bereshit', 'noaj', 'lejlecha', 'vayeira', 'chayeisarah', 'toldot', 'vayetze',
  'vayishlach', 'vayeshev', 'miketz', 'vayigash', 'vayechi', 'shemot', 'vaera',
  'bo', 'beshalach', 'yitro', 'mishpatim', 'terumah', 'tetzaveh', 'kitisa',
  'vayakhel', 'pekudei', 'vayikra', 'tzav', 'shemini', 'tazria', 'metzora',
  'achreimot', 'kedoshim', 'emor', 'behar', 'bejukotai', 'bamidbar', 'nasso',
  'behaalotecha', 'shelach', 'korach', 'chukat', 'balak', 'pinchas', 'matotmasei',
  'devarim', 'vaetjanan', 'ekev', 'reeh', 'shoftim', 'kiteitzei', 'kitavo',
  'nitzavim', 'vayeilech', 'haazinu', 'vezothaberakhah'
];

// Función para calcular la Parashá basada en el calendario
const getCurrentParashaKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  
  const simchatTorahEstimates: Record<number, Date> = {
    2024: new Date(2024, 9, 25),
    2025: new Date(2025, 9, 14),
    2026: new Date(2026, 9, 5),
    2027: new Date(2027, 9, 25),
  };

  const baseDate = simchatTorahEstimates[year] || new Date(year, 9, 10);
  const cycleStart = now < baseDate ? new Date(year - 1, 9, 10) : baseDate;
  
  const diffTime = now.getTime() - cycleStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'bereshit';
  
  const weekIndex = Math.floor(diffDays / 7);
  const safeIndex = Math.max(0, Math.min(weekIndex, PARASHOT_SEQUENCE.length - 1));
  
  return PARASHOT_SEQUENCE[safeIndex];
};

// Base de datos completa con las 54 Parashot de la Torá
const PARASHOT_DATABASE: Record<string, ParashaData> = {
  bereshit: {
    id: 'bereshit', nameEs: 'Parashat Bereshit', nameHe: 'בְּרֵאשִׁית', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 1:1 – 6:8', haftarah: 'Isaías 42:5 – 43:10',
    summary: 'La Creación del universo en seis días, el Shabat como coronación, la formación del hombre y la mujer en el Gan Edén, la prueba del fruto prohibido y los orígenes de la humanidad.',
    halachaPoint: 'Santidad del Shabat y responsabilidad ética en el cuidado del mundo.',
    rashiComment: 'La Torá comienza con la Creación para demostrar el derecho soberano de Dios sobre toda la tierra.',
    chasidutThought: 'El mundo entero es una morada potencial para lo Divino (Dira Betajtonim), transformando la materia en un santuario.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-2:3', summary: 'Seis días de la Creación y Shabat.' }, { number: 2, name: '2ª Aliyá', verses: '2:4-2:19', summary: 'Formación de Adam.' }, { number: 3, name: '3ª Aliyá', verses: '2:20-3:21', summary: 'Creación de Javá y el fruto prohibido.' }, { number: 4, name: '4ª Aliyá', verses: '3:22-4:18', summary: 'Expulsión y Caín y Abel.' }, { number: 5, name: '5ª Aliyá', verses: '4:19-4:26', summary: 'Descendencia de Caín.' }, { number: 6, name: '6ª Aliyá', verses: '5:1-5:24', summary: 'Genealogía hasta Janoj.' }, { number: 7, name: '7ª Aliyá', verses: '5:25-6:8', summary: 'Generaciones hasta Noaj.' }]
  },
  noaj: {
    id: 'noaj', nameEs: 'Parashat Noaj', nameHe: 'נֹחַ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 6:9 – 11:32', haftarah: 'Isaías 54:1 – 55:5',
    summary: 'El Diluvio universal, la construcción del Arca, el pacto del arco iris, la torre de Babel y las generaciones de Teraj.',
    halachaPoint: 'Las siete leyes de los hijos de Noaj y la preservación de la vida.',
    rashiComment: 'Noaj caminó con Dios, pero necesitó el apoyo del Arca debido a su fe imperfecta.',
    chasidutThought: 'El Arca (Teivá) representa las palabras de la Torá y el rezo que resguardan el alma en medio de las inundaciones del ego.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:9-6:22', summary: 'Noaj y el mandato del Arca.' }, { number: 2, name: '2ª Aliyá', verses: '7:1-7:16', summary: 'Entrada al Arca.' }, { number: 3, name: '3ª Aliyá', verses: '7:17-8:14', summary: 'El Diluvio.' }, { number: 4, name: '4ª Aliyá', verses: '8:15-9:7', summary: 'Salida del Arca.' }, { number: 5, name: '5ª Aliyá', verses: '9:8-9:17', summary: 'Pacto del arco iris.' }, { number: 6, name: '6ª Aliyá', verses: '9:18-10:32', summary: 'Naciones.' }, { number: 7, name: '7ª Aliyá', verses: '11:1-11:32', summary: 'Torre de Babel.' }]
  },
  lejlecha: {
    id: 'lejlecha', nameEs: 'Parashat Lej Lecha', nameHe: 'לֶךְ-לְךָ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 12:1 – 17:27', haftarah: 'Isaías 40:27 – 41:16',
    summary: 'El llamado divino a Abraham para dejar su tierra, su viaje a Canaán, el pacto entre las partes y el establecimiento del Brit Milá.',
    halachaPoint: 'El precepto del Brit Milá en el octavo día y la hospitalidad con los invitados.',
    rashiComment: 'Lej Lecha significa "ve hacia ti mismo", un viaje de descubrimiento interior.',
    chasidutThought: 'Cada persona debe trascender sus limitaciones psicológicas y geográficas internas ("su tierra y su parentela").',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '12:1-12:13', summary: 'Llamado a Abraham.' }, { number: 2, name: '2ª Aliyá', verses: '12:14-13:18', summary: 'Separación de Lot.' }, { number: 3, name: '3ª Aliyá', verses: '14:1-14:24', summary: 'Guerra de reyes.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:21', summary: 'Pacto.' }, { number: 5, name: '5ª Aliyá', verses: '16:1-16:16', summary: 'Ishmael.' }, { number: 6, name: '6ª Aliyá', verses: '17:1-17:14', summary: 'Circuncisión.' }, { number: 7, name: '7ª Aliyá', verses: '17:15-17:27', summary: 'Pacto sellado.' }]
  },
  vayeira: {
    id: 'vayeira', nameEs: 'Parashat Vayeira', nameHe: 'וַיֵּרָא', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 18:1 – 22:24', haftarah: '2 Reyes 4:1 – 4:37',
    summary: 'La visita de los ángeles a Abraham, la destrucción de Sodoma, el nacimiento de Itzjak y la prueba de la Akedá.',
    halachaPoint: 'Leyes de hospitalidad, compasión por el prójimo y entrega absoluta a la voluntad divina.',
    rashiComment: 'Abraham intercedió por Sodoma demostrando que el justo busca el mérito y la clemencia.',
    chasidutThought: 'La Akedá revela que el vínculo con Dios trasciende la lógica humana y se arraiga en la esencia del alma.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '18:1-18:33', summary: 'Visita de ángeles.' }, { number: 2, name: '2ª Aliyá', verses: '19:1-19:20', summary: 'Lot en Sodoma.' }, { number: 3, name: '3ª Aliyá', verses: '19:21-20:18', summary: 'Destrucción.' }, { number: 4, name: '4ª Aliyá', verses: '21:1-21:21', summary: 'Itzjak.' }, { number: 5, name: '5ª Aliyá', verses: '21:22-21:34', summary: 'Pacto.' }, { number: 6, name: '6ª Aliyá', verses: '22:1-22:19', summary: 'Akedá.' }, { number: 7, name: '7ª Aliyá', verses: '22:20-22:24', summary: 'Familia.' }]
  },
  chayeisarah: {
    id: 'chayeisarah', nameEs: 'Parashat Hayé Sara', nameHe: 'חַיֵּי שָׂרָה', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 23:1 – 25:18', haftarah: '1 Reyes 1:1 – 1:31',
    summary: 'Fallecimiento de Sara, compra de la Cueva de Majpelá, y la misión de Eliézer para encontrar esposa para Itzjak.',
    halachaPoint: 'Honra a los difuntos y adquisición legal de la tierra de Israel.',
    rashiComment: 'Sara falleció al enterarse de la Akedá, reflejando la profundidad del vínculo materno.',
    chasidutThought: 'La búsqueda de Rivká por Eliézer simboliza el descenso del alma al mundo material para rescatar las chispas divinas.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '23:1-23:20', summary: 'Majpelá.' }, { number: 2, name: '2ª Aliyá', verses: '24:1-24:9', summary: 'Eliézer.' }, { number: 3, name: '3ª Aliyá', verses: '24:10-24:26', summary: 'Viaje.' }, { number: 4, name: '4ª Aliyá', verses: '24:27-24:52', summary: 'Rivká.' }, { number: 5, name: '5ª Aliyá', verses: '24:53-24:67', summary: 'Matrimonio.' }, { number: 6, name: '6ª Aliyá', verses: '25:1-25:11', summary: 'Keturá.' }, { number: 7, name: '7ª Aliyá', verses: '25:12-25:18', summary: 'Ishmael.' }]
  },
  toldot: {
    id: 'toldot', nameEs: 'Parashat Toldot', nameHe: 'תּוֹלְדֹת', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 25:19 – 28:9', haftarah: 'Malaquías 1:1 – 2:7',
    summary: 'Nacimiento de Yaakov y Esav, la venta de la primogenitura y las bendiciones que recibe Yaakov.',
    halachaPoint: 'El valor de la primogenitura espiritual frente al materialismo inmediato.',
    rashiComment: 'Esav aparentaba rectitud haciendo preguntas capciosas sobre la halajá.',
    chasidutThought: 'Yaakov y Esav representan las dos fuerzas en el interior del ser humano: lo espiritual y lo terrenal.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:19-25:34', summary: 'Nacimiento.' }, { number: 2, name: '2ª Aliyá', verses: '26:1-26:12', summary: 'Guerar.' }, { number: 3, name: '3ª Aliyá', verses: '26:13-26:22', summary: 'Pozos.' }, { number: 4, name: '4ª Aliyá', verses: '26:23-26:35', summary: 'Pacto.' }, { number: 5, name: '5ª Aliyá', verses: '27:1-27:27', summary: 'Bendiciones.' }, { number: 6, name: '6ª Aliyá', verses: '27:28-28:4', summary: 'Partida.' }, { number: 7, name: '7ª Aliyá', verses: '28:5-28:9', summary: 'Mahalat.' }]
  },
  vayetze: {
    id: 'vayetze', nameEs: 'Parashat Vayetze', nameHe: 'וֵיצֵא', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 28:10 – 32:3', haftarah: 'Oseas 12:13 – 14:10',
    summary: 'El sueño de la escalera de Yaakov, su llegada a Jarán, su matrimonio con Rajel y Leá, y su partida enfrentando a Labán.',
    halachaPoint: 'Institución del rezo nocturno (Arvit) y el cumplimiento íntegro de los compromisos.',
    rashiComment: 'Las piedras unidas bajo la cabeza de Yaakov simbolizan la unificación de Israel.',
    chasidutThought: 'Nuestros pies están en la tierra pero nuestra conciencia puede elevarse a los cielos mediante la intención recta.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '28:10-28:22', summary: 'Escalera.' }, { number: 2, name: '2ª Aliyá', verses: '29:1-29:17', summary: 'Rajel.' }, { number: 3, name: '3ª Aliyá', verses: '29:18-30:13', summary: 'Matrimonios.' }, { number: 4, name: '4ª Aliyá', verses: '30:14-30:27', summary: 'Yosef.' }, { number: 5, name: '5ª Aliyá', verses: '30:28-31:16', summary: 'Labán.' }, { number: 6, name: '6ª Aliyá', verses: '31:17-31:54', summary: 'Huida.' }, { number: 7, name: '7ª Aliyá', verses: '32:1-32:3', summary: 'Majanaim.' }]
  },
  vayishlach: {
    id: 'vayishlach', nameEs: 'Parashat Vayishlach', nameHe: 'וַיִּשְׁלַח', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 32:4 – 36:43', haftarah: 'Oseas 11:7 – 12:12',
    summary: 'Preparativos de Yaakov para encontrarse con Esav, su lucha nocturna con el ángel, la reconciliación y episodios en Shejem.',
    halachaPoint: 'Estrategia ante el peligro, diplomacia y el cuidado de las leyes dietéticas.',
    rashiComment: 'La lucha con el ángel representa la lucha perpetua de Israel contra las fuerzas opositoras.',
    chasidutThought: 'Al vencer al ángel de Esav, Yaakov transforma la oscuridad en luz y recibe el nombre de Israel.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '32:4-32:33', summary: 'Lucha.' }, { number: 2, name: '2ª Aliyá', verses: '33:1-33:20', summary: 'Esav.' }, { number: 3, name: '3ª Aliyá', verses: '34:1-34:31', summary: 'Shejem.' }, { number: 4, name: '4ª Aliyá', verses: '35:1-35:11', summary: 'Beit El.' }, { number: 5, name: '5ª Aliyá', verses: '35:12-35:29', summary: 'Rajel.' }, { number: 6, name: '6ª Aliyá', verses: '36:1-36:19', summary: 'Edom.' }, { number: 7, name: '7ª Aliyá', verses: '36:20-36:43', summary: 'Duques.' }]
  },
  vayeshev: {
    id: 'vayeshev', nameEs: 'Parashat Vyeshev', nameHe: 'וְיֵשֶׁב', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 37:1 – 40:23', haftarah: 'Amós 2:6 – 3:8',
    summary: 'Los sueños de Yosef, su venta como esclavo a Egipto, la historia de Tamar y Yehudah, y Yosef en la prisión.',
    halachaPoint: 'Prohibición de la maledicencia y mantenimiento de la integridad moral en la adversidad.',
    rashiComment: 'Los hermanos vendieron a Yosef motivados por celos inspirados en sus sueños.',
    chasidutThought: 'Las pruebas más difíciles de la vida ocultan las semillas de nuestra salvación futura.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '37:1-37:11', summary: 'Sueños.' }, { number: 2, name: '2ª Aliyá', verses: '37:12-37:36', summary: 'Venta.' }, { number: 3, name: '3ª Aliyá', verses: '38:1-38:30', summary: 'Tamar.' }, { number: 4, name: '4ª Aliyá', verses: '39:1-39:6', summary: 'Potifar.' }, { number: 5, name: '5ª Aliyá', verses: '39:7-39:23', summary: 'Prisión.' }, { number: 6, name: '6ª Aliyá', verses: '40:1-40:13', summary: 'Copero.' }, { number: 7, name: '7ª Aliyá', verses: '40:14-40:23', summary: 'Olvido.' }]
  },
  miketz: {
    id: 'miketz', nameEs: 'Parashat Miketz', nameHe: 'מִקֵּץ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 41:1 – 44:17', haftarah: '1 Reyes 3:15 – 4:1',
    summary: 'Yosef interpreta los sueños del Faraón, asciende a virrey de Egipto y recibe a sus hermanos que acuden por alimentos.',
    halachaPoint: 'Leyes de festividades (Janucá) y responsabilidad fraternal.',
    rashiComment: 'El ascenso de Yosef ocurrió en una sola noche, demostrando que la salvación divina llega al instante.',
    chasidutThought: 'Yosef simboliza la capacidad de descender al exilio material sin perder la identidad espiritual.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '41:1-41:14', summary: 'Sueños.' }, { number: 2, name: '2ª Aliyá', verses: '41:15-41:38', summary: 'Interpretación.' }, { number: 3, name: '3ª Aliyá', verses: '41:39-41:52', summary: 'Virrey.' }, { number: 4, name: '4ª Aliyá', verses: '41:53-42:18', summary: 'Hermanos.' }, { number: 5, name: '5ª Aliyá', verses: '42:19-43:15', summary: 'Binyamin.' }, { number: 6, name: '6ª Aliyá', verses: '43:16-44:17', summary: 'Copa.' }]
  },
  vayigash: {
    id: 'vayigash', nameEs: 'Parashat Vayigash', nameHe: 'וַיִּגַּשׁ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 44:18 – 47:27', haftarah: 'Ezequiel 37:15 – 37:28',
    summary: 'Yehudah se aproxima a Yosef, quien se revela a sus hermanos, el reencuentro con Yaakov y el asentamiento en Goshen.',
    halachaPoint: 'El valor de la paz familiar y la gratitud hacia quienes nos sustentan.',
    rashiComment: 'Al revelarse, Yosef disipó la vergüenza y el miedo de sus hermanos con palabras de consuelo.',
    chasidutThought: 'La unión entre Yosef y Yehudah anticipa la futura unificación de todo el pueblo de Israel.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '44:18-45:7', summary: 'Revelación.' }, { number: 2, name: '2ª Aliyá', verses: '45:8-45:27', summary: 'Mensaje.' }, { number: 3, name: '3ª Aliyá', verses: '45:28-46:27', summary: 'Migración.' }, { number: 4, name: '4ª Aliyá', verses: '46:28-47:10', summary: 'Reencuentro.' }, { number: 5, name: '5ª Aliyá', verses: '47:11-47:31', summary: 'Goshen.' }]
  },
  vayechi: {
    id: 'vayechi', nameEs: 'Parashat Vayejí', nameHe: 'וַיְחִי', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 47:28 – 50:26', haftarah: '1 Reyes 2:1 – 2:12',
    summary: 'Últimos días de Yaakov, bendición a los hijos de Yosef, bendiciones a las tribus y fallecimiento de Yaakov y Yosef.',
    halachaPoint: 'Testamento ético, bendición a los hijos y la fe en la redención futura.',
    rashiComment: 'Antes de morir, Yaakov quiso revelar el fin de los tiempos pero la presencia divina se apartó.',
    chasidutThought: 'La vida de Yaakov en Egipto demuestra que la luz espiritual puede iluminar los rincones más densos.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '47:28-48:22', summary: 'Bendición.' }, { number: 2, name: '2ª Aliyá', verses: '49:1-49:18', summary: 'Tribus.' }, { number: 3, name: '3ª Aliyá', verses: '49:19-49:26', summary: 'Continuación.' }, { number: 4, name: '4ª Aliyá', verses: '49:27-50:20', summary: 'Sepultura.' }, { number: 5, name: '5ª Aliyá', verses: '50:21-50:26', summary: 'Yosef.' }]
  },
  shemot: {
    id: 'shemot', nameEs: 'Parashat Shemot', nameHe: 'שְׁמוֹת', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 1:1 – 6:1', haftarah: 'Isaías 27:6 – 28:13',
    summary: 'Esclavitud en Egipto, nacimiento y salvación de Moshé, la zarza ardiente y el inicio de la misión libertadora.',
    halachaPoint: 'Respeto a los ancianos, valentía ante la injusticia y el valor de la libertad.',
    rashiComment: 'Las parteras hebreas temieron a Dios y desobedecieron al Faraón arriesgando sus vidas.',
    chasidutThought: 'La zarza ardiente que no se consume enseña que Dios está presente incluso en el sufrimiento del exilio.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:17', summary: 'Esclavitud.' }, { number: 2, name: '2ª Aliyá', verses: '1:18-2:10', summary: 'Moshé.' }, { number: 3, name: '3ª Aliyá', verses: '2:11-2:25', summary: 'Midián.' }, { number: 4, name: '4ª Aliyá', verses: '3:1-3:15', summary: 'Zarza.' }, { number: 5, name: '5ª Aliyá', verses: '3:16-4:17', summary: 'Señales.' }, { number: 6, name: '6ª Aliyá', verses: '4:18-5:9', summary: 'Retorno.' }, { number: 7, name: '7ª Aliyá', verses: '5:10-6:1', summary: 'Queja.' }]
  },
  vaera: {
    id: 'vaera', nameEs: 'Parashat Vaerá', nameHe: 'וָאֵרָא', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 6:2 – 9:35', haftarah: 'Ezequiel 28:25 – 29:21',
    summary: 'Las cuatro expresiones de redención y las primeras siete plagas enviadas sobre Egipto.',
    halachaPoint: 'Las leyes de las plagas demuestran la soberanía absoluta del Creador sobre la naturaleza.',
    rashiComment: 'Dios se reveló a los patriarcas con el nombre Shakai, pero a Moshé con el Inefable.',
    chasidutThought: 'Cada plaga desmanteló una falsa deidad material de la cultura y el poder de Egipto.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:2-6:13', summary: 'Promesa.' }, { number: 2, name: '2ª Aliyá', verses: '6:14-6:28', summary: 'Genealogía.' }, { number: 3, name: '3ª Aliyá', verses: '6:29-7:7', summary: 'Misión.' }, { number: 4, name: '4ª Aliyá', verses: '7:8-8:6', summary: 'Plagas.' }, { number: 5, name: '5ª Aliyá', verses: '8:7-8:15', summary: 'Piojos.' }, { number: 6, name: '6ª Aliyá', verses: '9:1-9:19', summary: 'Granizo.' }]
  },
  bo: {
    id: 'bo', nameEs: 'Parashat Bo', nameHe: 'בֹּא', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 10:1 – 13:16', haftarah: 'Jeremías 46:13 – 46:28',
    summary: 'Las últimas tres plagas, el precepto del sacrificio de Pésaj, la salida de Egipto y la mitzvá de Tefilin.',
    halachaPoint: 'Leyes de Pésaj, prohibición de Jaméts y la obligación de relatar el Éxodo.',
    rashiComment: 'Dios le dijo a Moshé "Bo el Faraón" (Entra), dándole valor para enfrentar al tirano.',
    chasidutThought: 'La salida de Egipto (Metziat Mitzrayim) es un éxodo espiritual constante de las limitaciones personales.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '10:1-10:11', summary: 'Langostas.' }, { number: 2, name: '2ª Aliyá', verses: '10:12-11:3', summary: 'Oscuridad.' }, { number: 3, name: '3ª Aliyá', verses: '12:1-12:20', summary: 'Pésaj.' }, { number: 4, name: '4ª Aliyá', verses: '12:21-12:28', summary: 'Sacrificio.' }, { number: 5, name: '5ª Aliyá', verses: '12:29-12:51', summary: 'Éxodo.' }, { number: 6, name: '6ª Aliyá', verses: '13:1-13:16', summary: 'Tefilin.' }]
  },
  beshalach: {
    id: 'beshalach', nameEs: 'Parashat Beshalaj', nameHe: 'בְּשַׁלַּח', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 13:17 – 17:16', haftarah: 'Jueces 4:4 – 5:31',
    summary: 'La partición del Mar Rojo, el canto de Moshé y Miriam, el milagro del Maná y la batalla contra Amalek.',
    halachaPoint: 'Confianza en Dios en momentos límite y la observancia del Shabat a través del Maná.',
    rashiComment: 'El pueblo dudó frente al mar, pero Najshón se arrojó a las aguas antes de que se abrieran.',
    chasidutThought: 'La apertura del mar simboliza traspasar la frontera de la propia naturaleza lógica y racional.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '13:17-14:8', summary: 'Ruta.' }, { number: 2, name: '2ª Aliyá', verses: '14:9-14:14', summary: 'Temor.' }, { number: 3, name: '3ª Aliyá', verses: '14:15-14:25', summary: 'Mar Rojo.' }, { number: 4, name: '4ª Aliyá', verses: '14:26-15:26', summary: 'Cántico.' }, { number: 5, name: '5ª Aliyá', verses: '15:27-16:10', summary: 'Desierto.' }, { number: 6, name: '6ª Aliyá', verses: '16:11-16:36', summary: 'Maná.' }, { number: 7, name: '7ª Aliyá', verses: '17:1-17:16', summary: 'Amalek.' }]
  },
  yitro: {
    id: 'yitro', nameEs: 'Parashat Yitró', nameHe: 'יִתְרוֹ', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 18:1 – 20:23', haftarah: 'Isaías 6:1 – 7:6',
    summary: 'Llegada de Yitró, nombramiento de jueces y la solemne Entrega de la Torá en el Sinaí con los Diez Mandamientos.',
    halachaPoint: 'Cumplimiento de los Diez Mandamientos y la estructura de justicia comunitaria.',
    rashiComment: 'Yitró se unió a Israel al escuchar los grandes milagros de la redención.',
    chasidutThought: 'En el Sinaí se unieron los mundos espirituales y materiales por primera vez en la historia.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '18:1-18:12', summary: 'Yitró.' }, { number: 2, name: '2ª Aliyá', verses: '18:13-18:27', summary: 'Jueces.' }, { number: 3, name: '3ª Aliyá', verses: '19:1-19:6', summary: 'Llegada.' }, { number: 4, name: '4ª Aliyá', verses: '19:7-19:25', summary: 'Preparación.' }, { number: 5, name: '5ª Aliyá', verses: '20:1-20:14', summary: 'Mandamientos.' }, { number: 6, name: '6ª Aliyá', verses: '20:15-20:23', summary: 'Altares.' }]
  },
  mishpatim: {
    id: 'mishpatim', nameEs: 'Parashat Mishpatim', nameHe: 'מִשְׁפָּטִים', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 21:1 – 24:18', haftarah: 'Jeremías 34:8 – 34:22; 33:25 – 33:26',
    summary: 'Leyes civiles y sociales, ética interpersonal, protección al vulnerable y el compromiso "Hacer y Escuchar".',
    halachaPoint: 'Justicia civil, prohibición de usura, respeto al prójimo y caridad.',
    rashiComment: 'Las leyes civiles se colocaron inmediatamente después de los Diez Mandamientos para mostrar la santidad de la justicia.',
    chasidutThought: 'La ética interpersonal es la prueba más genuina del compromiso profundo con Dios.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:1-21:19', summary: 'Siervos.' }, { number: 2, name: '2ª Aliyá', verses: '21:20-22:3', summary: 'Daños.' }, { number: 3, name: '3ª Aliyá', verses: '22:4-22:26', summary: 'Ética.' }, { number: 4, name: '4ª Aliyá', verses: '22:27-23:5', summary: 'Sociedad.' }, { number: 5, name: '5ª Aliyá', verses: '23:6-23:19', summary: 'Fiestas.' }, { number: 6, name: '6ª Aliyá', verses: '23:20-24:18', summary: 'Pacto.' }]
  },
  terumah: {
    id: 'terumah', nameEs: 'Parashat Terumá', nameHe: 'תְּרוּמָה', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 25:1 – 27:19', haftarah: '1 Reyes 5:26 – 6:13',
    summary: 'Ofrendas para el Santuario (Mishkán), instrucciones detalladas para construir el Arca, la mesa, la menorá y el tabernáculo.',
    halachaPoint: 'Construcción de sinagogas y espacios sagrados comunitarios.',
    rashiComment: 'Cada aporte al Mishkán debía provenir de un corazón generoso y voluntarioso.',
    chasidutThought: 'El Santuario externo refleja el santuario que debemos construir dentro de nuestro propio corazón.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:1-25:16', summary: 'Arca.' }, { number: 2, name: '2ª Aliyá', verses: '25:17-25:40', summary: 'Menorá.' }, { number: 3, name: '3ª Aliyá', verses: '26:1-26:30', summary: 'Estructura.' }, { number: 4, name: '4ª Aliyá', verses: '26:31-27:8', summary: 'Altar.' }, { number: 5, name: '5ª Aliyá', verses: '27:9-27:19', summary: 'Atrio.' }]
  },
  tetzaveh: {
    id: 'tetzaveh', nameEs: 'Parashat Tetzavé', nameHe: 'תְּצַוֶּה', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 27:20 – 30:10', haftarah: 'Ezequiel 43:10 – 43:27',
    summary: 'El aceite puro para la Menorá, las vestimentas sagradas de los sacerdotes y la consagración del altar del incienso.',
    halachaPoint: 'Leyes sobre vestimenta ritual y la iluminación continua de la Menorá.',
    rashiComment: 'El nombre de Moshé no aparece explícitamente debido a su frase "Bórrame de tu libro".',
    chasidutThought: 'Las vestimentas sacerdotales elevan la materia corporal del ser humano al servicio divino.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '27:20-28:12', summary: 'Aceite.' }, { number: 2, name: '2ª Aliyá', verses: '28:13-28:30', summary: 'Efod.' }, { number: 3, name: '3ª Aliyá', verses: '28:31-28:43', summary: 'Manto.' }, { number: 4, name: '4ª Aliyá', verses: '29:1-29:37', summary: 'Consagración.' }, { number: 5, name: '5ª Aliyá', verses: '29:38-30:10', summary: 'Incienso.' }]
  },
  kitisa: {
    id: 'kitisa', nameEs: 'Parashat Ki Tisá', nameHe: 'כִּי تِשָּׂא', sefer: 'Shemot (Éxodo)', reading: 'Shemot 30:11 – 34:35', haftarah: '1 Reyes 18:1 – 18:39',
    summary: 'El impuesto del medio shيكل, el becerro de oro, la rotura de las tablas y la revelación de los Trece Atributos.',
    halachaPoint: 'Prohibición de la idolatría, observancia del Shabat y el perdón divino.',
    rashiComment: 'Dios le mostró a Moshé los Trece Atributos como fórmula infalible de arrepentimiento.',
    chasidutThought: 'Tras el pecado del becerro de oro, la relación con Dios se profundizó aún más mediante el perdón.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '30:11-30:16', summary: 'Censo.' }, { number: 2, name: '2ª Aliyá', verses: '30:17-31:17', summary: 'Shabat.' }, { number: 3, name: '3ª Aliyá', verses: '31:18-33:11', summary: 'Becerro.' }, { number: 4, name: '4ª Aliyá', verses: '33:12-34:26', summary: 'Atributos.' }, { number: 5, name: '5ª Aliyá', verses: '34:27-34:35', summary: 'Resplandor.' }]
  },
  vayakhel: {
    id: 'vayakhel', nameEs: 'Parashat Vayakhel', nameHe: 'וַיַּקְהֵל', sefer: 'Shemot (Éxodo)', reading: 'Shemot 35:1 – 38:20', haftarah: '1 Reyes 7:13 – 7:26',
    summary: 'Convocatoria del pueblo, recordatorio de las leyes del Shabat y recolección de materiales para construir el Mishkán.',
    halachaPoint: 'Leyes de prohibición de melajot en Shabat vinculadas a la construcción del Tabernáculo.',
    rashiComment: 'El Shabat precede al trabajo del Mishkán para enseñar que la creación no anula el descanso.',
    chasidutThought: 'El Shabat aporta la energía espiritual y el reposo necesario para santificar toda la semana.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '35:1-36:4', summary: 'Shabat.' }, { number: 2, name: '2ª Aliyá', verses: '36:5-36:19', summary: 'Trabajos.' }, { number: 3, name: '3ª Aliyá', verses: '36:20-37:16', summary: 'Arca.' }, { number: 4, name: '4ª Aliyá', verses: '37:17-38:20', summary: 'Atrio.' }]
  },
  pekudei: {
    id: 'pekudei', nameEs: 'Parashat Pekudei', nameHe: 'פְּקוּדֵי', sefer: 'Shemot (Éxodo)', reading: 'Shemot 38:21 – 40:38', haftarah: '1 Reyes 7:40 – 7:50',
    summary: 'Inventario de los materiales del Mishkán, ensamblaje final de la estructura y la bajada de la Presencia Divina.',
    halachaPoint: 'Transparencia financiera y rendición de cuentas en fondos comunitarios.',
    rashiComment: 'Moshé rindió cuentas exactas de cada metal recolectado para dar ejemplo de integridad.',
    chasidutThought: 'Cuando el ser humano purifica sus actos, la gloria divina reposa de forma tangible dentro de él.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '38:21-39:1', summary: 'Inventario.' }, { number: 2, name: '2ª Aliyá', verses: '39:2-39:21', summary: 'Vestimentas.' }, { number: 3, name: '3ª Aliyá', verses: '39:22-39:43', summary: 'Inspección.' }, { number: 4, name: '4ª Aliyá', verses: '40:1-40:38', summary: 'Montaje.' }]
  },
  vayikra: {
    id: 'vayikra', nameEs: 'Parashat Vayikrá', nameHe: 'וַיִּקְרָא', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 1:1 – 5:26', haftarah: 'Isaías 43:21 – 44:23',
    summary: 'Leyes detalladas sobre los sacrificios (Olah, Minjá, Shelamim, Jatat y Asham) ofrecidos en el Tabernáculo.',
    halachaPoint: 'Proceso de arrepentimiento y expiación mediante ofrendas y el compromiso interior.',
    rashiComment: 'El llamado "Vayikrá" denota afecto y cercanía divina hacia Moshé.',
    chasidutThought: 'Ofrecer un sacrificio simboliza entregar los instintos animales propios al servicio del Creador.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:13', summary: 'Olah.' }, { number: 2, name: '2ª Aliyá', verses: '1:14-2:16', summary: 'Minjá.' }, { number: 3, name: '3ª Aliyá', verses: '3:1-3:17', summary: 'Shelamim.' }, { number: 4, name: '4ª Aliyá', verses: '4:1-4:26', summary: 'Jatat.' }, { number: 5, name: '5ª Aliyá', verses: '4:27-5:10', summary: 'Particulares.' }, { number: 6, name: '6ª Aliyá', verses: '5:11-5:26', summary: 'Asham.' }]
  },
  tzav: {
    id: 'tzav', nameEs: 'Parashat Tzav', nameHe: 'צַו', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 6:1 – 8:36', haftarah: 'Jeremías 7:21 – 8:3; 9:22 – 9:23',
    summary: 'Instrucciones para los sacerdotes sobre el mantenimiento del fuego en el altar y la investidura de Aarón.',
    halachaPoint: 'Leyes sobre el fuego perpetuo en el altar y la prohibición de consumir sangre o grasa.',
    rashiComment: 'La orden "Tzav" denota urgencia y compromiso en deberes que implican devoción.',
    chasidutThought: 'El fuego en el altar espiritual interior nunca debe apagarse, ardiendo con entusiasmo constante.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:1-6:11', summary: 'Fuego.' }, { number: 2, name: '2ª Aliyá', verses: '6:12-7:10', summary: 'Minjá.' }, { number: 3, name: '3ª Aliyá', verses: '7:11-7:38', summary: 'Todá.' }, { number: 4, name: '4ª Aliyá', verses: '8:1-8:36', summary: 'Investidura.' }]
  },
  shemini: {
    id: 'shemini', nameEs: 'Parashat Sheminí', nameHe: 'שְׁמִינִי', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 9:1 – 11:47', haftarah: '2 Samuel 6:1 – 7:17',
    summary: 'Inauguración del Tabernáculo, muerte trágica de Nadav y Avihú, y leyes de animales kosher y no kosher.',
    halachaPoint: 'Leyes de Kashrut sobre animales terrestres, aves y peces permitidos.',
    rashiComment: 'Nadav y Avihú fallecieron por acercarse a Dios con fuego extraño no autorizado.',
    chasidutThought: 'El entusiasmo espiritual desprovisto de disciplina halájica puede ser peligroso para el alma.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '9:1-9:23', summary: 'Inauguración.' }, { number: 2, name: '2ª Aliyá', verses: '10:1-10:20', summary: 'Nadav.' }, { number: 3, name: '3ª Aliyá', verses: '11:1-11:32', summary: 'Terrestres.' }, { number: 4, name: '4ª Aliyá', verses: '11:33-11:47', summary: 'Aves.' }]
  },
  tazria: {
    id: 'tazria', nameEs: 'Parashat Tazria', nameHe: 'תַזְרִיעַ', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 12:1 – 13:59', haftarah: '2 Reyes 4:42 – 5:19',
    summary: 'Leyes de pureza tras el parto y diagnóstico de la afección espiritual y física conocida como Tzaarat.',
    halachaPoint: 'Leyes de pureza familiar y la prohibición de hablar mal (Lashon hará) asociada a la Tzaarat.',
    rashiComment: 'La Tzaarat afectaba casas, ropas y pieles como advertencia espiritual por el egoísmo.',
    chasidutThought: 'El cuidado de las palabras es fundamental para mantener la sanidad del alma y la comunidad.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '12:1-12:8', summary: 'Parto.' }, { number: 2, name: '2ª Aliyá', verses: '13:1-13:17', summary: 'Tzaarat.' }, { number: 3, name: '3ª Aliyá', verses: '13:18-13:28', summary: 'Inflamaciones.' }, { number: 4, name: '4ª Aliyá', verses: '13:29-13:59', summary: 'Ropas.' }]
  },
  metzora: {
    id: 'metzora', nameEs: 'Parashat Metzorá', nameHe: 'מְצֹרָע', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 14:1 – 15:33', haftarah: '2 Reyes 7:3 – 7:20',
    summary: 'Proceso de purificación del Metzorá, leyes de higiene y flujos corporales de pureza familiar.',
    halachaPoint: 'Leyes de pureza ritual, salud comunitaria y la santidad del hogar.',
    rashiComment: 'El pájaro purificador simboliza la humildad necesaria para curarse del orgullo.',
    chasidutThought: 'La purificación implica un renacimiento espiritual tras corregir los errores interpersonales.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '14:1-14:20', summary: 'Purificación.' }, { number: 2, name: '2ª Aliyá', verses: '14:21-14:32', summary: 'Recursos.' }, { number: 3, name: '3ª Aliyá', verses: '14:33-14:57', summary: 'Casas.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:33', summary: 'Flujos.' }]
  },
  achreimot: {
    id: 'achreimot', nameEs: 'Parashat Ajaréi Mot', nameHe: 'אַחֲרֵי מוֹת', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 16:1 – 18:30', haftarah: 'Ezequiel 22:1 – 22:19',
    summary: 'Servicio de Iom Kipur en el Templo, prohibición de consumir sangre y leyes de relaciones familiares prohibidas.',
    halachaPoint: 'Leyes de Yom Kipur, prohibiciones alimentarias estrictas y moral familiar.',
    rashiComment: 'La muerte de los hijos de Aarón se recuerda en Kipur para mostrar su expiación.',
    chasidutThought: 'Kipur eleva al ser humano al nivel espiritual de los ángeles mediante el ayuno y la introspección.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:1-16:17', summary: 'Kipur.' }, { number: 2, name: '2ª Aliyá', verses: '16:18-16:34', summary: 'Chivos.' }, { number: 3, name: '3ª Aliyá', verses: '17:1-17:16', summary: 'Sangre.' }, { number: 4, name: '4ª Aliyá', verses: '18:1-18:30', summary: 'Moral.' }]
  },
  kedoshim: {
    id: 'kedoshim', nameEs: 'Parashat Kedoshim', nameHe: 'קְדֹשִׁים', sefer: 'Vayikrá (Levítico)', reading: 'Vayikrá 19:1 – 20:27', haftarah: 'Amós 9:7 – 9:15',
    summary: 'Mandato de santidad, el precepto central "Amarás a tu prójimo como a ti mismo", leyes éticas y justicia.',
    halachaPoint: 'Ética social, prohibición de venganza, honestidad comercial y amor al prójimo.',
    rashiComment: 'La santidad se logra absteniéndose de lo permitido en exceso y elevando lo cotidiano.',
    chasidutThought: '"Amar a tu prójimo como a ti mismo" es la regla fundamental y abarcadora de toda la Torá.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '19:1-19:14', summary: 'Santidad.' }, { number: 2, name: '2ª Aliyá', verses: '19:15-19:32', summary: 'Prójimo.' }, { number: 3, name: '3ª Aliyá', verses: '19:33-20:27', summary: 'Castigos.' }]
  },
  emor: {
    id: 'emor', nameEs: 'Parashat Emor', nameHe: 'אֱמֹר', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 21:1 – 24:23', haftarah: 'Ezequiel 44:15 – 44:31',
    summary: 'Normas para los Kohanim, el calendario de las Festividades sagradas y las leyes de la Menorá.',
    halachaPoint: 'Leyes de festividades judías, prohibición de trabajar en Moed y santificación del tiempo.',
    rashiComment: 'Las festividades son proclamadas por el tribunal judío terrenal santificando el calendario.',
    chasidutThought: 'El tiempo sagrado nos permite trascender la rutina material conectando con la eternidad.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:1-21:24', summary: 'Kohanim.' }, { number: 2, name: '2ª Aliyá', verses: '22:1-22:16', summary: 'Consumo.' }, { number: 3, name: '3ª Aliyá', verses: '22:17-23:44', summary: 'Festividades.' }, { number: 4, name: '4ª Aliyá', verses: '24:1-24:23', summary: 'Menorá.' }]
  },
  behar: {
    id: 'behar', nameEs: 'Parashat Behar', nameHe: 'בְּהַר', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 25:1 – 26:2', haftarah: 'Jeremías 32:6 – 32:27',
    summary: 'Leyes del año sabático (Shmitá) para la tierra de Israel y el año de Jubileo (Yovel), prohibición de la usura.',
    halachaPoint: 'Fe en la providencia divina mediante el descanso de la tierra agrícola cada siete años.',
    rashiComment: '¿Qué relación tiene el Shmitá con el Monte Sinaí? Todas las leyes fueron entregadas allí.',
    chasidutThought: 'El descanso de la tierra enseña que el mundo pertenece al Creador y no al ego humano.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:1-25:13', summary: 'Shmitá.' }, { number: 2, name: '2ª Aliyá', verses: '25:14-25:38', summary: 'Yovel.' }, { number: 3, name: '3ª Aliyá', verses: '25:39-26:2', summary: 'Liberación.' }]
  },
  bejukotai: {
    id: 'bejukotai', nameEs: 'Parashat Bejukotai', nameHe: 'בְּחֻקֹּתַי', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 26:3 – 27:34', haftarah: 'Jeremías 16:19 – 17:14',
    summary: 'Bendiciones por cumplir la Torá, advertencias (Tojaja) por apartarse de ella y leyes de valuación de ofrendas.',
    halachaPoint: 'Cumplimiento de mitzvot y la promesa de prosperidad espiritual y material.',
    rashiComment: 'Las bendiciones prometen paz y seguridad cuando se estudia Torá con dedicación.',
    chasidutThought: 'Las dificultades descritas en la admonición son llamados celestiales para retornar a la esencia.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '26:3-26:13', summary: 'Bendiciones.' }, { number: 2, name: '2ª Aliyá', verses: '26:14-26:46', summary: 'Tojaja.' }, { number: 3, name: '3ª Aliyá', verses: '27:1-27:34', summary: 'Valuaciones.' }]
  },
  bamidbar: {
    id: 'bamidbar', nameEs: 'Parashat Bamidbar', nameHe: 'בְּמִדְבַּר', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 1:1 – 4:20', haftarah: 'Oseas 2:1 – 2:22',
    summary: 'Censo del pueblo de Israel en el desierto, distribución de las tribus alrededor del Tabernáculo y funciones de los levitas.',
    halachaPoint: 'Organización comunitaria y el valor de cada individuo contado en el censo.',
    rashiComment: 'Dios cuenta al pueblo constantemente por el profundo amor que les tiene.',
    chasidutThought: 'Cada persona ocupa un lugar irremplazable en la estructura espiritual del pueblo judío.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:54', summary: 'Censo.' }, { number: 2, name: '2ª Aliyá', verses: '2:1-2:34', summary: 'Campamento.' }, { number: 3, name: '3ª Aliyá', verses: '3:1-3:39', summary: 'Levitas.' }, { number: 4, name: '4ª Aliyá', verses: '3:40-4:20', summary: 'Kehat.' }]
  },
  nasso: {
    id: 'nasso', nameEs: 'Parashat Nasó', nameHe: 'נָשֹׂא', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 4:21 – 7:89', haftarah: 'Jueces 13:2 – 13:25',
    summary: 'Censo de clanes levitas, leyes del Nazir, la Bendición Sacerdotal y ofrendas de los príncipes tribales.',
    halachaPoint: 'La Bendición Sacerdotal diaria y la disciplina del Nazir.',
    rashiComment: 'La bendición de los Kohanim se imparte con amor incondicional hacia todo el pueblo.',
    chasidutThought: 'La bendición divina desciende sobre el pueblo cuando existe unidad y hermandad en la comunidad.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '4:21-4:49', summary: 'Clanes.' }, { number: 2, name: '2ª Aliyá', verses: '5:1-5:10', summary: 'Impuros.' }, { number: 3, name: '3ª Aliyá', verses: '5:11-6:27', summary: 'Nazir.' }, { number: 4, name: '4ª Aliyá', verses: '7:1-7:89', summary: 'Príncipes.' }]
  },
  behaalotecha: {
    id: 'behaalotecha', nameEs: 'Parashat Behaalotejá', nameHe: 'בְּהַעֲלֹתְךָ', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 8:1 – 12:16', haftarah: 'Zacarías 2:14 – 4:7',
    summary: 'Encendido de la Menorá, consagración de levitas, segundo Pésaj y las quejas del pueblo por la carne.',
    halachaPoint: 'Leyes de Pésaj Sheni y el cuidado al hablar de los demás (caso de Miriam).',
    rashiComment: 'Nunca es tarde para cumplir una mitzvá, de ahí el concepto de Pésaj Sheni.',
    chasidutThought: 'La luz de la Menorá irradia hacia afuera iluminando y transformando la oscuridad del mundo.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '8:1-8:26', summary: 'Menorá.' }, { number: 2, name: '2ª Aliyá', verses: '9:1-9:14', summary: 'Pésaj Sheni.' }, { number: 3, name: '3ª Aliyá', verses: '9:15-10:10', summary: 'Nube.' }, { number: 4, name: '4ª Aliyá', verses: '10:11-11:29', summary: 'Quejas.' }, { number: 5, name: '5ª Aliyá', verses: '11:30-12:16', summary: 'Miriam.' }]
  },
  shelach: {
    id: 'shelach', nameEs: 'Parashat Shelaj Lejá', nameHe: 'שְׁלַח-לְךָ', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 13:1 – 15:41', haftarah: 'Josué 2:1 – 2:24',
    summary: 'Envío de los doce espías, informe negativo, decreto de 40 años en el desierto y la mitzvá de los flecos (Tzitzit).',
    halachaPoint: 'Precepto de los Tzitzit y la fe en las promesas divinas sobre la Tierra de Israel.',
    rashiComment: 'Los espías pecaron al desacreditar la tierra deseada por falta de confianza.',
    chasidutThought: 'Mirar los Tzitzit nos recuerda conectar la materialidad cotidiana con los mandatos divinos.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '13:1-13:20', summary: 'Espías.' }, { number: 2, name: '2ª Aliyá', verses: '13:21-14:7', summary: 'Informe.' }, { number: 3, name: '3ª Aliyá', verses: '14:8-14:25', summary: 'Calev.' }, { number: 4, name: '4ª Aliyá', verses: '14:26-15:7', summary: 'Decreto.' }, { number: 5, name: '5ª Aliyá', verses: '15:8-15:41', summary: 'Tzitzit.' }]
  },
  korach: {
    id: 'korach', nameEs: 'Parashat Kóraj', nameHe: 'קֹרַח', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 16:1 – 18:32', haftarah: '1 Samuel 11:14 – 12:22',
    summary: 'Rebelión de Kóraj contra Moshé y Aarón, su trágico final y la floración milagrosa de la vara de Aarón.',
    halachaPoint: 'Evitar la discordia gratuita (majloket) y reconocer la autoridad legítima.',
    rashiComment: 'Kóraj cuestionó la autoridad basándose en sofismas demagógicos sobre la igualdad espiritual.',
    chasidutThought: 'La discordia gratuita destruye los cimientos espirituales y la cohesión de la comunidad.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:1-16:13', summary: 'Rebelión.' }, { number: 2, name: '2ª Aliyá', verses: '16:14-16:34', summary: 'Juicio.' }, { number: 3, name: '3ª Aliyá', verses: '16:35-17:15', summary: 'Plaga.' }, { number: 4, name: '4ª Aliyá', verses: '17:16-18:32', summary: 'Vara.' }]
  },
  chukat: {
    id: 'chukat', nameEs: 'Parashat Jukat', nameHe: 'חֻקַּת', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 19:1 – 22:1', haftarah: 'Jueces 11:1 – 11:33',
    summary: 'Leyes de la Vaca Roja, muerte de Miriam y Aarón, y el agua brotando de la roca.',
    halachaPoint: 'Leyes de pureza ritual y el concepto de decretos supraracionales (Jukim).',
    rashiComment: 'El decreto de la Vaca Roja desconcierta incluso a la sabiduría de Salomón.',
    chasidutThought: 'Purificarse de las impurezas del ego requiere un compromiso que supera el intelecto lógico.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '19:1-19:22', summary: 'Vaca.' }, { number: 2, name: '2ª Aliyá', verses: '20:1-20:13', summary: 'Agua.' }, { number: 3, name: '3ª Aliyá', verses: '20:14-20:21', summary: 'Edom.' }, { number: 4, name: '4ª Aliyá', verses: '20:22-21:9', summary: 'Aarón.' }, { number: 5, name: '5ª Aliyá', verses: '21:10-22:1', summary: 'Reyes.' }]
  },
  balak: {
    id: 'balak', nameEs: 'Parashat Balak', nameHe: 'בָּלָק', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 22:2 – 25:9', haftarah: 'Miqueas 5:6 – 6:8',
    summary: 'El rey Balak contrata al adivino Bilam para maldecir a Israel, pero este termina profiriendo bendiciones.',
    halachaPoint: 'Protección divina sobre el pueblo judío y el poder de las palabras bondadosas.',
    rashiComment: 'Bilam poseía una visión profética equivalente a la de Moshé pero enfocada en la maldad.',
    chasidutThought: 'Las maldiciones planeadas se transformaron milagrosamente en bendiciones eternas ("Ma tovu ohalécha").',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '22:2-22:12', summary: 'Balak.' }, { number: 2, name: '2ª Aliyá', verses: '22:13-22:37', summary: 'Viaje.' }, { number: 3, name: '3ª Aliyá', verses: '22:38-23:12', summary: 'Bendición.' }, { number: 4, name: '4ª Aliyá', verses: '23:13-24:13', summary: 'Profecías.' }, { number: 5, name: '5ª Aliyá', verses: '24:14-25:9', summary: 'Peor.' }]
  },
  pinchas: {
    id: 'pinchas', nameEs: 'Parashat Pinjás', nameHe: 'פִּינְחָס', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 25:10 – 30:1', haftarah: '1 Reyes 18:46 – 19:21',
    summary: 'Recompensa a Pinjás, nuevo censo, las hijas de Tzlofjad y la designación de Yehoshúa como sucesor de Moshé.',
    halachaPoint: 'Leyes de herencia familiar y liderazgo comunitario responsable.',
    rashiComment: 'Pinjás recibió el pacto de paz eterna por detener la plaga destructora.',
    chasidutThought: 'El verdadero celo por Dios se basa exclusivamente en el amor y la protección de la vida humana.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:10-26:4', summary: 'Pinjás.' }, { number: 2, name: '2ª Aliyá', verses: '26:5-26:51', summary: 'Censo.' }, { number: 3, name: '3ª Aliyá', verses: '26:52-27:23', summary: 'Herederas.' }, { number: 4, name: '4ª Aliyá', verses: '28:1-30:1', summary: 'Ofrendas.' }]
  },
  matotmasei: {
    id: 'matotmasei', nameEs: 'Parashat Matot-Masei', nameHe: 'מַטּוֹת-מַסְעֵי', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 30:2 – 36:13', haftarah: 'Jeremías 2:4 – 2:28',
    summary: 'Leyes sobre juramentos, guerra contra Madián, asignación de tierras al este del Jordán y resumen de las 42 etapas.',
    halachaPoint: 'La seriedad de la palabra empeñada y los límites geográficos de la Tierra de Israel.',
    rashiComment: 'Las 42 paradas en el desierto muestran la paciencia y guía constante de Dios.',
    chasidutThought: 'Cada etapa y tropiezo en el desierto es un paso necesario de refinamiento espiritual.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '30:2-32:42', summary: 'Votos.' }, { number: 2, name: '2ª Aliyá', verses: '33:1-33:49', summary: 'Etapas.' }, { number: 3, name: '3ª Aliyá', verses: '33:50-36:13', summary: 'Fronteras.' }]
  },
  devarim: {
    id: 'devarim', nameEs: 'Parashat Devarim', nameHe: 'דְּבָרִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 1:1 – 3:22', haftarah: 'Isaías 1:1 – 1:27',
    summary: 'Discurso de despedida de Moshé repasando los errores del pueblo en el desierto y exhortándolos a la obediencia.',
    halachaPoint: 'Crítica constructiva y memoria histórica de los errores pasados.',
    rashiComment: 'Moshé reprochó al pueblo solo al final de su vida por respeto y sabiduría pedagógica.',
    chasidutThought: 'Recordar las caídas fortalece el crecimiento espiritual y previene futuros tropiezos.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:11', summary: 'Jueces.' }, { number: 2, name: '2ª Aliyá', verses: '1:12-1:38', summary: 'Espías.' }, { number: 3, name: '3ª Aliyá', verses: '1:39-2:1', summary: 'Decreto.' }, { number: 4, name: '4ª Aliyá', verses: '2:2-2:30', summary: 'Ruta.' }, { number: 5, name: '5ª Aliyá', verses: '2:31-3:22', summary: 'Sijón.' }]
  },
  vaetjanan: {
    id: 'vaetjanan', nameEs: 'Parashat Vaetjanán', nameHe: 'וָאֶתְחַנַּן', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 3:23 – 7:11', haftarah: 'Isaías 40:1 – 40:26 (Najamu)',
    summary: 'Moshé ruega entrar a la tierra, repetición de los Diez Mandamientos y proclamación del Shemá Israel.',
    halachaPoint: 'Recitación del Shemá, colocación de Mezuzá y prohibición de idolatría.',
    rashiComment: 'Moshé suplicó quinientas quince oraciones para ingresar a la tierra prometida.',
    chasidutThought: 'El Shemá Israel es la declaración suprema de que detrás de toda la multiplicidad física opera una única voluntad divina.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '3:23-4:4', summary: 'Ruego.' }, { number: 2, name: '2ª Aliyá', verses: '4:5-4:40', summary: 'Exhortación.' }, { number: 3, name: '3ª Aliyá', verses: '4:41-4:49', summary: 'Refugio.' }, { number: 4, name: '4ª Aliyá', verses: '5:1-5:18', summary: 'Mandamientos.' }, { number: 5, name: '5ª Aliyá', verses: '5:19-6:3', summary: 'Temor.' }, { number: 6, name: '6ª Aliyá', verses: '6:4-6:25', summary: 'Shemá.' }, { number: 7, name: '7ª Aliyá', verses: '7:1-7:11', summary: 'Elección.' }]
  },
  ekev: {
    id: 'ekev', nameEs: 'Parashat Ekev', nameHe: 'עֵקֶב', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 7:12 – 11:25', haftarah: 'Isaías 49:14 – 51:3',
    summary: 'Promesas de bendición al cumplir los preceptos, advertencia contra el orgullo y recordatorio del maná.',
    halachaPoint: 'Bendición después de comer (Birkat Hamazón) y gratitud a Dios.',
    rashiComment: 'Ekev se refiere a los preceptos que las personas suelen menospreciar por considerarlos menores.',
    chasidutThought: 'La humildad es la llave maestra para recibir y canalizar la abundancia espiritual.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '7:12-8:10', summary: 'Bendiciones.' }, { number: 2, name: '2ª Aliyá', verses: '8:11-9:3', summary: 'Orgullo.' }, { number: 3, name: '3ª Aliyá', verses: '9:4-10:11', summary: 'Tablas.' }, { number: 4, name: '4ª Aliyá', verses: '10:12-11:9', summary: 'Exigencia.' }, { number: 5, name: '5ª Aliyá', verses: '11:10-11:25', summary: 'Lluvias.' }]
  },
  reeh: {
    id: 'reeh', nameEs: 'Parashat Reé', nameHe: 'רְאֵה', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 11:26 – 16:17', haftarah: 'Isaías 54:11 – 55:5',
    summary: 'Bendición y maldición en el monte Gurizim y Eval, leyes de caridad y calendario de festividades de peregrinaje.',
    halachaPoint: 'Leyes de Tzedaká, caridad con los pobres y alimentación kosher.',
    rashiComment: 'Reé ("mira") invita a tomar conciencia visual y espiritual de las elecciones de vida.',
    chasidutThought: 'Dar caridad con alegría transforma profundamente el corazón tanto del dador como del receptor.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '11:26-12:10', summary: 'Culto.' }, { number: 2, name: '2ª Aliyá', verses: '12:11-13:19', summary: 'Profetas.' }, { number: 3, name: '3ª Aliyá', verses: '14:1-14:29', summary: 'Kashrut.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:23', summary: 'Deudas.' }, { number: 5, name: '5ª Aliyá', verses: '16:1-16:17', summary: 'Fiestas.' }]
  },
  shoftim: {
    id: 'shoftim', nameEs: 'Parashat Shoftim', nameHe: 'שֹׁפְטִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 16:18 – 21:9', haftarah: 'Isaías 51:12 – 52:12',
    summary: 'Establecimiento de tribunales justos, leyes sobre reyes, profetas, ciudades de refugio y normas de guerra.',
    halachaPoint: 'Búsqueda de la justicia imparcial y prohibición de cortar árboles frutales en guerra.',
    rashiComment: 'Justicia, justicia perseguirás: nombra jueces íntegros y rectos.',
    chasidutThought: 'La justicia terrenal refleja la rectitud, el equilibrio y la armonía del orden divino.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:18-17:13', summary: 'Jueces.' }, { number: 2, name: '2ª Aliyá', verses: '17:14-18:5', summary: 'Rey.' }, { number: 3, name: '3ª Aliyá', verses: '18:6-18:22', summary: 'Profetas.' }, { number: 4, name: '4ª Aliyá', verses: '19:1-19:13', summary: 'Refugio.' }, { number: 5, name: '5ª Aliyá', verses: '19:14-20:9', summary: 'Guerra.' }, { number: 6, name: '6ª Aliyá', verses: '20:10-21:9', summary: 'Eglá.' }]
  },
  kiteitzei: {
    id: 'kiteitzei', nameEs: 'Parashat Ki Tetzei', nameHe: 'כִּי-תֵצֵא', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 21:10 – 25:19', haftarah: 'Isaías 54:1 – 54:10',
    summary: 'Amplio código de leyes morales, familiares y sociales, respeto a los animales y memoria de Amalek.',
    halachaPoint: 'Leyes éticas cotidianas, honestidad en el comercio y protección al prójimo.',
    rashiComment: 'Cada mandamiento refleja una profunda sensibilidad hacia la dignidad de toda persona.',
    chasidutThought: 'Los detalles de la vida diaria son el escenario principal para revelar la santidad divina.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:10-22:7', summary: 'Derechos.' }, { number: 2, name: '2ª Aliyá', verses: '22:8-23:7', summary: 'Seguridad.' }, { number: 3, name: '3ª Aliyá', verses: '23:8-24:4', summary: 'Higiene.' }, { number: 4, name: '4ª Aliyá', verses: '24:5-24:22', summary: 'Trabajador.' }, { number: 5, name: '5ª Aliyá', verses: '25:1-25:19', summary: 'Amalek.' }]
  },
  kitavo: {
    id: 'kitavo', nameEs: 'Parashat Ki Tavo', nameHe: 'כִּי-תָבוֹא', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 26:1 – 29:8', haftarah: 'Isaías 60:1 – 60:22',
    summary: 'Presentación de las primicias, entrega de diezmos y la ceremonia de bendiciones y maldiciones en el monte Ebal.',
    halachaPoint: 'Gratitud por los frutos de la tierra y fidelidad al pacto con Dios.',
    rashiComment: 'Servir a Dios con alegría es la clave fundamental para la plenitud espiritual.',
    chasidutThought: 'Las primicias expresan que el primer y mejor esfuerzo de la vida debe dedicarse a lo sagrado.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '26:1-26:11', summary: 'Primicias.' }, { number: 2, name: '2ª Aliyá', verses: '26:12-26:19', summary: 'Diezmos.' }, { number: 3, name: '3ª Aliyá', verses: '27:1-27:26', summary: 'Ebal.' }, { number: 4, name: '4ª Aliyá', verses: '28:1-28:69', summary: 'Bendiciones.' }, { number: 5, name: '5ª Aliyá', verses: '29:1-29:8', summary: 'Pacto.' }]
  },
  nitzavim: {
    id: 'nitzavim', nameEs: 'Parashat Nitzavim', nameHe: 'נִצָּבִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 29:9 – 30:20', haftarah: 'Isaías 61:10 – 63:9',
    summary: 'Unidad de todo el pueblo frente al pacto divino, la promesa del retorno (Tshuvá) y la accesibilidad de la Torá.',
    halachaPoint: 'El poder del arrepentimiento sincero (Tshuvá) y la cercanía de la palabra divina.',
    rashiComment: '"La Torá no está en el cielo", sino en tu boca y en tu corazón para cumplirla.',
    chasidutThought: 'Todo ser humano tiene asegurada la capacidad inalienable de retornar a su raíz espiritual.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '29:9-29:14', summary: 'Unidos.' }, { number: 2, name: '2ª Aliyá', verses: '29:15-29:28', summary: 'Idolatría.' }, { number: 3, name: '3ª Aliyá', verses: '30:1-30:10', summary: 'Tshuvá.' }, { number: 4, name: '4ª Aliyá', verses: '30:11-30:20', summary: 'Elección.' }]
  },
  vayeilech: {
    id: 'vayeilech', nameEs: 'Parashat Vayelej', nameHe: 'וַיֵּלֶךְ', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 31:1 – 31:30', haftarah: 'Oseas 14:2 – 14:10; Miqueas 7:18 – 7:20',
    summary: 'Moshé transfiere el liderazgo a Yehoshúa, la mitzvá de escribir un Séfer Torá personal y la lectura pública (Hakhel).',
    halachaPoint: 'Obligación de escribir un rollo de Torá y la unidad nacional en torno al texto sagrado.',
    rashiComment: 'Escribir una letra en la Torá se considera como haber escrito toda la obra.',
    chasidutThought: 'La Torá pertenece a cada individuo de manera directa, íntima y transformadora.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '31:1-31:6', summary: 'Liderazgo.' }, { number: 2, name: '2ª Aliyá', verses: '31:7-31:13', summary: 'Hakhel.' }, { number: 3, name: '3ª Aliyá', verses: '31:14-31:30', summary: 'Cántico.' }]
  },
  haazinu: {
    id: 'haazinu', nameEs: 'Parashat Haazinu', nameHe: 'הַאֲזִינוּ', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 32:1 – 32:52', haftarah: '2 Samuel 22:1 – 22:51',
    summary: 'El célebre Cántico poético de Moshé que repasa la historia de fidelidad e ingratitud de Israel frente a la protección divina.',
    halachaPoint: 'Reconocimiento de la justicia divina y memoria histórica.',
    rashiComment: 'El cántico sirve como testigo eterno y recordatorio de la relación entre Dios y Su pueblo.',
    chasidutThought: 'La poesía conecta las profundidades del alma con la eternidad inmutable de la Torá.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '32:1-32:12', summary: 'Cántico.' }, { number: 2, name: '2ª Aliyá', verses: '32:13-32:18', summary: 'Prosperidad.' }, { number: 3, name: '3ª Aliyá', verses: '32:19-32:28', summary: 'Destierro.' }, { number: 4, name: '4ª Aliyá', verses: '32:29-32:39', summary: 'Consolación.' }, { number: 5, name: '5ª Aliyá', verses: '32:40-32:52', summary: 'Nebo.' }]
  },
  vezothaberakhah: {
    id: 'vezothaberakhah', nameEs: 'Parashat Vezot HaBerajá', nameHe: 'וְזֹאת הַבְּרָכָה', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 33:1 – 34:12', haftarah: 'Josué 1:1 – 1:18',
    summary: 'Las últimas bendiciones de Moshé a las tribus de Israel antes de su fallecimiento en el monte Nebo, cerrando el ciclo.',
    halachaPoint: 'La bendición a las tribus y la culminación alegre del estudio de la Torá (Simjat Torá).',
    rashiComment: 'Moshé bendijo a cada tribu con características propias resaltando su misión singular.',
    chasidutThought: 'Al finalizar la Torá la reiniciamos inmediatamente, simbolizando que el estudio divino nunca termina.',
    jasidicLessons: [],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '33:1-33:7', summary: 'General.' }, { number: 2, name: '2ª Aliyá', verses: '33:8-33:12', summary: 'Leví.' }, { number: 3, name: '3ª Aliyá', verses: '33:13-33:17', summary: 'Yosef.' }, { number: 4, name: '4ª Aliyá', verses: '33:18-33:29', summary: 'Tribus.' }, { number: 5, name: '5ª Aliyá', verses: '34:1-34:12', summary: 'Muerte.' }]
  }
};

interface ParashaTabProps {
  onAskAboutParasha: (questionText: string) => void;
}

export function ParashaTab({ onAskAboutParasha }: ParashaTabProps) {
  const { i18n } = useTranslation();
  const [selectedParashaKey, setSelectedParashaKey] = useState<string>(() => getCurrentParashaKey());
  const [activeSubTab, setActiveSubTab] = useState<'summary' | 'aliyot' | 'rashi' | 'jasidut'>('summary');

  const parasha = PARASHOT_DATABASE[selectedParashaKey] || PARASHOT_DATABASE['bereshit'];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      {/* Cabecera Principal de la Parashá */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-slate-900 border border-amber-500/30 shadow-xl text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Scroll className="w-4 h-4" />
              <span>{cleanText(parasha.sefer)}</span>
              <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                ✨ Parashá de esta semana
              </span>
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

          {/* Selector Completo con las 54 Parashot */}
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-amber-500/40 space-y-1.5 shrink-0">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Seleccionar Parashá:
            </label>
            <select
              value={selectedParashaKey}
              onChange={(e) => setSelectedParashaKey(e.target.value)}
              className="w-full bg-slate-800 text-amber-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 border border-amber-500/40 focus:outline-none focus:border-amber-400 cursor-pointer max-w-[260px]"
            >
              <optgroup label="Sefer Bereshit (Génesis)">
                <option value="bereshit">Bereshit (בראשית)</option>
                <option value="noaj">Noaj (נח)</option>
                <option value="lejlecha">Lej Lecha (לך לך)</option>
                <option value="vayeira">Vayeira (וירא)</option>
                <option value="chayeisarah">Hayé Sara (חיי שרה)</option>
                <option value="toldot">Toldot (תולדות)</option>
                <option value="vayetze">Vayetze (ויצא)</option>
                <option value="vayishlach">Vayishlach (וישלח)</option>
                <option value="vayeshev">Vyeshev (וישב)</option>
                <option value="miketz">Miketz (מקץ)</option>
                <option value="vayigash">Vayigash (ויגש)</option>
                <option value="vayechi">Vayejí (ויחי)</option>
              </optgroup>
              <optgroup label="Sefer Shemot (Éxodo)">
                <option value="shemot">Shemot (שמות)</option>
                <option value="vaera">Vaerá (וארא)</option>
                <option value="bo">Bo (בא)</option>
                <option value="beshalach">Beshalaj (בשלח)</option>
                <option value="yitro">Yitró (יתרו)</option>
                <option value="mishpatim">Mishpatim (משפטים)</option>
                <option value="terumah">Terumá (תרומה)</option>
                <option value="tetzaveh">Tetzavé (תצווה)</option>
                <option value="kitisa">Ki Tisá (כי תשא)</option>
                <option value="vayakhel">Vayakhel (ויקהל)</option>
                <option value="pekudei">Pekudei (פקודי)</option>
              </optgroup>
              <optgroup label="Sefer Vayikrá (Levítico)">
                <option value="vayikra">Vayikrá (ויקרא)</option>
                <option value="tzav">Tzav (צו)</option>
                <option value="shemini">Sheminí (שמיני)</option>
                <option value="tazria">Tazria (תזריע)</option>
                <option value="metzora">Metzorá (מצרע)</option>
                <option value="achreimot">Ajaréi Mot (אחري מות)</option>
                <option value="kedoshim">Kedoshim (קדושים)</option>
                <option value="emor">Emor (אמור)</option>
                <option value="behar">Behar (בהר)</option>
                <option value="bejukotai">Bejukotai (בחוקתי)</option>
              </optgroup>
              <optgroup label="Sefer Bamidbar (Números)">
                <option value="bamidbar">Bamidbar (במדבר)</option>
                <option value="nasso">Nasó (נשא)</option>
                <option value="behaalotecha">Behaalotejá (בהעלתך)</option>
                <option value="shelach">Shelaj Lejá (שלח לך)</option>
                <option value="korach">Kóraj (קרח)</option>
                <option value="chukat">Jukat (חקת)</option>
                <option value="balak">Balak (בלק)</option>
                <option value="pinchas">Pinjás (פינחס)</option>
                <option value="matotmasei">Matot-Masei (מטות-מסעי)</option>
              </optgroup>
              <optgroup label="Sefer Devarim (Deuteronomio)">
                <option value="devarim">Devarim (דברים)</option>
                <option value="vaetjanan">Vaetjanán (ואתחנן)</option>
                <option value="ekev">Ekev (עקב)</option>
                <option value="reeh">Reé (ראה)</option>
                <option value="shoftim">Shoftim (שופטים)</option>
                <option value="kiteitzei">Ki Tetzei (כי תצא)</option>
                <option value="kitavo">Ki Tavo (כי תבוא)</option>
                <option value="nitzavim">Nitzavim (נצבים)</option>
                <option value="vayeilech">Vayelej (וילך)</option>
                <option value="haazinu">Haazinu (האזינו)</option>
                <option value="vezothaberakhah">Vezot HaBerajá (וזאת הברכה)</option>
              </optgroup>
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

        {/* SUBPESTAÑA 2: 7 Aliyot */}
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

        {/* SUBPESTAÑA 4: Dimensión Espiritual y Jasídica (Únicamente cabecera y pensamiento central) */}
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
                  <p className="text-xs text-slate-500">Perspectiva jasídica profunda específica de esta Parashá</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/10 border border-amber-500/30 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                  Enseñanza Jasídica Central:
                </span>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                  {cleanText(parasha.chasidutThought)}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                <button
                  onClick={() => onAskAboutParasha(`Explícame con mayor profundidad la dimensión jasídica central de ${parasha.nameEs}.`)}
                  className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consultar al Rabino sobre esta enseñanza</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParashaTab;