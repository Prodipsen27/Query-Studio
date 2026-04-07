import express from "express";
import pool from "../db/index.js";

const router = express.Router();

/**
 * GET /api/stats
 * Returns aggregated business metrics for the dashboard
 */
router.get("/stats", async (req, res) => {
  try {
    // 1. Core Summary Metrics
    const summaryQuery = `
      SELECT 
        COALESCE(SUM(total_price), 0) as total_revenue,
        COUNT(DISTINCT name) as active_customers,
        COUNT(*) as orders_processed,
        COALESCE(AVG(total_price), 0) as avg_order_value
      FROM customer;
    `;
    const summaryResult = await pool.query(summaryQuery);
    const summary = summaryResult.rows[0];

    // 2. Weekly Sales Velocity (last 7 days)
    const velocityQuery = `
      SELECT 
        TO_CHAR(added_on, 'Mon DD') as name,
        SUM(total_price) as sales
      FROM customer
      WHERE added_on >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY added_on
      ORDER BY added_on ASC;
    `;
    const velocityResult = await pool.query(velocityQuery);
    
    // 3. Top Categories
    const categoryQuery = `
      SELECT 
        c.categories as name,
        SUM(od.price * od.qty) as value
      FROM categories c
      JOIN product p ON c.id = p.categories_id
      JOIN order_detail od ON p.id = od.product_id
      GROUP BY c.categories
      ORDER BY value DESC
      LIMIT 5;
    `;
    const categoryResult = await pool.query(categoryQuery);

    // 4. Extract DB Name safely
    let dbName = "Production_DB";
    try {
      if (pool.options.database) {
        dbName = pool.options.database;
      } else if (pool.options.connectionString) {
        dbName = pool.options.connectionString.split('/').pop().split('?')[0];
      }
    } catch (e) {
      console.error("Failed to extract DB name:", e);
    }

    res.json({
      summary: {
        totalRevenue: parseFloat(summary.total_revenue),
        activeCustomers: parseInt(summary.active_customers),
        ordersProcessed: parseInt(summary.orders_processed),
        avgOrderValue: parseFloat(summary.avg_order_value)
      },
      velocity: velocityResult.rows,
      topCategories: categoryResult.rows,
      dbName: dbName
    });
  } catch (error) {
    console.error("Stats API Error Details:", error);
    res.status(500).json({ 
      error: "Backend processing error", 
      message: error.message,
      hint: "Check if database tables (customer, categories, product, order_detail) exist."
    });
  }
});

export default router;
