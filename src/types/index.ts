export interface Agent {
  id: string
  name: string
  type: AgentType
  status: AgentStatus
  description: string
  capabilities: string[]
  metrics: AgentMetrics
  lastActive: Date
  color: string
  position: { x: number; y: number }
  connections: string[]
}

export interface AgentMetrics {
  load: number
  accuracy: number
  performance: number
  uptime: number
  tasksCompleted: number
  errors: number
}

export interface SystemStatus {
  online: boolean
  power: number
  activeAgents: number
  totalAgents: number
  bandwidth: string
  latency: string
  throughput: string
  temperature: number
  memoryUsage: number
  cpuUsage: number
}

export interface ConsciousnessEntry {
  id: string
  timestamp: Date
  agentId: string
  content: string
  type: 'thought' | 'decision' | 'memory' | 'communication'
  priority: 'low' | 'medium' | 'high' | 'critical'
  metadata?: Record<string, any>
}

export interface Mission {
  id: string
  command: string
  mode: 'supervisor' | 'network'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  assignedAgents: string[]
  results: MissionResult[]
  startTime: Date
  endTime?: Date
  priority: number
}

export interface MissionResult {
  agentId: string
  output: string
  success: boolean
  executionTime: number
  resources: string[]
}

export interface NetworkConnection {
  from: string
  to: string
  strength: number
  dataFlow: number
  latency: number
  type: 'command' | 'data' | 'feedback' | 'sync'
}

export interface AgentCapability {
  name: string
  description: string
  efficiency: number
  requirements: string[]
  outputs: string[]
}

export interface SystemMetrics {
  timestamp: Date
  cpuUsage: number
  memoryUsage: number
  networkTraffic: number
  agentActivity: number
  consciousnessLevel: number
  systemHealth: number
}

export interface SessionStats {
  sessions: number
  responses: number
  uptime: string
  averageResponseTime: number
  successRate: number
  totalTokensProcessed: number
}

export interface AIResponse {
  success: boolean
  data?: any
  error?: string
  metadata?: {
    model: string
    tokens: number
    processingTime: number
    confidence: number
  }
}

export type AgentType = 
  | 'conductor'
  | 'neural-architect'
  | 'quantum-oracle'
  | 'synthesis-engine'
  | 'logic-reasoner'
  | 'creative-mind'
  | 'memory-stone'
  | 'beat-buddy'
  | 'drum-bass-doctor'
  | 'eidolon'
  | 'ghost-termux'
  | 'mistr-mintr'

export type AgentStatus = 
  | 'online'
  | 'offline'
  | 'processing'
  | 'error'
  | 'initializing'
  | 'standby'
  | 'maintenance'

export type SystemMode = 'supervisor' | 'network'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical'

export interface LogEntry {
  id: string
  timestamp: Date
  level: LogLevel
  source: string
  message: string
  data?: any
}

export interface QuantumState {
  coherence: number
  entanglement: number
  superposition: number
  decoherence: number
  qubits: number
}

export interface NeuralNetwork {
  nodes: number
  connections: number
  layers: number
  activationFunction: string
  learningRate: number
  accuracy: number
}

export interface CreativeOutput {
  type: 'text' | 'image' | 'music' | 'concept'
  content: string
  creativity: number
  originality: number
  coherence: number
}

export interface MemoryBank {
  id: string
  type: 'short-term' | 'long-term' | 'procedural' | 'episodic'
  capacity: number
  usage: number
  entries: number
  retrieval: number
}