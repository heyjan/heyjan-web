/**
 * Create Expense Category API Endpoint
 * Creates a new expense or income category
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
    const { name, type = 'expense', is_recurring = false, color = '#6366f1', icon = null } = body

    // Validate input
    if (!name || name.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Category name is required'
      })
    }

    if (type !== 'expense' && type !== 'income') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Type must be either "expense" or "income"'
      })
    }

    if (name.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Category name must be 100 characters or less'
      })
    }

    const db = useDB()

    // Check if category already exists for this user
    const existing = await db.query(
      'SELECT id FROM expense_categories WHERE account_id = ? AND name = ? AND type = ?',
      [user.userId, name.trim(), type]
    )

    if (existing.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Category already exists'
      })
    }

    // Create category
    const result = await db.query(
      'INSERT INTO expense_categories (account_id, name, type, is_recurring, color, icon) VALUES (?, ?, ?, ?, ?, ?)',
      [user.userId, name.trim(), type, is_recurring, color, icon]
    )

    return {
      success: true,
      message: 'Category created successfully',
      category: {
        id: result.insertId,
        name: name.trim(),
        type,
        is_recurring,
        color,
        icon
      }
    }
  } catch (error: any) {
    console.error('Create category error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while creating category'
    })
  }
})

