'use client'

import { Phone, Droplets } from 'lucide-react'
import { useLanguage } from '@/app/context/language-context'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onEmergencyClick: () => void
}

export function Header({ onEmergencyClick }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">{t('header.logo')}</span>
          </div>

          {/* Language Toggle + Emergency CTA */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  language === 'en' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  language === 'de' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                DE
              </button>
            </div>

            {/* Emergency CTA - CTA #2 */}
            <Button 
              onClick={onEmergencyClick}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold"
              size="default"
            >
              <span className="relative flex h-2.5 w-2.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-200"></span>
              </span>
              <Phone className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">{t('header.emergency')}</span>
              <span className="sm:hidden">24/7</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
