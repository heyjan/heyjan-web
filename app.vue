<template>
  <div>
    <!-- Top curtain overlay -->
    <div 
      id="page-overlay-top"
      class="fixed left-0 right-0 z-[9999] pointer-events-none bg-dark-300"
      style="height: 50%; top: 0; transform: scaleY(0); transform-origin: top;"
    />
    
    <!-- Bottom curtain overlay -->
    <div 
      id="page-overlay-bottom"
      class="fixed left-0 right-0 z-[9999] pointer-events-none bg-dark-300"
      style="height: 50%; bottom: 0; transform: scaleY(0); transform-origin: bottom;"
    />
    
    <!-- Center glow effect -->
    <div 
      id="page-overlay-glow"
      class="fixed left-0 right-0 top-1/2 z-[9998] pointer-events-none"
      style="height: 2px; background: linear-gradient(90deg, transparent, #D4A574, transparent); transform: translateY(-50%) scaleX(0); opacity: 0;"
    />
    
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in',
        onBeforeEnter: (el) => {
          if (el) {
            gsap.set(el, {
              opacity: 0
            })
          }
        },
        onEnter: (el, done) => {
          if (el) {
            gsap.to(el, {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: done
            })
          } else {
            done()
          }
        },
        onBeforeLeave: (el) => {
          if (el) {
            playTransitionAnimation()
          }
        },
        onLeave: (el, done) => {
          if (el) {
            gsap.to(el, {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
              delay: 0.2,
              onComplete: done
            })
          } else {
            done()
          }
        }
      }" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

/**
 * Play the dual-curtain transition animation
 */
const playTransitionAnimation = () => {
  const overlayTop = document.getElementById('page-overlay-top')
  const overlayBottom = document.getElementById('page-overlay-bottom')
  const overlayGlow = document.getElementById('page-overlay-glow')
  
  if (!overlayTop || !overlayBottom || !overlayGlow) return
  
  const tl = gsap.timeline()
  
  // Curtains close (slide in from top and bottom)
  tl.to([overlayTop, overlayBottom], {
    scaleY: 1,
    duration: 0.5,
    ease: 'power2.inOut'
  }, 0)
  
  // Glow effect grows in center
  tl.to(overlayGlow, {
    scaleX: 1,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.inOut'
  }, 0)
  
  // Hold for a moment
  tl.to({}, { duration: 0.2 })
  
  // Curtains open (slide out)
  tl.to([overlayTop, overlayBottom], {
    scaleY: 0,
    duration: 0.5,
    ease: 'power2.inOut'
  })
  
  // Glow fades out as curtains open
  tl.to(overlayGlow, {
    scaleX: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.inOut'
  }, '-=0.5')
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from {
  opacity: 0;
}

.page-leave-to {
  opacity: 0;
}
</style>
