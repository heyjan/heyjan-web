<template>
    <footer class="section-padding bg-dark-300 border-t border-gray-800">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-8">
          <p class="text-gray-500 text-sm mb-4">Made with ❤️ by {{ name }}</p>
          <p class="text-gray-600 text-xs">© {{ currentYear }} All rights reserved</p>
        </div>
        
        <div class="flex justify-center gap-4">
          <a 
            v-for="social in socials" 
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
            :aria-label="social.name"
          >
            <component :is="social.icon" class="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Linkedin, Github, Twitter, Instagram, Mail } from 'lucide-vue-next'
  
  defineProps({
    name: {
      type: String,
      default: 'Jan Mayer'
    }
  })
  
  const currentYear = computed(() => new Date().getFullYear())
  
  const socials = [
    { name: 'LinkedIn', url: '#', icon: Linkedin },
    { name: 'GitHub', url: '#', icon: Github },
    { name: 'Twitter', url: '#', icon: Twitter },
    { name: 'Instagram', url: '#', icon: Instagram },
    { name: 'Email', url: 'mailto:jan@heyjan.de', icon: Mail },
  ]
  </script>