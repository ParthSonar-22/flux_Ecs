import fs from 'fs'
import path from 'path'

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
  // Sort latest first
  list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return list
}

export async function getBlogBySlug(slug) {
  const list = readRawBlogs()
  return list.find(b => b.slug === slug) || null
}

export async function saveBlog(blogData) {
  const list = readRawBlogs()
  const now = new Date().toISOString()

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

  // Generate new ID and slug if not present
  const slug = (blogData.slug || blogData.title || 'untitled-guide')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

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

export async function deleteBlog(id) {
  let list = readRawBlogs()
  const initialLen = list.length
  list = list.filter(b => b.id !== id && b.slug !== id)
  if (list.length < initialLen) {
    writeRawBlogs(list)
    return { ok: true }
  }
  return { ok: false, error: 'Blog not found' }
}
