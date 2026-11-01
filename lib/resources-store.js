import fs from 'fs'
import path from 'path'

const RESOURCES_PATH = path.join(process.cwd(), 'data', 'resources-store.json')

function readRawResources() {
  try {
    if (fs.existsSync(RESOURCES_PATH)) {
      const data = fs.readFileSync(RESOURCES_PATH, 'utf8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.error('Failed to read resources-store.json:', err)
  }
  return []
}

function writeRawResources(resources) {
  try {
    const dir = path.dirname(RESOURCES_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(RESOURCES_PATH, JSON.stringify(resources, null, 2), 'utf8')
    return true
  } catch (err) {
    console.error('Failed to write resources-store.json:', err)
    return false
  }
}

export async function getAllResources({ category = 'all', search = '' } = {}) {
  let list = readRawResources()
  if (category && category !== 'all') {
    list = list.filter(r => r.category?.toLowerCase() === category.toLowerCase())
  }
  if (search) {
    const q = search.toLowerCase()
    list = list.filter(r =>
      r.title?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.category?.toLowerCase().includes(q) ||
      r.type?.toLowerCase().includes(q)
    )
  }
  return list
}

export async function saveResource(data) {
  const list = readRawResources()
  const now = new Date().toISOString().split('T')[0]

  if (data.id) {
    const idx = list.findIndex(r => r.id === data.id)
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        ...data,
        updatedAt: now,
      }
      writeRawResources(list)
      return { ok: true, resource: list[idx] }
    }
  }

  const newRes = {
    id: data.id || `res-${Date.now()}`,
    title: data.title || 'Untitled Resource',
    description: data.description || '',
    category: data.category || 'General',
    type: data.type || 'PDF',
    url: data.url || '#',
    size: data.size || '1.0 MB',
    author: data.author || 'FluxECS Council',
    updatedAt: now,
  }

  list.unshift(newRes)
  writeRawResources(list)
  return { ok: true, resource: newRes }
}

export async function deleteResource(id) {
  let list = readRawResources()
  const initialLen = list.length
  list = list.filter(r => r.id !== id)
  if (list.length < initialLen) {
    writeRawResources(list)
    return { ok: true }
  }
  return { ok: false, error: 'Resource not found' }
}
