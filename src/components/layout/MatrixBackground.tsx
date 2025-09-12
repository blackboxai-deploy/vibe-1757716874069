'use client'

import { useEffect, useRef } from 'react'

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix configuration
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-=[]{}|;:,.<>?'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * canvas.height / fontSize))

    let animationId: number

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.fillStyle = '#8b5cf6'
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      drops.forEach((y, i) => {
        const text = letters.charAt(Math.floor(Math.random() * letters.length))
        const x = i * fontSize
        
        ctx.fillText(text, x, y * fontSize)

        // Reset drop randomly or continue falling
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        } else {
          drops[i]++
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-10"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}