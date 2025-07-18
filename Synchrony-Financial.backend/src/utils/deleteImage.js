// utils/deleteImage.js

import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

const deleteLocalFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error("Failed to delete local file:", err.message);
  }
};

const deleteCloudinaryImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Failed to delete cloudinary image:", err.message);
  }
};

export { deleteLocalFile, deleteCloudinaryImage };
