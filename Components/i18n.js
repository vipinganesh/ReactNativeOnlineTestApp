import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import ger from './ger.json';
import fre from './fre.json';
  
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    hi: hi,
    ger:ger,
    fre:fre,
  },
  interpolation: {
    escapeValue: false
  },
  react:{
      useSuspense:false,
  }
});
  
export default i18n;