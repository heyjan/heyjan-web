<template>
  <section class="section-padding bg-surface">
    <div class="max-w-5xl mx-auto">
      <SectionTitle title="What I do" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors shadow-sm">
          <h3 class="text-xl font-serif text-text mb-3">Enterprise AI Systems</h3>
          <p class="text-text-muted leading-relaxed">
            Design and delivery of production-grade AI systems with clear ROI; from discovery to rollout.
          </p>
        </div>

        <div class="p-6 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors shadow-sm">
          <h3 class="text-xl font-serif text-text mb-3">RAG & Knowledge Management</h3>
          <p class="text-text-muted leading-relaxed">
            Retrieval-augmented generation architectures for internal knowledge, search, and copilots.
          </p>
        </div>

        <div class="p-6 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors shadow-sm">
          <h3 class="text-xl font-serif text-text mb-3">Azure AI Foundry</h3>
          <p class="text-text-muted leading-relaxed">
            Guidance on model selection, evaluation, security, and operations in the Azure ecosystem.
          </p>
        </div>

        <div class="p-6 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors shadow-sm">
          <h3 class="text-xl font-serif text-text mb-3">Full-Stack Delivery</h3>
          <p class="text-text-muted leading-relaxed">
            End-to-end delivery: architecture, backend, frontend, deployment, and maintainable foundations.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '~/components/ui/SectionTitle.vue'
</script>


