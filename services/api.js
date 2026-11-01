// services/api.js
// Single Unified API Service Layer for FLUX-ECS
// All dynamic content (events, posts, council members, gallery photos) is routed through here.
// Configured with NEXT_PUBLIC_API_BASE_URL.

import authService from './auth'
import { events as defaultEvents } from '@/data/events'
import { posts as defaultPosts } from '@/data/posts'
import { seniorCouncil, juniorCouncil, faculty } from '@/data/team'
import { galleryItems as defaultGallery } from '@/data/gallery'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

/**
 * Standard HTTP requester with bearer token injection and error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = authService.getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    })

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}))
      const error = new Error(errorBody.message || `Request failed with status ${res.status}`)
      error.status = res.status
      error.data = errorBody
      throw error
    }

    return await res.json()
  } catch (err) {
    // If external API is unreachable and we have an internal endpoint, try internal Next.js /api
    if (API_BASE_URL && !endpoint.startsWith('/api')) {
      try {
        const fallbackRes = await fetch(`/api${endpoint}`, { ...options, headers })
        if (fallbackRes.ok) return await fallbackRes.json()
      } catch (innerErr) {
        // Continue to throw outer error
      }
    }
    throw err
  }
}

// In-memory / localStorage cache for newly created items during live session
const LOCAL_STORAGE_KEYS = {
  EVENTS: 'flux_dyn_events',
  POSTS: 'flux_dyn_posts',
  MEMBERS: 'flux_dyn_members',
  GALLERY: 'flux_dyn_gallery',
}

function getStored(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch (e) {
    return fallback
  }
}

function setStored(key, val) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {}
}

/**
 * -------------------------------------------------------------
 * EVENTS API SERVICE
 * -------------------------------------------------------------
 */
