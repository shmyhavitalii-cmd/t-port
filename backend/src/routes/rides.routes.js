import express from "express";
import { query } from "../db.js";
import { verifyFirebaseToken } from "../middlewares/auth.js";

const router = express.Router();

router.use(verifyFirebaseToken);

// Get ride quote (simple flat estimate)
router.post("/quote", async (req, res) => {
  const { pickup, dropoff } = req.body;
  const estimate = 10 + Math.random() * 20;
  res.json({ estimate: estimate.toFixed(2) });
});

// Create ride
router.post("/", async (req, res) => {
  const { pickup, dropoff } = req.body;
  const rider_id = req.user.uid;
  const sql = `
    INSERT INTO rides (rider_id, pickup, dropoff, status)
    VALUES ($1, $2, $3, 'pending') RETURNING *;
  `;
  const result = await query(sql, [rider_id, pickup, dropoff]);
  res.json(result.rows[0]);
});

export default router;
