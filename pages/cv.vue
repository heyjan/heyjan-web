<template>
  <div class="min-h-screen">
    <AppHeader />

    <main>
      <div class="section-padding">
        <div class="max-w-5xl mx-auto">
          <Breadcrumb />
          <h1 class="text-4xl md:text-5xl font-serif text-text mb-4 mt-4">Curriculum Vitae</h1>
          <div class="h-px bg-gradient-to-r from-primary via-border to-transparent mb-8"></div>
        </div>
      </div>
      
      <!-- Row 1: Skills + Interests + Languages | Work Experience -->
      <div class="section-padding">
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div class="flex flex-col gap-8">
              <SkillsSection />
              <InterestsSection />
              <LanguageSection />
            </div>
            <WorkExperienceSection />
          </div>
        </div>
      </div>
      
      <!-- Row 2: AI & Cloud | Software -->
      <div class="section-padding bg-surface">
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AIAndCloudSection />
            <SoftwareSection />
          </div>
        </div>
      </div>
      
      <!-- Row 4: Contact Form (full width) -->
      <ContactSection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
import AIAndCloudSection from '~/components/sections/AIAndCloudSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import InterestsSection from '~/components/sections/InterestsSection.vue'
import LanguageSection from '~/components/sections/LanguageSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import SoftwareSection from '~/components/sections/SoftwareSection.vue'
import WorkExperienceSection from '~/components/sections/WorkExperienceSection.vue'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'Curriculum Vitae - Jan Mayer',
  description: 'Curriculum vitae of Jan Mayer; AI Solution Architect and Full-Stack Developer based in Ulm, Germany.',
  ogTitle: 'Curriculum Vitae - Jan Mayer',
  ogDescription: 'Curriculum vitae of Jan Mayer; AI Solution Architect and Full-Stack Developer based in Ulm, Germany.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'profile',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Curriculum Vitae - Jan Mayer',
  twitterDescription: 'Curriculum vitae of Jan Mayer; AI Solution Architect and Full-Stack Developer.',
  twitterImage: 'https://heyjan.de/images/profile.jpg',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  })
})
</script>
