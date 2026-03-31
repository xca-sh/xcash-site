import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download, Settings, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const stepIcons = [Download, Settings, Rocket]
const stepCodes = [
  'git clone https://github.com/xca-sh/xcash\ncd xcash && docker compose up -d',
  '# Admin panel at https://your-domain/admin\n# Create project → Add chains → Get API keys',
  'POST /api/v1/invoice/\n{\n  "amount": "99.00",\n  "currency": "USD"\n}',
]

function StepCard({ title, description, index }: { title: string; description: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = stepIcons[index]
  const code = stepCodes[index]
  const step = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {index < 2 && (
        <div className="hidden lg:block absolute top-14 left-[calc(100%_-_8px)] w-[calc(100%_-_48px)] h-px">
          <div className="w-full h-full bg-gradient-to-r from-border to-transparent" />
        </div>
      )}

      <div className="relative p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shrink-0">
            <Icon size={22} className="text-white" />
          </div>
          <span className="text-5xl font-black text-gray-100">{step}</span>
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">{description}</p>

        <div className="rounded-lg bg-code-bg p-4 font-mono text-xs leading-relaxed overflow-x-auto">
          {code.split('\n').map((line, i) => (
            <div key={i} className={line.startsWith('#') ? 'text-gray-500' : 'text-green-400'}>
              {line.startsWith('#') ? line : (
                <>
                  <span className="text-gray-500 select-none">$ </span>
                  {line}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('howItWorks.steps', { returnObjects: true }) as { title: string; description: string }[]

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-wide uppercase mb-3"
          >
            {t('howItWorks.label')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight"
          >
            {t('howItWorks.title')}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <StepCard key={i} title={step.title} description={step.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
