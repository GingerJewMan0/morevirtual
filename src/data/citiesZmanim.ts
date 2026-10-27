/**
 * Catálogo ampliado de ciudades y países para el cálculo de Zmanim y Velas de Shabat.
 */
export interface CityLocation {
  id: string;
  name: string;
  country: string;
  geonameid: number;
  latitude: number;
  longitude: number;
  tzid: string;
  isDefaultMexico?: boolean;
}

export const CITIES_DATABASE: CityLocation[] = [
  // --- MÉXICO (Principales comunidades) ---
  {
    id: 'mexico_city',
    name: 'Ciudad de México / Tecamachalco',
    country: 'México',
    geonameid: 3530597,
    latitude: 19.4326,
    longitude: -99.1332,
    tzid: 'America/Mexico_City',
    isDefaultMexico: true,
  },
  {
    id: 'monterrey',
    name: 'Monterrey, Nuevo León',
    country: 'México',
    geonameid: 3996063,
    latitude: 25.6866,
    longitude: -100.3161,
    tzid: 'America/Monterrey',
  },
  {
    id: 'guadalajara',
    name: 'Guadalajara, Jalisco',
    country: 'México',
    geonameid: 4005539,
    latitude: 20.6597,
    longitude: -103.3496,
    tzid: 'America/Mexico_City',
  },
  {
    id: 'cancun',
    name: 'Cancún, Quintana Roo',
    country: 'México',
    geonameid: 3531673,
    latitude: 21.1619,
    longitude: -86.8515,
    tzid: 'America/Cancun',
  },
  {
    id: 'tijuana',
    name: 'Tijuana, Baja California',
    country: 'México',
    geonameid: 3981602,
    latitude: 32.5149,
    longitude: -117.0382,
    tzid: 'America/Tijuana',
  },

  // --- CANADÁ ---
  {
    id: 'toronto',
    name: 'Toronto, Ontario',
    country: 'Canadá',
    geonameid: 6167865,
    latitude: 43.6532,
    longitude: -79.3832,
    tzid: 'America/Toronto',
  },
  {
    id: 'montreal',
    name: 'Montreal, Quebec',
    country: 'Canadá',
    geonameid: 6077243,
    latitude: 45.5017,
    longitude: -73.5673,
    tzid: 'America/Montreal',
  },
  {
    id: 'vancouver',
    name: 'Vancouver, British Columbia',
    country: 'Canadá',
    geonameid: 6173331,
    latitude: 49.2827,
    longitude: -123.1207,
    tzid: 'America/Vancouver',
  },

  // --- ISRAEL ---
  {
    id: 'jerusalem',
    name: 'Jerusalén',
    country: 'Israel',
    geonameid: 281184,
    latitude: 31.7683,
    longitude: 35.2137,
    tzid: 'Asia/Jerusalem',
  },
  {
    id: 'tel_aviv',
    name: 'Tel Aviv / Bnei Brak',
    country: 'Israel',
    geonameid: 293397,
    latitude: 32.0853,
    longitude: 34.7818,
    tzid: 'Asia/Jerusalem',
  },

  // --- ESTADOS UNIDOS ---
  {
    id: 'new_york',
    name: 'Nueva York, NY',
    country: 'Estados Unidos',
    geonameid: 5128581,
    latitude: 40.7128,
    longitude: -74.0060,
    tzid: 'America/New_York',
  },
  {
    id: 'miami',
    name: 'Miami, Florida',
    country: 'Estados Unidos',
    geonameid: 4164138,
    latitude: 25.7617,
    longitude: -80.1918,
    tzid: 'America/New_York',
  },
  {
    id: 'los_angeles',
    name: 'Los Ángeles, California',
    country: 'Estados Unidos',
    geonameid: 5368361,
    latitude: 34.0522,
    longitude: -118.2437,
    tzid: 'America/Los_Angeles',
  },

  // --- LATINOAMÉRICA ---
  {
    id: 'buenos_aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    geonameid: 3435910,
    latitude: -34.6037,
    longitude: -58.3816,
    tzid: 'America/Argentina/Buenos_Aires',
  },
  {
    id: 'sao_paulo',
    name: 'São Paulo',
    country: 'Brasil',
    geonameid: 3448439,
    latitude: -23.5505,
    longitude: -46.6333,
    tzid: 'America/Sao_Paulo',
  },
  {
    id: 'panama_city',
    name: 'Ciudad de Panamá',
    country: 'Panamá',
    geonameid: 3703430,
    latitude: 8.9824,
    longitude: -79.5199,
    tzid: 'America/Panama',
  },

  // --- EUROPA ---
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'España',
    geonameid: 3117735,
    latitude: 40.4168,
    longitude: -3.7038,
    tzid: 'Europe/Madrid',
  },
  {
    id: 'paris',
    name: 'París',
    country: 'Francia',
    geonameid: 2988507,
    latitude: 48.8566,
    longitude: 2.3522,
    tzid: 'Europe/Paris',
  },
  {
    id: 'london',
    name: 'Londres',
    country: 'Reino Unido',
    geonameid: 2643743,
    latitude: 51.5074,
    longitude: -0.1278,
    tzid: 'Europe/London',
  },
];

/**
 * Función auxiliar para calcular la distancia entre dos puntos geográficos (Fórmula de Haversine).
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Función para determinar la ciudad por defecto utilizando la Geolocalización del navegador,
 * respaldada por la configuración regional o Tecamachalco / CDMX por defecto.
 */
export async function getDefaultCity(): Promise<CityLocation> {
  return new Promise((resolve) => {
    // Verificamos si el navegador soporta geolocalización
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          // Buscamos en CITIES_DATABASE cuál es la ciudad más cercana a las coordenadas del usuario
          let closestCity = CITIES_DATABASE[0];
          let minDistance = Infinity;

          for (const city of CITIES_DATABASE) {
            const distance = calculateDistance(userLat, userLon, city.latitude, city.longitude);
            if (distance < minDistance) {
              minDistance = distance;
              closestCity = city;
            }
          }

          // Si encuentra una ciudad a menos de 500 km, la selecciona automáticamente
          if (minDistance < 500) {
            resolve(closestCity);
            return;
          }

          // Si está muy lejos de cualquier base, recurrimos al idioma/región
          resolve(fallbackByLanguage());
        },
        (_error) => {
          // Si el usuario deniega el permiso de ubicación, aplicamos el respaldo regional
          resolve(fallbackByLanguage());
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    } else {
      resolve(fallbackByLanguage());
    }
  });
}

/**
 * Respaldo por idioma o región en caso de que la geolocalización no esté disponible.
 */
function fallbackByLanguage(): CityLocation {
  const isMexicoLang = navigator.language.includes('es-MX');
  
  if (isMexicoLang) {
    const mexicoDefault = CITIES_DATABASE.find(c => c.isDefaultMexico);
    if (mexicoDefault) return mexicoDefault;
  }

  return CITIES_DATABASE[0]; // Por defecto global (Ciudad de México / Tecamachalco)
}