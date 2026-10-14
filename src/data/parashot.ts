export interface Parasha {
  id: string;
  name: string;
  hebrewName: string;
  book: 'Bereshit' | 'Shemot' | 'Vayikra' | 'Bamidbar' | 'Devarim';
  bookSpanish: string;
  reference: string;
  haftarah: string;
  maqamHalabi: string; // Syrian/Halabi Maqam according to Aram Tzobá tradition
  summary: string;
  aliyot: {
    number: number;
    reference: string;
    description: string;
  }[];
  rashiInsight: string;
  chabadInsight: string;
  halachaFocus: string;
}

export const PARASHOT_DATA: Parasha[] = [
  {
    id: 'bereshit',
    name: 'Bereshit',
    hebrewName: 'בְּרֵאשִׁית',
    book: 'Bereshit',
    bookSpanish: 'Génesis',
    reference: 'Génesis 1:1 – 6:8',
    haftarah: 'Isaías 42:5 – 43:10',
    maqamHalabi: 'Rast (el principio, la creación y la cabeza de los Maqamat)',
    summary: 'La creación del universo en seis días y el descanso de Shabat. La creación del ser humano, el Jardín del Edén, la transgresión del árbol del conocimiento, Caín y Hével, y las diez generaciones hasta Noaj.',
    aliyot: [
      { number: 1, reference: '1:1 - 2:3', description: 'Los seis días de la Creación divina y la santificación del séptimo día: Shabat.' },
      { number: 2, reference: '2:4 - 2:19', description: 'Formación del hombre del polvo de la tierra y colocación en el Jardín del Edén.' },
      { number: 3, reference: '2:20 - 3:21', description: 'Creación de Java (Eva), el diálogo con la serpiente y el fruto prohibido.' },
      { number: 4, reference: '3:22 - 4:18', description: 'Expulsión del Edén, nacimiento de Caín y Hével, y el primer asesinato.' },
      { number: 5, reference: '4:19 - 4:26', description: 'La genealogía de Caín y el nacimiento de Shet.' },
      { number: 6, reference: '5:1 - 5:24', description: 'Las diez generaciones desde Adán hasta Noaj; Janoj camina con Dios.' },
      { number: 7, reference: '5:25 - 6:8', description: 'Nacimiento de Noaj y el estado moral de la humanidad previa al Diluvio.' },
    ],
    rashiInsight: 'Rashi abre su comentario preguntando por qué la Torá comienza con la Creación y no con la primera mitzvá dada a Israel (Éxodo 12:2). Explica que si las naciones reclaman que Israel robó la tierra de Canaán, Israel puede responder: "Toda la tierra pertenece al Creador; Él la creó y la entregó a quien consideró justo".',
    chabadInsight: 'El Alter Rebe y el Rebe de Lubavitch enseñan que "Bereshit" alude a "Bishvil Yisrael uBishvil Torá sheNikreú Reshit" (por causa de Israel y de la Torá, que son llamados principio). El propósito de todo el cosmos es hacer una morada para Dios en este mundo físico (Dira BeTajtonim).',
    halachaFocus: 'El descanso sagrado de Shabat (*Kiddush* de Shabat) como testimonio de que Dios creó el mundo de la nada (*Yesh meAyin*).',
  },
  {
    id: 'noaj',
    name: 'Noaj',
    hebrewName: 'נֹחַ',
    book: 'Bereshit',
    bookSpanish: 'Génesis',
    reference: 'Génesis 6:9 – 11:32',
    haftarah: 'Isaías 54:1 – 55:5',
    maqamHalabi: 'Sigah (melodía de súplica, salvación del arca y nuevo pacto)',
    summary: 'La rectitud de Noaj en su generación, la construcción de la Tebá (arca), el gran diluvio que cubrió la tierra, el pacto del arco iris, los siete preceptos de los hijos de Noaj (Mitzvot Bnei Noaj) y la dispersión tras la Torre de Babel.',
    aliyot: [
      { number: 1, reference: '6:9 - 6:22', description: 'Noaj hombre justo; Dios ordena construir el Arca con sus medidas exactas.' },
      { number: 2, reference: '7:1 - 7:16', description: 'Entrada de Noaj, su familia y los animales puros e impuros al Arca.' },
      { number: 3, reference: '7:17 - 8:14', description: 'Las aguas del Diluvio prevalecen; el cuervo y la paloma con la rama de olivo.' },
      { number: 4, reference: '8:15 - 9:7', description: 'Salida del Arca, ofrenda de Noaj y los 7 Preceptos Universales (Leyes Noájidas).' },
      { number: 5, reference: '9:8 - 9:17', description: 'El pacto divino simbolizado por el Arco Iris (Ot HaBrit).' },
      { number: 6, reference: '9:18 - 10:32', description: 'La viña de Noaj, sus hijos Shem, Jam y Yéfet, y la tabla de las 70 naciones.' },
      { number: 7, reference: '11:1 - 11:32', description: 'La Torre de Babel, la confusión de los idiomas y el linaje hasta Abram.' },
    ],
    rashiInsight: 'Rashi destaca sobre "Noaj ish tzadik tamim hayá bedorotav": algunos sabios lo elogian diciendo que si en su generación perversa fue justo, cuánto más en una generación de justos; otros lo matizan señalando que comparado con su época era justo, pero frente a Abraham su piedad requería apoyo divino.',
    chabadInsight: 'El Baal Shem Tov y el Rebe explican que "Tebá" en hebreo significa tanto "Arca" como "Palabra". Ante las inundaciones de las preocupaciones materiales de la vida, uno debe entrar en la *Tebá*: las palabras sagradas de la Torá y la Tefilá (el rezo), que protegen y elevan el alma.',
    halachaFocus: 'Las 7 Mitzvot de Bnei Noaj (prohibición de idolatría, blasfemia, homicidio, relaciones prohibidas, robo, comer miembros de un animal vivo, y la obligación de establecer tribunales de justicia).',
  },
  {
    id: 'lej_leja',
    name: 'Lej Lejá',
    hebrewName: 'לֶךְ־לְךָ',
    book: 'Bereshit',
    bookSpanish: 'Génesis',
    reference: 'Génesis 12:1 – 17:27',
    haftarah: 'Isaías 40:27 – 41:16',
    maqamHalabi: 'Saba (melodía de Brit Milá y fidelidad al pacto eterno)',
    summary: 'La orden divina a Abram de abandonar su tierra y familia hacia la tierra prometida. La promesa de descendencia, la estancia en Egipto, la separación de Lot, la batalla de los cuatro reyes contra los cinco, el Brit Bein HaBetarim (Pacto entre las partes) y el Brit Milá a los 99 años.',
    aliyot: [
      { number: 1, reference: '12:1 - 12:13', description: '"Vete de tu tierra, de tu parentela..."; Abram y Sarai parten a Canaán y luego a Egipto por la hambruna.' },
      { number: 2, reference: '12:14 - 13:4', description: 'Sarai en el palacio de Faraón y regreso de Abram con gran riqueza a Bet El.' },
      { number: 3, reference: '13:5 - 13:18', description: 'Separación pacífica entre Abram y Lot; promesa de la tierra en las cuatro direcciones.' },
      { number: 4, reference: '14:1 - 14:20', description: 'La guerra de los reyes, rescate heroico de Lot y bendición de Malkitzedek.' },
      { number: 5, reference: '14:21 - 15:6', description: 'Abram rechaza el botín de Sodoma; Dios promete: "Así será tu descendencia".' },
      { number: 6, reference: '15:7 - 17:6', description: 'El Pacto entre las partes (Brit Bein HaBetarim); nacimiento de Ishmael; cambio de nombres a Abraham y Sará.' },
      { number: 7, reference: '17:7 - 17:27', description: 'El precepto eterno del Brit Milá; circuncisión de Abraham a los 99 años e Ishmael a los 13.' },
    ],
    rashiInsight: 'Rashi explica "Lej Lejá": "Para tu propio provecho y beneficio; allí te haré una gran nación, mientras que aquí no tienes mérito de engendrar hijos".',
    chabadInsight: '"Lej Lejá" significa "Ve hacia ti mismo", hacia la esencia más íntima de tu alma divina (*étzem haNeshama*), elevándote por encima de tus inclinaciones naturales y tu entorno mundano.',
    halachaFocus: 'El Brit Milá (🔴 OBLIGATORIO - Deoraita al 8° día), las bendiciones de circuncisión y las costumbres festivas de cada comunidad.',
  },
  {
    id: 'vayeira',
    name: 'Vayeirá',
    hebrewName: 'וַיֵּרָא',
    book: 'Bereshit',
    bookSpanish: 'Génesis',
    reference: 'Génesis 18:1 – 22:24',
    haftarah: 'II Reyes 4:1 – 4:37',
    maqamHalabi: 'Nahawand (melodía de hospitalidad y gracia)',
    summary: 'Dios se aparece a Abraham en las encinas de Mamré. La hospitalidad con los tres ángeles, el anuncio del nacimiento de Itzjak, la súplica por Sodoma y Gomorra, la salvación de Lot, el nacimiento de Itzjak, la expulsión de Hagar e Ishmael, y la Akedat Itzjak (el sacrificio de Isaac) en el Monte Moriá.',
    aliyot: [
      { number: 1, reference: '18:1 - 18:14', description: 'Abraham recibe a los tres viajeros en el calor del día; anuncio del nacimiento de un hijo a Sará.' },
      { number: 2, reference: '18:15 - 18:33', description: 'Abraham intercede apasionadamente por los inocentes de Sodoma.' },
      { number: 3, reference: '19:1 - 19:20', description: 'Los ángeles llegan a Sodoma; rescate de Lot de la turba perversa.' },
      { number: 4, reference: '19:21 - 20:18', description: 'Destrucción de Sodoma y Gomorra con azufre y fuego; Abraham y Abimelej en Gerar.' },
      { number: 5, reference: '21:1 - 21:21', description: 'Nacimiento de Itzjak, circuncisión al octavo día; despedida de Hagar e Ishmael.' },
      { number: 6, reference: '21:22 - 21:34', description: 'Pacto de paz en Beer Sheva entre Abraham y Abimelej; plantación del Éshel.' },
      { number: 7, reference: '22:1 - 22:24', description: 'La Akedat Itzjak en el Monte Moriá: prueba suprema de fe y entrega total a Dios.' },
    ],
    rashiInsight: 'Rashi explica que recibir huéspedes (*Hajnasat Orjim*) es más grande que recibir la presencia de la Shejiná, pues Abraham le pidió a Dios que lo esperara mientras corría a atender a los tres caminantes cansados.',
    chabadInsight: 'La Akedá simboliza la capacidad innata de cada judío de entregar su ego ante la voluntad divina (*Mesirut Néfesh*), cualidad heredada eternamente de Abraham e Itzjak.',
    halachaFocus: 'La gran mitzvá de Hajnasat Orjim (hospitalidad con viajeros y necesitados) y la lectura de la Akedá cada mañana en la Tefilá diaria de Shajarit.',
  },
];
