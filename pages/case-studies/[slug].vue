<template>
  <div class="min-h-screen bg-dark-300">
    <AppHeader />
    
    <main class="section-padding">
      <div class="max-w-[67rem] mx-auto">
        <Breadcrumb :custom-title="caseStudy?.title" />
        
        <div v-if="pending" class="text-center py-12">
          <p class="text-gray-200/60">Loading case study...</p>
        </div>

        <div v-else-if="caseStudy" class="bg-dark-100/40 border border-primary/10 rounded-lg overflow-hidden mt-4">
          <article class="p-8 md:p-12">
            <div class="mb-8">
              <NuxtLink 
                to="/case-studies" 
                class="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Case Studies
              </NuxtLink>
              
              <h1 class="text-4xl md:text-5xl font-serif text-primary mb-4">
                {{ caseStudy.title }}
              </h1>

              <img
                v-if="caseStudy.meta?.image"
                :src="caseStudy.meta.image"
                :alt="caseStudy.title ? `Hero image for: ${caseStudy.title}` : 'Case study hero image'"
                :title="caseStudy.meta?.imageTitle || (caseStudy.title ? `Hero image for: ${caseStudy.title}` : 'Case study hero image')"
                class="w-full h-auto rounded-lg border border-primary/10 mb-6"
                loading="lazy"
              />

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-dark-200/50 rounded-lg border border-primary/10">
                <div v-if="caseStudy.meta?.client">
                  <span class="text-xs text-gray-400 uppercase tracking-wider">Client</span>
                  <p class="text-white font-medium">{{ caseStudy.meta.client }}</p>
                </div>
                <div v-if="caseStudy.meta?.industry">
                  <span class="text-xs text-gray-400 uppercase tracking-wider">Industry</span>
                  <p class="text-white font-medium">{{ caseStudy.meta.industry }}</p>
                </div>
                <div v-if="caseStudy.meta?.duration">
                  <span class="text-xs text-gray-400 uppercase tracking-wider">Duration</span>
                  <p class="text-white font-medium">{{ caseStudy.meta.duration }}</p>
                </div>
                <div v-if="caseStudy.meta?.date">
                  <span class="text-xs text-gray-400 uppercase tracking-wider">Published</span>
                  <p class="text-white font-medium">{{ formatDate(caseStudy.meta.date) }}</p>
                </div>
              </div>
              
              <div v-if="caseStudy.meta?.tags" class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tag in caseStudy.meta.tags"
                  :key="tag"
                  class="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="prose prose-lg max-w-none">
              <ContentRenderer v-if="caseStudy.body" :value="caseStudy" />
            </div>
          </article>
        </div>

        <div v-else class="text-center py-12">
          <h1 class="text-2xl font-serif text-white mb-4">Case Study Not Found</h1>
          <p class="text-gray-200/70 mb-6">The case study you're looking for doesn't exist.</p>
          <NuxtLink 
            to="/case-studies" 
            class="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-dark-300 rounded-lg transition-colors font-medium"
          >
            Back to Case Studies
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
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

const route = useRoute()
const slug = route.params.slug

const { data: caseStudy, pending } = await useAsyncData(`case-study-${slug}`, async () => {
  try {
    return await $fetch(`/api/case-studies/${slug}`)
  } catch (err) {
    console.error('Error querying case study:', err)
    return null
  }
})

const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)
const authorName = computed(() => caseStudy.value?.meta?.author || 'Jan Mayer')
const publisherName = computed(() => caseStudy.value?.meta?.publisher || 'Jan Mayer')
const keywords = computed(() => {
  if (caseStudy.value?.meta?.keywords) {
    return Array.isArray(caseStudy.value.meta.keywords) 
      ? caseStudy.value.meta.keywords.join(', ')
      : caseStudy.value.meta.keywords
  }
  if (caseStudy.value?.meta?.tags) {
    return Array.isArray(caseStudy.value.meta.tags)
      ? caseStudy.value.meta.tags.join(', ')
      : caseStudy.value.meta.tags
  }
  return ''
})

useHead({
  title: caseStudy.value ? `${caseStudy.value.title} | Case Studies | Jan Mayer` : 'Case Study Not Found',
  meta: [
    { 
      name: 'description', 
      content: caseStudy.value?.description || 'Case study' 
    },
    {
      name: 'author',
      content: authorName.value
    },
    {
      name: 'publisher',
      content: publisherName.value
    },
    ...(keywords.value ? [{
      name: 'keywords',
      content: keywords.value
    }] : []),
    {
      property: 'og:author',
      content: authorName.value
    },
    {
      property: 'og:publisher',
      content: publisherName.value
    },
    {
      property: 'article:author',
      content: authorName.value
    },
    {
      property: 'article:published_time',
      content: caseStudy.value?.meta?.date || ''
    },
    ...(caseStudy.value?.meta?.tags ? caseStudy.value.meta.tags.map(tag => ({
      property: 'article:tag',
      content: tag
    })) : [])
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value }
  ]
})

useSeoMeta({
  title: caseStudy.value ? `${caseStudy.value.title} | Case Studies | Jan Mayer` : 'Case Study Not Found',
  description: caseStudy.value?.description || 'Case study',
  ogTitle: caseStudy.value ? `${caseStudy.value.title} | Case Studies | Jan Mayer` : 'Case Study Not Found',
  ogDescription: caseStudy.value?.description || 'Case study',
  ogImage: caseStudy.value?.meta?.image ? `https://heyjan.de${caseStudy.value.meta.image}` : 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  ogSiteName: 'Jan Mayer',
  articlePublishedTime: caseStudy.value?.meta?.date || '',
  twitterCard: 'summary_large_image',
  twitterTitle: caseStudy.value ? `${caseStudy.value.title} | Case Studies | Jan Mayer` : 'Case Study Not Found',
  twitterDescription: caseStudy.value?.description || 'Case study',
  twitterImage: caseStudy.value?.meta?.image ? `https://heyjan.de${caseStudy.value.meta.image}` : 'https://heyjan.de/images/profile.jpg',
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
  color: var(--color-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.5rem;
  font-family: var(--font-family-serif);
  color: var(--color-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose h4,
.prose h5,
.prose h6 {
  color: var(--color-primary);
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
  color: #E5E5E5;
}

.prose pre {
  background-color: #E5E5E5;
  border: 1px solid rgba(212, 165, 116, 0.2);
  color: #1E1E1E;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  position: relative;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: #1E1E1E;
}

.prose a {
  color: var(--color-primary);
  text-decoration: underline;
}

.prose h2 a,
.prose h3 a,
.prose h4 a,
.prose h5 a,
.prose h6 a {
  text-decoration: none;
  color: inherit;
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
