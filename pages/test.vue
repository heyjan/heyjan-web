<template>
  <div class="min-h-screen">
    <AppHeader />
    
    <main class="pt-20">
      <div class="section-padding">
        <div class="max-w-4xl mx-auto mb-8">
          <Breadcrumb />
        </div>
      </div>
      <!-- Hero Section -->
      <section class="section-padding min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        </div>

        <div class="max-w-2xl text-center" ref="heroRef">
          <h1 class="text-5xl md:text-6xl font-serif text-white mb-6">Test Page</h1>
          <p class="text-xl text-gray-400 mb-8">
            This is a test page to demonstrate the page transition effects. Navigate using the navbar to see smooth GSAP transitions in action.
          </p>
          <div class="flex gap-4 justify-center">
            <NuxtLink to="/" class="px-6 py-3 bg-primary text-dark-300 font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
              Back to Home
            </NuxtLink>
            <NuxtLink to="/contact" class="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-dark-300 transition-all duration-300 hover:scale-105">
              Go to Contact
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="section-padding bg-dark-200/50 relative">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-serif text-white mb-12 text-center">Test Features</h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div v-for="(feature, index) in features" :key="index" class="p-6 border border-gray-800 rounded-lg hover:border-primary/50 transition-all duration-300" ref="featureRefs">
              <component :is="feature.icon" class="w-8 h-8 text-primary mb-4" />
              <h3 class="text-lg font-serif text-white mb-2">{{ feature.title }}</h3>
              <p class="text-gray-400">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Grid -->
      <section class="section-padding">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-serif text-white mb-12 text-center">Dummy Content</h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div v-for="(item, index) in dummyItems" :key="index" class="p-6 bg-dark-200 rounded-lg border border-gray-800">
              <h3 class="text-xl font-serif text-primary mb-4">{{ item.title }}</h3>
              <p class="text-gray-400 leading-relaxed">
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="section-padding bg-dark-200/50">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-serif text-white mb-8 text-center">Page Transition Implementation</h2>
          
          <div class="bg-dark-300 rounded-lg border border-gray-800 p-6 overflow-x-auto">
            <pre class="text-gray-400 text-sm"><code>{{ codeExample }}</code></pre>
          </div>
          
          <p class="text-gray-400 mt-6 text-center">
            The page transition uses GSAP JavaScript hooks to animate page changes. Navigate using the navbar to see it in action!
          </p>
        </div>
      </section>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Zap, Rocket, Star } from 'lucide-vue-next'
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import Breadcrumb from '~/components/ui/Breadcrumb.vue'

const heroRef = ref(null)
const featureRefs = ref([])

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience smooth, responsive page transitions powered by GSAP animations.'
  },
  {
    icon: Rocket,
    title: 'Smooth Navigation',
    description: 'Navigate between pages with elegant horizontal sliding animations.'
  },
  {
    icon: Star,
    title: 'Professional Polish',
    description: 'Every transition is carefully timed and orchestrated for visual impact.'
  }
]

const dummyItems = [
  {
    title: 'Test Item 1',
    content: 'This is dummy content to fill the page and demonstrate how the page transition effects work when you navigate away from this page.'
  },
  {
    title: 'Test Item 2',
    content: 'The transition effect will slide this page out to the left while fading it out, then slide the new page in from the right while fading it in.'
  },
  {
    title: 'Test Item 3',
    content: 'You can navigate to the Contact page or back to the Home page using the navbar to see the transitions in action.'
  },
  {
    title: 'Test Item 4',
    content: 'All page transitions use GSAP with power2 easing for a smooth, professional feel that enhances the user experience.'
  }
]

const codeExample = `// In app.vue
<NuxtPage :transition="{
  name: 'page',
  mode: 'out-in',
  onBeforeEnter: (el) => {
    gsap.set(el, { opacity: 0, x: 100 })
  },
  onEnter: (el, done) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: done
    })
  },
  onLeave: (el, done) => {
    gsap.to(el, {
      opacity: 0,
      x: -100,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: done
    })
  }
}" />`

useHead({
  title: 'Test Page - Jan Mayer',
  meta: [
    { name: 'description', content: 'Test page to demonstrate page transition effects' }
  ]
})

onMounted(() => {
  // Animate hero section
  gsap.from(heroRef.value, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Animate feature cards with stagger
  gsap.from(featureRefs.value, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  })
})
</script>



