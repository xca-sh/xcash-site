import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* Animated gradient mesh background */
function MeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/50" />
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/30 blur-[80px]"
      />
      <motion.div
        animate={{ x: [0, -40, 20, 0], y: [0, 20, -30, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-200/30 to-violet-200/20 blur-[80px]"
      />
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 10, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-sky-100/40 to-blue-100/30 blur-[60px]"
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

/* Floating payment flow visualization */
function FloatingCards() {
  const cards = [
    { icon: '₿', label: 'BTC', amount: '0.0034', color: 'from-orange-400 to-amber-500', shadow: 'shadow-orange-200/50', x: 'right-[8%]', y: 'top-[18%]', delay: 0 },
    { icon: 'Ξ', label: 'ETH', amount: '1.25', color: 'from-blue-400 to-indigo-500', shadow: 'shadow-blue-200/50', x: 'right-[2%]', y: 'top-[48%]', delay: 0.3 },
    { icon: '$', label: 'USDT', amount: '500.00', color: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-200/50', x: 'right-[12%]', y: 'bottom-[22%]', delay: 0.6 },
  ]

  return (
    <div className="absolute inset-0 hidden lg:block">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 + card.delay, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${card.x} ${card.y}`}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            className={`bg-white rounded-2xl p-4 shadow-xl ${card.shadow} border border-gray-100/80 backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white font-bold text-lg`}>
                {card.icon}
              </div>
              <div>
                <div className="text-xs text-text-muted">{card.label}</div>
                <div className="text-sm font-semibold text-text-primary tabular-nums">{card.amount}</div>
              </div>
              <div className="ml-2">
                <svg width="40" height="20" viewBox="0 0 40 20" className="text-emerald-400">
                  <polyline points="0,15 8,12 16,8 24,10 32,4 40,2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

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
      <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-baseline animate-[blink_1s_steps(2)_infinite]" />
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

export default function Hero() {
  const { t } = useTranslation()
  const phrases = t('hero.phrases', { returnObjects: true }) as string[]
  const longestPhrase = phrases.reduce((a, b) => (a.length >= b.length ? a : b), '')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <MeshBackground />
      <FloatingCards />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/5 text-primary text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t('hero.badge')}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.08] mb-6"
          >
            {t('hero.title')}
            <br />
            <span className="relative inline-grid">
              <span className="invisible col-start-1 row-start-1">{longestPhrase}</span>
              <span className="col-start-1 row-start-1 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                <RotatingTypewriter phrases={phrases} />
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          >
            <a
              href="https://github.com/xca-sh/xcash"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 cursor-pointer"
            >
              {t('hero.ctaStart')}
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
            <a
              href="https://github.com/xca-sh/xcash"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-text-primary font-medium px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-gray-50 cursor-pointer"
            >
              <GithubIcon size={18} />
              {t('hero.ctaGithub')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {[
              { icon: Zap, text: t('hero.pillChains') },
              { icon: Shield, text: t('hero.pillCustody') },
              { icon: Globe, text: t('hero.pillFees') },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-text-secondary">
                <item.icon size={16} className="text-primary" />
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl"
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
