'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/context/language-context'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { 
  ArrowRight, 
  MoveHorizontal,
  Camera,
  Search,
  FileText,
  Wrench,
  Timer
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ComparisonSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
}

function ComparisonSlider({ beforeImage, afterImage, beforeLabel, afterLabel }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-[2.5rem] cursor-ew-resize select-none border border-white/20 shadow-xl group"
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => handleMove(e.clientX)}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => handleMove(e.touches[0].clientX)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      />
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center border border-white/50"
        >
          <MoveHorizontal className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
      <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/10">
        {beforeLabel}
      </div>
      <div className="absolute top-6 right-6 px-4 py-2 bg-success/80 backdrop-blur-md text-success-foreground text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/10">
        {afterLabel}
      </div>
    </div>
  )
}

const services = [
  {
    id: 'leaking-pipe-repair',
    beforeImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1585128903994-9788298932a4?w=800&h=600&fit=crop',
    titleEn: 'Leaking Pipe Repair',
    titleDe: 'Undichte Rohrreparatur',
    descEn: 'Fixed burst water pipe under kitchen sink with precision.',
    descDe: 'Geplatzte Wasserleitung unter Spüle mit Präzision repariert.'
  },
  {
    id: 'clogged-drain-unclogging',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
    titleEn: 'Drain Unclogging',
    titleDe: 'Abfluss-Entstopfung',
    descEn: 'Cleared severe bathroom drain blockage permanently.',
    descDe: 'Starke Badezimmer-Verstopfung dauerhaft beseitigt.'
  },
  {
    id: 'broken-fixture-replacement',
    beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop',
    titleEn: 'Faucet Replacement',
    titleDe: 'Armatur-Austausch',
    descEn: 'Installed modern fixtures in master bath seamlessly.',
    descDe: 'Moderne Armaturen im Hauptbad nahtlos installiert.'
  }
]

const diagnosisSteps = [
  { icon: Camera, step: 1 },
  { icon: Search, step: 2 },
  { icon: FileText, step: 3 },
  { icon: Wrench, step: 4 },
]

interface ServicesSectionProps {
  onCtaClick: () => void
}

export function ServicesSection({ onCtaClick }: ServicesSectionProps) {
  const { language, t } = useLanguage()

  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
            {language === 'de' ? 'Unsere Leistungen' : 'Our Services'}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            {language === 'de' ? 'Professionelle Sanitär-Lösungen für Notfälle und geplante Modernisierungen.' : 'Professional plumbing solutions for emergencies and planned modernizations.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-16">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-all hover:shadow-md">
                  <div className="w-full">
                    <ComparisonSlider
                      beforeImage={service.beforeImage}
                      afterImage={service.afterImage}
                      beforeLabel={language === 'de' ? 'Vorher' : 'Before'}
                      afterLabel={language === 'de' ? 'Nachher' : 'After'}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
                      {language === 'de' ? service.titleDe : service.titleEn}
                    </h3>
                    <p className="text-slate-600 font-medium">
                      {language === 'de' ? service.descDe : service.descEn}
                    </p>
                    <Button variant="link" asChild className="p-0 h-auto text-slate-900 font-bold uppercase tracking-widest text-[10px] hover:no-underline hover:translate-x-1 transition-transform">
                      <Link href={`/services/${service.id}`}>
                        {language === 'de' ? 'Mehr erfahren' : 'Learn More'}
                        <ArrowRight className="ml-2 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 sticky top-28"
          >
            <div className="bg-slate-900 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-10 flex items-center gap-3">
                <Timer className="w-6 h-6 text-slate-400" />
                {t('features.howItWorks')}
              </h4>

              <div className="space-y-10 relative">
                <div className="absolute left-5 top-8 bottom-8 w-px bg-slate-800" />

                {diagnosisSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 relative z-10"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                      <step.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('features.step')} {step.step}</p>
                      <h5 className="text-lg font-bold text-white mb-1">{t(`features.masterDeepDive.step${step.step}.title`)}</h5>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{t(`features.masterDeepDive.step${step.step}.desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={onCtaClick}
                className="w-full mt-12 bg-white text-slate-900 hover:bg-slate-100 font-bold uppercase tracking-widest py-6 rounded-lg text-sm transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  {t('features.cta')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
