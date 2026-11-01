'use client'

import { useEffect } from 'react'

export default function CursorSmoke() {
  useEffect(() => {
    // Only enable on desktop devices with fine pointers and when user hasn't requested reduced motion
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine) and (hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const layer = document.createElement('div')
    layer.className = 'smoke-layer'
    layer.setAttribute('aria-hidden', 'true')
    document.body.appendChild(layer)

    let lastX = 0
    let lastY = 0
    let lastTime = 0

    const createSmoke = (x: number, y: number, dx: number, dy: number) => {
      // Don't spawn puffs if the cursor is over inputs, textareas, or admin controls
      const target = document.elementFromPoint(x, y)
      if (target && (target.closest('input, textarea, [contenteditable="true"], .admin-no-cursor'))) {
        return
      }

      const puff = document.createElement('div')
      puff.className = 'smoke-puff'

      const speed = Math.hypot(dx, dy) || 1
      const ux = dx / speed
      const uy = dy / speed

      // Cursor hotspot is at the nose (11, 11). Car orientation is angled backwards.
      // Spawn subtle smoke slightly behind cursor movement.
      const offsetBack = 18
      const spread = 5

      const smokeX = x - ux * offsetBack + (Math.random() - 0.5) * spread
      const smokeY = y - uy * offsetBack + (Math.random() - 0.5) * spread

      const size = 6 + Math.random() * 8
      puff.style.left = `${smokeX}px`
      puff.style.top = `${smokeY}px`
      puff.style.width = `${size}px`
      puff.style.height = `${size}px`
      puff.style.opacity = `${(0.24 + Math.random() * 0.18).toFixed(2)}`

      layer.appendChild(puff)
      puff.addEventListener('animationend', () => {
        puff.remove()
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dist = Math.hypot(dx, dy)

      // Only spawn when moving fast enough to simulate tire/exhaust smoke
      if (dist > 3 && now - lastTime > 22) {
        createSmoke(e.clientX, e.clientY, dx, dy)
        lastTime = now
      }

      lastX = e.clientX
      lastY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      layer.remove()
    }
  }, [])

  return null
}
