import '@fontsource-variable/instrument-sans';
import '@fontsource/instrument-serif';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './styles.css';
import { useStore } from './store';

if (import.meta.env.DEV) (window as unknown as { __store: typeof useStore }).__store = useStore;

registerSW({ immediate: true });
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
