/**
 * Delete Gym Check-in API Endpoint
 * Removes a gym session check-in
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
    const { id } = event.context.params as { id: string }

    // Validate input
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Check-in ID is required'
      })
    }

    const db = useDB()

    // Verify the check-in belongs to the user
    const checkin = await db.query(
      'SELECT id FROM gym_checkins WHERE id = ? AND account_id = ?',
      [id, user.userId]
    )

    if (checkin.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Check-in not found'
      })
    }

    // Delete check-in
    await db.query(
      'DELETE FROM gym_checkins WHERE id = ?',
      [id]
    )

    return {
      success: true,
      message: 'Check-in deleted successfully'
    }
  } catch (error: any) {
    console.error('Delete check-in error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while deleting the check-in'
    })
  }
})

