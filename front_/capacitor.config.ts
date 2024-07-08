import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'front',
  webDir: 'public',
  android: {
    path: "C:\\Users\\gasdu\\AppData\\Local\\Programs\\Android Studio\\bin\\studio64.exe"
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '803691537332-kmnjce99q497ckkcpmje5so2e581enqu.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};
export default config;