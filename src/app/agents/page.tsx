'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AgentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold holographic-text font-orbitron mb-4">
          🤖 Individual Agent Interfaces
        </h1>
        <p className="text-purple-300 text-lg">
          Direct communication with each AI agent in the consciousness network
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Coming soon cards for each agent */}
        {[
          { name: 'Conductor', icon: '👑', description: 'System orchestrator' },
          { name: 'Neural Architect', icon: '🧠', description: 'Network designer' },
          { name: 'Quantum Oracle', icon: '⚛️', description: 'Probability engine' },
          { name: 'Synthesis Engine', icon: '🔗', description: 'Knowledge fusion' },
          { name: 'Logic Reasoner', icon: '🤔', description: 'Inference system' },
          { name: 'Creative Mind', icon: '🎨', description: 'Innovation generator' },
          { name: 'Memory Stone', icon: '💾', description: 'Knowledge storage' },
          { name: 'BeatBuddy', icon: '🎵', description: 'Music generator' },
          { name: 'Drum & Bass Doctor', icon: '🥁', description: 'Rhythm specialist' },
          { name: 'Eidolon', icon: '🔐', description: 'Encrypted notes' },
          { name: 'Ghost@Termux', icon: '👻', description: 'Terminal AI' },
          { name: 'Mistr Mintr', icon: '⚡', description: 'Memory management' }
        ].map((agent, index) => (
          <Card key={index} className="agent-card bg-gradient-to-br from-cyber-black to-cyber-purple border-2 border-neon-purple">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{agent.icon}</div>
              <CardTitle className="text-purple-300">{agent.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-neon-yellow mb-4">{agent.description}</p>
              <div className="text-sm text-purple-400 bg-purple-900/30 p-3 rounded">
                🚧 Individual agent interface coming soon! 
                <br />
                Use the main dashboard for now.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}