import express from "express";
import schemesRoutes from "./schemes.routes.js";

const router = express.Router();

router.use("/schemes", schemesRoutes);
router.use("/", (req, res) => {
    res.send("API V2 Running");
});

export default router;
