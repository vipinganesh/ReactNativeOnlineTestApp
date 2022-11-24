import 'react-i18next';
import en from './en.json';
import hi from './hi.json';

declare module 'react-i18next' {
    interface Resources {
      en: typeof en;
      hi: typeof hi;
    }
}

declare module 'react-i18next' {
    interface CustomTypeOptions {
      defaultNS: 'en';
      resources: {
        en: typeof en;
        hi: typeof hi;
      };
    };
};