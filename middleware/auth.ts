/**
 * Authentication Middleware
 * Protects routes that require authentication
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip middleware for auth pages
  if (to.path.startsWith('/auth/')) {
    return
  }

  // Check authentication status
  const { isAuthenticated, checkAuth } = useAuth()

  // Only check if not already authenticated
  if (!isAuthenticated.value) {
    await checkAuth()
  }

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated.value && to.path.startsWith('/app')) {
    return navigateTo('/auth/login')
  }
})

