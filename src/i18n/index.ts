import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import langEn from './en/lang.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: langEn },
    },
    fallbackLng: 'en',
    debug: true,

    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
