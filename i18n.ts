import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './languages/english';
import arabic from './languages/arabic';
import tigrinya from './languages/tigrinya';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: english,
    },
    ar: {
      translation: arabic,
    },
    ti: {
      translation: tigrinya,
    },
  },
});
