<template>
  <div class="min-h-screen">
    <AppHeader />

    <main>
      <div class="section-padding">
        <div class="max-w-4xl mx-auto">
          <Breadcrumb />
        </div>
      </div>
      <AIAndCloudSection />
      <SkillsSection />
      <WorkExperienceSection />
      <SoftwareSection />
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
import SkillsSection from '~/components/sections/SkillsSection.vue'
import SoftwareSection from '~/components/sections/SoftwareSection.vue'
import WorkExperienceSection from '~/components/sections/WorkExperienceSection.vue'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'CV',
  description: 'Curriculum vitae of Jan Mayer — AI Solution Architect and Full-Stack Developer based in Ulm, Germany.',
  ogTitle: 'CV · Jan Mayer',
  ogDescription: 'Curriculum vitae of Jan Mayer — AI Solution Architect and Full-Stack Developer based in Ulm, Germany.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'profile',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CV · Jan Mayer',
  twitterDescription: 'Curriculum vitae of Jan Mayer — AI Solution Architect and Full-Stack Developer.',
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


