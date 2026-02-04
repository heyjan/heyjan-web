<template>
    <section class="section-padding min-h-screen flex items-center justify-between relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 -z-10">
        <!-- Gradient Orbs -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-highlight/40 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        
        <!-- Floating Particles -->
        <div 
          v-for="particle in particles" 
          :key="`hero-particle-${particle.id}`"
          class="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
          :style="{
            left: particle.left + '%',
            top: particle.top + '%',
            animationDelay: particle.delay + 's',
            animationDuration: particle.duration + 's'
          }"
        ></div>
      </div>

      <!-- Main Content -->
      <div class="max-w-2xl relative z-10" ref="titleRef">
        <!-- Subtitle with typewriter effect -->
        <div class="mb-4" ref="subtitleRef">
          <span v-once class="text-lg md:text-xl text-text-muted font-mono">Full-Stack Developer / AI Solution Architect</span>
        </div>
        
        <div class="mb-6">
          <span v-once class="text-text/80 block mb-2 text-2xl md:text-6xl font-serif" ref="introText">This is</span>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif text-primary relative inline-block" ref="nameText">
            {{ name }}
            <!-- Underline effect -->
            <div class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-highlight opacity-80" ref="underlineRef" style="z-index: 1000;"></div>
          </h1>
        </div>
        
        <!-- Description with fade-in effect -->
        <div class="mb-8" ref="descriptionRef">
          <p v-once class="text-lg text-text-muted leading-relaxed max-w-lg">
            Designing and building enterprise AI that drives efficiency and real-world impact.
          </p>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex gap-4" ref="buttonsRef">
          <DitherButton to="/jan-mayer" variant="primary" size="md">
            About Jan Mayer
          </DitherButton>
          <DitherButton to="/cv" variant="secondary" size="md">
            View CV
          </DitherButton>
        </div>

        <!-- NVIDIA certification badge (Credly-verified) -->
        <a
          ref="badgeRef"
          href="https://www.credly.com/badges/7c094bab-d491-4b9c-a1b9-b552c242c92a"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block mt-8 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          title="NVIDIA Certified Associate: Generative AI LLMs - view credential on Credly"
        >
          <NuxtImg
            src="/images/nvidia-nca-genl-badge.png"
            alt="NVIDIA Certified Associate: Generative AI LLMs"
            width="120"
            height="140"
            format="webp"
            loading="lazy"
            class="h-24 w-auto"
          />
        </a>
      </div>
      
      <!-- Profile Image with enhanced effects -->
      <div class="hidden md:block relative z-10" ref="imageRef">
        <div class="relative">
          <!-- Glow effect -->
          <div class="absolute inset-0 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-highlight/50 blur-xl scale-110"></div>
          
          <!-- Main image container -->
          <div class="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/40 relative group">
            <NuxtImg 
              :src="profileImage" 
              :alt="name"
              format="webp"
              loading="eager"
              fetchpriority="high"
              width="256"
              height="256"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-highlight/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <!-- Floating elements around image -->
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { gsap } from 'gsap'
  
  const props = defineProps({
    name: {
      type: String,
      default: 'Jan Mayer'
    },
    profileImage: {
      type: String,
      default: '/images/profile.jpg'
    }
  })
  
  const titleRef = ref(null)
  const imageRef = ref(null)
  const subtitleRef = ref(null)
  const introText = ref(null)
  const nameText = ref(null)
  const underlineRef = ref(null)
  const descriptionRef = ref(null)
  const buttonsRef = ref(null)
  const badgeRef = ref(null)
  const particles = ref([])
  
  onMounted(() => {
    // Generate 20 random particles for background
    for (let i = 0; i < 20; i++) {
      particles.value.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4
      })
    }

    // Create timeline for coordinated animations
    const tl = gsap.timeline()
    
    // Set initial states
    gsap.set([subtitleRef.value, introText.value, nameText.value, descriptionRef.value, buttonsRef.value, badgeRef.value], {
      opacity: 0,
      y: 30
    })
    
    gsap.set(underlineRef.value, {
      scaleX: 0,
      transformOrigin: 'left center'
    })
    
    gsap.set(imageRef.value, {
      opacity: 0,
      scale: 0.8,
      rotation: 5
    })
    
    // Animate elements in sequence
    tl.to(subtitleRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to(introText.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .to(nameText.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .to(underlineRef.value, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .to(descriptionRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.2')
    .to(buttonsRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.2')
    .to(badgeRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.2')
    .to(imageRef.value, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.3)'
    }, '-=0.6')
    
  })
  </script>
  
  <style scoped>
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  /* Custom gradient text effect */
  .text-primary {
    background: linear-gradient(135deg, #3055A6 0%, #4A7BD4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  </style>