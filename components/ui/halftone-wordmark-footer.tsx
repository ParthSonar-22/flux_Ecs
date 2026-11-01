'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import LogoWordmark from '@/components/LogoWordmark'
import styles from './halftone-wordmark-footer.module.css'

// Adapted from the user-supplied Halftone Wordmark Footer: spring displacement,
// coverage-based dots and a finite click wave. The mask uses our exact official SVG.
export function hwfStep(
  x: number,
  y: number,
  vx: number,
  vy: number,
  hx: number,
  hy: number,
  px: number,
  py: number,
  r: number,
) {
  const dx = x - px,
    dy = y - py,
    d2 = dx * dx + dy * dy
  if (r > 0 && d2 < r * r) {
    const d = Math.sqrt(d2) + 0.001,
      f = (1 - d / r) * 2.6
    vx += (dx / d) * f
    vy += (dy / d) * f
  }
  vx = (vx + (hx - x) * 0.05) * 0.84
  vy = (vy + (hy - y) * 0.05) * 0.84
  return [x + vx, y + vy, vx, vy]
}
export default function HalftoneWordmarkFooter({
  children,
}: {
  children: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const host = root.current,
      c = canvas.current,
      ctx = c?.getContext('2d')
    if (!host || !c || !ctx) return
    let live = true,
      visible = false,
      raf = 0,
      w = 0,
      h = 0,
      dpr = 1,
      px = -1e5,
      py = -1e5
    let dots: number[][] = []
    let ring = { x: 0, y: 0, time: -1e5 }
    const preference = matchMedia('(prefers-reduced-motion:reduce)')
    let reduced = preference.matches
    const image = new Image()
    const tokens = getComputedStyle(host)
    const ink = tokens.getPropertyValue('--ice-white').trim()
    const accent = tokens.getPropertyValue('--crimson').trim()
    const rgb = (hex: string) =>
      [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
    const white = rgb(ink),
      warm = rgb(accent)
    const draw = (now: number) => {
      raf = 0
      if (!live || !visible) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      let moving = false
      const age = now - ring.time
      for (const dot of dots) {
        let [x, y, vx, vy, hx, hy, r] = dot
        if (!reduced) {
          if (age < 750) {
            const dx = hx - ring.x,
              dy = hy - ring.y,
              d = Math.hypot(dx, dy) + 0.001,
              force =
                Math.max(0, 1 - Math.abs(d - age * 0.7) / 24) *
                2.5 *
                (1 - age / 750)
            vx += (dx / d) * force
            vy += (dy / d) * force
          }
          ;[x, y, vx, vy] = hwfStep(x, y, vx, vy, hx, hy, px, py, 75)
          if (
            Math.abs(vx) + Math.abs(vy) > 0.025 ||
            Math.abs(x - hx) + Math.abs(y - hy) > 0.08
          )
            moving = true
          else {
            x = hx
            y = hy
            vx = 0
            vy = 0
          }
          dot[0] = x
          dot[1] = y
          dot[2] = vx
          dot[3] = vy
        }
        const warmth = Math.min(1, Math.hypot(x - hx, y - hy) / 28)
        ctx.fillStyle =
          warmth > 0.02
            ? `rgb(${white.map((v, i) => Math.round(v + (warm[i] - v) * warmth)).join(',')})`
            : ink
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced && (moving || age < 750)) raf = requestAnimationFrame(draw)
    }
    const wake = () => {
      if (!raf && live && visible) raf = requestAnimationFrame(draw)
    }
    const layout = () => {
      if (!live || !image.naturalWidth) return
      const bounds = host.getBoundingClientRect()
      w = Math.round(bounds.width)
      h = Math.round(bounds.height)
      if (!w || !h) return
      dpr = Math.min(devicePixelRatio || 1, 1.5)
      c.width = w * dpr
      c.height = h * dpr
      const mask = document.createElement('canvas')
      mask.width = w
      mask.height = h
      const m = mask.getContext('2d', { willReadFrequently: true })
      if (!m) return
      const width = w * 0.98,
        height = (width * 138) / 835
      m.drawImage(image, w * 0.01, h - height, width, height)
      const pixels = m.getImageData(0, 0, w, h).data,
        gap = w < 700 ? 4.5 : 6
      dots = []
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap) {
          let alpha = 0
          for (let sy = -1; sy <= 1; sy++)
            for (let sx = -1; sx <= 1; sx++) {
              const ix = Math.max(
                  0,
                  Math.min(w - 1, Math.round(x + (sx * gap) / 3)),
                ),
                iy = Math.max(
                  0,
                  Math.min(h - 1, Math.round(y + (sy * gap) / 3)),
                )
              alpha += pixels[(iy * w + ix) * 4 + 3]
            }
          const coverage = alpha / (9 * 255)
          if (coverage > 0.06)
            dots.push([x, y, 0, 0, x, y, Math.sqrt(coverage) * gap * 0.5])
        }
      host.dataset.ready = 'true'
      wake()
    }
    const move = (e: PointerEvent) => {
      if (reduced || e.pointerType === 'touch') return
      const b = host.getBoundingClientRect()
      px = e.clientX - b.left
      py = e.clientY - b.top
      wake()
    }
    const leave = () => {
      px = py = -1e5
      wake()
    }
    const click = (e: PointerEvent) => {
      if (reduced) return
      const b = host.getBoundingClientRect()
      ring = {
        x: e.clientX - b.left,
        y: e.clientY - b.top,
        time: performance.now(),
      }
      wake()
    }
    const change = () => {
      reduced = preference.matches
      leave()
      layout()
    }
    image.onload = layout
    image.src = '/media/flux-wordmark.svg'
    const ro = new ResizeObserver(layout)
    ro.observe(host)
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      if (visible) wake()
      else {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(host)
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    host.addEventListener('pointerdown', click)
    preference.addEventListener('change', change)
    return () => {
      live = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      image.onload = null
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      host.removeEventListener('pointerdown', click)
      preference.removeEventListener('change', change)
    }
  }, [])
  return (
    <footer id="footer" className={styles.footer}>
      {children}
      <div ref={root} className={styles.art} aria-hidden="true">
        <LogoWordmark className={styles.fallback} />
        <canvas ref={canvas} />
      </div>
    </footer>
  )
}
