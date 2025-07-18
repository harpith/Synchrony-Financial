// routes/chat.routes.js

import express from "express";
import { askQuestion } from "../controllers/askQuestionController.js";

const router = express.Router();

router.post("/ask", askQuestion);

export default router;
