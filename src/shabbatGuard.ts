/**
 * ============================================================================
 * MÓDULO DE VERIFICACIÓN DE SHABAT Y YOM TOV (shabbatGuard / shabbatCheck.ts)
 * ============================================================================
 * Propósito: Consultar en tiempo real la API pública e internacional de Hebcal
 * utilizando coordenadas geográficas (latitud y longitud) para determinar si 
 * la aplicación debe activarse en "Modo de Reposo Halájico" (Shabat o Yom Tov).
 */

export async function checkIsShabbatOrYomTov(lat = 19.4326, lng = -99.1332): Promise<boolean> {
  try {
    // ------------------------------------------------------------------------
    // 1. CONSULTA A LA API DE HEBCAL
    // ------------------------------------------------------------------------
    // Realiza una petición HTTP asíncrona a Hebcal pasando las coordenadas 
    // geográficas de ubicación (por defecto Ciudad de México: 19.4326, -99.1332).
    const response = await fetch(`https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${lng}`);
    
    // Si la respuesta de la red no es exitosa, se asume por defecto que no es Shabat
    if (!response.ok) return false;

    const data = await response.json();
    
    // Si la estructura del JSON no contiene elementos (items), se interrumpe
    if (!data.items) return false;

    // Captura la fecha y hora exacta actual del sistema del usuario
    const now = new Date();

    // ------------------------------------------------------------------------
    // 2. BÚSQUEDA DE HITOS HALÁJICOS (VELAS Y HAVDALÁ)
    // ------------------------------------------------------------------------
    // Filtra dentro de la respuesta los eventos correspondientes a la categoría 
    // de encendido de velas ('candles') y salida de Shabat / Havdalá ('havdalah').
    const candleItem = data.items.find((i: any) => i.category === 'candles');
    const havdalahItem = data.items.find((i: any) => i.category === 'havdalah');

    // ------------------------------------------------------------------------
    // 3. EVALUACIÓN DEL RANGO DE TIEMPO
    // ------------------------------------------------------------------------
    if (candleItem && havdalahItem) {
      const shabatStart = new Date(candleItem.date);
      const shabatEnd = new Date(havdalahItem.date);

      // Si el momento actual se encuentra comprendido estrictamente entre 
      // el encendido de velas y la havdalá -> retorna true (Es Shabat / Yom Tov)
      if (now >= shabatStart && now <= shabatEnd) {
        return true;
      }
    }

    // Fuera de ese rango temporal, la función retorna falso
    return false;

  } catch (e) {
    // ------------------------------------------------------------------------
    // 4. CONTROL DE EXCEPCIONES Y SEGURIDAD
    // ------------------------------------------------------------------------
    console.error('Error al verificar Shabat con Hebcal:', e);
    
    // Ante cualquier fallo de red o error inesperado, se retorna false por 
    // seguridad para evitar bloquear la operatividad de la interfaz de usuario.
    return false; 
  }
}