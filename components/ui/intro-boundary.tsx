'use client'
import { Component, type ReactNode } from 'react'
/** A failed optional visual must never take down the actual homepage. */
export default class IntroBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <div className="intro-safe-fallback" role="status">
        FLUX
        <br />
        <span className="mono">Continue with Skip intro.</span>
      </div>
    ) : (
      this.props.children
    )
  }
}
