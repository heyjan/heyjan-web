<template>
  <div class="min-h-screen bg-background">
    <AppHeader />

    <main class="section-padding">
      <div class="max-w-4xl mx-auto">
        <Breadcrumb />

        <h1 class="text-4xl md:text-5xl font-serif text-text mb-4 mt-4">Projects</h1>
        <div class="h-px bg-gradient-to-r from-primary via-border to-transparent mb-8" />

        <p class="text-lg text-text-muted mb-12">
          A selection of work and experiments. Detailed write-ups will be added over time.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="project in projects"
            :key="project.slug"
            class="bg-surface border border-border rounded-lg p-6 hover:border-primary/50 transition-all shadow-sm"
          >
            <h2 class="text-2xl font-serif text-text mb-3">
              {{ project.title }}
            </h2>
            <p class="text-text-muted leading-relaxed mb-4">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {{ tag }}
              </span>
            </div>
          </div>
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
import { projects } from '~/data/projects'

const route = useRoute()
const canonicalUrl = computed(() => `https://heyjan.de${route.path}`)

useSeoMeta({
  title: 'Projects',
  description: 'Projects by Jan Mayer — a selection of work related to enterprise AI, Azure, RAG, and full-stack delivery.',
  ogTitle: 'Projects · Jan Mayer',
  ogDescription: 'Projects by Jan Mayer — a selection of work related to enterprise AI, Azure, RAG, and full-stack delivery.',
  ogImage: 'https://heyjan.de/images/profile.jpg',
  ogUrl: canonicalUrl.value,
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})
</script>


