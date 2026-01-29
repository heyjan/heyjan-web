<template>
  <div class="min-h-screen bg-background p-4 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Mobile-first layout -->
    <div class="max-w-md mx-auto relative z-10">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <Breadcrumb />
      </div>
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-serif text-primary">Ausgaben Manager</h1>
          <p class="text-text-muted text-sm">Track your expenses</p>
        </div>
        <NuxtLink
          to="/app"
          class="p-2 hover:bg-surface-alt/50 rounded-lg transition"
          title="Back to Dashboard"
        >
          <ArrowLeft class="w-6 h-6 text-text-muted hover:text-primary transition" />
        </NuxtLink>
      </div>

      <div class="h-px bg-gradient-to-r from-primary/20 to-transparent mb-8"></div>

      <!-- Action Buttons -->
      <div class="mb-8 grid grid-cols-4 gap-3">
        <!-- Button 1: Ausgaben -->
        <button
          @click="openAddExpenseModal"
          class="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105 bg-surface border border-border hover:border-primary/30"
        >
          <div class="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
          <div class="relative z-10 flex flex-col items-center gap-2">
            <Plus class="w-6 h-6 text-primary" />
            <span class="text-xs font-semibold text-text">Ausgaben</span>
          </div>
        </button>

        <!-- Button 2: Kategorien -->
        <button
          @click="openAddCategoryModal"
          class="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105 bg-surface border border-border hover:border-primary/30"
        >
          <div class="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
          <div class="relative z-10 flex flex-col items-center gap-2">
            <Tag class="w-6 h-6 text-primary" />
            <span class="text-xs font-semibold text-text">Kategorien</span>
          </div>
        </button>

        <!-- Button 3: Recurring -->
        <button
          @click="openRecurringModal"
          class="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105 bg-surface border border-border hover:border-primary/30"
        >
          <div class="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
          <div class="relative z-10 flex flex-col items-center gap-2">
            <Repeat class="w-6 h-6 text-primary" />
            <span class="text-xs font-semibold text-text">Dauerauftrag</span>
          </div>
        </button>

        <!-- Button 4: Camera -->
        <button
          @click="openCamera"
          class="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105 bg-surface border border-border hover:border-primary/30"
        >
          <div class="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
          <div class="relative z-10 flex flex-col items-center gap-2">
            <Camera class="w-6 h-6 text-primary" />
            <span class="text-xs font-semibold text-text">Foto</span>
          </div>
        </button>
      </div>

      <!-- Hidden file input for camera -->
      <input
        ref="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        class="hidden"
        @change="handleCameraCapture"
      />

      <!-- Current Month Summary -->
      <div class="mb-6 p-4 bg-surface border border-border rounded-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-text-muted">Current Month</span>
          <span class="text-sm font-semibold text-text">
            {{ currentMonthName }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p class="text-xs text-text-muted mb-1">Expenses</p>
            <p class="text-lg font-semibold text-red-500">{{ formatCurrency(totals.expenses) }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted mb-1">Income</p>
            <p class="text-lg font-semibold text-green-600">{{ formatCurrency(totals.income) }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted mb-1">Balance</p>
            <p class="text-lg font-semibold" :class="totals.balance >= 0 ? 'text-green-600' : 'text-red-500'">
              {{ formatCurrency(totals.balance) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Recurring Payments Summary -->
      <div v-if="recurringPayments.length > 0" class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-serif text-text flex items-center gap-2">
            <Repeat class="w-5 h-5 text-primary" />
            Daueraufträge
          </h2>
          <span class="text-sm text-text-muted">
            {{ formatCurrency(recurringMonthlyTotal) }}/Monat
          </span>
        </div>
        <div class="space-y-2">
          <div
            v-for="payment in recurringPayments"
            :key="payment.id"
            class="p-3 bg-surface border border-border rounded-lg flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div
                v-if="payment.category_color"
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: payment.category_color }"
              ></div>
              <div>
                <p class="text-sm font-medium text-text">{{ payment.name }}</p>
                <p class="text-xs text-text-muted">
                  {{ payment.due_day }}. des Monats
                  <span v-if="!payment.is_active" class="text-yellow-600 ml-1">(pausiert)</span>
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-red-500">{{ formatCurrency(payment.amount) }}</span>
              <button
                @click="editRecurringPayment(payment)"
                class="p-1.5 hover:bg-surface-alt rounded transition"
                title="Bearbeiten"
              >
                <Pencil class="w-4 h-4 text-text-muted hover:text-primary" />
              </button>
              <button
                @click="deleteRecurringPayment(payment.id)"
                class="p-1.5 hover:bg-surface-alt rounded transition"
                title="Löschen"
              >
                <Trash2 class="w-4 h-4 text-text-muted hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Expenses Table -->
      <div class="mb-8">
        <h2 class="text-2xl font-serif text-text mb-4">Expenses</h2>
        
        <div v-if="loading" class="text-center py-8">
          <Loader class="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p class="text-text-muted text-sm">Loading expenses...</p>
        </div>

        <div v-else-if="expenses.length === 0" class="text-center py-8 bg-surface border border-border rounded-lg">
          <p class="text-text-muted text-sm">No expenses for this month</p>
        </div>

        <div v-else class="bg-surface border border-border rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border">
                  <th class="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase">Date</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase">Category</th>
                  <th class="text-right py-3 px-4 text-xs font-semibold text-text-muted uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="expense in expenses"
                  :key="expense.id"
                  class="border-b border-border hover:bg-surface-alt/50 transition-colors"
                >
                  <td class="py-3 px-4 text-sm text-text">
                    {{ formatDate(expense.transaction_date) }}
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                      <div
                        v-if="expense.category_color"
                        class="w-3 h-3 rounded-full"
                        :style="{ backgroundColor: expense.category_color }"
                      ></div>
                      <span class="text-sm text-text">{{ expense.category_name }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <span
                      class="text-sm font-semibold"
                      :class="expense.category_type === 'income' ? 'text-green-600' : 'text-red-500'"
                    >
                      {{ expense.category_type === 'income' ? '+' : '-' }}{{ formatCurrency(expense.amount) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Expense Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddExpenseModal" class="fixed inset-0 bg-black/50 flex items-end z-50" @click.self="closeAddExpenseModal">
          <div class="w-full bg-surface rounded-t-lg p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-serif text-primary">Add Expense</h3>
              <button @click="closeAddExpenseModal" class="p-2 hover:bg-surface-alt rounded-lg transition">
                <X class="w-5 h-5 text-text-muted hover:text-text" />
              </button>
            </div>

            <form @submit.prevent="handleAddExpense" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text mb-2">Type</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="expenseForm.type = 'expense'"
                    :class="[
                      'py-2 px-4 rounded-lg border transition',
                      expenseForm.type === 'expense'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-surface-alt border-border text-text hover:border-primary/30'
                    ]"
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    @click="expenseForm.type = 'income'"
                    :class="[
                      'py-2 px-4 rounded-lg border transition',
                      expenseForm.type === 'income'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-surface-alt border-border text-text hover:border-primary/30'
                    ]"
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Category</label>
                <select
                  v-model="expenseForm.category_id"
                  required
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
                >
                  <option value="" disabled>Select category</option>
                  <option
                    v-for="category in filteredCategories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Amount</label>
                <input
                  v-model.number="expenseForm.amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="0.00"
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none placeholder:text-text-muted"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Date</label>
                <input
                  v-model="expenseForm.transaction_date"
                  type="date"
                  required
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Description (optional)</label>
                <textarea
                  v-model="expenseForm.description"
                  rows="3"
                  placeholder="Add a note..."
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none placeholder:text-text-muted resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Loader v-if="isSubmitting" class="w-5 h-5 animate-spin" />
                <Plus v-else class="w-5 h-5" />
                {{ isSubmitting ? 'Adding...' : 'Add Expense' }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Add Category Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddCategoryModal" class="fixed inset-0 bg-black/50 flex items-end z-50" @click.self="closeAddCategoryModal">
          <div class="w-full bg-surface rounded-t-lg p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-serif text-primary">Add Category</h3>
              <button @click="closeAddCategoryModal" class="p-2 hover:bg-surface-alt rounded-lg transition">
                <X class="w-5 h-5 text-text-muted hover:text-text" />
              </button>
            </div>

            <form @submit.prevent="handleAddCategory" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text mb-2">Type</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="categoryForm.type = 'expense'"
                    :class="[
                      'py-2 px-4 rounded-lg border transition',
                      categoryForm.type === 'expense'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-surface-alt border-border text-text hover:border-primary/30'
                    ]"
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    @click="categoryForm.type = 'income'"
                    :class="[
                      'py-2 px-4 rounded-lg border transition',
                      categoryForm.type === 'income'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-surface-alt border-border text-text hover:border-primary/30'
                    ]"
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Name</label>
                <input
                  v-model="categoryForm.name"
                  type="text"
                  required
                  maxlength="100"
                  placeholder="e.g., Rent, Groceries, Salary"
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none placeholder:text-text-muted"
                />
              </div>

              <div>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="categoryForm.is_recurring"
                    type="checkbox"
                    class="w-4 h-4 rounded border-border bg-surface-alt text-primary focus:ring-primary/30"
                  />
                  <span class="text-sm text-text">Recurring monthly payment</span>
                </label>
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Color</label>
                <input
                  v-model="categoryForm.color"
                  type="color"
                  class="w-full h-12 rounded-lg border border-border cursor-pointer"
                />
              </div>

              <button
                type="submit"
                :disabled="isSubmittingCategory"
                class="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Loader v-if="isSubmittingCategory" class="w-5 h-5 animate-spin" />
                <Tag v-else class="w-5 h-5" />
                {{ isSubmittingCategory ? 'Adding...' : 'Add Category' }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Recurring Payment Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showRecurringModal" class="fixed inset-0 bg-black/50 flex items-end z-50" @click.self="closeRecurringModal">
          <div class="w-full bg-surface rounded-t-lg p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-serif text-primary">
                {{ editingRecurring ? 'Dauerauftrag bearbeiten' : 'Neuer Dauerauftrag' }}
              </h3>
              <button @click="closeRecurringModal" class="p-2 hover:bg-surface-alt rounded-lg transition">
                <X class="w-5 h-5 text-text-muted hover:text-text" />
              </button>
            </div>

            <form @submit.prevent="handleSaveRecurring" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text mb-2">Name</label>
                <input
                  v-model="recurringForm.name"
                  type="text"
                  required
                  maxlength="100"
                  placeholder="z.B. BJJ Gym, Cursor, Kindergarten"
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none placeholder:text-text-muted"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Betrag</label>
                <input
                  v-model.number="recurringForm.amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="0.00"
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none placeholder:text-text-muted"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Kategorie (optional)</label>
                <select
                  v-model="recurringForm.category_id"
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
                >
                  <option value="">Keine Kategorie</option>
                  <option
                    v-for="category in expenseCategories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text mb-2">Frequenz</label>
                  <select
                    v-model="recurringForm.frequency"
                    class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
                  >
                    <option value="weekly">Wöchentlich</option>
                    <option value="monthly">Monatlich</option>
                    <option value="yearly">Jährlich</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-text mb-2">
                    {{ recurringForm.frequency === 'weekly' ? 'Wochentag' : 'Tag des Monats' }}
                  </label>
                  <input
                    v-model.number="recurringForm.due_day"
                    type="number"
                    :min="1"
                    :max="recurringForm.frequency === 'weekly' ? 7 : 31"
                    required
                    class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text mb-2">Startdatum</label>
                  <input
                    v-model="recurringForm.start_date"
                    type="date"
                    required
                    class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text mb-2">Enddatum (optional)</label>
                  <input
                    v-model="recurringForm.end_date"
                    type="date"
                    class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="recurringForm.is_active"
                    type="checkbox"
                    class="w-4 h-4 rounded border-border bg-surface-alt text-primary focus:ring-primary/30"
                  />
                  <span class="text-sm text-text">Aktiv</span>
                </label>
              </div>

              <div>
                <label class="block text-sm font-medium text-text mb-2">Notizen (optional)</label>
                <textarea
                  v-model="recurringForm.notes"
                  rows="2"
                  placeholder="Zusätzliche Informationen..."
                  class="w-full bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none placeholder:text-text-muted resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmittingRecurring"
                class="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Loader v-if="isSubmittingRecurring" class="w-5 h-5 animate-spin" />
                <Repeat v-else class="w-5 h-5" />
                {{ isSubmittingRecurring ? 'Speichern...' : (editingRecurring ? 'Speichern' : 'Hinzufügen') }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  ArrowLeft,
  Plus,
  Tag,
  Camera,
  X,
  Loader,
  Repeat,
  Pencil,
  Trash2
} from 'lucide-vue-next'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

definePageMeta({
  middleware: 'auth'
})

// State
const currentDate = ref(new Date())
const expenses = ref<any[]>([])
const categories = ref<any[]>([])
const recurringPayments = ref<any[]>([])
const recurringMonthlyTotal = ref(0)
const loading = ref(false)
const isSubmitting = ref(false)
const isSubmittingCategory = ref(false)
const isSubmittingRecurring = ref(false)
const showAddExpenseModal = ref(false)
const showAddCategoryModal = ref(false)
const showRecurringModal = ref(false)
const editingRecurring = ref<any>(null)
const cameraInput = ref<HTMLInputElement | null>(null)

const expenseForm = ref({
  type: 'expense',
  category_id: '',
  amount: 0,
  transaction_date: new Date().toISOString().split('T')[0],
  description: ''
})

const categoryForm = ref({
  type: 'expense',
  name: '',
  is_recurring: false,
  color: '#6366f1'
})

const recurringForm = ref({
  name: '',
  amount: 0,
  category_id: '',
  frequency: 'monthly',
  due_day: 1,
  start_date: new Date().toISOString().split('T')[0],
  end_date: '',
  is_active: true,
  notes: ''
})

const totals = ref({
  expenses: 0,
  income: 0,
  balance: 0
})

/**
 * Current month name
 */
const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

/**
 * Filtered categories based on expense type
 */
const filteredCategories = computed(() => {
  return categories.value.filter(cat => cat.type === expenseForm.value.type)
})

/**
 * Expense categories only (for recurring payments)
 */
const expenseCategories = computed(() => {
  return categories.value.filter(cat => cat.type === 'expense')
})

/**
 * Format currency
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

/**
 * Format date
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

/**
 * Open add expense modal
 */
const openAddExpenseModal = () => {
  expenseForm.value = {
    type: 'expense',
    category_id: '',
    amount: 0,
    transaction_date: new Date().toISOString().split('T')[0],
    description: ''
  }
  showAddExpenseModal.value = true
}

/**
 * Close add expense modal
 */
const closeAddExpenseModal = () => {
  showAddExpenseModal.value = false
}

/**
 * Open add category modal
 */
const openAddCategoryModal = () => {
  categoryForm.value = {
    type: 'expense',
    name: '',
    is_recurring: false,
    color: '#6366f1'
  }
  showAddCategoryModal.value = true
}

/**
 * Close add category modal
 */
const closeAddCategoryModal = () => {
  showAddCategoryModal.value = false
}

/**
 * Open camera
 */
const openCamera = () => {
  cameraInput.value?.click()
}

/**
 * Handle camera capture
 */
const handleCameraCapture = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // TODO: Process image (OCR, upload, etc.)
    console.log('Image captured:', file)
    // For now, just open the add expense modal
    openAddExpenseModal()
  }
  // Reset input
  if (target) {
    target.value = ''
  }
}

/**
 * Handle add expense
 */
const handleAddExpense = async () => {
  if (!expenseForm.value.category_id || !expenseForm.value.amount) {
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/expenses', {
      method: 'POST',
      body: {
        category_id: expenseForm.value.category_id,
        amount: expenseForm.value.amount,
        transaction_date: expenseForm.value.transaction_date,
        description: expenseForm.value.description || null
      }
    })

    await loadExpenses()
    closeAddExpenseModal()
  } catch (error: any) {
    console.error('Error adding expense:', error)
    alert(error.data?.message || 'Failed to add expense')
  } finally {
    isSubmitting.value = false
  }
}

/**
 * Handle add category
 */
const handleAddCategory = async () => {
  if (!categoryForm.value.name.trim()) {
    return
  }

  isSubmittingCategory.value = true

  try {
    await $fetch('/api/expenses/categories', {
      method: 'POST',
      body: {
        name: categoryForm.value.name.trim(),
        type: categoryForm.value.type,
        is_recurring: categoryForm.value.is_recurring,
        color: categoryForm.value.color
      }
    })

    await loadCategories()
    closeAddCategoryModal()
  } catch (error: any) {
    console.error('Error adding category:', error)
    alert(error.data?.message || 'Failed to add category')
  } finally {
    isSubmittingCategory.value = false
  }
}

/**
 * Open recurring modal for new payment
 */
const openRecurringModal = () => {
  editingRecurring.value = null
  recurringForm.value = {
    name: '',
    amount: 0,
    category_id: '',
    frequency: 'monthly',
    due_day: 1,
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    is_active: true,
    notes: ''
  }
  showRecurringModal.value = true
}

/**
 * Close recurring modal
 */
const closeRecurringModal = () => {
  showRecurringModal.value = false
  editingRecurring.value = null
}

/**
 * Edit recurring payment
 */
const editRecurringPayment = (payment: any) => {
  editingRecurring.value = payment
  recurringForm.value = {
    name: payment.name,
    amount: parseFloat(payment.amount),
    category_id: payment.category_id || '',
    frequency: payment.frequency,
    due_day: payment.due_day,
    start_date: payment.start_date,
    end_date: payment.end_date || '',
    is_active: payment.is_active,
    notes: payment.notes || ''
  }
  showRecurringModal.value = true
}

/**
 * Handle save recurring payment (create or update)
 */
const handleSaveRecurring = async () => {
  if (!recurringForm.value.name.trim() || !recurringForm.value.amount) {
    return
  }

  isSubmittingRecurring.value = true

  try {
    const payload = {
      name: recurringForm.value.name.trim(),
      amount: recurringForm.value.amount,
      category_id: recurringForm.value.category_id || null,
      frequency: recurringForm.value.frequency,
      due_day: recurringForm.value.due_day,
      start_date: recurringForm.value.start_date,
      end_date: recurringForm.value.end_date || null,
      is_active: recurringForm.value.is_active,
      notes: recurringForm.value.notes || null
    }

    if (editingRecurring.value) {
      await $fetch(`/api/recurring-payments/${editingRecurring.value.id}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $fetch('/api/recurring-payments', {
        method: 'POST',
        body: payload
      })
    }

    await loadRecurringPayments()
    closeRecurringModal()
  } catch (error: any) {
    console.error('Error saving recurring payment:', error)
    alert(error.data?.message || 'Failed to save recurring payment')
  } finally {
    isSubmittingRecurring.value = false
  }
}

/**
 * Delete recurring payment
 */
const deleteRecurringPayment = async (id: number) => {
  if (!confirm('Dauerauftrag wirklich löschen?')) {
    return
  }

  try {
    await $fetch(`/api/recurring-payments/${id}`, {
      method: 'DELETE'
    })
    await loadRecurringPayments()
  } catch (error: any) {
    console.error('Error deleting recurring payment:', error)
    alert(error.data?.message || 'Failed to delete recurring payment')
  }
}

/**
 * Load recurring payments
 */
const loadRecurringPayments = async () => {
  try {
    const response = await $fetch('/api/recurring-payments')
    recurringPayments.value = response.payments || []
    recurringMonthlyTotal.value = response.monthlyTotal || 0
  } catch (error) {
    console.error('Error loading recurring payments:', error)
  }
}

/**
 * Load expenses
 */
const loadExpenses = async () => {
  loading.value = true

  try {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth() + 1

    const response = await $fetch('/api/expenses', {
      query: { year, month }
    })

    expenses.value = response.expenses || []
    totals.value = response.totals || { expenses: 0, income: 0, balance: 0 }
  } catch (error) {
    console.error('Error loading expenses:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Load categories
 */
const loadCategories = async () => {
  try {
    const response = await $fetch('/api/expenses/categories')
    categories.value = response.categories || []
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

/**
 * Initialize on mount
 */
onMounted(async () => {
  await Promise.all([loadExpenses(), loadCategories(), loadRecurringPayments()])
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active :deep(.bg-surface) {
  animation: slide-up 0.3s ease;
}

.modal-leave-active :deep(.bg-surface) {
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

