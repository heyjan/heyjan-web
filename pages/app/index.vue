<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
    <!-- Mobile-first layout -->
    <div class="max-w-md mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-2xl font-bold text-white">Dashboard</h1>
            <p class="text-slate-400 text-sm">Welcome, {{ user?.name }}</p>
          </div>
          <button
            @click="handleLogout"
            class="p-2 hover:bg-slate-700/50 rounded-lg transition"
            title="Logout"
          >
            <svg class="w-6 h-6 text-slate-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="space-y-4">
        <!-- Gym Tracker Card -->
        <div
          @click="navigateToTool('gym-tracker')"
          class="group relative cursor-pointer overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105"
          :style="getCardStyle('gym')"
        >
          <!-- Glow effect -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="getGlowStyle('gym')">
          </div>

          <!-- Card content -->
          <div class="relative z-10 flex flex-col items-center text-center gap-4">
            <!-- Icon -->
            <div class="p-4 rounded-full" :style="getIconBackground('gym')">
              <svg class="w-8 h-8" :style="getIconColor('gym')" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h12v2H6V4zm2 16h8v2H8v-2zm6-6a2 2 0 100-4 2 2 0 000 4zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"/>
              </svg>
            </div>

            <!-- Text -->
            <div>
              <h2 class="text-xl font-bold text-white">Gym Tracker</h2>
              <p class="text-sm opacity-75 mt-1">Track your workouts</p>
            </div>
          </div>
        </div>

        <!-- Ausgaben Manager Card -->
        <div
          @click="navigateToTool('expense-manager')"
          class="group relative cursor-pointer overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105"
          :style="getCardStyle('expense')"
        >
          <!-- Glow effect -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="getGlowStyle('expense')">
          </div>

          <!-- Card content -->
          <div class="relative z-10 flex flex-col items-center text-center gap-4">
            <!-- Icon -->
            <div class="p-4 rounded-full" :style="getIconBackground('expense')">
              <svg class="w-8 h-8" :style="getIconColor('expense')" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7 14 7.67 14 8.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 7 8.5 7 7 7.67 7 8.5 7.67 10 8.5 10zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>

            <!-- Text -->
            <div>
              <h2 class="text-xl font-bold text-white">Ausgaben Manager</h2>
              <p class="text-sm opacity-75 mt-1">Manage your expenses</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer note -->
      <div class="mt-12 text-center">
        <p class="text-xs text-slate-500">More tools coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()

interface CardStyle {
  background: string
  borderColor: string
}

interface GlowStyle {
  background: string
  filter: string
}

interface IconBackground {
  backgroundColor: string
}

interface IconColor {
  color: string
}

/**
 * Get card background style
 */
const getCardStyle = (type: string): CardStyle => {
  const styles: { [key: string]: CardStyle } = {
    gym: {
      background: 'linear-gradient(135deg, rgba(29, 185, 84, 0.15) 0%, rgba(29, 185, 84, 0.05) 100%)',
      borderColor: '1px solid rgba(29, 185, 84, 0.3)'
    },
    expense: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)',
      borderColor: '1px solid rgba(59, 130, 246, 0.3)'
    }
  }
  return styles[type] || {}
}

/**
 * Get glow effect style
 */
const getGlowStyle = (type: string): GlowStyle => {
  const styles: { [key: string]: GlowStyle } = {
    gym: {
      background: 'radial-gradient(circle, rgba(29, 185, 84, 0.4) 0%, transparent 70%)',
      filter: 'blur(20px)'
    },
    expense: {
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
      filter: 'blur(20px)'
    }
  }
  return styles[type] || {}
}

/**
 * Get icon background color
 */
const getIconBackground = (type: string): IconBackground => {
  const styles: { [key: string]: IconBackground } = {
    gym: { backgroundColor: 'rgba(29, 185, 84, 0.2)' },
    expense: { backgroundColor: 'rgba(59, 130, 246, 0.2)' }
  }
  return styles[type] || {}
}

/**
 * Get icon color
 */
const getIconColor = (type: string): IconColor => {
  const styles: { [key: string]: IconColor } = {
    gym: { color: '#1db954' },
    expense: { color: '#3b82f6' }
  }
  return styles[type] || {}
}

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

