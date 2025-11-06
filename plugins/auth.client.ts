/**
 * Auth Plugin
 * Initializes authentication state on app startup
 */

export default defineNuxtPlugin(async (nuxtApp) => {
  const { checkAuth, isAuthenticated } = useAuth()

  // Check authentication status immediately on app load
  try {
    await checkAuth()
  } catch (error) {
    console.error('Error checking auth on startup:', error)
  }

  // If authenticated, refresh on route change to keep session alive
  if (isAuthenticated.value) {
    nuxtApp.hook('app:mounted', () => {
      const router = useRouter()
      router.afterEach(async () => {
        try {
          await checkAuth()
        } catch (error) {
          console.error('Error refreshing auth:', error)
        }
      })
    })
  }
})

