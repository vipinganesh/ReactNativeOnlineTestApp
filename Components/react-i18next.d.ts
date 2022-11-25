import 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import fre from './fre.json';
import ger from './ger.json'

declare module 'react-i18next' {
    interface Resources {
      en: typeof en;
      hi: typeof hi;
      ger:typeof ger;
      fre:typeof fre;
    }
}

declare module 'react-i18next' {
    interface CustomTypeOptions {
      defaultNS: 'en';
      resources: {
        en: typeof en;
        hi: typeof hi;
        ger: typeof ger;
        fre: typeof fre;
      };
    };
};