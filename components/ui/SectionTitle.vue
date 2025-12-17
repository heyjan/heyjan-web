<template>
    <div class="flex items-center gap-3 mb-8">
      <component :is="icon" class="w-5 h-5 text-primary" v-if="icon" />
      <h2 class="text-2xl md:text-3xl font-serif text-white">{{ title }}</h2>
    </div>
    <div class="h-px bg-gradient-to-r from-primary via-gray-700 to-transparent mb-4" />
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: [Object, String, Function],
      default: null
    }
  })
  </script>