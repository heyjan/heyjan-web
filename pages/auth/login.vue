<template>
  <div class="min-h-screen bg-dark-300 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <!-- Divider line -->
      <div class="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>

    <!-- Login form container -->
    <div class="relative z-10 w-full max-w-md">
      <div class="bg-dark-100/40 backdrop-blur-xl border border-primary/10 rounded-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-serif text-primary mb-2">Welcome Back</h1>
          <p class="text-gray-400 text-sm">Sign in to access your tools</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 bg-dark-200/50 border border-primary/20 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition"
              :disabled="isLoading"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-dark-200/50 border border-primary/20 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition"
              :disabled="isLoading"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p class="text-red-300 text-sm">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full mt-6 py-3 bg-primary hover:bg-primary/90 text-dark-300 font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="text-center mt-6">
          <p class="text-gray-400 text-sm">Don't have an account? <NuxtLink to="/auth/register" class="text-primary hover:text-primary/80 font-semibold">Register here</NuxtLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const { login, isLoading: authLoading } = useAuth()

const handleLogin = async () => {
  errorMessage.value = ''
  
  // Validate
  if (!email.value || !password.value) {
    errorMessage.value = 'Email and password are required'
    return
  }

  try {
    isLoading.value = true
    await login(email.value, password.value)
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigateTo('/app')
    }, 3000)
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

