// routes/document.routes.js

import express from "express";
import multer from "multer";
import { uploadDocument } from "../controllers/uploadDocumentController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadDocument);

export default router;
