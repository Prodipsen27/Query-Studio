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
        COUNT(DISTINCT customer_name) as active_customers,
        COUNT(*) as orders_processed,
        COALESCE(AVG(total_price), 0) as avg_order_value
      FROM orders
      LEFT JOIN order_items ON orders.id = order_items.order_id;
    `;
    const summaryResult = await pool.query(summaryQuery);
    const summary = summaryResult.rows[0];

    // 2. Weekly Sales Velocity (last 7 days)
    const velocityQuery = `
      SELECT 
        TO_CHAR(order_date, 'Mon') as name,
        SUM(total_price) as sales
      FROM orders
      JOIN order_items ON orders.id = order_items.order_id
      WHERE order_date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY order_date
      ORDER BY order_date ASC;
    `;
    const velocityResult = await pool.query(velocityQuery);
    
    // 3. Top Categories
    const categoryQuery = `
      SELECT 
        category as name,
        SUM(total_price) as value
      FROM products
      JOIN order_items ON products.id = order_items.product_id
      GROUP BY category
      ORDER BY value DESC
      LIMIT 5;
    `;
    const categoryResult = await pool.query(categoryQuery);

    // 4. Extract DB Name from connection string or pool options
    const dbName = pool.options.database || pool.options.connectionString.split('/').pop().split('?')[0];

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
    console.error("Stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats", details: error.message });
  }
});

export default router;
