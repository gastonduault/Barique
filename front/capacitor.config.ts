import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'front',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '803691537332-kmnjce99q497ckkcpmje5so2e581enqu.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;



