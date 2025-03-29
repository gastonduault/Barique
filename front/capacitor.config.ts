import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Barique',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: "97526311048-tmiibfki5o5plfcjel513b0n4a5qan0e.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
