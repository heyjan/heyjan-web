<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main>
      <HeroSection />
      <LazyServicesSection hydrate-on-visible />
      <LazyFeaturedCaseStudy hydrate-on-visible />
      <!-- <FeaturedProjects /> -->
      <LazyLatestPosts hydrate-on-visible />
      <LazyContactSection hydrate-on-visible />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
// import FeaturedProjects from '~/components/sections/FeaturedProjects.vue'
import HeroSection from '~/components/sections/HeroSection.vue'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  description: 'AI Solution Architect and Full-Stack Developer based in Ulm, Germany. Enterprise AI, Azure AI Foundry, and RAG architectures.',
  ogTitle: 'Jan Mayer - AI Solution Architect & Consultant',
  ogDescription: 'AI Solution Architect and Full-Stack Developer based in Ulm, Germany. Enterprise AI, Azure AI Foundry, and RAG architectures.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Jan Mayer - AI Solution Architect & Consultant',
  twitterDescription: 'AI Solution Architect and Full-Stack Developer. Enterprise AI, Azure AI Foundry, and RAG architectures.',
  twitterImage: 'https://heyjan.de/images/profile.jpg',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})
</script>
