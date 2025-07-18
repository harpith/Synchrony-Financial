// utils/extractTextFromFile.js

import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const extractTextFromFile = async (filePath, mimetype) => {
  try {
    if (mimetype === "application/pdf") {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (
      mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else if (mimetype === "text/plain") {
      return await fs.readFile(filePath, "utf-8");
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    throw new Error("Failed to extract text from file: " + error.message);
  }
};

export { extractTextFromFile };
