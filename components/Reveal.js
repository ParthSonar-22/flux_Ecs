// components/Reveal.js
// Plain pass-through wrapper — renders children without animation for now so animation can be added later in one place.

export default function Reveal({ children, className = '' }) {
  return <div className={className}>{children}</div>
}
