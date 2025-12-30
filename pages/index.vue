<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main>
      <HeroSection />
      <ServicesSection />
      <FeaturedProjects />
      <LatestPosts />
      <ContactSection />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import FeaturedProjects from '~/components/sections/FeaturedProjects.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import LatestPosts from '~/components/sections/LatestPosts.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'Jan Mayer',
  description: 'AI Solution Architect and Full-Stack Developer based in Ulm, Germany — enterprise AI, Azure AI Foundry, and RAG architectures.',
  ogTitle: 'Jan Mayer',
  ogDescription: 'AI Solution Architect and Full-Stack Developer based in Ulm, Germany — enterprise AI, Azure AI Foundry, and RAG architectures.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Jan Mayer',
  twitterDescription: 'AI Solution Architect and Full-Stack Developer — enterprise AI, Azure AI Foundry, and RAG architectures.',
  twitterImage: 'https://heyjan.de/images/profile.jpg',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})
</script>