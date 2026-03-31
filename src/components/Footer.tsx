import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useTranslation()

  const footerSections = [
    {
      title: t('footer.product'),
      links: [
        { label: t('footer.links.features'), href: '#features' },
        { label: t('footer.links.pricing'), href: '#pricing' },
        { label: t('footer.links.security'), href: '#security' },
        { label: t('footer.links.changelog'), href: 'https://github.com/xca-sh/xcash/releases' },
      ],
    },
    {
      title: t('footer.developers'),
      links: [
        { label: t('footer.links.documentation'), href: 'https://docs.xca.sh' },
        { label: t('footer.links.apiReference'), href: 'https://docs.xca.sh/api' },
        { label: t('footer.links.github'), href: 'https://github.com/xca-sh/xcash' },
        { label: t('footer.links.selfHosting'), href: 'https://docs.xca.sh/deploy' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.links.about'), href: '#' },
        { label: t('footer.links.blog'), href: '#' },
        { label: t('footer.links.contact'), href: 'mailto:hello@xca.sh' },
        { label: t('footer.links.privacy'), href: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <span className="text-text-primary font-semibold text-lg tracking-tight">Xcash</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-[240px]">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {[
                { icon: GithubIcon, href: 'https://github.com/xca-sh/xcash', label: 'GitHub' },
                { icon: TwitterIcon, href: '#', label: 'Twitter' },
                { icon: MessageCircle, href: '#', label: 'Discord' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-gray-300 transition-colors duration-200 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-text-primary text-sm font-semibold mb-4">{section.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-text-muted hover:text-text-primary text-sm transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-text-muted text-xs">
            {t('footer.slogan')}
          </p>
        </div>
      </div>
    </footer>
  )
}
