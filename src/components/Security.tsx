import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server, Key, FileCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const securityIcons = [Lock, Key, Eye, Server, Shield, FileCheck]

export default function Security() {
  const { t } = useTranslation()
  const items = t('security.items', { returnObjects: true }) as { title: string; description: string }[]
  const badges = t('security.badges', { returnObjects: true }) as string[]

  return (
    <section id="security" className="relative py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-medium tracking-wide uppercase mb-3"
            >
              {t('security.label')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-6"
            >
              {t('security.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary leading-relaxed mb-10"
            >
              {t('security.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm"
                >
                  <Shield size={12} />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item, i) => {
              const Icon = securityIcons[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-xl border border-border bg-card hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
                >
                  <Icon size={18} className="text-primary mb-3" />
                  <h3 className="text-text-primary font-medium text-sm mb-1.5">{item.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
