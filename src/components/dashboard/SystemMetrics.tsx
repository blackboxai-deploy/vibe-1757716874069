'use client'

import { Card, CardContent } from '@/components/ui/card'
import { SystemStatus } from '@/types'

interface SystemMetricsProps {
  systemStatus: SystemStatus
  sessionStats: {
    sessions: number
    responses: number
    uptime: string
  }
  agents: unknown[]
}

export function SystemMetrics({ systemStatus, sessionStats }: SystemMetricsProps) {

  const getMetricColor = (value: number, threshold: number) => {
    if (value < threshold) return 'text-green-400'
    if (value < threshold * 1.2) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <Card className="bg-black/80 border-2 border-neon-purple rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-green-400 font-semibold">System Online</span>
            </div>
            <div className="flex items-center">
              <span className="text-purple-400">👥</span>
              <span className="text-purple-400 ml-1">{systemStatus.activeAgents}/12 Agents Active</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400">⚡</span>
              <span className="text-yellow-400 ml-1">{systemStatus.power}% Power</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* CPU Usage */}
            <div className="flex items-center space-x-2">
              <span className="text-purple-400 text-sm">CPU:</span>
              <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${getMetricColor(systemStatus.cpuUsage, 70)} bg-current`}
                  style={{ width: `${systemStatus.cpuUsage}%` }}
                />
              </div>
              <span className={`text-xs font-mono ${getMetricColor(systemStatus.cpuUsage, 70)}`}>
                {systemStatus.cpuUsage}%
              </span>
            </div>
            
            {/* Memory Usage */}
            <div className="flex items-center space-x-2">
              <span className="text-purple-400 text-sm">MEM:</span>
              <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${getMetricColor(systemStatus.memoryUsage, 80)} bg-current`}
                  style={{ width: `${systemStatus.memoryUsage}%` }}
                />
              </div>
              <span className={`text-xs font-mono ${getMetricColor(systemStatus.memoryUsage, 80)}`}>
                {systemStatus.memoryUsage}%
              </span>
            </div>
            
            {/* Performance Meter */}
            <div className="flex items-center space-x-4">
              <div className="performance-meter w-32 h-1"></div>
              <span className="text-xs text-gray-400">Performance: Optimal</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Network Stats */}
            <div className="text-xs space-y-1">
              <div className="text-purple-400">Network:</div>
              <div className="text-green-400">BW: {systemStatus.bandwidth}</div>
              <div className="text-yellow-400">LAT: {systemStatus.latency}</div>
            </div>
            
            {/* Session Stats */}
            <div className="text-xs space-y-1">
              <div className="text-purple-400">Session:</div>
              <div className="text-blue-400">Runs: {sessionStats.sessions}</div>
              <div className="text-green-400">Time: {sessionStats.uptime}</div>
            </div>
            
            {/* System Health */}
            <div className="text-xs space-y-1">
              <div className="text-purple-400">Health:</div>
              <div className={`${getMetricColor(systemStatus.temperature, 50)}`}>
                TEMP: {systemStatus.temperature}°C
              </div>
              <div className="text-green-400">ACC: 99.7%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}