/**
 * Registration API Endpoint
 * Creates a new user account with token validation
 */

import bcrypt from 'bcrypt'
import { useDB } from '~/server/utils/db'

const VALID_TOKEN = 'bvbmancity009'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, name, token } = body

    // Validate input
    if (!email || !password || !name || !token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // Validate token
    if (token !== VALID_TOKEN) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid registration token'
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

    // Validate password strength
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 8 characters long'
      })
    }

    // Validate name
    if (name.length < 2 || name.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Name must be between 2 and 100 characters'
      })
    }

    // Get database connection from environment
    const db = useDB()

    // Check if email already exists
    const existingUser = await db.query(
      'SELECT id FROM accounts WHERE email = ?',
      [email]
    )

    if (existingUser.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already registered'
      })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create new user
    const result = await db.query(
      'INSERT INTO accounts (email, password_hash, name, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [email, passwordHash, name]
    )

    // Set session cookie
    setCookie(event, 'auth', JSON.stringify({
      userId: result.insertId,
      email: email,
      name: name
    }), {
      maxAge: 60 * 60 * 24 * 30,
      secure: true,
      httpOnly: true
    })

    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: result.insertId,
        email,
        name
      }
    }
  } catch (error: any) {
    console.error('Registration error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred during registration'
    })
  }
})

