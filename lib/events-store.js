// lib/events-store.js
import fs from 'fs'
import path from 'path'
import connectMongo from '@/lib/mongodb'
import Event from '@/models/Event'
import { events as seedEvents, isPast } from '@/data/events'

const LOCAL_STORE_FILE = path.join(process.cwd(), 'data', 'events-store.json')

// Builds initial verified seed data from repository assets
function buildDefaultEvents() {
  return seedEvents.map((e, index) => {
    const past = isPast(e)
    const isAlgo = e.slug === 'algorithms-auction'
    const isIota = e.slug === 'iota-archives'

    return {
      id: e.id || e.slug,
      slug: e.slug || e.id,
      title: e.title,
      summary: e.posterLine || e.shortLine || '',
      description: e.intro || e.shortLine || '',
      poster_url: e.poster || '',
      starts_at: e.startDate ? new Date(e.startDate).toISOString() : '',
      ends_at: e.endDate ? new Date(e.endDate).toISOString() : '',
      date: isAlgo ? '02 - 03 November 2026' : (isIota ? '07 September 2026' : '22 August 2026'),
      time: (e.time || '').replace(/[—–]/g, '-'),
      venue: e.venue || 'VESIT, Mumbai',
      registration_url: e.registerUrl || '',
      registration_open_at: isAlgo ? '2026-10-15T00:00:00Z' : null,
      registration_close_at: isAlgo ? '2026-11-01T23:59:59Z' : null,
      status: past ? 'past' : 'upcoming',
      is_published: true,
      is_featured: isAlgo,
      category: isAlgo ? 'Competitive Coding' : 'Hardware Exhibition',
      timeline_image: e.timelineImage || '',
      syllabus: e.syllabus || [],
      bidding_rules: e.biddingRules || [],
      faqs: e.faqs || [],
      labs: e.labs || [],
      gallery: e.gallery || [],
      contacts: e.contacts || [],
      created_at: new Date('2026-09-01T00:00:00Z').toISOString(),
      updated_at: new Date('2026-10-25T00:00:00Z').toISOString(),
      order: index,
    }
  })
}

// Reads local JSON store with auto-initialization
function readLocalStore() {
  try {
    if (!fs.existsSync(LOCAL_STORE_FILE)) {
      const initialData = buildDefaultEvents()
      fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(initialData, null, 2), 'utf-8')
      return initialData
    }
    const raw = fs.readFileSync(LOCAL_STORE_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read local events store, falling back to seed:', err)
    return buildDefaultEvents()
  }
}

// Writes to local JSON store safely
function writeLocalStore(events) {
  try {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(events, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write local events store:', err)
  }
}

// -----------------------------------------------------------------------------
// PUBLIC METHODS
// -----------------------------------------------------------------------------

export async function getAllEvents({ includeDrafts = false } = {}) {
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const filter = includeDrafts ? {} : { is_published: true }
      const docs = await Event.find(filter).sort({ order: 1, created_at: -1 }).lean()
      if (docs && docs.length > 0) return docs
    } catch (e) {
      console.warn('MongoDB query failed, falling back to local store:', e.message)
    }
  }

  const local = readLocalStore()
  if (includeDrafts) return local
  return local.filter((e) => e.is_published)
}

export async function getEventBySlug(slug, { includeDrafts = false } = {}) {
  if (!slug) return null

  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const filter = includeDrafts ? { slug } : { slug, is_published: true }
      const doc = await Event.findOne(filter).lean()
      if (doc) return doc
    } catch (e) {
      console.warn('MongoDB query by slug failed, checking local store:', e.message)
    }
  }

  const local = readLocalStore()
  const found = local.find((e) => e.slug === slug)
  if (!found) return null
  if (!includeDrafts && !found.is_published) return null
  return found
}

export async function createEvent(data) {
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') ||
    `evt-${Date.now()}`

  const newEvent = {
    id: `evt-${Date.now()}`,
    slug,
    title: data.title,
    summary: data.summary || '',
    description: data.description,
    poster_url: data.poster_url || data.poster || '',
    date: data.date,
    time: data.time || '',
    venue: data.venue || 'VESIT, Mumbai',
    registration_url: data.registration_url || data.registerUrl || '',
    status: data.status || 'upcoming',
    is_published: data.is_published !== undefined ? Boolean(data.is_published) : true,
    is_featured: Boolean(data.is_featured),
    category: data.category || 'General',
    rules: Array.isArray(data.rules) ? data.rules : (data.rules ? data.rules.split('\n').filter(Boolean) : []),
    eligibility: data.eligibility || '',
    syllabus: data.syllabus || '',
    timeline_image: data.timeline_image || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    order: 0,
  }

  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const created = await Event.create(newEvent)
      return created.toObject()
    } catch (e) {
      console.warn('MongoDB create failed, saving to local store:', e.message)
    }
  }

  const list = readLocalStore()
  list.unshift(newEvent)
  writeLocalStore(list)
  return newEvent
}

export async function updateEvent(slugOrId, updates) {
  const data = { ...updates }
  if (typeof data.rules === 'string') {
    data.rules = data.rules
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean)
  }

  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const updated = await Event.findOneAndUpdate(
        { $or: [{ slug: slugOrId }, { _id: slugOrId }] },
        { ...data, updated_at: new Date() },
        { new: true }
      ).lean()
      if (updated) return updated
    } catch (e) {
      console.warn('MongoDB update failed, falling back to local store:', e.message)
    }
  }

  const list = readLocalStore()
  const index = list.findIndex((e) => e.slug === slugOrId || e.id === slugOrId)
  if (index === -1) return null

  list[index] = {
    ...list[index],
    ...data,
    updated_at: new Date().toISOString(),
  }
  writeLocalStore(list)
  return list[index]
}

export async function deleteEvent(slugOrId) {
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      await Event.findOneAndDelete({ $or: [{ slug: slugOrId }, { _id: slugOrId }] })
    } catch (e) {
      console.warn('MongoDB delete failed, falling back to local store:', e.message)
    }
  }

  const list = readLocalStore()
  const filtered = list.filter((e) => e.slug !== slugOrId && e.id !== slugOrId)
  writeLocalStore(filtered)
  return true
}
