import { Agent, AgentType } from '@/types'

export function createInitialAgents(): Agent[] {
  const agentConfigs: Array<{
    id: string
    name: string
    type: AgentType
    description: string
    capabilities: string[]
    color: string
    position: { x: number; y: number }
    connections: string[]
  }> = [
    {
      id: 'conductor',
      name: 'Conductor',
      type: 'conductor',
      description: 'System Orchestrator - Central command and control hub',
      capabilities: [
        'Task Distribution',
        'Agent Coordination', 
        'System Monitoring',
        'Resource Management',
        'Priority Scheduling'
      ],
      color: '#fbbf24',
      position: { x: 50, y: 15 },
      connections: ['neural-architect', 'quantum-oracle', 'synthesis-engine', 'memory-stone']
    },
    {
      id: 'neural-architect',
      name: 'Neural Architect',
      type: 'neural-architect',
      description: 'Network Designer - Builds and optimizes neural architectures',
      capabilities: [
        'Neural Network Design',
        'Architecture Optimization',
        'Pattern Recognition',
        'Deep Learning Models',
        'Topology Analysis'
      ],
      color: '#a855f7',
      position: { x: 20, y: 40 },
      connections: ['conductor', 'logic-reasoner', 'creative-mind']
    },
    {
      id: 'quantum-oracle',
      name: 'Quantum Oracle',
      type: 'quantum-oracle',
      description: 'Probability Engine - Advanced quantum computing and prediction',
      capabilities: [
        'Quantum Computing',
        'Probability Analysis',
        'Future Prediction',
        'Uncertainty Quantification',
        'Quantum Entanglement'
      ],
      color: '#00d4ff',
      position: { x: 80, y: 40 },
      connections: ['conductor', 'synthesis-engine', 'memory-stone']
    },
    {
      id: 'synthesis-engine',
      name: 'Synthesis Engine',
      type: 'synthesis-engine',
      description: 'Knowledge Fusion - Combines and synthesizes information',
      capabilities: [
        'Knowledge Integration',
        'Data Fusion',
        'Concept Synthesis',
        'Information Aggregation',
        'Coherence Maintenance'
      ],
      color: '#fbbf24',
      position: { x: 30, y: 70 },
      connections: ['conductor', 'quantum-oracle', 'logic-reasoner', 'memory-stone']
    },
    {
      id: 'logic-reasoner',
      name: 'Logic Reasoner',
      type: 'logic-reasoner',
      description: 'Logical Inference - Advanced reasoning and problem solving',
      capabilities: [
        'Logical Reasoning',
        'Problem Solving',
        'Deductive Analysis',
        'Constraint Satisfaction',
        'Theorem Proving'
      ],
      color: '#f97316',
      position: { x: 70, y: 70 },
      connections: ['neural-architect', 'synthesis-engine', 'creative-mind']
    },
    {
      id: 'creative-mind',
      name: 'Creative Mind',
      type: 'creative-mind',
      description: 'Innovation Generator - Creative thinking and ideation',
      capabilities: [
        'Creative Ideation',
        'Innovation Generation',
        'Artistic Creation',
        'Novel Combinations',
        'Inspiration Synthesis'
      ],
      color: '#ec4899',
      position: { x: 15, y: 85 },
      connections: ['neural-architect', 'logic-reasoner', 'beat-buddy']
    },
    {
      id: 'memory-stone',
      name: 'Memory Stone',
      type: 'memory-stone',
      description: 'Knowledge Storage - Persistent memory and information retrieval',
      capabilities: [
        'Information Storage',
        'Memory Retrieval',
        'Knowledge Indexing',
        'Pattern Storage',
        'Historical Analysis'
      ],
      color: '#14b8a6',
      position: { x: 85, y: 85 },
      connections: ['conductor', 'quantum-oracle', 'synthesis-engine', 'eidolon']
    },
    {
      id: 'beat-buddy',
      name: 'BeatBuddy',
      type: 'beat-buddy',
      description: 'Music Generator - Rhythm and audio pattern creation',
      capabilities: [
        'Music Generation',
        'Rhythm Creation',
        'Audio Processing',
        'Pattern Synthesis',
        'Harmonic Analysis'
      ],
      color: '#ec4899',
      position: { x: 45, y: 85 },
      connections: ['creative-mind', 'drum-bass-doctor']
    },
    {
      id: 'drum-bass-doctor',
      name: 'Drum & Bass Doctor',
      type: 'drum-bass-doctor',
      description: 'Rhythm Specialist - Electronic music and bass line expert',
      capabilities: [
        'Drum Programming',
        'Bass Line Creation',
        'Electronic Music',
        'Rhythm Analysis',
        'Audio Engineering'
      ],
      color: '#ef4444',
      position: { x: 55, y: 85 },
      connections: ['beat-buddy', 'ghost-termux']
    },
    {
      id: 'eidolon',
      name: 'Eidolon',
      type: 'eidolon',
      description: 'Encrypted Notes - Secure information and data protection',
      capabilities: [
        'Data Encryption',
        'Secure Storage',
        'Privacy Protection',
        'Access Control',
        'Cryptographic Analysis'
      ],
      color: '#6366f1',
      position: { x: 75, y: 85 },
      connections: ['memory-stone', 'ghost-termux']
    },
    {
      id: 'ghost-termux',
      name: 'Ghost@Termux',
      type: 'ghost-termux',
      description: 'Terminal AI Companion - Command line interface and system operations',
      capabilities: [
        'Terminal Operations',
        'System Commands',
        'Process Management',
        'Network Operations',
        'Shell Scripting'
      ],
      color: '#6b7280',
      position: { x: 65, y: 85 },
      connections: ['drum-bass-doctor', 'eidolon', 'mistr-mintr']
    },
    {
      id: 'mistr-mintr',
      name: 'Mistr Mintr',
      type: 'mistr-mintr',
      description: 'Memory Agent - Advanced memory management and optimization',
      capabilities: [
        'Memory Management',
        'Cache Optimization',
        'Data Persistence',
        'Memory Analytics',
        'Storage Optimization'
      ],
      color: '#eab308',
      position: { x: 35, y: 85 },
      connections: ['ghost-termux', 'memory-stone']
    }
  ]

  return agentConfigs.map(config => ({
    ...config,
    status: 'online' as const,
    metrics: {
      load: Math.floor(Math.random() * 60) + 20,
      accuracy: Math.floor(Math.random() * 15) + 85,
      performance: Math.floor(Math.random() * 20) + 80,
      uptime: Math.floor(Math.random() * 48) + 24,
      tasksCompleted: Math.floor(Math.random() * 100),
      errors: Math.floor(Math.random() * 5)
    },
    lastActive: new Date(Date.now() - Math.random() * 3600000) // Within last hour
  }))
}

