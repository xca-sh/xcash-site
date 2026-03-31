import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Layers,
  Webhook,
  Shield,
  Server,
  Coins,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const featureIcons = [CreditCard, ArrowDownToLine, ArrowUpFromLine, Layers, Webhook, Shield, Server, Coins]
const featureStyles = [
  { color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50' },
  { color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50' },
  { color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50' },
  { color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50' },
  { color: 'from-cyan-500 to-sky-500', bg: 'bg-cyan-50' },
  { color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50' },
  { color: 'from-slate-500 to-gray-600', bg: 'bg-slate-50' },
  { color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50' },
]

function FeatureCard({ title, description, index }: { title: string; description: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = featureIcons[index]
  const style = featureStyles[index]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
    >
      <div className="relative">
        <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center mb-4`}>
          <Icon size={20} className={`bg-gradient-to-br ${style.color} bg-clip-text`} style={{ color: 'transparent', WebkitBackgroundClip: 'text' } as React.CSSProperties} />
        </div>
        <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center mb-4 absolute top-0 left-0`}>
          <Icon size={20} className="text-primary" />
        </div>
        <h3 className="text-text-primary font-semibold text-lg mb-2">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true }) as { title: string; description: string }[]

  return (
    <section id="features" className="relative py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-wide uppercase mb-3"
          >
            {t('features.label')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight"
          >
            {t('features.title')}
            <br className="hidden sm:block" />
            {t('features.titleSuffix')}
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <FeatureCard key={i} title={item.title} description={item.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
