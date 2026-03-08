<template>
  <section class="section-padding bg-surface">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-end justify-between gap-6 mb-6">
        <SectionTitle title="Latest Writing" />
        <NuxtLink
          to="/blog"
          class="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          aria-label="View all blog posts"
        >
          View all
        </NuxtLink>
      </div>

      <div v-if="pending" class="text-text-muted">
        Loading posts...
      </div>

      <div v-else-if="posts.length === 0" class="text-text-muted">
        No posts yet.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="post in posts"
          :key="post._path"
          class="rounded-lg bg-background border border-border hover:border-primary/50 transition-all overflow-hidden shadow-sm"
        >
          <NuxtLink :to="post._path" class="block p-6">
            <p v-if="post.date" class="text-sm text-text-muted/70 mb-3">
              {{ formatDate(post.date) }}
            </p>
            <h3 class="text-xl font-serif text-text mb-3">
              {{ post.title }}
            </h3>
            <p v-if="post.description" class="text-text-muted leading-relaxed mb-4">
              {{ post.description }}
            </p>

            <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {{ tag }}
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '~/components/ui/SectionTitle.vue'

type BlogListItem = {
  _path: string
  title?: string
  description?: string
  date?: string
  tags?: string[]
}

const { data, pending } = await useAsyncData<BlogListItem[]>('latest-posts', async () => {
  return await $fetch('/api/blog')
})

const posts = computed(() => (data.value ?? []).slice(0, 3))

function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>


