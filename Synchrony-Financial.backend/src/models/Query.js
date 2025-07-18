import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  gptPrompt: {
    type: String, // Optional: Useful if you use RAG or prompt templates
  },
  response: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Can be null for anonymous queries
  },
  matchedChunks: [
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

export default mongoose.model('Query', querySchema);
