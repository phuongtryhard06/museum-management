const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'quan_ly_bao_tang',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Test Database Connection
pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL Database successfully:', process.env.DB_NAME);
    conn.release();
  })
  .catch(err => {
    console.warn('⚠️ Warning: MySQL server connection failed, falling back to mock memory dataset for demonstration:', err.message);
  });

module.exports = pool;
