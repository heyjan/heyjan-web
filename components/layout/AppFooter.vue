<template>
    <footer class="section-padding bg-surface border-t border-border">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-8">
          <p class="text-text-muted text-sm mb-4">AI Solution Architect | Available for consulting</p>
          <p class="text-text-muted text-sm mb-4">Made with ❤️ by {{ name }}</p>
          <p class="text-text-muted/70 text-xs mb-4">© {{ currentYear }} All rights reserved</p>
        </div>
        
        <div class="flex justify-center items-center gap-4">
          <a 
            v-for="social in socials" 
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all group"
            :aria-label="social.name"
          >
            <component :is="social.icon" class="w-5 h-5 text-primary group-hover:text-white" />
          </a>
          <NuxtLink 
            to="/impressum" 
            class="text-text-muted hover:text-primary transition-colors text-xs"
            aria-label="Impressum"
          >
            Impressum
          </NuxtLink>
          <NuxtLink 
            to="/datenschutz" 
            class="text-text-muted hover:text-primary transition-colors text-xs"
            aria-label="Datenschutzerklärung"
          >
            Datenschutz
          </NuxtLink>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Linkedin, Github, Twitter, Instagram, Mail } from 'lucide-vue-next'
  import XingIcon from '~/components/icons/XingIcon.vue'
  
  defineProps({
    name: {
      type: String,
      default: 'Jan Mayer'
    }
  })
  
  const currentYear = computed(() => new Date().getFullYear())
  
  const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jan-mayer-a8b7b4176/', icon: Linkedin },
    { name: 'XING', url: 'https://www.xing.com/profile/Jan_Mayer029508/web_profiles', icon: XingIcon },
    { name: 'GitHub', url: 'https://github.com/heyjan', icon: Github },
    { name: 'Email', url: 'mailto:jan@heyjan.de', icon: Mail },
  ]
  </script>