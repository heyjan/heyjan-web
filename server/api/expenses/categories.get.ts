/**
 * Get Expense Categories API Endpoint
 * Retrieves all categories for the authenticated user
 */

import { useDB } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // Get user from session
    const authCookie = getCookie(event, 'auth')
    if (!authCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const user = JSON.parse(authCookie)
    const query = getQuery(event)
    const type = query.type as string | undefined

    const db = useDB()

    // Build query based on type filter
    let sql = 'SELECT id, name, type, is_recurring, color, icon FROM expense_categories WHERE account_id = ?'
    const params: any[] = [user.userId]

    if (type && (type === 'expense' || type === 'income')) {
      sql += ' AND type = ?'
      params.push(type)
    }

    sql += ' ORDER BY type, name'

    const categories = await db.query(sql, params)

    return {
      success: true,
      categories
    }
  } catch (error: any) {
    console.error('Get categories error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while retrieving categories'
    })
  }
})

