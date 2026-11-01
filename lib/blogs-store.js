import fs from 'fs'
import path from 'path'
import connectMongo from '@/lib/mongodb'
import Blog from '@/models/Blog'

const BLOGS_PATH = path.join(process.cwd(), 'data', 'blogs-store.json')

function readRawBlogs() {
  try {
    if (fs.existsSync(BLOGS_PATH)) {
      const data = fs.readFileSync(BLOGS_PATH, 'utf8')
      return JSON.parse(data)
    }
  } catch (err) {
    console.error('Failed to read blogs-store.json:', err)
  }
  return []
}

function writeRawBlogs(blogs) {
  try {
    const dir = path.dirname(BLOGS_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(BLOGS_PATH, JSON.stringify(blogs, null, 2), 'utf8')
    return true
  } catch (err) {
    console.error('Failed to write blogs-store.json:', err)
    return false
  }
}

export async function getAllBlogs({ includeDrafts = false, category = 'all', search = '', tag = '' } = {}) {
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const filter = {}
      if (!includeDrafts) {
        filter.status = 'published'
      }
      if (category && category !== 'all') {
        filter.category = new RegExp(`^${category}$`, 'i')
      }
      if (tag) {
        filter.tags = { $in: [new RegExp(`^${tag}$`, 'i')] }
      }
      if (search) {
        const qRegex = new RegExp(search, 'i')
        filter.$or = [
          { title: qRegex },
          { summary: qRegex },
          { category: qRegex },
          { tags: { $in: [qRegex] } },
        ]
      }

      const count = await Blog.countDocuments()
      if (count === 0) {
        const seed = readRawBlogs()
        if (seed.length > 0) {
          await Blog.insertMany(seed)
        }
      }

      const docs = await Blog.find(filter).sort({ publishedAt: -1 }).lean()
      if (docs && docs.length > 0) {
        return docs.map(d => ({ ...d, id: d.id || d._id.toString() }))
      }
    } catch (e) {
      console.warn('MongoDB getAllBlogs failed, falling back to local store:', e.message)
    }
  }

  let list = readRawBlogs()
  if (!includeDrafts) {
    list = list.filter(b => b.status === 'published')
  }
  if (category && category !== 'all') {
    list = list.filter(b => b.category?.toLowerCase() === category.toLowerCase())
  }
  if (tag) {
    list = list.filter(b => b.tags?.some(t => t.toLowerCase() === tag.toLowerCase()))
  }
  if (search) {
    const q = search.toLowerCase()
    list = list.filter(b =>
      b.title?.toLowerCase().includes(q) ||
      b.summary?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q) ||
      b.tags?.some(t => t.toLowerCase().includes(q))
    )
  }
  list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return list
}

export async function getBlogBySlug(slug, { includeDrafts = false } = {}) {
  if (!slug) return null

  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const filter = includeDrafts ? { slug } : { slug, status: 'published' }
      const doc = await Blog.findOne(filter).lean()
      if (doc) return { ...doc, id: doc.id || doc._id.toString() }
    } catch (e) {
      console.warn('MongoDB getBlogBySlug failed, falling back to local store:', e.message)
    }
  }

  const list = readRawBlogs()
  const found = list.find(b => b.slug === slug)
  if (!found) return null
  if (!includeDrafts && found.status !== 'published') return null
  return found
}

export async function saveBlog(blogData) {
  const now = new Date().toISOString()
  const slug = (blogData.slug || blogData.title || 'untitled-guide')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const payload = {
    ...blogData,
    slug: slug || `guide-${Date.now()}`,
    updatedAt: now,
  }

  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      if (blogData.id) {
        const updated = await Blog.findOneAndUpdate(
          { $or: [{ id: blogData.id }, { slug: blogData.slug }] },
          { ...payload, updatedAt: new Date() },
          { new: true, upsert: true }
        ).lean()
        if (updated) return { ok: true, blog: { ...updated, id: updated.id || updated._id.toString() } }
      } else {
        const created = await Blog.create({
          ...payload,
          id: `blog-${Date.now()}`,
          publishedAt: blogData.publishedAt || now,
          createdAt: now,
        })
        return { ok: true, blog: created.toObject() }
      }
    } catch (e) {
      console.warn('MongoDB saveBlog failed, saving to local store:', e.message)
    }
  }

  const list = readRawBlogs()
  if (blogData.id) {
    const idx = list.findIndex(b => b.id === blogData.id)
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        ...blogData,
        updatedAt: now,
      }
      writeRawBlogs(list)
      return { ok: true, blog: list[idx] }
    }
  }

  const newBlog = {
    id: blogData.id || `blog-${Date.now()}`,
    slug: slug || `guide-${Date.now()}`,
    title: blogData.title || 'Untitled Engineering Guide',
    summary: blogData.summary || '',
    category: blogData.category || 'Embedded',
    tags: Array.isArray(blogData.tags) ? blogData.tags : ['Engineering'],
    author: blogData.author || { name: 'FluxECS Editorial', role: 'Technical Council' },
    publishedAt: blogData.publishedAt || now,
    readTime: blogData.readTime || '5 min read',
    coverImage: blogData.coverImage || '/photos/iota-electrical-lab-discussion.png',
    isFeatured: Boolean(blogData.isFeatured),
    status: blogData.status || 'published',
    content: blogData.content || '',
    attachments: blogData.attachments || [],
    createdAt: now,
    updatedAt: now,
  }

  list.unshift(newBlog)
  writeRawBlogs(list)
  return { ok: true, blog: newBlog }
}

export async function deleteBlog(idOrSlug) {
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      await Blog.findOneAndDelete({ $or: [{ id: idOrSlug }, { slug: idOrSlug }] })
    } catch (e) {
      console.warn('MongoDB deleteBlog failed, checking local store:', e.message)
    }
  }

  let list = readRawBlogs()
  const initialLen = list.length
  list = list.filter(b => b.id !== idOrSlug && b.slug !== idOrSlug)
  if (list.length < initialLen) {
    writeRawBlogs(list)
    return { ok: true }
  }
  return { ok: false, error: 'Blog not found' }
}
