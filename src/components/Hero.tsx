import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, Bitcoin, Wallet, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * Hero V3: Split Layout + Dashboard Mockup
 * - Left: content, right: payment dashboard mockup
 * - Warm gradient background (blue → indigo)
 * - Interactive-looking dashboard cards
 * - Professional payment gateway feel
 */

function RotatingTypewriter({ phrases }: { phrases: string[] }) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const phrasesRef = useRef(phrases)
  phrasesRef.current = phrases

  useEffect(() => {
    const phrase = phrasesRef.current[phraseIndex]
    if (!phrase) return

    if (!isDeleting && displayed === phrase) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrasesRef.current.length)
      return
    }

    const speed = isDeleting ? 30 : 60
    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting ? phrase.slice(0, displayed.length - 1) : phrase.slice(0, displayed.length + 1)
      )
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, phraseIndex])

  return (
    <>
      {displayed}
      <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 translate-y-[0.1em] animate-[blink_1s_steps(2)_infinite]" />
    </>
  )
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const start = performance.now()
          function step(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

function DashboardMockup() {
  const { t: _t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Main dashboard card */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden"
      >
        {/* Dashboard header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet size={16} className="text-primary" />
            </div>
            <span className="text-sm font-semibold text-text-primary">Xcash Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-600 font-medium">Live</span>
          </div>
        </div>

        {/* Balance section */}
        <div className="px-5 py-5">
          <div className="text-xs text-text-muted mb-1">Total Balance</div>
          <div className="text-2xl font-bold text-text-primary tabular-nums">$12,847.32</div>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={14} className="text-emerald-500" />
            <span className="text-xs text-emerald-600 font-medium">+12.5% this week</span>
          </div>
        </div>

        {/* Transactions */}
        <div className="px-5 pb-5">
          <div className="text-xs font-medium text-text-muted mb-3">Recent Transactions</div>
          <div className="space-y-3">
            {[
              { icon: Bitcoin, name: 'BTC Payment', amount: '+0.0034 BTC', usd: '$218.40', color: 'bg-orange-100 text-orange-600', status: 'confirmed' },
              { icon: Globe, name: 'ETH Deposit', amount: '+1.25 ETH', usd: '$4,125.00', color: 'bg-blue-100 text-blue-600', status: 'confirmed' },
              { icon: Zap, name: 'USDT Withdraw', amount: '-500 USDT', usd: '$500.00', color: 'bg-emerald-100 text-emerald-600', status: 'pending' },
            ].map((tx) => (
              <div key={tx.name} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${tx.color} flex items-center justify-center`}>
                    <tx.icon size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">{tx.name}</div>
                    <div className="text-xs text-text-muted">{tx.amount}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-text-primary tabular-nums">{tx.usd}</div>
                  <div className={`text-xs ${tx.status === 'confirmed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {tx.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating notification card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg shadow-black/5 border border-gray-100 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <Shield size={12} className="text-emerald-600" />
          </div>
          <div>
            <div className="text-xs font-medium text-text-primary">HMAC Verified</div>
            <div className="text-[10px] text-text-muted">All requests signed</div>
          </div>
        </div>
      </motion.div>

      {/* Floating chain count */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg shadow-black/5 border border-gray-100 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {['bg-orange-400', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500'].map((color, i) => (
              <div key={i} className={`w-5 h-5 rounded-full ${color} border-2 border-white`} />
            ))}
          </div>
          <span className="text-xs font-medium text-text-primary">100+ Chains</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const rawPhrases = t('hero.phrases', { returnObjects: true })
  const phrases = Array.isArray(rawPhrases) ? rawPhrases as string[] : ['自主掌控']
  const longestPhrase = phrases.reduce((a, b) => (a.length >= b.length ? a : b), '')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-indigo-200/15 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/15 bg-white/80 backdrop-blur-sm text-primary text-sm font-medium mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t('hero.badge')}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.08] mb-6"
            >
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
              <br />
              <span className="relative inline-grid">
                <span className="invisible col-start-1 row-start-1">{longestPhrase}</span>
                <span className="col-start-1 row-start-1">
                  <RotatingTypewriter phrases={phrases} />
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-text-secondary max-w-lg mb-10 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-3 mb-12"
            >
              <a
                href="https://github.com/xca-sh/xcash"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 cursor-pointer"
              >
                {t('hero.ctaStart')}
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="https://github.com/xca-sh/xcash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 text-text-primary font-medium px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white shadow-sm cursor-pointer"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {t('hero.ctaGithub')}
              </a>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Zap, text: t('hero.pillChains') },
                { icon: Shield, text: t('hero.pillCustody') },
                { icon: Globe, text: t('hero.pillFees') },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 border border-gray-200/60 text-sm text-text-secondary"
                >
                  <item.icon size={14} className="text-primary" />
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl"
        >
          {[
            { value: 100, suffix: '+', label: t('hero.statChains') },
            { value: 3, suffix: 'min', label: t('hero.statSetup') },
            { value: 0, suffix: '%', label: t('hero.statFees'), override: '0%' },
            { value: 99, suffix: '.9%', label: t('hero.statUptime') },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold text-text-primary tabular-nums">
                {stat.override ?? <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-sm text-text-muted mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
