import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mdarsalan.stickerly',
  appName: 'stickerly',
  webDir: 'out',
  server: {
    url: 'https://stickerlyy.vercel.app',
    cleartext: true
  }
};

export default config;
