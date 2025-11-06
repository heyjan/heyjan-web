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
            <LogOut class="w-6 h-6 text-gray-400 hover:text-primary transition" />
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
              <Dumbbell class="w-8 h-8 text-primary" />
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
              <Wallet class="w-8 h-8 text-primary" />
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
import { Dumbbell, Wallet, LogOut } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()

/**
 * Navigate to tool
 */
const navigateToTool = (tool: string) => {
  navigateTo(`/app/${tool}`)
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

