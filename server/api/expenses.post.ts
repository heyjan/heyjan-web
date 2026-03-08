/**
 * Create Expense API Endpoint
 * Creates a new expense or income entry
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
    const { 
      category_id, 
      amount, 
      transaction_date, 
      description = null, 
      is_recurring = false 
    } = body

    // Validate input
    if (!category_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Category is required'
      })
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid amount is required'
      })
    }

    if (!transaction_date) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Transaction date is required'
      })
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(transaction_date)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid date format. Use YYYY-MM-DD'
      })
    }

    const db = useDB()

    // Verify category belongs to user
    const category = await db.query(
      'SELECT id, is_recurring FROM expense_categories WHERE id = ? AND account_id = ?',
      [category_id, user.userId]
    )

    if (category.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category not found'
      })
    }

    // Use category's recurring flag if not explicitly set
    const finalIsRecurring = is_recurring || category[0].is_recurring

    // Create expense
    const result = await db.query(
      'INSERT INTO expenses (account_id, category_id, amount, transaction_date, description, is_recurring) VALUES (?, ?, ?, ?, ?, ?)',
      [user.userId, category_id, parseFloat(amount), transaction_date, description, finalIsRecurring]
    )

    return {
      success: true,
      message: 'Expense created successfully',
      expense: {
        id: result.insertId,
        category_id,
        amount: parseFloat(amount),
        transaction_date,
        description,
        is_recurring: finalIsRecurring
      }
    }
  } catch (error: any) {
    console.error('Create expense error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while creating expense'
    })
  }
})

