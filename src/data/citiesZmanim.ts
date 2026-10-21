/**
 * ============================================================================
 * MÓDULO DE DATOS DE ZMANIM Y CIUDADES GLOBALES (zmanimData.ts)
 * ============================================================================
 * Propósito: Definir los tipos e interfaces de TypeScript para los tiempos
 * halájicos diarios (*Zmanim*), así como el listado estructurado de ciudades 
 * globales con sus costumbres comunitarias, reglas de encendido de velas y 
 * horarios astronómicos de referencia.
 */

/**
 * Interfaz que modela los datos completos de Zmanim y configuraciones 
 * comunitarias para una ciudad específica.
 */
export interface CityZmanim {
  id: string;                                   // Identificador único de la ciudad (ej. 'cdmx')
  name: string;                                 // Nombre oficial de la ciudad
  country: string;                              // País al que pertenece
  flag: string;                                 // Emoji de la bandera nacional
  communityFlavor: string;                      // Reseña de las comunidades judías locales
  candleLightingMinutesBeforeSunset: number;    // Minutos antes de la puesta de sol (ej. 18, 20 o 40 en Jerusalén)
  sampleSunsetFriday: string;                   // Muestra de puesta de sol en viernes (ej. "18:24")
  sampleCandleLighting: string;                 // Muestra de encendido de velas (ej. "18:06")
  sampleSunsetSaturday: string;                 // Muestra de puesta de sol en sábado (ej. "18:25")
  sampleHavdalahStandard: string;               // Muestra de Havdalá estándar (3 estrellas medianas, ej. "19:18")
  sampleHavdalahRabenuTam: string;              // Muestra de Havdalá según Rabenu Tam (72 min, ej. "19:37")
  hebrewDate: string;                           // Fecha hebrea de referencia (ej. "Jeshván 5787")
  zmanim: {
    alotHaShajar: string;                       // Albor / Amanecer astronómico
    netzHaChama: string;                        // Salida del sol (*Netz*)
    sofZmanShemaMagenAvraham: string;           // Límite para el Shemá según Magen Avraham
    sofZmanShemaGra: string;                    // Límite para el Shemá según el Gaón de Vilna (Gra)
    sofZmanTefilah: string;                     // Límite para la Amidá / Tefilá matutina
    chatzot: string;                            // Mediodía halájico (*Chatzot*)
    minchaGedolah: string;                      // Inicio de Minjá Gedolá (Mediodía + 30 min)
    plagHaMincha: string;                       // Plag HaMinjá (Mitad del atardecer)
    shekia: string;                             // Puesta del sol (*Shekia*)
    tzaitHakochavim: string;                    // Salida de las estrellas / Noche (*Tzait Hakochavim*)
  };
}

/**
 * ============================================================================
 * CATÁLOGO GLOBAL DE CIUDADES Y ZMANIM (CITIES_ZMANIM)
 * ============================================================================
 * Base de datos estática que alimenta el selector de ubicaciones del componente 
 * de Calendario y Zmanim, incorporando matices comunitarios y horarios detallados.
 */
