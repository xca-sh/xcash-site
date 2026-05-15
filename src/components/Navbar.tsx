import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const docsUrl = 'https://github.com/xca-sh/xcash/blob/main/API.md'

  const navLinks = [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.integration'), href: '#integration' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.security'), href: '#security' },
  ]

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <img src="/logo.svg" alt="Xcash" className="w-8 h-8" />
          <span className="text-text-primary font-semibold text-lg tracking-tight">Xcash</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
            aria-label="Switch language"
          >
            <Globe size={15} />
            {i18n.language === 'zh' ? 'EN' : '中文'}
          </button>
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 px-4 py-2 cursor-pointer"
          >
            {t('nav.docs')}
          </a>
          <a
            href="https://github.com/xca-sh/xcash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-200 px-4 py-2 rounded-lg cursor-pointer"
          >
            {t('nav.getStarted')}
          </a>
        </div>

        <button
          className="md:hidden text-text-primary p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 py-2 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 py-2 cursor-pointer"
              >
                {t('nav.docs')}
              </a>
              <button
                onClick={toggleLang}
                aria-label="Switch language"
                className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors duration-200 py-2 cursor-pointer"
              >
                <Globe size={15} />
                {i18n.language === 'zh' ? 'English' : '中文'}
              </button>
              <a
                href="https://github.com/xca-sh/xcash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-200 px-4 py-2.5 rounded-lg text-center mt-2 cursor-pointer"
              >
                {t('nav.getStarted')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
