/**
 * Authentication Composable
 * Manages authentication state and operations
 */

export const useAuth = () => {
  const user = useState('auth.user', () => null)
  const isAuthenticated = useState('auth.isAuthenticated', () => false)
  const isLoading = useState('auth.isLoading', () => false)
  const error = useState<null>('auth.error', () => null)

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
   */
  const checkAuth = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/auth/check')
      
      if (response.authenticated) {
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
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    checkAuth
  }
}

