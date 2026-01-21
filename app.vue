<template>
  <div class="h-full">
    <!-- Scanner Bar Effect -->
    <div id="shutter-bar" class="shutter-bar" />

    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in',
        onBeforeLeave: handleBeforeLeave,
        onLeave: handleLeave,
        onBeforeEnter: handleBeforeEnter,
        onEnter: handleEnter,
        onAfterEnter: handleAfterEnter
      }" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

// Configuration
const TRANSITION_DURATION = 2
const EASE = 'power2.inOut'

/**
 * Get the scanner bar element
 */
const getBar = () => document.getElementById('shutter-bar')

/**
 * Play scanner bar animation synced with page transition
 */
const animateScannerBar = () => {
  const bar = getBar()
  if (!bar) return

  gsap.fromTo(bar, 
    { top: '100%', opacity: 0 },
    {
      top: '-10%',
      opacity: 1,
      duration: TRANSITION_DURATION,
      ease: EASE,
      onComplete: () => {
        gsap.set(bar, { opacity: 0, top: '100%' })
      }
    }
  )
}

/**
 * Before leave: Start scanner bar and prepare leaving page
 */
const handleBeforeLeave = (el) => {
  if (!el) return
  animateScannerBar()
  gsap.set(el, { 
    zIndex: 10,
    transformOrigin: 'center center'
  })
}

/**
 * Leave: Animate leaving page out
 */
const handleLeave = (el, done) => {
  if (!el) {
    done()
    return
  }

  gsap.to(el, {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
    duration: TRANSITION_DURATION * 0.5,
    ease: EASE,
    onComplete: done
  })
}

/**
 * Before enter: Prepare entering page
 */
const handleBeforeEnter = (el) => {
  if (!el) return
  gsap.set(el, {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(10px) saturate(0%)',
    zIndex: 20
  })
}

/**
 * Enter: Animate entering page in
 */
const handleEnter = (el, done) => {
  if (!el) {
    done()
    return
  }

  gsap.to(el, {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px) saturate(100%)',
    duration: TRANSITION_DURATION * 0.6,
    delay: TRANSITION_DURATION * 0.3,
    ease: 'power2.out',
    onComplete: done
  })
}

/**
 * After enter: Clean up
 */
const handleAfterEnter = (el) => {
  if (!el) return
  gsap.set(el, { clearProps: 'all' })
}
</script>

<style scoped>
/* Page transition classes for fallback */
.page-enter-active,
.page-leave-active {
  transition: none;
}
</style>
