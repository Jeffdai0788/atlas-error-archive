
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3fb47c5c1db14a7589fcc9b627ddc0b5',
  appName: 'atlas-error-archive',
  webDir: 'dist',
  server: {
    url: 'https://3fb47c5c-1db1-4a75-89fc-c9b627ddc0b5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
