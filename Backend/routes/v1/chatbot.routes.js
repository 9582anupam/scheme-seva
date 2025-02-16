import express from "express";
import { getSchemeResponse } from "../../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/scheme-response", getSchemeResponse);

export default router;
