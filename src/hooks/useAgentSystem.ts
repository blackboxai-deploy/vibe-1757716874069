'use client'

import { useState, useEffect, useCallback } from 'react'
import { Agent, SystemStatus, ConsciousnessEntry, Mission, SystemMode, AIResponse } from '@/types'
import { createInitialAgents } from '@/lib/agents/agentFactory'
import { executeAICommand } from '@/lib/api/aiService'

export function useAgentSystem() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    online: true,
    power: 100,
    activeAgents: 0,
    totalAgents: 12,
    bandwidth: '100 Gb/s',
    latency: '0.3ms',
    throughput: '99.9%',
    temperature: 42,
    memoryUsage: 78,
    cpuUsage: 65
  })
  const [consciousness, setConsciousness] = useState<ConsciousnessEntry[]>([])
  const [missions, setMissions] = useState<Mission[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // Initialize agents on mount
  useEffect(() => {
    const initialAgents = createInitialAgents()
    setAgents(initialAgents)
    setSystemStatus(prev => ({
      ...prev,
      activeAgents: initialAgents.filter(a => a.status === 'online').length
    }))
  }, [])

  // Simulate system metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(50, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        temperature: Math.max(35, Math.min(65, prev.temperature + (Math.random() - 0.5) * 3)),
        latency: `${(0.2 + Math.random() * 0.4).toFixed(1)}ms`
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Add consciousness entry
  const addConsciousnessEntry = useCallback((entry: Omit<ConsciousnessEntry, 'id' | 'timestamp'>) => {
    const newEntry: ConsciousnessEntry = {
      ...entry,
      id: `consciousness_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }
    
    setConsciousness(prev => [newEntry, ...prev].slice(0, 100)) // Keep last 100 entries
  }, [])

  // Update agent status
  const updateAgentStatus = useCallback((agentId: string, status: Agent['status'], metrics?: Partial<Agent['metrics']>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? {
            ...agent,
            status,
            metrics: metrics ? { ...agent.metrics, ...metrics } : agent.metrics,
            lastActive: new Date()
          }
        : agent
    ))
  }, [])

  // Execute command through AI system
  const executeCommand = useCallback(async (command: string, mode: SystemMode): Promise<AIResponse> => {
    setIsProcessing(true)
    
    try {
      // Add initial consciousness entry
      addConsciousnessEntry({
        agentId: 'conductor',
        content: `Received command: "${command}" in ${mode} mode`,
        type: 'communication',
        priority: 'high'
      })

      // Update conductor status
      updateAgentStatus('conductor', 'processing', { load: 85 })

      // Create mission
      const mission: Mission = {
        id: `mission_${Date.now()}`,
        command,
        mode,
        status: 'processing',
        assignedAgents: mode === 'supervisor' ? ['conductor'] : agents.map(a => a.id),
        results: [],
        startTime: new Date(),
        priority: 1
      }

      setMissions(prev => [mission, ...prev])

      // Execute through AI service
      const response = await executeAICommand(command, mode, agents)

      if (response.success) {
        // Update mission status
        setMissions(prev => prev.map(m => 
          m.id === mission.id 
            ? { ...m, status: 'completed', endTime: new Date() }
            : m
        ))

        // Add success consciousness entry
        addConsciousnessEntry({
          agentId: 'conductor',
          content: `Successfully processed: ${response.data?.summary || 'Command executed'}`,
          type: 'decision',
          priority: 'medium'
        })

        // Update involved agents
        const involvedAgents = response.data?.involvedAgents || ['conductor']
        involvedAgents.forEach((agentId: string) => {
          updateAgentStatus(agentId, 'online', { 
            tasksCompleted: agents.find(a => a.id === agentId)?.metrics.tasksCompleted || 0 + 1,
            load: Math.max(20, Math.random() * 60)
          })
        })

      } else {
        // Handle failure
        setMissions(prev => prev.map(m => 
          m.id === mission.id 
            ? { ...m, status: 'failed', endTime: new Date() }
            : m
        ))

        addConsciousnessEntry({
          agentId: 'conductor',
          content: `Failed to process command: ${response.error}`,
          type: 'decision',
          priority: 'critical'
        })
      }

      return response

    } catch (error) {
      console.error('Command execution error:', error)
      
      addConsciousnessEntry({
        agentId: 'conductor',
        content: `System error during command execution: ${error}`,
        type: 'decision',
        priority: 'critical'
      })

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    } finally {
      setIsProcessing(false)
      updateAgentStatus('conductor', 'online', { load: 45 })
    }
  }, [agents, addConsciousnessEntry, updateAgentStatus])

  // Reset system
  const resetSystem = useCallback(async () => {
    setIsProcessing(true)
    
    // Reset all agents
    const resetAgents = agents.map(agent => ({
      ...agent,
      status: 'initializing' as const,
      metrics: {
        ...agent.metrics,
        load: 0,
        tasksCompleted: 0,
        errors: 0
      }
    }))
    
    setAgents(resetAgents)
    setConsciousness([])
    setMissions([])
    
    // Simulate reinitialization
    setTimeout(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: 'online' as const,
        lastActive: new Date()
      })))
      setIsProcessing(false)
      
      addConsciousnessEntry({
        agentId: 'conductor',
        content: 'System successfully reinitialized - All agents online',
        type: 'communication',
        priority: 'high'
      })
    }, 2000)
  }, [agents, addConsciousnessEntry])

  return {
    agents,
    systemStatus,
    consciousness,
    missions,
    isProcessing,
    executeCommand,
    resetSystem,
    updateAgentStatus,
    addConsciousnessEntry
  }
}