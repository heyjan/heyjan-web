<template>
  <nav aria-label="Breadcrumb" class="breadcrumb-container">
    <ol class="flex items-center gap-2 text-sm text-text-muted">
      <li>
        <NuxtLink 
          to="/" 
          class="hover:text-primary transition-colors"
        >
          Home
        </NuxtLink>
      </li>
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <li class="flex items-center gap-2">
          <span class="text-border">/</span>
          <NuxtLink 
            v-if="item.to"
            :to="item.to"
            class="hover:text-primary transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span 
            v-else
            class="text-text"
          >
            {{ item.label }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Custom title for the current page (e.g., article title for blog posts)
   */
  customTitle: {
    type: String,
    default: null
  }
})

const route = useRoute()

/**
 * Format a path segment into a readable label
 * @param {string} segment - The path segment to format
 * @returns {string} Formatted label
 */
const formatLabel = (segment) => {
  if (!segment) return ''
  
  // Handle special cases
  const specialCases = {
    'datenschutz': 'Datenschutz',
    'impressum': 'Impressum',
    'contact': 'Contact',
    'blog': 'Blog',
    'test': 'Test',
    'app': 'App',
    'auth': 'Auth',
    'login': 'Login',
    'register': 'Register',
    'gym-tracker': 'Gym Tracker',
    'expense-manager': 'Expense Manager'
  }
  
  if (specialCases[segment.toLowerCase()]) {
    return specialCases[segment.toLowerCase()]
  }
  
  // Capitalize and replace dashes/underscores with spaces
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Generate breadcrumb items from the current route
 */
const breadcrumbItems = computed(() => {
  const items = []
  const pathSegments = route.path.split('/').filter(Boolean)
  
  // Handle blog article pages specially
  if (route.path.startsWith('/blog/') && route.params.slug) {
    items.push({
      label: 'Blog',
      to: '/blog'
    })
    
    // Use custom title prop if provided, otherwise try route meta or formatted slug
    const articleTitle = props.customTitle || route.meta?.title || formatLabel(route.params.slug)
    items.push({
      label: articleTitle,
      to: null // Last item is not a link
    })
    
    return items
  }
  
  // Build breadcrumbs for other routes
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    
    // Use custom title for the last segment if provided
    const label = isLast && props.customTitle ? props.customTitle : formatLabel(segment)
    
    items.push({
      label: label,
      to: isLast ? null : currentPath
    })
  })
  
  return items
})
</script>

<style scoped>
.breadcrumb-container {
  padding: 1rem 0;
}

@media (max-width: 640px) {
  .breadcrumb-container {
    padding: 0.75rem 0;
  }
  
  .breadcrumb-container ol {
    font-size: 0.875rem;
  }
}
</style>

