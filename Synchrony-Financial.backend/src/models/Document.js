import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  source: String, // e.g., "PDF", "Slack Export", etc.
  tags: [String],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contentChunks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContentChunk',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Document = mongoose.model('Document', documentSchema);
