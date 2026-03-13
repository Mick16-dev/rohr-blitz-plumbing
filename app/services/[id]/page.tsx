'use client'

import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/app/context/language-context'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Clock, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const serviceDetails: Record<string, any> = {
  'leaking-pipe-repair': {
    titleEn: 'Leaking Pipe Repair',
    titleDe: 'Undichte Rohrreparatur',
    descEn: 'Professional repair of leaking pipes, protecting your property from water damage. We use advanced diagnostic tools to pinpoint the exact location of the leak rapidly.',
    descDe: 'Professionelle Reparatur von undichten Rohren zum Schutz Ihrer Immobilie vor Wasserschäden. Wir nutzen fortschrittliche Diagnosewerkzeuge zur genauen Ortung.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&h=900&fit=crop',
    featuresEn: ['Emergency 30min response', 'Materials included', '2-year warranty', 'Certified technicians'],
    featuresDe: ['Notfall-Reaktion in 30 Min', 'Materialien inklusive', '2 Jahre Garantie', 'Zertifizierte Techniker']
  },
  'clogged-drain-unclogging': {
    titleEn: 'Drain Unclogging',
    titleDe: 'Abfluss-Entstopfung',
    descEn: 'Comprehensive drain cleaning services using safe, effective motorized snakes and hydro-jetting to remove blockages deep within your plumbing system.',
    descDe: 'Umfassende Abflussreinigung mit sicheren, effektiven motorisierten Spiralen und Hochdruckreinigung zur Entfernung tiefliegender Verstopfungen.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&h=900&fit=crop',
    featuresEn: ['Power-jet cleaning', 'Camera inspection', 'Deep-clean guarantee', 'No-mess promise'],
    featuresDe: ['Hochdruckreinigung', 'Kamera-Inspektion', 'Tiefenreinigungsgarantie', 'Sauberkeitsversprechen']
  },
  'broken-fixture-replacement': {
    titleEn: 'Fixture Replacement',
    titleDe: 'Armatur-Austausch',
    descEn: 'Expert installation and replacement of faucets, toilets, showerheads, and other household fixtures. Ensuring perfect seals and optimal water flow.',
    descDe: 'Fachgerechte Installation und Austausch von Wasserhähnen, Toiletten, Duschköpfen und anderen Haushaltsarmaturen. Minimierung von Wasserverlusten.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop',
    featuresEn: ['Premium brands available', 'Leak-proof seal', 'Same-day service', 'Disposal of old fixtures'],
    featuresDe: ['Premium-Marken verfügbar', 'Auslaufsichere Versiegelung', 'Service am selben Tag', 'Entsorgung alter Armaturen']
  },
  'water-heater-repair': {
    titleEn: 'Water Heater Services',
    titleDe: 'Warmwasserbereiter Reparatur',
    descEn: 'Diagnostic and repair services for all conventional and tankless water heaters. We restore hot water supply efficiently and conduct safety checks.',
    descDe: 'Diagnose und Reparaturservices für herkömmliche und Durchlauferhitzer. Wir stellen die Warmwasserversorgung effizient wieder her.',
    image: 'https://images.unsplash.com/photo-1585128903994-9788298932a4?w=1600&h=900&fit=crop',
    featuresEn: ['All brands serviced', 'Same-day hot water', 'Efficiency check', 'Parts warranty'],
    featuresDe: ['Service für alle Marken', 'Warmwasser am selben Tag', 'Effizienzprüfung', 'Teilegarantie']
  },
  'camera-pipe-inspection': {
    titleEn: 'Camera Pipe Inspection',
    titleDe: 'Kamera-Rohrinspektion',
    descEn: 'Non-invasive visual inspection of underground sewer lines and pipes to determine condition, locate roots, or find collapsed sections without digging.',
    descDe: 'Zerstörungsfreie visuelle Inspektion von unterirdischen Kanalisationsleitungen und Rohren zur Zustandsermittlung ohne Grabungen.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&h=900&fit=crop',
    featuresEn: ['High-res video recording', 'Exact depth location', 'Detailed report provided', 'Zero digging required'],
    featuresDe: ['Hochauflösende Videoaufnahme', 'Genaue Tiefenortung', 'Detaillierter Bericht geliefert', 'Kein Graben erforderlich']
  }
}

export default function ServicePage() {
  const { id } = useParams()
  const { language, t } = useLanguage()
  const service = serviceDetails[id as string] || serviceDetails['leaking-pipe-repair']

  return (
    <main className="min-h-screen bg-slate-50">
      <Header onEmergencyClick={() => {}} />

      <div className="pt-32 pb-24 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <Link href="/#services" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" />
            {language === 'de' ? 'Zurück zu den Leistungen' : 'Back to Services'}
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 uppercase tracking-tight leading-none">
                {language === 'de' ? service.titleDe : service.titleEn}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
                {language === 'de' ? service.descDe : service.descEn}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {(language === 'de' ? service.featuresDe : service.featuresEn).map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{t('hero.response')}</p>
                    <p className="text-sm font-bold text-slate-900">15-30 Min</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{t('footer.certifiedMeister')}</p>
                    <p className="text-sm font-bold text-slate-900">Verified Expert</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-slate-900 text-white hover:bg-slate-800 font-bold uppercase tracking-widest rounded-lg text-sm shadow-md transition-all">
                {t('funnel.cta')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={service.image} alt={service.titleEn} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer onCtaClick={() => {}} />
    </main>
  )
}
