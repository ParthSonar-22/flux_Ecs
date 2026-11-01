import mongoose from 'mongoose'

const ResourceSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, sparse: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    category: { type: String, default: 'General', trim: true },
    type: { type: String, default: 'PDF', trim: true },
    url: { type: String, required: true, trim: true },
    size: { type: String, default: '1.0 MB', trim: true },
    author: { type: String, default: 'FluxECS Council', trim: true },
    order: { type: Number, default: 0 },
    updatedAt: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
)

export default mongoose.models.Resource || mongoose.model('Resource', ResourceSchema)
