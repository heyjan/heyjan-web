/**
 * Get Gym Check-ins API Endpoint
 * Retrieves check-ins for a specific month and year
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

    // Get check-ins for the month
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    
    // Calculate last day of month
    const lastDayOfMonth = new Date(year, month, 0).getDate()
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDayOfMonth).padStart(2, '0')}`

    const checkins = await db.query(
      'SELECT id, checkin_date, session_type, notes FROM gym_checkins WHERE account_id = ? AND checkin_date BETWEEN ? AND ? ORDER BY checkin_date DESC',
      [user.userId, startDate, endDate]
    )

    return {
      success: true,
      year,
      month,
      checkins,
      total: checkins.length
    }
  } catch (error: any) {
    console.error('Get check-ins error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while retrieving check-ins'
    })
  }
})

