/**
 * Delete Recurring Payment API Endpoint
 * Deletes a recurring payment for the authenticated user
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
    const id = getRouterParam(event, 'id')

    if (!id || isNaN(parseInt(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid payment ID'
      })
    }

    const db = useDB()

    // Verify payment belongs to user
    const existing = await db.query(
      'SELECT id FROM recurring_payments WHERE id = ? AND account_id = ?',
      [id, user.userId]
    )

    if ((existing as any[]).length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recurring payment not found'
      })
    }

    // Delete the payment
    await db.query(
      'DELETE FROM recurring_payments WHERE id = ? AND account_id = ?',
      [id, user.userId]
    )

    return {
      success: true,
      message: 'Recurring payment deleted successfully'
    }
  } catch (error: any) {
    console.error('Delete recurring payment error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while deleting recurring payment'
    })
  }
})
