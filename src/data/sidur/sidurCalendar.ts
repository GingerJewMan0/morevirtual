/**
 * Presentación de fecha hebrea OFFLINE mediante Intl nativo.
 * Esta función NO calcula horarios de puesta del sol, ni decide automáticamente
 * si se dice Tajanún, Yaaleh VeYavó u otras inserciones del calendario.
 * Tales reglas requieren fecha halájica, ubicación y un motor validado por rito.
 */
export function getSidurDayInfo(date: Date = new Date()) {
  const day = date.getDay();
  const hebrewDate = new Intl.DateTimeFormat('he-u-ca-hebrew', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(date);
  return {
    civilDate: date.toLocaleDateString(),
    hebrewDate,
    isShabbat: day === 6,
    isSunday: day === 0,
    // No usamos esta marca como prueba de que el día es un día laborable judío.
    weekday: day !== 6,
  };
}
