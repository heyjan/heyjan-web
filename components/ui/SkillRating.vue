<template>
    <div class="flex flex-row gap-1 flex-shrink-0">
      <div 
        v-for="i in 5" 
        :key="i"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="i <= rating ? 'bg-primary' : 'bg-gray-700'"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    rating: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 5
    }
  })
  </script>