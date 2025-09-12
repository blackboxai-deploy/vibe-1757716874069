'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    name: 'Command Center',
    href: '/',
    icon: '⚡',
    description: 'Main dashboard and control hub'
  },
  {
    name: 'Agent Network',
    href: '/agents',
    icon: '🧠',
    description: 'Individual agent interfaces'
  },
  {
    name: 'Consciousness Stream',
    href: '/consciousness',
    icon: '🌊',
    description: 'Real-time thought processing'
  },
  {
    name: 'Memory Banks',
    href: '/memory',
    icon: '💾',
    description: 'Knowledge storage and retrieval'
  },
  {
    name: 'Quantum Lab',
    href: '/quantum',
    icon: '⚛️',
    description: 'Advanced quantum operations'
  },
  {
    name: 'Creative Studio',
    href: '/creative',
    icon: '🎨',
    description: 'AI art and content generation'
  },
  {
    name: 'System Logs',
    href: '/logs',
    icon: '📊',
    description: 'System monitoring and analytics'
  }
]

export function Navigation() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed top-12 left-0 right-0 z-30 bg-black/80 border-b border-neon-purple/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo/Brand */}
            <Link href={"/" as any} className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-yellow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-black font-bold text-lg">∞</span>
              </div>
              <span className="font-orbitron font-bold text-lg holographic-text">
                MISTR INFINITI
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className={cn(
                    'relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group',
                    pathname === item.href
                      ? 'text-neon-yellow bg-neon-purple/20 border border-neon-purple'
                      : 'text-purple-300 hover:text-neon-yellow hover:bg-purple-900/30'
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                  
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neon-yellow rounded-full animate-pulse" />
                  )}
                  
                  {/* Hover tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black border border-neon-purple rounded-lg px-3 py-2 text-xs text-neon-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black border-l border-t border-neon-purple rotate-45" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden p-2 rounded-lg border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isExpanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* System Status Indicator */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="text-xs text-purple-400 font-mono">
                NET: 99.9%
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isExpanded && (
        <div className="lg:hidden fixed inset-0 z-20 bg-black/95 backdrop-blur-sm">
          <div className="pt-24 px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  onClick={() => setIsExpanded(false)}
                  className={cn(
                    'block w-full p-4 rounded-lg text-left transition-all duration-300',
                    pathname === item.href
                      ? 'text-neon-yellow bg-neon-purple/20 border border-neon-purple'
                      : 'text-purple-300 hover:text-neon-yellow hover:bg-purple-900/30'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-purple-400 mt-1">{item.description}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}