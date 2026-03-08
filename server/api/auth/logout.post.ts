/**
 * Logout API Endpoint
 * Clears the authentication session
 */

export default defineEventHandler(async (event) => {
  try {
    deleteCookie(event, 'auth')

    return {
      success: true,
      message: 'Logged out successfully'
    }
  } catch (error: any) {
    console.error('Logout error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred during logout'
    })
  }
})

