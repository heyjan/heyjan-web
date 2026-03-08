/**
 * Database Utility
 * Handles database connections and queries using MySQL-compatible databases
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

  const env = process.env
  const config = {
    host: env.MYSQLHOST || env.MYSQL_HOST || 'localhost',
    port: parseInt(env.MYSQLPORT || env.MYSQL_PORT || env.RAILWAY_DB_PORT || '3306', 10),
    user: env.MYSQLUSER || env.MYSQL_USER || 'root',
    password: env.MYSQLPASSWORD || env.MYSQL_PASSWORD || env.MYSQL_ROOT_PASSWORD || '',
    database: env.MYSQLDATABASE || env.MYSQL_DATABASE || 'railway',
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
