<template>
  <div class="h-full flex flex-col" ref="sectionRef">
    <SectionTitle title="Work Experience" :icon="BriefcaseIcon" />
    
    <div class="space-y-2 flex-1">
      <TimelineItem
        v-for="(job, index) in workExperience"
        :key="index"
        :title="job.title"
        :subtitle="job.company"
        :period="job.period"
        :description="job.description"
        :tags="job.tags"
        :icon="job.icon"
        :is-last="index === workExperience.length - 1"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Briefcase, User, Building2 } from 'lucide-vue-next'
import SectionTitle from '~/components/ui/SectionTitle.vue'
import TimelineItem from '~/components/ui/TimelineItem.vue'

const BriefcaseIcon = Briefcase

const sectionRef = ref(null)

const workExperience = ref([
  {
    title: 'Full Stack Developer / AI Solution Architect',
    company: 'LIQUI MOLY GmbH',
    period: '09/2024 - present',
    description: [
      'Building AI competence from requirements analysis to implementation',
      'Evaluation and selection of Microsoft AI solutions under Würth Group IT governance',
      'Identification and assessment of AI use cases with business departments',
      'Managing PoCs through to planned production release Q1/Q2 2026'
    ],
    tags: ['Azure AI Foundry', 'Docker', 'Python', 'Azure', 'PHP'],
    icon: Building2
  },
  {
    title: 'Freelance Web Development',
    company: 'HEYJAN.DE',
    period: '2016 - present',
    description: [
      'Frontend and backend development projects for startups',
      'Collaboration with management, marketing and other developers'
    ],
    tags: ['Docker', 'Nuxt', 'FastAPI'],
    icon: User
  },
  {
    title: 'Wohngruppenleitung Wohnheim',
    company: 'Sozialpsychiatrisches Wohnheim, Diakonie Neu-Ulm',
    period: '2017 - 2024',
    description: [
      'Led residential group for individuals with mental health needs',
      'Coordinated care and support services'
    ],
    tags: ['Social Work', 'Mental Health', 'Leadership'],
    icon: Building2
  }
])

onMounted(() => {
  gsap.from(sectionRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  })
})
</script>
