'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Agent } from '@/types'
import { getColorForAgent, formatDuration } from '@/lib/utils'

interface AgentGridProps {
  agents: Agent[]
}

export function AgentGrid({ agents }: AgentGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400'
      case 'processing': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      case 'offline': return 'text-gray-400'
      default: return 'text-blue-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢'
      case 'processing': return '🟡'
      case 'error': return '🔴'
      case 'offline': return '⚫'
      default: return '🔵'
    }
  }

  const getAgentIcon = (type: string) => {
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
    return icons[type] || '🤖'
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-300 text-center font-orbitron">
        🤖 Agent Network Status
      </h2>
      
      {/* First Row - Core Agents */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {agents.slice(0, 6).map((agent) => (
          <Card key={agent.id} className="agent-card bg-gradient-to-br from-cyber-black to-cyber-purple border-2 border-neon-purple rounded-xl relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse" 
                    style={{ backgroundColor: getColorForAgent(agent.type) }}
                  />
                  <span className="text-xs">{getStatusIcon(agent.status)}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-1">{getAgentIcon(agent.type)}</div>
                <h3 className="font-bold text-purple-300 text-xs mb-1">{agent.name}</h3>
                <p className="text-xs text-neon-yellow mb-3 leading-tight">{agent.description}</p>
                
                <div className="space-y-2">
                  {/* Status */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Status:</span>
                    <span className={getStatusColor(agent.status)}>{agent.status}</span>
                  </div>
                  
                  {/* Load */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-400">Load:</span>
                      <span className="text-neon-yellow">{agent.metrics.load}%</span>
                    </div>
                    <Progress 
                      value={agent.metrics.load} 
                      className="h-1 bg-gray-800"
                    />
                  </div>
                  
                  {/* Performance Metric */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Performance:</span>
                    <span className="text-green-400">{agent.metrics.performance}%</span>
                  </div>
                  
                  {/* Tasks Completed */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Tasks:</span>
                    <span className="text-neon-blue">{agent.metrics.tasksCompleted}</span>
                  </div>
                  
                  {/* Last Active */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Active:</span>
                    <span className="text-gray-400">
                      {formatDuration(Date.now() - agent.lastActive.getTime())} ago
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second Row - Specialized Agents */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {agents.slice(6).map((agent) => (
          <Card key={agent.id} className="agent-card bg-gradient-to-br from-cyber-black to-cyber-purple border-2 border-neon-purple rounded-xl relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse" 
                    style={{ backgroundColor: getColorForAgent(agent.type) }}
                  />
                  <span className="text-xs">{getStatusIcon(agent.status)}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-1">{getAgentIcon(agent.type)}</div>
                <h3 className="font-bold text-purple-300 text-xs mb-1">{agent.name}</h3>
                <p className="text-xs text-neon-yellow mb-3 leading-tight">{agent.description}</p>
                
                <div className="space-y-2">
                  {/* Status */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Status:</span>
                    <span className={getStatusColor(agent.status)}>{agent.status}</span>
                  </div>
                  
                  {/* Load */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-400">Load:</span>
                      <span className="text-neon-yellow">{agent.metrics.load}%</span>
                    </div>
                    <Progress 
                      value={agent.metrics.load} 
                      className="h-1 bg-gray-800"
                    />
                  </div>
                  
                  {/* Accuracy */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Accuracy:</span>
                    <span className="text-green-400">{agent.metrics.accuracy}%</span>
                  </div>
                  
                  {/* Uptime */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Uptime:</span>
                    <span className="text-cyan-400">{agent.metrics.uptime}h</span>
                  </div>
                  
                  {/* Errors */}
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">Errors:</span>
                    <span className={agent.metrics.errors > 0 ? 'text-red-400' : 'text-green-400'}>
                      {agent.metrics.errors}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Network Summary */}
      <Card className="bg-black/80 border-2 border-neon-purple rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-purple-300">📊 Network Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {agents.filter(a => a.status === 'online').length}
              </div>
              <div className="text-sm text-purple-400">Online</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {agents.filter(a => a.status === 'processing').length}
              </div>
              <div className="text-sm text-purple-400">Processing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-neon-blue">
                {Math.round(agents.reduce((sum, a) => sum + a.metrics.load, 0) / agents.length)}%
              </div>
              <div className="text-sm text-purple-400">Avg Load</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(agents.reduce((sum, a) => sum + a.metrics.accuracy, 0) / agents.length)}%
              </div>
              <div className="text-sm text-purple-400">Avg Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}