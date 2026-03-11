'use client'

import { useLanguage } from '@/app/context/language-context'
import { motion } from 'framer-motion'

const trustItems = [
  {
    keyEn: 'Average response time in Berlin',
    keyDe: 'Durchschnittliche Reaktionszeit in Berlin',
    stat: '60',
    unit: 'min'
  },
  {
    keyEn: 'Years of plumbing experience',
    keyDe: 'Jahre Erfahrung im Sanitärbereich',
    stat: '20+',
    unit: ''
  },
  {
    keyEn: 'Repairs with warranty',
    keyDe: 'Reparaturen mit Gewährleistung',
    stat: '2',
    unit: 'yrs'
  },
  {
    keyEn: 'Emergency jobs per year',
    keyDe: 'Notfälle pro Jahr',
    stat: '500+',
    unit: ''
  }
]

export function TrustBadges() {
  const { language, t } = useLanguage()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  } as any

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "circOut" } }
  } as any

  return (
    <section className="py-16 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center tracking-tight max-w-3xl">
            {t('trust.title')}
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trustItems.map((trust, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-foreground tracking-tight">
                  {trust.stat}
                </span>
                {trust.unit && (
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {trust.unit}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-snug">
                {language === 'de' ? trust.keyDe : trust.keyEn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
