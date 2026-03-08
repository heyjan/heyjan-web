/**
 * Update Recurring Payment API Endpoint
 * Updates an existing recurring payment for the authenticated user
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

    const body = await readBody(event)
    const {
      name,
      amount,
      category_id,
      frequency,
      due_day,
      start_date,
      end_date,
      is_active,
      notes
    } = body

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

    // Build dynamic update query
    const updates: string[] = []
    const params: any[] = []

    if (name !== undefined) {
      if (!name || name.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Name cannot be empty'
        })
      }
      if (name.length > 100) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Name must be 100 characters or less'
        })
      }
      updates.push('name = ?')
      params.push(name.trim())
    }

    if (amount !== undefined) {
      if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Valid amount is required'
        })
      }
      updates.push('amount = ?')
      params.push(parseFloat(amount))
    }

    if (category_id !== undefined) {
      if (category_id !== null) {
        const category = await db.query(
          'SELECT id FROM expense_categories WHERE id = ? AND account_id = ?',
          [category_id, user.userId]
        )
        if ((category as any[]).length === 0) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Category not found'
          })
        }
      }
      updates.push('category_id = ?')
      params.push(category_id)
    }

    if (frequency !== undefined) {
      if (!['weekly', 'monthly', 'yearly'].includes(frequency)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Frequency must be weekly, monthly, or yearly'
        })
      }
      updates.push('frequency = ?')
      params.push(frequency)
    }

    if (due_day !== undefined) {
      const parsedDueDay = parseInt(due_day)
      if (isNaN(parsedDueDay) || parsedDueDay < 1 || parsedDueDay > 31) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Due day must be between 1 and 31'
        })
      }
      updates.push('due_day = ?')
      params.push(parsedDueDay)
    }

    if (start_date !== undefined) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid start date format (YYYY-MM-DD)'
        })
      }
      updates.push('start_date = ?')
      params.push(start_date)
    }

    if (end_date !== undefined) {
      if (end_date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid end date format (YYYY-MM-DD)'
        })
      }
      updates.push('end_date = ?')
      params.push(end_date)
    }

    if (is_active !== undefined) {
      updates.push('is_active = ?')
      params.push(is_active ? 1 : 0)
    }

    if (notes !== undefined) {
      updates.push('notes = ?')
      params.push(notes)
    }

    if (updates.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No fields to update'
      })
    }

    // Add WHERE clause params
    params.push(id, user.userId)

    await db.query(
      `UPDATE recurring_payments SET ${updates.join(', ')} WHERE id = ? AND account_id = ?`,
      params
    )

    return {
      success: true,
      message: 'Recurring payment updated successfully'
    }
  } catch (error: any) {
    console.error('Update recurring payment error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while updating recurring payment'
    })
  }
})
