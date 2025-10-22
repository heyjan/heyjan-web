<template>
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="{ 'bg-dark-300/95 backdrop-blur-sm shadow-lg': scrolled }"
    >
      <nav class="px-6 md:px-12 lg:px-20 py-4 flex justify-between items-center">
        <button 
          @click="toggleMenu"
          class="w-10 h-10 flex flex-col justify-center items-center gap-1.5 hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          <span 
            class="w-6 h-0.5 bg-primary transition-all"
            :class="{ 'rotate-45 translate-y-2': menuOpen, '': !menuOpen }"
          />
          <span 
            class="w-6 h-0.5 bg-primary transition-all"
            :class="{ 'opacity-0': menuOpen, '': !menuOpen }"
          />
          <span 
            class="w-6 h-0.5 bg-primary transition-all"
            :class="{ '-rotate-45 -translate-y-2': menuOpen, '': !menuOpen }"
          />
        </button>
        
        <div class="flex gap-4">
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
      </nav>
      
      <!-- Mobile Menu -->
      <Transition name="slide">
        <div 
          v-if="menuOpen"
          class="absolute top-full left-0 right-0 bg-dark-300/98 backdrop-blur-sm border-t border-gray-800"
        >
          <div class="px-6 md:px-12 lg:px-20 py-8">
            <nav class="space-y-4">
              <a 
                v-for="item in menuItems" 
                :key="item.name"
                :href="item.href"
                @click="scrollToSection(item.href)"
                class="block text-2xl font-serif text-white hover:text-primary transition-colors"
              >
                {{ item.name }}
              </a>
            </nav>
          </div>
        </div>
      </Transition>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { Linkedin, Github, Twitter, Mail } from 'lucide-vue-next'
  
  const scrolled = ref(false)
  const menuOpen = ref(false)
  
  const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jan-mayer-a8b7b4176/', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/heyjan', icon: Github },
    { name: 'Email', url: 'mailto:jan@heyjan.de', icon: Mail },
  ]
  
  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
  
  const scrollToSection = (href) => {
    menuOpen.value = false
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const handleScroll = () => {
    scrolled.value = window.scrollY > 50
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>