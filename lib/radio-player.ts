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
    globalAudio.volume = 0.65
    globalAudio.addEventListener('play', () => notify(true))
    globalAudio.addEventListener('pause', () => notify(false))
    globalAudio.addEventListener('ended', () => notify(false))
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
    await audio.play()
    return true
  } catch (err) {
    console.warn('Radio playback error:', err)
    return false
  }
}

export function pauseRadio(): void {
  const audio = getRadioAudio()
  if (audio && !audio.paused) {
    audio.pause()
  }
}

export async function toggleRadio(): Promise<boolean> {
  const audio = getRadioAudio()
  if (!audio) return false
  if (audio.paused) {
    return playRadio()
  }
  pauseRadio()
  return false
}

export function isRadioPlaying(): boolean {
  return globalAudio ? !globalAudio.paused : false
}
