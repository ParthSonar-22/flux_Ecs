'use client'

import { useEffect, useState, useRef, useSyncExternalStore } from 'react'

function subscribeFinePointer(callback) {
  if (typeof window === 'undefined') return () => {}
  const mql = window.matchMedia('(pointer: fine)')
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshotFinePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: fine)').matches
}

function subscribeTheme(callback) {
  if (typeof window === 'undefined') return () => {}
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

function getSnapshotTheme() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(subscribeFinePointer, getSnapshotFinePointer, () => false)
  const isDark = useSyncExternalStore(subscribeTheme, getSnapshotTheme, () => false)

  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)

      // Direct placement for instantaneous center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Check for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .clickable, .flip-card, [data-cursor-text]'
      )

      if (interactive) {
        setIsHovering(true)
        const customText = interactive.getAttribute('data-cursor-text')
        setCursorText(customText || '')
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    // Smooth trailing animation loop for outer ring
    const render = () => {
      const ease = 0.18
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }
      rafId.current = requestAnimationFrame(render)
    }
    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [enabled])

  if (!enabled) return null

  // Theme-specific colors and sizing
  const dotColor = isDark
    ? isHovering
      ? '#E2593F'
      : '#EFE5D6'
    : isHovering
    ? '#A6301F'
    : '#1B1613'

  const ringBorderColor = isDark
    ? isHovering
      ? '#E2593F'
      : 'rgba(239, 229, 214, 0.45)'
    : isHovering
    ? '#A6301F'
    : 'rgba(27, 22, 19, 0.45)'

  const ringBgColor = isHovering
    ? isDark
      ? 'rgba(226, 89, 63, 0.12)'
      : 'rgba(166, 48, 31, 0.08)'
    : 'transparent'

  const ringGlow = isDark
    ? isHovering
      ? '0 0 16px rgba(226, 89, 63, 0.5)'
      : '0 0 8px rgba(239, 229, 214, 0.15)'
    : isHovering
    ? '0 0 12px rgba(166, 48, 31, 0.3)'
    : 'none'

  const ringSize = isClicking ? 28 : isHovering ? (cursorText ? 64 : 44) : 32
  const dotSize = isClicking ? 10 : isHovering ? 6 : 8

  return (
    <>
      {/* Outer Interpolated Ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `1.5px solid ${ringBorderColor}`,
          backgroundColor: ringBgColor,
          boxShadow: ringGlow,
          opacity: isVisible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {cursorText && (
          <span
            className="text-[9px] uppercase tracking-wider font-bold font-complexity-notation"
            style={{ color: isDark ? '#E2593F' : '#A6301F' }}
          >
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Target Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot pointer-events-none"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          opacity: isVisible ? (cursorText ? 0 : 1) : 0,
          boxShadow: isDark ? '0 0 6px rgba(239, 229, 214, 0.6)' : 'none',
        }}
      />
    </>
  )
}
