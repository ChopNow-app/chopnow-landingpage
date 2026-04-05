import type { Metadata } from 'next'
import { Abril_Fatface, Outfit } from 'next/font/google'
import './globals.css'
import ScrollReveal from '@/components/ScrollReveal'
import Countdown from '@/components/Countdown'
import MobileStickyBar from '@/components/MobileStickyBar'

const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-abril',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ChopNow — Commander à manger facilement à Douala',
  description:
    "Commandez vos plats préférés à Douala, payez par MTN MoMo ou Orange Money. Pas d'adresse formelle, pas de carte bancaire, juste votre numéro.",
  openGraph: {
    title: 'ChopNow — La livraison repensée pour Douala',
    description: 'Commandez, payez Mobile Money, recevez chez vous. Même sans adresse formelle.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${abrilFatface.variable} ${outfit.variable}`}>
      <body>
        <Countdown />
        {children}
        <MobileStickyBar />
        <ScrollReveal />
      </body>
    </html>
  )
}
