'use client'

import { useState } from 'react'
import { X, Users, Briefcase, CheckCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '@/app/context/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface JoinModalProps {
  isOpen: boolean
  onClose: () => void
}

type ModalStep = 'choice' | 'customer' | 'technician' | 'success'

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const { language } = useLanguage()
  const [step, setStep] = useState<ModalStep>('choice')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setStep('success')
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep('choice')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 300)
  }

  if (!isOpen) return null

  const text = {
    en: {
      title: 'Join Marcus Plumbing',
      subtitle: 'How would you like to get started?',
      customerTitle: 'Get a Quote',
      customerDesc: 'Submit your plumbing issue for a free estimate',
      techTitle: 'Apply as Technician',
      techDesc: 'Join our team of certified plumbers',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formPhone: 'Phone Number',
      formMessage: 'Tell us about your plumbing issue',
      formExperience: 'Years of experience & certifications',
      submitCustomer: 'Submit Request',
      submitTech: 'Submit Application',
      back: 'Back',
      successTitle: 'Submitted Successfully!',
      successCustomer: 'We\'ll review your request and contact you within 24 hours.',
      successTech: 'Our HR team will review your application and reach out soon.',
      close: 'Close'
    },
    de: {
      title: 'Marcus Plumbing beitreten',
      subtitle: 'Wie möchten Sie beginnen?',
      customerTitle: 'Angebot erhalten',
      customerDesc: 'Senden Sie Ihr Sanitärproblem für einen kostenlosen Kostenvoranschlag',
      techTitle: 'Als Techniker bewerben',
      techDesc: 'Werden Sie Teil unseres Teams zertifizierter Klempner',
      formName: 'Vollständiger Name',
      formEmail: 'E-Mail-Adresse',
      formPhone: 'Telefonnummer',
      formMessage: 'Beschreiben Sie Ihr Sanitärproblem',
      formExperience: 'Erfahrung & Zertifizierungen',
      submitCustomer: 'Anfrage senden',
      submitTech: 'Bewerbung senden',
      back: 'Zurück',
      successTitle: 'Erfolgreich gesendet!',
      successCustomer: 'Wir prüfen Ihre Anfrage und kontaktieren Sie innerhalb von 24 Stunden.',
      successTech: 'Unser HR-Team wird Ihre Bewerbung prüfen und sich bald melden.',
      close: 'Schließen'
    }
  }

  const t = text[language]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Choice Step */}
        {step === 'choice' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">{t.title}</h2>
            <p className="text-muted-foreground mb-8">{t.subtitle}</p>
            
            <div className="space-y-4">
              <button
                onClick={() => setStep('customer')}
                className="w-full p-6 border-2 border-border rounded-2xl text-left hover:border-secondary hover:bg-secondary/5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.customerTitle}</h3>
                    <p className="text-sm text-muted-foreground">{t.customerDesc}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStep('technician')}
                className="w-full p-6 border-2 border-border rounded-2xl text-left hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.techTitle}</h3>
                    <p className="text-sm text-muted-foreground">{t.techDesc}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Customer Form */}
        {step === 'customer' && (
          <div className="p-8">
            <button
              onClick={() => setStep('choice')}
              className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
            >
              ← {t.back}
            </button>
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.customerTitle}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t.formName}</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">{t.formEmail}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">{t.formPhone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="message">{t.formMessage}</Label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  t.submitCustomer
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Technician Form */}
        {step === 'technician' && (
          <div className="p-8">
            <button
              onClick={() => setStep('choice')}
              className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
            >
              ← {t.back}
            </button>
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.techTitle}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="tech-name">{t.formName}</Label>
                <Input
                  id="tech-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="tech-email">{t.formEmail}</Label>
                <Input
                  id="tech-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="tech-phone">{t.formPhone}</Label>
                <Input
                  id="tech-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="tech-experience">{t.formExperience}</Label>
                <textarea
                  id="tech-experience"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  t.submitTech
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t.successTitle}</h2>
            <p className="text-muted-foreground mb-8">
              {step === 'success' ? t.successCustomer : t.successTech}
            </p>
            <Button 
              onClick={handleClose}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {t.close}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
