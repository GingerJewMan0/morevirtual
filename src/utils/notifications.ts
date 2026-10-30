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
      importance: 5,
      sound: 'default',
      vibration: true,
      visibility: 1,
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

// 3. Función de prueba instantánea optimizada para Xiaomi
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
      visibility: 1,
    });
  } catch (e) {
    console.error("Error creando el canal:", e);
  }

  try {
    const result = await LocalNotifications.schedule({
      notifications: [
        {
          title: '🕯️ Prueba Inmediata',
          body: '¡Si ves esto, el puente nativo con Capacitor funciona en Xiaomi!',
          id: 999,
          sound: 'default',
          channelId: 'shabbat_channel',
        }
      ]
    });
    console.log('Notificación programada con éxito:', result);
  } catch (error) {
    console.error('Error al programar la notificación local:', error);
  }
}