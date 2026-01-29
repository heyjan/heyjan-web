/**
 * Get Recurring Payments API Endpoint
 * Retrieves all recurring payments for the authenticated user
 */

import { useDB } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const authCookie = getCookie(event, 'auth')
    if (!authCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const user = JSON.parse(authCookie)
    const query = getQuery(event)
    const activeOnly = query.active === 'true'

    const db = useDB()

    let sql = `
      SELECT 
        rp.id,
        rp.name,
        rp.amount,
        rp.category_id,
        rp.frequency,
        rp.due_day,
        rp.start_date,
        rp.end_date,
        rp.is_active,
        rp.last_generated_date,
        rp.notes,
        rp.created_at,
        c.name as category_name,
        c.color as category_color,
        c.type as category_type
      FROM recurring_payments rp
      LEFT JOIN expense_categories c ON rp.category_id = c.id
      WHERE rp.account_id = ?
    `
    const params: any[] = [user.userId]

    if (activeOnly) {
      sql += ' AND rp.is_active = TRUE'
    }

    sql += ' ORDER BY rp.due_day ASC, rp.name ASC'

    const payments = await db.query(sql, params)

    // Calculate monthly total for active recurring payments
    const monthlyTotal = (payments as any[])
      .filter((p: any) => p.is_active)
      .reduce((sum: number, p: any) => {
        let monthlyAmount = parseFloat(p.amount)
        if (p.frequency === 'yearly') {
          monthlyAmount = monthlyAmount / 12
        } else if (p.frequency === 'weekly') {
          monthlyAmount = monthlyAmount * 4.33
        }
        return sum + monthlyAmount
      }, 0)

    return {
      success: true,
      payments,
      monthlyTotal
    }
  } catch (error: any) {
    console.error('Get recurring payments error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while retrieving recurring payments'
    })
  }
})
