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

  // Crear canal por si acaso
  try {
    await LocalNotifications.createChannel({
      id: 'shabbat_channel',
      name: 'Avisos de Shabat',
      description: 'Canal para notificaciones de entrada de Shabat',
      importance: 5,
      sound: 'default',
      vibration: true,
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
        extra: { route: 'calendar' }
      }
    ]
  });
}

// 3. Función de prueba instantánea (para el botón de 1 minuto en tu Xiaomi)
export async function testInstantNotification() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    alert("No se concedieron los permisos de notificación.");
    return;
  }

  try {
    await LocalNotifications.createChannel({
      id: 'shabbat_channel',
      name: 'Avisos de Shabat',
      description: 'Canal para notificaciones de prueba',
      importance: 5,
      sound: 'default',
      vibration: true,
    });
  } catch (e) {}

  const alertTime = new Date(Date.now() + (60 * 1000));

  await LocalNotifications.schedule({
    notifications: [
      {
        title: '🕯️ Prueba del Rabino Virtual',
        body: '¡Las notificaciones locales de Shabat funcionan perfectamente!',
        id: 999,
        schedule: { 
          at: alertTime,
          allowWhileIdle: true // 🌟 ESTO ES VITAL: Fuerza al teléfono a despertarse aunque esté en modo ahorro
        },
        sound: 'default',
        channelId: 'shabbat_channel',
      }
    ]
  });
  
  console.log('Notificación de prueba programada.');
}