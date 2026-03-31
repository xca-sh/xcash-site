import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const planHrefs = [
  'https://github.com/xca-sh/xcash',
  'https://xca.sh',
  'mailto:sales@xca.sh',
]

export default function Pricing() {
  const { t } = useTranslation()
  const plans = t('pricing.plans', { returnObjects: true }) as {
    name: string; price: string; period: string; description: string; cta: string; features: string[]
  }[]

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-wide uppercase mb-3"
          >
            {t('pricing.label')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4"
          >
            {t('pricing.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-xl mx-auto"
          >
            {t('pricing.description')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const featured = i === 1
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  featured
                    ? 'border-2 border-primary bg-white shadow-xl shadow-primary/10'
                    : 'border border-border bg-white'
                }`}
              >
                {featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-medium">
                    {t('pricing.mostPopular')}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                    {plan.period && (
                      <span className="text-text-muted text-sm">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">{plan.description}</p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={planHrefs[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    featured
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20'
                      : 'border border-border hover:border-gray-300 text-text-primary hover:bg-surface-alt'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
