<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main>
      <div class="section-padding">
        <div class="max-w-4xl mx-auto">
          <Breadcrumb />
          <h1 class="text-4xl md:text-5xl font-serif text-white mb-4 mt-4">Contact</h1>
          <div class="h-px bg-gradient-to-r from-primary via-gray-700 to-transparent mb-8" />
        </div>
      </div>
      <ContactSection />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import ContactSection from '~/components/sections/ContactSection.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'Contact',
  description: 'Contact Jan Mayer for AI consulting, solution architecture, and full-stack development. Based in Ulm, Germany.',
  ogTitle: 'Contact - Jan Mayer',
  ogDescription: 'Contact Jan Mayer for AI consulting, solution architecture, and full-stack development. Based in Ulm, Germany.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'website',
  ogSiteName: 'Jan Mayer',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Contact - Jan Mayer',
  twitterDescription: 'Contact Jan Mayer for AI consulting and full-stack development projects.',
  twitterImage: 'https://heyjan.de/images/profile.jpg',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})
</script>
