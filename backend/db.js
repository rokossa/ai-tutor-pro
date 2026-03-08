const { Pool } = require('pg');

// Create a new PostgreSQL connection pool
// This uses the DATABASE_URL environment variable provided by Render or Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If you are connecting to a managed DB like Render, SSL is usually required
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('🔥 Error acquiring client from database pool:', err.stack);
  } else {
    console.log('✅ Successfully connected to the PostgreSQL Knowledge Graph Database');
    release();
  }
});

// Export a query helper function to be used by all our Services
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool
};
