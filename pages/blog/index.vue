<template>
  <div class="min-h-screen bg-background">
    <AppHeader />
    
    <main class="section-padding">
      <div class="max-w-6xl mx-auto">
        <Breadcrumb />
        <h1 class="text-4xl md:text-5xl font-serif text-text mb-4 mt-4">Blog</h1>
        <div class="h-px bg-gradient-to-r from-primary via-border to-transparent mb-8"></div>
        <p class="text-lg text-text-muted mb-12">
          Sharing my journey building AI solutions, exploring modern web development, AI security, and documenting the lessons learned along the way.
        </p>

        <div v-if="pending" class="text-center py-12">
          <p class="text-text-muted/60">Loading articles...</p>
        </div>

        <div v-else-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article
            v-for="article in articles"
            :key="article._path"
            class="bg-surface border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 group flex flex-col shadow-sm"
          >
            <!-- Image -->
            <NuxtLink
              :to="article._path"
              class="block overflow-hidden"
              :aria-label="`Read article: ${article.title || 'Blog post'}`"
            >
              <NuxtImg
                v-if="article.image"
                :src="article.image"
                :alt="article.imageTitle || article.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div 
                v-else 
                class="w-full h-48 bg-gradient-to-br from-primary/20 via-highlight/30 to-surface flex items-center justify-center"
              >
                <span class="text-4xl text-primary/60 font-serif">{{ article.title?.charAt(0) || 'B' }}</span>
              </div>
            </NuxtLink>
            
            <div class="p-6 flex flex-col flex-grow">
              <!-- Tags -->
              <div v-if="article.tags" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in article.tags.slice(0, 3)"
                  :key="tag"
                  class="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  {{ tag }}<span v-if="article.tags.indexOf(tag) < Math.min(article.tags.length, 3) - 1" class="text-gray-500 mx-2">·</span>
                </span>
              </div>

              <!-- Title -->
              <NuxtLink
                :to="article._path"
                class="block group/title"
                :aria-label="`Read article: ${article.title || 'Blog post'}`"
              >
                <h2 class="text-xl font-serif text-text mb-3 group-hover/title:text-primary transition-colors leading-tight">
                  {{ article.title }}
                </h2>
              </NuxtLink>

              <!-- Description -->
              <p v-if="article.description" class="text-text-muted text-sm mb-4 flex-grow line-clamp-3">
                {{ article.description }}
              </p>

              <!-- Author + Date -->
              <footer class="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                <div class="flex flex-col">
                  <NuxtLink
                    v-if="article.author"
                    :to="article.authorUrl || '/jan-mayer'"
                    class="text-sm text-text hover:text-primary transition-colors"
                    aria-label="Author page"
                  >
                    {{ article.author }}
                  </NuxtLink>
                  <time class="text-xs text-text-muted/70">
                    {{ formatDate(article.date) }}
                  </time>
                </div>
              </footer>
            </div>
          </article>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-text-muted">No articles found.</p>
          <p v-if="error" class="text-red-500 text-sm mt-2">Error: {{ error.message }}</p>
          <p v-if="articles !== null" class="text-text-muted text-sm mt-2">
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

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'Blog',
  description: 'Technical articles on enterprise AI, Azure AI Foundry, RAG architectures, and full-stack development.',
  ogTitle: 'Blog - Jan Mayer',
  ogDescription: 'Technical articles on enterprise AI, Azure AI Foundry, RAG architectures, and full-stack development.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'website',
  ogSiteName: 'Jan Mayer',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Blog - Jan Mayer',
  twitterDescription: 'Technical articles on enterprise AI, Azure AI Foundry, RAG architectures, and full-stack development.',
  twitterImage: 'https://heyjan.de/images/profile.jpg',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
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


