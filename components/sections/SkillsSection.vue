<template>
    <section class="section-padding" ref="sectionRef">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="General Skills" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="skill in skills" 
            :key="skill.name"
            class="flex items-center gap-4 p-4 rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-colors"
          >
            <component :is="skill.icon" class="w-6 h-6 text-primary flex-shrink-0" v-if="skill.icon" />
            <div class="flex-1">
              <p class="text-white mb-2">{{ skill.name }}</p>
              <SkillRating :rating="skill.rating" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { gsap } from 'gsap'
  import { 
    Brain, 
    Palette, 
    MessageSquare, 
    Puzzle, 
    Users, 
    HandMetal
  } from 'lucide-vue-next'
  import SectionTitle from '~/components/ui/SectionTitle.vue'
  import SkillRating from '~/components/ui/SkillRating.vue'
  
  const sectionRef = ref(null)
  
  const skills = ref([
    { name: 'Analytical Thinking', rating: 5, icon: Brain },
    { name: 'Creativity', rating: 4, icon: Palette },
    { name: 'Communication', rating: 3, icon: MessageSquare },
    { name: 'Problem Solving', rating: 5, icon: Puzzle },
    { name: 'Teamwork', rating: 4, icon: Users },
    { name: 'Hands-on mentality', rating: 4, icon: HandMetal },
  ])
  
  onMounted(() => {
    gsap.from(sectionRef.value.querySelectorAll('.grid > div'), {
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