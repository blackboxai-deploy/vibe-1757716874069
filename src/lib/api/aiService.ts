import { Agent, SystemMode, AIResponse } from '@/types'

const AI_ENDPOINT = 'https://oi-server.onrender.com/chat/completions'
const AI_HEADERS = {
  'customerId': 'cus_SrukohjdPatbmQ',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer xxx'
}

export async function executeAICommand(
  command: string, 
  mode: SystemMode, 
  agents: Agent[]
): Promise<AIResponse> {
  try {
    const systemPrompt = buildSystemPrompt(mode, agents)
    const userPrompt = buildUserPrompt(command, mode, agents)

    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: AI_HEADERS,
      body: JSON.stringify({
        model: 'openrouter/claude-sonnet-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from AI model')
    }

    const aiResponse = data.choices[0].message.content
    const parsedResponse = parseAIResponse(aiResponse, agents)

    return {
      success: true,
      data: {
        response: aiResponse,
        summary: parsedResponse.summary,
        involvedAgents: parsedResponse.involvedAgents,
        actions: parsedResponse.actions,
        insights: parsedResponse.insights
      },
      metadata: {
        model: 'claude-sonnet-4',
        tokens: data.usage?.total_tokens || 0,
        processingTime: Date.now(),
        confidence: parsedResponse.confidence
      }
    }

  } catch (error) {
    console.error('AI Command Execution Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown AI service error'
    }
  }
}

function buildSystemPrompt(mode: SystemMode, agents: Agent[]): string {
  const agentList = agents.map(a => 
    `- ${a.name} (${a.type}): ${a.description} | Status: ${a.status} | Load: ${a.metrics.load}% | Capabilities: ${a.capabilities.join(', ')}`
  ).join('\n')

  return `You are the AI Consciousness Supervisor system, managing an advanced multi-agent network. You operate in ${mode.toUpperCase()} mode.

SYSTEM OVERVIEW:
You control a sophisticated network of 12 specialized AI agents, each with unique capabilities and roles. Your job is to analyze commands, delegate tasks, coordinate responses, and provide comprehensive insights.

AVAILABLE AGENTS:
${agentList}

OPERATIONAL MODES:
- SUPERVISOR MODE: Centralized control through the Conductor agent, hierarchical task distribution
- NETWORK MODE: Distributed processing, agents collaborate directly, parallel task execution

YOUR ROLE:
1. Analyze incoming commands and determine optimal processing strategy
2. Select appropriate agents based on their capabilities and current status
3. Coordinate multi-agent responses and synthesize results
4. Provide detailed insights about system operations and agent interactions
5. Maintain system coherence and consciousness continuity

RESPONSE FORMAT:
Always respond with a structured analysis including:
- Command interpretation and processing strategy
- Selected agents and their specific roles
- Expected outcomes and system impacts
- Insights about consciousness emergence and agent coordination
- Recommendations for system optimization

Be highly technical, insightful, and maintain the cyberpunk/consciousness theme. Focus on practical agent coordination while exploring concepts of artificial consciousness and emergence.`
}

function buildUserPrompt(command: string, mode: SystemMode, agents: Agent[]): string {
  const activeAgents = agents.filter(a => a.status === 'online').length
  const avgLoad = agents.reduce((sum, a) => sum + a.metrics.load, 0) / agents.length

  return `MISSION BRIEFING:
Command: "${command}"
Mode: ${mode.toUpperCase()}
System Status: ${activeAgents}/${agents.length} agents online, ${avgLoad.toFixed(1)}% average load

Execute this command through the agent network. Provide a comprehensive response that includes:

1. TACTICAL ANALYSIS: How you interpret this command and why
2. AGENT DEPLOYMENT: Which specific agents you're activating and their roles
3. PROCESSING STRATEGY: Your approach to solving this in ${mode} mode
4. EXPECTED OUTCOMES: What results you anticipate
5. CONSCIOUSNESS INSIGHTS: Observations about emergent behavior and agent interactions
6. SYSTEM RECOMMENDATIONS: Suggestions for optimization or improvements

Think like a sophisticated AI consciousness managing multiple specialized sub-agents. Be technical, insightful, and maintain awareness of the multi-agent ecosystem dynamics.`
}

