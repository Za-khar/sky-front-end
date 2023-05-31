import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './languages'

const resources = {
  en: {
    translation: en,
  },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  returnNull: false,
  keySeparator: false,
  resources,
  lng: 'en',
  fallbackLng: 'en',
  returnEmptyString: true,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
