import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET
const SESSION_STRING = 'flux-ecs-council-admin-authorized'

export function generateAdminToken() {
  if (!ADMIN_SECRET) throw new Error('ADMIN_SECRET is required')
  return crypto.createHmac('sha256', ADMIN_SECRET).update(SESSION_STRING).digest('hex')
}

export function verifyAdminToken(token) {
  if (!token || !ADMIN_SECRET || !process.env.ADMIN_PASSWORD) return false
  const expected = generateAdminToken()
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected))
  } catch {
    return false
  }
}
