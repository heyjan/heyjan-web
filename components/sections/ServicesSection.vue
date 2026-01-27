<template>
  <section ref="sectionRef" class="services-section relative bg-surface py-20 lg:py-0 min-h-screen flex flex-col justify-center">
    <div class="max-w-7xl mx-auto px-6 w-full mb-8 lg:absolute lg:top-20 lg:left-1/2 lg:-translate-x-1/2 lg:z-10">
      <SectionTitle title="What I do" />
    </div>

    <div class="slider-wrapper relative w-full overflow-hidden">
      <div 
        ref="containerRef" 
        class="flex flex-nowrap will-change-transform"
      >
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="service-slide w-screen flex-shrink-0 flex items-center px-6 lg:px-20 min-h-[60vh] lg:min-h-screen"
        >
          <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-16 items-center">
            <!-- 60% Image Part -->
            <div class="service-image-container aspect-video bg-background border border-border rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1 group relative">
              <div class="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
               <NuxtImg 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 650px"
                loading="lazy"
                format="webp"
                quality="80"
              />
            </div>

            <!-- 40% Text Part -->
            <div class="order-1 lg:order-2 space-y-6">
              <div class="flex items-center gap-4">
                <span class="text-primary font-mono text-sm tracking-widest uppercase">0{{ index + 1 }}</span>
                <div class="h-px w-8 bg-primary/30" />
              </div>
              <h3 class="text-3xl lg:text-5xl font-serif text-text leading-tight">{{ service.title }}</h3>
              <p class="text-lg lg:text-xl text-text-muted leading-relaxed max-w-md">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xs px-6 lg:px-0 z-20">
      <div class="flex justify-between items-end mb-2 px-1">
        <span class="text-[10px] font-mono text-text-muted uppercase tracking-tighter">Progress</span>
        <span class="text-[10px] font-mono text-text-muted uppercase tracking-tighter">Slide {{ currentSlide + 1 }} / {{ services.length }}</span>
      </div>
      <div class="h-1 w-full bg-border/40 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          class="h-full bg-primary origin-left transition-transform duration-150 ease-out" 
          :style="{ transform: `scaleX(${scrollProgress})` }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const services = [
  {
    title: 'Consult & Strategize',
    description: 'I help you cut through the AI noise. We find the use cases that actually move the needle and build a clear path from idea to production.',
    image: '/images/services-consult-strategize.png'
  },
  {
    title: 'Architect & Build',
    description: 'This is the engine room. I design RAG systems that turn your internal knowledge into secure, actionable intelligence for your team.',
    image: '/images/services-architect-build.png'
  },
  {
    title: 'Deploy & Scale',
    description: 'AI is only useful inside a working product. I deliver the full stack, from cloud infrastructure to frontend, built to last.',
    image: '/images/services-deploy-scale.png'
  }
]

const sectionRef = ref(null)
const containerRef = ref(null)
const scrollProgress = ref(0)
const currentSlide = ref(0)

let ctx

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Wait for DOM to be fully painted
  setTimeout(() => {
    if (!containerRef.value || !sectionRef.value) return
    
    ctx = gsap.context(() => {
      const container = containerRef.value
      const section = sectionRef.value
      const viewportWidth = window.innerWidth
      
      // Calculate scroll distance based on number of slides, not container width
      // Each slide is 100vw, so total scroll = (number of slides - 1) * viewport width
      const numSlides = services.length
      const amountToScroll = (numSlides - 1) * viewportWidth
      
      // Create the horizontal scroll animation
      gsap.to(container, {
        x: () => -((services.length - 1) * window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${(services.length - 1) * window.innerWidth}`,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (services.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0,
            ease: "power1.inOut"
          },
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgress.value = self.progress
            currentSlide.value = Math.round(self.progress * (services.length - 1))
          }
        }
      })
    }, sectionRef.value)
  }, 100)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.services-section {
  background-image: 
    radial-gradient(circle at 2px 2px, var(--color-border) 1px, transparent 0);
  background-size: 40px 40px;
  background-position: center;
}

/* Constrain image size on laptop screens (15-inch displays ~1440px) */
.service-image-container {
  max-height: 60vh;
  width: 100%;
}

/* Fine-tune for specific laptop screen sizes */
@media (min-width: 1024px) and (max-width: 1600px) {
  .service-image-container {
    max-height: 50vh;
    aspect-ratio: 16 / 9;
  }
}

/* Larger screens can have slightly bigger images */
@media (min-width: 1601px) {
  .service-image-container {
    max-height: 55vh;
  }
}

@media (max-width: 1024px) {
  .services-section {
    min-height: auto;
  }
  
  .service-image-container {
    max-height: none;
  }
}
</style>


