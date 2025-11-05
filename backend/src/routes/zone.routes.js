import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.get('/check', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const result = await pool.query(`
      SELECT name, type, radius_m,
      (earth_distance(ll_to_earth($1, $2), ll_to_earth(lat, lng))) AS distance
      FROM terminals
      WHERE earth_distance(ll_to_earth($1, $2), ll_to_earth(lat, lng)) <= radius_m
      ORDER BY distance ASC LIMIT 1;
    `, [lat, lng]);

    if (result.rows.length > 0) {
      const zone = result.rows[0];
      return res.json({
        regulated: true,
        zoneName: zone.name,
        type: zone.type,
        distance: Math.round(zone.distance)
      });
    } else {
      return res.json({ regulated: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
