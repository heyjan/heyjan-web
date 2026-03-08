/**
 * Get Expenses API Endpoint
 * Retrieves expenses for a specific month and year
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
    const year = parseInt(query.year as string)
    const month = parseInt(query.month as string)
    const type = query.type as string | undefined

    // Validate input
    if (!year || !month || isNaN(year) || isNaN(month)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Year and month are required'
      })
    }

    if (month < 1 || month > 12) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Month must be between 1 and 12'
      })
    }

    const db = useDB()

    // Get expenses for the month
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    
    // Calculate last day of month
    const lastDayOfMonth = new Date(year, month, 0).getDate()
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDayOfMonth).padStart(2, '0')}`

    let sql = `
      SELECT 
        e.id,
        e.amount,
        e.transaction_date,
        e.description,
        e.is_recurring,
        c.id as category_id,
        c.name as category_name,
        c.type as category_type,
        c.color as category_color,
        c.icon as category_icon
      FROM expenses e
      INNER JOIN expense_categories c ON e.category_id = c.id
      WHERE e.account_id = ? 
        AND e.transaction_date BETWEEN ? AND ?
    `
    const params: any[] = [user.userId, startDate, endDate]

    if (type && (type === 'expense' || type === 'income')) {
      sql += ' AND c.type = ?'
      params.push(type)
    }

    sql += ' ORDER BY e.transaction_date DESC, e.created_at DESC'

    const expenses = await db.query(sql, params)

    // Calculate totals
    const totalExpenses = expenses
      .filter((e: any) => e.category_type === 'expense')
      .reduce((sum: number, e: any) => sum + parseFloat(e.amount), 0)
    
    const totalIncome = expenses
      .filter((e: any) => e.category_type === 'income')
      .reduce((sum: number, e: any) => sum + parseFloat(e.amount), 0)

    return {
      success: true,
      year,
      month,
      expenses,
      totals: {
        expenses: totalExpenses,
        income: totalIncome,
        balance: totalIncome - totalExpenses
      }
    }
  } catch (error: any) {
    console.error('Get expenses error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while retrieving expenses'
    })
  }
})

