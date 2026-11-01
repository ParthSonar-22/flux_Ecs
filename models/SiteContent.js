import mongoose from 'mongoose'

const SiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    hero: { type: mongoose.Schema.Types.Mixed },
    heroSlides: { type: [mongoose.Schema.Types.Mixed], default: [] },
    featuredEventSection: { type: mongoose.Schema.Types.Mixed },
    councilSection: { type: mongoose.Schema.Types.Mixed },
    labBandSection: { type: mongoose.Schema.Types.Mixed },
    aboutPage: { type: mongoose.Schema.Types.Mixed },
    faculty: { type: [mongoose.Schema.Types.Mixed], default: [] },
    seniorCouncil: { type: [mongoose.Schema.Types.Mixed], default: [] },
    juniorCouncil: { type: [mongoose.Schema.Types.Mixed], default: [] },
    socials: { type: mongoose.Schema.Types.Mixed },
    arcadeConfig: { type: mongoose.Schema.Types.Mixed },
    notionBlocks: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  {
    timestamps: true,
    strict: false,
  }
)

export default mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema)