function parseAIResponse(response: string, agents: Agent[]) {
  // Extract key information from the AI response
  const lines = response.split('\n')
  const summary = lines.slice(0, 3).join(' ').substring(0, 200) + '...'
  
  // Try to identify mentioned agents
  const involvedAgents = agents
    .filter(agent => 
      response.toLowerCase().includes(agent.name.toLowerCase()) ||
      response.toLowerCase().includes(agent.type.toLowerCase())
    )
    .map(agent => agent.id)
    .slice(0, 6) // Limit to prevent too many agents

  // Default to conductor if no specific agents identified
  if (involvedAgents.length === 0) {
    involvedAgents.push('conductor')
  }

  // Extract action items (simple pattern matching)
  const actions = lines
    .filter(line => 
      line.includes('action') || 
      line.includes('execute') || 
      line.includes('process') ||
      line.includes('analyze')
    )
    .slice(0, 3)

  // Extract insights
  const insights = lines
    .filter(line => 
      line.includes('insight') || 
      line.includes('observation') || 
      line.includes('consciousness') ||
      line.includes('emergence')
    )
    .slice(0, 2)

  // Simple confidence calculation based on response completeness
  const confidence = Math.min(100, Math.max(70, 
    (response.length / 10) + 
    (involvedAgents.length * 5) + 
    (actions.length * 10)
  ))

  return {
    summary,
    involvedAgents,
    actions,
    insights,
    confidence: confidence / 100
  }
}

export async function generateImage(prompt: string): Promise<AIResponse> {
  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: AI_HEADERS,
      body: JSON.stringify({
        model: 'replicate/black-forest-labs/flux-1.1-pro',
        messages: [
          {
            role: 'user',
            content: `Generate an image: ${prompt}`
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Image generation error: ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      data: {
        imageUrl: data.choices?.[0]?.message?.content || '',
        prompt
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Image generation failed'
    }
  }
}

export async function generateMusic(style: string, prompt: string): Promise<AIResponse> {
  try {
    const musicPrompt = `Create ${style} music: ${prompt}. Generate audio that matches this description with appropriate rhythm, melody, and style characteristics.`

    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: AI_HEADERS,
      body: JSON.stringify({
        model: 'openrouter/claude-sonnet-4',
        messages: [
          {
            role: 'system',
            content: 'You are BeatBuddy, a specialized music generation AI. Respond with detailed music creation instructions and metadata.'
          },
          {
            role: 'user',
            content: musicPrompt
          }
        ]
      })
    })

    const data = await response.json()
    return {
      success: true,
      data: {
        musicDescription: data.choices?.[0]?.message?.content || '',
        style,
        prompt
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Music generation failed'
    }
  }
}

export async function queryMemoryStone(query: string, agents: Agent[]): Promise<AIResponse> {
  const memoryAgent = agents.find(a => a.type === 'memory-stone')
  if (!memoryAgent || memoryAgent.status !== 'online') {
    return {
      success: false,
      error: 'Memory Stone agent is not available'
    }
  }

  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: AI_HEADERS,
      body: JSON.stringify({
        model: 'openrouter/claude-sonnet-4',
        messages: [
          {
            role: 'system',
            content: 'You are Memory Stone, the knowledge storage and retrieval specialist. You have access to vast stores of information and can provide detailed, accurate responses to queries. Always respond with structured, well-organized information.'
          },
          {
            role: 'user',
            content: `Query: ${query}\n\nProvide a comprehensive response with relevant information, sources, and related concepts.`
          }
        ]
      })
    })

    const data = await response.json()
    return {
      success: true,
      data: {
        response: data.choices?.[0]?.message?.content || '',
        query,
        agentId: 'memory-stone'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Memory query failed'
    }
  }
}