<template>
  <div class="min-h-screen bg-dark-300">
    <AppHeader />

    <main class="section-padding">
      <div class="max-w-4xl mx-auto">
        <Breadcrumb />

        <h1 class="text-4xl md:text-5xl font-serif text-white mb-4 mt-4">Jan Mayer</h1>
        <div class="h-px bg-gradient-to-r from-primary via-gray-700 to-transparent mb-8" />

        <div class="space-y-10">
          <section class="bg-dark-100/40 border border-primary/10 rounded-lg p-8">
            <p class="text-lg text-gray-200/80 leading-relaxed">
              AI Solution Architect and Full-Stack Developer based in Ulm, Germany. I build production-ready enterprise AI
              systems with a focus on Azure AI Foundry and retrieval-augmented generation (RAG).
            </p>
          </section>

          <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 bg-dark-100/40 border border-primary/10 rounded-lg p-8">
              <h2 class="text-2xl font-serif text-white mb-4">Focus</h2>
              <ul class="space-y-3 text-gray-200/80 leading-relaxed list-disc pl-5">
                <li>Enterprise AI delivery: discovery, architecture, implementation, rollout</li>
                <li>RAG architectures for internal knowledge and copilots</li>
                <li>Evaluation, observability, and safety patterns</li>
                <li>Full-stack implementation with maintainable foundations</li>
              </ul>
            </div>

            <div class="bg-dark-100/40 border border-primary/10 rounded-lg p-8">
              <h2 class="text-2xl font-serif text-white mb-4">Links</h2>
              <div class="space-y-3">
                <a
                  href="mailto:jan@heyjan.de"
                  class="block text-primary hover:text-primary/80 transition-colors font-medium"
                  aria-label="Email Jan Mayer"
                >
                  jan@heyjan.de
                </a>
                <a
                  href="https://www.linkedin.com/in/jan-mayer-a8b7b4176/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-primary hover:text-primary/80 transition-colors font-medium"
                  aria-label="Jan Mayer on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/heyjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-primary hover:text-primary/80 transition-colors font-medium"
                  aria-label="Jan Mayer on GitHub"
                >
                  GitHub
                </a>
                <a
                  href="https://www.xing.com/profile/Jan_Mayer029508/web_profiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-primary hover:text-primary/80 transition-colors font-medium"
                  aria-label="Jan Mayer on XING"
                >
                  XING
                </a>
              </div>
            </div>
          </section>

          <section class="bg-dark-100/40 border border-primary/10 rounded-lg p-8">
            <h2 class="text-2xl font-serif text-white mb-4">Explore</h2>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/projects"
                class="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-dark-300 rounded-lg transition-colors font-medium"
              >
                Projects
              </NuxtLink>
              <NuxtLink
                to="/blog"
                class="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-dark-300 rounded-lg transition-colors font-medium"
              >
                Blog
              </NuxtLink>
              <NuxtLink
                to="/cv"
                class="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-dark-300 rounded-lg transition-colors font-medium"
              >
                CV
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-dark-300 rounded-lg transition-colors font-medium"
              >
                Contact
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { definePerson } from '@unhead/schema-org/vue'

import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'Jan Mayer',
  description: 'Jan Mayer — AI Solution Architect and Full-Stack Developer based in Ulm, Germany. Enterprise AI, Azure AI Foundry, and RAG architectures.',
  ogTitle: 'Jan Mayer',
  ogDescription: 'Jan Mayer — AI Solution Architect and Full-Stack Developer based in Ulm, Germany. Enterprise AI, Azure AI Foundry, and RAG architectures.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'profile',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Jan Mayer',
  twitterDescription: 'Jan Mayer — AI Solution Architect and Full-Stack Developer. Enterprise AI, Azure AI Foundry, and RAG architectures.',
  twitterImage: 'https://heyjan.de/images/profile.jpg',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})

useSchemaOrg([
  definePerson({
    name: 'Jan Mayer',
    url: () => canonicalUrl.value,
    image: '/images/profile.jpg',
    jobTitle: 'AI Solution Architect & Consultant',
    address: {
      addressLocality: 'Ulm',
      addressCountry: 'DE',
    },
    sameAs: [
      'https://www.linkedin.com/in/jan-mayer-a8b7b4176/',
      'https://github.com/heyjan',
      'https://www.xing.com/profile/Jan_Mayer029508/web_profiles',
    ],
  }),
])
</script>