export function getAgentByType(type: AgentType): Agent | null {
  const agents = createInitialAgents()
  return agents.find(agent => agent.type === type) || null
}

export function getAgentCapabilities(agentId: string): string[] {
  const agents = createInitialAgents()
  const agent = agents.find(a => a.id === agentId)
  return agent?.capabilities || []
}

export function getConnectedAgents(agentId: string): string[] {
  const agents = createInitialAgents()
  const agent = agents.find(a => a.id === agentId)
  return agent?.connections || []
}

export function updateAgentMetrics(agent: Agent, updates: Partial<Agent['metrics']>): Agent {
  return {
    ...agent,
    metrics: {
      ...agent.metrics,
      ...updates
    },
    lastActive: new Date()
  }
}

export function isAgentHealthy(agent: Agent): boolean {
  const { load, accuracy, uptime, errors } = agent.metrics
  return (
    load < 90 &&
    accuracy > 70 &&
    uptime > 10 &&
    errors < 10 &&
    agent.status === 'online'
  )
}

export function getAgentNetworkDistance(fromId: string, toId: string): number {
  const agents = createInitialAgents()
  const fromAgent = agents.find(a => a.id === fromId)
  const toAgent = agents.find(a => a.id === toId)
  
  if (!fromAgent || !toAgent) return Infinity
  
  // Simple distance calculation based on position
  const dx = fromAgent.position.x - toAgent.position.x
  const dy = fromAgent.position.y - toAgent.position.y
  return Math.sqrt(dx * dx + dy * dy)
}

export function getOptimalAgentForTask(task: string, agents: Agent[]): Agent | null {
  // Simple task-agent matching based on capabilities
  const taskKeywords = task.toLowerCase().split(' ')
  
  let bestAgent: Agent | null = null
  let bestScore = 0
  
  for (const agent of agents) {
    if (agent.status !== 'online') continue
    
    let score = 0
    for (const capability of agent.capabilities) {
      const capabilityWords = capability.toLowerCase().split(' ')
      for (const taskWord of taskKeywords) {
        for (const capWord of capabilityWords) {
          if (capWord.includes(taskWord) || taskWord.includes(capWord)) {
            score += 1
          }
        }
      }
    }
    
    // Factor in agent health and availability
    if (isAgentHealthy(agent)) {
      score *= 1.2
    }
    if (agent.metrics.load < 50) {
      score *= 1.1
    }
    
    if (score > bestScore) {
      bestScore = score
      bestAgent = agent
    }
  }
  
  return bestAgent
}