import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: 'Technical',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: String,
      default: '5 min read',
      trim: true,
    },
    author: {
      name: { type: String, default: 'FluxECS Council' },
      role: { type: String, default: 'Technical Team' },
      avatar: { type: String, default: '' },
    },
    attachments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String, default: 'PDF' },
        size: { type: String, default: '' },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
