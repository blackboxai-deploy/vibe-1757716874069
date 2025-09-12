'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ControlPanelProps {
  selectedMode: 'supervisor' | 'network'
  onModeChange: (mode: 'supervisor' | 'network') => void
  onExecuteCommand: (command: string) => void
  onReset: () => void
  onDemo: () => void
  isProcessing: boolean
  sessionStats: {
    sessions: number
    responses: number
    uptime: string
  }
}

export function ControlPanel({
  selectedMode,
  onModeChange,
  onExecuteCommand,
  onReset,
  onDemo,
  isProcessing,
  sessionStats
}: ControlPanelProps) {
  const [command, setCommand] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (value: string) => {
    setCommand(value)
    setCharCount(value.length)
  }

  const handleSubmit = () => {
    if (command.trim() && !isProcessing) {
      onExecuteCommand(command.trim())
      setCommand('')
      setCharCount(0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Card className="bg-black/90 rounded-xl shadow-2xl border-2 border-neon-purple h-fit">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold text-purple-300">
          ⚡ Mission Control
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="p-4 bg-gradient-to-r from-purple-900/50 to-black rounded-lg border border-neon-yellow">
          <div className="flex items-center">
            <div className="agent-status-indicator w-4 h-4 bg-neon-yellow rounded-full mr-3"></div>
            <div>
              <div className="text-neon-yellow font-semibold">BETA MODE ACTIVE</div>
              <div className="text-purple-400 text-sm">All systems operational</div>
            </div>
          </div>
        </div>
        
        {/* Architecture Mode Selector */}
        <div>
          <label className="block text-neon-yellow mb-3 font-semibold">
            🔗 Architecture Mode
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button 
              variant={selectedMode === 'supervisor' ? 'neon' : 'outline'}
              onClick={() => onModeChange('supervisor')}
              className="text-sm"
            >
              👑 Supervisor
            </Button>
            <Button 
              variant={selectedMode === 'network' ? 'neon' : 'outline'}
              onClick={() => onModeChange('network')}
              className="text-sm"
            >
              🕸️ Network
            </Button>
          </div>
          <div className="text-xs text-purple-400 bg-purple-900/30 p-2 rounded">
            Mode: <span className="text-neon-yellow font-semibold capitalize">{selectedMode}</span>
          </div>
        </div>

        {/* Command Input Area */}
        <div>
          <label htmlFor="command-input" className="block text-neon-yellow mb-3 font-semibold">
            💻 Command Input
          </label>
          <div className="relative">
            <Textarea 
              id="command-input"
              rows={4}
              value={command}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-black text-neon-yellow rounded-lg p-4 border-2 border-neon-purple focus:border-neon-yellow focus:ring-2 focus:ring-neon-yellow/50 font-mono text-sm resize-none"
              placeholder="Enter your complex mission parameters..."
              disabled={isProcessing}
              maxLength={1000}
            />
            <div className="absolute bottom-2 right-2 text-xs text-purple-400">
              {charCount}/1000
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleSubmit}
            disabled={!command.trim() || isProcessing}
            variant="neon"
            className="w-full py-4 text-lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin mr-3">⚙️</div>
                PROCESSING MISSION...
              </>
            ) : (
              <>
                🚀 EXECUTE MISSION
              </>
            )}
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <Button 
              onClick={onReset}
              variant="outline" 
              disabled={isProcessing}
              className="border-red-500 text-red-400 hover:bg-red-900/30"
            >
              🔌
            </Button>
            <Button 
              onClick={onDemo}
              variant="outline"
              disabled={isProcessing}
              className="border-green-500 text-green-400 hover:bg-green-900/30"
            >
              ▶️
            </Button>
            <Button 
              variant="outline" 
              disabled={isProcessing}
              className="border-gray-500 text-gray-400 hover:bg-gray-900/30"
            >
              ⚙️
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-purple-900/30 to-black p-3 rounded-lg border border-neon-purple">
          <div className="text-xs text-purple-400 mb-2">Quick Stats</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Sessions: <span className="text-neon-yellow">{sessionStats.sessions}</span></div>
            <div>Uptime: <span className="text-green-400">{sessionStats.uptime}</span></div>
            <div>Responses: <span className="text-neon-blue">{sessionStats.responses}</span></div>
            <div>Accuracy: <span className="text-purple-400">99.7%</span></div>
          </div>
        </div>

        {/* Keyboard Shortcut Hint */}
        <div className="text-xs text-gray-500 text-center">
          💡 Tip: Ctrl/Cmd + Enter to execute
        </div>
      </CardContent>
    </Card>
  )
}