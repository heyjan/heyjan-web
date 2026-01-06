<template>
  <div class="h-full flex flex-col" ref="sectionRef">
    <SectionTitle title="Software" />
    
    <div class="flex flex-col gap-4 flex-1">
      <div 
        v-for="software in softwareList" 
        :key="software.name"
        class="flex items-center justify-between p-4 rounded-lg bg-dark-100/50 hover:bg-dark-100 transition-all group"
        style="border: 1px solid #333;"
      >
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center group-hover:scale-110 transition-transform">
            <component :is="software.icon" class="w-6 h-6 text-primary" v-if="software.icon" />
          </div>
          <span class="text-white font-medium">{{ software.name }}</span>
        </div>
        <SkillRating :rating="software.rating" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  PanelsTopLeft, 
  Code, 
  GitBranch, 
  Container, 
  Cloud, 
  Database,
  CloudUpload
} from 'lucide-vue-next'
import SectionTitle from '~/components/ui/SectionTitle.vue'
import SkillRating from '~/components/ui/SkillRating.vue'

const sectionRef = ref(null)

const softwareList = ref([
  { name: 'Wordpress', rating: 5, icon: PanelsTopLeft },
  { name: 'VS Code / Cursor', rating: 5, icon: Code },
  { name: 'Git', rating: 4, icon: GitBranch },
  { name: 'Docker', rating: 4, icon: Container },
  { name: 'Azure', rating: 4, icon: CloudUpload },
  { name: 'AWS', rating: 3, icon: Cloud },
  { name: 'MySQL', rating: 4, icon: Database },
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