export const eventsApi = {
  async getAll() {
    try {
      const data = await request('/api/events')
      return Array.isArray(data) ? data : data.data || []
    } catch (err) {
      console.warn('Backend events API unavailable, using resilient fallback:', err.message)
      const stored = getStored(LOCAL_STORAGE_KEYS.EVENTS, defaultEvents)
      return stored
    }
  },

  async getById(id) {
    try {
      const data = await request(`/api/events/${id}`)
      return data.data || data
    } catch (err) {
      const all = await this.getAll()
      return all.find((e) => e.id === id || e.slug === id) || null
    }
  },

  async create(eventData) {
    try {
      const res = await request('/api/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
      })
      return res.data || res
    } catch (err) {
      // Offline/mock fallback persistence
      const all = getStored(LOCAL_STORAGE_KEYS.EVENTS, [...defaultEvents])
      const newEvent = {
        ...eventData,
        id: eventData.id || `evt-${Date.now()}`,
        slug: eventData.slug || `event-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      setStored(LOCAL_STORAGE_KEYS.EVENTS, [newEvent, ...all])
      return newEvent
    }
  },

  async update(id, eventData) {
    try {
      const res = await request(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(eventData),
      })
      return res.data || res
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.EVENTS, [...defaultEvents])
      const updated = all.map((item) =>
        item.id === id || item.slug === id ? { ...item, ...eventData } : item
      )
      setStored(LOCAL_STORAGE_KEYS.EVENTS, updated)
      return { id, ...eventData }
    }
  },

  async delete(id) {
    try {
      await request(`/api/events/${id}`, { method: 'DELETE' })
      return { success: true }
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.EVENTS, [...defaultEvents])
      const filtered = all.filter((item) => item.id !== id && item.slug !== id)
      setStored(LOCAL_STORAGE_KEYS.EVENTS, filtered)
      return { success: true }
    }
  },
}

/**
 * -------------------------------------------------------------
 * POSTS / NEWS / ANNOUNCEMENTS API SERVICE
 * -------------------------------------------------------------
 */
export const postsApi = {
  async getAll() {
    try {
      const data = await request('/api/posts')
      return Array.isArray(data) ? data : data.data || []
    } catch (err) {
      console.warn('Backend posts API unavailable, using resilient fallback:', err.message)
      return getStored(LOCAL_STORAGE_KEYS.POSTS, defaultPosts)
    }
  },

  async getById(id) {
    try {
      const data = await request(`/api/posts/${id}`)
      return data.data || data
    } catch (err) {
      const all = await this.getAll()
      return all.find((p) => p.id === id || p.slug === id) || null
    }
  },

  async create(postData) {
    try {
      const res = await request('/api/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      })
      return res.data || res
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.POSTS, [...defaultPosts])
      const newPost = {
        ...postData,
        id: postData.id || `post-${Date.now()}`,
        slug: postData.slug || `post-${Date.now()}`,
        date: postData.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      }
      setStored(LOCAL_STORAGE_KEYS.POSTS, [newPost, ...all])
      return newPost
    }
  },

  async update(id, postData) {
    try {
      const res = await request(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
      })
      return res.data || res
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.POSTS, [...defaultPosts])
      const updated = all.map((p) =>
        p.id === id || p.slug === id ? { ...p, ...postData } : p
      )
      setStored(LOCAL_STORAGE_KEYS.POSTS, updated)
      return { id, ...postData }
    }
  },

  async delete(id) {
    try {
      await request(`/api/posts/${id}`, { method: 'DELETE' })
      return { success: true }
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.POSTS, [...defaultPosts])
      const filtered = all.filter((p) => p.id !== id && p.slug !== id)
      setStored(LOCAL_STORAGE_KEYS.POSTS, filtered)
      return { success: true }
    }
  },
}

/**
 * -------------------------------------------------------------
 * COUNCIL MEMBERS / TEAM API SERVICE
 * -------------------------------------------------------------
 */
const initialMembers = [
  ...faculty.map((f, i) => ({ ...f, id: `fac-${i}`, tier: 'faculty' })),
  ...seniorCouncil.map((m) => ({ ...m, tier: 'senior' })),
  ...juniorCouncil.map((m) => ({ ...m, tier: 'junior' })),
]

export const membersApi = {
  async getAll() {
    try {
      const data = await request('/api/members')
      return Array.isArray(data) ? data : data.data || []
    } catch (err) {
      console.warn('Backend members API unavailable, using resilient fallback:', err.message)
      return getStored(LOCAL_STORAGE_KEYS.MEMBERS, initialMembers)
    }
  },

  async create(memberData) {
    try {
      const res = await request('/api/members', {
        method: 'POST',
        body: JSON.stringify(memberData),
      })
      return res.data || res
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.MEMBERS, [...initialMembers])
      const newMember = {
        ...memberData,
        id: memberData.id || `member-${Date.now()}`,
      }
      setStored(LOCAL_STORAGE_KEYS.MEMBERS, [...all, newMember])
      return newMember
    }
  },

  async update(id, memberData) {
    try {
      const res = await request(`/api/members/${id}`, {
        method: 'PUT',
        body: JSON.stringify(memberData),
      })
      return res.data || res
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.MEMBERS, [...initialMembers])
      const updated = all.map((m) => (m.id === id ? { ...m, ...memberData } : m))
      setStored(LOCAL_STORAGE_KEYS.MEMBERS, updated)
      return { id, ...memberData }
    }
  },

  async delete(id) {
    try {
      await request(`/api/members/${id}`, { method: 'DELETE' })
      return { success: true }
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.MEMBERS, [...initialMembers])
      const filtered = all.filter((m) => m.id !== id)
      setStored(LOCAL_STORAGE_KEYS.MEMBERS, filtered)
      return { success: true }
    }
  },
}

/**
 * -------------------------------------------------------------
 * GALLERY API SERVICE
 * -------------------------------------------------------------
 */
export const galleryApi = {
  async getAll() {
    try {
      const data = await request('/api/gallery')
      return Array.isArray(data) ? data : data.data || []
    } catch (err) {
      return getStored(LOCAL_STORAGE_KEYS.GALLERY, defaultGallery)
    }
  },

  async create(itemData) {
    try {
      const res = await request('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(itemData),
      })
      return res.data || res
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.GALLERY, [...defaultGallery])
      const newItem = {
        ...itemData,
        id: itemData.id || `gallery-${Date.now()}`,
        date: itemData.date || new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      }
      setStored(LOCAL_STORAGE_KEYS.GALLERY, [newItem, ...all])
      return newItem
    }
  },

  async delete(id) {
    try {
      await request(`/api/gallery/${id}`, { method: 'DELETE' })
      return { success: true }
    } catch (err) {
      const all = getStored(LOCAL_STORAGE_KEYS.GALLERY, [...defaultGallery])
      const filtered = all.filter((item) => item.id !== id)
      setStored(LOCAL_STORAGE_KEYS.GALLERY, filtered)
      return { success: true }
    }
  },
}

/**
 * -------------------------------------------------------------
 * CONTACT / INQUIRIES & NEWSLETTER
 * -------------------------------------------------------------
 */
export const contactApi = {
  async submit(data) {
    return request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}

export const subscribeApi = {
  async subscribe(email) {
    return request('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },
}

/**
 * Unified API Client Export
 */
const api = {
  events: eventsApi,
  posts: postsApi,
  members: membersApi,
  gallery: galleryApi,
  contact: contactApi,
  subscribe: subscribeApi,
}

export default api
