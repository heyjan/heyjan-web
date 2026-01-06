<template>
  <div class="h-full flex flex-col" ref="sectionRef">
    <SectionTitle title="General Skills" />
    
    <div class="flex flex-col gap-4 flex-1">
      <div 
        v-for="skill in skills" 
        :key="skill.name"
        class="flex items-center gap-4 p-4 rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-colors"
        style="border: 1px solid #333;"
      >
        <div class="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center group-hover:scale-110 transition-transform">
          <component :is="skill.icon" class="w-6 h-6 text-primary" v-if="skill.icon" />
        </div>
        <div class="flex-1">
          <p class="text-white font-medium">{{ skill.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { 
  Brain, 
  Palette, 
  Puzzle, 
  HandMetal
} from 'lucide-vue-next'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const sectionRef = ref(null)

const skills = ref([
  { name: 'Analytical Thinking', icon: Brain },
  { name: 'Creativity', icon: Palette },
  { name: 'Problem Solving', icon: Puzzle },
  { name: 'Hands-on mentality', icon: HandMetal },
])

onMounted(() => {
  gsap.from(sectionRef.value.querySelectorAll('.flex-col > div'), {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 80%',
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out'
  })
})
</script>
