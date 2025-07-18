import mongoose from 'mongoose';

const contentChunkSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
  },
  chunkIndex: Number, // Index of the chunk in the original doc
  text: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number], // Vector from OpenAI or other embedding models
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ContentChunk = mongoose.model('ContentChunk', contentChunkSchema);
