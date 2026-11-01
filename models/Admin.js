import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'editor', 'media_editor'],
      default: 'admin',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    passwordHash: { type: String, default: '' },
    addedAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true,
    strict: false,
  }
)

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
