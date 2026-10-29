import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.morevirtual.app',
  appName: 'RabVirtual',
  webDir: 'dist',
  // 🌟 Quitamos el bloque "server" para que cargue los archivos empaquetados localmente
};

export default config;