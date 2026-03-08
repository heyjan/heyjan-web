/**
 * Authentication Composable
 * Manages authentication state and operations
 * Persists session across page refreshes
 */

export const useAuth = () => {
  // Use useState with persisted state keys for SSR/hydration
  const user = useState('auth.user', () => null)
  const isAuthenticated = useState('auth.isAuthenticated', () => false)
  const isLoading = useState('auth.isLoading', () => false)
  const error = useState<null>('auth.error', () => null)
  const isInitialized = useState('auth.isInitialized', () => false)

  /**
   * Register a new account
   */
  const register = async (email: string, password: string, name: string, token: string) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email,
          password,
          name,
          token
        }
      })

      if (response.success) {
        user.value = response.user
        isAuthenticated.value = true
        return response
      }
    } catch (err: any) {
      error.value = err.data?.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password
        }
      })

      if (response.success) {
        user.value = response.user
        isAuthenticated.value = true
        return response
      }
    } catch (err: any) {
      error.value = err.data?.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout and clear auth state
   */
  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      isAuthenticated.value = false
    }
  }

  /**
   * Check if user is authenticated
   * Uses request headers on the server so cookies are forwarded correctly (Nuxt 4 data fetching best practice)
   */
  const checkAuth = async () => {
    try {
      isLoading.value = true

      let response: any

      // On server, explicitly forward the cookie header so /api/auth/check sees the session
      if (process.server) {
        const headers = useRequestHeaders(['cookie'])
        response = await $fetch('/api/auth/check', { headers })
      } else {
        // On client, browser automatically sends cookies for same-origin requests
        response = await $fetch('/api/auth/check')
      }

      if (response?.authenticated) {
        user.value = response.user
        isAuthenticated.value = true
      } else {
        user.value = null
        isAuthenticated.value = false
      }
    } catch (err) {
      user.value = null
      isAuthenticated.value = false
    } finally {
      isLoading.value = false
      isInitialized.value = true
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    register,
    login,
    logout,
    checkAuth
  }
}

