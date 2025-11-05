/**
 * Login API Endpoint
 * Authenticates user with email and password
 */

import bcrypt from 'bcrypt'
import { useDB } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Get database connection
    const db = useDB()

    // Find user by email
    const users = await db.query(
      'SELECT id, email, password_hash, name FROM accounts WHERE email = ?',
      [email]
    )

    if (users.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    // Update last_login
    await db.query(
      'UPDATE accounts SET last_login = NOW() WHERE id = ?',
      [user.id]
    )

    // Set session cookie
    setCookie(event, 'auth', JSON.stringify({
      userId: user.id,
      email: user.email,
      name: user.name
    }), {
      maxAge: 60 * 60 * 24 * 30,
      secure: true,
      httpOnly: true
    })

    return {
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    console.error('Login error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred during login'
    })
  }
})

