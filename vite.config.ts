/**
 * ============================================================================
 * CONFIGURACIÓN DE VITE PARA EL PROYECTO (vite.config.ts)
 * ============================================================================
 * Propósito: Archivo de configuración central de Vite. Integra los plugins
 * oficiales de React y TailwindCSS (v4), configura los alias de rutas para 
 * simplificar importaciones y gestiona de forma condicional el Hot Module Replacement 
 * (HMR) y la observación de archivos para optimizar el rendimiento en entornos de IA.
 */

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    // Definición de plugins utilizados para compilar la aplicación
    plugins: [
      react(),       // Plugin oficial para soporte de React y JSX
      tailwindcss()  // Plugin de Tailwind CSS (versión 4) para estilos modernos
    ],

    // Resolución de rutas y alias personalizados
    resolve: {
      alias: {
        // Permite usar '@/' como acceso directo al directorio raíz del proyecto
        '@': path.resolve(__dirname, '.'),
      },
    },

    // Configuración del servidor de desarrollo de Vite
    server: {
      // HMR (Hot Module Replacement) se deshabilita en AI Studio vía la variable DISABLE_HMR.
      // IMPORTANTE: No modificar, ya que previene parpadeos o recargas innecesarias durante las ediciones del agente.
      hmr: process.env.DISABLE_HMR !== 'true',
      
      // Desactiva el monitoreo (watch) de archivos cuando DISABLE_HMR es true para ahorrar CPU durante la edición automática.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});