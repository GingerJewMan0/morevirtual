import { HDate } from '@hebcal/core';

/**
 * 1. CONVERTIDOR: Gregoriano a Hebreo
 */
export function convertGregorianToHebrew(date: Date, isAfterSunset: boolean = false) {
  let hebrewDate = new HDate(date);

  if (isAfterSunset) {
    hebrewDate = hebrewDate.next();
  }

  return {
    day: hebrewDate.getDate(),
    month: hebrewDate.getMonthName(),
    year: hebrewDate.getFullYear(),
    stringFormat: hebrewDate.render('es'),
  };
}

/**
 * 2. BUSCADOR / PROYECTOR SEGURO
 */
export function getFutureEvents(hebrewDay: number, hebrewMonth: number | string, currentHebrewYear: number, yearsToProject: number = 5) {
  const futureDates = [];

  // Límite estricto de seguridad para evitar cualquier bucle infinito
  const maxYears = Math.min(Math.max(yearsToProject, 1), 20);

  for (let i = 0; i < maxYears; i++) {
    const targetYear = currentHebrewYear + i;
    
    try {
      // Usamos HDate de forma segura con el año, mes y día
      const futureHDate = new HDate(hebrewDay, hebrewMonth as any, targetYear);
      
      futureDates.push({
        hebrewYear: targetYear,
        hebrewDateString: futureHDate.render('es'),
        gregorianDate: futureHDate.greg() 
      });
    } catch (error) {
      console.warn(`Aviso: No se pudo calcular para el año hebreo ${targetYear}`);
    }
  }

  return futureDates;
}