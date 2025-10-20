<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main>
      <HeroSection />
      <SkillsSection />
      <WorkExperienceSection />
      <SoftwareSection />
      <!-- Add more sections as needed:
        <EducationSection />
        <ResearchSection />
        <LanguagesSection />
        <ScholarshipsSection />
        <VolunteeringSection />
        <MilestonesSection />
        <CodingSection />
        <PracticalSkillsSection />
      -->
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import HeroSection from '~/components/sections/HeroSection.vue';
import SkillsSection from '~/components/sections/SkillsSection.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import AppHeader from '~/components/layout/AppHeader.vue';
import SoftwareSection from '~/components/sections/SoftwareSection.vue';
import WorkExperienceSection from '~/components/sections/WorkExperienceSection.vue';
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Set up page metadata
useHead({
  title: 'Jan Mayer - Portfolio',
  meta: [
    { name: 'description', content: 'Personal portfolio and resume of Jan Mayer' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

onMounted(() => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger)
  
  // Smooth scroll setup
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
  })
})
</script>