<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <!-- Background animated gradient -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Register form container -->
    <div class="relative z-10 w-full max-w-md">
      <div class="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p class="text-slate-400">Join our exclusive tools platform</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              placeholder="John Doe"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
              :disabled="isLoading"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
              :disabled="isLoading"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
              :disabled="isLoading"
            />
            <p class="text-xs text-slate-400 mt-1">Must be at least 8 characters</p>
          </div>

          <!-- Registration Token Input -->
          <div>
            <label for="token" class="block text-sm font-medium text-slate-300 mb-2">Registration Token</label>
            <input
              id="token"
              v-model="token"
              type="password"
              required
              placeholder="Enter token"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
              :disabled="isLoading"
            />
            <p class="text-xs text-slate-400 mt-1">Required to create an account</p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p class="text-red-300 text-sm">{{ errorMessage }}</p>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p class="text-green-300 text-sm">{{ successMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="text-center mt-6">
          <p class="text-slate-400">Already have an account? <NuxtLink to="/auth/login" class="text-blue-400 hover:text-blue-300 font-semibold">Sign in here</NuxtLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const name = ref('')
const email = ref('')
const password = ref('')
const token = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const { register } = useAuth()

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  // Validate
  if (!name.value || !email.value || !password.value || !token.value) {
    errorMessage.value = 'All fields are required'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters'
    return
  }

  try {
    isLoading.value = true
    await register(email.value, password.value, name.value, token.value)
    
    successMessage.value = 'Account created successfully! Redirecting...'
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigateTo('/app')
    }, 3000)
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

