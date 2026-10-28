/**
 * ============================================================================
 * COMPONENTE: ParashaTab.tsx
 * Pestaña completa con las 54 Parashot de la Torá, sin citas y con 10 enseñanzas jasídicas por parashá
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

// Función auxiliar simple y a prueba de errores para limpiar texto
const cleanText = (text: string): string => {
  if (!text) return '';
  return text.split('[cite:')[0].trim();
};

// Base de datos completa con las 54 Parashot de la Torá y sus 10 enseñanzas jasídicas cada una
const PARASHOT_DATABASE: Record<string, ParashaData> = {
  // --- SEFER BERESHIT ---
  bereshit: {
    id: 'bereshit', nameEs: 'Parashat Bereshit', nameHe: 'בְּרֵאשִׁית', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 1:1 – 6:8', haftarah: 'Isaías 42:5 – 43:10',
    summary: 'La Creación del universo en seis días, el Shabat como coronación, la formación del hombre y la mujer en el Gan Edén, la prueba del fruto prohibido y los orígenes de la humanidad.',
    halachaPoint: 'Santidad del Shabat y responsabilidad ética en el cuidado del mundo.',
    rashiComment: 'La Torá comienza con la Creación para demostrar el derecho soberano de Dios sobre toda la tierra.',
    chasidutThought: 'El mundo entero es una morada potencial para lo Divino (Dira Betajtonim), transformando la materia en un santuario.',
    jasidicLessons: [
      { title: '1. El Principio con Sabiduría', snippet: 'Dios creó el mundo "Bereshit", indicando que cada inicio cotidiano contiene la chispa de la intención creadora.' },
      { title: '2. La Luz Primordial', snippet: 'La luz oculta del primer día sigue brillando en el estudio secreto de la Torá para los justos.' },
      { title: '3. El Aliento de Vida', snippet: 'El soplo divino en el hombre representa la conexión inquebrantable de la chispa del alma con su fuente.' },
      { title: '4. El Desafío de los Opuestos', snippet: 'La mezcla del bien y el mal simboliza el reto humano de refinar y elevar los opuestos en la materia.' },
      { title: '5. La Libre Voluntad', snippet: 'La advertencia a Caín enseña que el dominio sobre la inclinación al mal reside en las manos de la voluntad.' },
      { title: '6. Conciencia Evolutiva', snippet: 'Las generaciones iniciales reflejan el potencial de la conciencia humana para acercarse al propósito divino.' },
      { title: '7. El Descenso para Ascender', snippet: 'Toda caída espiritual en la experiencia humana es el preludio necesario para un salto de conciencia.' },
      { title: '8. La Chispa Cautiva', snippet: 'Cada objeto físico posee una energía espiritual que espera ser liberada mediante su uso sagrado.' },
      { title: '9. La Bendición del Shabat', snippet: 'El séptimo día infunde bendición retroactiva y anticipada a toda la estructura de los días laborables.' },
      { title: '10. Caminar en Comunión', snippet: 'El ejemplo de Janoj enseña una devoción constante donde cada acción se integra en unión con el Creador.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-2:3', summary: 'Seis días de la Creación y Shabat.' }, { number: 2, name: '2ª Aliyá', verses: '2:4-2:19', summary: 'Formación de Adam.' }, { number: 3, name: '3ª Aliyá', verses: '2:20-3:21', summary: 'Creación de Javá y el fruto prohibido.' }, { number: 4, name: '4ª Aliyá', verses: '3:22-4:18', summary: 'Expulsión y Caín y Abel.' }, { number: 5, name: '5ª Aliyá', verses: '4:19-4:26', summary: 'Descendencia de Caín.' }, { number: 6, name: '6ª Aliyá', verses: '5:1-5:24', summary: 'Genealogía hasta Janoj.' }, { number: 7, name: '7ª Aliyá', verses: '5:25-6:8', summary: 'Generaciones hasta Noaj.' }]
  },
  noaj: {
    id: 'noaj', nameEs: 'Parashat Noaj', nameHe: 'נֹחַ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 6:9 – 11:32', haftarah: 'Isaías 54:1 – 55:5',
    summary: 'El Diluvio universal, la construcción del Arca, el pacto del arco iris, la torre de Babel y las generaciones de Teraj.',
    halachaPoint: 'Las siete leyes de los hijos de Noaj y la preservación de la vida.',
    rashiComment: 'Noaj caminó con Dios, pero necesitó el apoyo del Arca debido a su fe imperfecta.',
    chasidutThought: 'El Arca (Teivá) representa las palabras de la Torá y el rezo que resguardan el alma en medio de las inundaciones del ego.',
    jasidicLessons: [
      { title: '1. El Arca Interior', snippet: 'Entrar en la Teivá significa refugiarse en las letras sagradas del rezo durante las tormentas mentales.' },
      { title: '2. La Ventana de la Conciencia', snippet: 'El Tzohar o luz del Arca ilumina incluso los momentos de mayor oscuridad colectiva.' },
      { title: '3. La Bondad Universal', snippet: 'Noaj alimentó a los animales incansablemente, enseñando la empatía activa hacia toda criatura.' },
      { title: '4. El Pacto del Arco Iris', snippet: 'Los colores del arco iris reflejan los diferentes niveles de almas unidos bajo la misericordia divina.' },
      { title: '5. La Torre de Babel', snippet: 'Unir fuerzas para la arrogancia destruye la verdadera comunicación; la unidad debe basarse en valores.' },
      { title: '6. El Humo del Sacrificio', snippet: 'El agradecimiento de Noaj tras el diluvio endulzó la severidad del juicio en el mundo.' },
      { title: '7. Semillas de Renacimiento', snippet: 'Cada catástrofe personal esconde el terreno fértil para un nuevo comienzo espiritual.' },
      { title: '8. El Valor del Tiempo', snippet: 'La paciencia dentro del Arca demuestra la disciplina necesaria en los procesos de sanación.' },
      { title: '9. La Tierra Habitada', snippet: 'Poblar el mundo implica impregnarlo de conciencia moral y reconocimiento del Creador.' },
      { title: '10. Más Allá del Juicio', snippet: 'La promesa del pacto asegura que la compasión divina sostiene el universo de manera perpetua.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:9-6:22', summary: 'Noaj y el mandato del Arca.' }, { number: 2, name: '2ª Aliyá', verses: '7:1-7:16', summary: 'Entrada al Arca.' }, { number: 3, name: '3ª Aliyá', verses: '7:17-8:14', summary: 'El Diluvio.' }, { number: 4, name: '4ª Aliyá', verses: '8:15-9:7', summary: 'Salida del Arca.' }, { number: 5, name: '5ª Aliyá', verses: '9:8-9:17', summary: 'Pacto del arco iris.' }, { number: 6, name: '6ª Aliyá', verses: '9:18-10:32', summary: 'Naciones.' }, { number: 7, name: '7ª Aliyá', verses: '11:1-11:32', summary: 'Torre de Babel.' }]
  },
  lejlecha: {
    id: 'lejlecha', nameEs: 'Parashat Lej Lecha', nameHe: 'לֶךְ-לְךָ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 12:1 – 17:27', haftarah: 'Isaías 40:27 – 41:16',
    summary: 'El llamado divino a Abraham para dejar su tierra, su viaje a Canaán, el pacto entre las partes y el establecimiento del Brit Milá.',
    halachaPoint: 'El precepto del Brit Milá en el octavo día y la hospitalidad con los invitados.',
    rashiComment: 'Lej Lecha significa "ve hacia ti mismo", un viaje de descubrimiento interior.',
    chasidutThought: 'Cada persona debe trascender sus limitaciones psicológicas y geográficas internas ("su tierra y su parentela").',
    jasidicLessons: [
      { title: '1. El Viaje Interior', snippet: 'Abandonar la tierra natal psicológica para encontrarse con la verdadera identidad del alma.' },
      { title: '2. La Fe Inquebrantable', snippet: 'Abraham iluminó un mundo politeísta irradiando la unicidad absoluta de Dios.' },
      { title: '3. Las Estrellas como Guía', snippet: 'Elevar la mirada más allá de las limitaciones naturales confiando en la providencia.' },
      { title: '4. El Pacto en la Carne', snippet: 'El Brit Milá sella el vínculo eterno entre lo físico y la trascendencia espiritual.' },
      { title: '5. Hospitalidad Abierta', snippet: 'Abrir las tiendas a los cuatro vientos refleja la generosidad sin fronteras del patriarca.' },
      { title: '6. La Alianza de las Partes', snippet: 'El sacrificio dividido muestra la disposición a entregar el ego por completo.' },
      { title: '7. Superar la Esterilidad', snippet: 'Los callejones sin salida en la vida son oportunidades para un milagro de renovación.' },
      { title: '8. El Cambio de Nombre', snippet: 'Agregar la letra Hei expande el potencial espiritual del ser humano.' },
      { title: '9. Caminar con Rectitud', snippet: 'La orden "sé íntegro" invita a refinar el carácter de manera constante.' },
      { title: '10. La Tierra Prometida', snippet: 'Canaán representa el estado de conciencia donde la divinidad se percibe con claridad.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '12:1-12:13', summary: 'Llamado a Abraham.' }, { number: 2, name: '2ª Aliyá', verses: '12:14-13:18', summary: 'Separación de Lot.' }, { number: 3, name: '3ª Aliyá', verses: '14:1-14:24', summary: 'Guerra de reyes.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:21', summary: 'Pacto.' }, { number: 5, name: '5ª Aliyá', verses: '16:1-16:16', summary: 'Ishmael.' }, { number: 6, name: '6ª Aliyá', verses: '17:1-17:14', summary: 'Circuncisión.' }, { number: 7, name: '7ª Aliyá', verses: '17:15-17:27', summary: 'Pacto sellado.' }]
  },
  vayeira: {
    id: 'vayeira', nameEs: 'Parashat Vayeira', nameHe: 'וַיֵּרָא', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 18:1 – 22:24', haftarah: '2 Reyes 4:1 – 4:37',
    summary: 'La visita de los ángeles a Abraham, la destrucción de Sodoma, el nacimiento de Itzjak y la prueba de la Akedá.',
    halachaPoint: 'Leyes de hospitalidad, compasión por el prójimo y entrega absoluta a la voluntad divina.',
    rashiComment: 'Abraham intercedió por Sodoma demostrando que el justo busca el mérito y la clemencia.',
    chasidutThought: 'La Akedá revela que el vínculo con Dios trasciende la lógica humana y se arraiga en la esencia del alma.',
    jasidicLessons: [
      { title: '1. Hospitalidad Divina', snippet: 'Recibir a los invitados con alegría supera en mérito el encuentro con la Presencia Divina.' },
      { title: '2. Abogar con Justicia', snippet: 'Abraham desafió el juicio divino exigiendo clemencia incluso para los malvados de Sodoma.' },
      { title: '3. El Juicio de Sefarad', snippet: 'La transformación del juicio estricto en misericordia a través de la bondad de Lot.' },
      { title: '4. La Risa de Itzjak', snippet: 'El nacimiento de Itzjak simboliza la alegría pura que brota de lo imposible.' },
      { title: '5. La Prueba Suprema', snippet: 'La Akedá demuestra que el amor a Dios trasciende cualquier instinto o lógica terrenal.' },
      { title: '6. El Carnero Preparado', snippet: 'Cada prueba divina ya trae preparada su propia solución oculta desde el principio.' },
      { title: '7. El Sacrificio del Ego', snippet: 'Entregar lo más amado al Creador es el acto definitivo de liberación interior.' },
      { title: '8. La Fortaleza de Sara', snippet: 'El papel silencioso y firme de Sara sostiene la estructura espiritual de los patriarcas.' },
      { title: '9. Despedir el Pasado', snippet: 'La salida de Hagar e Ishmael enseña los límites necesarios para proteger la santidad.' },
      { title: '10. El Pozo del Juramento', snippet: 'Beer Sheva representa el pacto de paz y honestidad en las relaciones humanas.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '18:1-18:33', summary: 'Visita de ángeles.' }, { number: 2, name: '2ª Aliyá', verses: '19:1-19:20', summary: 'Lot en Sodoma.' }, { number: 3, name: '3ª Aliyá', verses: '19:21-20:18', summary: 'Destrucción.' }, { number: 4, name: '4ª Aliyá', verses: '21:1-21:21', summary: 'Itzjak.' }, { number: 5, name: '5ª Aliyá', verses: '21:22-21:34', summary: 'Pacto.' }, { number: 6, name: '6ª Aliyá', verses: '22:1-22:19', summary: 'Akedá.' }, { number: 7, name: '7ª Aliyá', verses: '22:20-22:24', summary: 'Familia.' }]
  },
  chayeisarah: {
    id: 'chayeisarah', nameEs: 'Parashat Hayé Sara', nameHe: 'חַיֵּי שָׂרָה', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 23:1 – 25:18', haftarah: '1 Reyes 1:1 – 1:31',
    summary: 'Fallecimiento de Sara, compra de la Cueva de Majpelá, y la misión de Eliézer para encontrar esposa para Itzjak.',
    halachaPoint: 'Honra a los difuntos y adquisición legal de la tierra de Israel.',
    rashiComment: 'Sara falleció al enterarse de la Akedá, reflejando la profundidad del vínculo materno.',
    chasidutThought: 'La búsqueda de Rivká por Eliézer simboliza el descenso del alma al mundo material para rescatar las chispas divinas.',
    jasidicLessons: [
      { title: '1. La Vida de Sara', snippet: 'Los años de Sara fueron "todos iguales en bondad", mostrando una integración perfecta del tiempo.' },
      { title: '2. Majpelá, la Puerta', snippet: 'La Cueva de Majpelá es la entrada doble al Edén terrenal y espiritual.' },
      { title: '3. Compra Eterna', snippet: 'Abraham insistió en pagar el precio completo por la tierra para asegurar su derecho legítimo.' },
      { title: '4. El Juramento del Siervo', snippet: 'Eliézer representa el siervo fiel que cumple su misión centrado exclusivamente en su amo.' },
      { title: '5. La Prueba del Pozo', snippet: 'La bondad espontánea de Rivká al dar de beber a los camellos evidenció su alma de bondad.' },
      { title: '6. Joyas de Compromiso', snippet: 'Los brazaletes y el anillo simbolizan los límites y coronas de la santidad matrimonial.' },
      { title: '7. El Consuelo de Itzjak', snippet: 'Llevar a Rivká a la tienda de Sara restauró la luz espiritual que se había apagado.' },
      { title: '8. Los Días de Abraham', snippet: 'Abraham falleció colmado de días, indicando que aprovechó cada momento al máximo.' },
      { title: '9. El Legado a Itzjak', snippet: 'Transmitir la bendición espiritual asegura la continuidad de la misión generacional.' },
      { title: '10. Descendencia Amplia', snippet: 'Las naciones surgidas de Abraham y Keturá también portan destellos de la fe primordial.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '23:1-23:20', summary: 'Majpelá.' }, { number: 2, name: '2ª Aliyá', verses: '24:1-24:9', summary: 'Eliézer.' }, { number: 3, name: '3ª Aliyá', verses: '24:10-24:26', summary: 'Viaje.' }, { number: 4, name: '4ª Aliyá', verses: '24:27-24:52', summary: 'Rivká.' }, { number: 5, name: '5ª Aliyá', verses: '24:53-24:67', summary: 'Matrimonio.' }, { number: 6, name: '6ª Aliyá', verses: '25:1-25:11', summary: 'Keturá.' }, { number: 7, name: '7ª Aliyá', verses: '25:12-25:18', summary: 'Ishmael.' }]
  },
  toldot: {
    id: 'toldot', nameEs: 'Parashat Toldot', nameHe: 'תּוֹלְדֹת', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 25:19 – 28:9', haftarah: 'Malaquías 1:1 – 2:7',
    summary: 'Nacimiento de Yaakov y Esav, la venta de la primogenitura y las bendiciones que recibe Yaakov.',
    halachaPoint: 'El valor de la primogenitura espiritual frente al materialismo inmediato.',
    rashiComment: 'Esav aparentaba rectitud haciendo preguntas capciosas sobre la halajá.',
    chasidutThought: 'Yaakov y Esav representan las dos fuerzas en el interior del ser humano: lo espiritual y lo terrenal.',
    jasidicLessons: [
      { title: '1. Los Gemelos Opuestos', snippet: 'Dos naturalezas completamente distintas surgidas de un mismo origen familiar.' },
      { title: '2. El Plato de Lentejas', snippet: 'Valorar el presente material despreciando el legado eterno es la trampa del materialismo.' },
      { title: '3. Sembrar en el Exilio', snippet: 'Itzjak sembró en Guerar a pesar de la crisis, cosechando cien veces más por fe.' },
      { title: '4. Los Pozos Abiertos', snippet: 'Reabrir los pozos de Abraham significa rescatar la sabiduría antigua de los patriarcas.' },
      { title: '5. El Disfraz de la Sombra', snippet: 'Yaakov vistiendo las ropas de Esav muestra cómo elevar la energía externa de la materia.' },
      { title: '6. La Voz y las Manos', snippet: 'La voz es de Yaakov pero las manos son de Esav; la fuerza física al servicio del espíritu.' },
      { title: '7. El Temor de Itzjak', snippet: 'Reconocer el designio divino tras la revelación de las bendiciones otorgadas.' },
      { title: '8. El Exilio Inminente', snippet: 'La partida de Yaakov marca el inicio del periplo formador del alma judía.' },
      { title: '9. El Fracaso de Esav', snippet: 'Intentar congraciarse casándose con la familia de Ishmael sin cambiar su esencia.' },
      { title: '10. La Bendición del Padre', snippet: 'Transmitir la herencia espiritual que sostiene la existencia del pueblo.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:19-25:34', summary: 'Nacimiento.' }, { number: 2, name: '2ª Aliyá', verses: '26:1-26:12', summary: 'Guerar.' }, { number: 3, name: '3ª Aliyá', verses: '26:13-26:22', summary: 'Pozos.' }, { number: 4, name: '4ª Aliyá', verses: '26:23-26:35', summary: 'Pacto.' }, { number: 5, name: '5ª Aliyá', verses: '27:1-27:27', summary: 'Bendiciones.' }, { number: 6, name: '6ª Aliyá', verses: '27:28-28:4', summary: 'Partida.' }, { number: 7, name: '7ª Aliyá', verses: '28:5-28:9', summary: 'Mahalat.' }]
  },
  vayetze: {
    id: 'vayetze', nameEs: 'Parashat Vayetze', nameHe: 'וֵיצֵא', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 28:10 – 32:3', haftarah: 'Oseas 12:13 – 14:10',
    summary: 'El sueño de la escalera de Yaakov, su llegada a Jarán, su matrimonio con Rajel y Leá, y su partida enfrentando a Labán.',
    halachaPoint: 'Institución del rezo nocturno (Arvit) y el cumplimiento íntegro de los compromisos.',
    rashiComment: 'Las piedras unidas bajo la cabeza de Yaakov simbolizan la unificación de Israel.',
    chasidutThought: 'Nuestros pies están en la tierra pero nuestra conciencia puede elevarse a los cielos mediante la intención recta.',
    jasidicLessons: [
      { title: '1. La Escalera Cósmica', snippet: 'Los ángeles suben y bajan; la conexión entre el esfuerzo terrenal y la protección celestial.' },
      { title: '2. El Sueño en la Piedra', snippet: 'Convertir las dificultades del camino en el almohadón de la fe.' },
      { title: '3. El Encuentro en el Pozo', snippet: 'El agua viva del pozo simboliza el despertar del amor y el compromiso.' },
      { title: '4. Los Años de Labán', snippet: 'Trabajar en un entorno engañoso manteniendo la pureza y rectitud interior.' },
      { title: '5. Las Matriarcas', snippet: 'Leá y Rajel edifican la casa de Israel con atributos espirituales complementarios.' },
      { title: '6. El Crecimiento de la Familia', snippet: 'El nacimiento de las tribus marca la construcción de la estructura del alma colectiva.' },
      { title: '7. La Huida Nocturna', snippet: 'Romper con las ataduras del materialismo engañoso para retornar a la casa paterna.' },
      { title: '8. El Pacto en Galed', snippet: 'Establecer fronteras claras de paz y respeto mutuo con las fuerzas opositoras.' },
      { title: '9. Ángeles del Campamento', snippet: 'El reconocimiento de las huestes divinas protegiendo cada paso del camino.' },
      { title: '10. La Integridad de Yaakov', snippet: 'Demostrar que tras décadas de pruebas, la fe y la moral permanecieron intactas.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '28:10-28:22', summary: 'Escalera.' }, { number: 2, name: '2ª Aliyá', verses: '29:1-29:17', summary: 'Rajel.' }, { number: 3, name: '3ª Aliyá', verses: '29:18-30:13', summary: 'Matrimonios.' }, { number: 4, name: '4ª Aliyá', verses: '30:14-30:27', summary: 'Yosef.' }, { number: 5, name: '5ª Aliyá', verses: '30:28-31:16', summary: 'Labán.' }, { number: 6, name: '6ª Aliyá', verses: '31:17-31:54', summary: 'Huida.' }, { number: 7, name: '7ª Aliyá', verses: '32:1-32:3', summary: 'Majanaim.' }]
  },
  vayishlach: {
    id: 'vayishlach', nameEs: 'Parashat Vayishlach', nameHe: 'וַיִּשְׁלַח', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 32:4 – 36:43', haftarah: 'Oseas 11:7 – 12:12',
    summary: 'Preparativos de Yaakov para encontrarse con Esav, su lucha nocturna con el ángel, la reconciliación y episodios en Shejem.',
    halachaPoint: 'Estrategia ante el peligro, diplomacia y el cuidado de las leyes dietéticas.',
    rashiComment: 'La lucha con el ángel representa la lucha perpetua de Israel contra las fuerzas opositoras.',
    chasidutThought: 'Al vencer al ángel de Esav, Yaakov transforma la oscuridad en luz y recibe el nombre de Israel.',
    jasidicLessons: [
      { title: '1. Estrategia y Oración', snippet: 'Prepararse mediante la diplomacia, el soborno y la súplica sincera al Creador.' },
      { title: '2. La Lucha Nocturna', snippet: 'Enfrentar los miedos más profundos del alma en la oscuridad de la noche.' },
      { title: '3. La Marca en el Fémur', snippet: 'El nervio ciático herido recuerda la vulnerabilidad temporal y la fuerza eterna del pueblo.' },
      { title: '4. El Rostro Divino', snippet: 'Ver el rostro de Esav y percibir en él un reflejo de la majestad de Dios.' },
      { title: '5. El Altar en Shejem', snippet: 'Consagrar el espacio reconquistado llamándolo "Dios es el Dios de Israel".' },
      { title: '6. El Dolor por Diná', snippet: 'Las pruebas familiares enseñan la necesidad de resguardar la intimidad y la moral.' },
      { title: '7. Retorno a Beit El', snippet: 'Volver a las raíces espirituales eliminando los ídolos extraños del hogar.' },
      { title: '8. La Muerte de Rajel', snippet: 'Rajel sepultada en el camino para interceder por sus hijos en el exilio futuro.' },
      { title: '9. Los Duques de Edom', snippet: 'Reconocer la genealogía del mundo material para ordenar el mapa de la historia.' },
      { title: '10. El Triunfo del Espíritu', snippet: 'Israel emerge transformado, portando una identidad de conexión directa con lo alto.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '32:4-32:33', summary: 'Lucha.' }, { number: 2, name: '2ª Aliyá', verses: '33:1-33:20', summary: 'Esav.' }, { number: 3, name: '3ª Aliyá', verses: '34:1-34:31', summary: 'Shejem.' }, { number: 4, name: '4ª Aliyá', verses: '35:1-35:11', summary: 'Beit El.' }, { number: 5, name: '5ª Aliyá', verses: '35:12-35:29', summary: 'Rajel.' }, { number: 6, name: '6ª Aliyá', verses: '36:1-36:19', summary: 'Edom.' }, { number: 7, name: '7ª Aliyá', verses: '36:20-36:43', summary: 'Duques.' }]
  },
  vayeshev: {
    id: 'vayeshev', nameEs: 'Parashat Vyeshev', nameHe: 'וְיֵשֶׁב', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 37:1 – 40:23', haftarah: 'Amós 2:6 – 3:8',
    summary: 'Los sueños de Yosef, su venta como esclavo a Egipto, la historia de Tamar y Yehudah, y Yosef en la prisión.',
    halachaPoint: 'Prohibición de la maledicencia y mantenimiento de la integridad moral en la adversidad.',
    rashiComment: 'Los hermanos vendieron a Yosef motivados por celos inspirados en sus sueños.',
    chasidutThought: 'Las pruebas más difíciles de la vida ocultan las semillas de nuestra salvación futura.',
    jasidicLessons: [
      { title: '1. Los Sueños de Grandeza', snippet: 'Yosef vislumbra su destino elevado a través de visiones que desafían el presente.' },
      { title: '2. La Túnica de Colores', snippet: 'El favoritismo visible genera fricciones que impulsan los grandes giros de la historia.' },
      { title: '3. El Pozo Vacío', snippet: 'Estar en el fondo de un pozo sin agua, lleno de serpientes y escorpiones, y mantener la esperanza.' },
      { title: '4. La Fortaleza en Egipto', snippet: 'Mantener la identidad espiritual en medio de una cultura radicalmente materialista.' },
      { title: '5. La Prueba con la Esposa', snippet: 'Resistir la tentación recordando la imagen moral del padre (Itzjak).' },
      { title: '6. El Ascenso desde la Prisión', snippet: 'Incluso en el encierro, Yosef irradia gracia y liderazgo natural.' },
      { title: '7. El Valor de Tamar', snippet: 'Reconocer la verdad con valentía pública para preservar el linaje de Yehudah.' },
      { title: '8. Los Sueños del Copero', snippet: 'El sufrimiento ajeno sirve de antesala para el plan divino de salvación.' },
      { title: '9. La Incomprensión Humana', snippet: 'Yosef confía en Dios cuando el copero se olvida de él en la cárcel.' },
      { title: '10. Preparando el Escenario', snippet: 'Cada detalle desafiante encaja en el tejido de la redención que se gesta en silencio.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '37:1-37:11', summary: 'Sueños.' }, { number: 2, name: '2ª Aliyá', verses: '37:12-37:36', summary: 'Venta.' }, { number: 3, name: '3ª Aliyá', verses: '38:1-38:30', summary: 'Tamar.' }, { number: 4, name: '4ª Aliyá', verses: '39:1-39:6', summary: 'Potifar.' }, { number: 5, name: '5ª Aliyá', verses: '39:7-39:23', summary: 'Prisión.' }, { number: 6, name: '6ª Aliyá', verses: '40:1-40:13', summary: 'Copero.' }, { number: 7, name: '7ª Aliyá', verses: '40:14-40:23', summary: 'Olvido.' }]
  },
  miketz: {
    id: 'miketz', nameEs: 'Parashat Miketz', nameHe: 'מִקֵּץ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 41:1 – 44:17', haftarah: '1 Reyes 3:15 – 4:1',
    summary: 'Yosef interpreta los sueños del Faraón, asciende a virrey de Egipto y recibe a sus hermanos que acuden por alimentos.',
    halachaPoint: 'Leyes de festividades (Janucá) y responsabilidad fraternal.',
    rashiComment: 'El ascenso de Yosef ocurrió en una sola noche, demostrando que la salvación divina llega al instante.',
    chasidutThought: 'Yosef simboliza la capacidad de descender al exilio material sin perder la identidad espiritual.',
    jasidicLessons: [
      { title: '1. El Fin de la Oscuridad', snippet: 'Tras los años de prisión, la luz de la salvación amanece de forma repentina.' },
      { title: '2. Sabiduría ante el Faraón', snippet: 'Yosef atribuye todo su éxito y capacidad interpretativa directamente a Dios.' },
      { title: '3. El Gobernador de Egipto', snippet: 'Dominar la materia económica del imperio para sustentar a todo el mundo conocido.' },
      { title: '4. El Reencuentro Oculto', snippet: 'Yosef reconoce a sus hermanos pero actúa con aparente dureza para propiciar su corrección.' },
      { title: '5. Las Acusaciones de Espionaje', snippet: 'Despertar en los hermanos la conciencia de sus actos pasados mediante pruebas.' },
      { title: '6. La Retención de Shimon', snippet: 'Garantizar el retorno seguro de la familia reteniendo una prenda humana.' },
      { title: '7. El Viaje de Binyamin', snippet: 'Obligar a la familia a descender al núcleo de la prueba con el hermano menor.' },
      { title: '8. El Banquete en Palacio', snippet: 'Transformar la tensión del juicio en una mesa de hermandad y reconciliación.' },
      { title: '9. La Copa de Plata', snippet: 'La copa oculta en el saco de Binyamin como instrumento de revelación final.' },
      { title: '10. La Prueba de Yehudah', snippet: 'Yehudah se ofrece como esclavo en lugar de su hermano, demostrando entrega total.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '41:1-41:14', summary: 'Sueños.' }, { number: 2, name: '2ª Aliyá', verses: '41:15-41:38', summary: 'Interpretación.' }, { number: 3, name: '3ª Aliyá', verses: '41:39-41:52', summary: 'Virrey.' }, { number: 4, name: '4ª Aliyá', verses: '41:53-42:18', summary: 'Hermanos.' }, { number: 5, name: '5ª Aliyá', verses: '42:19-43:15', summary: 'Binyamin.' }, { number: 6, name: '6ª Aliyá', verses: '43:16-44:17', summary: 'Copa.' }]
  },
  vayigash: {
    id: 'vayigash', nameEs: 'Parashat Vayigash', nameHe: 'וַיִּגַּשׁ', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 44:18 – 47:27', haftarah: 'Ezequiel 37:15 – 37:28',
    summary: 'Yehudah se aproxima a Yosef, quien se revela a sus hermanos, el reencuentro con Yaakov y el asentamiento en Goshen.',
    halachaPoint: 'El valor de la paz familiar y la gratitud hacia quienes nos sustentan.',
    rashiComment: 'Al revelarse, Yosef disipó la vergüenza y el miedo de sus hermanos con palabras de consuelo.',
    chasidutThought: 'La unión entre Yosef y Yehudah anticipa la futura unificación de todo el pueblo de Israel.',
    jasidicLessons: [
      { title: '1. El Acercamiento Valiente', snippet: 'Yehudah da un paso al frente con fuerza y humildad para defender a su hermano.' },
      { title: '2. La Revelación de la Identidad', snippet: 'Yosef se quita las máscaras y dice: "Yo soy Yosef, ¿vive aún mi padre?".' },
      { title: '3. Disipar el Remordimiento', snippet: 'Reconocer que todo fue parte de un plan divino superior para salvar vidas.' },
      { title: '4. Carretas desde Egipto', snippet: 'Las señales enviadas por Yaakov reconfirman la autenticidad del mensaje de vida.' },
      { title: '5. La Migración Protegida', snippet: 'Todo el clan desciende a Egipto bajo el resguardo de la providencia divina.' },
      { title: '6. El Reencuentro Emotivo', snippet: 'Yaakov y Yosef se abrazan fundiendo los mundos de la sabiduría y la acción.' },
      { title: '7. Presentación ante el Faraón', snippet: 'Yaakov bendice al monarca más poderoso de la tierra con dignidad patriarcal.' },
      { title: '8. La Región de Goshen', snippet: 'Establecer un enclave de pureza espiritual y cultural en medio del exilio egipcio.' },
      { title: '9. Gestión con Justicia', snippet: 'Yosef administra los recursos del imperio con honestidad y visión de futuro.' },
      { title: '10. Semillas de Redención', snippet: 'El exilio en Egipto se convierte en el crisol donde se forja la nación hebrea.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '44:18-45:7', summary: 'Revelación.' }, { number: 2, name: '2ª Aliyá', verses: '45:8-45:27', summary: 'Mensaje.' }, { number: 3, name: '3ª Aliyá', verses: '45:28-46:27', summary: 'Migración.' }, { number: 4, name: '4ª Aliyá', verses: '46:28-47:10', summary: 'Reencuentro.' }, { number: 5, name: '5ª Aliyá', verses: '47:11-47:31', summary: 'Goshen.' }]
  },
  vayechi: {
    id: 'vayechi', nameEs: 'Parashat Vayejí', nameHe: 'וַיְחִי', sefer: 'Sefer Bereshit (Génesis)', reading: 'Bereshit 47:28 – 50:26', haftarah: '1 Reyes 2:1 – 2:12',
    summary: 'Últimos días de Yaakov, bendición a los hijos de Yosef, bendiciones a las tribus y fallecimiento de Yaakov y Yosef.',
    halachaPoint: 'Testamento ético, bendición a los hijos y la fe en la redención futura.',
    rashiComment: 'Antes de morir, Yaakov quiso revelar el fin de los tiempos pero la presencia divina se apartó.',
    chasidutThought: 'La vida de Yaakov en Egipto demuestra que la luz espiritual puede iluminar los rincones más densos.',
    jasidicLessons: [
      { title: '1. Los Mejores Años', snippet: 'Los diecisiete años en Egipto fueron los más luminosos e integrales de la vida de Yaakov.' },
      { title: '2. Adoptar a Efraim y Menashe', snippet: 'Yaakov eleva a los hijos de Yosef al rango de tribus fundadoras de Israel.' },
      { title: '3. Las Manos Cruzadas', snippet: 'Bendecir al menor con la mano derecha enseña que los caminos divinos superan la lógica.' },
      { title: '4. El Testamento a las Tribus', snippet: 'Yaakov revela el carácter y la misión espiritual específica de cada hijo para la eternidad.' },
      { title: '5. La Fuerza de Yehudah', snippet: 'El cetro real y la capacidad de liderazgo recaen sobre la tribu de Yehudah.' },
      { title: '6. El Cortejo Fúnebre', snippet: 'Egipto entero rinde honores al patriarca que trajo la bendición a sus tierras.' },
      { title: '7. Retorno a Majpelá', snippet: 'Cumplir el juramento de sepultar a Yaakov en la tierra ancestral de sus padres.' },
      { title: '8. El Perdón de Yosef', snippet: 'Yosef tranquiliza a sus hermanos reiterando que el mal intencionado fue transformado en bien.' },
      { title: '9. Juramento de Redención', snippet: 'Yosef hace jurar a sus hermanos que Dios los sacará de Egipto en el futuro.' },
      { title: '10. El Fin de una Era', snippet: 'Con la muerte de Yosef se cierra el ciclo patriarcal, dando paso al nacimiento del pueblo.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '47:28-48:22', summary: 'Bendición.' }, { number: 2, name: '2ª Aliyá', verses: '49:1-49:18', summary: 'Tribus.' }, { number: 3, name: '3ª Aliyá', verses: '49:19-49:26', summary: 'Continuación.' }, { number: 4, name: '4ª Aliyá', verses: '49:27-50:20', summary: 'Sepultura.' }, { number: 5, name: '5ª Aliyá', verses: '50:21-50:26', summary: 'Yosef.' }]
  },

  // --- SEFER SHEMOT ---
  shemot: {
    id: 'shemot', nameEs: 'Parashat Shemot', nameHe: 'שְׁמוֹת', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 1:1 – 6:1', haftarah: 'Isaías 27:6 – 28:13',
    summary: 'Esclavitud en Egipto, nacimiento y salvación de Moshé, la zarza ardiente y el inicio de la misión libertadora.',
    halachaPoint: 'Respeto a los ancianos, valentía ante la injusticia y el valor de la libertad.',
    rashiComment: 'Las parteras hebreas temieron a Dios y desobedecieron al Faraón arriesgando sus vidas.',
    chasidutThought: 'La zarza ardiente que no se consume enseña que Dios está presente incluso en el sufrimiento del exilio.',
    jasidicLessons: [
      { title: '1. El Valor de los Nombres', snippet: 'Contar a los hijos de Israel por sus nombres muestra que cada individuo es preciado para Dios.' },
      { title: '2. El Coraje de las Parteras', snippet: 'Shiphrah y Puah desafiaron el poder imperial por fidelidad a los valores de la vida.' },
      { title: '3. La Canasta en el Nilo', snippet: 'Colocar a Moshé en el río es un acto de absoluta confianza en la providencia.' },
      { title: '4. La Zarza que Arde', snippet: 'Dios habita en la zarza espinosa y humilde, mostrando que ningún lugar está vacío de Su presencia.' },
      { title: '5. Las Excusas de Moshé', snippet: 'La profunda humildad de Moshé al dudar de su propia elocuencia y capacidad.' },
      { title: '6. El Bastón Transformado', snippet: 'La vara se convierte en serpiente al soltarla, enseñando a dominar los miedos terrenales.' },
      { title: '7. Retorno a Egipto', snippet: 'Moshé regresa al centro del peligro para cumplir la misión encomendada.' },
      { title: '8. El Aumento de la Tarea', snippet: 'Cuando la opresión arrecia antes de la redención, es la antesala del nacimiento de la libertad.' },
      { title: '9. La Queja del Pueblo', snippet: 'El sufrimiento nubla temporalmente la visión de la esperanza en la salvación.' },
      { title: '10. La Promesa Divina', snippet: 'Dios reitera Su Alianza asegurando que la mano fuerte redimirá a los opresos.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:17', summary: 'Esclavitud.' }, { number: 2, name: '2ª Aliyá', verses: '1:18-2:10', summary: 'Moshé.' }, { number: 3, name: '3ª Aliyá', verses: '2:11-2:25', summary: 'Midián.' }, { number: 4, name: '4ª Aliyá', verses: '3:1-3:15', summary: 'Zarza.' }, { number: 5, name: '5ª Aliyá', verses: '3:16-4:17', summary: 'Señales.' }, { number: 6, name: '6ª Aliyá', verses: '4:18-5:9', summary: 'Retorno.' }, { number: 7, name: '7ª Aliyá', verses: '5:10-6:1', summary: 'Queja.' }]
  },
  vaera: {
    id: 'vaera', nameEs: 'Parashat Vaerá', nameHe: 'וָאֵרָא', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 6:2 – 9:35', haftarah: 'Ezequiel 28:25 – 29:21',
    summary: 'Las cuatro expresiones de redención y las primeras siete plagas enviadas sobre Egipto.',
    halachaPoint: 'Las leyes de las plagas demuestran la soberanía absoluta del Creador sobre la naturaleza.',
    rashiComment: 'Dios se reveló a los patriarcas con el nombre Shakai, pero a Moshé con el Inefable.',
    chasidutThought: 'Cada plaga desmanteló una falsa deidad material de la cultura y el poder de Egipto.',
    jasidicLessons: [
      { title: '1. Cuatro Copas de Libertad', snippet: 'Las expresiones de redención estructuran el camino del alma hacia la liberación total.' },
      { title: '2. La Oposicion del Faraón', snippet: 'El orgullo obstinado del tirano como símbolo del ego que rechaza la autoridad divina.' },
      { title: '3. El Prodigio del Bastón', snippet: 'Los magos de Egipto imponen ilusiones, pero la verdad divina las devora por completo.' },
      { title: '4. La Plaga de Sangre', snippet: 'El Nilo convertido en sangre destruye la idolatría al río como fuente autosuficiente.' },
      { title: '5. Ranas y Piojos', snippet: 'Demostrar que incluso las criaturas más pequeñas ejecutan la voluntad del Creador.' },
      { title: '6. La Distinción en Goshen', snippet: 'Proteger al pueblo de Israel en medio de las plagas que azotan el entorno.' },
      { title: '7. Peste y Granizo', snippet: 'El fuego y el hielo mezclados en el granizo milagroso obedecen en armonía al Creador.' },
      { title: '8. El Endurecimiento del Corazón', snippet: 'Cuando el hombre rechaza la verdad reiteradamente, pierde su capacidad de libre arrepentimiento.' },
      { title: '9. Advertencia con Piedad', snippet: 'Incluso en el juicio, Dios avisa a los egipcios para que salven a sus ganados si lo desean.' },
      { title: '10. Soberanía Universal', snippet: 'El propósito de las plagas es que todo el mundo reconozca que Dios rige la historia.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:2-6:13', summary: 'Promesa.' }, { number: 2, name: '2ª Aliyá', verses: '6:14-6:28', summary: 'Genealogía.' }, { number: 3, name: '3ª Aliyá', verses: '6:29-7:7', summary: 'Misión.' }, { number: 4, name: '4ª Aliyá', verses: '7:8-8:6', summary: 'Plagas.' }, { number: 5, name: '5ª Aliyá', verses: '8:7-8:15', summary: 'Piojos.' }, { number: 6, name: '6ª Aliyá', verses: '9:1-9:19', summary: 'Granizo.' }]
  },
  bo: {
    id: 'bo', nameEs: 'Parashat Bo', nameHe: 'בֹּא', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 10:1 – 13:16', haftarah: 'Jeremías 46:13 – 46:28',
    summary: 'Las últimas tres plagas, el precepto del sacrificio de Pésaj, la salida de Egipto y la mitzvá de Tefilin.',
    halachaPoint: 'Leyes de Pésaj, prohibición de Jaméts y la obligación de relatar el Éxodo.',
    rashiComment: 'Dios le dijo a Moshé "Bo el Faraón" (Entra), dándole valor para enfrentar al tirano.',
    chasidutThought: 'La salida de Egipto (Metziat Mitzrayim) es un éxodo espiritual constante de las limitaciones personales.',
    jasidicLessons: [
      { title: '1. Entrar en las Tinieblas', snippet: 'Dios invita a Moshé a adentrarse en la guarida del faraón para rescatar la luz cautiva.' },
      { title: '2. Langostas y Oscuridad', snippet: 'La plaga de oscuridad espesa paralizó el egoísmo materialista de los opresores.' },
      { title: '3. El Primer Mes del Año', snippet: 'Santificar el tiempo es el primer mandamiento entregado a la nación naciente.' },
      { title: '4. El Cordero de Pésaj', snippet: 'Sacrificar el cordero desafiaba al dios principal de los egipcios con valentía pública.' },
      { title: '5. La Sangre en el Dintel', snippet: 'Marcar las puertas con sangre como símbolo de la distinción y protección del hogar judío.' },
      { title: '6. El Pan Ácimo (Matzá)', snippet: 'La Matzá representa la humildad y la prisa por conectar con Dios sin inflar el ego.' },
      { title: '7. La Salida Presurada', snippet: 'Abandonar las ataduras de Egipto de inmediato, sin mirar atrás hacia la esclavitud.' },
      { title: '8. La Obligación de Contar', snippet: 'Transmitir la memoria del milagro a los hijos garantiza la supervivencia espiritual.' },
      { title: '9. Consagración de Primogénitos', snippet: 'Todo lo inicial y valioso pertenece por derecho al servicio del Creador.' },
      { title: '10. Los Tefilin en el Brazo', snippet: 'Ligar la mente y la acción a la memoria del Éxodo mediante las cajas sagradas.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '10:1-10:11', summary: 'Langostas.' }, { number: 2, name: '2ª Aliyá', verses: '10:12-11:3', summary: 'Oscuridad.' }, { number: 3, name: '3ª Aliyá', verses: '12:1-12:20', summary: 'Pésaj.' }, { number: 4, name: '4ª Aliyá', verses: '12:21-12:28', summary: 'Sacrificio.' }, { number: 5, name: '5ª Aliyá', verses: '12:29-12:51', summary: 'Éxodo.' }, { number: 6, name: '6ª Aliyá', verses: '13:1-13:16', summary: 'Tefilin.' }]
  },
  beshalach: {
    id: 'beshalach', nameEs: 'Parashat Beshalaj', nameHe: 'בְּשַׁלַּח', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 13:17 – 17:16', haftarah: 'Jueces 4:4 – 5:31',
    summary: 'La partición del Mar Rojo, el canto de Moshé y Miriam, el milagro del Maná y la batalla contra Amalek.',
    halachaPoint: 'Confianza en Dios en momentos límite y la observancia del Shabat a través del Maná.',
    rashiComment: 'El pueblo dudó frente al mar, pero Najshón se arrojó a las aguas antes de que se abrieran.',
    chasidutThought: 'La apertura del mar simboliza traspasar la frontera de la propia naturaleza lógica y racional.',
    jasidicLessons: [
      { title: '1. El Camino Más Largo', snippet: 'Dios guio al pueblo por el desierto para prepararlos emocionalmente antes de la guerra.' },
      { title: '2. Pánico y Fe', snippet: 'Atrapados entre el mar y el ejército, la orden divina fue: "Marchad hacia adelante".' },
      { title: '3. El Salto de Najshón', snippet: 'La acción audaz de arrojarse al agua precede y desencadena el milagro de la apertura.' },
      { title: '4. El Cántico del Mar', snippet: 'La máxima expresión de gratitud poética colectiva tras experimentar la redención.' },
      { title: '5. Las Aguas de Mará', snippet: 'Endulzar las amarguras de la vida mediante la aceptación de los estatutos divinos.' },
      { title: '6. El Pan del Cielo (Maná)', snippet: 'Confiar en el sustento diario recibido directamente de la mesa celestial.' },
      { title: '7. La Porción del Shabat', snippet: 'El doble maná del sexto día sella la santidad y providencia especial del descanso sabático.' },
      { title: '8. Agua de la Roca', snippet: 'La fuente fluye golpeando con fe la estructura firme de la materia.' },
      { title: '9. El Ataque de Amalek', snippet: 'Amalek representa la fría apatía y el escepticismo que intenta enfriar la fe del pueblo.' },
      { title: '10. Las Manos Alzadas', snippet: 'Cuando Moshé elevaba sus manos al cielo, Israel vencía en la batalla terrenal.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '13:17-14:8', summary: 'Ruta.' }, { number: 2, name: '2ª Aliyá', verses: '14:9-14:14', summary: 'Temor.' }, { number: 3, name: '3ª Aliyá', verses: '14:15-14:25', summary: 'Mar Rojo.' }, { number: 4, name: '4ª Aliyá', verses: '14:26-15:26', summary: 'Cántico.' }, { number: 5, name: '5ª Aliyá', verses: '15:27-16:10', summary: 'Desierto.' }, { number: 6, name: '6ª Aliyá', verses: '16:11-16:36', summary: 'Maná.' }, { number: 7, name: '7ª Aliyá', verses: '17:1-17:16', summary: 'Amalek.' }]
  },
  yitro: {
    id: 'yitro', nameEs: 'Parashat Yitró', nameHe: 'יִתְרוֹ', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 18:1 – 20:23', haftarah: 'Isaías 6:1 – 7:6',
    summary: 'Llegada de Yitró, nombramiento de jueces y la solemne Entrega de la Torá en el Sinaí con los Diez Mandamientos.',
    halachaPoint: 'Cumplimiento de los Diez Mandamientos y la estructura de justicia comunitaria.',
    rashiComment: 'Yitró se unió a Israel al escuchar los grandes milagros de la redención.',
    chasidutThought: 'En el Sinaí se unieron los mundos espirituales y materiales por primera vez en la historia.',
    jasidicLessons: [
      { title: '1. El Consejo de Yitró', snippet: 'Aceptar la sabiduría organizativa y delegar justicia fortalece el liderazgo comunitario.' },
      { title: '2. Acampar como un Solo Hombre', snippet: 'La unidad absoluta del pueblo al pie del monte es requisito previo para recibir la Torá.' },
      { title: '3. El Desierto Neutral', snippet: 'La Torá se entregó en un desierto estéril para enseñar que pertenece a toda la humanidad.' },
      { title: '4. Relámpagos y Voces', snippet: 'Los fenómenos del Sinaí sacudieron la percepción ordinaria de la realidad física.' },
      { title: '5. Yo Soy el Eterno', snippet: 'El primer mandamiento establece la conciencia fundacional de la existencia y libertad divina.' },
      { title: '6. No tendrás Otros Dioses', snippet: 'Desterrar la idolatría exterior e interior reconociendo una única fuente de poder.' },
      { title: '7. La Santidad del Shabat', snippet: 'Recordar el séptimo día como testimonio de la creación y la libertad del hombre.' },
      { title: '8. Ética Interpersonal', snippet: 'Honrar padres, preservar la vida, la familia, la verdad y la integridad patrimonial.' },
      { title: '9. El Temor que Purifica', snippet: 'El temblor reverente ante la revelación asegura que el pecado pierda atractivo.' },
      { title: '10. Altares de Piedra', snippet: 'Erigir altares sencillos sin herramientas talladas, manteniendo la naturalidad ante Dios.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '18:1-18:12', summary: 'Yitró.' }, { number: 2, name: '2ª Aliyá', verses: '18:13-18:27', summary: 'Jueces.' }, { number: 3, name: '3ª Aliyá', verses: '19:1-19:6', summary: 'Llegada.' }, { number: 4, name: '4ª Aliyá', verses: '19:7-19:25', summary: 'Preparación.' }, { number: 5, name: '5ª Aliyá', verses: '20:1-20:14', summary: 'Mandamientos.' }, { number: 6, name: '6ª Aliyá', verses: '20:15-20:23', summary: 'Altares.' }]
  },
  mishpatim: {
    id: 'mishpatim', nameEs: 'Parashat Mishpatim', nameHe: 'מִשְׁפָּטִים', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 21:1 – 24:18', haftarah: 'Jeremías 34:8 – 34:22; 33:25 – 33:26',
    summary: 'Leyes civiles y sociales, ética interpersonal, protección al vulnerable y el compromiso "Hacer y Escuchar".',
    halachaPoint: 'Justicia civil, prohibición de usura, respeto al prójimo y caridad.',
    rashiComment: 'Las leyes civiles se colocaron inmediatamente después de los Diez Mandamientos para mostrar la santidad de la justicia.',
    chasidutThought: 'La ética interpersonal es la prueba más genuina del compromiso profundo con Dios.',
    jasidicLessons: [
      { title: '1. Leyes Civiles Sagradas', snippet: 'Elevar la administración de justicia cotidiana al nivel de cumplimiento divino.' },
      { title: '2. El Siervo Hebreo', snippet: 'Tratar con dignidad y empatía incluso a quienes han perdido su libertad patrimonial.' },
      { title: '3. Protección al Vulnerable', snippet: 'La prohibición estricta de dañar a la viuda, al huérfano y al extranjero.' },
      { title: '4. Honestidad Financiera', snippet: 'Evitar la usura y mantener la escrupulosidad absoluta en los tratos comerciales.' },
      { title: '5. Las Fiestas de Peregrinaje', snippet: 'Estructurar el calendario anual en torno a la gratitud y la conexión espiritual.' },
      { title: '6. El Ángel Guía', snippet: 'Promesa de acompañamiento celestial en el camino hacia la tierra prometida.' },
      { title: '7. Hacer y Escuchar (Naaseh VeNishma)', snippet: 'El compromiso incondicional de aceptar la Torá priorizando la acción sobre la lógica.' },
      { title: '8. El Monte Sinaí', snippet: 'Sellar el pacto mediante la aspersión de la sangre de las ofrendas.' },
      { title: '9. Los Ancianos en la Cima', snippet: 'Contemplar la claridad de la presencia divina sin perder la estabilidad terrenal.' },
      { title: '10. Moshé en la Montaña', snippet: 'Adentrarse en la nube sagrada durante cuarenta días para recibir las tablas de piedra.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:1-21:19', summary: 'Siervos.' }, { number: 2, name: '2ª Aliyá', verses: '21:20-22:3', summary: 'Daños.' }, { number: 3, name: '3ª Aliyá', verses: '22:4-22:26', summary: 'Ética.' }, { number: 4, name: '4ª Aliyá', verses: '22:27-23:5', summary: 'Sociedad.' }, { number: 5, name: '5ª Aliyá', verses: '23:6-23:19', summary: 'Fiestas.' }, { number: 6, name: '6ª Aliyá', verses: '23:20-24:18', summary: 'Pacto.' }]
  },
  terumah: {
    id: 'terumah', nameEs: 'Parashat Terumá', nameHe: 'תְּרוּמָה', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 25:1 – 27:19', haftarah: '1 Reyes 5:26 – 6:13',
    summary: 'Ofrendas para el Santuario (Mishkán), instrucciones detalladas para construir el Arca, la mesa, la menorá y el tabernáculo.',
    halachaPoint: 'Construcción de sinagogas y espacios sagrados comunitarios.',
    rashiComment: 'Cada aporte al Mishkán debía provenir de un corazón generoso y voluntarioso.',
    chasidutThought: 'El Santuario externo refleja el santuario que debemos construir dentro de nuestro propio corazón.',
    jasidicLessons: [
      { title: '1. Ofrendas del Corazón', snippet: 'Dar para lo sagrado transforma el material en un canal de conexión espiritual.' },
      { title: '2. Habiten en Mi Interior', snippet: 'Dios pide construir un santuario no para habitar en paredes, sino dentro de cada persona.' },
      { title: '3. El Arca y las Tablas', snippet: 'El Arca que contiene la Torá y los fragmentos de las tablas rotas juntas.' },
      { title: '4. Los Querubines', snippet: 'Los rostros unidos de los querubines reflejan el amor mutuo entre Dios y Su pueblo.' },
      { title: '5. La Mesa de los Panes', snippet: 'El pan de la proposición simboliza la bendición material sostenida por la espiritualidad.' },
      { title: '6. La Menorá de Oro Puro', snippet: 'Iluminar el espacio con aceite puro representa la difusión constante de sabiduría.' },
      { title: '7. Cortinas y Tapices', snippet: 'Estructurar los mantos protectores que resguardan la santidad del recinto sagrado.' },
      { title: '8. Las Tablas de Madera', snippet: 'Maderas incorruptibles revestidas de oro puro uniendo naturaleza y divinidad.' },
      { title: '9. El Velo Divisor', snippet: 'Delimitar el espacio del Santo de los Santos con respeto reverente.' },
      { title: '10. El Altar Exterior', snippet: 'El lugar donde las ofrendas ascienden en fuego perpetuo hacia lo alto.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:1-25:16', summary: 'Arca.' }, { number: 2, name: '2ª Aliyá', verses: '25:17-25:40', summary: 'Menorá.' }, { number: 3, name: '3ª Aliyá', verses: '26:1-26:30', summary: 'Estructura.' }, { number: 4, name: '4ª Aliyá', verses: '26:31-27:8', summary: 'Altar.' }, { number: 5, name: '5ª Aliyá', verses: '27:9-27:19', summary: 'Atrio.' }]
  },
  tetzaveh: {
    id: 'tetzaveh', nameEs: 'Parashat Tetzavé', nameHe: 'תְּצַוֶּה', sefer: 'Sefer Shemot (Éxodo)', reading: 'Shemot 27:20 – 30:10', haftarah: 'Ezequiel 43:10 – 43:27',
    summary: 'El aceite puro para la Menorá, las vestimentas sagradas de los sacerdotes y la consagración del altar del incienso.',
    halachaPoint: 'Leyes sobre vestimenta ritual y la iluminación continua de la Menorá.',
    rashiComment: 'El nombre de Moshé no aparece explícitamente debido a su frase "Bórrame de tu libro".',
    chasidutThought: 'Las vestimentas sacerdotales elevan la materia corporal del ser humano al servicio divino.',
    jasidicLessons: [
      { title: '1. El Aceite Puro de Oliva', snippet: 'Golpear la aceituna para extraer el aceite más puro simboliza el refinamiento del alma.' },
      { title: '2. La Iluminación Perpetua', snippet: 'Mantener las luces encendidas de forma continua refleja la inspiración constante.' },
      { title: '3. Vestimentas de Gloria', snippet: 'Las ropas de los Kohanim transforman la presencia física en un canal de santidad.' },
      { title: '4. El Efod y las Piedras', snippet: 'Llevar los nombres de las doce tribus sobre los hombros y el corazón con amor.' },
      { title: '5. El Pectoral del Juicio', snippet: 'Las piedras preciosas del Jóshen guiaban las decisiones comunitarias con claridad divina.' },
      { title: '6. Las Campanillas del Manto', snippet: 'El sonido al caminar del sacerdote recordaba la vitalidad y el movimiento espiritual.' },
      { title: '7. La Plancha de Oro', snippet: 'Llevar grabado "Santidad para el Eterno" en la frente consagra los pensamientos.' },
      { title: '8. Consagración Sacerdotal', snippet: 'Los rituales de investidura preparan a los servidores para portar la santidad.' },
      { title: '9. El Altar del Incienso', snippet: 'El incienso aromático simboliza las plegarias puras que ascienden desde el corazón.' },
      { title: '10. Expiación Anual', snippet: 'Purificar el altar periódicamente para mantener la limpieza espiritual del espacio.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '27:20-28:12', summary: 'Aceite.' }, { number: 2, name: '2ª Aliyá', verses: '28:13-28:30', summary: 'Efod.' }, { number: 3, name: '3ª Aliyá', verses: '28:31-28:43', summary: 'Manto.' }, { number: 4, name: '4ª Aliyá', verses: '29:1-29:37', summary: 'Consagración.' }, { number: 5, name: '5ª Aliyá', verses: '29:38-30:10', summary: 'Incienso.' }]
  },
  kitisa: {
    id: 'kitisa', nameEs: 'Parashat Ki Tisá', nameHe: 'כִּי تِשָּׂא', sefer: 'Shemot (Éxodo)', reading: 'Shemot 30:11 – 34:35', haftarah: '1 Reyes 18:1 – 18:39',
    summary: 'El impuesto del medio shيكل, el becerro de oro, la rotura de las tablas y la revelación de los Trece Atributos.',
    halachaPoint: 'Prohibición de la idolatría, observancia del Shabat y el perdón divino.',
    rashiComment: 'Dios le mostró a Moshé los Trece Atributos como fórmula infalible de arrepentimiento.',
    chasidutThought: 'Tras el pecado del becerro de oro, la relación con Dios se profundizó aún más mediante el perdón.',
    jasidicLessons: [
      { title: '1. El Rescate de la Moneda', snippet: 'El medio shيكل de plata unifica a cada individuo en una sola alma colectiva.' },
      { title: '2. El Lavamanos de Bronce', snippet: 'Purificar manos y pies antes de realizar cualquier servicio sagrado.' },
      { title: '3. La Trampa del Becerro', snippet: 'La impaciencia humana ante la aparente ausencia del líder genera ídolos pasajeros.' },
      { title: '4. La Rotura de las Tablas', snippet: 'Moshé rompe las tablas para salvar al pueblo de un juicio lapidario irreversible.' },
      { title: '5. La Tienda de Reunión', snippet: 'Un espacio exterior donde buscar refugio y consejo divino tras la ruptura.' },
      { title: '6. El Rostro de Dios', snippet: 'Moshé pide ver la gloria divina y se le permite contemplar la bondad posterior.' },
      { title: '7. Los Trece Atributos', snippet: 'La proclamación de la misericordia infinita que disuelve los decretos de culpa.' },
      { title: '8. Las Segundas Tablas', snippet: 'Tallar nuevas tablas por iniciativa propia sella el pacto definitivo del perdón.' },
      { title: '9. El Rostro Radiante', snippet: 'La piel de Moshé brilla al reflejar la luz directa de la revelación divina.' },
      { title: '10. Velo de Humildad', snippet: 'Moshé cubre su rostro resplandeciente al dialogar con el pueblo ordinario.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '30:11-30:16', summary: 'Censo.' }, { number: 2, name: '2ª Aliyá', verses: '30:17-31:17', summary: 'Shabat.' }, { number: 3, name: '3ª Aliyá', verses: '31:18-33:11', summary: 'Becerro.' }, { number: 4, name: '4ª Aliyá', verses: '33:12-34:26', summary: 'Atributos.' }, { number: 5, name: '5ª Aliyá', verses: '34:27-34:35', summary: 'Resplandor.' }]
  },
  vayakhel: {
    id: 'vayakhel', nameEs: 'Parashat Vayakhel', nameHe: 'וַיַּקְהֵל', sefer: 'Shemot (Éxodo)', reading: 'Shemot 35:1 – 38:20', haftarah: '1 Reyes 7:13 – 7:26',
    summary: 'Convocatoria del pueblo, recordatorio de las leyes del Shabat y recolección de materiales para construir el Mishkán.',
    halachaPoint: 'Leyes de prohibición de melajot en Shabat vinculadas a la construcción del Tabernáculo.',
    rashiComment: 'El Shabat precede al trabajo del Mishkán para enseñar que la creación no anula el descanso.',
    chasidutThought: 'El Shabat aporta la energía espiritual y el reposo necesario para santificar toda la semana.',
    jasidicLessons: [
      { title: '1. Congregación Comunitaria', snippet: 'Unir a la comunidad antes de iniciar la obra sagrada del Tabernáculo.' },
      { title: '2. El Fuego en Shabat', snippet: 'La prohibición de encender fuego en Shabat enseña el dominio sobre la agitación interior.' },
      { title: '3. Corazones Generosos', snippet: 'Cada artesano aporta su talento impulsado por una profunda inspiración voluntaria.' },
      { title: '4. El Exceso de Materiales', snippet: 'El pueblo trajo tanto material para el Mishkán que las autoridades pidieron detenerlo.' },
      { title: '5. Las Manos Sabias', snippet: 'Bezalel y Oholiab diseñan la obra imbuidos de sabiduría divina y destreza artística.' },
      { title: '6. Cortinas de Pieles', snippet: 'Superponer capas protectoras para resguardar la santidad interior del recinto.' },
      { title: '7. Los Arpones y Bases', snippet: 'Sostener la estructura pesada sobre bases firmes de plata pura.' },
      { title: '8. El Altar del Incienso', snippet: 'Forrar de oro puro el altar donde se queman las especias aromáticas.' },
      { title: '9. El Aceite para el Alumbrado', snippet: 'Preparar los elementos necesarios para mantener la llama encendida.' },
      { title: '10. El Atrio Perimetral', snippet: 'Delimitar el espacio sagrado mediante columnas y cortinas de lino fino.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '35:1-36:4', summary: 'Shabat.' }, { number: 2, name: '2ª Aliyá', verses: '36:5-36:19', summary: 'Trabajos.' }, { number: 3, name: '3ª Aliyá', verses: '36:20-37:16', summary: 'Arca.' }, { number: 4, name: '4ª Aliyá', verses: '37:17-38:20', summary: 'Atrio.' }]
  },
  pekudei: {
    id: 'pekudei', nameEs: 'Parashat Pekudei', nameHe: 'פְּקוּדֵי', sefer: 'Shemot (Éxodo)', reading: 'Shemot 38:21 – 40:38', haftarah: '1 Reyes 7:40 – 7:50',
    summary: 'Inventario de los materiales del Mishkán, ensamblaje final de la estructura y la bajada de la Presencia Divina.',
    halachaPoint: 'Transparencia financiera y rendición de cuentas en fondos comunitarios.',
    rashiComment: 'Moshé rindió cuentas exactas de cada metal recolectado para dar ejemplo de integridad.',
    chasidutThought: 'Cuando el ser humano purifica sus actos, la gloria divina reposa de forma tangible dentro de él.',
    jasidicLessons: [
      { title: '1. Transparencia Absoluta', snippet: 'Rendir cuentas claras de cada recurso público evita sospechas y fortalece la confianza.' },
      { title: '2. Las Vestimentas Confeccionadas', snippet: 'Entregar las ropas sacerdotales terminadas para la inauguración oficial.' },
      { title: '3. Inspección de Moshé', snippet: 'Moshé revisa la obra y bendice al pueblo al constatar que se hizo tal como Dios ordenó.' },
      { title: '4. El Primer Día del Año', snippet: 'Montar el Tabernáculo en Rosh Chodésh Nisán marca un renacimiento cósmico.' },
      { title: '5. Colocación de los Utensilios', snippet: 'Disponer cada elemento sagrado en su sitio exacto según la instrucción celestial.' },
      { title: '6. La Unción Sagrada', snippet: 'Ungir el Tabernáculo y los altares con aceite santo para separarlos de lo mundano.' },
      { title: '7. La Nube de Gloria', snippet: 'Una densa nube cubre la tienda de reunión evidenciando la presencia de Dios.' },
      { title: '8. La Morada Divina', snippet: 'La gloria del Eterno llena por completo el espacio santificado por el hombre.' },
      { title: '9. Guía en el Desierto', snippet: 'La nube de día y el fuego de noche dirigen cada movimiento del campamento.' },
      { title: '10. Conclusión del Éxodo', snippet: 'Finaliza el libro de Éxodo consolidando al pueblo como nación consagrada.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '38:21-39:1', summary: 'Inventario.' }, { number: 2, name: '2ª Aliyá', verses: '39:2-39:21', summary: 'Vestimentas.' }, { number: 3, name: '3ª Aliyá', verses: '39:22-39:43', summary: 'Inspección.' }, { number: 4, name: '4ª Aliyá', verses: '40:1-40:38', summary: 'Montaje.' }]
  },

  // --- SEFER VAYIKRA ---
  vayikra: {
    id: 'vayikra', nameEs: 'Parashat Vayikrá', nameHe: 'וַיִּקְרָא', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 1:1 – 5:26', haftarah: 'Isaías 43:21 – 44:23',
    summary: 'Leyes detalladas sobre los sacrificios (Olah, Minjá, Shelamim, Jatat y Asham) ofrecidos en el Tabernáculo.',
    halachaPoint: 'Proceso de arrepentimiento y expiación mediante ofrendas y el compromiso interior.',
    rashiComment: 'El llamado "Vayikrá" denota afecto y cercanía divina hacia Moshé.',
    chasidutThought: 'Ofrecer un sacrificio simboliza entregar los instintos animales propios al servicio del Creador.',
    jasidicLessons: [
      { title: '1. El Llamado de Afecto', snippet: 'Vayikrá con la alef final muestra la humildad y el amor con que Dios se dirige al hombre.' },
      { title: '2. La Ofrenda de Uno Mismo', snippet: 'El sacrificio (Korban) significa acercarse a Dios entregando las pasiones materiales.' },
      { title: '3. El Olah de Ascensión', snippet: 'Entregar un animal que se consume íntegramente en el fuego simboliza la entrega total.' },
      { title: '4. La Ofrenda Vegetal (Minjá)', snippet: 'Incluso la humilde harina del pobre es recibida con aroma grato ante el Eterno.' },
      { title: '5. Sacrificio de Paz (Shelamim)', snippet: 'Compartir la carne entre el altar, los sacerdotes y el oferente genera unión familiar.' },
      { title: '6. Expiación por Error (Jatat)', snippet: 'Reconocer las faltas involuntarias para restaurar la armonía espiritual con el Creador.' },
      { title: '7. El Arrepentimiento Sincero', snippet: 'La ofrenda debe ir acompañada de un cambio genuino de conducta.' },
      { title: '8. Ofrenda por Culpa (Asham)', snippet: 'Restituir el daño causado a otro antes de buscar el perdón celestial.' },
      { title: '9. La Opción del Pobre', snippet: 'La Torá adapta los requisitos de expiación según las posibilidades económicas de cada cual.' },
      { title: '10. Pureza en el Santuario', snippet: 'Mantener limpios los canales de comunicación espiritual mediante la expiación.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:13', summary: 'Olah.' }, { number: 2, name: '2ª Aliyá', verses: '1:14-2:16', summary: 'Minjá.' }, { number: 3, name: '3ª Aliyá', verses: '3:1-3:17', summary: 'Shelamim.' }, { number: 4, name: '4ª Aliyá', verses: '4:1-4:26', summary: 'Jatat.' }, { number: 5, name: '5ª Aliyá', verses: '4:27-5:10', summary: 'Particulares.' }, { number: 6, name: '6ª Aliyá', verses: '5:11-5:26', summary: 'Asham.' }]
  },
  tzav: {
    id: 'tzav', nameEs: 'Parashat Tzav', nameHe: 'צַו', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 6:1 – 8:36', haftarah: 'Jeremías 7:21 – 8:3; 9:22 – 9:23',
    summary: 'Instrucciones para los sacerdotes sobre el mantenimiento del fuego en el altar y la investidura de Aarón.',
    halachaPoint: 'Leyes sobre el fuego perpetuo en el altar y la prohibición de consumir sangre o grasa.',
    rashiComment: 'La orden "Tzav" denota urgencia y compromiso en deberes que implican devoción.',
    chasidutThought: 'El fuego en el altar espiritual interior nunca debe apagarse, ardiendo con entusiasmo constante.',
    jasidicLessons: [
      { title: '1. El Fuego Perpetuo', snippet: 'La llama sobre el altar no debe apagarse jamás; simboliza la pasión continua por lo sagrado.' },
      { title: '2. Las Cenizas de la Mañana', snippet: 'Retirar las cenizas del día anterior es el primer paso para encender nuevas inspiraciones.' },
      { title: '3. La Ley de la Minjá', snippet: 'El sacerdote ofrece una porción que se consume totalmente consagrada a Dios.' },
      { title: '4. Acción de Gracias (Todá)', snippet: 'Ofrecer sacrificios de gratitud acompañados de panes especiales tras superar peligros.' },
      { title: '5. La Prohibición de la Grasa', snippet: 'Reservar lo mejor y más selecto exclusivamente para el fuego sagrado del altar.' },
      { title: '6. Comer con Pureza', snippet: 'Las reglas estrictas sobre el tiempo y estado de pureza al consumir las sagradas carnes.' },
      { title: '7. Consagración de Aarón', snippet: 'Vestir y ungir solemnemente a los sacerdotes para inaugurar sus funciones.' },
      { title: '8. Siete Días en la Puerta', snippet: 'Permanecer recluidos en la entrada del Mishkán preparándose espiritualmente.' },
      { title: '9. La Presencia Divina Manifiesta', snippet: 'El fuego desciende del cielo para consumir las ofrendas ante todo el pueblo.' },
      { title: '10. Obediencia Íntegra', snippet: 'Cumplir cada detalle de la ley sacerdotal con exactitud y devoción.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '6:1-6:11', summary: 'Fuego.' }, { number: 2, name: '2ª Aliyá', verses: '6:12-7:10', summary: 'Minjá.' }, { number: 3, name: '3ª Aliyá', verses: '7:11-7:38', summary: 'Todá.' }, { number: 4, name: '4ª Aliyá', verses: '8:1-8:36', summary: 'Investidura.' }]
  },
  shemini: {
    id: 'shemini', nameEs: 'Parashat Sheminí', nameHe: 'שְׁמִינִי', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 9:1 – 11:47', haftarah: '2 Samuel 6:1 – 7:17',
    summary: 'Inauguración del Tabernáculo, muerte trágica de Nadav y Avihú, y leyes de animales kosher y no kosher.',
    halachaPoint: 'Leyes de Kashrut sobre animales terrestres, aves y peces permitidos.',
    rashiComment: 'Nadav y Avihú fallecieron por acercarse a Dios con fuego extraño no autorizado.',
    chasidutThought: 'El entusiasmo espiritual desprovisto de disciplina halájica puede ser peligroso para el alma.',
    jasidicLessons: [
      { title: '1. El Octavo Día', snippet: 'El número ocho trasciende el orden natural de los siete días de la creación.' },
      { title: '2. La Tragedia de Nadav', snippet: 'El exceso de cercanía mística sin sujeción a la ley genera un desborde espiritual fatal.' },
      { title: '3. Silencio y Aceptación', snippet: 'Aarón enmudece ante la pérdida, aceptando la justicia divina con profunda serenidad.' },
      { title: '4. Consuelo a los Duelos', snippet: 'Moshé instruye con sensibilidad sobre las normativas tras el dolor familiar.' },
      { title: '5. Separar lo Sagrado', snippet: 'La misión del sacerdote es discernir y enseñar la diferencia entre lo impuro y lo puro.' },
      { title: '6. Animales Kosher', snippet: 'Las señales de pezuña hendida y rumiar simbolizan el refinamiento de la conducta.' },
      { title: '7. Peces con Aletas', snippet: 'Las aletas y escamas como marcas de protección espiritual en el agua.' },
      { title: '8. Aves Permitidas', snippet: 'Distinguir las aves rapaces de aquellas aptas para el consumo según la tradición.' },
      { title: '9. Fuentes de Pureza', snippet: 'Las aguas de la Mikve o fuentes naturales limpian las contaminaciones rituales.' },
      { title: '10. Santidad Cotidiana', snippet: 'Las leyes de kashrut transforman el acto de comer en un ejercicio constante de santidad.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '9:1-9:23', summary: 'Inauguración.' }, { number: 2, name: '2ª Aliyá', verses: '10:1-10:20', summary: 'Nadav.' }, { number: 3, name: '3ª Aliyá', verses: '11:1-11:32', summary: 'Terrestres.' }, { number: 4, name: '4ª Aliyá', verses: '11:33-11:47', summary: 'Aves.' }]
  },
  tazria: {
    id: 'tazria', nameEs: 'Parashat Tazria', nameHe: 'תַזְרִיעַ', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 12:1 – 13:59', haftarah: '2 Reyes 4:42 – 5:19',
    summary: 'Leyes de pureza tras el parto y diagnóstico de la afección espiritual y física conocida como Tzaarat.',
    halachaPoint: 'Leyes de pureza familiar y la prohibición de hablar mal (Lashon hará) asociada a la Tzaarat.',
    rashiComment: 'La Tzaarat afectaba casas, ropas y pieles como advertencia espiritual por el egoísmo.',
    chasidutThought: 'El cuidado de las palabras es fundamental para mantener la sanidad del alma y la comunidad.',
    jasidicLessons: [
      { title: '1. El Milagro del Nacimiento', snippet: 'Traer nueva vida al mundo renueva la energía espiritual de toda la familia.' },
      { title: '2. El Brit en el Octavo Día', snippet: 'Sellar la alianza física en el octavo día conecta al infante con la eternidad.' },
      { title: '3. El Diagnóstico del Sacerdote', snippet: 'Solo un Kohén capacitado puede discernir las afecciones y guiar la purificación.' },
      { title: '4. La Mancha en la Piel', snippet: 'La Tzaarat externaliza en el cuerpo las dolencias y egoísmos del fuero interno.' },
      { title: '5. El Aislamiento Temporal', snippet: 'Retirarse del campamento invita a la reflexión y al arrepentimiento personal.' },
      { title: '6. Cambios en las Vestimentas', snippet: 'Las manchas en la ropa alertan sobre la falsencia en la apariencia exterior.' },
      { title: '7. Tzaarat en las Casas', snippet: 'Incluso los hogares pueden manifestar desequilibrios éticos en su estructura.' },
      { title: '8. El Proceso de Sanación', snippet: 'La enfermedad no es un castigo definitivo, sino un llamado a la corrección.' },
      { title: '9. Cuidado del Habla', snippet: 'Vigilar la lengua previene los daños relacionales que erosionan la sociedad.' },
      { title: '10. Esperanza de Retorno', snippet: 'Toda impureza ritual porta en sí misma el protocolo exacto para retornar a la luz.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '12:1-12:8', summary: 'Parto.' }, { number: 2, name: '2ª Aliyá', verses: '13:1-13:17', summary: 'Tzaarat.' }, { number: 3, name: '3ª Aliyá', verses: '13:18-13:28', summary: 'Inflamaciones.' }, { number: 4, name: '4ª Aliyá', verses: '13:29-13:59', summary: 'Ropas.' }]
  },
  metzora: {
    id: 'metzora', nameEs: 'Parashat Metzorá', nameHe: 'מְצֹרָע', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 14:1 – 15:33', haftarah: '2 Reyes 7:3 – 7:20',
    summary: 'Proceso de purificación del Metzorá, leyes de higiene y flujos corporales de pureza familiar.',
    halachaPoint: 'Leyes de pureza ritual, salud comunitaria y la santidad del hogar.',
    rashiComment: 'El pájaro purificador simboliza la humildad necesaria para curarse del orgullo.',
    chasidutThought: 'La purificación implica un renacimiento espiritual tras corregir los errores interpersonales.',
    jasidicLessons: [
      { title: '1. El Retorno del Marginado', snippet: 'El sacerdote sale al exterior del campamento para recibir al enfermo ya sanado.' },
      { title: '2. Los Dos Pájaros', snippet: 'Uno liberado hacia el campo abierto y otro sacrificado muestran la dualidad de la cura.' },
      { title: '3. Agua Viva', snippet: 'El uso de agua de manantial simboliza la renovación total de la energía vital.' },
      { title: '4. El Afeitado Completo', snippet: 'Despojarse de todo rastro anterior para reiniciar el camino con absoluta humildad.' },
      { title: '5. La Ofrenda de Reintegración', snippet: 'Aceite y cordero para sellar el retorno formal a la comunidad sagrada.' },
      { title: '6. Limpieza de las Casas', snippet: 'Derribar o raspar las paredes afectadas en las viviendas de la tierra prometida.' },
      { title: '7. Higiene y Prevención', snippet: 'La Torá establece rigurosas pautas de salud pública e inspección sanitaria.' },
      { title: '8. Flujos Corporales', snippet: 'Las leyes sobre pureza e impureza corporal conectan la biología con la espiritualidad.' },
      { title: '9. El Baño en la Mikve', snippet: 'Sumergirse en agua pura restablece el acceso al espacio sagrado del Templo.' },
      { title: '10. Armonía Conyugal', snippet: 'Cuidar los ciclos de pureza familiar fortalece el amor y la estabilidad del hogar.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '14:1-14:20', summary: 'Purificación.' }, { number: 2, name: '2ª Aliyá', verses: '14:21-14:32', summary: 'Recursos.' }, { number: 3, name: '3ª Aliyá', verses: '14:33-14:57', summary: 'Casas.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:33', summary: 'Flujos.' }]
  },
  achreimot: {
    id: 'achreimot', nameEs: 'Parashat Ajaréi Mot', nameHe: 'אַחֲרֵי מוֹת', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 16:1 – 18:30', haftarah: 'Ezequiel 22:1 – 22:19',
    summary: 'Servicio de Iom Kipur en el Templo, prohibición de consumir sangre y leyes de relaciones familiares prohibidas.',
    halachaPoint: 'Leyes de Yom Kipur, prohibiciones alimentarias estrictas y moral familiar.',
    rashiComment: 'La muerte de los hijos de Aarón se recuerda en Kipur para mostrar su expiación.',
    chasidutThought: 'Kipur eleva al ser humano al nivel espiritual de los ángeles mediante el ayuno y la introspección.',
    jasidicLessons: [
      { title: '1. Tras la Tragedia', snippet: 'El servicio de Kipur se instaura recordando los límites sagrados del encuentro con Dios.' },
      { title: '2. El Santo de los Santos', snippet: 'Solo una vez al año, el Sumo Sacerdote ingresa al lugar más recóndito del Templo.' },
      { title: '3. Los Dos Chivos', snippet: 'Uno consagrado a Dios y otro enviado a Azazel cargando los pecados del pueblo.' },
      { title: '4. El Incienso Protector', snippet: 'La nube de incienso en el sancta sanctorum protege al sacerdote de la luz cegadora.' },
      { title: '5. Aflicción del Alma', snippet: 'Ayunar y abstenerse de placeres físicos permite sintonizar con la dimensión angélica.' },
      { title: '6. Unidad en el Perdón', snippet: 'El día expía colectivamente las faltas de toda la nación unida.' },
      { title: '7. El Santuario Purificado', snippet: 'Limpiar las impurezas acumuladas en el Templo durante todo el año.' },
      { title: '8. La Santidad de la Sangre', snippet: 'Prohibir el consumo de sangre enseña que la vida pertenece al Creador.' },
      { title: '9. Moral y Pureza Familiar', snippet: 'Establecer límites estrictos en las relaciones para salvaguardar la santidad del hogar.' },
      { title: '10. No imitar costumbres', snippet: 'Vivir conforme a los estándares morales elevados que la Torá prescribe.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:1-16:17', summary: 'Kipur.' }, { number: 2, name: '2ª Aliyá', verses: '16:18-16:34', summary: 'Chivos.' }, { number: 3, name: '3ª Aliyá', verses: '17:1-17:16', summary: 'Sangre.' }, { number: 4, name: '4ª Aliyá', verses: '18:1-18:30', summary: 'Moral.' }]
  },
  kedoshim: {
    id: 'kedoshim', nameEs: 'Parashat Kedoshim', nameHe: 'קְדֹשִׁים', sefer: 'Vayikrá (Levítico)', reading: 'Vayikrá 19:1 – 20:27', haftarah: 'Amós 9:7 – 9:15',
    summary: 'Mandato de santidad, el precepto central "Amarás a tu prójimo como a ti mismo", leyes éticas y justicia.',
    halachaPoint: 'Ética social, prohibición de venganza, honestidad comercial y amor al prójimo.',
    rashiComment: 'La santidad se logra absteniéndose de lo permitido en exceso y elevando lo cotidiano.',
    chasidutThought: '"Amar a tu prójimo como a ti mismo" es la regla fundamental y abarcadora de toda la Torá.',
    jasidicLessons: [
      { title: '1. Sed Santos', snippet: 'La orden de santidad se dirige a toda la congregación, no solo a una élite espiritual.' },
      { title: '2. Honra a los Padres', snippet: 'Respetar a los padres y cuidar el Shabat como pilares de la estabilidad social.' },
      { title: '3. Dejar para el Pobre', snippet: 'Dejar los márgenes de la cosecha para el desvalido enseña generosidad institucional.' },
      { title: '4. Honestidad Comercial', snippet: 'Usar pesas y medidas justas en el mercado como expresión de honradez religiosa.' },
      { title: '5. No Retener el Salario', snippet: 'Pagar al jornalero a su debido tiempo protege la dignidad del trabajador.' },
      { title: '6. Respeto al Sordo y Ciego', snippet: 'No poner tropiezo ante el ciego simboliza la empatía hacia cualquier vulnerabilidad.' },
      { title: '7. Prohibición del Chisme', snippet: 'No andar de chismoso entre tu pueblo para evitar destruir la paz social.' },
      { title: '8. El Amor al Prójimo', snippet: 'La regla de oro formulada por Hillel y Akiva como resumen de la ley divina.' },
      { title: '9. Respeto a los Ancianos', snippet: 'Ponerse de pie ante las canas honra la sabiduría acumulada de los mayores.' },
      { title: '10. Leyes de Integridad', snippet: 'Mantener la pureza ética en cada rincón de la vida diaria.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '19:1-19:14', summary: 'Santidad.' }, { number: 2, name: '2ª Aliyá', verses: '19:15-19:32', summary: 'Prójimo.' }, { number: 3, name: '3ª Aliyá', verses: '19:33-20:27', summary: 'Castigos.' }]
  },
  emor: {
    id: 'emor', nameEs: 'Parashat Emor', nameHe: 'אֱמֹר', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 21:1 – 24:23', haftarah: 'Ezequiel 44:15 – 44:31',
    summary: 'Normas para los Kohanim, el calendario de las Festividades sagradas y las leyes de la Menorá.',
    halachaPoint: 'Leyes de festividades judías, prohibición de trabajar en Moed y santificación del tiempo.',
    rashiComment: 'Las festividades son proclamadas por el tribunal judío terrenal santificando el calendario.',
    chasidutThought: 'El tiempo sagrado nos permite trascender la rutina material conectando con la eternidad.',
    jasidicLessons: [
      { title: '1. Pureza Sacerdotal', snippet: 'Los sacerdotes deben cuidarse de la impureza ritual para preservar su cercanía al altar.' },
      { title: '2. Defectos Físicos', snippet: 'Las exigencias estéticas y corporales simbolizan la integridad del servicio espiritual.' },
      { title: '3. Las Siete Festividades', snippet: 'El ciclo de las Moedim marca las estaciones del encuentro sagrado con Dios.' },
      { title: '4. Pésaj y la gavilla', snippet: 'Ofrecer el primer fruto de la cosecha cebada consagrando el inicio de la primavera.' },
      { title: '5. La Cuenta del Omer', snippet: 'Contar cada día entre Pésaj y Shavuot refina el carácter paso a paso.' },
      { title: '6. Shavuot y los Panes', snippet: 'Presentar dos panes leudados agradeciendo la entrega de la Torá.' },
      { title: '7. Rosh Hashaná y el Shofar', snippet: 'El sonido del cuerno despierta el alma hacia el juicio y la renovación.' },
      { title: '8. Iom Kipur', snippet: 'El día solemne de expiación y conexión total con la misericordia.' },
      { title: '9. Sucot y las Cuatro Especies', snippet: 'Unir las plantas que representan los distintos tipos de judíos en alegre celebración.' },
      { title: '10. La Llama Continua', snippet: 'Cuidar el aceite puro de la Menorá y los panes de la proposición.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:1-21:24', summary: 'Kohanim.' }, { number: 2, name: '2ª Aliyá', verses: '22:1-22:16', summary: 'Consumo.' }, { number: 3, name: '3ª Aliyá', verses: '22:17-23:44', summary: 'Festividades.' }, { number: 4, name: '4ª Aliyá', verses: '24:1-24:23', summary: 'Menorá.' }]
  },
  behar: {
    id: 'behar', nameEs: 'Parashat Behar', nameHe: 'בְּהַר', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 25:1 – 26:2', haftarah: 'Jeremías 32:6 – 32:27',
    summary: 'Leyes del año sabático (Shmitá) para la tierra de Israel y el año de Jubileo (Yovel), prohibición de la usura.',
    halachaPoint: 'Fe en la providencia divina mediante el descanso de la tierra agrícola cada siete años.',
    rashiComment: '¿Qué relación tiene el Shmitá con el Monte Sinaí? Todas las leyes fueron entregadas allí.',
    chasidutThought: 'El descanso de la tierra enseña que el mundo pertenece al Creador y no al ego humano.',
    jasidicLessons: [
      { title: '1. El Shmitá en el Sinaí', snippet: 'Demostrar confianza absoluta dejando descansar la tierra agrícola cada séptimo año.' },
      { title: '2. La Abundancia del Sexto Año', snippet: 'Dios promete una cosecha triple para sostener al pueblo durante el año sabático.' },
      { title: '3. El Año de Jubileo (Yovel)', snippet: 'Cada cincuenta años las tierras retornan a sus dueños originales y los esclavos se liberan.' },
      { title: '4. Honestidad en los Precios', snippet: 'No engañar al prójimo al comprar o vender propiedades vinculadas al ciclo del Yovel.' },
      { title: '5. Prohibición de la Usura', snippet: 'Prestar dinero sin cobrar intereses apoya la solidaridad fraternal.' },
      { title: '6. La Tierra es Mía', snippet: 'Recordar que los seres humanos somos simples inquilinos temporales en el mundo.' },
      { title: '7. Rescate de Esclavos', snippet: 'Facilitar la liberación temprana de quien debió venderse por necesidad.' },
      { title: '8. Prohibición de Idolos', snippet: 'Guardar el Shabat y rechazar imágenes esculpidas como garantía de libertad.' },
      { title: '9. Bendición en la Práctica', snippet: 'Cumplir los decretos económicos atrae paz y seguridad territorial.' },
      { title: '10. Confianza Ciega', snippet: 'Sostener la fe en que la providencia cuida de quienes observan Sus leyes.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:1-25:13', summary: 'Shmitá.' }, { number: 2, name: '2ª Aliyá', verses: '25:14-25:38', summary: 'Yovel.' }, { number: 3, name: '3ª Aliyá', verses: '25:39-26:2', summary: 'Liberación.' }]
  },
  bejukotai: {
    id: 'bejukotai', nameEs: 'Parashat Bejukotai', nameHe: 'בְּחֻקֹּתַי', sefer: 'Sefer Vayikrá (Levítico)', reading: 'Vayikrá 26:3 – 27:34', haftarah: 'Jeremías 16:19 – 17:14',
    summary: 'Bendiciones por cumplir la Torá, advertencias (Tojaja) por apartarse de ella y leyes de valuación de ofrendas.',
    halachaPoint: 'Cumplimiento de mitzvot y la promesa de prosperidad espiritual y material.',
    rashiComment: 'Las bendiciones prometen paz y seguridad cuando se estudia Torá con dedicación.',
    chasidutThought: 'Las dificultades descritas en la admonición son llamados celestiales para retornar a la esencia.',
    jasidicLessons: [
      { title: '1. Caminar en los Estatutos', snippet: 'Esforzarse con pasión en el estudio profundo de la sabiduría divina.' },
      { title: '2. Lluvias a su Tiempo', snippet: 'La naturaleza responde armónicamente al compromiso espiritual de la sociedad.' },
      { title: '3. Paz en la Tierra', snippet: 'Vivir sin temor a enemigos externos gracias a la protección providencial.' },
      { title: '4. La Presencia en Medio', snippet: 'Dios paseará en medio del campamento de Israel como signo de cercanía íntima.' },
      { title: '5. Las Advertencias (Tojaja)', snippet: 'Los momentos de crisis colectiva reflejan un distanciamiento de los valores superiores.' },
      { title: '6. Siete Veces más Castigo', snippet: 'El ciclo de correcciones busca despertar el arrepentimiento antes del colapso.' },
      { title: '7. La Humillación del Corazón', snippet: 'Reconocer los errores propios abre la puerta a la reconciliación con Dios.' },
      { title: '8. El Pacto Perpetuo', snippet: 'Dios nunca abandonará a Su pueblo ni invalidará Su alianza eterna.' },
      { title: '9. Valuación de Votos', snippet: 'Consagrar bienes al Templo según la tasación justa establecida por la ley.' },
      { title: '10. El Diezmo de los Animales', snippet: 'Separar el décimo animal como ofrenda sagrada para cerrar el libro de Vayikrá.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '26:3-26:13', summary: 'Bendiciones.' }, { number: 2, name: '2ª Aliyá', verses: '26:14-26:46', summary: 'Tojaja.' }, { number: 3, name: '3ª Aliyá', verses: '27:1-27:34', summary: 'Valuaciones.' }]
  },

  // --- SEFER BAMIDBAR ---
  bamidbar: {
    id: 'bamidbar', nameEs: 'Parashat Bamidbar', nameHe: 'בְּמִדְבַּר', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 1:1 – 4:20', haftarah: 'Oseas 2:1 – 2:22',
    summary: 'Censo del pueblo de Israel en el desierto, distribución de las tribus alrededor del Tabernáculo y funciones de los levitas.',
    halachaPoint: 'Organización comunitaria y el valor de cada individuo contado en el censo.',
    rashiComment: 'Dios cuenta al pueblo constantemente por el profundo amor que les tiene.',
    chasidutThought: 'Cada persona ocupa un lugar irremplazable en la estructura espiritual del pueblo judío.',
    jasidicLessons: [
      { title: '1. El Censo por Amor', snippet: 'Ser contados por Dios demuestra el valor único y sagrado de cada alma.' },
      { title: '2. En el Desierto', snippet: 'La Torá se entrega en un paraje desolado para enseñar la apertura total a lo alto.' },
      { title: '3. Estandartes Tribales', snippet: 'Cada tribu despliega su bandera específica con identidad y misión propia.' },
      { title: '4. Alrededor del Mishkán', snippet: 'El Tabernáculo en el centro organiza la vida social y espiritual de la nación.' },
      { title: '5. El Rol de los Levitas', snippet: 'La tribu de Leví se consagra al cuidado del recinto sagrado en lugar de los primogénitos.' },
      { title: '6. Censo de Guershon, Kehat y Merari', snippet: 'Distribuir las responsabilidades técnicas del transporte del Tabernáculo.' },
      { title: '7. Redención de Primogénitos', snippet: 'Sustituir a los primeros hijos por los levitas mediante un rescate simbólico.' },
      { title: '8. Orden y Disciplina', snippet: 'El campamento avanza y acampa con precisión geométrica y armonía.' },
      { title: '9. Protección Divina', snippet: 'La nube y los estandartes aseguran el resguardo en el camino hostil.' },
      { title: '10. Preparados para la Marcha', snippet: 'El pueblo se alista para iniciar el tránsito hacia la tierra prometida.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:54', summary: 'Censo.' }, { number: 2, name: '2ª Aliyá', verses: '2:1-2:34', summary: 'Campamento.' }, { number: 3, name: '3ª Aliyá', verses: '3:1-3:39', summary: 'Levitas.' }, { number: 4, name: '4ª Aliyá', verses: '3:40-4:20', summary: 'Kehat.' }]
  },
  nasso: {
    id: 'nasso', nameEs: 'Parashat Nasó', nameHe: 'נָשֹׂא', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 4:21 – 7:89', haftarah: 'Jueces 13:2 – 13:25',
    summary: 'Censo de clanes levitas, leyes del Nazir, la Bendición Sacerdotal y ofrendas de los príncipes tribales.',
    halachaPoint: 'La Bendición Sacerdotal diaria y la disciplina del Nazir.',
    rashiComment: 'La bendición de los Kohanim se imparte con amor incondicional hacia todo el pueblo.',
    chasidutThought: 'La bendición divina desciende sobre el pueblo cuando existe unidad y hermandad en la comunidad.',
    jasidicLessons: [
      { title: '1. Censo de Guershon y Merari', snippet: 'Asignar tareas específicas a cada clan levita para el traslado del santuario.' },
      { title: '2. Expulsión de Impuros', snippet: 'Retirar temporalmente del campamento a quienes portan impurezas para cuidar la salud.' },
      { title: '3. Restitución por Fraude', snippet: 'Confesar el error y devolver lo indebido antes de buscar el perdón celestial.' },
      { title: '4. La Sotá y la Paz', snippet: 'El ritual para disipar celos y restaurar la armonía y confianza en el matrimonio.' },
      { title: '5. El Voto del Nazir', snippet: 'Abstenerse de vino y corte de cabello para alcanzar un nivel superior de santidad.' },
      { title: '6. La Bendición Sacerdotal', snippet: 'Los Kohanim canalizan la paz, la gracia y la luz divina directamente sobre el pueblo.' },
      { title: '7. Rostro Resplandeciente', snippet: 'Que Dios haga resplandecer Su rostro sobre ti como signo de amor íntimo.' },
      { title: '8. Concesión de Paz', snippet: 'La bendición culmina otorgando la paz integral (Shalom) como suprema culminación.' },
      { title: '9. Las Ofrendas de los Príncipes', snippet: 'Cada líder tribal aporta carretas y bueyes para el transporte del Mishkán.' },
      { title: '10. Dedicación Igualitaria', snippet: 'Aunque los príncipes trajeron idénticas ofrendas, cada día se detalla con amor propio.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '4:21-4:49', summary: 'Clanes.' }, { number: 2, name: '2ª Aliyá', verses: '5:1-5:10', summary: 'Impuros.' }, { number: 3, name: '3ª Aliyá', verses: '5:11-6:27', summary: 'Nazir.' }, { number: 4, name: '4ª Aliyá', verses: '7:1-7:89', summary: 'Príncipes.' }]
  },
  behaalotecha: {
    id: 'behaalotecha', nameEs: 'Parashat Behaalotejá', nameHe: 'בְּהַעֲלֹתְךָ', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 8:1 – 12:16', haftarah: 'Zacarías 2:14 – 4:7',
    summary: 'Encendido de la Menorá, consagración de levitas, segundo Pésaj y las quejas del pueblo por la carne.',
    halachaPoint: 'Leyes de Pésaj Sheni y el cuidado al hablar de los demás (caso de Miriam).',
    rashiComment: 'Nunca es tarde para cumplir una mitzvá, de ahí el concepto de Pésaj Sheni.',
    chasidutThought: 'La luz de la Menorá irradia hacia afuera iluminando y transformando la oscuridad del mundo.',
    jasidicLessons: [
      { title: '1. Elevar la Llama', snippet: 'Encender la Menorá hasta que la llama ascienda por sí misma sin ayuda externa.' },
      { title: '2. Las Trompetas de Plata', snippet: 'Tocar las trompetas convoca a la congregación y moviliza al campamento.' },
      { title: '3. La Partida del Sinaí', snippet: 'El pueblo inicia la marcha siguiendo la guía de la nube divina.' },
      { title: '4. El Segundo Pésaj', snippet: 'Una segunda oportunidad para cumplir la ofrenda pascual a quienes estaban impuros.' },
      { title: '5. Quejas por el Maná', snippet: 'Añorar la comida de Egipto muestra la dificultad de superar la mentalidad de esclavitud.' },
      { title: '6. Los Setenta Ancianos', snippet: 'Moshé comparte el espíritu de liderazgo con setenta sabios del pueblo.' },
      { title: '7. El Viento de Codornices', snippet: 'Proveer carne en abundancia ante la insistencia material del pueblo.' },
      { title: '8. Eldad y Medad', snippet: 'Profetizar dentro del campamento demostrando que el espíritu divino no se encasilla.' },
      { title: '9. El Error de Miriam', snippet: 'Hablar sobre Moshé sin malicia pero olvidando la singularidad de su profecía.' },
      { title: '10. La Peste y la Súplica', snippet: 'Moshé ruega con una breve y conmovedora oración por la sanación de su hermana.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '8:1-8:26', summary: 'Menorá.' }, { number: 2, name: '2ª Aliyá', verses: '9:1-9:14', summary: 'Pésaj Sheni.' }, { number: 3, name: '3ª Aliyá', verses: '9:15-10:10', summary: 'Nube.' }, { number: 4, name: '4ª Aliyá', verses: '10:11-11:29', summary: 'Quejas.' }, { number: 5, name: '5ª Aliyá', verses: '11:30-12:16', summary: 'Miriam.' }]
  },
  shelach: {
    id: 'shelach', nameEs: 'Parashat Shelaj Lejá', nameHe: 'שְׁלַח-לְךָ', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 13:1 – 15:41', haftarah: 'Josué 2:1 – 2:24',
    summary: 'Envío de los doce espías, informe negativo, decreto de 40 años en el desierto y la mitzvá de los flecos (Tzitzit).',
    halachaPoint: 'Precepto de los Tzitzit y la fe en las promesas divinas sobre la Tierra de Israel.',
    rashiComment: 'Los espías pecaron al desacreditar la tierra deseada por falta de confianza.',
    chasidutThought: 'Mirar los Tzitzit nos recuerda conectar la materialidad cotidiana con los mandatos divinos.',
    jasidicLessons: [
      { title: '1. Enviar Espías', snippet: 'Moshé accede a la petición humana de explorar el terreno antes de conquistar.' },
      { title: '2. Frutos Gigantescos', snippet: 'Traer uvas enormes como prueba de la extraordinaria bondad de la tierra.' },
      { title: '3. El Informe Negativo', snippet: 'La mayoría de los emisarios se sintieron como langostas ante los habitantes locales.' },
      { title: '4. La Fe de Calev y Yehoshúa', snippet: 'Sostener que la conquista es posible porque Dios está de su lado.' },
      { title: '5. El Llanto Inútil', snippet: 'Llorar sin motivo en la noche trágica genera consecuencias amargas para las generaciones.' },
      { title: '6. La Intercesión de Moshé', snippet: 'Salvar al pueblo del exterminio mediante la invocación de la misericordia divina.' },
      { title: '7. Cuarenta Años de Exilio', snippet: 'Un año de castigo por cada día de exploración infiel en la tierra.' },
      { title: '8. El Intento Frustrado', snippet: 'Subir al monte por iniciativa propia sin la bendición divina termina en derrota.' },
      { title: '9. Ofrendas en la Tierra', snippet: 'Garantizar que las leyes de sacrificios se cumplirán al ingresar a Canaán.' },
      { title: '10. El Hilo Celeste (Tzitzit)', snippet: 'Mirar los flecos previene el extravío del corazón tras las vanidades del mundo.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '13:1-13:20', summary: 'Espías.' }, { number: 2, name: '2ª Aliyá', verses: '13:21-14:7', summary: 'Informe.' }, { number: 3, name: '3ª Aliyá', verses: '14:8-14:25', summary: 'Calev.' }, { number: 4, name: '4ª Aliyá', verses: '14:26-15:7', summary: 'Decreto.' }, { number: 5, name: '5ª Aliyá', verses: '15:8-15:41', summary: 'Tzitzit.' }]
  },
  korach: {
    id: 'korach', nameEs: 'Parashat Kóraj', nameHe: 'קֹרַח', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 16:1 – 18:32', haftarah: '1 Samuel 11:14 – 12:22',
    summary: 'Rebelión de Kóraj contra Moshé y Aarón, su trágico final y la floración milagrosa de la vara de Aarón.',
    halachaPoint: 'Evitar la discordia gratuita (majloket) y reconocer la autoridad legítima.',
    rashiComment: 'Kóraj cuestionó la autoridad basándose en sofismas demagógicos sobre la igualdad espiritual.',
    chasidutThought: 'La discordia gratuita destruye los cimientos espirituales y la cohesión de la comunidad.',
    jasidicLessons: [
      { title: '1. El Desafío al Liderazgo', snippet: 'Kóraj encabeza una revuelta basada en la premisa de que "toda la congregación es santa".' },
      { title: '2. Sofismas Absurdos', snippet: 'Argumentar sobre túnicas enteramente celestes para invalidar las normas divinas.' },
      { title: '3. El Juicio del Incienso', snippet: 'Probar mediante fuego quiénes son los elegidos para el servicio sagrado.' },
      { title: '4. La Tierra se Abre', snippet: 'El abismo traga a los cabecillas de la rebelión como señal de juicio drástico.' },
      { title: '5. El Fuego Consumidor', snippet: 'Los doscientos cincuenta hombres que ofrecieron incienso extraño mueren abrazados por el fuego.' },
      { title: '6. Las Placas del Altar', snippet: 'Revestir el altar con los recipientes de los rebeldes como recordatorio perpetuo.' },
      { title: '7. Detener la Plaga', snippet: 'Aarón se interpone con su incensario entre los vivos y los muertos para frenar el castigo.' },
      { title: '8. La Vara que Florece', snippet: 'La rama seca de Aarón brota almendras confirmando la legitimidad sacerdotal.' },
      { title: '9. Porciones para los Levites', snippet: 'Garantizar el sustento material de quienes sirven en el Tabernáculo.' },
      { title: '10. El Diezmo Correcto', snippet: 'Entregar las porciones sagradas como expresión de reconocimiento al Creador.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:1-16:13', summary: 'Rebelión.' }, { number: 2, name: '2ª Aliyá', verses: '16:14-16:34', summary: 'Juicio.' }, { number: 3, name: '3ª Aliyá', verses: '16:35-17:15', summary: 'Plaga.' }, { number: 4, name: '4ª Aliyá', verses: '17:16-18:32', summary: 'Vara.' }]
  },
  chukat: {
    id: 'chukat', nameEs: 'Parashat Jukat', nameHe: 'חֻקַּת', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 19:1 – 22:1', haftarah: 'Jueces 11:1 – 11:33',
    summary: 'Leyes de la Vaca Roja, muerte de Miriam y Aarón, y el agua brotando de la roca.',
    halachaPoint: 'Leyes de pureza ritual y el concepto de decretos supraracionales (Jukim).',
    rashiComment: 'El decreto de la Vaca Roja desconcierta incluso a la sabiduría de Salomón.',
    chasidutThought: 'Purificarse de las impurezas del ego requiere un compromiso que supera el intelecto lógico.',
    jasidicLessons: [
      { title: '1. El Misterio de la Vaca Roja', snippet: 'Purifica al impuro mientras contamina al puro; el decreto supremo que supera la razón.' },
      { title: '2. Cenizas de Protección', snippet: 'Las cenizas conservadas sirven para remover la impureza derivada del contacto con la muerte.' },
      { title: '3. El Fallecimiento de Miriam', snippet: 'Con la partida de Miriam cesa milagrosamente el pozo de agua que acompañaba al pueblo.' },
      { title: '4. El Golpe a la Roca', snippet: 'Moshé golpea la roca en lugar de hablarle, perdiendo la oportunidad de santificar a Dios.' },
      { title: '5. Edom Niega el Paso', snippet: 'Obligados a rodear el territorio de los parientes de Esav con paciencia.' },
      { title: '6. La Muerte de Aarón', snippet: 'Aarón asciende al monte Hor y transfiere sus vestimentas sacerdotales a su hijo Eleazar.' },
      { title: '7. Luto Colectivo', snippet: 'Todo el pueblo llora la partida de Aarón durante treinta días.' },
      { title: '8. La Serpiente de Bronce', snippet: 'Mirar hacia arriba sanaba a quienes sufrían las mordeduras en el desierto.' },
      { title: '9. Victorias sobre Sijón y Og', snippet: 'Derrotar a los reyes amorreos abriendo el paso hacia la tierra prometida.' },
      { title: '10. Canto al Pozo', snippet: 'Celebrar con cánticos el agua milagrosa provista por el Creador.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '19:1-19:22', summary: 'Vaca.' }, { number: 2, name: '2ª Aliyá', verses: '20:1-20:13', summary: 'Agua.' }, { number: 3, name: '3ª Aliyá', verses: '20:14-20:21', summary: 'Edom.' }, { number: 4, name: '4ª Aliyá', verses: '20:22-21:9', summary: 'Aarón.' }, { number: 5, name: '5ª Aliyá', verses: '21:10-22:1', summary: 'Reyes.' }]
  },
  balak: {
    id: 'balak', nameEs: 'Parashat Balak', nameHe: 'בָּלָק', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 22:2 – 25:9', haftarah: 'Miqueas 5:6 – 6:8',
    summary: 'El rey Balak contrata al adivino Bilam para maldecir a Israel, pero este termina profiriendo bendiciones.',
    halachaPoint: 'Protección divina sobre el pueblo judío y el poder de las palabras bondadosas.',
    rashiComment: 'Bilam poseía una visión profética equivalente a la de Moshé pero enfocada en la maldad.',
    chasidutThought: 'Las maldiciones planeadas se transformaron milagrosamente en bendiciones eternas ("Ma tovu ohalécha").',
    jasidicLessons: [
      { title: '1. El Terror de Balak', snippet: 'El rey de Moab intenta destruir a Israel contratando artes oscuras y maldiciones.' },
      { title: '2. La Burra que Habla', snippet: 'Dios abre la boca de la an是對 animal para reprender la soberbia del adivino.' },
      { title: '3. El Encuentro con el Ángel', snippet: 'Bilam comprende que no puede alterar la voluntad divina por más oro que reciba.' },
      { title: '4. Altares en las Cimas', snippet: 'Intentar maldecir desde distintos cerros sin hallar grieta en la protección del pueblo.' },
      { title: '5. Cuántos Hermosos Tus Campamentos', snippet: 'Exclamar "Ma tovu ohalécha Yaakov" al contemplar la modestia y moral de las familias.' },
      { title: '6. Dios no es un Hombre', snippet: 'La palabra divina es inmutable y no se retracta de Sus promesas.' },
      { title: '7. Profecía Mesiánica', snippet: 'Bilam vislumbra la estrella futura que surgirá de Jacob para redimir el mundo.' },
      { title: '8. El Tropiezo en Peor', snippet: 'El engaño posterior mediante la seducción externa causa estragos en el campamento.' },
      { title: '9. El Celo de Pinjás', snippet: 'Pinjás actúa con firmeza para detener la plaga que diezmaba al pueblo.' },
      { title: '10. Pacto de Paz', snippet: 'Otorgar el sacerdocio eterno a Pinjás por frenar la transgresión pública.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '22:2-22:12', summary: 'Balak.' }, { number: 2, name: '2ª Aliyá', verses: '22:13-22:37', summary: 'Viaje.' }, { number: 3, name: '3ª Aliyá', verses: '22:38-23:12', summary: 'Bendición.' }, { number: 4, name: '4ª Aliyá', verses: '23:13-24:13', summary: 'Profecías.' }, { number: 5, name: '5ª Aliyá', verses: '24:14-25:9', summary: 'Peor.' }]
  },
  pinchas: {
    id: 'pinchas', nameEs: 'Parashat Pinjás', nameHe: 'פִּינְחָס', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 25:10 – 30:1', haftarah: '1 Reyes 18:46 – 19:21',
    summary: 'Recompensa a Pinjás, nuevo censo, las hijas de Tzlofjad y la designación de Yehoshúa como sucesor de Moshé.',
    halachaPoint: 'Leyes de herencia familiar y liderazgo comunitario responsable.',
    rashiComment: 'Pinjás recibió el pacto de paz eterna por detener la plaga destructora.',
    chasidutThought: 'El verdadero celo por Dios se basa exclusivamente en el amor y la protección de la vida humana.',
    jasidicLessons: [
      { title: '1. Pacto de Paz', snippet: 'El celo por la justicia divina recompensa a Pinjás con una paz espiritual duradera.' },
      { title: '2. El Segundo Censo', snippet: 'Contar nuevamente al pueblo tras la plaga demuestra el amor y cuidado constante.' },
      { title: '3. Las Hijas de Tzlofjad', snippet: 'Reclamar con sabiduría y valentía el derecho a heredar tierras en Israel.' },
      { title: '4. Leyes de Herencia', snippet: 'Establecer precedentes legales justos para la continuidad patrimonial familiar.' },
      { title: '5. Sucesión de Moshé', snippet: 'Moshé pide un líder idóneo que sepa guiar al pueblo con rectitud.' },
      { title: '6. Yehoshúa el Elegido', snippet: 'Designar a Yehoshúa como sucesor tras recibir parte de la sabiduría de Moshé.' },
      { title: '7. Ofrendas Periódicas', snippet: 'Detallar minuciosamente los sacrificios diarios, sabáticos y de cada festividad.' },
      { title: '8. El Cordero Tamid', snippet: 'La ofrenda perpetua de la mañana y de la tarde como base del servicio diario.' },
      { title: '9. Ofrendas de Rosh Chodésh', snippet: 'Santificar la renovación lunar mediante sacrificios adicionales en el Templo.' },
      { title: '10. Votos y Promesas', snippet: 'Leyes sobre la validez y anulación de juramentos ante las autoridades.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '25:10-26:4', summary: 'Pinjás.' }, { number: 2, name: '2ª Aliyá', verses: '26:5-26:51', summary: 'Censo.' }, { number: 3, name: '3ª Aliyá', verses: '26:52-27:23', summary: 'Herederas.' }, { number: 4, name: '4ª Aliyá', verses: '28:1-30:1', summary: 'Ofrendas.' }]
  },
  matotmasei: {
    id: 'matotmasei', nameEs: 'Parashat Matot-Masei', nameHe: 'מַטּוֹת-מַסְעֵי', sefer: 'Sefer Bamidbar (Números)', reading: 'Bamidbar 30:2 – 36:13', haftarah: 'Jeremías 2:4 – 2:28',
    summary: 'Leyes sobre juramentos, guerra contra Madián, asignación de tierras al este del Jordán y resumen de las 42 etapas.',
    halachaPoint: 'La seriedad de la palabra empeñada y los límites geográficos de la Tierra de Israel.',
    rashiComment: 'Las 42 paradas en el desierto muestran la paciencia y guía constante de Dios.',
    chasidutThought: 'Cada etapa y tropiezo en el desierto es un paso necesario de refinamiento espiritual.',
    jasidicLessons: [
      { title: '1. La Palabra Empeñada', snippet: 'Cumplir los votos sin transgredir lo prometido demuestra integridad de carácter.' },
      { title: '2. La Guerra de Madián', snippet: 'Ajustar cuentas con quienes sedujeron espiritualmente al campamento.' },
      { title: '3. Purificación de Botines', snippet: 'Pasar por fuego y agua los objetos tomados en batalla para elevarlos a la santidad.' },
      { title: '4. Reuven y Gad piden Tierra', snippet: 'Elegir asentarse en la zona oriental del Jordán por la abundancia de ganado.' },
      { title: '5. Condición de Participación', snippet: 'Los guerreros deben liderar la conquista de la tierra occidental antes de retornar.' },
      { title: '6. Resumen de las Etapas', snippet: 'Las cuarenta y dos jornadas en el desierto como mapa de los éxodos del alma.' },
      { title: '7. Fronteras de la Tierra', snippet: 'Delimitar con precisión el territorio sagrado otorgado como herencia.' },
      { title: '8. Ciudades para los Levitas', snippet: 'Diseminar a los maestros espirituales por todo el territorio nacional.' },
      { title: '9. Ciudades de Refugio', snippet: 'Garantizar protección legal ante el homicidio involuntario.' },
      { title: '10. Cierre de Bamidbar', snippet: 'Culminar el libro de los números consolidando las leyes de propiedad territorial.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '30:2-32:42', summary: 'Votos.' }, { number: 2, name: '2ª Aliyá', verses: '33:1-33:49', summary: 'Etapas.' }, { number: 3, name: '3ª Aliyá', verses: '33:50-36:13', summary: 'Fronteras.' }]
  },

  // --- SEFER DEVARIM ---
  devarim: {
    id: 'devarim', nameEs: 'Parashat Devarim', nameHe: 'דְּבָרִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 1:1 – 3:22', haftarah: 'Isaías 1:1 – 1:27',
    summary: 'Discurso de despedida de Moshé repasando los errores del pueblo en el desierto y exhortándolos a la obediencia.',
    halachaPoint: 'Crítica constructiva y memoria histórica de los errores pasados.',
    rashiComment: 'Moshé reprochó al pueblo solo al final de su vida por respeto y sabiduría pedagógica.',
    chasidutThought: 'Recordar las caídas fortalece el crecimiento espiritual y previene futuros tropiezos.',
    jasidicLessons: [
      { title: '1. Las Palabras de Moshé', snippet: 'Moshé inicia su discurso final repasando con amor las lecciones del desierto.' },
      { title: '2. Nombramiento de Jueces', snippet: 'Establecer líderes sabios y accesibles para administrar justicia con equidad.' },
      { title: '3. El Fracaso de los Espías', snippet: 'Recordar el miedo colectivo que retrasó la entrada a la tierra prometida.' },
      { title: '4. La Paciencia Divina', snippet: 'Analizar cómo Dios toleró las quejas del pueblo durante cuatro décadas.' },
      { title: '5. Rodeo de Edom', snippet: 'Evitar conflictos innecesarios respetando los territorios de otros pueblos.' },
      { title: '6. Derrota de Sijón y Og', snippet: 'Conquistar los reinos amorreos como anticipo de la victoria en Canaán.' },
      { title: '7. La Petición de Moshé', snippet: 'Rogar infructuosamente por ingresar al menos un instante a la tierra.' },
      { title: '8. Instruir a Yehoshúa', snippet: 'Otorgar ánimo y fortaleza al nuevo líder que cruzará el Jordán.' },
      { title: '9. Mirar al Futuro', snippet: 'Aprender de la historia para construir una sociedad basada en la ley moral.' },
      { title: '10. Inicio de Devarim', snippet: 'Arranca el quinto libro de la Torá recapitulando la alianza sagrada.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '1:1-1:11', summary: 'Jueces.' }, { number: 2, name: '2ª Aliyá', verses: '1:12-1:38', summary: 'Espías.' }, { number: 3, name: '3ª Aliyá', verses: '1:39-2:1', summary: 'Decreto.' }, { number: 4, name: '4ª Aliyá', verses: '2:2-2:30', summary: 'Ruta.' }, { number: 5, name: '5ª Aliyá', verses: '2:31-3:22', summary: 'Sijón.' }]
  },
  vaetjanan: {
    id: 'vaetjanan', nameEs: 'Parashat Vaetjanán', nameHe: 'וָאֶתְחַנַּן', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 3:23 – 7:11', haftarah: 'Isaías 40:1 – 40:26 (Najamu)',
    summary: 'Moshé ruega entrar a la tierra, repetición de los Diez Mandamientos y proclamación del Shemá Israel.',
    halachaPoint: 'Recitación del Shemá, colocación de Mezuzá y prohibición de idolatría.',
    rashiComment: 'Moshé suplicó quinientas quince oraciones para ingresar a la tierra prometida.',
    chasidutThought: 'El Shemá Israel es la declaración suprema de que detrás de toda la multiplicidad física opera una única voluntad divina.',
    jasidicLessons: [
      { title: '1. El Poder de la Súplica', snippet: 'Moshé enseñó que la oración profunda y sincera puede conmover los mundos superiores.' },
      { title: '2. La Unidad Absoluta', snippet: 'El Shemá Israel afirma que no existe ninguna realidad independiente fuera del Creador.' },
      { title: '3. El Amor Total', snippet: 'Amar a Dios con todo el corazón implica unificar las inclinaciones terrenales al servicio divino.' },
      { title: '4. Educación con Fuego', snippet: 'Transmitir las enseñanzas a los hijos requiere vivirlas con entusiasmo interior cotidiano.' },
      { title: '5. El Umbral Protegido', snippet: 'La Mezuzá sella el hogar físico transformándolo en un espacio de conciencia sagrada.' },
      { title: '6. La Humildad Esencial', snippet: 'La elección divina se basó en la cualidad intrínseca de humildad del pueblo.' },
      { title: '7. La Impronta del Sinaí', snippet: 'El encuentro en el Sinaí dejó una huella grabada en el alma de cada generación.' },
      { title: '8. Refugio Espiritual', snippet: 'El alma extraviada siempre encuentra un espacio de resguardo en la sabiduría de la Torá.' },
      { title: '9. Canal de Vitalidad', snippet: 'Guardar los estatutos es el conducto viviente para recibir la energía del Creador.' },
      { title: '10. Superar el Ego', snippet: 'La autosuficiencia es la forma moderna de idolatría que disuelve la conciencia del Shemá.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '3:23-4:4', summary: 'Ruego.' }, { number: 2, name: '2ª Aliyá', verses: '4:5-4:40', summary: 'Exhortación.' }, { number: 3, name: '3ª Aliyá', verses: '4:41-4:49', summary: 'Refugio.' }, { number: 4, name: '4ª Aliyá', verses: '5:1-5:18', summary: 'Mandamientos.' }, { number: 5, name: '5ª Aliyá', verses: '5:19-6:3', summary: 'Temor.' }, { number: 6, name: '6ª Aliyá', verses: '6:4-6:25', summary: 'Shemá.' }, { number: 7, name: '7ª Aliyá', verses: '7:1-7:11', summary: 'Elección.' }]
  },
  ekev: {
    id: 'ekev', nameEs: 'Parashat Ekev', nameHe: 'עֵקֶב', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 7:12 – 11:25', haftarah: 'Isaías 49:14 – 51:3',
    summary: 'Promesas de bendición al cumplir los preceptos, advertencia contra el orgullo y recordatorio del maná.',
    halachaPoint: 'Bendición después de comer (Birkat Hamazón) y gratitud a Dios.',
    rashiComment: 'Ekev se refiere a los preceptos que las personas suelen menospreciar por considerarlos menores.',
    chasidutThought: 'La humildad es la llave maestra para recibir y canalizar la abundancia espiritual.',
    jasidicLessons: [
      { title: '1. El Valor del Detalle', snippet: 'Cuidar los preceptos aparentemente pequeños asegura el éxito espiritual global.' },
      { title: '2. Abundancia y Gratitud', snippet: 'Bendecir a Dios después de comer (Birkat Hamazón) reconoce el origen divino del sustento.' },
      { title: '3. El Peligro del Orgullo', snippet: 'Atribuir el éxito económico a la propia fuerza destruye la sensibilidad del alma.' },
      { title: '4. La Prueba del Desierto', snippet: 'El maná enseñó que el hombre no vive solo de pan, sino de la palabra divina.' },
      { title: '5. La Tierra de Manantial', snippet: 'Describir la riqueza agrícola y espiritual de la tierra prometida.' },
      { title: '6. Nuevas Tablas de la Ley', snippet: 'Recordar la reconstrucción del pacto tras el perdón del becerro de oro.' },
      { title: '7. Lo que Dios Exige', snippet: 'Temer al Eterno, caminar en Sus caminos y amar con sinceridad.' },
      { title: '8. Circuncisión del Corazón', snippet: 'Remover la insensibilidad emocional para acoger la inspiración superior.' },
      { title: '9. Lluvias en su Estación', snippet: 'El clima y la fertilidad responden directamente al compromiso moral del pueblo.' },
      { title: '10. El Poder de la Elección', snippet: 'Escoger entre la bendición y la maldición mediante las acciones cotidianas.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '7:12-8:10', summary: 'Bendiciones.' }, { number: 2, name: '2ª Aliyá', verses: '8:11-9:3', summary: 'Orgullo.' }, { number: 3, name: '3ª Aliyá', verses: '9:4-10:11', summary: 'Tablas.' }, { number: 4, name: '4ª Aliyá', verses: '10:12-11:9', summary: 'Exigencia.' }, { number: 5, name: '5ª Aliyá', verses: '11:10-11:25', summary: 'Lluvias.' }]
  },
  reeh: {
    id: 'reeh', nameEs: 'Parashat Reé', nameHe: 'רְאֵה', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 11:26 – 16:17', haftarah: 'Isaías 54:11 – 55:5',
    summary: 'Bendición y maldición en el monte Gurizim y Eval, leyes de caridad y calendario de festividades de peregrinaje.',
    halachaPoint: 'Leyes de Tzedaká, caridad con los pobres y alimentación kosher.',
    rashiComment: 'Reé ("mira") invita a tomar conciencia visual y espiritual de las elecciones de vida.',
    chasidutThought: 'Dar caridad con alegría transforma profundamente el corazón tanto del dador como del receptor.',
    jasidicLessons: [
      { title: '1. He Aquí que Pongo', snippet: 'Dios entrega la libertad de elección situando bendición y maldición ante el hombre.' },
      { title: '2. Centralizar el Culto', snippet: 'Destruir los altares paganos y unificar el culto en el lugar elegido por Dios.' },
      { title: '3. Prohibición de Consumir Sangre', snippet: 'La sangre representa la fuerza vital animal; separarla eleva el acto de comer.' },
      { title: '4. Falsos Profetas', snippet: 'Poner a prueba la fidelidad a la Torá frente a señales milagrosas engañosas.' },
      { title: '5. Leyes de Kashrut', snippet: 'Discernir qué animales nutren el cuerpo sin dañar la sensibilidad espiritual.' },
      { title: '6. El Diezmo Solidario', snippet: 'Separar porciones para sostener a los levitas, pobres y huérfanos.' },
      { title: '7. La Libertad del Deudor', snippet: 'Anular las deudas financieras cada séptimo año protege al desvalido.' },
      { title: '8. Generosidad sin Límites', snippet: 'Prestar y dar caridad con generosidad sabiendo que Dios proveerá el sustento.' },
      { title: '9. El Esclavo Liberado', snippet: 'Tratar con generosidad y regalos al siervo que recupera su libertad.' },
      { title: '10. Las Tres Fiestas', snippet: 'Peregrinar a Jerusalem en Pésaj, Shavuot y Sucot con alegría comunitaria.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '11:26-12:10', summary: 'Culto.' }, { number: 2, name: '2ª Aliyá', verses: '12:11-13:19', summary: 'Profetas.' }, { number: 3, name: '3ª Aliyá', verses: '14:1-14:29', summary: 'Kashrut.' }, { number: 4, name: '4ª Aliyá', verses: '15:1-15:23', summary: 'Deudas.' }, { number: 5, name: '5ª Aliyá', verses: '16:1-16:17', summary: 'Fiestas.' }]
  },
  shoftim: {
    id: 'shoftim', nameEs: 'Parashat Shoftim', nameHe: 'שֹׁפְטִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 16:18 – 21:9', haftarah: 'Isaías 51:12 – 52:12',
    summary: 'Establecimiento de tribunales justos, leyes sobre reyes, profetas, ciudades de refugio y normas de guerra.',
    halachaPoint: 'Búsqueda de la justicia imparcial y prohibición de cortar árboles frutales en guerra.',
    rashiComment: 'Justicia, justicia perseguirás: nombra jueces íntegros y rectos.',
    chasidutThought: 'La justicia terrenal refleja la rectitud, el equilibrio y la armonía del orden divino.',
    jasidicLessons: [
      { title: '1. Jueces y Oficiales', snippet: 'Establecer tribunales honestos en cada puerta como garantía de orden social.' },
      { title: '2. Prohibición de Corrupción', snippet: 'El soborno ciega los ojos de los sabios y tuerce las palabras justas.' },
      { title: '3. El Testimonio Fidedigno', snippet: 'Requerir múltiples testigos rigurosos antes de dictar condenas graves.' },
      { title: '4. El Rey Humilde', snippet: 'El monarca debe escribir su propio rollo de Torá y leerlo constantemente.' },
      { title: '5. Los Sacerdotes Levitas', snippet: 'Su herencia espiritual es el Eterno mismo, sin posesiones territoriales terrenales.' },
      { title: '6. El Profeta Verdadero', snippet: 'Escuchar al profeta cuyas palabras se alinean fielmente con la Torá.' },
      { title: '7. Ciudades de Refugio', snippet: 'Garantizar vías de escape y juicio justo para el homicida involuntario.' },
      { title: '8. Hitos y Propiedades', snippet: 'No desplazar los límites de las propiedades ajenas establecidas.' },
      { title: '9. Leyes de Guerra y Paz', snippet: 'Ofrecer términos de paz antes de iniciar batallas y cuidar la ecología.' },
      { title: '10. El Misterio del Crime Incógnito', snippet: 'La ceremonia de la Eglá Arufá cuando se halla un cuerpo sin responsable conocido.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '16:18-17:13', summary: 'Jueces.' }, { number: 2, name: '2ª Aliyá', verses: '17:14-18:5', summary: 'Rey.' }, { number: 3, name: '3ª Aliyá', verses: '18:6-18:22', summary: 'Profetas.' }, { number: 4, name: '4ª Aliyá', verses: '19:1-19:13', summary: 'Refugio.' }, { number: 5, name: '5ª Aliyá', verses: '19:14-20:9', summary: 'Guerra.' }, { number: 6, name: '6ª Aliyá', verses: '20:10-21:9', summary: 'Eglá.' }]
  },
  kiteitzei: {
    id: 'kiteitzei', nameEs: 'Parashat Ki Tetzei', nameHe: 'כִּי-תֵצֵא', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 21:10 – 25:19', haftarah: 'Isaías 54:1 – 54:10',
    summary: 'Amplio código de leyes morales, familiares y sociales, respeto a los animales y memoria de Amalek.',
    halachaPoint: 'Leyes éticas cotidianas, honestidad en el comercio y protección al prójimo.',
    rashiComment: 'Cada mandamiento refleja una profunda sensibilidad hacia la dignidad de toda persona.',
    chasidutThought: 'Los detalles de la vida diaria son el escenario principal para revelar la santidad divina.',
    jasidicLessons: [
      { title: '1. Matrimonio en Cautiverio', snippet: 'Pautas éticas para regular las pasiones y proteger la dignidad humana en la guerra.' },
      { title: '2. Derechos del Primogénito', snippet: 'Prohibir desheredar al hijo mayor por preferencias personales.' },
      { title: '3. Seguridad en los Techos', snippet: 'Construir barandas protectoras en los tejados para prevenir accidentes caseros.' },
      { title: '4. Mezcla Prohibida', snippet: 'Evitar cruzar especies vegetales o animales y usar lino con lana (Shaatnez).' },
      { title: '5. Compasión con los Animales', snippet: 'Dejar partir a la madre antes de tomar los huevos del nido.' },
      { title: '6. Honestidad en las Pesas', snippet: 'Mantener balanzas exactas como mandamiento de honradez comercial.' },
      { title: '7. Recordar a Amalek', snippet: 'Borrar la memoria del pueblo que atacó con alevosía a los débiles en el desierto.' },
      { title: '8. Primicias y Canasta', snippet: 'Agradecer la tierra entregada presentando los primeros frutos en el Templo.' },
      { title: '9. Leyes de Pureza Social', snippet: 'Sostener altos estándares de decencia y respeto en el campamento.' },
      { title: '10. Justicia y Rectitud', snippet: 'Concluir con preceptos que garantizan el bienestar y la moral comunitaria.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '21:10-22:7', summary: 'Derechos.' }, { number: 2, name: '2ª Aliyá', verses: '22:8-23:7', summary: 'Seguridad.' }, { number: 3, name: '3ª Aliyá', verses: '23:8-24:4', summary: 'Higiene.' }, { number: 4, name: '4ª Aliyá', verses: '24:5-24:22', summary: 'Trabajador.' }, { number: 5, name: '5ª Aliyá', verses: '25:1-25:19', summary: 'Amalek.' }]
  },
  kitavo: {
    id: 'kitavo', nameEs: 'Parashat Ki Tavo', nameHe: 'כִּי-תָבוֹא', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 26:1 – 29:8', haftarah: 'Isaías 60:1 – 60:22',
    summary: 'Presentación de las primicias, entrega de diezmos y la ceremonia de bendiciones y maldiciones en el monte Ebal.',
    halachaPoint: 'Gratitud por los frutos de la tierra y fidelidad al pacto con Dios.',
    rashiComment: 'Servir a Dios con alegría es la clave fundamental para la plenitud espiritual.',
    chasidutThought: 'Las primicias expresan que el primer y mejor esfuerzo de la vida debe dedicarse a lo sagrado.',
    jasidicLessons: [
      { title: '1. La Declaración de las Primicias', snippet: 'Recordar el origen humilde al entregar los primeros frutos de la tierra prometida.' },
      { title: '2. El Ciclo de los Diezmos', snippet: 'Compartir los frutos con los levitas, los pobres y los necesitados.' },
      { title: '3. Declaración de Rectitud', snippet: 'Atestiguar formalmente que se cumplieron todas las leyes de caridad y justicia.' },
      { title: '4. Piedras en el Monte Ebal', snippet: 'Tallar las palabras de la Torá sobre grandes piedras recubiertas de cal.' },
      { title: '5. Bendiciones y Maldiciones', snippet: 'Las tribus se dividen en los montes Guerizim y Ebal para ratificar el pacto.' },
      { title: '6. Caminar en Sus Mandatos', snippet: 'Consagrarse como pueblo peculiar y tesoro preciado del Creador.' },
      { title: '7. Advertencias Severas', snippet: 'Describir las consecuencias amargas de apartarse de los caminos de la Torá.' },
      { title: '8. La Dureza del Exilio', snippet: 'El sufrimiento disperso como llamado a la reflexión y retorno colectivo.' },
      { title: '9. Corazones para Entender', snippet: 'Reconocer que la verdadera percepción de los milagros requiere apertura interior.' },
      { title: '10. Renovación del Pacto', snippet: 'Sellar la alianza divina antes del traspaso del liderazgo a Yehoshúa.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '26:1-26:11', summary: 'Primicias.' }, { number: 2, name: '2ª Aliyá', verses: '26:12-26:19', summary: 'Diezmos.' }, { number: 3, name: '3ª Aliyá', verses: '27:1-27:26', summary: 'Ebal.' }, { number: 4, name: '4ª Aliyá', verses: '28:1-28:69', summary: 'Bendiciones.' }, { number: 5, name: '5ª Aliyá', verses: '29:1-29:8', summary: 'Pacto.' }]
  },
  nitzavim: {
    id: 'nitzavim', nameEs: 'Parashat Nitzavim', nameHe: 'נִצָּבִים', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 29:9 – 30:20', haftarah: 'Isaías 61:10 – 63:9',
    summary: 'Unidad de todo el pueblo frente al pacto divino, la promesa del retorno (Tshuvá) y la accesibilidad de la Torá.',
    halachaPoint: 'El poder del arrepentimiento sincero (Tshuvá) y la cercanía de la palabra divina.',
    rashiComment: '"La Torá no está en el cielo", sino en tu boca y en tu corazón para cumplirla.',
    chasidutThought: 'Todo ser humano tiene asegurada la capacidad inalienable de retornar a su raíz espiritual.',
    jasidicLessons: [
      { title: '1. Todos de Pie', snippet: 'Desde los líderes hasta el más humilde porteador de agua unidos ante el pacto.' },
      { title: '2. Advertencia contra la Arrogancia', snippet: 'Evitar creer que uno puede corromperse en secreto sin dañar el equilibrio general.' },
      { title: '3. La Promesa del Retorno', snippet: 'Incluso en el confín del exilio, el arrepentimiento sincero reconecta con Dios.' },
      { title: '4. Circuncisión del Corazón', snippet: 'Dios mismo transformará la sensibilidad interior para amar Sus mandatos.' },
      { title: '5. La Torá Accesible', snippet: 'La sabiduría divina no es inalcanzable; está cerca en la boca y el corazón.' },
      { title: '6. La Elección de la Vida', snippet: 'Escoger la vida y la bendición mediante la observancia ética y espiritual.' },
      { title: '7. Testigos Gemelos', snippet: 'El cielo y la tierra testifican la propuesta trascendental ofrecida al pueblo.' },
      { title: '8. Amar al Eterno', snippet: 'Vivir adheridos a la fuente de la vida como garantía de permanencia en la tierra.' },
      { title: '9. Fuerza en la Unidad', snippet: 'La fortaleza nacional radica en la cohesión y responsabilidad mutua.' },
      { title: '10. Preparando el Cierre', snippet: 'Los discursos finales de Moshé alcanzan su cumbre emocional y práctica.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '29:9-29:14', summary: 'Unidos.' }, { number: 2, name: '2ª Aliyá', verses: '29:15-29:28', summary: 'Idolatría.' }, { number: 3, name: '3ª Aliyá', verses: '30:1-30:10', summary: 'Tshuvá.' }, { number: 4, name: '4ª Aliyá', verses: '30:11-30:20', summary: 'Elección.' }]
  },
  vayeilech: {
    id: 'vayeilech', nameEs: 'Parashat Vayelej', nameHe: 'וַיֵּלֶךְ', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 31:1 – 31:30', haftarah: 'Oseas 14:2 – 14:10; Miqueas 7:18 – 7:20',
    summary: 'Moshé transfiere el liderazgo a Yehoshúa, la mitzvá de escribir un Séfer Torá personal y la lectura pública (Hakhel).',
    halachaPoint: 'Obligación de escribir un rollo de Torá y la unidad nacional en torno al texto sagrado.',
    rashiComment: 'Escribir una letra en la Torá se considera como haber escrito toda la obra.',
    chasidutThought: 'La Torá pertenece a cada individuo de manera directa, íntima y transformadora.',
    jasidicLessons: [
      { title: '1. El Paso del Testigo', snippet: 'Moshé a sus 120 años transfiere con generosidad el liderazgo a Yehoshúa.' },
      { title: '2. Esfuerzo y Valentía', snippet: 'Exhortar al pueblo a no temer frente a los desafíos de la conquista.' },
      { title: '3. Entrega de la Torá escrita', snippet: 'Moshé confía el rollo sagrado a los sacerdotes y ancianos de Israel.' },
      { title: '4. La Reunión Hakhel', snippet: 'Congregar a hombres, mujeres y niños cada siete años para escuchar la lectura de Devarim.' },
      { title: '5. El Rostro Oculto (Hester Panim)', snippet: 'Dios advierte sobre los momentos de oscuridad donde parecerá ausente.' },
      { title: '6. El Cántico Testigo', snippet: 'Escribir el cántico de Haazinu como recordatorio permanente de la alianza.' },
      { title: '7. La Torá que no se Olvida', snippet: 'Promesa de que la enseñanza sagrada jamás desaparecerá de los labios de la descendencia.' },
      { title: '8. Escribir un Séfer Torá', snippet: 'El mandato final para que cada judío participe en la redacción de un rollo.' },
      { title: '9. Asamblea General', snippet: 'Unificar a todas las capas sociales en torno a la palabra divina.' },
      { title: '10. Caminando hacia el Final', snippet: 'Los últimos pasos de Moshé guiando al pueblo hacia su destino eterno.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '31:1-31:6', summary: 'Liderazgo.' }, { number: 2, name: '2ª Aliyá', verses: '31:7-31:13', summary: 'Hakhel.' }, { number: 3, name: '3ª Aliyá', verses: '31:14-31:30', summary: 'Cántico.' }]
  },
  haazinu: {
    id: 'haazinu', nameEs: 'Parashat Haazinu', nameHe: 'הַאֲזִינוּ', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 32:1 – 32:52', haftarah: '2 Samuel 22:1 – 22:51',
    summary: 'El célebre Cántico poético de Moshé que repasa la historia de fidelidad e ingratitud de Israel frente a la protección divina.',
    halachaPoint: 'Reconocimiento de la justicia divina y memoria histórica.',
    rashiComment: 'El cántico sirve como testigo eterno y recordatorio de la relación entre Dios y Su pueblo.',
    chasidutThought: 'La poesía conecta las profundidades del alma con la eternidad inmutable de la Torá.',
    jasidicLessons: [
      { title: '1. Escuchen Cielos y Tierra', snippet: 'Moshé convoca a los elementos cósmicos como testigos perennes de su mensaje.' },
      { title: '2. La Roca Perfecta', snippet: 'Dios es definido como la Roca (Tzur) cuya obra es íntegra y justa.' },
      { title: '3. Ingratitud Humana', snippet: 'Recordar cómo el bienestar material a veces aleja al hombre de la espiritualidad.' },
      { title: '4. Juicio y Corrección', snippet: 'Las dificultades históricas actúan como medidas correctivas de amor divino.' },
      { title: '5. Reconocer la Fuente', snippet: 'Comprender que el éxito y la subsistencia provienen de una única mano creadora.' },
      { title: '6. Consolación Final', snippet: 'Dios vindicará a Su pueblo y perdonará la tierra de Sus hijos.' },
      { title: '7. Alegraos Naciones', snippet: 'Invitación a los pueblos a celebrar la redención y la justicia universal.' },
      { title: '8. La Orden de Partida', snippet: 'Dios le recuerda a Moshé que debe subir al monte Nebo para expirar.' },
      { title: '9. Ver la Tierra a la Distancia', snippet: 'Contemplar la tierra prometida sin alcanzar a pisarla físicamente.' },
      { title: '10. Poesía Eterna', snippet: 'Las palabras del cántico quedan grabadas en la memoria espiritual de Israel.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '32:1-32:12', summary: 'Cántico.' }, { number: 2, name: '2ª Aliyá', verses: '32:13-32:18', summary: 'Prosperidad.' }, { number: 3, name: '3ª Aliyá', verses: '32:19-32:28', summary: 'Destierro.' }, { number: 4, name: '4ª Aliyá', verses: '32:29-32:39', summary: 'Consolación.' }, { number: 5, name: '5ª Aliyá', verses: '32:40-32:52', summary: 'Nebo.' }]
  },
  vezothaberakhah: {
    id: 'vezothaberakhah', nameEs: 'Parashat Vezot HaBerajá', nameHe: 'וְזֹאת הַבְּרָכָה', sefer: 'Sefer Devarim (Deuteronomio)', reading: 'Devarim 33:1 – 34:12', haftarah: 'Josué 1:1 – 1:18',
    summary: 'Las últimas bendiciones de Moshé a las tribus de Israel antes de su fallecimiento en el monte Nebo, cerrando el ciclo.',
    halachaPoint: 'La bendición a las tribus y la culminación alegre del estudio de la Torá (Simjat Torá).',
    rashiComment: 'Moshé bendijo a cada tribu con características propias resaltando su misión singular.',
    chasidutThought: 'Al finalizar la Torá la reiniciamos inmediatamente, simbolizando que el estudio divino nunca termina.',
    jasidicLessons: [
      { title: '1. La Bendición Final', snippet: 'Moshé despide al pueblo legándoles bendiciones de fortaleza y unidad.' },
      { title: '2. Fuego de Ley', snippet: 'La Torá fue entregada desde el fuego divino como herencia eterna para la congregación.' },
      { title: '3. Bendición a Reuven y Yehudah', snippet: 'Sostener la estabilidad nacional y el liderazgo real de la nación.' },
      { title: '4. Leví y los Ajrim', snippet: 'Los sacerdotes enseñarán los juicios divinos con pureza e incense sagrado.' },
      { title: '5. Binyamin y Yosef', snippet: 'El amado de Dios reposa seguro y recibe la abundancia de los cielos.' },
      { title: '6. Zvulun e Issajar', snippet: 'La alianza entre el comercio y el estudio continuo de la sabiduría.' },
      { title: '7. Gad, Dan y Naftalí', snippet: 'Valentía, rapidez y satisfacción plena con la bendición del Eterno.' },
      { title: '8. El Otorga-Cielos (Jeshurún)', snippet: 'Israel descrito en su nivel más elevado de conexión espiritual.' },
      { title: '9. La Muerte de Moshé', snippet: 'Moshé fallece "por boca de Dios" en el monte Nebo, sepultado en secreto divino.' },
      { title: '10. Simjat Torá Perpetua', snippet: 'Concluir y reiniciar el ciclo de la Torá demuestra que la alegría espiritual es eterna.' }
    ],
    aliyot: [{ number: 1, name: '1ª Aliyá', verses: '33:1-33:7', summary: 'General.' }, { number: 2, name: '2ª Aliyá', verses: '33:8-33:12', summary: 'Leví.' }, { number: 3, name: '3ª Aliyá', verses: '33:13-33:17', summary: 'Yosef.' }, { number: 4, name: '4ª Aliyá', verses: '33:18-33:29', summary: 'Tribus.' }, { number: 5, name: '5ª Aliyá', verses: '34:1-34:12', summary: 'Muerte.' }]
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

        {/* SUBPESTAÑA 4: Dimensión Espiritual y Jasídica (10 Enseñanzas Jasídicas de la Parashá) */}
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
                  <p className="text-xs text-slate-500">10 perspectivas jasídicas profundas específicas de esta Parashá</p>
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
            </div>

            {/* Cuadrícula de las 10 Enseñanzas Jasídicas de la Parashá */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>10 Enseñanzas Jasídicas de {cleanText(parasha.nameEs)}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parasha.jasidicLessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition shadow-xs flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-sm text-amber-700 dark:text-amber-400 leading-snug">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {lesson.snippet}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                      <button
                        onClick={() => onAskAboutParasha(`Explícame en detalle la enseñanza jasídica "${lesson.title}" correspondiente a ${parasha.nameEs}.`)}
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