<template>
  <section class="section-padding">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-end justify-between gap-6 mb-6">
        <SectionTitle title="Featured Case Study" />
        <NuxtLink
          to="/case-studies"
          class="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          aria-label="View all case studies"
        >
          View all
        </NuxtLink>
      </div>

      <NuxtLink
        v-if="featured"
        :to="`/case-studies/${featured.slug}`"
        class="bg-dark-100/40 border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-all block group"
      >
        <div class="flex flex-col md:flex-row">
          <div v-if="featured.image" class="md:w-2/5 flex-shrink-0">
            <img
              :src="featured.image"
              :alt="featured.title"
              class="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="p-6 md:p-8 flex flex-col justify-center" :class="featured.image ? 'md:w-3/5' : 'w-full'">
            <h3 class="text-xl md:text-2xl font-serif text-white mb-3 group-hover:text-primary transition-colors">
              {{ featured.title }}
            </h3>
            <p class="text-gray-200/70 leading-relaxed mb-4">
              {{ featured.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in featured.tags"
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
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'
import { casestudies } from '~/data/casestudies'

const featured = casestudies[0]
</script>
