import fs from 'fs'
import path from 'path'
import connectMongo from '@/lib/mongodb'
import Resource from '@/models/Resource'

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
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const filter = {}
      if (category && category !== 'all') {
        filter.category = new RegExp(`^${category}$`, 'i')
      }
      if (search) {
        const qRegex = new RegExp(search, 'i')
        filter.$or = [
          { title: qRegex },
          { description: qRegex },
          { category: qRegex },
          { type: qRegex },
          { author: qRegex },
        ]
      }

      const count = await Resource.countDocuments()
      if (count === 0) {
        const seed = readRawResources()
        if (seed.length > 0) {
          await Resource.insertMany(seed)
        }
      }

      const docs = await Resource.find(filter).sort({ order: 1, createdAt: -1 }).lean()
      if (docs && docs.length > 0) {
        return docs.map(d => ({ ...d, id: d.id || d._id.toString() }))
      }
    } catch (e) {
      console.warn('MongoDB getAllResources failed, falling back to local store:', e.message)
    }
  }

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
      r.type?.toLowerCase().includes(q) ||
      r.author?.toLowerCase().includes(q)
    )
  }
  return list
}

export async function saveResource(data) {
  const now = new Date().toISOString().split('T')[0]
  const id = data.id || `res-${Date.now()}`
  const payload = {
    ...data,
    id,
    updatedAt: now,
  }

  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const updated = await Resource.findOneAndUpdate(
        { $or: [{ id }, { _id: data.id }] },
        { ...payload },
        { new: true, upsert: true }
      ).lean()
      if (updated) return { ok: true, resource: { ...updated, id: updated.id || updated._id.toString() } }
    } catch (e) {
      console.warn('MongoDB saveResource failed, saving to local store:', e.message)
    }
  }

  const list = readRawResources()
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
    id,
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
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      await Resource.findOneAndDelete({ $or: [{ id }, { _id: id }] })
    } catch (e) {
      console.warn('MongoDB deleteResource failed, checking local store:', e.message)
    }
  }

  let list = readRawResources()
  const initialLen = list.length
  list = list.filter(r => r.id !== id)
  if (list.length < initialLen) {
    writeRawResources(list)
    return { ok: true }
  }
  return { ok: false, error: 'Resource not found' }
}
