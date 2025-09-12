'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/dashboard/Header'
import { ControlPanel } from '@/components/dashboard/ControlPanel'
import { NetworkVisualization } from '@/components/dashboard/NetworkVisualization'
import { AgentGrid } from '@/components/dashboard/AgentGrid'
import { ConsciousnessStream } from '@/components/dashboard/ConsciousnessStream'
import { SystemMetrics } from '@/components/dashboard/SystemMetrics'
import { useAgentSystem } from '@/hooks/useAgentSystem'

export default function Dashboard() {
  const { 
    agents, 
    systemStatus, 
    executeCommand, 
    resetSystem,
    isProcessing,
    consciousness 
  } = useAgentSystem()
  
  const [selectedMode, setSelectedMode] = useState<'supervisor' | 'network'>('supervisor')
  const [sessionStats, setSessionStats] = useState({
    sessions: 0,
    responses: 0,
    uptime: '00:00:00'
  })

  // Update session stats
  useEffect(() => {
    const startTime = Date.now()
    const updateStats = () => {
      const elapsed = Date.now() - startTime
      const hours = Math.floor(elapsed / 3600000)
      const minutes = Math.floor((elapsed % 3600000) / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)
      
      setSessionStats(prev => ({
        ...prev,
        uptime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }))
    }

    const interval = setInterval(updateStats, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleExecuteCommand = async (command: string) => {
    try {
      setSessionStats(prev => ({ ...prev, sessions: prev.sessions + 1 }))
      const result = await executeCommand(command, selectedMode)
      
      if (result.success) {
        setSessionStats(prev => ({ ...prev, responses: prev.responses + 1 }))
        console.log('Mission Executed Successfully:', result)
      } else {
        console.error('Mission Failed:', result.error)
      }
    } catch (error) {
      console.error('System Error:', error)
    }
  }

  const handleReset = async () => {
    await resetSystem()
    setSessionStats({ sessions: 0, responses: 0, uptime: '00:00:00' })
    console.log('System Reset: All agents have been reinitialized')
  }

  const handleDemo = () => {
    const demoCommands = [
      "Analyze the current neural network topology and suggest optimizations",
      "Generate a creative solution for quantum consciousness synchronization", 
      "Synthesize knowledge from all active memory banks",
      "Predict the emergence patterns in multi-agent systems"
    ]
    
    const randomCommand = demoCommands[Math.floor(Math.random() * demoCommands.length)]
    handleExecuteCommand(randomCommand)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Header */}
      <Header />
      
      {/* System Metrics */}
      <SystemMetrics 
        systemStatus={systemStatus}
        sessionStats={sessionStats}
        agents={agents}
      />
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Control Panel */}
        <div className="xl:col-span-1">
          <ControlPanel
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
            onExecuteCommand={handleExecuteCommand}
            onReset={handleReset}
            onDemo={handleDemo}
            isProcessing={isProcessing}
            sessionStats={sessionStats}
          />
        </div>
        
        {/* Network Visualization */}
        <div className="xl:col-span-3">
          <NetworkVisualization
            agents={agents}
            mode={selectedMode}
            systemStatus={systemStatus}
          />
        </div>
      </div>
      
      {/* Agent Grid */}
      <AgentGrid agents={agents} />
      
      {/* Consciousness Stream */}
      {consciousness.length > 0 && (
        <ConsciousnessStream
          consciousness={consciousness}
          isProcessing={isProcessing}
        />
      )}
    </div>
  )
}