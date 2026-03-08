/**
 * Create Recurring Payment API Endpoint
 * Creates a new recurring payment for the authenticated user
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
    const body = await readBody(event)
    const {
      name,
      amount,
      category_id = null,
      frequency = 'monthly',
      due_day = 1,
      start_date,
      end_date = null,
      is_active = true,
      notes = null
    } = body

    // Validate required fields
    if (!name || name.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name is required'
      })
    }

    if (name.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name must be 100 characters or less'
      })
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid amount is required'
      })
    }

    if (!['weekly', 'monthly', 'yearly'].includes(frequency)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Frequency must be weekly, monthly, or yearly'
      })
    }

    // Validate due_day based on frequency
    const parsedDueDay = parseInt(due_day)
    if (isNaN(parsedDueDay) || parsedDueDay < 1) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid due day'
      })
    }

    if (frequency === 'weekly' && parsedDueDay > 7) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Due day for weekly must be 1-7'
      })
    }

    if (frequency === 'monthly' && parsedDueDay > 31) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Due day for monthly must be 1-31'
      })
    }

    if (!start_date || !/^\d{4}-\d{2}-\d{2}$/.test(start_date)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid start date is required (YYYY-MM-DD)'
      })
    }

    if (end_date && !/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid end date format (YYYY-MM-DD)'
      })
    }

    const db = useDB()

    // Verify category belongs to user if provided
    if (category_id) {
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

    // Create recurring payment
    const result = await db.query(
      `INSERT INTO recurring_payments 
        (account_id, name, amount, category_id, frequency, due_day, start_date, end_date, is_active, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.userId,
        name.trim(),
        parseFloat(amount),
        category_id,
        frequency,
        parsedDueDay,
        start_date,
        end_date,
        is_active,
        notes
      ]
    )

    return {
      success: true,
      message: 'Recurring payment created successfully',
      payment: {
        id: (result as any).insertId,
        name: name.trim(),
        amount: parseFloat(amount),
        category_id,
        frequency,
        due_day: parsedDueDay,
        start_date,
        end_date,
        is_active,
        notes
      }
    }
  } catch (error: any) {
    console.error('Create recurring payment error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while creating recurring payment'
    })
  }
})
