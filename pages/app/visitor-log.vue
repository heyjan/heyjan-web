<template>
  <div class="min-h-screen bg-background p-4 relative overflow-hidden">
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="mb-6">
        <Breadcrumb />
      </div>

      <div class="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 class="text-4xl font-serif text-primary">Visitor Log</h1>
          <p class="text-sm text-text-muted">Recent tracked visits</p>
        </div>
        <NuxtLink
          to="/app"
          class="p-2 hover:bg-surface-alt/50 rounded-lg transition"
          title="Back to Dashboard"
        >
          <ArrowLeft class="w-6 h-6 text-text-muted hover:text-primary transition" />
        </NuxtLink>
      </div>

      <div class="h-px bg-gradient-to-r from-primary/20 to-transparent mb-6"></div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <div class="p-4 bg-surface border border-border rounded-lg">
          <p class="text-xs text-text-muted uppercase">Events</p>
          <p class="text-2xl font-semibold text-text">{{ stats.total_events || 0 }}</p>
        </div>
        <div class="p-4 bg-surface border border-border rounded-lg">
          <p class="text-xs text-text-muted uppercase">Visitor IDs</p>
          <p class="text-2xl font-semibold text-text">{{ stats.unique_visitor_ids || 0 }}</p>
        </div>
        <div class="p-4 bg-surface border border-border rounded-lg">
          <p class="text-xs text-text-muted uppercase">Fingerprints</p>
          <p class="text-2xl font-semibold text-text">{{ stats.unique_fingerprints || 0 }}</p>
        </div>
        <div class="p-4 bg-surface border border-border rounded-lg">
          <p class="text-xs text-text-muted uppercase">IP Hashes</p>
          <p class="text-2xl font-semibold text-text">{{ stats.unique_ip_hashes || 0 }}</p>
        </div>
        <div class="p-4 bg-surface border border-border rounded-lg">
          <p class="text-xs text-text-muted uppercase">With Company</p>
          <p class="text-2xl font-semibold text-text">{{ stats.events_with_company || 0 }}</p>
        </div>
      </div>

      <div class="p-4 bg-surface border border-border rounded-lg mb-6 flex flex-col md:flex-row gap-3">
        <input
          v-model="search"
          type="text"
          placeholder="Search path, token, company, org..."
          class="flex-1 bg-surface-alt border border-border text-text rounded-lg px-4 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none placeholder:text-text-muted"
          @keydown.enter="handleSearch"
        />
        <select
          v-model.number="limit"
          class="bg-surface-alt border border-border text-text rounded-lg px-3 py-2 focus:border-primary/50 focus:ring-primary/30 focus:outline-none"
        >
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
          <option :value="200">200</option>
        </select>
        <button
          @click="handleSearch"
          class="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition font-medium"
        >
          Search
        </button>
        <button
          @click="refresh"
          class="px-4 py-2 bg-surface-alt hover:bg-surface-alt/70 text-text rounded-lg transition font-medium border border-border"
        >
          Refresh
        </button>
      </div>

      <div v-if="loading" class="text-center py-12">
        <Loader class="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        <p class="text-sm text-text-muted">Loading visitor events...</p>
      </div>

      <div v-else-if="rows.length === 0" class="text-center py-10 bg-surface border border-border rounded-lg">
        <p class="text-sm text-text-muted">No visitor events found.</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="row in rows"
          :key="row.id"
          class="bg-surface border border-border rounded-lg p-4"
        >
          <div class="flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs text-text-muted">{{ formatDate(row.visited_at) }}</span>
                <span v-if="row.ref_token" class="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">ref={{ row.ref_token }}</span>
                <span v-if="row.company_name" class="text-xs px-2 py-0.5 rounded bg-green-600/10 text-green-700">{{ row.company_name }}</span>
                <span v-if="row.is_hosting" class="text-xs px-2 py-0.5 rounded bg-yellow-600/10 text-yellow-700">hosting</span>
              </div>
              <p class="text-sm text-text break-all">{{ row.full_path || row.path }}</p>
              <p class="text-xs text-text-muted break-all">
                {{ row.org || row.reverse_dns || 'unknown source' }}
              </p>
            </div>

            <button
              class="self-start lg:self-auto p-2 hover:bg-surface-alt/60 rounded transition"
              @click="toggleExpanded(row.id)"
            >
              <ChevronDown v-if="expandedRowId !== row.id" class="w-5 h-5 text-text-muted" />
              <ChevronUp v-else class="w-5 h-5 text-text-muted" />
            </button>
          </div>

          <div v-if="expandedRowId === row.id" class="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div class="space-y-1">
              <p><span class="text-text-muted">visitor_id:</span> <span class="break-all text-text">{{ row.visitor_id }}</span></p>
              <p><span class="text-text-muted">fingerprint_hash:</span> <span class="break-all text-text">{{ row.fingerprint_hash }}</span></p>
              <p><span class="text-text-muted">ip:</span> <span class="break-all text-text">{{ row.ip_address }}</span></p>
              <p><span class="text-text-muted">ip_hash:</span> <span class="break-all text-text">{{ row.ip_hash }}</span></p>
              <p><span class="text-text-muted">country:</span> <span class="text-text">{{ formatLocation(row) }}</span></p>
            </div>
            <div class="space-y-1">
              <p><span class="text-text-muted">user-agent:</span> <span class="break-all text-text">{{ row.user_agent || '-' }}</span></p>
              <p><span class="text-text-muted">accept-language:</span> <span class="text-text">{{ row.accept_language || '-' }}</span></p>
              <p><span class="text-text-muted">referrer:</span> <span class="break-all text-text">{{ row.referrer || '-' }}</span></p>
              <p><span class="text-text-muted">timezone:</span> <span class="text-text">{{ row.timezone || '-' }}</span></p>
              <p><span class="text-text-muted">asn:</span> <span class="text-text">{{ row.asn || '-' }}</span></p>
            </div>
            <div class="md:col-span-2">
              <p class="text-text-muted mb-1">fingerprint_json:</p>
              <pre class="text-xs bg-surface-alt border border-border rounded-lg p-3 overflow-auto text-text whitespace-pre-wrap">{{ formatFingerprint(row.fingerprint_json) }}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p class="text-sm text-text-muted">
          Showing {{ rows.length }} / {{ pagination.total }} events
        </p>
        <div class="flex items-center gap-2">
          <button
            @click="previousPage"
            :disabled="pagination.offset === 0 || loading"
            class="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text hover:bg-surface-alt/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            @click="nextPage"
            :disabled="pagination.offset + pagination.limit >= pagination.total || loading"
            class="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text hover:bg-surface-alt/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ArrowLeft, ChevronDown, ChevronUp, Loader } from 'lucide-vue-next'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

