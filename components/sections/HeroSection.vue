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
          <span class="text-lg md:text-xl text-text-muted font-mono">Full-Stack Developer / AI Solution Architect</span>
        </div>
        
        <div class="mb-6">
          <span class="text-text/80 block mb-2 text-2xl md:text-6xl font-serif" ref="introText">This is</span>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif text-primary relative inline-block" ref="nameText">
            {{ name }}
            <!-- Underline effect -->
            <div class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-highlight opacity-80" ref="underlineRef" style="z-index: 1000;"></div>
          </h1>
        </div>
        
        <!-- Description with fade-in effect -->
        <div class="mb-8" ref="descriptionRef">
          <p class="text-lg text-text-muted leading-relaxed max-w-lg">
            Designing and building enterprise AI that drives efficiency and real-world impact.
          </p>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex gap-4" ref="buttonsRef">
          <NuxtLink
            to="/jan-mayer"
            class="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            About Jan Mayer
          </NuxtLink>
          <NuxtLink
            to="/cv"
            class="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
          >
            View CV
          </NuxtLink>
        </div>
      </div>
      
      <!-- Profile Image with enhanced effects -->
      <div class="hidden md:block relative z-10" ref="imageRef">
        <div class="relative">
          <!-- Glow effect -->
          <div class="absolute inset-0 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-highlight/50 blur-xl scale-110"></div>
          
          <!-- Main image container -->
          <div class="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/40 relative group">
            <img 
              :src="profileImage" 
              :alt="name"
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
    gsap.set([subtitleRef.value, introText.value, nameText.value, descriptionRef.value, buttonsRef.value], {
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
    .to(imageRef.value, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.3)'
    }, '-=0.6')
    
    // Add hover effects for buttons
    const buttons = buttonsRef.value?.querySelectorAll('button')
    buttons?.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })
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
  
  /* Enhanced button hover effects */
  button {
    position: relative;
    overflow: hidden;
  }
  
  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  button:hover::before {
    left: 100%;
  }
  </style>