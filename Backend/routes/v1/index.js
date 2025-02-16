import express from "express";
import usersRoutes from "./users.routes.js";
import schemesRoutes from "./schemes.routes.js";
import recommendRoutes from "./recommendations.routes.js";
import chatbotRoutes from "./chatbot.routes.js";


const router = express.Router();

// Attach specific routes for version 1
router.use("/users", usersRoutes);
router.use("/schemes", schemesRoutes);
router.use("/recommendations", recommendRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/", (req, res) => {
    res.send("API V1 Running");
})
// router.use("/orders", ordersRoutes);

export default router;
