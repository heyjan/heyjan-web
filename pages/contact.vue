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

// Set up page metadata
useHead({
  title: 'Get In Touch - Jan Mayer',
  meta: [
    { name: 'description', content: 'Get in touch with Jan Mayer for AI consulting, enterprise solution architecture, and full-stack development projects. Based in Ulm, Germany; available for remote work.' }
  ]
})
</script>
