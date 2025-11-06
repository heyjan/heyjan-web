/**
 * Gym Check-in API Endpoint
 * Records a new gym session check-in
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
    const body = await readBody(event)
    const { checkinDate, sessionType = 'bjj', notes = '' } = body

    // Validate input
    if (!checkinDate) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Check-in date is required'
      })
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkinDate)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid date format. Use YYYY-MM-DD'
      })
    }

    // Validate session type
    const validTypes = ['bjj']
    if (!validTypes.includes(sessionType)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid session type'
      })
    }

    const db = useDB()

    // Check if check-in already exists for this date
    const existing = await db.query(
      'SELECT id FROM gym_checkins WHERE account_id = ? AND checkin_date = ?',
      [user.userId, checkinDate]
    )

    if (existing.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Check-in already exists for this date'
      })
    }

    // Create check-in
    const result = await db.query(
      'INSERT INTO gym_checkins (account_id, checkin_date, session_type, notes) VALUES (?, ?, ?, ?)',
      [user.userId, checkinDate, sessionType, notes]
    )

    return {
      success: true,
      message: 'Check-in recorded successfully',
      checkin: {
        id: result.insertId,
        checkinDate,
        sessionType,
        notes
      }
    }
  } catch (error: any) {
    console.error('Check-in error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred during check-in'
    })
  }
})

