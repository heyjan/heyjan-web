<template>
    <section class="section-padding min-h-screen flex items-center justify-between relative">
      <div class="max-w-2xl" ref="titleRef">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif mb-4">
          <span class="text-gray-300">This is</span><br>
          <span class="text-primary">{{ name }}</span>
        </h1>
      </div>
      
      <div class="hidden md:block" ref="imageRef">
        <div class="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/20">
          <img 
            :src="profileImage" 
            :alt="name"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { gsap } from 'gsap'
  
  const props = defineProps({
    name: {
      type: String,
      default: 'Jan Mayer'
    },
    profileImage: {
      type: String,
      default: '/images/profile.jpg'
    }
  })
  
  const titleRef = ref(null)
  const imageRef = ref(null)
  
  onMounted(() => {
    gsap.from(titleRef.value, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
    
    gsap.from(imageRef.value, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    })
  })
  </script>