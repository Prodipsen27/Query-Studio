import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pkg;

const pool =  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}, // required for Supabase
});

// Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL (Supabase)");
    release();
  }
});
 
export default pool;