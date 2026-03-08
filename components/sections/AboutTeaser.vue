<template>
  <section class="section-padding">
    <div class="max-w-5xl mx-auto">
      <SectionTitle title="About" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div class="md:col-span-2">
          <p class="text-lg text-gray-200/70 leading-relaxed mb-6">
            I build production-ready AI systems and scalable web applications, with a focus on enterprise delivery,
            Azure AI Foundry, and retrieval-augmented generation (RAG).
          </p>

          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/jan-mayer"
              class="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-dark-300 rounded-lg transition-colors font-medium"
            >
              About Jan Mayer
            </NuxtLink>
            <NuxtLink
              to="/cv"
              class="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-dark-300 rounded-lg transition-colors font-medium"
            >
              View CV
            </NuxtLink>
          </div>
        </div>

        <div class="p-6 rounded-lg bg-dark-100/40 border border-primary/10">
          <p class="text-gray-200/70 leading-relaxed">
            Based in Ulm, Germany. Available for consulting and collaboration.
          </p>
          <div class="mt-6">
            <NuxtLink
              to="/contact"
              class="text-primary hover:text-primary/80 transition-colors font-medium"
              aria-label="Contact Jan Mayer"
            >
              Talk to me
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '~/components/ui/SectionTitle.vue'
</script>


