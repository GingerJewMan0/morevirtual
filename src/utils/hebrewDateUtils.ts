import { HDate, months } from '@hebcal/core';

/**
 * 1. CONVERTIDOR: Gregoriano a Hebreo
 * Convierte una fecha normal a fecha hebrea, tomando en cuenta si ya anocheció.
 */
export function convertGregorianToHebrew(date: Date, isAfterSunset: boolean = false) {
  // HDate toma la fecha gregoriana y la convierte
  let hebrewDate = new HDate(date);

  // En el judaísmo, el nuevo día empieza al anochecer. 
  // Si el usuario marca "después del atardecer", sumamos un día.
  if (isAfterSunset) {
    hebrewDate = hebrewDate.next();
  }

  return {
    day: hebrewDate.getDate(),
    month: hebrewDate.getMonthName(), // ej. "Nisan", "Tishrei"
    year: hebrewDate.getFullYear(),
    stringFormat: hebrewDate.render('es'), // Devuelve el texto, ej. "15 de Nisán, 5787"
  };
}


/**
 * 2. BUSCADOR / PROYECTOR: Próximas fechas (Cumpleaños hebreo, Yahrzeit, etc.)
 * Le pasas el día y mes hebreo de un evento, y te devuelve en qué fechas 
 * gregorianas caerá durante los próximos X años.
 */
export function getFutureEvents(hebrewDay: number, hebrewMonth: string, currentHebrewYear: number, yearsToProject: number = 5) {
  const futureDates = [];

  for (let i = 0; i < yearsToProject; i++) {
    const targetYear = currentHebrewYear + i;
    
    try {
      // Creamos la fecha hebrea para el año futuro
      const futureHDate = new HDate(hebrewDay, hebrewMonth, targetYear);
      
      futureDates.push({
        hebrewYear: targetYear,
        hebrewDateString: futureHDate.render('es'),
        // Lo convertimos de vuelta a gregoriano para saber cuándo cae en el calendario normal
        gregorianDate: futureHDate.greg() 
      });
    } catch (error) {
      // Manejo de errores para años bisiestos (ej. si nació en Adar I y el año no es bisiesto)
      console.warn(`Error calculando la fecha para el año ${targetYear}`);
    }
  }

  return futureDates;
}