import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.one-sim.app',
  appName: 'ionic-sc',
  webDir: 'dist/sc',
  server: {
    androidScheme: 'https' //add server url and rebuild projects
  }
};

export default config;
