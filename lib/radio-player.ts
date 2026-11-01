'use client'

import { radioTrack } from '@/data/radio'

type StateListener = (playing: boolean) => void

let globalAudio: HTMLAudioElement | null = null
const listeners = new Set<StateListener>()

function notify(playing: boolean) {
  listeners.forEach(fn => {
    try {
      fn(playing)
    } catch {
      /* ignore listener error */
    }
  })
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('flux:radio-change', { detail: { isPlaying: playing } })
    )
  }
}

export function getRadioAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!globalAudio) {
    globalAudio = new Audio(radioTrack.src)
    globalAudio.preload = 'auto'
    globalAudio.loop = true
    globalAudio.volume = 0.85
    globalAudio.addEventListener('play', () => notify(true))
    globalAudio.addEventListener('pause', () => notify(false))
    globalAudio.addEventListener('ended', () => {
      if (!globalAudio?.loop) notify(false)
    })
  } else {
    // If the configured src differs from active audio src, refresh it
    if (radioTrack.src && !globalAudio.src.includes(radioTrack.src)) {
      const wasPlaying = !globalAudio.paused
      globalAudio.src = radioTrack.src
      globalAudio.loop = true
      globalAudio.load()
      if (wasPlaying) {
        globalAudio.play().catch(() => {})
      }
    }
  }
  return globalAudio
}

export function subscribeRadio(fn: StateListener): () => void {
  listeners.add(fn)
  if (globalAudio) {
    fn(!globalAudio.paused)
  }
  return () => {
    listeners.delete(fn)
  }
}

export async function playRadio(): Promise<boolean> {
  const audio = getRadioAudio()
  if (!audio) return false
  try {
    audio.muted = false
    audio.loop = true
    if (audio.volume < 0.2) {
      audio.volume = 0.85
    }
    if (audio.ended || isNaN(audio.currentTime) || (audio.duration && audio.currentTime >= audio.duration - 0.2)) {
      audio.currentTime = 0
    }
    const promise = audio.play()
    if (promise !== undefined) {
      await promise
    }
    notify(true)
    return true
  } catch (err) {
    console.warn('Radio playback error:', err)
    return false
  }
}

export function pauseRadio(): void {
  const audio = getRadioAudio()
  if (audio) {
    audio.pause()
    notify(false)
  }
}

export async function toggleRadio(): Promise<boolean> {
  const audio = getRadioAudio()
  if (!audio) return false
  if (audio.paused) {
    return playRadio()
  } else {
    pauseRadio()
    return false
  }
}

export function isRadioPlaying(): boolean {
  return globalAudio ? !globalAudio.paused : false
}
