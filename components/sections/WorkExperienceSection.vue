<template>
    <section class="section-padding bg-dark-200" ref="sectionRef">
      <div class="max-w-5xl mx-auto">
        <SectionTitle title="Work Experience" :icon="BriefcaseIcon" />
        
        <div class="space-y-2">
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
    </section>
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
      title: 'Self-employed',
      company: 'heyjan',
      period: '2017 - present',
      description: [
        'Developed and maintained web applications',
        'Collaborated with clients to deliver custom solutions'
      ],
      tags: ['Wordpress', 'Docker','Nuxt', 'FastAPI'],
      icon: User
    },
    {
      title: 'Full-Stack Web Developer',
      company: 'LIQUI MOLY',
      period: '2024 - present',
      description: [
        'Built scalable web applications',
        'Implemented CI/CD pipelines'
      ],
      tags: ['PHP', 'Docker', 'AWS', 'Azure', 'MySQL', ],
      icon: Building2
    },
    // Add more work experience items
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