definePageMeta({
  middleware: 'auth'
})

type VisitorRow = {
  id: number
  visited_at: string
  path: string
  full_path: string
  ref_token: string | null
  visitor_id: string | null
  fingerprint_hash: string | null
  ip_address: string | null
  ip_hash: string | null
  reverse_dns: string | null
  company_name: string | null
  asn: string | null
  org: string | null
  city: string | null
  region: string | null
  country: string | null
  timezone: string | null
  is_hosting: number | boolean
  user_agent: string | null
  accept_language: string | null
  referrer: string | null
  fingerprint_json: string | null
}

type Pagination = {
  total: number
  limit: number
  offset: number
}

type Stats = {
  total_events: number
  unique_visitor_ids: number
  unique_fingerprints: number
  unique_ip_hashes: number
  events_with_company: number
}

const loading = ref(false)
const rows = ref<VisitorRow[]>([])
const search = ref('')
const limit = ref(50)
const pagination = ref<Pagination>({
  total: 0,
  limit: 50,
  offset: 0
})
const expandedRowId = ref<number | null>(null)
const stats = ref<Stats>({
  total_events: 0,
  unique_visitor_ids: 0,
  unique_fingerprints: 0,
  unique_ip_hashes: 0,
  events_with_company: 0
})

const loadVisitors = async () => {
  loading.value = true

  try {
    const response = await $fetch<{
      success: boolean
      rows: VisitorRow[]
      pagination: Pagination
      stats: Stats
    }>('/api/app/visitors', {
      query: {
        limit: limit.value,
        offset: pagination.value.offset,
        search: search.value || undefined
      }
    })

    rows.value = response.rows || []
    pagination.value = response.pagination || pagination.value
    stats.value = response.stats || stats.value
  } catch (error) {
    console.error('Failed to load visitor events:', error)
    rows.value = []
  } finally {
    loading.value = false
  }
}

const formatDate = (value: string): string => {
  const date = new Date(value)
  return date.toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })
}

const formatLocation = (row: VisitorRow): string => {
  const parts = [row.city, row.region, row.country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : '-'
}

const formatFingerprint = (value: string | null): string => {
  if (!value) return '-'
  try {
    return JSON.stringify(JSON.parse(value), null, 2)
  } catch {
    return value
  }
}

const toggleExpanded = (id: number) => {
  expandedRowId.value = expandedRowId.value === id ? null : id
}

const handleSearch = async () => {
  pagination.value.offset = 0
  await loadVisitors()
}

const nextPage = async () => {
  pagination.value.offset += pagination.value.limit
  await loadVisitors()
}

const previousPage = async () => {
  pagination.value.offset = Math.max(0, pagination.value.offset - pagination.value.limit)
  await loadVisitors()
}

const refresh = async () => {
  await loadVisitors()
}

watch(limit, async (newLimit) => {
  pagination.value.limit = newLimit
  pagination.value.offset = 0
  await loadVisitors()
})

onMounted(async () => {
  await loadVisitors()
})
</script>
