<template>
  <div class="min-h-screen bg-dark-300">
    <AppHeader />
    
    <main class="section-padding">
      <div class="max-w-4xl mx-auto">
        <div v-if="pending" class="text-center py-12">
          <p class="text-gray-200/60">Loading article...</p>
        </div>

        <div v-else-if="article" class="bg-dark-100/40 border border-primary/10 rounded-lg overflow-hidden">
          <article class="p-8 md:p-12">
            <!-- Article Header -->
            <div class="mb-8">
              <NuxtLink 
                to="/blog" 
                class="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </NuxtLink>
              
              <h1 class="text-4xl md:text-5xl font-serif text-white mb-4">
                {{ article.title }}
              </h1>
              
              <div class="flex flex-wrap items-center gap-4 text-gray-200/70 mb-6">
                <span v-if="article.date" class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(article.date) }}
                </span>
                
                <span v-if="article.author" class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ article.author }}
                </span>
              </div>
              
              <div v-if="article.tags" class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {{ tag }}
                </span>
              </div>
              
              <p v-if="article.description" class="text-xl text-gray-200 leading-relaxed">
                {{ article.description }}
              </p>
            </div>

            <!-- Article Content -->
            <div class="prose prose-lg max-w-none">
              <ContentRenderer v-if="article.body" :value="article" />
            </div>
          </article>
        </div>

        <div v-else class="text-center py-12">
          <h1 class="text-2xl font-serif text-white mb-4">Article Not Found</h1>
          <p class="text-gray-200/70 mb-6">The article you're looking for doesn't exist.</p>
          <NuxtLink 
            to="/blog" 
            class="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-dark-300 rounded-lg transition-colors font-medium"
          >
            Back to Blog
          </NuxtLink>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

const route = useRoute()
const slug = route.params.slug

const { data: article, pending } = await useAsyncData(`blog-article-${slug}`, async () => {
  try {
    return await $fetch(`/api/blog/${slug}`)
  } catch (err) {
    console.error('Error querying blog article:', err)
    return null
  }
})

useHead({
  title: article.value ? `${article.value.title} | Blog` : 'Article Not Found',
  meta: [
    { 
      name: 'description', 
      content: article.value?.description || 'Blog article' 
    }
  ]
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

<style>
.prose {
  color: #E5E5E5;
}

.prose h2 {
  font-size: 1.875rem;
  font-family: var(--font-family-serif);
  color: white;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.5rem;
  font-family: var(--font-family-serif);
  color: white;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
  color: #E5E5E5;
}

.prose ul, .prose ol {
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  color: #E5E5E5;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose code {
  background-color: #252525;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;
  color: var(--color-primary);
}

.prose pre {
  background-color: #252525;
  border: 1px solid rgba(212, 165, 116, 0.2);
  color: #E5E5E5;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: #E5E5E5;
}

.prose a {
  color: var(--color-primary);
  text-decoration: underline;
}

.prose a:hover {
  color: rgba(212, 165, 116, 0.8);
}

.prose blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
  color: #A1A1A1;
}

.prose strong {
  color: white;
  font-weight: 600;
}
</style>


