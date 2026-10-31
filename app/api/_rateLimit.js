// app/api/_rateLimit.js
// Simple in-memory rate limiter: 5 requests per IP per minute.
// Resets automatically — no external dependency needed.

const store = new Map() // ip -> { count, resetAt }

export function rateLimit(ip) {
  const now = Date.now()
  const window = 60_000 // 1 minute

  if (!store.has(ip)) {
    store.set(ip, { count: 1, resetAt: now + window })
    return true
  }

  const entry = store.get(ip)

  if (now > entry.resetAt) {
    // Window expired — reset
    store.set(ip, { count: 1, resetAt: now + window })
    return true
  }

  if (entry.count >= 5) return false

  entry.count += 1
  return true
}
