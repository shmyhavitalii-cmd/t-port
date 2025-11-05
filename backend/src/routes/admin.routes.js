import express from "express";
import { query } from "../db.js";

const router = express.Router();

// List all drivers
router.get("/drivers", async (_, res) => {
  const result = await query("SELECT * FROM users WHERE role='driver';");
  res.json(result.rows);
});

// Verify driver
router.patch("/driver/:id/verify", async (req, res) => {
  const { id } = req.params;
  await query("UPDATE users SET verified=true WHERE id=$1", [id]);
  await query(
    "INSERT INTO audit_logs (action, target_id, created_at) VALUES ('verify_driver', $1, NOW())",
    [id]
  );
  res.json({ message: "Driver verified" });
});

export default router;
