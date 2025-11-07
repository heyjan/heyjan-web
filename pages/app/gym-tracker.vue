<template>
  <div class="min-h-screen bg-dark-300 p-4 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Mobile-first layout -->
    <div class="max-w-md mx-auto relative z-10">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-serif text-primary">Gym Tracker</h1>
          <p class="text-gray-400 text-sm">Track your BJJ sessions</p>
        </div>
        <NuxtLink
          to="/app"
          class="p-2 hover:bg-dark-100/50 rounded-lg transition"
          title="Back to Dashboard"
        >
          <ArrowLeft class="w-6 h-6 text-gray-400 hover:text-primary transition" />
        </NuxtLink>
      </div>

      <div class="h-px bg-gradient-to-r from-primary/20 to-transparent mb-8"></div>

      <!-- Check-in Button Section -->
      <div class="mb-12">
        <button
          @click="handleCheckIn"
          :disabled="isCheckingIn"
          class="w-full group relative overflow-hidden rounded-lg p-8 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <!-- Animated background -->
          <div class="absolute inset-0 bg-dark-100/40 border border-primary/10 group-hover:border-primary/30 transition-all rounded-lg"></div>

          <!-- Glow effect on hover -->
          <div class="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>

          <!-- Button content -->
          <div class="relative z-10 flex flex-col items-center justify-center gap-4">
            <div class="p-6 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <CheckCircle2 v-if="!isCheckingIn" class="w-12 h-12 text-primary" />
              <Loader class="w-12 h-12 text-primary animate-spin" v-else />
            </div>
            <div class="text-center">
              <p class="text-lg font-semibold text-white">{{ isCheckingIn ? 'Checking in...' : 'BJJ Check-in' }}</p>
              <p class="text-sm text-gray-400 mt-1">Quick session tracker</p>
            </div>
          </div>
        </button>

        <!-- Success message -->
        <Transition name="fade">
          <div v-if="showCheckInSuccess" class="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p class="text-primary text-sm flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5" />
              Check-in successful for {{ formatDate(new Date()) }}
            </p>
          </div>
        </Transition>
      </div>

      <!-- History Section -->
      <div>
        <h2 class="text-2xl font-serif text-white mb-4">History</h2>

        <!-- Month/Year Selector -->
        <div class="mb-6 flex gap-2">
          <button
            @click="previousMonth"
            class="p-2 hover:bg-dark-100/50 rounded-lg transition"
            title="Previous month"
          >
            <ChevronLeft class="w-5 h-5 text-gray-400 hover:text-primary" />
          </button>

          <div class="flex-1 bg-dark-100/40 border border-primary/10 rounded-lg px-4 py-2 flex items-center justify-center cursor-pointer hover:border-primary/30 transition" @click="toggleMonthPicker">
            <span class="text-white font-medium text-sm">
              {{ selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
            </span>
          </div>

          <button
            @click="nextMonth"
            class="p-2 hover:bg-dark-100/50 rounded-lg transition"
            title="Next month"
          >
            <ChevronRight class="w-5 h-5 text-gray-400 hover:text-primary" />
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="bg-dark-100/40 border border-primary/10 rounded-lg p-4">
          <!-- Day headers -->
          <div class="grid grid-cols-7 gap-2 mb-2">
            <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-xs text-gray-400 font-semibold py-2">
              {{ day }}
            </div>
          </div>

          <!-- Calendar days -->
          <div class="grid grid-cols-7 gap-2">
            <!-- Empty cells for days before month starts -->
            <div v-for="_ in firstDayOfMonth" :key="`empty-${_}`" class="aspect-square"></div>

            <!-- Actual days -->
            <button
              v-for="day in daysInMonth"
              :key="day"
              @click="handleDayClick(day)"
              class="aspect-square relative group bg-dark-200/50 hover:bg-dark-200 border border-primary/10 hover:border-primary/30 rounded-lg transition-all flex flex-col items-center justify-between p-2"
            >
              <!-- Glow effect -->
              <div v-if="hasCheckIn(day)" class="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-gradient-to-br from-primary/20 to-transparent -z-10"></div>

              <!-- Date -->
              <span class="text-xs font-semibold" :class="hasCheckIn(day) ? 'text-primary' : 'text-gray-300'">
                {{ day }}
              </span>

              <!-- Icon if has check-in -->
              <Dumbbell v-if="hasCheckIn(day)" class="w-4 h-4 text-primary" />

              <!-- Add button for empty days -->
              <Plus v-else class="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        <!-- Month sessions summary -->
        <div class="mt-6 p-4 bg-dark-100/40 border border-primary/10 rounded-lg">
          <p class="text-sm text-gray-300">
            <span class="font-semibold text-primary">{{ checkInsThisMonth }}</span>
            <span class="text-gray-400"> sessions in {{ selectedDate.toLocaleDateString('en-US', { month: 'long' }) }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Day Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedDay !== null" class="fixed inset-0 bg-black/50 flex items-end z-50">
          <div class="w-full bg-dark-100 rounded-t-lg p-6 animate-slide-up">
            <!-- Close button -->
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-serif text-primary">
                {{ formatDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDay)) }}
              </h3>
              <button @click="selectedDay = null" class="p-2 hover:bg-dark-200 rounded-lg transition">
                <X class="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <!-- Add session button -->
            <button
              @click="addSessionForDay"
              class="w-full py-3 bg-primary hover:bg-primary/90 text-dark-300 font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              <Plus class="w-5 h-5" />
              Add BJJ Session
            </button>

            <!-- Existing session (if any) -->
            <div v-if="hasCheckIn(selectedDay)" class="mt-4 p-4 bg-dark-200/50 border border-primary/20 rounded-lg flex items-center justify-between">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-5 h-5 text-primary" />
                <span class="text-sm text-gray-300">BJJ Session logged</span>
              </div>
              <button
                @click="removeCheckIn(selectedDay)"
                class="p-2 hover:bg-dark-300 rounded transition"
                title="Remove"
              >
                <Trash2 class="w-4 h-4 text-red-400 hover:text-red-300" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  Dumbbell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowLeft,
  Loader,
  X,
  Trash2
} from 'lucide-vue-next'

