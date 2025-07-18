// utils/askGPT.js

import { openai } from "../config/openai.js";

const askGPT = async (question, contextChunks) => {
  const prompt = `
Answer the question based on the context below.
Context: ${contextChunks.join("\n\n")}
Question: ${question}
Answer:
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
};

export { askGPT };
