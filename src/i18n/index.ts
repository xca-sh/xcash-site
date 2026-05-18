import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './zh.json'
import en from './en.json'

const isServer = typeof window === 'undefined'

function getInitialLang(): string {
  // 1. URL param ?lang=en takes priority
  if (!isServer) {
    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')
    if (urlLang === 'en' || urlLang === 'zh') {
      localStorage.setItem('lang', urlLang)
      // Update HTML lang attribute immediately
      document.documentElement.lang = urlLang === 'en' ? 'en' : 'zh-CN'
      return urlLang
    }
  }
  // 2. Fall back to localStorage
  return (isServer ? null : localStorage.getItem('lang')) || 'zh'
}

const initialLang = getInitialLang()

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
    },
    lng: initialLang,
    fallbackLng: 'zh',
    interpolation: { escapeValue: false },
  })
}

export default i18n
