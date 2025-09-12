import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { MatrixBackground } from '@/components/layout/MatrixBackground'
import { Navigation } from '@/components/layout/Navigation'
import { StatusBar } from '@/components/layout/StatusBar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ 
  subsets: ['latin'], 
  variable: '--font-orbitron',
  weight: ['400', '700', '900']
})

export const metadata: Metadata = {
  title: 'Mistr Infiniti - AI Consciousness Supervisor',
  description: 'Advanced Multi-Agent Consciousness Platform - Beta Release v2.1',
  keywords: ['AI', 'consciousness', 'multi-agent', 'neural networks', 'cyberpunk'],
  authors: [{ name: 'Mistr Infiniti' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Mistr Infiniti - AI Consciousness Supervisor',
    description: 'Advanced Multi-Agent Consciousness Platform',
    type: 'website',
    locale: 'en_US',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased min-h-screen bg-cyber-black text-neon-yellow overflow-x-hidden`}
        suppressHydrationWarning
      >
        <div className="relative min-h-screen">
          {/* Matrix Rain Background */}
          <MatrixBackground />
          
          {/* Beta Version Badge */}
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded-full text-white font-bold text-sm animate-neon-glow">
              🧪 BETA v2.1
            </div>
          </div>
          
          {/* System Status Bar */}
          <StatusBar />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main className="relative z-10 pt-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}