<template>
  <div class="h-full flex flex-col" ref="sectionRef">
    <SectionTitle title="AI & Cloud Expertise" />
    
    <div class="flex flex-col gap-4 flex-1">
      <div 
        v-for="expertise in expertiseList" 
        :key="expertise.name"
        class="flex items-center justify-between p-4 rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-all group"
        style="border: 1px solid #333;"
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
  Zap,
  Cpu,
  GitBranch
} from 'lucide-vue-next'
import SectionTitle from '~/components/ui/SectionTitle.vue'
import SkillRating from '~/components/ui/SkillRating.vue'

const sectionRef = ref(null)

const expertiseList = ref([
  { name: 'Azure AI Foundry', rating: 5, icon: Sparkles },
  { name: 'NVIDIA Ecosystem', rating: 4, icon: Cpu },
  { name: 'LangChain / RAG Architecture', rating: 5, icon: Network },
  { name: 'Prompt Engineering', rating: 5, icon: MessageSquare },
  { name: 'ETL Pipelines', rating: 4, icon: Database },
  { name: 'SQL & API Integrations', rating: 4, icon: Network },
  { name: 'Solution Architecture', rating: 5, icon: Layers },
  { name: 'Vector Databases', rating: 4, icon: Database },
  { name: 'FastAPI', rating: 4, icon: Zap },
  { name: 'CI/CD Pipelines', rating: 4, icon: GitBranch },
  { name: 'n8n Automation Workflow', rating: 5, icon: Zap },
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
