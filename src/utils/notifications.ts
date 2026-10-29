import { LocalNotifications } from '@capacitor/local-notifications';

export async function requestNotificationPermissions() {
  const permission = await LocalNotifications.requestPermissions();
  return permission.display === 'granted';
}

// Función para programar el aviso de Shabat (por ejemplo, 2 horas antes del encendido)
export async function scheduleShabbatAlert(shabatDate: Date, parashaName: string) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  // Calculamos 2 horas antes de la entrada de Shabat
  const alertTime = new Date(shabatDate.getTime() - (2 * 60 * 60 * 1000));

  // Si la hora de la alerta ya pasó, no la programamos
  if (alertTime.getTime() <= Date.now()) return;

  await LocalNotifications.schedule({
    notifications: [
      {
        title: '🕯️ Preparativos de Shabat',
        body: `Shabat se acerca. La porción de esta semana es ${parashaName}. ¡Que tengas un shalom alejem!`,
        id: 101,
        schedule: { at: alertTime },
        sound: 'default',
        extra: {
          route: 'calendar'
        }
      }
    ]
  });
}

//prueba temporal
export async function testInstantNotification() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  // Programar la alerta para dentro de 1 minuto para probar ya mismo
  const alertTime = new Date(Date.now() + (60 * 1000));

  await LocalNotifications.schedule({
    notifications: [
      {
        title: '🕯️ Prueba de Notificación',
        body: '¡Las notificaciones locales de Shabat están funcionando perfectamente!',
        id: 999,
        schedule: { at: alertTime },
        sound: 'default'
      }
    ]
  });
  console.log('Notificación de prueba programada para dentro de 1 minuto.');
}