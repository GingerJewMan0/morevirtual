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

// 4. Cancelar la alerta de Carne a Leche (si el usuario reinicia el reloj)
export async function cancelMeatDairyAlert() {
  try {
    await LocalNotifications.cancel({ notifications: [{ id: 102 }] });
  } catch (e) {}
}