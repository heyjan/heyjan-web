<template>
  <div class="min-h-screen bg-dark-300">
    <AppHeader />
    
    <main class="section-padding">
      <div class="max-w-4xl mx-auto">
        <Breadcrumb />
        <h1 class="text-4xl md:text-5xl font-serif text-white mb-4 mt-4">Blog</h1>
        <div class="h-px bg-gradient-to-r from-primary via-gray-700 to-transparent mb-8"></div>
        <p class="text-lg text-gray-200/70 mb-12">
          Thoughts, tutorials, and insights on web development, AI, and technology.
        </p>

        <div v-if="pending" class="text-center py-12">
          <p class="text-gray-200/60">Loading articles...</p>
        </div>

        <div v-else-if="articles && articles.length > 0" class="space-y-6">
          <article
            v-for="article in articles"
            :key="article._path"
            class="bg-dark-100/40 border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 group"
          >
            <NuxtLink :to="article._path" class="block">
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-sm text-gray-200/60">
                    {{ formatDate(article.date) }}
                  </span>
                  <span v-if="article.author" class="text-sm text-gray-200/60">
                    <span class="text-gray-200/40">·</span>
                    <NuxtLink
                      :to="article.authorUrl || '/jan-mayer'"
                      class="hover:text-primary transition-colors"
                      aria-label="Author page"
                    >
                      {{ article.author }}
                    </NuxtLink>
                  </span>
                  <span v-if="article.tags" class="flex gap-2">
                    <span
                      v-for="tag in article.tags"
                      :key="tag"
                      class="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {{ tag }}
                    </span>
                  </span>
                </div>
                
                <h2 class="text-2xl font-serif text-white mb-3 group-hover:text-primary transition-colors">
                  {{ article.title }}
                </h2>
                
                <p v-if="article.description" class="text-gray-200/70 mb-4">
                  {{ article.description }}
                </p>
                
                <div class="flex items-center text-primary font-medium">
                  Read more
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-200/60">No articles found.</p>
          <p v-if="error" class="text-red-400 text-sm mt-2">Error: {{ error.message }}</p>
          <p v-if="articles !== null" class="text-gray-200/70 text-sm mt-2">
            Found {{ articles?.length || 0 }} articles. 
            <span v-if="articles && articles.length === 0">Check browser console for query details.</span>
          </p>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

useHead({
  title: 'Blog | Jan Mayer',
  meta: [
    { name: 'description', content: 'Technical articles by Jan Mayer on web development, enterprise AI, Azure AI Foundry, RAG architectures, and modern full-stack development practices.' }
  ]
})

const { data: articles, pending, error } = await useAsyncData('blog-articles', async () => {
  try {
    return await $fetch('/api/blog')
  } catch (err) {
    console.error('Error querying blog articles:', err)
    return []
  }
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>


