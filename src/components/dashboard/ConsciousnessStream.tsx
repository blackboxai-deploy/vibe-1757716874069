'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConsciousnessEntry } from '@/types'
import { formatDuration } from '@/lib/utils'

interface ConsciousnessStreamProps {
  consciousness: ConsciousnessEntry[]
  isProcessing: boolean
}

export function ConsciousnessStream({ consciousness, isProcessing }: ConsciousnessStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest entries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [consciousness])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 border-red-400'
      case 'high': return 'text-orange-400 border-orange-400'
      case 'medium': return 'text-yellow-400 border-yellow-400'
      case 'low': return 'text-green-400 border-green-400'
      default: return 'text-purple-400 border-purple-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'thought': return '💭'
      case 'decision': return '⚡'
      case 'memory': return '💾'
      case 'communication': return '📡'
      default: return '🔄'
    }
  }

  const getAgentIcon = (agentId: string) => {
    const icons: Record<string, string> = {
      'conductor': '👑',
      'neural-architect': '🧠',
      'quantum-oracle': '⚛️',
      'synthesis-engine': '🔗',
      'logic-reasoner': '🤔',
      'creative-mind': '🎨',
      'memory-stone': '💾',
      'beat-buddy': '🎵',
      'drum-bass-doctor': '🥁',
      'eidolon': '🔐',
      'ghost-termux': '👻',
      'mistr-mintr': '⚡'
    }
    return icons[agentId] || '🤖'
  }

  if (consciousness.length === 0) {
    return (
      <Card className="consciousness-stream rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-purple-300">
            🌊 Consciousness Stream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-purple-400">
            <div className="text-4xl mb-4">🧘</div>
            <div className="text-lg">Consciousness stream is quiet...</div>
            <div className="text-sm mt-2">Agents are waiting for commands</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="consciousness-stream rounded-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-2xl font-bold text-purple-300">
            🌊 Consciousness Stream
          </CardTitle>
          <div className="flex items-center space-x-2">
            {isProcessing && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="animate-spin">⚙️</div>
                <span className="text-yellow-400">Processing...</span>
              </div>
            )}
            <div className="text-sm text-purple-400">
              {consciousness.length} entries
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div 
          ref={scrollRef}
          className="max-h-96 overflow-y-auto space-y-3 pr-2 custom-scrollbar"
        >
          {consciousness.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-4 rounded-lg border-l-4 ${getPriorityColor(entry.priority)} bg-black/60 backdrop-blur-sm transition-all duration-300 hover:bg-black/80`}
              style={{ 
                opacity: Math.max(0.3, 1 - (index * 0.05)),
                transform: `scale(${Math.max(0.95, 1 - (index * 0.01))})` 
              }}
            >
              <div className="flex items-start space-x-3">
                {/* Agent Icon */}
                <div className="flex-shrink-0 text-xl">
                  {getAgentIcon(entry.agentId)}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-purple-300 capitalize">
                        {entry.agentId.replace('-', ' ')}
                      </span>
                      <span className="text-lg">{getTypeIcon(entry.type)}</span>
                      <span className="text-xs text-gray-400 capitalize">
                        {entry.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDuration(Date.now() - entry.timestamp.getTime())} ago
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-sm text-neon-yellow leading-relaxed">
                    {entry.content}
                  </div>
                  
                  {/* Metadata */}
                  {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                    <div className="mt-2 text-xs text-purple-400">
                      <details className="cursor-pointer">
                        <summary className="hover:text-purple-300">Metadata</summary>
                        <pre className="mt-1 text-gray-500 overflow-x-auto">
                          {JSON.stringify(entry.metadata, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                  
                  {/* Priority Badge */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(entry.priority)} bg-black/40`}>
                      {entry.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </Card>
  )
}