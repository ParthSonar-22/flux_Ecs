/** Public presentation only. Publication is enforced by the existing event store. */
export function eventPhase(event, now = new Date()) {
  const start = Date.parse(event.starts_at || event.startDate || '')
  const end = Date.parse(event.ends_at || event.endDate || '')
  if (Number.isFinite(end) && now.getTime() > end) return 'past'
  if (Number.isFinite(start) && now.getTime() >= start) return 'ongoing'
  if (Number.isFinite(start)) return 'upcoming'
  return event.status === 'past' ? 'past' : 'upcoming'
}
export function safeLink(value) {
  if (typeof value !== 'string' || !value) return ''
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '' } catch { return '' }
}
export function registrationState(event, now = new Date()) {
  if (eventPhase(event, now) === 'past') return { label: 'Event completed', href: '' }
  const href = safeLink(event.registration_url || event.registerUrl)
  if (!href) return { label: 'Registration details to follow', href: '' }
  const opens = Date.parse(event.registration_open_at || '')
  const closes = Date.parse(event.registration_close_at || '')
  if (Number.isFinite(opens) && now.getTime() < opens) return { label: 'Registration opens soon', href: '' }
  if (Number.isFinite(closes) && now.getTime() > closes) return { label: 'Registration closed', href: '' }
  return { label: Number.isFinite(opens) && Number.isFinite(closes) ? 'Register now' : 'View registration form', href }
}
export function eventDate(event) {
  const start = new Date(event.starts_at || event.startDate || '')
  const end = new Date(event.ends_at || event.endDate || '')
  if (!Number.isFinite(start.getTime())) return event.date || 'Date to be announced'
  const full = new Intl.DateTimeFormat('en-IN', { day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Kolkata' })
  const day = new Intl.DateTimeFormat('en-IN', { day:'numeric', timeZone:'Asia/Kolkata' })
  if (Number.isFinite(end.getTime()) && full.format(start) !== full.format(end)) {
    const month = new Intl.DateTimeFormat('en-IN',{month:'numeric',year:'numeric',timeZone:'Asia/Kolkata'})
    return month.format(start) === month.format(end) ? `${day.format(start)}–${full.format(end)}` : `${full.format(start)} – ${full.format(end)}`
  }
  return full.format(start)
}
export function publicPoster(event) { return event.poster_url || event.poster || '' }
