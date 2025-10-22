<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main>
      <ContactSection />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import ContactSection from '~/components/sections/ContactSection.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

// Set up page metadata
useHead({
  title: 'Get In Touch - Jan Mayer',
  meta: [
    { name: 'description', content: 'Contact Jan Mayer for project inquiries and collaboration opportunities' }
  ]
})
</script>
