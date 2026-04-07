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
        COALESCE(SUM(oi.total_price), 0) as total_revenue,
        COUNT(DISTINCT o.customer_name) as active_customers,
        COUNT(DISTINCT o.id) as orders_processed,
        COALESCE(AVG(oi.total_price), 0) as avg_order_value
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id;
    `;
    const summaryResult = await pool.query(summaryQuery);
    const summary = summaryResult.rows[0];

    // 2. Weekly Sales Velocity (last 30 days)
    const velocityQuery = `
      SELECT 
        TO_CHAR(order_date, 'Mon DD') as name,
        SUM(total_price) as sales
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY order_date
      ORDER BY order_date ASC;
    `;
    const velocityResult = await pool.query(velocityQuery);
    
    // 3. Top Categories
    const categoryQuery = `
      SELECT 
        p.category as name,
        SUM(oi.total_price) as value
      FROM products p
      JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.category
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
