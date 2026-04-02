import express from "express";
import generateSQL from "../agent/generateSQL.js";
import validateSQL from "../agent/validateSQL.js";
import pool from "../db/index.js";

const router = express.Router();

/**
 * POST /api/query
 * Body: { question: "Show me total sales by category" }
 * Response: { sql, columns, rows }
 */
router.post("/query", async (req, res) => {
  const { question } = req.body;

  // 1. Validate input
  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is required." });
  }

  const startTime = process.hrtime();

  try {
    // 2. Generate SQL from GPT-4o
    console.log("🧠 Generating SQL for:", question);
    const sql = await generateSQL(question);
    console.log("📝 Generated SQL:", sql);

    // 3. Validate SQL (security layer)
    const { valid, error: validationError } = validateSQL(sql);
    if (!valid) {
      console.error("🚫 SQL Validation failed:", validationError);
      return res.status(400).json({ error: validationError, sql });
    }

    // 4. Run SQL on PostgreSQL
    const result = await pool.query(sql);

    // 5. Extract column names and rows
    const columns = result.fields.map((f) => f.name);
    const rows = result.rows;

    console.log(`✅ Query returned ${rows.length} rows`);

    const endTime = process.hrtime(startTime);
    const executionTimeMs = Math.round((endTime[0] * 1000) + (endTime[1] / 1000000));

    // 6. Return everything to frontend
    return res.json({
      question,
      sql,
      columns,
      rows,
      rowCount: rows.length,
      executionTime: executionTimeMs
    });


  } catch (err) {
    console.error("❌ Error:", err.message);
    return res.status(500).json({
      error: "Something went wrong.",
      details: err.message,
    });
  }
});

export default router;