<template>
  <div class="min-h-screen bg-dark-300 p-4 sm:p-6 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Mobile-first layout -->
    <div class="max-w-md mx-auto relative z-10">
      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h1 class="text-4xl font-serif text-primary">Dashboard</h1>
            <p class="text-gray-400 text-sm">Welcome, {{ user?.name }}</p>
          </div>
          <button
            @click="handleLogout"
            class="p-2 hover:bg-dark-100/50 rounded-lg transition"
            title="Logout"
          >
            <svg class="w-6 h-6 text-gray-400 hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
        <div class="h-px bg-gradient-to-r from-primary/20 to-transparent mt-4"></div>
      </div>

      <!-- Tools Grid -->
      <div class="space-y-4">
        <!-- Gym Tracker Card -->
        <div
          @click="navigateToTool('gym-tracker')"
          class="group relative cursor-pointer overflow-hidden rounded-lg p-6 transition-all duration-300 hover:scale-105 bg-dark-100/40 border border-primary/10 hover:border-primary/30"
        >
          <!-- Glow effect -->
          <div class="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>

          <!-- Card content -->
          <div class="relative z-10 flex flex-col items-center text-center gap-4">
            <!-- Icon -->
            <div class="p-4 rounded-full bg-primary/10">
              <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h12v2H6V4zm2 16h8v2H8v-2zm6-6a2 2 0 100-4 2 2 0 000 4zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"/>
              </svg>
            </div>

            <!-- Text -->
            <div>
              <h2 class="text-xl font-serif text-white">Gym Tracker</h2>
              <p class="text-sm text-gray-400 mt-1">Track your workouts</p>
            </div>
          </div>
        </div>

        <!-- Ausgaben Manager Card -->
        <div
          @click="navigateToTool('expense-manager')"
          class="group relative cursor-pointer overflow-hidden rounded-lg p-6 transition-all duration-300 hover:scale-105 bg-dark-100/40 border border-primary/10 hover:border-primary/30"
        >
          <!-- Glow effect -->
          <div class="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>

          <!-- Card content -->
          <div class="relative z-10 flex flex-col items-center text-center gap-4">
            <!-- Icon -->
            <div class="p-4 rounded-full bg-primary/10">
              <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7 14 7.67 14 8.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 7 8.5 7 7 7.67 7 8.5 7.67 10 8.5 10zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>

            <!-- Text -->
            <div>
              <h2 class="text-xl font-serif text-white">Ausgaben Manager</h2>
              <p class="text-sm text-gray-400 mt-1">Manage your expenses</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer note -->
      <div class="mt-12 text-center">
        <p class="text-xs text-gray-500">More tools coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()

/**
 * Navigate to tool
 */
const navigateToTool = (tool: string) => {
  // Placeholder for future tool routes
  console.log('Navigating to:', tool)
  // navigateTo(`/app/${tool}`)
}

/**
 * Handle logout
 */
const handleLogout = async () => {
  await logout()
  navigateTo('/auth/login')
}
</script>

<style scoped>
/* Smooth hover animation */
.group {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Responsive design - mobile first */
@media (max-width: 640px) {
  :deep(.p-6) {
    padding: 1.5rem;
  }
}
</style>

