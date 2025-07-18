// controllers/uploadDocumentController.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteLocalFile } from "../utils/deleteImage.js";
import { extractTextFromFile } from "../utils/extractTextFromFile.js";
import { generateEmbeddings } from "../utils/generateEmbeddings.js";

const uploadDocument = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  const supportedTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  if (!supportedTypes.includes(file.mimetype)) {
    await deleteLocalFile(file.path);
    throw new ApiError(400, "Unsupported file type");
  }

  const cloudinaryResult = await uploadOnCloudinary(file.path);
  if (!cloudinaryResult || !cloudinaryResult.secure_url) {
    await deleteLocalFile(file.path);
    throw new ApiError(500, "Cloudinary upload failed");
  }

  const documentText = await extractTextFromFile(file.path, file.mimetype);
  await generateEmbeddings(documentText, cloudinaryResult.public_id);

  await deleteLocalFile(file.path);

  return res.status(201).json(
    new ApiResponse(201, cloudinaryResult, "Document uploaded and processed")
  );
});

export { uploadDocument };