// Auto-injected by Nuxt
// definePageMeta, useAuth, $fetch are available without import

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

// State
const selectedDate = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
const selectedDay = ref<number | null>(null)
const checkIns = ref<Set<string>>(new Set())
const isCheckingIn = ref(false)
const showCheckInSuccess = ref(false)

/**
 * Format date to YYYY-MM-DD
 */
const formatDateKey = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format date for display
 */
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * Get days in current month
 */
const daysInMonth = computed(() => {
  return new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() + 1, 0).getDate()
})

/**
 * Get first day of month (0 = Sunday)
 */
const firstDayOfMonth = computed(() => {
  return new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), 1).getDay()
})

/**
 * Check if day has check-in
 */
const hasCheckIn = (day: number): boolean => {
  const date = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), day)
  return checkIns.value.has(formatDateKey(date))
}

/**
 * Get check-ins this month
 */
const checkInsThisMonth = computed(() => {
  let count = 0
  for (let i = 1; i <= daysInMonth.value; i++) {
    if (hasCheckIn(i)) count++
  }
  return count
})

/**
 * Handle check-in button click
 */
const handleCheckIn = async () => {
  isCheckingIn.value = true
  
  try {
    const today = new Date()
    const dateKey = formatDateKey(today)
    
    await $fetch('/api/gym/checkin', {
      method: 'POST',
      body: { checkinDate: dateKey, sessionType: 'bjj' }
    })
    
    // Reload data from API
    await loadCheckIns()
    
    showCheckInSuccess.value = true
    setTimeout(() => {
      showCheckInSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Error during check-in:', error)
  } finally {
    isCheckingIn.value = false
  }
}

/**
 * Handle day click
 */
const handleDayClick = (day: number) => {
  selectedDay.value = day
}

/**
 * Add session for selected day
 */
const addSessionForDay = async () => {
  if (selectedDay.value === null) return
  
  const date = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), selectedDay.value)
  const dateKey = formatDateKey(date)
  
  try {
    await $fetch('/api/gym/checkin', {
      method: 'POST',
      body: { checkinDate: dateKey, sessionType: 'bjj' }
    })
    
    // Reload data from API
    await loadCheckIns()
  } catch (error) {
    console.error('Error adding session:', error)
  }
  
  selectedDay.value = null
}

/**
 * Remove check-in for day
 */
const removeCheckIn = async (day: number) => {
  const date = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), day)
  const dateKey = formatDateKey(date)
  
  try {
    // Get current month data to find check-in ID
    const response = await $fetch('/api/gym/checkins', {
      query: {
        year: selectedDate.value.getFullYear(),
        month: selectedDate.value.getMonth() + 1
      }
    })
    
    const checkin = response.checkins?.find((c: any) => c.checkin_date === dateKey)
    if (checkin?.id) {
      await $fetch(`/api/gym/checkin/${checkin.id}`, { method: 'DELETE' })
      
      // Reload data from API
      await loadCheckIns()
    }
  } catch (error) {
    console.error('Error removing check-in:', error)
  }
}

/**
 * Navigate to previous month
 */
const previousMonth = () => {
  selectedDate.value = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() - 1, 1)
}

/**
 * Navigate to next month
 */
const nextMonth = () => {
  selectedDate.value = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() + 1, 1)
}

/**
 * Toggle month picker (placeholder for future implementation)
 */
const toggleMonthPicker = () => {
  // TODO: Implement month/year picker modal
  console.log('Month picker clicked')
}

/**
 * Load check-ins from API for current month
 */
const loadCheckIns = async () => {
  try {
    const response = await $fetch('/api/gym/checkins', {
      query: {
        year: selectedDate.value.getFullYear(),
        month: selectedDate.value.getMonth() + 1
      }
    })
    
    if (response.checkins && Array.isArray(response.checkins)) {
      checkIns.value = new Set(response.checkins.map((c: any) => c.checkin_date))
    }
  } catch (error) {
    console.error('Error loading check-ins:', error)
  }
}

/**
 * Load check-ins on mount
 */
onMounted(async () => {
  await loadCheckIns()
})

/**
 * Reload check-ins when month changes
 */
watch(
  () => `${selectedDate.value.getFullYear()}-${selectedDate.value.getMonth()}`,
  async () => {
    await loadCheckIns()
  }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active :deep(.bg-dark-100) {
  animation: slide-up 0.3s ease;
}

.modal-leave-active :deep(.bg-dark-100) {
  animation: slide-down 0.3s ease;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease;
}
</style>

