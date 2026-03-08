<template>
  <section class="section-padding">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-end justify-between gap-6 mb-6">
        <SectionTitle title="Featured Projects" />
        <NuxtLink
          to="/projects"
          class="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          aria-label="View all projects"
        >
          View all
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="project in featured"
          :key="project.slug"
          class="p-6 rounded-lg bg-dark-100/40 border border-primary/10 hover:border-primary/30 transition-all"
        >
          <h3 class="text-xl font-serif text-white mb-3">
            {{ project.title }}
          </h3>
          <p class="text-gray-200/70 leading-relaxed mb-4">
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
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'
import { projects } from '~/data/projects'

const featured = projects.slice(0, 3)
</script>


