<template>
    <div class="flex gap-6 group" ref="itemRef">
      <div class="flex flex-col items-center">
        <div class="w-10 h-10 rounded-full bg-surface border-2 border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
          <component :is="icon" class="w-5 h-5 text-primary" v-if="icon" />
        </div>
        <div class="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent mt-4" v-if="!isLast" />
      </div>
      
      <div class="flex-1 pb-12">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-serif text-primary">{{ title }}</h3>
          <span class="text-sm text-text-muted whitespace-nowrap ml-4">{{ period }}</span>
        </div>
        
        <p class="text-primary/80 mb-2" v-if="subtitle">{{ subtitle }}</p>
        
        <div class="text-text-muted text-sm space-y-2">
          <p v-for="(item, index) in description" :key="index">{{ item }}</p>
        </div>
        
        <div class="flex flex-wrap gap-2 mt-4" v-if="tags && tags.length">
          <span 
            v-for="tag in tags" 
            :key="tag"
            class="px-3 py-1 text-xs bg-surface-alt text-text-muted rounded-full border border-border"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    period: {
      type: String,
      required: true
    },
    description: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    },
    icon: {
      type: [Object, String, Function],
      default: null
    },
    isLast: {
      type: Boolean,
      default: false
    }
  })
  
  const itemRef = ref(null)
  </script>