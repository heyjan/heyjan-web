/**
 * Auth Check API Endpoint
 * Verifies if user is currently authenticated
 */

export default defineEventHandler(async (event) => {
  try {
    const authCookie = getCookie(event, 'auth')

    if (!authCookie) {
      return {
        authenticated: false,
        user: null
      }
    }

    const user = JSON.parse(authCookie)

    return {
      authenticated: true,
      user
    }
  } catch (error) {
    console.error('Auth check error:', error)

    return {
      authenticated: false,
      user: null
    }
  }
})

