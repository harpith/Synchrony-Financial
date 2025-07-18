// utils/embed.js

import { openai } from "../config/openai.js";
import { embeddingStore } from "../lib/embeddingStore.js";
import { cosineSimilarity } from "./cosineSimilarity.js";

const getEmbeddingForQuery = async (query) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
  });
  return response.data[0].embedding;
};

const getRelevantChunks = async (queryEmbedding, topK = 5) => {
  const scoredChunks = embeddingStore.map((item) => ({
    ...item,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  scoredChunks.sort((a, b) => b.score - a.score);

  return scoredChunks.slice(0, topK).map((item) => item.chunk);
};

export { getEmbeddingForQuery, getRelevantChunks };
