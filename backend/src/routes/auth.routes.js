import express from "express";
import { verifyFirebaseToken } from "../middlewares/auth.js";

const router = express.Router();

// Public route – health check
router.get("/", (_, res) => res.json({ status: "auth ok" }));

// Protected route – get current user info
router.get("/me", verifyFirebaseToken, async (req, res) => {
  res.json({ user: req.user });
});

export default router;
