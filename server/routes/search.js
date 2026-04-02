import express from "express";
import pool from "../db/index.js";

const router = express.Router();

/**
 * GET /api/search
 * Query: ?q=headphone
 */
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({ results: [] });

  try {
    const searchQuery = `
      SELECT id, name, category, price
      FROM products
      WHERE name ILIKE $1 OR category ILIKE $1
      LIMIT 5;
    `;
    const result = await pool.query(searchQuery, [`%${q}%`]);
    res.json({ results: result.rows });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
