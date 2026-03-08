import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from './context/language-context'
import './globals.css'

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"], 
  variable: '--font-heading',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Rohr-Blitz | Master Expert Plumbing Diagnosis & Repair',
  description: 'Experience the future of home maintenance. Instant visual diagnosis, 24/7 premium emergency service, and transparent estimates in seconds.',
  keywords: ['plumbing', 'master diagnosis', 'emergency plumber', 'Germany', 'home repair', 'Rohr-Blitz'],
  authors: [{ name: 'Rohr-Blitz' }],
  openGraph: {
    title: 'Rohr-Blitz | Expert Master Plumbing',
    description: 'Instant visual plumbing diagnosis and expert repair service. Available 24/7.',
    type: 'website',
    locale: 'de_DE',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${bricolage.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-body antialiased selection:bg-secondary/30 selection:text-secondary-foreground overflow-x-hidden">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
