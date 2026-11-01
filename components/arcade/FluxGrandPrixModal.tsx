'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

interface CollectibleConfig {
  name: string
  color: string
  url: string
}

const RESOURCES: Record<string, CollectibleConfig> = {
  SW: {
    name: 'Software & Algorithms',
    color: '#63c9ff',
    url: '/blog?category=DSA',
  },
  HW: {
    name: 'Embedded Hardware',
    color: '#ffc36c',
    url: '/blog?category=Embedded',
  },
  RB: {
    name: 'Autonomous Robotics',
    color: '#b6a1ff',
    url: '/blog?category=Robotics',
  },
}

interface GameObject {
  lane: number
  y: number
  kind: 'SW' | 'HW' | 'RB' | 'cone'
}

interface SmokeParticle {
  x: number
  y: number
  radius: number
  age: number
  life: number
}

export default function FluxGrandPrixModal({
  isOpen,
  onClose,
  duration = 30,
}: {
  isOpen: boolean
  onClose: () => void
  duration?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  const [gameState, setGameState] = useState<'intro' | 'running' | 'paused' | 'result'>('intro')
  const [timeLeft, setTimeLeft] = useState(duration)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [lives, setLives] = useState(3)
  const [resultData, setResultData] = useState<{
    score: number
    pickups: Record<string, number>
    recommendation: CollectibleConfig
    best: number
  } | null>(null)

  // Mutable game loop refs to avoid re-renders during high-frequency loop
  const gameRef = useRef({
    elapsed: 0,
    score: 0,
    lives: 3,
    combo: 0,
    playerLane: 1,
    carX: 0,
    scroll: 0,
    spawnTimer: 0,
    invincible: 0,
    pickups: { SW: 0, HW: 0, RB: 0 } as Record<string, number>,
    objects: [] as GameObject[],
    smoke: [] as SmokeParticle[],
    previousTime: 0,
    rafId: 0,
    isRunning: false,
    W: 700,
    H: 450,
  })

  const laneX = useCallback((lane: number, W: number) => {
    return W * (0.14 + ((lane + 0.5) * 0.72) / 3)
  }, [])

  const steer = useCallback((direction: number) => {
    const g = gameRef.current
    if (!g.isRunning) return
    g.playerLane = Math.max(0, Math.min(2, g.playerLane + direction))
  }, [])

  const endRace = useCallback(() => {
    const g = gameRef.current
    g.isRunning = false
    cancelAnimationFrame(g.rafId)

    const total = Object.values(g.pickups).reduce((a, b) => a + b, 0)
    const keys: Array<'SW' | 'HW' | 'RB'> = ['SW', 'HW', 'RB']
    keys.sort((a, b) => (g.pickups[b] || 0) - (g.pickups[a] || 0))
    const winningKey = keys[0]
    const recommendation = RESOURCES[winningKey]


    let best = g.score
    try {
      best = Math.max(best, Number(localStorage.getItem('fluxGrandPrixBest') || 0))
      localStorage.setItem('fluxGrandPrixBest', String(best))
    } catch {
      // localStorage is optional
    }

    setResultData({
      score: g.score,
      pickups: { ...g.pickups },
      recommendation,
      best,
    })
    setGameState('result')
  }, [])

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const g = gameRef.current
    const { W, H } = g

    ctx.clearRect(0, 0, W, H)

    // Base background
    ctx.fillStyle = '#0D1014'
    ctx.fillRect(0, 0, W, H)

    const left = W * 0.14
    const roadWidth = W * 0.72
    const laneWidth = roadWidth / 3

    // Track surface
    ctx.fillStyle = '#171C23'
    ctx.fillRect(left, 0, roadWidth, H)

    // Red kerbs
    ctx.fillStyle = '#D94A5B'
    ctx.fillRect(left - 6, 0, 6, H)
    ctx.fillRect(left + roadWidth, 0, 6, H)

    // Moving lane dividers
    ctx.strokeStyle = '#30363E'
    ctx.lineWidth = 2
    ctx.setLineDash([20, 22])
    ctx.lineDashOffset = -(g.scroll % 42)

    for (let i = 1; i <= 2; i++) {
      const x = left + i * laneWidth
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, H)
      ctx.stroke()
    }
    ctx.setLineDash([])

    // Smoke
    g.smoke.forEach(p => {
      ctx.globalAlpha = 0.28 * (1 - p.age / p.life)
      ctx.fillStyle = '#9EA6AF'
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1

    // Draw objects
    g.objects.forEach(obj => {
      const x = laneX(obj.lane, W)
      const y = obj.y

      if (obj.kind === 'cone') {
        ctx.fillStyle = '#FF6B35'
        ctx.beginPath()
        ctx.moveTo(x, y - 16)
        ctx.lineTo(x + 16, y + 16)
        ctx.lineTo(x - 16, y + 16)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(x - 8, y + 4, 16, 4)
        return
      }

      ctx.beginPath()
      ctx.arc(x, y, 17, 0, Math.PI * 2)
      ctx.fillStyle = RESOURCES[obj.kind]?.color || '#FFFFFF'
      ctx.fill()

      ctx.strokeStyle = '#EFF0F2'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = '#0D1014'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(obj.kind, x, y)
    })

    // Draw car
    const carX = g.carX || laneX(1, W)
    const carY = H * 0.78

    ctx.save()
    ctx.translate(carX, carY)

    if (g.invincible > 0 && Math.floor(g.invincible * 12) % 2) {
      ctx.globalAlpha = 0.4
    }

    // Wheels
    ctx.fillStyle = '#101419'
    ctx.fillRect(-22, -22, 11, 20)
    ctx.fillRect(11, -22, 11, 20)
    ctx.fillRect(-22, 12, 11, 20)
    ctx.fillRect(11, 12, 11, 20)

    // Wings
    ctx.fillStyle = '#D94A5B'
    ctx.fillRect(-24, -28, 48, 8)
    ctx.fillRect(-22, 24, 44, 9)

    // Chassis
    ctx.beginPath()
    ctx.moveTo(0, -40)
    ctx.lineTo(8, -18)
    ctx.lineTo(13, 22)
    ctx.lineTo(-13, 22)
    ctx.lineTo(-8, -18)
    ctx.closePath()
    ctx.fill()

    // Halo & cockpit
    ctx.fillStyle = '#0D1014'
    ctx.beginPath()
    ctx.ellipse(0, 0, 7, 10, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = '#EFF0F2'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(0, 0, 8, Math.PI * 1.1, Math.PI * 1.9)
    ctx.stroke()

    ctx.restore()
  }, [laneX])

  const startRace = useCallback(() => {
    const g = gameRef.current
    g.elapsed = 0
    g.score = 0
    g.lives = 3
    g.combo = 0
    g.playerLane = 1
    g.spawnTimer = 0
    g.scroll = 0
    g.invincible = 0
    g.pickups = { SW: 0, HW: 0, RB: 0 }
    g.objects = []
    g.smoke = []
    g.isRunning = true

    setScore(0)
    setCombo(0)
    setLives(3)
    setTimeLeft(duration)
    setGameState('running')

    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      g.W = Math.max(300, rect.width)
      g.H = Math.max(260, rect.height)
      g.carX = laneX(1, g.W)
    }

    g.previousTime = performance.now()
    cancelAnimationFrame(g.rafId)

    const loop = (now: number) => {
      if (!g.isRunning) return
      const dt = Math.min((now - g.previousTime) / 1000, 0.05)
      g.previousTime = now

      // Update
      g.elapsed += dt
      const rem = Math.ceil(Math.max(0, duration - g.elapsed))
      setTimeLeft(rem)

      if (g.elapsed >= duration) {
        endRace()
        return
      }

      const speed = 250 + g.elapsed * 5
      g.scroll += speed * dt
      g.invincible = Math.max(0, g.invincible - dt)

      const targetX = laneX(g.playerLane, g.W)
      g.carX += (targetX - g.carX) * Math.min(1, dt * 16)

      g.spawnTimer += dt
      if (g.spawnTimer >= 0.72) {
        g.spawnTimer = 0
        const lane = Math.floor(Math.random() * 3)
        const isCone = Math.random() < 0.28
        const kind = isCone
          ? 'cone'
          : (['SW', 'HW', 'RB'][Math.floor(Math.random() * 3)] as 'SW' | 'HW' | 'RB')
        g.objects.push({ lane, y: -40, kind })
      }

      // Exhaust smoke
      if (Math.random() < dt * 20 && g.smoke.length < 30) {
        g.smoke.push({
          x: g.carX + (Math.random() - 0.5) * 12,
          y: g.H * 0.78 + 26,
          radius: 3 + Math.random() * 4,
          age: 0,
          life: 0.35 + Math.random() * 0.3,
        })
      }
      g.smoke.forEach(p => {
        p.age += dt
        p.y += dt * 60
        p.radius += dt * 10
      })
      g.smoke = g.smoke.filter(p => p.age < p.life)

      // Object collision
      const carY = g.H * 0.78
      for (const obj of g.objects) {
        obj.y += speed * dt
        const col = Math.abs(obj.y - carY) < 28 && Math.abs(laneX(obj.lane, g.W) - g.carX) < 28
        if (col) {
          obj.y = g.H + 100
          if (obj.kind === 'cone') {
            if (g.invincible === 0) {
              g.lives -= 1
              g.combo = 0
              g.score = Math.max(0, g.score - 15)
              g.invincible = 0.9
              setLives(g.lives)
              setCombo(0)
              setScore(g.score)
              if (g.lives <= 0) {
                endRace()
                return
              }
            }
          } else {
            g.pickups[obj.kind]++
            g.combo++
            const multiplier = Math.min(3, 1 + Math.floor((g.combo - 1) / 3))
            g.score += 10 * multiplier
            setScore(g.score)
            setCombo(g.combo)
          }
        }
      }
      g.objects = g.objects.filter(o => o.y < g.H + 50)

      // Render
      renderCanvas()

      if (g.isRunning) {
        g.rafId = requestAnimationFrame(loop)
      }
    }

    g.rafId = requestAnimationFrame(loop)
  }, [duration, endRace, laneX, renderCanvas])

  const pauseRace = useCallback(() => {
    const g = gameRef.current
    if (!g.isRunning) return
    g.isRunning = false
    cancelAnimationFrame(g.rafId)
    setGameState('paused')
  }, [])

  const resumeRace = useCallback(() => {
    const g = gameRef.current
    if (g.isRunning) return
    g.isRunning = true
    setGameState('running')
    g.previousTime = performance.now()

    const loop = (now: number) => {
      if (!g.isRunning) return
      const dt = Math.min((now - g.previousTime) / 1000, 0.05)
      g.previousTime = now

      g.elapsed += dt
      const rem = Math.ceil(Math.max(0, duration - g.elapsed))
      setTimeLeft(rem)

      if (g.elapsed >= duration) {
        endRace()
        return
      }

      const speed = 250 + g.elapsed * 5
      g.scroll += speed * dt
      g.invincible = Math.max(0, g.invincible - dt)

      const targetX = laneX(g.playerLane, g.W)
      g.carX += (targetX - g.carX) * Math.min(1, dt * 16)

      g.spawnTimer += dt
      if (g.spawnTimer >= 0.72) {
        g.spawnTimer = 0
        const lane = Math.floor(Math.random() * 3)
        const isCone = Math.random() < 0.28
        const kind = isCone
          ? 'cone'
          : (['SW', 'HW', 'RB'][Math.floor(Math.random() * 3)] as 'SW' | 'HW' | 'RB')
        g.objects.push({ lane, y: -40, kind })
      }

      // Exhaust smoke
      if (Math.random() < dt * 20 && g.smoke.length < 30) {
        g.smoke.push({
          x: g.carX + (Math.random() - 0.5) * 12,
          y: g.H * 0.78 + 26,
          radius: 3 + Math.random() * 4,
          age: 0,
          life: 0.35 + Math.random() * 0.3,
        })
      }
      g.smoke.forEach(p => {
        p.age += dt
        p.y += dt * 60
        p.radius += dt * 10
      })
      g.smoke = g.smoke.filter(p => p.age < p.life)

      const carY = g.H * 0.78
      for (const obj of g.objects) {
        obj.y += speed * dt
        const col = Math.abs(obj.y - carY) < 28 && Math.abs(laneX(obj.lane, g.W) - g.carX) < 28
        if (col) {
          obj.y = g.H + 100
          if (obj.kind === 'cone') {
            if (g.invincible === 0) {
              g.lives -= 1
              g.combo = 0
              g.score = Math.max(0, g.score - 15)
              g.invincible = 0.9
              setLives(g.lives)
              setCombo(0)
              setScore(g.score)
              if (g.lives <= 0) {
                endRace()
                return
              }
            }
          } else {
            g.pickups[obj.kind]++
            g.combo++
            const multiplier = Math.min(3, 1 + Math.floor((g.combo - 1) / 3))
            g.score += 10 * multiplier
            setScore(g.score)
            setCombo(g.combo)
          }
        }
      }
      g.objects = g.objects.filter(o => o.y < g.H + 50)

      renderCanvas()

      if (g.isRunning) {
        g.rafId = requestAnimationFrame(loop)
      }
    }

    g.rafId = requestAnimationFrame(loop)
  }, [duration, endRace, laneX, renderCanvas])

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        const g = gameRef.current
        g.isRunning = false
        cancelAnimationFrame(g.rafId)
        onClose()
        return
      }
      if (e.key.toLowerCase() === 'p') {
        e.preventDefault()
        if (gameState === 'running') pauseRace()
        else if (gameState === 'paused') resumeRace()
        return
      }
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        e.preventDefault()
        steer(-1)
      }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        e.preventDefault()
        steer(1)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, gameState, pauseRace, resumeRace, steer, onClose])

  // Resize canvas when modal opens
  useEffect(() => {
    if (!isOpen) return
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const W = Math.max(300, rect.width)
      const H = Math.max(260, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      gameRef.current.W = W
      gameRef.current.H = H
      renderCanvas()
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [isOpen, renderCanvas])

  // Pause on tab visibility change
  useEffect(() => {
    const handleVis = () => {
      if (document.hidden && gameRef.current.isRunning) {
        pauseRace()
      }
    }
    document.addEventListener('visibilitychange', handleVis)
    return () => document.removeEventListener('visibilitychange', handleVis)
  }, [pauseRace])

  if (!isOpen) return null

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Flux Grand Prix"
    >
      <div className="relative w-full max-w-2xl bg-[#12161C] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* ── Top Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#171C23]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D94A5B]" />
            <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
              FLUX GRAND PRIX
            </span>
          </div>

          <div className="flex items-center gap-2">
            {gameState === 'running' && (
              <button
                type="button"
                onClick={pauseRace}
                className="px-3 py-1 rounded bg-[#202630] hover:bg-[#2B3340] text-xs font-mono text-white transition-colors"
              >
                Pause
              </button>
            )}
            {gameState === 'paused' && (
              <button
                type="button"
                onClick={resumeRace}
                className="px-3 py-1 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-xs font-mono text-white transition-colors font-semibold"
              >
                Resume
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                const g = gameRef.current
                g.isRunning = false
                cancelAnimationFrame(g.rafId)
                onClose()
              }}
              className="px-3 py-1 rounded border border-white/10 bg-transparent hover:bg-white/10 text-xs font-mono text-[#9EA6AF] hover:text-white transition-colors"
            >
              Exit ✕
            </button>
          </div>
        </div>

        {/* ── Telemetry HUD ───────────────────────────────────────────── */}
        <div className="grid grid-cols-4 divide-x divide-white/10 bg-[#0D1014] border-b border-white/10 text-center py-2.5 font-mono">
          <div>
            <span className="text-[10px] text-[#656D7A] block uppercase">Time</span>
            <span className="text-base font-bold text-white">{timeLeft}s</span>
          </div>
          <div>
            <span className="text-[10px] text-[#656D7A] block uppercase">Score</span>
            <span className="text-base font-bold text-[#EFF0F2]">{score}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#656D7A] block uppercase">Combo</span>
            <span className="text-base font-bold text-[#D94A5B]">×{Math.min(3, 1 + Math.floor(combo / 3))}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#656D7A] block uppercase">Chassis</span>
            <span className="text-base text-red-500 font-bold">
              {'♥'.repeat(lives)}{'♡'.repeat(3 - lives)}
            </span>
          </div>
        </div>

        {/* ── Stage with Canvas & Overlays ────────────────────────────── */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0D1014] overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
            onPointerDown={e => {
              const rect = e.currentTarget.getBoundingClientRect()
              const normalized = (e.clientX - rect.left) / rect.width
              const lane = Math.max(0, Math.min(2, Math.floor(((normalized - 0.14) / 0.72) * 3)))
              gameRef.current.playerLane = lane
            }}
          />

          {/* Intro Screen */}
          {gameState === 'intro' && (
            <div className="absolute inset-0 bg-[#0D1014]/92 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
              <span className="px-2.5 py-1 rounded bg-[#D94A5B]/15 border border-[#D94A5B]/30 text-xs font-mono text-[#D94A5B] font-semibold uppercase">
                30-SECOND ENGINEERING SPRINT
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                RACE. COLLECT. DISCOVER.
              </h2>
              <p className="text-xs sm:text-sm text-[#9EA6AF] max-w-md leading-relaxed">
                Collect SW (Software), HW (Hardware), and RB (Robotics) telemetry checkpoints. Avoid orange track cones. At the finish, explore matching real FluxECS guides!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={startRace}
                  className="px-6 py-2.5 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-white font-mono text-xs uppercase font-semibold tracking-wider transition-all shadow-[0_4px_16px_rgba(217,74,91,0.35)]"
                >
                  Start Race →
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded border border-white/15 bg-[#171C23] hover:bg-[#202630] text-[#9EA6AF] hover:text-white font-mono text-xs uppercase transition-all"
                >
                  Skip to Website
                </button>
              </div>
              <p className="text-[11px] font-mono text-[#656D7A]">
                Controls: ← → Arrow keys or A / D · Tap/Swipe on mobile · P to Pause
              </p>
            </div>
          )}

          {/* Pause Screen */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-[#0D1014]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
              <h2 className="font-display text-3xl font-bold uppercase text-white tracking-wider">
                RACE PAUSED
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resumeRace}
                  className="px-5 py-2.5 rounded bg-[#D94A5B] text-white font-mono text-xs uppercase font-semibold transition-all shadow-lg"
                >
                  Resume Race
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded border border-white/15 bg-[#171C23] text-[#9EA6AF] font-mono text-xs uppercase hover:text-white transition-all"
                >
                  Exit Game
                </button>
              </div>
            </div>
          )}

          {/* Results Screen with Smart Recommendation */}
          {gameState === 'result' && resultData && (
            <div className="absolute inset-0 bg-[#0D1014]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
              <span className="font-mono text-xs text-[#D94A5B] uppercase font-bold tracking-widest">
                {lives > 0 ? 'FINISH LINE PASSED' : 'CHECKERED FLAG'}
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                LAP COMPLETED!
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-[#9EA6AF] py-1 border-y border-white/10">
                <span>Score: <b className="text-white">{resultData.score}</b></span>
                <span>·</span>
                <span>SW: <b className="text-[#63c9ff]">{resultData.pickups.SW || 0}</b></span>
                <span>HW: <b className="text-[#ffc36c]">{resultData.pickups.HW || 0}</b></span>
                <span>RB: <b className="text-[#b6a1ff]">{resultData.pickups.RB || 0}</b></span>
                <span>·</span>
                <span>Best: <b className="text-white">{resultData.best}</b></span>
              </div>

              <div className="p-4 rounded-xl border border-white/15 bg-[#171C23] max-w-md w-full text-left flex flex-col space-y-2">
                <span className="font-mono text-[10px] text-[#D94A5B] uppercase tracking-wider font-semibold">
                  RECOMMENDED DISCOVERY
                </span>
                <p className="text-xs text-[#EFF0F2]">
                  You collected the most <b>{resultData.recommendation.name}</b> checkpoints during this lap!
                </p>
                <Link
                  href={resultData.recommendation.url}
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-white font-mono text-xs uppercase font-semibold tracking-wider transition-all mt-1"
                >
                  <span>Explore {resultData.recommendation.name} Guides</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={startRace}
                  className="px-4 py-2 rounded bg-[#1B2026] hover:bg-[#252C35] text-white font-mono text-xs uppercase transition-all"
                >
                  Race Again
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-white/10 text-[#9EA6AF] hover:text-white font-mono text-xs uppercase transition-all"
                >
                  Continue to Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom Mobile Controls Bar ──────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-[#171C23]">
          <span className="text-[11px] font-mono text-[#656D7A]">
            Arrow keys / A-D / Swipe to steer
          </span>
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => steer(-1)}
              className="px-4 py-2 rounded bg-[#202630] active:bg-[#D94A5B] text-white font-bold font-mono text-sm"
              aria-label="Steer left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => steer(1)}
              className="px-4 py-2 rounded bg-[#202630] active:bg-[#D94A5B] text-white font-bold font-mono text-sm"
              aria-label="Steer right"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
