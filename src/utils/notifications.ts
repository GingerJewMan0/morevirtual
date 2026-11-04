import { LocalNotifications } from '@capacitor/local-notifications';

// 1. Pedir permisos
export async function requestNotificationPermissions() {
  const permission = await LocalNotifications.requestPermissions();
  return permission.display === 'granted';
}

// 2. Programar la alerta real de Shabat
export async function scheduleShabbatAlert(shabatDate: Date, parashaName: string) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  try {
    await LocalNotifications.createChannel({
    id: 'shabbat_channel',
    name: 'Avisos de Shabat',
    description: 'Canal para notificaciones de entrada de Shabat',
    importance: 5,     // Notificación de alta prioridad
    sound: 'default',
    vibration: true,
    visibility: 1,      // 1 = PUBLIC (Visible en pantalla de bloqueo)
  });
  } catch (e) {}

  const alertTime = new Date(shabatDate.getTime() - (2 * 60 * 60 * 1000));
  if (alertTime.getTime() <= Date.now()) return;

  await LocalNotifications.schedule({
    notifications: [
      {
        title: '🕯️ Preparativos de Shabat',
        body: `Shabat se acerca. La porción de esta semana es ${parashaName}. ¡Que tengas un shalom alejem!`,
        id: 101,
        schedule: { at: alertTime },
        sound: 'default',
        channelId: 'shabbat_channel',
        largeIcon: 'ic_rabvirtual', // Logo de Rabino Virtual
        iconColor: '#10B981',        // Color verde esmeralda para acentos
        extra: { route: 'calendar' }
      }
    ]
  });
}

// 3. Programar la alerta de Carne a Leche
export async function scheduleMeatDairyAlert(durationMs: number, title?: string, body?: string) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  try {
    await LocalNotifications.createChannel({
    id: 'meat_dairy_channel',
    name: 'Temporizador Carne a Leche',
    description: 'Canal para notificaciones del temporizador de alimentos lácteos',
    importance: 5,     // Notificación de alta prioridad
    sound: 'default',
    vibration: true,
    visibility: 1,      // 1 = PUBLIC (Visible en pantalla de bloqueo)
  });
  } catch (e) {}

  const alertTime = new Date(Date.now() + durationMs);

  // Cancelamos cualquier notificación previa del temporizador (ID: 102) por si se reinició
  try {
    await LocalNotifications.cancel({ notifications: [{ id: 102 }] });
  } catch (e) {}

  await LocalNotifications.schedule({
    notifications: [
      {
        title: title || '¡Espera de Carne concluidas! 🥛',
        body: body || 'Ha transcurrido el tiempo estipulado. Ya puedes consumir alimentos lácteos.',
        id: 102,
        schedule: { at: alertTime },
        sound: 'default',
        channelId: 'meat_dairy_channel',
        largeIcon: 'ic_rabvirtual', // Logo de Rabino Virtual
        iconColor: '#10B981',        // Color verde esmeralda para acentos
        extra: { route: 'meat-dairy' }
      }
    ]
  });
}

// Cancelar la alerta de Carne a Leche (si el usuario reinicia el reloj)
export async function cancelMeatDairyAlert() {
  try {
    await LocalNotifications.cancel({ notifications: [{ id: 102 }] });
  } catch (e) {}
}

// 4. Omer 
export async function scheduleOmerNotifications(startDate: Date) {
  const notifications = [];

  for (let day = 1; day <= 49; day++) {
    // Calcular la fecha para cada día del Omer
    const notificationDate = new Date(startDate);
    notificationDate.setDate(startDate.getDate() + (day - 1));
    notificationDate.setHours(20, 0, 0, 0); // Ajustar a las 8:00 PM o según la puesta de sol

    notifications.push({
      title: `Cuenta del Omer - Día ${day}`,
      body: `Es hora de contar el día ${day} del Omer de esta noche.`,
      id: 5000 + day, // ID único para cada notificación del Omer
      schedule: { at: notificationDate },
      sound: 'default',
    });
  }

  await LocalNotifications.schedule({ notifications });
}

// Januca

export const CHANUKAH_NIGHTS = [
  { night: 1, candles: 1, title: { es: '1ª Vela de Janucá', he: 'נר ראשון של חנוכה' } },
  { night: 2, candles: 2, title: { es: '2ª Vela de Janucá', he: 'נר שני של חנוכה' } },
  { night: 3, candles: 3, title: { es: '3ª Vela de Janucá', he: 'נר שלישי של חנוכה' } },
  { night: 4, candles: 4, title: { es: '4ª Vela de Janucá', he: 'נר רביעי של חנוכה' } },
  { night: 5, candles: 5, title: { es: '5ª Vela de Janucá', he: 'נר חמישי של חנוכה' } },
  { night: 6, candles: 6, title: { es: '6ª Vela de Janucá', he: 'נר ששי של חנוכה' } },
  { night: 7, candles: 7, title: { es: '7ª Vela de Janucá', he: 'נר שביעי של חנוכה' } },
  { night: 8, candles: 8, title: { es: '8ª Vela de Janucá', he: 'נר שמיני של חנוכה' } },
];

export async function scheduleChanukahNotifications(firstNightDate: Date) {
  const notifications = [];

  for (let i = 0; i < CHANUKAH_NIGHTS.length; i++) {
    const nightData = CHANUKAH_NIGHTS[i];
    
    // Calcular la fecha para cada noche de Janucá (del día 1 al 8)
    const notificationDate = new Date(firstNightDate);
    notificationDate.setDate(firstNightDate.getDate() + i);
    notificationDate.setHours(18, 30, 0, 0); // Hora aproximada al caer la noche (ajustable)

    notifications.push({
      title: `¡Es de noche de Janucá! (${nightData.title.es})`,
      body: `Esta noche encendemos ${nightData.candles} ${nightData.candles === 1 ? 'vela' : 'velas'}. ¡No olvides las bendiciones!`,
      id: 6000 + (i + 1), // ID único para las notificaciones de Janucá
      schedule: { at: notificationDate },
      sound: 'default',
    });
  }

  await LocalNotifications.schedule({ notifications });
}