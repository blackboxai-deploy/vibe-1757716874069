'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Agent, SystemStatus, SystemMode } from '@/types'

interface NetworkVisualizationProps {
  agents: Agent[]
  mode: SystemMode
  systemStatus: SystemStatus
}

export function NetworkVisualization({ agents, mode, systemStatus }: NetworkVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [viewMode, setViewMode] = useState<'topology' | 'performance'>('topology')
  const [isAnimating, setIsAnimating] = useState(true)

  // Network metrics simulation
  const [networkMetrics, setNetworkMetrics] = useState({
    bandwidth: '100 Gb/s',
    latency: '0.3ms',
    throughput: '99.9%',
    packetsPerSecond: 1450000 + Math.floor(Math.random() * 100000)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkMetrics(prev => ({
        ...prev,
        latency: `${(0.2 + Math.random() * 0.4).toFixed(1)}ms`,
        throughput: `${(99.5 + Math.random() * 0.4).toFixed(1)}%`,
        packetsPerSecond: 1450000 + Math.floor(Math.random() * 100000)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10b981'
      case 'processing': return '#fbbf24'
      case 'error': return '#ef4444'
      case 'offline': return '#6b7280'
      default: return '#8b5cf6'
    }
  }

  const renderNetworkConnections = () => {
    const connections: JSX.Element[] = []
    const centerAgent = agents.find(a => a.type === 'conductor')
    if (!centerAgent) return connections

    // Main hub connections
    const hubConnections = [
      { from: { x: 50, y: 15 }, to: { x: 20, y: 40 }, strength: 0.8 },
      { from: { x: 50, y: 15 }, to: { x: 80, y: 40 }, strength: 0.9 },
      { from: { x: 50, y: 15 }, to: { x: 30, y: 70 }, strength: 0.7 },
      { from: { x: 50, y: 15 }, to: { x: 70, y: 70 }, strength: 0.6 },
      // Secondary connections
      { from: { x: 20, y: 40 }, to: { x: 30, y: 70 }, strength: 0.4 },
      { from: { x: 80, y: 40 }, to: { x: 70, y: 70 }, strength: 0.5 },
      { from: { x: 30, y: 70 }, to: { x: 70, y: 70 }, strength: 0.6 }
    ]

    return hubConnections.map((connection, index) => (
      <line
        key={`connection-${index}`}
        x1={`${connection.from.x}%`}
        y1={`${connection.from.y}%`}
        x2={`${connection.to.x}%`}
        y2={`${connection.to.y}%`}
        stroke={`url(#dataFlow${index})`}
        strokeWidth={Math.max(2, connection.strength * 4)}
        opacity={0.6 + connection.strength * 0.4}
        className="transition-all duration-1000"
      />
    ))
  }

  const renderAgentNodes = () => {
    const nodePositions = [
      { id: 'conductor', x: 50, y: 15, size: 28, priority: 1 },
      { id: 'neural-architect', x: 20, y: 40, size: 20, priority: 2 },
      { id: 'quantum-oracle', x: 80, y: 40, size: 20, priority: 2 },
      { id: 'synthesis-engine', x: 30, y: 70, size: 16, priority: 3 },
      { id: 'logic-reasoner', x: 70, y: 70, size: 16, priority: 3 },
      { id: 'creative-mind', x: 15, y: 85, size: 14, priority: 4 },
      { id: 'memory-stone', x: 85, y: 85, size: 14, priority: 4 },
      { id: 'beat-buddy', x: 40, y: 85, size: 12, priority: 5 },
      { id: 'drum-bass-doctor', x: 50, y: 85, size: 12, priority: 5 },
      { id: 'eidolon', x: 60, y: 85, size: 12, priority: 5 },
      { id: 'ghost-termux', x: 70, y: 85, size: 12, priority: 5 },
      { id: 'mistr-mintr', x: 30, y: 85, size: 12, priority: 5 }
    ]

    return nodePositions.map((node) => {
      const agent = agents.find(a => a.id === node.id)
      const color = agent ? getAgentStatusColor(agent.status) : '#8b5cf6'
      const isActive = agent?.status === 'online' || agent?.status === 'processing'
      
      return (
        <g key={node.id} className="network-node">
          {/* Node glow effect */}
          {isActive && (
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size + 4}
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.3"
              className={isAnimating ? 'animate-pulse' : ''}
            />
          )}
          
          {/* Main node */}
          <circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={`url(#nodeGradient${node.priority})`}
            stroke={color}
            strokeWidth="2"
            className="transition-all duration-300 cursor-pointer hover:scale-110"
          />
          
          {/* Node label for conductor */}
          {node.id === 'conductor' && (
            <text
              x={`${node.x}%`}
              y={`${node.y + 6}%`}
              textAnchor="middle"
              fill="#000"
              className="text-sm font-bold pointer-events-none"
            >
              CORE
            </text>
          )}
          
          {/* Activity indicator */}
          {agent?.status === 'processing' && (
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size - 5}
              fill={color}
              opacity="0.8"
              className="animate-ping"
            />
          )}
        </g>
      )
    })
  }

  return (
    <Card className="bg-black/90 rounded-xl shadow-2xl border-2 border-neon-purple">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-2xl font-bold text-purple-300">
            🕸️ Neural Network Topology
          </CardTitle>
          <div className="flex items-center space-x-4">
            <Button 
              size="sm"
              variant={viewMode === 'topology' ? 'neon' : 'outline'}
              onClick={() => setViewMode('topology')}
            >
              Topology
            </Button>
            <Button 
              size="sm"
              variant={viewMode === 'performance' ? 'neon' : 'outline'}
              onClick={() => setViewMode('performance')}
            >
              Performance
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => setIsAnimating(!isAnimating)}
            >
              {isAnimating ? 'Pause' : 'Animate'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Network Visualization */}
        <div className="relative w-full h-80 mb-6 bg-black rounded-xl border-2 border-neon-yellow overflow-hidden network-visualization">
          <div className="absolute inset-0 quantum-field"></div>
          <svg 
            ref={svgRef}
            width="100%" 
            height="100%" 
            className="relative z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Data flow gradients */}
              {[...Array(7)].map((_, i) => (
                <linearGradient key={`dataFlow${i}`} id={`dataFlow${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                  <stop offset="50%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-100 0;100 0;-100 0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              ))}
              
              {/* Node gradients */}
              {[1, 2, 3, 4, 5].map(priority => (
                <radialGradient key={`nodeGradient${priority}`} id={`nodeGradient${priority}`} cx="30%" cy="30%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </radialGradient>
              ))}
            </defs>
            
            {/* Network connections */}
            <g className="connections">
              {renderNetworkConnections()}
            </g>
            
            {/* Agent nodes */}
            <g className="nodes">
              {renderAgentNodes()}
            </g>
            
            {/* Data flow particles */}
            {isAnimating && (
              <g className="data-particles">
                <circle r="2" fill="#fbbf24" opacity="0.8">
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <path d="M 50,15 L 20,40 L 30,70 L 50,15" />
                  </animateMotion>
                </circle>
                <circle r="2" fill="#00d4ff" opacity="0.8">
                  <animateMotion dur="3s" repeatCount="indefinite">
                    <path d="M 50,15 L 80,40 L 70,70 L 50,15" />
                  </animateMotion>
                </circle>
              </g>
            )}
          </svg>
          
          {/* Network Stats Overlay */}
          <div className="absolute top-4 right-4 bg-black/80 p-3 rounded border border-neon-purple">
            <div className="text-xs text-purple-400 mb-1">Network Status</div>
            <div className="text-xs text-green-400">Bandwidth: {networkMetrics.bandwidth}</div>
            <div className="text-xs text-neon-yellow">Latency: {networkMetrics.latency}</div>
            <div className="text-xs text-neon-blue">Throughput: {networkMetrics.throughput}</div>
            <div className="text-xs text-purple-400">PPS: {networkMetrics.packetsPerSecond.toLocaleString()}</div>
          </div>
          
          {/* Mode Indicator */}
          <div className="absolute bottom-4 left-4 bg-black/80 p-2 rounded border border-neon-purple">
            <div className="text-xs text-purple-400">Mode: <span className="text-neon-yellow font-bold uppercase">{mode}</span></div>
            <div className="text-xs text-green-400">Agents: {systemStatus.activeAgents}/{systemStatus.totalAgents}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}