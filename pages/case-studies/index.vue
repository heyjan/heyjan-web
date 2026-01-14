<template>
  <div class="min-h-screen bg-dark-300">
    <AppHeader />

    <main class="section-padding">
      <div class="max-w-4xl mx-auto">
        <Breadcrumb />

        <h1 class="text-4xl md:text-5xl font-serif text-white mb-4 mt-4">Case Studies</h1>
        <div class="h-px bg-gradient-to-r from-primary via-gray-700 to-transparent mb-8" />

        <p class="text-lg text-gray-200/70 mb-12">
          Real-world implementations and their outcomes. Each case study documents the challenge, approach, and measurable results.
        </p>

        <div class="grid grid-cols-1 gap-8">
          <NuxtLink
            v-for="study in casestudies"
            :key="study.slug"
            :to="`/case-studies/${study.slug}`"
            class="bg-dark-100/40 border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-all block group"
          >
            <div class="flex flex-col md:flex-row">
              <div v-if="study.image" class="md:w-2/5 flex-shrink-0">
                <img
                  :src="study.image"
                  :alt="study.title"
                  class="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="p-6 flex flex-col justify-center" :class="study.image ? 'md:w-3/5' : 'w-full'">
                <h2 class="text-xl md:text-2xl font-serif text-white mb-3 group-hover:text-primary transition-colors">
                  {{ study.title }}
                </h2>
                <p class="text-gray-200/70 leading-relaxed mb-4 text-sm md:text-base">
                  {{ study.description }}
                </p>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in study.tags"
                    :key="tag"
                    class="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'
import { casestudies } from '~/data/casestudies'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'Case Studies',
  description: 'Case studies by Jan Mayer showcasing real-world AI implementations, enterprise solutions, and measurable business outcomes.',
  ogTitle: 'Case Studies · Jan Mayer',
  ogDescription: 'Case studies by Jan Mayer showcasing real-world AI implementations, enterprise solutions, and measurable business outcomes.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})
</script>
