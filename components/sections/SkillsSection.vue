<template>
  <div ref="sectionRef">
    <SectionTitle title="General Skills" />
    
    <div class="flex flex-col gap-4">
      <div 
        v-for="skill in skills" 
        :key="skill.name"
        class="flex items-center gap-4 p-4 rounded-lg bg-surface hover:bg-highlight/20 transition-colors border border-border shadow-sm"
      >
        <div class="w-10 h-10 rounded-lg bg-background flex items-center justify-center group-hover:scale-110 transition-transform border border-border">
          <component :is="skill.icon" class="w-6 h-6 text-primary" v-if="skill.icon" />
        </div>
        <div class="flex-1">
          <p class="text-text font-medium">{{ skill.name }}</p>
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
  Puzzle,
  HandMetal
} from 'lucide-vue-next'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const sectionRef = ref(null)

const skills = ref([
  { name: 'Analytical Thinking', icon: Brain },
  { name: 'Solution-oriented Working', icon: Puzzle },
  { name: 'Hands-on Mentality', icon: HandMetal },
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
