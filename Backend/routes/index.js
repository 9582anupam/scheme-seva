import express from "express";
import v1ApiRoutes from "./v1/index.js"; // Import API version 1 routes

const router = express.Router();

// Attach versioned API routes
router.use("/v1", v1ApiRoutes); // Mount version 1 routes here

export default router;
