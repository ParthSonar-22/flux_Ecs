import crypto from 'crypto'

export const SUPER_ADMIN_EMAIL = 'buildwithaarya@gmail.com'
const SESSION_STRING = 'flux-ecs-council-admin-authorized'

const ROLE_HIERARCHY = {
  super_admin: ['super_admin', 'admin', 'editor', 'media_editor'],
  admin: ['admin', 'editor', 'media_editor'],
  editor: ['editor'],
  media_editor: ['media_editor'],
}

/**
 * Generates a signed, role-aware admin token.
 */
export function generateAdminToken(options = {}) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) throw new Error('ADMIN_SECRET is required')

  const payload = {
    email: options.email || SUPER_ADMIN_EMAIL,
    role: options.role || 'super_admin',
    name: options.name || 'FluxECS Administrator',
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url')
  return `${payloadB64}.${signature}`
}

/**
 * Generates legacy static HMAC token for backward compatibility.
 */
export function generateLegacyToken() {
  const secret = process.env.ADMIN_SECRET
  if (!secret) throw new Error('ADMIN_SECRET is required')
  return crypto.createHmac('sha256', secret).update(SESSION_STRING).digest('hex')
}

/**
 * Inspects and validates token returning session details.
 */
export function getAdminSession(token) {
  if (!token) return { valid: false, reason: 'No token provided' }
  const secret = process.env.ADMIN_SECRET
  if (!secret) return { valid: false, reason: 'ADMIN_SECRET is required' }

  // 1. Check legacy token format
  try {
    const legacyExpected = generateLegacyToken()
    if (token.length === legacyExpected.length && crypto.timingSafeEqual(Buffer.from(token), Buffer.from(legacyExpected))) {
      return {
        valid: true,
        email: SUPER_ADMIN_EMAIL,
        role: 'super_admin',
        name: 'Aarya (Super Admin)',
      }
    }
  } catch {
    // continue to signed token validation
  }

  // 2. Check signed role payload token
  const parts = token.split('.')
  if (parts.length !== 2) return { valid: false, reason: 'Invalid token format' }

  const [payloadB64, signature] = parts
  const expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url')

  try {
    const sigValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
    if (!sigValid) return { valid: false, reason: 'Invalid signature' }
  } catch {
    return { valid: false, reason: 'Signature mismatch' }
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false, reason: 'Token expired' }
    }
    return {
      valid: true,
      email: payload.email,
      role: payload.role || 'admin',
      name: payload.name || payload.email,
    }
  } catch (err) {
    return { valid: false, reason: err.message }
  }
}

/**
 * Verifies admin token and checks role requirement.
 */
export function verifyAdminToken(token, requiredRole = null) {
  if (!process.env.ADMIN_SECRET || !process.env.ADMIN_PASSWORD) return false
  const session = getAdminSession(token)
  if (!session.valid) return false

  if (!requiredRole) return true

  const permittedRoles = ROLE_HIERARCHY[session.role] || []
  return permittedRoles.includes(requiredRole)
}
