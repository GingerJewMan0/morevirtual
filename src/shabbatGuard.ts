export async function checkIsShabbatOrYomTov(lat = 19.4326, lng = -99.1332): Promise<boolean> {
  try {
    // Consultamos la API pública e internacional de Hebcal para obtener los horarios de Shabat
    const response = await fetch(`https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${lng}`);
    if (!response.ok) return false;

    const data = await response.json();
    if (!data.items) return false;

    const now = new Date();

    const candleItem = data.items.find((i: any) => i.category === 'candles');
    const havdalahItem = data.items.find((i: any) => i.category === 'havdalah');

    if (candleItem && havdalahItem) {
      const shabatStart = new Date(candleItem.date);
      const shabatEnd = new Date(havdalahItem.date);

      // Si el momento actual está entre el encendido de velas y la havdalá -> es Shabat
      if (now >= shabatStart && now <= shabatEnd) {
        return true;
      }
    }

    return false;
  } catch (e) {
    console.error('Error al verificar Shabat con Hebcal:', e);
    return false; // Ante cualquier fallo de red, por seguridad no bloquea
  }
}