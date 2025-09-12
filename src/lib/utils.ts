import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ${hours % 24}h`
  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

export function formatNumber(num: number, precision = 1): string {
  if (num >= 1e9) return (num / 1e9).toFixed(precision) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(precision) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(precision) + 'K'
  return num.toString()
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'online':
    case 'active':
    case 'completed':
      return 'text-green-400'
    case 'processing':
    case 'pending':
      return 'text-yellow-400'
    case 'error':
    case 'failed':
    case 'critical':
      return 'text-red-400'
    case 'offline':
    case 'disabled':
      return 'text-gray-400'
    default:
      return 'text-blue-400'
  }
}

export function getMetricColor(value: number, thresholds: { low: number; high: number }): string {
  if (value < thresholds.low) return 'text-green-400'
  if (value > thresholds.high) return 'text-red-400'
  return 'text-yellow-400'
}

export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 9)
  return `${prefix}${prefix ? '_' : ''}${timestamp}_${random}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength - 3) + '...'
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^[A-Z]/, c => c.toLowerCase())
}

export function parseJsonSafely<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString)
  } catch {
    return fallback
  }
}

export function getColorForAgent(agentType: string): string {
  const colors: Record<string, string> = {
    'conductor': '#fbbf24',
    'neural-architect': '#a855f7',
    'quantum-oracle': '#00d4ff',
    'synthesis-engine': '#fbbf24',
    'logic-reasoner': '#f97316',
    'creative-mind': '#ec4899',
    'memory-stone': '#14b8a6',
    'beat-buddy': '#ec4899',
    'drum-bass-doctor': '#ef4444',
    'eidolon': '#6366f1',
    'ghost-termux': '#6b7280',
    'mistr-mintr': '#eab308'
  }
  
  return colors[agentType] || '#8b5cf6'
}

export function calculateDistance(
  point1: { x: number; y: number }, 
  point2: { x: number; y: number }
): number {
  const dx = point1.x - point2.x
  const dy = point1.y - point2.y
  return Math.sqrt(dx * dx + dy * dy)
}

export function interpolateColor(color1: string, color2: string, factor: number): string {
  // Simple hex color interpolation
  const hex1 = color1.replace('#', '')
  const hex2 = color2.replace('#', '')
  
  const r1 = parseInt(hex1.substr(0, 2), 16)
  const g1 = parseInt(hex1.substr(2, 2), 16)
  const b1 = parseInt(hex1.substr(4, 2), 16)
  
  const r2 = parseInt(hex2.substr(0, 2), 16)
  const g2 = parseInt(hex2.substr(2, 2), 16)
  const b2 = parseInt(hex2.substr(4, 2), 16)
  
  const r = Math.round(r1 + (r2 - r1) * factor)
  const g = Math.round(g1 + (g2 - g1) * factor)
  const b = Math.round(b1 + (b2 - b1) * factor)
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function getRandomMatrixChar(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>+=|\\~`'
  return chars[Math.floor(Math.random() * chars.length)]
}