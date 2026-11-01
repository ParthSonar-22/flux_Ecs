import fs from 'fs'
import path from 'path'

const STORE_PATH = path.join(process.cwd(), 'data', 'admins-store.json')
export const SUPER_ADMIN_EMAIL = 'buildwithaarya@gmail.com'

function readStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, 'utf8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.error('Failed to read admins-store:', err)
  }
  return [
    {
      id: 'super-admin-01',
      email: SUPER_ADMIN_EMAIL,
      name: 'Aarya (Super Admin)',
      role: 'super_admin',
      status: 'active',
      addedAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    },
  ]
}

function writeStore(admins) {
  try {
    const dir = path.dirname(STORE_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(STORE_PATH, JSON.stringify(admins, null, 2), 'utf8')
    return true
  } catch (err) {
    console.error('Failed to write admins-store:', err)
    return false
  }
}

export async function getAllAdmins() {
  return readStore()
}

export async function addAdmin({ email, name, role = 'admin' }) {
  if (!email || !email.includes('@')) {
    throw new Error('Valid email address is required')
  }
  const cleanEmail = email.trim().toLowerCase()
  const admins = readStore()
  const existing = admins.find(a => a.email.toLowerCase() === cleanEmail)
  if (existing) {
    throw new Error(`Admin with email ${cleanEmail} already exists`)
  }

  const newAdmin = {
    id: `admin-${Date.now()}`,
    email: cleanEmail,
    name: name?.trim() || cleanEmail.split('@')[0],
    role: role === 'super_admin' ? 'super_admin' : 'admin',
    status: 'active',
    addedAt: new Date().toISOString(),
    lastLogin: null,
  }

  admins.push(newAdmin)
  writeStore(admins)
  return newAdmin
}

export async function removeAdmin(email) {
  const cleanEmail = email?.trim().toLowerCase()
  if (cleanEmail === SUPER_ADMIN_EMAIL.toLowerCase()) {
    throw new Error('Super Admin root account cannot be removed')
  }
  let admins = readStore()
  const beforeCount = admins.length
  admins = admins.filter(a => a.email.toLowerCase() !== cleanEmail)
  if (admins.length === beforeCount) {
    throw new Error('Admin not found')
  }
  writeStore(admins)
  return true
}

export function isSuperAdmin(email) {
  if (!email) return false
  return email.trim().toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()
}
