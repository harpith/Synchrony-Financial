// utils/generateEmbeddings.js

import OpenAI from "openai";
import { chunkText } from "./chunkText.js";
import { prisma } from "../prisma/index.js"; // Assuming Prisma setup is done

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateEmbeddings = async (text, docId) => {
  const chunks = chunkText(text); // breaks into ~200-300 word chunks

  for (const chunk of chunks) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: chunk,
    });

    const embedding = embeddingResponse.data[0].embedding;

    await prisma.embedding.create({
      data: {
        documentId: docId,
        content: chunk,
        embedding,
      },
    });
  }
};

export { generateEmbeddings };
