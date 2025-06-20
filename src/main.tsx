
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './mobile.css'

// Detect if running in Capacitor
const isCapacitor = window.location.protocol === 'capacitor:';
if (isCapacitor) {
  document.body.classList.add('capacitor');
}

createRoot(document.getElementById("root")!).render(<App />);
