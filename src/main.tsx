import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n.ts';
import './index.css';

// ============================================================================
// PUNTO DE MONTAJE DE LA APLICACIÓN REACT
// ============================================================================

// Selecciona el elemento raíz HTML ('root') y monta el componente principal <App />
createRoot(document.getElementById('root')!).render(<App />);