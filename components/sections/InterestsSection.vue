<template>
  <div class="h-full flex flex-col" ref="sectionRef">
    <SectionTitle title="Interests" />
    
    <div class="flex flex-col gap-4 flex-1">
      <div 
        v-for="interest in interests" 
        :key="interest.name"
        class="flex items-center gap-4 p-4 rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-all group"
        style="border: 1px solid #333;"
      >
        <div class="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center group-hover:scale-110 transition-transform">
          <component :is="interest.icon" class="w-6 h-6 text-primary" />
        </div>
        <div class="flex-1">
          <span class="text-white font-medium">{{ interest.name }}</span>
          <span v-if="interest.detail" class="text-gray-400 text-sm ml-2">{{ interest.detail }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Swords
} from 'lucide-vue-next'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const sectionRef = ref(null)

const interests = ref([
  { name: 'Brazilian Jiu Jitsu', detail: '9 Years - Brown Belt', icon: Swords },
])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  const items = sectionRef.value?.querySelectorAll('.flex-col > div')
  
  if (items && items.length > 0) {
    gsap.fromTo(items, 
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      }
    )
  }
})
</script>




