import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './local/en/local.json';
import gr from './local/gr/local.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        gr: { translation: gr },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
