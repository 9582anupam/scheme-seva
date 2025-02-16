import { signUp, login, logout, refreshAccessToken, getMe } from "../../controllers/user.controller.js";
import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.get("/refresh-access-token", refreshAccessToken);
router.get("/getme", verifyJWT, getMe);


export default router;