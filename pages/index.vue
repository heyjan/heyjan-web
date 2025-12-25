<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main>
      <HeroSection />
      <AIAndCloudSection />
      <SkillsSection />
      <WorkExperienceSection />
      <SoftwareSection />
      <ContactSection />
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
import AIAndCloudSection from '~/components/sections/AIAndCloudSection.vue';
import SkillsSection from '~/components/sections/SkillsSection.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import AppHeader from '~/components/layout/AppHeader.vue';
import SoftwareSection from '~/components/sections/SoftwareSection.vue';
import WorkExperienceSection from '~/components/sections/WorkExperienceSection.vue';
import ContactSection from '~/components/sections/ContactSection.vue';
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Set up page metadata with SEO
useSeoMeta({
  title: 'Jan Mayer – Full-Stack Developer & AI Specialist | Ulm',
  description: 'AI Solution Architect at LIQUI MOLY specializing in Azure AI Foundry and enterprise AI solutions. Self-taught developer building production-ready AI systems.',
  ogTitle: 'Jan Mayer – Full-Stack Developer & AI Specialist | Ulm',
  ogDescription: 'AI Solution Architect at LIQUI MOLY specializing in Azure AI Foundry and enterprise AI solutions. Self-taught developer building production-ready AI systems.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: 'https://heyjan.de',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Jan Mayer – Full-Stack Developer & AI Specialist | Ulm',
  twitterDescription: 'AI Solution Architect at LIQUI MOLY specializing in Azure AI Foundry and enterprise AI solutions.',
  twitterImage: 'https://heyjan.de/images/profile.jpg',
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