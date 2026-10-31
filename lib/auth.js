import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'flux-ecs-secret-key-default-change-in-prod'
const SESSION_STRING = 'flux-ecs-council-admin-authorized'

export function generateAdminToken() {
  return crypto.createHmac('sha256', ADMIN_SECRET).update(SESSION_STRING).digest('hex')
}

export function verifyAdminToken(token) {
  if (!token) return false
  const expected = generateAdminToken()
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected))
  } catch {
    return false
  }
}
