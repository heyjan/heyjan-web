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
  const { isAuthenticated, isInitialized, checkAuth } = useAuth()

  // Wait for initialization if not done yet
  if (!isInitialized.value) {
    await checkAuth()
  }

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated.value && to.path.startsWith('/app')) {
    return navigateTo('/auth/login')
  }
})

