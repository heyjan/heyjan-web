<template>
    <section class="section-padding" ref="sectionRef">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="AI & Cloud Expertise" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="expertise in expertiseList" 
            :key="expertise.name"
            class="flex items-center justify-between p-4 rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-all group opacity-100"
            style="border: 1px solid #333; margin: 10px 0;"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <component :is="expertise.icon" class="w-6 h-6 text-primary" v-if="expertise.icon" />
              </div>
              <span class="text-white font-medium">{{ expertise.name }}</span>
            </div>
            <SkillRating :rating="expertise.rating" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { 
    Sparkles, 
    Network, 
    MessageSquare, 
    Layers, 
    Database, 
    Zap
  } from 'lucide-vue-next'
  import SectionTitle from '~/components/ui/SectionTitle.vue'
  import SkillRating from '~/components/ui/SkillRating.vue'
  
  const sectionRef = ref(null)
  
  const expertiseList = ref([
    { name: 'Azure AI Foundry', rating: 5, icon: Sparkles },
    { name: 'LangChain / RAG Architecture', rating: 5, icon: Network },
    { name: 'Prompt Engineering', rating: 5, icon: MessageSquare },
    { name: 'Solution Architecture', rating: 5, icon: Layers },
    { name: 'Vector Databases', rating: 4, icon: Database },
    { name: 'n8n Automation Workflow', rating: 5, icon: Zap },
  ])
  
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const items = sectionRef.value?.querySelectorAll('.grid > div')
    
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
