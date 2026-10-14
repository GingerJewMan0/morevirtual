import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.morevirtual.app',
  appName: 'RabVirtual',
  webDir: 'dist',
  server: {
    url: 'https://rabvirtual.onrender.com',
    cleartext: true
  }
};

export default config;