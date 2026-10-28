/**
 * ============================================================================
 * COMPONENTE: ParashaTab.tsx
 * Pestaña completa con las 54 Parashot de la Torá y sin etiquetas de citas
 * ============================================================================
 */

import React, { useState } from 'react';
import { Scroll, BookOpen, Flame, Sparkles, MessageSquare, ChevronRight, Layers } from 'lucide-react';
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

// Función auxiliar simple y a prueba de errores para limpiar texto
const cleanText = (text: string): string => {
  if (!text) return '';
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

// Base de datos completa con las 54 Parashot de la Torá
const PARASHOT_DATABASE: Record<string, ParashaData> = {
  // SEFER BERESHIT
  bereshit: { id: 'bereshit', nameEs: 'Parashat Bereshit', nameHe: 'בְּרֵאשִׁית', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 1:1 – 6:8', haftarah: 'Isaías 42:5 – 43:10', summary: 'La Creación del universo en seis días, el Shabat como coronación, la formación del hombre y la mujer en el Gan Edén, la prueba del fruto prohibido y los orígenes de la humanidad.', halachaPoint: 'Santidad del Shabat y responsabilidad ética en el cuidado del mundo.', rashiComment: 'La Torá comienza con la Creación para demostrar el derecho soberano de Dios sobre toda la tierra.', chasidutThought: 'El mundo entero es una morada potencial para lo Divino (Dira Betajtonim).', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-2:3', summary: 'Seis días de la Creación y Shabat.' }, { number: 2, name: '2ª Aliyá', verses: '2:4-2:19', summary: 'Formación de Adam.' }, { number: 3, name: '3ª Aliyá', verses: '2:20-3:21', summary: 'Creación de Javá y el fruto prohibido.' }, { number: 4, name: '4ª Aliyá', verses: '3:22-4:18', summary: 'Expulsión y Caín y Abel.' }, { number: 5, name: '5ª Aliyá', verses: '4:19-4:26', summary: 'Descendencia de Caín.' }, { number: 6, name: '6ª Aliyá', verses: '5:1-5:24', summary: 'Genealogía hasta Janoj.' }, { number: 7, name: '7ª Aliyá', verses: '5:25-6:8', summary: 'Generaciones hasta Noaj.' }] },
  noaj: { id: 'noaj', nameEs: 'Parashat Noaj', nameHe: 'נֹחַ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 6:9 – 11:32', haftarah: 'Isaías 54:1 – 55:5', summary: 'El Diluvio universal, la construcción del Arca, el pacto del arco iris, la torre de Babel y las generaciones de Teraj.', halachaPoint: 'Las siete leyes de los hijos de Noaj (Noajidas) y la preservación de la vida.', rashiComment: 'Noaj caminó con Dios, pero necesitó el apoyo del Arca debido a su fe imperfecta comparada con Abraham.', chasidutThought: 'El Arca (Teivá) representa las palabras de la Torá y el rezo que resguardan el alma en medio de las inundaciones del mundo.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:9-6:22', summary: 'Noaj y el mandato del Arca.' }, { number: 2, name: '2ª Aliyá', verses: '7:1-7:16', summary: 'Entrada al Arca.' }, { number: 3, name: '3ª Aliyá', verses: '7:17-8:14', summary: 'El Diluvio y descenso de las aguas.' }, { number: 4, name: '4ª Aliyá', verses: '8:15-9:7', summary: 'Salida del Arca y mandatos universales.' }, { number: 5, name: '5ª Aliyá', verses: '9:8-9:17', summary: 'El pacto del arco iris.' }, { number: 6, name: '6ª Aliyá', verses: '9:18-10:32', summary: 'Hijos de Noaj y naciones.' }, { number: 7, name: '7ª Aliyá', verses: '11:1-11:32', summary: 'La Torre de Babel y genealogía.' }] },
  lejlecha: { id: 'lejlecha', nameEs: 'Parashat Lej Lecha', nameHe: 'לֶךְ-לְךָ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 12:1 – 17:27', haftarah: 'Isaías 40:27 – 41:16', summary: 'El llamado divino a Abraham para dejar su tierra, su viaje a Canaán, el pacto entre las partes y el establecimiento del Brit Milá.', halachaPoint: 'El precepto del Brit Milá (circuncisión) en el octavo día y la hospitalidad con los invitados (Hajnasat Orjim).', rashiComment: 'Lej Lecha significa "ve hacia ti mismo", un viaje de descubrimiento interior.', chasidutThought: 'Cada persona debe trascender sus limitaciones psicológicas y geográficas internas ("su tierra y su parentela").', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '12:1-12:13', summary: 'Llamado a Abraham y descenso a Egipto.' }, { number: 2, name: '2ª Aliyá', verses: '12:14-13:18', summary: 'Separación de Lot y promesa de la tierra.' }, { number: 3, name: '3ª Aliyá', verses: '14:1-14:24', summary: 'Guerra de reyes y rescate de Lot.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:21', summary: 'Pacto entre las partes (Brit Bein HaBetarim).' }, { number: 5, name: '5ª Aliyá', verses: '16:1-16:16', summary: 'Nacimiento de Ishmael.' }, { number: 6, name: '6ª Aliyá', verses: '17:1-17:14', summary: 'El pacto de la circuncisión.' }, { number: 7, name: '7ª Aliyá', verses: '17:15-17:27', summary: 'Circuncisión de Abraham e Ishmael.' }] },
  vayeira: { id: 'vayeira', nameEs: 'Parashat Vayeira', nameHe: 'וַיֵּרָא', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 18:1 – 22:24', haftarah: '2 Reyes 4:1 – 4:37', summary: 'La visita de los ángeles a Abraham, la destrucción de Sodoma, el nacimiento de Itzjak y la prueba de la Akedá (ligadura de Itzjak).', halachaPoint: 'Leyes de hospitalidad, compasión por el prójimo y entrega absoluta a la voluntad divina.', rashiComment: 'Abraham intercedió por Sodoma demostrando que el justo busca el mérito y la clemencia para la humanidad.', chasidutThought: 'La Akedá revela que el vínculo con Dios trasciende la lógica humana y se arraiga en la esencia del alma.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '18:1-18:33', summary: 'Visita de los ángeles y súplica por Sodoma.' }, { number: 2, name: '2ª Aliyá', verses: '19:1-19:20', summary: 'Lote en Sodoma y huida.' }, { number: 3, name: '3ª Aliyá', verses: '19:21-20:18', summary: 'Destrucción de Sodoma y episodio en Gerar.' }, { number: 4, name: '4ª Aliyá', verses: '21:1-21:21', summary: 'Nacimiento de Itzjak y expulsión de Hagar.' }, { number: 5, name: '5ª Aliyá', verses: '21:22-21:34', summary: 'Pacto con Avimelej.' }, { number: 6, name: '6ª Aliyá', verses: '22:1-22:19', summary: 'La prueba de la Akedá.' }, { number: 7, name: '7ª Aliyá', verses: '22:20-22:24', summary: 'Descendencia de Najor.' }] },
  chayeisarah: { id: 'chayeisarah', nameEs: 'Parashat Hayé Sara', nameHe: 'חַיֵּי שָׂרָה', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 23:1 – 25:18', haftarah: '1 Reyes 1:1 – 1:31', summary: 'Fallecimiento de Sara, compra de la Cueva de Majpelá, y la misión del siervo Eliézer para encontrar esposa para Itzjak (Rivká).', halachaPoint: 'Honra a los difuntos, adquisición legal de la tierra de Israel y la importancia de los valores en el matrimonio.', rashiComment: 'Sara falleció al enterarse de la Akedá de su hijo, reflejando la profundidad del vínculo materno.', chasidutThought: 'La búsqueda de Rivká por Eliézer simboliza el descenso del alma al mundo material para rescatar las chispas divinas.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '23:1-23:20', summary: 'Muerte de Sara y compra de Majpelá.' }, { number: 2, name: '2ª Aliyá', verses: '24:1-24:9', summary: 'Juramento de Eliézer.' }, { number: 3, name: '3ª Aliyá', verses: '24:10-24:26', summary: 'Llegada de Eliézer a Aram Naharaim.' }, { number: 4, name: '4ª Aliyá', verses: '24:27-24:52', summary: 'Encuentro con Rivká en el pozo.' }, { number: 5, name: '5ª Aliyá', verses: '24:53-24:67', summary: 'Regreso y matrimonio con Itzjak.' }, { number: 6, name: '6ª Aliyá', verses: '25:1-25:11', summary: 'Matrimonio con Keturá y muerte de Abraham.' }, { number: 7, name: '7ª Aliyá', verses: '25:12-25:18', summary: 'Descendencia de Ishmael.' }] },
  toldot: { id: 'toldot', nameEs: 'Parashat Toldot', nameHe: 'תּוֹלְדֹת', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 25:19 – 28:9', haftarah: 'Malaquías 1:1 – 2:7', summary: 'Nacimiento de los mellizos Yaakov y Esav, la venta de la primogenitura por un plato de lentejas, y las bendiciones que recibe Yaakov.', halachaPoint: 'El valor de la primogenitura espiritual frente al materialismo inmediato.', rashiComment: 'Esav aparentaba rectitud haciendo preguntas capciosas sobre la halajá del diezmo.', chasidutThought: 'Yaakov y Esav representan las dos fuerzas en el interior del ser humano: lo espiritual y lo terrenal.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:19-25:34', summary: 'Nacimiento de Yaakov y Esav; lentejas.' }, { number: 2, name: '2ª Aliyá', verses: '26:1-26:12', summary: 'Itzjak en Guerar.' }, { number: 3, name: '3ª Aliyá', verses: '26:13-26:22', summary: 'Conflictos por los pozos de agua.' }, { number: 4, name: '4ª Aliyá', verses: '26:23-26:35', summary: 'Pacto con Avimelej.' }, { number: 5, name: '5ª Aliyá', verses: '27:1-27:27', summary: 'Bendiciones de Yaakov disfrazado.' }, { number: 6, name: '6ª Aliyá', verses: '27:28-28:4', summary: 'Reacción de Esav y partida de Yaakov.' }, { number: 7, name: '7ª Aliyá', verses: '28:5-28:9', summary: 'Matrimonio de Esav con Mahalat.' }] },
  vayetze: { id: 'vayetze', nameEs: 'Parashat Vayetze', nameHe: 'וֵיצֵא', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 28:10 – 32:3', haftarah: 'Oseas 12:13 – 14:10', summary: 'El sueño de la escalera de Yaakov, su llegada a Jarán, su matrimonio con Rajel y Leá, y su partida con su familia confrontando a Labán.', halachaPoint: 'Institución del rezo nocturno (Arvit) y el cumplimiento íntegro de los compromisos.', rashiComment: 'Las piedras que se unieron bajo la cabeza de Yaakov simbolizan la unificación del pueblo judío.', chasidutThought: 'Nuestros pies están en la tierra pero nuestra cabeza puede tocar los cielos mediante la intención recta.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '28:10-28:22', summary: 'Sueño de la escalera.' }, { number: 2, name: '2ª Aliyá', verses: '29:1-29:17', summary: 'Encuentro con Rajel en el pozo.' }, { number: 3, name: '3ª Aliyá', verses: '29:18-30:13', summary: 'Matrimonios y nacimiento de los hijos.' }, { number: 4, name: '4ª Aliyá', verses: '30:14-30:27', summary: 'Nacimiento de Yosef.' }, { number: 5, name: '5ª Aliyá', verses: '30:28-31:16', summary: 'Acuerdo con Labán y prosperidad.' }, { number: 6, name: '6ª Aliyá', verses: '31:17-31:54', summary: 'Huida y pacto con Labán en Galed.' }, { number: 7, name: '7ª Aliyá', verses: '32:1-32:3', summary: 'Ángeles de Dios en Majanaim.' }] },
  vayishlach: { id: 'vayishlach', nameEs: 'Parashat Vayishlach', nameHe: 'וַיִּשְׁלַח', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 32:4 – 36:43', haftarah: 'Oseas 11:7 – 12:12', summary: 'Preparativos de Yaakov para encontrarse con Esav, su lucha nocturna con el ángel, la reconciliación y episodios trágicos en Shejem.', halachaPoint: 'Estrategia ante el peligro, diplomacia y el cuidado de las leyes dietéticas (como el guislo de la cadera).', rashiComment: 'La lucha con el ángel representa la lucha perpetua de Israel contra las fuerzas espirituales opositoras.', chasidutThought: 'Al vencer al ángel de Esav, Yaakov transforma la oscuridad en luz y recibe el nombre de Israel.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '32:4-32:33', summary: 'Mensajeros a Esav y lucha con el ángel.' }, { number: 2, name: '2ª Aliyá', verses: '33:1-33:20', summary: 'Reconciliación con Esav.' }, { number: 3, name: '3ª Aliyá', verses: '34:1-34:31', summary: 'Incidente de Diná en Shejem.' }, { number: 4, name: '4ª Aliyá', verses: '35:1-35:11', summary: 'Retorno a Beit El y cambio de nombre.' }, { number: 5, name: '5ª Aliyá', verses: '35:12-35:29', summary: 'Nacimiento de Binyamin y muerte de Rajel.' }, { number: 6, name: '6ª Aliyá', verses: '36:1-36:19', summary: 'Descendencia de Esav.' }, { number: 7, name: '7ª Aliyá', verses: '36:20-36:43', summary: 'Duques de Edom.' }] },
  vayeshev: { id: 'vayeshev', nameEs: 'Parashat Vyeshev', nameHe: 'וְיֵשֶׁב', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 37:1 – 40:23', haftarah: 'Amós 2:6 – 3:8', summary: 'Los sueños de Yosef, su venta como esclavo por sus hermanos a Egipto, la historia de Tamar y Yehudah, y Yosef en la prisión interpretando sueños.', halachaPoint: 'La prohibición de la maledicencia (lashon hará) y el mantenimiento de la integridad moral en la adversidad.', rashiComment: 'Los hermanos vendieron a Yosef motivados por celos inspirados en los sueños de grandeza.', chasidutThought: 'Las pruebas más difíciles de la vida ocultan las semillas de nuestra salvación futura.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '37:1-37:11', summary: 'Yosef y sus sueños.' }, { number: 2, name: '2ª Aliyá', verses: '37:12-37:36', summary: 'Venta de Yosef.' }, { number: 3, name: '3ª Aliyá', verses: '38:1-38:30', summary: 'Yehudah y Tamar.' }, { number: 4, name: '4ª Aliyá', verses: '39:1-39:6', summary: 'Yosef en casa de Potifar.' }, { number: 5, name: '5ª Aliyá', verses: '39:7-39:23', summary: 'Prisión de Yosef.' }, { number: 6, name: '6ª Aliyá', verses: '40:1-40:13', summary: 'Sueños del copero y el panadero.' }, { number: 7, name: '7ª Aliyá', verses: '40:14-40:23', summary: 'Interpretación y olvido del copero.' }] },
  miketz: { id: 'miketz', nameEs: 'Parashat Miketz', nameHe: 'מִקֵּץ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 41:1 – 44:17', haftarah: '1 Reyes 3:15 – 4:1', summary: 'Yosef interpreta los sueños del Faraón, asciende a virrey de Egipto, y recibe a sus hermanos que acuden a comprar alimentos sin reconocerlo.', halachaPoint: 'Leyes de festividades (Janucá suele coincidir con esta parashá) y la responsabilidad fraternal.', rashiComment: 'El ascenso de Yosef ocurrió en una sola noche, demostrando que la salvación divina llega en un instante.', chasidutThought: 'Yosef simboliza la capacidad de descender al exilio material sin perder la identidad espiritual.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '41:1-41:14', summary: 'Sueños del Faraón.' }, { number: 2, name: '2ª Aliyá', verses: '41:15-41:38', summary: 'Interpretación de Yosef.' }, { number: 3, name: '3ª Aliyá', verses: '41:39-41:52', summary: 'Ascenso a virrey.' }, { number: 4, name: '4ª Aliyá', verses: '41:53-42:18', summary: 'Primer viaje de los hermanos.' }, { number: 5, name: '5ª Aliyá', verses: '42:19-43:15', summary: 'Retorno con Binyamin.' }, { number: 6, name: '6ª Aliyá', verses: '43:16-44:17', summary: 'La copa de plata en el saco de Binyamin.' }, { number: 7, name: '7ª Aliyá', verses: '44:18-44:18', summary: 'Defensa de Yehudah.' }] },
  vayigash: { id: 'vayigash', nameEs: 'Parashat Vayigash', nameHe: 'וַיִּגַּשׁ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 44:18 – 47:27', haftarah: 'Ezequiel 37:15 – 37:28', summary: 'Yehudah se aproxima a Yosef, quien finalmente se revela a sus hermanos, el reencuentro con Yaakov en Egipto y el asentamiento en Goshen.', halachaPoint: 'El valor de la paz familiar y la gratitud hacia quienes nos sustentan.', rashiComment: 'Al revelarse, Yosef disipó la vergüenza y el miedo de sus hermanos con palabras de consuelo.', chasidutThought: 'La unión entre Yosef y Yehudah anticipa la futura unificación de todo el pueblo de Israel.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '44:18-45:7', summary: 'Yehudah interpela a Yosef y revelación.' }, { number: 2, name: '2ª Aliyá', verses: '45:8-45:27', summary: 'Envío por Yaakov.' }, { number: 3, name: '3ª Aliyá', verses: '45:28-46:27', summary: 'Migración a Egipto.' }, { number: 4, name: '4ª Aliyá', verses: '46:28-47:10', summary: 'Reencuentro con Yaakov.' }, { number: 5, name: '5ª Aliyá', verses: '47:11-47:31', summary: 'Gestión económica de Yosef.' }] },
  vayechi: { id: 'vayechi', nameEs: 'Parashat Vayejí', nameHe: 'וַיְחִי', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 47:28 – 50:26', haftarah: '1 Reyes 2:1 – 2:12', summary: 'Últimos días de Yaakov en Egipto, bendición a los hijos de Yosef (Efraim y Menashe), bendiciones a las doce tribus y fallecimiento de Yaakov y Yosef.', halachaPoint: 'Testamento ético, bendición a los hijos y la fe en la redención futura.', rashiComment: 'Antes de morir, Yaakov quiso revelar el fin de los tiempos pero la presencia divina se apartó de él.', chasidutThought: 'La vida de Yaakov en Egipto demuestra que la luz espiritual puede iluminar los rincones más densos.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '47:28-48:22', summary: 'Juramento y bendición a Efraim y Menashe.' }, { number: 2, name: '2ª Aliyá', verses: '49:1-49:18', summary: 'Bendiciones a las tribus (Reuven, Shimon, Leví, Yehudah).' }, { number: 3, name: '3ª Aliyá', verses: '49:19-49:26', summary: 'Bendiciones continuadas.' }, { number: 4, name: '4ª Aliyá', verses: '49:27-50:20', summary: 'Muerte de Yaakov y sepultura en Majpelá.' }, { number: 5, name: '5ª Aliyá', verses: '50:21-50:26', summary: 'Muerte de Yosef.' }] },

  // SEFER SHEMOT
  shemot: { id: 'shemot', nameEs: 'Parashat Shemot', nameHe: 'שְׁמוֹת', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 1:1 – 6:1', haftarah: 'Isaías 27:6 – 28:13', summary: 'Esclavitud en Egipto, nacimiento y salvación de Moshé, la zarza ardiente, y el inicio de la misión libertadora.', halachaPoint: 'Respeto a los ancianos, valentía ante la injusticia y el valor de la libertad.', rashiComment: 'Las parteras hebreas temieron a Dios y desobedecieron al Faraón arriesgando sus vidas.', chasidutThought: 'La zarza ardiente que no se consume enseña que Dios está presente incluso en medio del sufrimiento del exilio.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:17', summary: 'Esclavitud y decreto del Faraón.' }, { number: 2, name: '2ª Aliyá', verses: '1:18-2:10', summary: 'Nacimiento de Moshé y rescate en el Nilo.' }, { number: 3, name: '3ª Aliyá', verses: '2:11-2:25', summary: 'Moshé huye a Midián.' }, { number: 4, name: '4ª Aliyá', verses: '3:1-3:15', summary: 'La zarza ardiente.' }, { number: 5, name: '5ª Aliyá', verses: '3:16-4:17', summary: 'Señales dadas a Moshé.' }, { number: 6, name: '6ª Aliyá', verses: '4:18-5:9', summary: 'Retorno a Egipto y endurecimiento.' }, { number: 7, name: '7ª Aliyá', verses: '5:10-6:1', summary: 'Queja del pueblo y promesa divina.' }] },
  vaera: { id: 'vaera', nameEs: 'Parashat Vaerá', nameHe: 'וָאֵרָא', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 6:2 – 9:35', haftarah: 'Ezequiel 28:25 – 29:21', summary: 'Las cuatro expresiones de redención, las primeras siete plagas enviadas sobre Egipto.', halachaPoint: 'Las leyes de las plagas demuestran la soberanía absoluta del Creador sobre la naturaleza.', rashiComment: 'Dios se reveló a los patriarcas con el nombre Shakai, pero a Moshé con el Inefable.', chasidutThought: 'Cada plaga desmanteló una falsa deidad material de la cultura egipcia.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:2-6:13', summary: 'Promesa de redención.' }, { number: 2, name: '2ª Aliyá', verses: '6:14-6:28', summary: 'Genealogía.' }, { number: 3, name: '3ª Aliyá', verses: '6:29-7:7', summary: 'Misión ante Faraón.' }, { number: 4, name: '4ª Aliyá', verses: '7:8-8:6', summary: 'Plagas de sangre y ranas.' }, { number: 5, name: '5ª Aliyá', verses: '8:7-8:15', summary: 'Piojos y bestias salvajes.' }, { number: 6, name: '6ª Aliyá', verses: '9:1-9:19', summary: 'Peste, úlceras y granizo.' }] },
  bo: { id: 'bo', nameEs: 'Parashat Bo', nameHe: 'בֹּא', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 10:1 – 13:16', haftarah: 'Jeremías 46:13 – 46:28', summary: 'Las últimas tres plagas, el precepto del sacrificio de Pésaj, la salida de Egipto y la mitzvá de Tefilin.', halachaPoint: 'Leyes de Pésaj, prohibición de Jaméts y la obligación de relatar el Éxodo.', rashiComment: 'Dios le dijo a Moshé "Bo el Faraón" (Entra), dándole valor para enfrentar al tirano.', chasidutThought: 'La salida de Egipto (Metziat Mitzrayim) es un éxodo espiritual constante de las limitaciones personales.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '10:1-10:11', summary: 'Plaga de langostas.' }, { number: 2, name: '2ª Aliyá', verses: '10:12-11:3', summary: 'Oscuridad y anuncio del primogénito.' }, { number: 3, name: '3ª Aliyá', verses: '12:1-12:20', summary: 'Leyes de Pésaj.' }, { number: 4, name: '4ª Aliyá', verses: '12:21-12:28', summary: 'Ejecución del sacrificio.' }, { number: 5, name: '5ª Aliyá', verses: '12:29-12:51', summary: 'Éxodo de Egipto.' }, { number: 6, name: '6ª Aliyá', verses: '13:1-13:16', summary: 'Consagración de primogénitos y Tefilin.' }] },
  beshalach: { id: 'beshalach', nameEs: 'Parashat Beshalaj', nameHe: 'בְּשַׁלַּח', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 13:17 – 17:16', haftarah: 'Jueces 4:4 – 5:31', summary: 'La partición del Mar Rojo, el canto de Moshé y Miriam, el milagro del Maná y la batalla contra Amalek.', halachaPoint: 'Confianza en Dios en momentos límite y la observancia del Shabat a través del Maná.', rashiComment: 'El pueblo dudó frente al mar, pero Najshón se arrojó a las aguas antes de que se abrieran.', chasidutThought: 'La apertura del mar simboliza traspasar la frontera de la propia naturaleza lógica.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '13:17-14:8', summary: 'Ruta hacia el mar y persecución.' }, { number: 2, name: '2ª Aliyá', verses: '14:9-14:14', summary: 'Temor del pueblo.' }, { number: 3, name: '3ª Aliyá', verses: '14:15-14:25', summary: 'Partición del Mar Rojo.' }, { number: 4, name: '4ª Aliyá', verses: '14:26-15:26', summary: 'Cántico del mar y aguas de Mará.' }, { number: 5, name: '5ª Aliyá', verses: '15:27-16:10', summary: 'Llegada al desierto de Sin.' }, { number: 6, name: '6ª Aliyá', verses: '16:11-16:36', summary: 'El milagro del Maná.' }, { number: 7, name: '7ª Aliyá', verses: '17:1-17:16', summary: 'Agua de la roca y guerra con Amalek.' }] },
  yitro: { id: 'yitro', nameEs: 'Parashat Yitró', nameHe: 'יִתְרוֹ', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 18:1 – 20:23', haftarah: 'Isaías 6:1 – 7:6', summary: 'Llegada de Yitró, nombramiento de jueces, y la solemne Entrega de la Torá en el Monte Sinaí con los Diez Mandamientos.', halachaPoint: 'Cumplimiento de los Diez Mandamientos y la estructura de justicia comunitaria.', rashiComment: 'Yitró se unió a Israel al escuchar los grandes milagros de la redención.', chasidutThought: 'En el Sinaí se unieron los mundos espirituales y materiales por primera vez en la historia.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '18:1-18:12', summary: 'Yitró visita a Moshé.' }, { number: 2, name: '2ª Aliyá', verses: '18:13-18:27', summary: 'Sistema judicial.' }, { number: 3, name: '3ª Aliyá', verses: '19:1-19:6', summary: 'Llegada al Sinaí.' }, { number: 4, name: '4ª Aliyá', verses: '19:7-19:25', summary: 'Preparación para la entrega.' }, { number: 5, name: '5ª Aliyá', verses: '20:1-20:14', summary: 'Los Diez Mandamientos.' }, { number: 6, name: '6ª Aliyá', verses: '20:15-20:23', summary: 'Temor del pueblo y leyes de altares.' }] },
  mishpatim: { id: 'mishpatim', nameEs: 'Parashat Mishpatim', nameHe: 'מִשְׁפָּטִים', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 21:1 – 24:18', haftarah: 'Jeremías 34:8 – 34:22; 33:25 – 33:26', summary: 'Leyes civiles y sociales, ética interpersonal, protección al vulnerable, y el compromiso del pueblo "Hacer y Escuchar".', halachaPoint: 'Justicia civil, prohibición de usura, respeto al prójimo y caridad.', rashiComment: 'Las leyes civiles se colocaron inmediatamente después de los Diez Mandamientos para mostrar la santidad de la justicia.', chasidutThought: 'La ética interpersonal es la prueba más genuina del compromiso con Dios.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:1-21:19', summary: 'Leyes de siervos y daños.' }, { number: 2, name: '2ª Aliyá', verses: '21:20-22:3', summary: 'Responsabilidad civil y robos.' }, { number: 3, name: '3ª Aliyá', verses: '22:4-22:26', summary: 'Daños a propiedades y morales.' }, { number: 4, name: '4ª Aliyá', verses: '22:27-23:5', summary: 'Leyes éticas y sociales.' }, { number: 5, name: '5ª Aliyá', verses: '23:6-23:19', summary: 'Justicia y festividades.' }, { number: 6, name: '6ª Aliyá', verses: '23:20-24:18', summary: 'Promesa del ángel y ascenso al Sinaí.' }] },
  terumah: { id: 'terumah', nameEs: 'Parashat Terumá', nameHe: 'תְּרוּמָה', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 25:1 – 27:19', haftarah: '1 Reyes 5:26 – 6:13', summary: 'Ofrendas para el Santuario (Mishkán), instrucciones detalladas para construir el Arca, la mesa, la menorá y la estructura del tabernáculo.', halachaPoint: 'Construcción de sinagogas y espacios sagrados comunitarios.', rashiComment: 'Cada aporte al Mishkán debía provenir de un corazón generoso.', chasidutThought: 'El Santuario externo refleja el santuario que debemos construir dentro de nuestro propio corazón.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:1-25:16', summary: 'Materiales y el Arca.' }, { number: 2, name: '2ª Aliyá', verses: '25:17-25:40', summary: 'La cubierta, la mesa y la menorá.' }, { number: 3, name: '3ª Aliyá', verses: '26:1-26:30', summary: 'Cortinas y estructura.' }, { number: 4, name: '4ª Aliyá', verses: '26:31-27:8', summary: 'El Velo y el Altar exterior.' }, { number: 5, name: '5ª Aliyá', verses: '27:9-27:19', summary: 'Atrio del Mishkán.' }] },
  tetzaveh: { id: 'tetzaveh', nameEs: 'Parashat Tetzavé', nameHe: 'תְּצַוֶּה', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 27:20 – 30:10', haftarah: 'Ezequiel 43:10 – 43:27', summary: 'El aceite puro para la Menorá, las vestimentas sagradas de los sacerdotes (Kohanim) y la consagración del altar del incienso.', halachaPoint: 'Leyes sobre vestimenta ritual y la iluminación continua de la Menorá.', rashiComment: 'El nombre de Moshé no aparece explícitamente en esta parashá debido a su frase "Bórrame de tu libro".', chasidutThought: 'Las vestimentas sacerdotales elevan la materia corporal del ser humano al servicio divino.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '27:20-28:12', summary: 'Aceite de la Menorá y vestimentas.' }, { number: 2, name: '2ª Aliyá', verses: '28:13-28:30', summary: 'El Efod y el pectoral.' }, { number: 3, name: '3ª Aliyá', verses: '28:31-28:43', summary: 'Manto y accesorios sacerdotales.' }, { number: 4, name: '4ª Aliyá', verses: '29:1-29:37', summary: 'Consagración de los sacerdotes.' }, { number: 5, name: '5ª Aliyá', verses: '29:38-30:10', summary: 'Ofrenda perpetua y altar de incienso.' }] },
  kitisa: { id: 'kitisa', nameEs: 'Parashat Ki Tisá', nameHe: 'כִּי תِשָּׂא', sefer: 'Shemot (Éxodo)', reading: 'Shemot 30:11 – 34:35', haftarah: '1 Reyes 18:1 – 18:39', summary: 'El impuesto del medio shيكل, el becerro de oro, la rotura de las tablas, y la revelación de los Trece Atributos de Misericordia.', halachaPoint: 'Prohibición de la idolatría, observancia del Shabat y el perdón divino.', rashiComment: 'Dios le mostró a Moshé los Trece Atributos como fórmula de arrepentimiento.', chasidutThought: 'Tras el pecado del becerro de oro, la relación con Dios se profundizó aún más mediante el perdón.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '30:11-30:16', summary: 'El medio shيكل.' }, { number: 2, name: '2ª Aliyá', verses: '30:17-31:17', summary: 'Lavamanos y Shabat.' }, { number: 3, name: '3ª Aliyá', verses: '31:18-33:11', summary: 'El becerro de oro y rotura de tablas.' }, { number: 4, name: '4ª Aliyá', verses: '33:12-34:26', summary: 'Los Trece Atributos de Misericordia.' }, { number: 5, name: '5ª Aliyá', verses: '34:27-34:35', summary: 'Rostro radiante de Moshé.' }] },
  vayakhel: { id: 'vayakhel', nameEs: 'Parashat Vayakhel', nameHe: 'וַיַּקְהֵל', sefer: 'Shemot (Éxodo)', reading: 'Shemot 35:1 – 38:20', haftarah: '1 Reyes 7:13 – 7:26', summary: 'Convocatoria del pueblo, recordatorio de las leyes del Shabat, y recolección de materiales para construir el Mishkán.', halachaPoint: 'Leyes de prohibición de melajot en Shabat vinculadas a la construcción del Tabernáculo.', rashiComment: 'El Shabat precede al trabajo del Mishkán para enseñar que la creación no anula el descanso sagrado.', chasidutThought: 'El Shabat aporta energía espiritual para toda la semana laboral.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '35:1-36:4', summary: 'Shabat y ofrendas.' }, { number: 2, name: '2ª Aliyá', verses: '36:5-36:19', summary: 'Trabajos del Mishkán.' }, { number: 3, name: '3ª Aliyá', verses: '36:20-37:16', summary: 'Estructura y Arca.' }, { number: 4, name: '4ª Aliyá', verses: '37:17-38:20', summary: 'Menorá, altares y atrio.' }] },
  pekudei: { id: 'pekudei', nameEs: 'Parashat Pekudei', nameHe: 'פְּקוּדֵי', sefer: 'Shemot (Éxodo)', reading: 'Shemot 38:21 – 40:38', haftarah: '1 Reyes 7:40 – 7:50', summary: 'Inventario de los materiales del Mishkán, ensamblaje final de la estructura y la bajada de la Presencia Divina (Nur/Nube).', halachaPoint: 'Transparencia financiera y rendición de cuentas en fondos comunitarios.', rashiComment: 'Moshé rindió cuentas exactas de cada metal recolectado.', chasidutThought: 'Cuando el ser humano purifica sus actos, la gloria divina reposa dentro de él.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '38:21-39:1', summary: 'Inventario de metales.' }, { number: 2, name: '2ª Aliyá', verses: '39:2-39:21', summary: 'Vestimentas sacerdotales.' }, { number: 3, name: '3ª Aliyá', verses: '39:22-39:43', summary: 'Inspección final por Moshé.' }, { number: 4, name: '4ª Aliyá', verses: '40:1-40:38', summary: 'Montaje del Mishkán y llegada de la nube divina.' }] },

  // SEFER VAYIKRA
  vayikra: { id: 'vayikra', nameEs: 'Parashat Vayikrá', nameHe: 'וַיִּקְרָא', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 1:1 – 5:26', haftarah: 'Isaías 43:21 – 44:23', summary: 'Leyes detalladas sobre los sacrificios (Olah, Minjá, Shelamim, Jatat y Asham) ofrecidos en el Tabernáculo.', halachaPoint: 'Proceso de arrepentimiento y expiación mediante ofrendas y ofrendas vegetales.', rashiComment: 'El llamado "Vayikrá" denota afecto y cercanía divina hacia Moshé.', chasidutThought: 'Ofrecer un sacrificio simboliza entregar los instintos animales propios al servicio del Creador.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:13', summary: 'Sacrificio Olah (ascensión).' }, { number: 2, name: '2ª Aliyá', verses: '1:14-2:16', summary: 'Ofrendas de aves y harina.' }, { number: 3, name: '3ª Aliyá', verses: '3:1-3:17', summary: 'Sacrificio de paz (Shelamim).' }, { number: 4, name: '4ª Aliyá', verses: '4:1-4:26', summary: 'Ofrenda por transgresiones involuntarias (Jatat).' }, { number: 5, name: '5ª Aliyá', verses: '4:27-5:10', summary: 'Jatat para líderes y particulares.' }, { number: 6, name: '6ª Aliyá', verses: '5:11-5:26', summary: 'Ofrenda variable y por culpa (Asham).' }] },
  tzav: { id: 'tzav', nameEs: 'Parashat Tzav', nameHe: 'צַו', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 6:1 – 8:36', haftarah: 'Jeremías 7:21 – 8:3; 9:22 – 9:23', summary: 'Instrucciones adicionales para los sacerdotes sobre el mantenimiento del fuego en el altar y la investidura de Aarón.', halachaPoint: 'Leyes sobre el fuego perpetuo en el altar y la prohibición de consumir sangre o grasa sagrada.', rashiComment: 'La orden "Tzav" (ordena) denota urgencia en deberes que implican costos económicos.', chasidutThought: 'El fuego en el altar espiritual interior nunca debe apagarse.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:1-6:11', summary: 'Fuego perpetuo y ofrendas.' }, { number: 2, name: '2ª Aliyá', verses: '6:12-7:10', summary: 'Leyes de Minjá y Jatat.' }, { number: 3, name: '3ª Aliyá', verses: '7:11-7:38', summary: 'Sacrificio de agradecimiento y prohibiciones de grasas.' }, { number: 4, name: '4ª Aliyá', verses: '8:1-8:36', summary: 'Investidura de Aarón y sus hijos.' }] },
  shemini: { id: 'shemini', nameEs: 'Parashat Sheminí', nameHe: 'שְׁמִינִי', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 9:1 – 11:47', haftarah: '2 Samuel 6:1 – 7:17', summary: 'Inauguración oficial del Tabernáculo, muerte trágica de Nadav y Avihú, y leyes de animales kosher y no kosher.', halachaPoint: 'Leyes de Kashrut sobre animales terrestres, aves y peces permitidos.', rashiComment: 'Nadav y Avihú fallecieron por acercarse a Dios con fuego extraño no autorizado.', chasidutThought: 'El entusiasmo espiritual desprovisto de disciplina halájica puede ser peligroso.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '9:1-9:23', summary: 'Octavo día de inauguración.' }, { number: 2, name: '2ª Aliyá', verses: '10:1-10:20', summary: 'Tragedia de Nadav y Avihú.' }, { number: 3, name: '3ª Aliyá', verses: '11:1-11:32', summary: 'Animales terrestres y acuáticos kosher.' }, { number: 4, name: '4ª Aliyá', verses: '11:33-11:47', summary: 'Aves y pureza alimentaria.' }] },
  tazria: { id: 'tazria', nameEs: 'Parashat Tazria', nameHe: 'תַזְרִיעַ', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 12:1 – 13:59', haftarah: '2 Reyes 4:42 – 5:19', summary: 'Leyes de pureza tras el parto, y diagnóstico de la afección espiritual y física conocida como Tzaarat (lepra bíblica).', halachaPoint: 'Leyes de pureza familiar y la prohibición de hablar mal (Lashon hará) asociada a la Tzaarat.', rashiComment: 'La Tzaarat afectaba casas, ropas y pieles como advertencia espiritual.', chasidutThought: 'El cuidado de las palabras es fundamental para mantener la sanidad del alma.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '12:1-12:8', summary: 'Pureza tras el nacimiento.' }, { number: 2, name: '2ª Aliyá', verses: '13:1-13:17', summary: 'Diagnóstico de Tzaarat.' }, { number: 3, name: '3ª Aliyá', verses: '13:18-13:28', summary: 'Inspección de inflamaciones.' }, { number: 4, name: '4ª Aliyá', verses: '13:29-13:59', summary: 'Casos especiales y ropas afectadas.' }] },
  metzora: { id: 'metzora', nameEs: 'Parashat Metzorá', nameHe: 'מְצֹרָע', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 14:1 – 15:33', haftarah: '2 Reyes 7:3 – 7:20', summary: 'Proceso de purificación del Metzorá, leyes de higiene y flujos corporales de pureza familiar.', halachaPoint: 'Leyes de pureza ritual, salud comunitaria y la santidad del hogar.', rashiComment: 'El pájaro purificador simboliza la humildad necesaria para curarse del orgullo.', chasidutThought: 'La purificación implica un renacimiento espiritual tras corregir los errores interpersonales.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '14:1-14:20', summary: 'Purificación del Metzorá.' }, { number: 2, name: '2ª Aliyá', verses: '14:21-14:32', summary: 'Ofrenda para personas de bajos recursos.' }, { number: 3, name: '3ª Aliyá', verses: '14:33-14:57', summary: 'Tzaarat en casas.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:33', summary: 'Flujos y pureza corporal.' }] },
  achreimot: { id: 'achreimot', nameEs: 'Parashat Ajaréi Mot', nameHe: 'אַחֲרֵי מוֹת', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 16:1 – 18:30', haftarah: 'Ezequiel 22:1 – 22:19', summary: 'Servicio de Iom Kipur en el Templo, prohibición de consumir sangre, y leyes de relaciones familiares prohibidas (cercanía sexual).', halachaPoint: 'Leyes de Yom Kipur, prohibiciones alimentarias estrictas y moral familiar.', rashiComment: 'La muerte de los hijos de Aarón se recuerda en Kipur para mostrar su expiación.', chasidutThought: 'Kipur eleva al ser humano al nivel espiritual de los ángeles mediante el ayuno y la introspección.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:1-16:17', summary: 'Servicio de Yom Kipur.' }, { number: 2, name: '2ª Aliyá', verses: '16:18-16:34', summary: 'El chivo expiatorio y ayuno.' }, { number: 3, name: '3ª Aliyá', verses: '17:1-17:16', summary: 'Lugar de sacrificios y prohibición de sangre.' }, { number: 4, name: '4ª Aliyá', verses: '18:1-18:30', summary: 'Relaciones prohibidas.' }] },
  kedoshim: { id: 'kedoshim', nameEs: 'Parashat Kedoshim', nameHe: 'קְדֹשִׁים', sefer: 'Vayikrá (Levítico)', reading: 'Vayikrá 19:1 – 20:27', haftarah: 'Amós 9:7 – 9:15', summary: 'Mandato de santidad, el precepto central "Amarás a tu prójimo como a ti mismo", leyes éticas, justicia y honra a los padres.', halachaPoint: 'Ética social, prohibición de venganza, honestidad comercial y amor al prójimo.', rashiComment: 'La santidad se logra absteniéndose de lo permitido en exceso y elevando lo cotidiano.', chasidutThought: '"Amar a tu prójimo como a ti mismo" es la regla fundamental de toda la Torá.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '19:1-19:14', summary: 'Leyes de santidad social y caridad.' }, { number: 2, name: '2ª Aliyá', verses: '19:15-19:32', summary: 'Justicia y amor al prójimo.' }, { number: 3, name: '3ª Aliyá', verses: '19:33-20:27', summary: 'Integridad y castigos por transgresiones.' }] },
  emor: { id: 'emor', nameEs: 'Parashat Emor', nameHe: 'אֱמֹר', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 21:1 – 24:23', haftarah: 'Ezequiel 44:15 – 44:31', summary: 'Normas para los Kohanim, el calendario de las Festividades sagradas (Shabat, Pésaj, Shavuot, Rosh Hashaná, Kipur, Sucot) y la Menorá.', halachaPoint: 'Leyes de festividades judías, prohibición de trabajar en Moed y santificación del tiempo.', rashiComment: 'Las festividades son proclamadas por el tribunal judío terrenal santificando el calendario.', chasidutThought: 'El tiempo sagrado nos permite trascender la rutina material.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:1-21:24', summary: 'Pureza de los Kohanim.' }, { number: 2, name: '2ª Aliyá', verses: '22:1-22:16', summary: 'Consumo de sagrados.' }, { number: 3, name: '3ª Aliyá', verses: '22:17-23:44', summary: 'Calendario de festividades.' }, { number: 4, name: '4ª Aliyá', verses: '24:1-24:23', summary: 'Menorá, panes y ley del talión.' }] },
  behar: { id: 'behar', nameEs: 'Parashat Behar', nameHe: 'בְּהַר', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 25:1 – 26:2', haftarah: 'Jeremías 32:6 – 32:27', summary: 'Leyes del año sabático (Shmitá) para la tierra de Israel y el año de Jubileo (Yovel), prohibición de la usura.', halachaPoint: 'Fe en la providencia divina mediante el descanso de la tierra agrícola cada siete años.', rashiComment: '¿Qué relación tiene el Shmitá con el Monte Sinaí? Todas las leyes fueron dadas en el Sinaí.', chasidutThought: 'El descanso de la tierra enseña que el mundo pertenece al Creador.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:1-25:13', summary: 'Leyes del Shmitá.' }, { number: 2, name: '2ª Aliyá', verses: '25:14-25:38', summary: 'Honestidad y el Jubileo.' }, { number: 3, name: '3ª Aliyá', verses: '25:39-26:2', summary: 'Liberación de siervos y prohibición de idolatría.' }] },
   בחוקותי: { id: ' בחוקותי', nameEs: 'Parashat Bejukotai', nameHe: 'בְּחֻקֹּתַי', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 26:3 – 27:34', haftarah: 'Jeremías 16:19 – 17:14', summary: 'Bendiciones por cumplir la Torá, advertencias (Tojaja) por apartarse de ella, y leyes de valuación de ofrendas.', halachaPoint: 'Cumplimiento de mitzvot y la promesa de prosperidad espiritual y material.', rashiComment: 'Las bendiciones prometen paz y seguridad cuando se estudia Torá con dedicación.', chasidutThought: 'Las dificultades son llamados celestiales para retornar a la esencia espiritual.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '26:3-26:13', summary: 'Bendiciones.' }, { number: 2, name: '2ª Aliyá', verses: '26:14-26:46', summary: 'Advertencias (Tojaja).' }, { number: 3, name: '3ª Aliyá', verses: '27:1-27:34', summary: 'Valuaciones y diezmos.' }] },

  // SEFER BAMIDBAR
  bamidbar: { id: 'bamidbar', nameEs: 'Parashat Bamidbar', nameHe: 'בְּמִדְבַּר', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 1:1 – 4:20', haftarah: 'Oseas 2:1 – 2:22', summary: 'Censo del pueblo de Israel en el desierto, distribución de las tribus alrededor del Tabernáculo y funciones de los levitas.', halachaPoint: 'Organización comunitaria y el valor de cada individuo contado en el censo.', rashiComment: 'Dios cuenta al pueblo constantemente por el profundo amor que les tiene.', chasidutThought: 'Cada persona ocupa un lugar irremplazable en la estructura espiritual del pueblo judío.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:54', summary: 'Censo de las tribus.' }, { number: 2, name: '2ª Aliyá', verses: '2:1-2:34', summary: 'Campamento y estandartes.' }, { number: 3, name: '3ª Aliyá', verses: '3:1-3:39', summary: 'Funciones de los levitas.' }, { number: 4, name: '4ª Aliyá', verses: '3:40-4:20', summary: 'Redención de primogénitos y tareas de Kehat.' }] },
  nasso: { id: 'nasso', nameEs: 'Parashat Nasó', nameHe: 'נָשֹׂא', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 4:21 – 7:89', haftarah: 'Jueces 13:2 – 13:25', summary: 'Censo específico de los clanes levitas, leyes del Nazir, la Bendición Sacerdotal (Birkat Kohanim) y ofrendas de los príncipes tribales.', halachaPoint: 'La Bendición Sacerdotal diaria y la disciplina del Nazir.', rashiComment: 'La bendición de los Kohanim se imparte con amor hacia todo el pueblo.', chasidutThought: 'La bendición divina desciende cuando hay unidad en la comunidad.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '4:21-4:49', summary: 'Censo de Guershon y Merari.' }, { number: 2, name: '2ª Aliyá', verses: '5:1-5:10', summary: 'Expulsión de impuros y restitución.' }, { number: 3, name: '3ª Aliyá', verses: '5:11-6:27', summary: 'La sotá, el Nazir y Birkat Kohanim.' }, { number: 4, name: '4ª Aliyá', verses: '7:1-7:89', summary: 'Ofrendas de los príncipes.' }] },
  behaalotecha: { id: 'behaalotecha', nameEs: 'Parashat Behaalotejá', nameHe: 'בְּהַעֲלֹתְךָ', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 8:1 – 12:16', haftarah: 'Zacarías 2:14 – 4:7', summary: 'Encendido de la Menorá, consagración de los levitas, celebración del segundo Pésaj, y las quejas del pueblo por la carne.', halachaPoint: 'Leyes de Pésaj Sheni y el cuidado al hablar de los demás (caso de Moshé y Miriam).', rashiComment: 'Nunca es tarde para cumplir una mitzvá, de ahí el concepto de Pésaj Sheni.', chasidutThought: 'La luz de la Menorá irradia hacia afuera iluminando la oscuridad del mundo.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '8:1-8:26', summary: 'Encendido de la Menorá.' }, { number: 2, name: '2ª Aliyá', verses: '9:1-9:14', summary: 'Segundo Pésaj.' }, { number: 3, name: '3ª Aliyá', verses: '9:15-10:10', summary: 'La nube y las trompetas.' }, { number: 4, name: '4ª Aliyá', verses: '10:11-11:29', summary: 'Partida y quejas por el Maná.' }, { number: 5, name: '5ª Aliyá', verses: '11:30-12:16', summary: 'Codornices y Tzaarat de Miriam.' }] },
  shelach: { id: 'shelach', nameEs: 'Parashat Shelaj Lejá', nameHe: 'שְׁלַח-לְךָ', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 13:1 – 15:41', haftarah: 'Josué 2:1 – 2:24', summary: 'Envío de los doce espías a la tierra de Israel, el informe negativo, el decreto de permanecer 40 años en el desierto, y la mitzvá de los flecos (Tzitziot).', halachaPoint: 'Precepto de los Tzitzit y la fe en las promesas divinas sobre la Tierra de Israel.', rashiComment: 'Los espías pecaron al desacreditar la tierra deseada.', chasidutThought: 'Mirar los Tzitzit nos recuerda conectar la materialidad con los mandatos del Creador.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '13:1-13:20', summary: 'Envío de los espías.' }, { number: 2, name: '2ª Aliyá', verses: '13:21-14:7', summary: 'Informe y rebelión.' }, { number: 3, name: '3ª Aliyá', verses: '14:8-14:25', summary: 'Intercesión de Moshé.' }, { number: 4, name: '4ª Aliyá', verses: '14:26-15:7', summary: 'Decreto de los 40 años.' }, { number: 5, name: '5ª Aliyá', verses: '15:8-15:41', summary: 'Ofrendas y precepto de Tzitzit.' }] },
  korach: { id: 'korach', nameEs: 'Parashat Kóraj', nameHe: 'קֹרַח', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 16:1 – 18:32', haftarah: '1 Samuel 11:14 – 12:22', summary: 'Rebelión de Kóraj contra Moshé y Aarón, su trágico final, y la floración milagrosa de la vara de Aarón.', halachaPoint: 'Evitar la discordia gratuita (majloket) y reconocer la autoridad legítima.', rashiComment: 'Kóraj cuestionó la autoridad basándose en sofismas sobre la igualdad espiritual.', chasidutThought: 'La discordia destruye los cimientos espirituales de la comunidad.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:1-16:13', summary: 'Rebelión de Kóraj.' }, { number: 2, name: '2ª Aliyá', verses: '16:14-16:34', summary: 'Juicio divino y tragar la tierra.' }, { number: 3, name: '3ª Aliyá', verses: '16:35-17:15', summary: 'Plaga y censo de paz.' }, { number: 4, name: '4ª Aliyá', verses: '17:16-18:32', summary: 'La vara de Aarón florece y porciones sacerdotales.' }] },
  chukat: { id: 'chukat', nameEs: 'Parashat Jukat', nameHe: 'חֻקַּת', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 19:1 – 22:1', haftarah: 'Jueces 11:1 – 11:33', summary: 'Leyes de la Vaca Roja (Para Adumá) para la purificación ritual, muerte de Miriam y Aarón, y el agua brotando de la roca.', halachaPoint: 'Leyes de pureza ritual y el concepto de decretos supraracionales (Jukim).', rashiComment: 'El decreto de la Vaca Roja trasciende la lógica humana.', chasidutThought: 'Purificarse de las impurezas del ego requiere un compromiso que supera el intelecto.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '19:1-19:22', summary: 'Leyes de la Vaca Roja.' }, { number: 2, name: '2ª Aliyá', verses: '20:1-20:13', summary: 'Muerte de Miriam y agua de la roca.' }, { number: 3, name: '3ª Aliyá', verses: '20:14-20:21', summary: 'Edom niega el paso.' }, { number: 4, name: '4ª Aliyá', verses: '20:22-21:9', summary: 'Muerte de Aarón y serpiente de bronce.' }, { number: 5, name: '5ª Aliyá', verses: '21:10-22:1', summary: 'Caudillos y victoria sobre Sijón y Og.' }] },
  balak: { id: 'balak', nameEs: 'Parashat Balak', nameHe: 'בָּלָק', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 22:2 – 25:9', haftarah: 'Miqueas 5:6 – 6:8', summary: 'El rey Balak contrata al adivino Bilam para maldecir a Israel, pero este termina profiriendo hermosas bendiciones.', halachaPoint: 'Protección divina sobre el pueblo judío y el poder de las palabras.', rashiComment: 'Bilam poseía una visión profética equivalente a la de Moshé pero enfocada en el mal.', chasidutThought: 'Las maldiciones se transformaron en bendiciones eternas ("Ma tovu ohalécha Yaakov").', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '22:2-22:12', summary: 'Balak convoca a Bilam.' }, { number: 2, name: '2ª Aliyá', verses: '22:13-22:37', summary: 'Viaje y la burra que habla.' }, { number: 3, name: '3ª Aliyá', verses: '22:38-23:12', summary: 'Primera bendición.' }, { number: 4, name: '4ª Aliyá', verses: '23:13-24:13', summary: 'Segunda y tercera bendiciones.' }, { number: 5, name: '5ª Aliyá', verses: '24:14-25:9', summary: 'Profecía mesiánica y episodio de Baal Peor.' }] },
  pinchas: { id: 'pinchas', nameEs: 'Parashat Pinjás', nameHe: 'פִּינְחָס', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 25:10 – 30:1', haftarah: '1 Reyes 18:46 – 19:21', summary: 'La recompensa a Pinjás por su celo divino, un nuevo censo, las hijas de Tzlofjad y la designación de Yehoshúa como sucesor.', halachaPoint: 'Leyes de herencia familiar y liderazgo comunitario.', rashiComment: 'Pinjás recibió el pacto de paz eterna por detener la plaga.', chasidutThought: 'El verdadero celo por Dios se basa exclusivamente en el amor y la protección de la vida.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:10-26:4', summary: 'Recompensa a Pinjás y censo.' }, { number: 2, name: '2ª Aliyá', verses: '26:5-26:51', summary: 'Distribución tribal.' }, { number: 3, name: '3ª Aliyá', verses: '26:52-27:23', summary: 'Hijas de Tzlofjad y sucesión de Yehoshúa.' }, { number: 4, name: '4ª Aliyá', verses: '28:1-30:1', summary: 'Ofrendas de festividades y votos.' }] },
  matotmasei: { id: 'matotmasei', nameEs: 'Parashat Matot-Masei', nameHe: 'מַטּוֹת-מַסְעֵי', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 30:2 – 36:13', haftarah: 'Jeremías 2:4 – 2:28', summary: 'Leyes sobre juramentos y votos, la guerra contra Madián, asignación de tierras al este del Jordán, y resumen de las 42 etapas en el desierto.', halachaPoint: 'La seriedad de la palabra empeñada y los límites de la Tierra de Israel.', rashiComment: 'Las 42 paradas en el desierto muestran la paciencia y guía constante de Dios.', chasidutThought: 'Cada etapa de la vida en el desierto es un paso de refinamiento espiritual.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '30:2-32:42', summary: 'Votos, Madián y tierras de Gad y Reuven.' }, { number: 2, name: '2ª Aliyá', verses: '33:1-33:49', summary: 'Etapas en el desierto.' }, { number: 3, name: '3ª Aliyá', verses: '33:50-36:13', summary: 'Fronteras, ciudades levíticas y refugio.' }] },

  // SEFER DEVARIM
  devarim: { id: 'devarim', nameEs: 'Parashat Devarim', nameHe: 'דְּבָרִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 1:1 – 3:22', haftarah: 'Isaías 1:1 – 1:27', summary: 'Discurso de despedida de Moshé repasando los errores del pueblo en el desierto y exhortándolos a la obediencia.', halachaPoint: 'Crítica constructiva y memoria histórica de los errores pasados.', rashiComment: 'Moshé reprochó al pueblo solo al final de su vida por respeto y sabiduría.', chasidutThought: 'Recordar las caídas fortalece el crecimiento espiritual futuro.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:11', summary: 'Introducción y nombramiento de jueces.' }, { number: 2, name: '2ª Aliyá', verses: '1:12-1:38', summary: 'Incidente de los espías.' }, { number: 3, name: '3ª Aliyá', verses: '1:39-2:1', summary: 'Decreto de deambular.' }, { number: 4, name: '4ª Aliyá', verses: '2:2-2:30', summary: 'Ruta alrededor de Edom y Moab.' }, { number: 5, name: '5ª Aliyá', verses: '2:31-3:22', summary: 'Derrota de Sijón y asignación de tierras.' }] },
  vaetjanan: { id: 'vaetjanan', nameEs: 'Parashat Vaetjanán', nameHe: 'וָאֶתְחַנַּן', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 3:23 – 7:11', haftarah: 'Isaías 40:1 – 40:26 (Najamu)', summary: 'Moshé ruega entrar a la tierra, repetición de los Diez Mandamientos y proclamación del Shemá Israel.', halachaPoint: 'Recitación del Shemá, colocación de Mezuzá y prohibición de idolatría.', rashiComment: 'Moshé suplicó 515 oraciones para ingresar a la tierra.', chasidutThought: 'El Shemá Israel declara la unidad absoluta e indivisible del Creador en el universo.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '3:23-4:4', summary: 'Ruego de Moshé.' }, { number: 2, name: '2ª Aliyá', verses: '4:5-4:40', summary: 'Exhortación a cumplir la Torá.' }, { number: 3, name: '3ª Aliyá', verses: '4:41-4:49', summary: 'Ciudades de refugio.' }, { number: 4, name: '4ª Aliyá', verses: '5:1-5:18', summary: 'Diez Mandamientos.' }, { number: 5, name: '5ª Aliyá', verses: '5:19-6:3', summary: 'Temor reverente.' }, { number: 6, name: '6ª Aliyá', verses: '6:4-6:25', summary: 'El Shemá Israel y amor a Dios.' }, { number: 7, name: '7ª Aliyá', verses: '7:1-7:11', summary: 'Elección de Israel.' }] },
  ekev: { id: 'ekev', nameEs: 'Parashat Ekev', nameHe: 'עֵקֶב', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 7:12 – 11:25', haftarah: 'Isaías 49:14 – 51:3', summary: 'Promesas de bendición al cumplir los preceptos, advertencia contra el orgullo y recordatorio del maná.', halachaPoint: 'Bendición después de comer (Birkat Hamazón) y gratitud a Dios.', rashiComment: 'Ekev se refiere a los preceptos que las personas suelen menospreciar.', chasidutThought: 'La humildad es la llave para recibir la abundancia espiritual.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '7:12-8:10', summary: 'Recompensas y abundancia.' }, { number: 2, name: '2ª Aliyá', verses: '8:11-9:3', summary: 'Peligro del orgullo.' }, { number: 3, name: '3ª Aliyá', verses: '9:4-10:11', summary: 'Rebelión del becerro y nuevas tablas.' }, { number: 4, name: '4ª Aliyá', verses: '10:12-11:9', summary: 'Lo que Dios exige y milagros.' }, { number: 5, name: '5ª Aliyá', verses: '11:10-11:25', summary: 'Lluvias y cumplimiento.' }] },
  reeh: { id: 'reeh', nameEs: 'Parashat Reé', nameHe: 'רְאֵה', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 11:26 – 16:17', haftarah: 'Isaías 54:11 – 55:5', summary: 'Bendición y maldición en el monte Gurizim y Eval, leyes de caridad (Tzedaká) y calendario de las tres festividades de peregrinaje.', halachaPoint: 'Leyes de Tzedaká, caridad con los pobres y alimentación kosher.', rashiComment: 'Reé ("mira") invita a tomar conciencia de las elecciones espirituales.', chasidutThought: 'Dar caridad con alegría transforma el corazón del dador y del receptor.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '11:26-12:10', summary: 'Bendición y lugar de culto.' }, { number: 2, name: '2ª Aliyá', verses: '12:11-13:19', summary: 'Leyes alimentarias y falsos profetas.' }, { number: 3, name: '3ª Aliyá', verses: '14:1-14:29', summary: 'Leyes de Kashrut y diezmos.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:23', summary: 'Año sabático de deudas y caridad.' }, { number: 5, name: '5ª Aliyá', verses: '16:1-16:17', summary: 'Pésaj, Shavuot y Sucot.' }] },
  shoftim: { id: 'shoftim', nameEs: 'Parashat Shoftim', nameHe: 'שֹׁפְטִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 16:18 – 21:9', haftarah: 'Isaías 51:12 – 52:12', summary: 'Establecimiento de tribunales justos, leyes sobre reyes, profetas, ciudades de refugio y normas de guerra.', halachaPoint: 'Búsqueda de la justicia imparcial y prohibición de cortar árboles frutales en guerra (Bal Tashjit).', rashiComment: 'Justicia, justicia perseguirás: nombra jueces íntegros.', chasidutThought: 'La justicia terrenal refleja la rectitud y equilibrio del orden divino.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:18-17:13', summary: 'Jueces y prohibición de idolatría.' }, { number: 2, name: '2ª Aliyá', verses: '17:14-18:5', summary: 'Leyes del rey y los levitas.' }, { number: 3, name: '3ª Aliyá', verses: '18:6-18:22', summary: 'Profetas verdaderos.' }, { number: 4, name: '4ª Aliyá', verses: '19:1-19:13', summary: 'Ciudades de refugio.' }, { number: 5, name: '5ª Aliyá', verses: '19:14-20:9', summary: 'Testigos falsos y leyes de guerra.' }, { number: 6, name: '6ª Aliyá', verses: '20:10-21:9', summary: 'Ceremonia de Eglá Arufá.' }] },
  kiteitzei: { id: 'kiteitzei', nameEs: 'Parashat Ki Tetzei', nameHe: 'כִּי-תֵצֵא', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 21:10 – 25:19', haftarah: 'Isaías 54:1 – 54:10', summary: 'Amplio código de leyes morales, familiares y sociales, incluyendo respeto a los animales, honestidad en pesas y memoria de Amalek.', halachaPoint: 'Leyes éticas cotidianas, honestidad en el comercio y protección al prójimo.', rashiComment: 'Cada mandamiento refleja una profunda sensibilidad hacia la dignidad humana.', chasidutThought: 'Los detalles de la vida diaria son el escenario principal para revelar la santidad.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:10-22:7', summary: 'Matrimonio cautiva y derechos del primogénito.' }, { number: 2, name: '2ª Aliyá', verses: '22:8-23:7', summary: 'Seguridad, pureza y prohibiciones.' }, { number: 3, name: '3ª Aliyá', verses: '23:8-24:4', summary: 'Higiene del campamento y leyes sociales.' }, { number: 4, name: '4ª Aliyá', verses: '24:5-24:22', summary: 'Protección al trabajador y caridad.' }, { number: 5, name: '5ª Aliyá', verses: '25:1-25:19', summary: 'Azotes, pesos justos y Amalek.' }] },
  kitavo: { id: 'kitavo', nameEs: 'Parashat Ki Tavo', nameHe: 'כִּי-תָבוֹא', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 26:1 – 29:8', haftarah: 'Isaías 60:1 – 60:22', summary: 'Presentación de las primicias (Bikurim), entrega de los diezmos, la ceremonia de bendiciones y maldiciones en el monte Ebal y Gurizim.', halachaPoint: 'Gratitud por los frutos de la tierra y fidelidad al pacto con Dios.', rashiComment: 'Servir a Dios con alegría es la clave para la plenitud espiritual.', chasidutThought: 'Las primicias expresan que el primer y mejor esfuerzo debe dedicarse a lo sagrado.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '26:1-26:11', summary: 'Las primicias (Bikurim).' }, { number: 2, name: '2ª Aliyá', verses: '26:12-26:19', summary: 'Declaración de diezmos.' }, { number: 3, name: '3ª Aliyá', verses: '27:1-27:26', summary: 'Piedras en el monte Ebal y maldiciones.' }, { number: 4, name: '4ª Aliyá', verses: '28:1-28:69', summary: 'Bendiciones y advertencias.' }, { number: 5, name: '5ª Aliyá', verses: '29:1-29:8', summary: 'Renovación del pacto.' }] },
  nitzavim: { id: 'nitzavim', nameEs: 'Parashat Nitzavim', nameHe: 'נִצָּבִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 29:9 – 30:20', haftarah: 'Isaías 61:10 – 63:9', summary: 'Unidad de todo el pueblo frente al pacto divino, la promesa del retorno (Tshuvá) y la accesibilidad de la Torá.', halachaPoint: 'El poder del arrepentimiento sincero (Tshuvá) y la cercanía de la palabra divina.', rashiComment: '"La Torá no está en el cielo", sino en tu boca y en tu corazón para cumplirla.', chasidutThought: 'Todo judío tiene asegurada la capacidad de retornar a su raíz espiritual en cualquier momento.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '29:9-29:14', summary: 'Todos unidos en el pacto.' }, { number: 2, name: '2ª Aliyá', verses: '29:15-29:28', summary: 'Consecuencias de la idolatría.' }, { number: 3, name: '3ª Aliyá', verses: '30:1-30:10', summary: 'Promesa de Tshuvá y redención.' }, { number: 4, name: '4ª Aliyá', verses: '30:11-30:20', summary: 'La Torá está cerca y la elección de la vida.' }] },
  vayeilech: { id: 'vayeilech', nameEs: 'Parashat Vayelej', nameHe: 'וַיֵּלֶךְ', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 31:1 – 31:30', haftarah: 'Oseas 14:2 – 14:10; Miqueas 7:18 – 7:20', summary: 'Moshé transfiere el liderazgo a Yehoshúa, la mitzvá de escribir un Séfer Torá personal y la lectura pública cada siete años (Hakhel).', halachaPoint: 'Obligación de escribir un rollo de Torá y la unidad nacional.', rashiComment: 'Escribir una letra en la Torá se considera como haber escrito toda la obra.', chasidutThought: 'La Torá pertenece a cada individuo de manera directa e íntima.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '31:1-31:6', summary: 'Ánimo a Yehoshúa y al pueblo.' }, { number: 2, name: '2ª Aliyá', verses: '31:7-31:13', summary: 'Entrega de la Torá y Hakhel.' }, { number: 3, name: '3ª Aliyá', verses: '31:14-31:30', summary: 'Cántico de Haazinu y advertencia final.' }] },
  haazinu: { id: 'haazinu', nameEs: 'Parashat Haazinu', nameHe: 'הַאֲזִינוּ', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 32:1 – 32:52', haftarah: '2 Samuel 22:1 – 22:51', summary: 'El célebre Cántico poético de Moshé que repasa la historia de fidelidad e ingratitud de Israel frente a la protección divina.', halachaPoint: 'Reconocimiento de la justicia divina y memoria histórica.', rashiComment: 'El cántico sirve como testigo eterno de la relación entre Dios y Su pueblo.', chasidutThought: 'La poesía conecta las profundidades del alma con la eternidad de la Torá.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '32:1-32:12', summary: 'Cántico y grandeza de Dios.' }, { number: 2, name: '2ª Aliyá', verses: '32:13-32:18', summary: 'Prosperidad e ingratitud.' }, { number: 3, name: '3ª Aliyá', verses: '32:19-32:28', summary: 'Consecuencias y destierro.' }, { number: 4, name: '4ª Aliyá', verses: '32:29-32:39', summary: 'Consolación y justicia.' }, { number: 5, name: '5ª Aliyá', verses: '32:40-32:52', summary: 'Mandato de subir al monte Nebo.' }] },
  vezothaberakhah: { id: 'vezothaberakhah', nameEs: 'Parashat Vezot HaBerajá', nameHe: 'וְזֹאת הַבְּרָכָה', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 33:1 – 34:12', haftarah: 'Josué 1:1 – 1:18', summary: 'Las últimas bendiciones de Moshé a las tribus de Israel antes de su fallecimiento en el monte Nebo, cerrando el ciclo anual de la Torá.', halachaPoint: 'La bendición a las tribus y la culminación del estudio de la Torá (Simjat Torá).', rashiComment: 'Moshé bendijo a cada tribu con características propias resaltando su misión.', chasidutThought: 'Al finalizar la Torá la reiniciamos inmediatamente, simbolizando que el estudio divino nunca termina.', aliyot: [{ number: 1, name: '1ª Aliyá', verses: '33:1-33:7', summary: 'Bendición general y tribus de Reuven y Yehudah.' }, { number: 2, name: '2ª Aliyá', verses: '33:8-33:12', summary: 'Leví y Binyamin.' }, { number: 3, name: '3ª Aliyá', verses: '33:13-33:17', summary: 'Yosef.' }, { number: 4, name: '4ª Aliyá', verses: '33:18-33:29', summary: 'Zvulun, Issajar, Gad, Dan, Naftalí y Asher.' }, { number: 5, name: '5ª Aliyá', verses: '34:1-34:12', summary: 'Muerte de Moshé y fin de la Torá.' }] }
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

          {/* Selector Completo de las 54 Parashot */}
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

        {/* SUBPESTAÑA 4: Dimensión Jasídica */}
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

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/10 border border-amber-500/30 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                  Enseñanza Jasídica de {cleanText(parasha.nameEs)}:
                </span>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                  {cleanText(parasha.chasidutThought)}
                </p>
              </div>
            </div>

            {/* Las 10 Ideas Maestras de la Jasidut */}
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