/**
 * Database Utility
 * Handles database connections and queries using Railway PostgreSQL
 */

import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

/**
 * Initialize database connection pool
 */
function getPool(): mysql.Pool {
  if (pool) {
    return pool
  }

  const config = {
    host: process.env.RAILWAY_DB_HOST || 'localhost',
    port: parseInt(process.env.RAILWAY_DB_PORT || '3306'),
    user: process.env.RAILWAY_DB_USER || 'root',
    password: process.env.RAILWAY_DB_PASSWORD || '',
    database: process.env.RAILWAY_DB_NAME || 'railway',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }

  pool = mysql.createPool(config)
  return pool
}

/**
 * Execute a database query
 */
export const useDB = () => {
  const pool = getPool()

  return {
    async query(sql: string, values?: any[]) {
      const connection = await pool.getConnection()
      try {
        const [rows] = await connection.execute(sql, values || [])
        return rows
      } finally {
        connection.release()
      }
    }
  }
}

