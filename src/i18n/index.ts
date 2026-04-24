import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './zh.json'
import en from './en.json'

const isServer = typeof window === 'undefined'
const savedLang = isServer ? null : localStorage.getItem('lang')

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
    },
    lng: savedLang || 'zh',
    fallbackLng: 'zh',
    interpolation: { escapeValue: false },
  })
}

export default i18n
