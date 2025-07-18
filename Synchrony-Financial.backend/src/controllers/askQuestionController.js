import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { getEmbeddingForQuery, getRelevantChunks } from "../utils/embed.js";
import { askGPT } from "../utils/askGPT.js";
import { Query } from "../models/Query.model.js";

const askQuestionController = asyncHandler(async (req, res) => {
  const { userId, question } = req.body;

  if (!question || !userId) {
    throw new ApiError(400, "Question and userId are required");
  }

  const queryEmbedding = await getEmbeddingForQuery(question);
  const relevantChunks = await getRelevantChunks(queryEmbedding);
  const gptResponse = await askGPT(question, relevantChunks);

  const savedQuery = await Query.create({
    userId,
    question,
    response: gptResponse,
    matchedChunks: relevantChunks.map((chunk) => chunk._id),
  });

  res.status(200).json(new ApiResponse(200, savedQuery, "Response generated"));
});

export {
    askQuestionController
}