export const CITIES_ZMANIM: CityZmanim[] = [
  {
    id: 'cdmx',
    name: 'Ciudad de México',
    country: 'México',
    flag: '🇲🇽',
    communityFlavor: 'Sede de las históricas Comunidades Maguen David (Jalabí) y Monte Sinai (Shamí), además de Sefaradí, Ashkenazí y Beit Jabad.',
    candleLightingMinutesBeforeSunset: 18,
    sampleSunsetFriday: '18:22',
    sampleCandleLighting: '18:04',
    sampleSunsetSaturday: '18:23',
    sampleHavdalahStandard: '19:16',
    sampleHavdalahRabenuTam: '19:35',
    hebrewDate: 'Jeshván 5787',
    zmanim: {
      alotHaShajar: '05:32',
      netzHaChama: '06:44',
      sofZmanShemaMagenAvraham: '09:08',
      sofZmanShemaGra: '09:44',
      sofZmanTefilah: '10:44',
      chatzot: '12:33',
      minchaGedolah: '13:03',
      plagHaMincha: '17:18',
      shekia: '18:22',
      tzaitHakochavim: '19:16',
    },
  },
  {
    id: 'brooklyn',
    name: 'Nueva York / Brooklyn',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    communityFlavor: 'Gran comunidad siria de Ocean Parkway (Aram Tzobá), Crown Heights (sede mundial de Jabad Lubavitch) y Flatbush/Boro Park.',
    candleLightingMinutesBeforeSunset: 18,
    sampleSunsetFriday: '18:14',
    sampleCandleLighting: '17:56',
    sampleSunsetSaturday: '18:15',
    sampleHavdalahStandard: '19:12',
    sampleHavdalahRabenuTam: '19:27',
    hebrewDate: 'Jeshván 5787',
    zmanim: {
      alotHaShajar: '05:42',
      netzHaChama: '07:05',
      sofZmanShemaMagenAvraham: '09:12',
      sofZmanShemaGra: '09:48',
      sofZmanTefilah: '10:43',
      chatzot: '12:40',
      minchaGedolah: '13:10',
      plagHaMincha: '17:08',
      shekia: '18:14',
      tzaitHakochavim: '19:12',
    },
  },
  {
    id: 'jerusalem',
    name: 'Jerusalén (Yerushalayim)',
    country: 'Israel',
    flag: '🇮🇱',
    communityFlavor: 'Costumbre milenaria de encender velas 40 minutos antes de la puesta de sol (*Minhag Yerushalayim*).',
    candleLightingMinutesBeforeSunset: 40,
    sampleSunsetFriday: '18:05',
    sampleCandleLighting: '17:25',
    sampleSunsetSaturday: '18:06',
    sampleHavdalahStandard: '19:02',
    sampleHavdalahRabenuTam: '19:18',
    hebrewDate: 'Jeshván 5787',
    zmanim: {
      alotHaShajar: '05:18',
      netzHaChama: '06:38',
      sofZmanShemaMagenAvraham: '08:58',
      sofZmanShemaGra: '09:34',
      sofZmanTefilah: '10:33',
      chatzot: '12:21',
      minchaGedolah: '12:51',
      plagHaMincha: '16:58',
      shekia: '18:05',
      tzaitHakochavim: '19:02',
    },
  },
  {
    id: 'panama',
    name: 'Ciudad de Panamá',
    country: 'Panamá',
    flag: '🇵🇦',
    communityFlavor: 'Gran comunidad judía Jalabí (Shevet Ajim) y Ashkenazí, con altísima observancia de kashrut y Shabat.',
    candleLightingMinutesBeforeSunset: 18,
    sampleSunsetFriday: '18:10',
    sampleCandleLighting: '17:52',
    sampleSunsetSaturday: '18:11',
    sampleHavdalahStandard: '19:01',
    sampleHavdalahRabenuTam: '19:23',
    hebrewDate: 'Jeshván 5787',
    zmanim: {
      alotHaShajar: '05:04',
      netzHaChama: '06:14',
      sofZmanShemaMagenAvraham: '08:42',
      sofZmanShemaGra: '09:18',
      sofZmanTefilah: '10:20',
      chatzot: '12:12',
      minchaGedolah: '12:42',
      plagHaMincha: '17:09',
      shekia: '18:10',
      tzaitHakochavim: '19:01',
    },
  },
  {
    id: 'buenosaires',
    name: 'Buenos Aires',
    country: 'Argentina',
    flag: '🇦🇷',
    communityFlavor: 'Barrios tradicionales de Once, Flores y Palermo; sinagogas jalabíes (Sucat David), shamíes, sefaradíes y asquenazíes.',
    candleLightingMinutesBeforeSunset: 18,
    sampleSunsetFriday: '19:12',
    sampleCandleLighting: '18:54',
    sampleSunsetSaturday: '19:13',
    sampleHavdalahStandard: '20:14',
    sampleHavdalahRabenuTam: '20:25',
    hebrewDate: 'Jeshván 5787',
    zmanim: {
      alotHaShajar: '04:58',
      netzHaChama: '06:21',
      sofZmanShemaMagenAvraham: '08:52',
      sofZmanShemaGra: '09:32',
      sofZmanTefilah: '10:38',
      chatzot: '12:47',
      minchaGedolah: '13:17',
      plagHaMincha: '18:02',
      shekia: '19:12',
      tzaitHakochavim: '20:14',
    },
  },
  {
    id: 'miami',
    name: 'Miami / Surfside / Aventura',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    communityFlavor: 'Vibrante polo comunitario hispanohablante con sinagogas Jalabí, Shamí, Sefaradí, Ashkenazí y centros de Jabad.',
    candleLightingMinutesBeforeSunset: 18,
    sampleSunsetFriday: '18:50',
    sampleCandleLighting: '18:32',
    sampleSunsetSaturday: '18:51',
    sampleHavdalahStandard: '19:43',
    sampleHavdalahRabenuTam: '20:02',
    hebrewDate: 'Jeshván 5787',
    zmanim: {
      alotHaShajar: '05:54',
      netzHaChama: '07:16',
      sofZmanShemaMagenAvraham: '09:28',
      sofZmanShemaGra: '10:04',
      sofZmanTefilah: '11:00',
      chatzot: '13:03',
      minchaGedolah: '13:33',
      plagHaMincha: '17:48',
      shekia: '18:50',
      tzaitHakochavim: '19:43',
    },
  },
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'España',
    flag: '🇪🇸',
    communityFlavor: 'Cuna del legado histórico de Sefarad y la Comunidad Judía de Madrid.',
    candleLightingMinutesBeforeSunset: 18,
    sampleSunsetFriday: '19:35',
    sampleCandleLighting: '19:17',
    sampleSunsetSaturday: '19:36',
    sampleHavdalahStandard: '20:34',
    sampleHavdalahRabenuTam: '20:47',
    hebrewDate: 'Jeshván 5787',
    zmanim: {
      alotHaShajar: '06:50',
      netzHaChama: '08:21',
      sofZmanShemaMagenAvraham: '10:28',
      sofZmanShemaGra: '11:04',
      sofZmanTefilah: '12:00',
      chatzot: '14:00',
      minchaGedolah: '14:30',
      plagHaMincha: '18:30',
      shekia: '19:35',
      tzaitHakochavim: '20:34',
    },
  },
];