'use client'

import { useState, useEffect } from 'react'

// Helper function to get current time on client only
const getCurrentTime = () => {
  if (typeof window === 'undefined') {
    return new Date(0) // Return epoch time on server
  }
  return new Date()
}

interface SystemMetrics {
  power: number
  activeAgents: number
  bandwidth: string
  latency: string
  temperature: number
  cpuUsage: number
  memoryUsage: number
}

export function StatusBar() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    power: 100,
    activeAgents: 12,
    bandwidth: '100 Gb/s',
    latency: '0.3ms',
    temperature: 42,
    cpuUsage: 65,
    memoryUsage: 78
  })

  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
  }, [])

  useEffect(() => {
    // Update metrics periodically
    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(50, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 3)),
        temperature: Math.max(35, Math.min(65, prev.temperature + (Math.random() - 0.5) * 2)),
        latency: `${(0.2 + Math.random() * 0.4).toFixed(1)}ms`
      }))
    }, 2000)

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(metricsInterval)
      clearInterval(timeInterval)
    }
  }, [])

  const getMetricColor = (value: number, thresholds: { normal: number; warning: number }) => {
    if (value < thresholds.normal) return 'text-green-400'
    if (value < thresholds.warning) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 border-b border-neon-purple backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          {/* Left Side - System Status */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">SYSTEM ONLINE</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-purple-400">PWR:</span>
              <span className="text-yellow-400 font-mono">{metrics.power}%</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-purple-400">AGENTS:</span>
              <span className="text-neon-blue font-mono">{metrics.activeAgents}/12</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-purple-400">BW:</span>
              <span className="text-yellow-400 font-mono">{metrics.bandwidth}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-purple-400">LAT:</span>
              <span className="text-green-400 font-mono">{metrics.latency}</span>
            </div>
          </div>

          {/* Center - Performance Metrics */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-purple-400">CPU:</span>
              <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${getMetricColor(metrics.cpuUsage, { normal: 70, warning: 85 })} bg-current`}
                  style={{ width: `${metrics.cpuUsage}%` }}
                />
              </div>
              <span className={`font-mono text-xs ${getMetricColor(metrics.cpuUsage, { normal: 70, warning: 85 })}`}>
                {metrics.cpuUsage}%
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-purple-400">MEM:</span>
              <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${getMetricColor(metrics.memoryUsage, { normal: 80, warning: 90 })} bg-current`}
                  style={{ width: `${metrics.memoryUsage}%` }}
                />
              </div>
              <span className={`font-mono text-xs ${getMetricColor(metrics.memoryUsage, { normal: 80, warning: 90 })}`}>
                {metrics.memoryUsage}%
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-purple-400">TEMP:</span>
              <span className={`font-mono ${getMetricColor(metrics.temperature, { normal: 50, warning: 60 })}`}>
                {metrics.temperature}°C
              </span>
            </div>
          </div>

          {/* Right Side - Time and Mode */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-purple-400">MODE:</span>
              <span className="text-neon-yellow font-bold">BETA v2.1</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-purple-400">TIME:</span>
              <span className="text-neon-blue font-mono">
                {mounted ? currentTime.toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                }) : '00:00:00'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-purple-400">DATE:</span>
              <span className="text-yellow-400 font-mono">
                {mounted ? currentTime.toLocaleDateString('en-US', { 
                  year: '2-digit', 
                  month: '2-digit', 
                  day: '2-digit' 
                }) : '00/00/00'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}