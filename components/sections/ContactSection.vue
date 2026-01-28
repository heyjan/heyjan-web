<template>
  <section id="contact" class="section-padding min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 -z-10">
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-highlight/40 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <!-- Floating Particles -->
      <div 
        v-for="particle in particles" 
        :key="`particle-${particle.id}`"
        class="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
        :style="{
          left: particle.left + '%',
          top: particle.top + '%',
          animationDelay: particle.delay + 's',
          animationDuration: particle.duration + 's'
        }"
      ></div>
    </div>

    <div class="max-w-4xl w-full mx-auto relative z-10">
      <!-- Section Title -->
      <div class="mb-12" ref="titleRef">
        <div class="flex justify-center mb-8">
          <div class="flex items-center gap-3">
            <h2 class="text-2xl md:text-3xl font-serif text-text">Get In Touch</h2>
          </div>
        </div>
        <div class="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-4 max-w-md mx-auto"></div>
        <p class="text-text-muted text-lg mt-4 text-center">Let's discuss your project or just say hello</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- Contact Info Cards -->
        <div 
          v-for="(info, index) in contactInfo" 
          :key="index"
          class="contact-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
          :ref="(el: any) => { if (el) infoCardsRef[index] = el }"
        >
            <a :href="info.link" target="_blank">
          <component :is="info.icon" class="w-8 h-8 text-primary mb-4" />
          <h3 class="text-text font-serif text-lg mb-2">{{ info.title }}</h3>
          <p class="text-text-muted">{{ info.value }}</p>
            </a>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="bg-surface border border-border rounded-lg p-8 shadow-sm" ref="formRef">
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <!-- Name Field -->
          <div class="form-group" ref="nameFieldRef">
            <label for="name" class="block text-text font-medium mb-2">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-3 bg-background border border-border text-text placeholder-text-muted/60 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
              required
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div class="form-group" ref="emailFieldRef">
            <label for="email" class="block text-text font-medium mb-2">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              class="w-full px-4 py-3 bg-background border border-border text-text placeholder-text-muted/60 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
              required
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Subject Field -->
        <div class="form-group mb-6" ref="subjectFieldRef">
          <label for="subject" class="block text-text font-medium mb-2">Subject</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            placeholder="Project Inquiry"
            class="w-full px-4 py-3 bg-background border border-border text-text placeholder-text-muted/60 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
            required
          />
          <p v-if="errors.subject" class="text-red-500 text-sm mt-1">{{ errors.subject }}</p>
        </div>

        <!-- Message Field -->
        <div class="form-group mb-6" ref="messageFieldRef">
          <label for="message" class="block text-text font-medium mb-2">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            placeholder="Tell me about your project..."
            rows="6"
            class="w-full px-4 py-3 bg-background border border-border text-text placeholder-text-muted/60 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
            required
          ></textarea>
          <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
        </div>

        <!-- Turnstile Widget -->
        <div class="form-group mb-6 flex justify-center" ref="turnstileRef">
          <div id="turnstile-widget"></div>
        </div>
        <p v-if="errors.turnstile" class="text-red-400 text-sm mt-1 mb-2 text-center">{{ errors.turnstile }}</p>

        <!-- Submit Button -->
        <div ref="buttonRef">
          <DitherButton
            type="submit"
            variant="primary"
            size="lg"
            :disabled="isSubmitting"
            class="w-full"
          >
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else>Sending...</span>
          </DitherButton>
        </div>

        <!-- Success Message -->
        <div 
          v-if="successMessage"
          class="mt-4 p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg text-center"
          ref="successRef"
        >
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div 
          v-if="generalError"
          class="mt-4 p-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-center"
          ref="errorRef"
        >
          {{ generalError }}
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { gsap } from 'gsap'
import { Mail, MessageSquare, Phone } from 'lucide-vue-next'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  turnstile: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const generalError = ref('')
const turnstileToken = ref<string>('')
const turnstileWidgetId = ref<string | null>(null)
const turnstileReady = ref<boolean>(false)
const turnstileInitialized = ref<boolean>(false)

// Contact info with icons
const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'jan(at)heyjan.de'
  },
  {
    icon: MessageSquare,
    title: 'Message',
    value: 'Let\'s connect on social media',
    link: 'https://www.linkedin.com/in/jan-mayer-a8b7b4176/'
  },
]

// Refs for animations
const titleRef = ref<HTMLElement | null>(null)
const infoCardsRef = ref<(HTMLElement | null)[]>([])
const formRef = ref<HTMLElement | null>(null)
const nameFieldRef = ref<HTMLElement | null>(null)
const emailFieldRef = ref<HTMLElement | null>(null)
const subjectFieldRef = ref<HTMLElement | null>(null)
const messageFieldRef = ref<HTMLElement | null>(null)
const turnstileRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
const successRef = ref<HTMLElement | null>(null)
const errorRef = ref<HTMLElement | null>(null)

// Particles for background animation
interface Particle {
  id: number
  left: number
  top: number
  delay: number
  duration: number
}
const particles = ref<Particle[]>([])

// Validation
const validateForm = () => {
  let isValid = true
  
  if (!form.name || form.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  } else {
    errors.name = ''
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email || !emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  } else {
    errors.email = ''
  }

  if (!form.subject || form.subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters'
    isValid = false
  } else {
    errors.subject = ''
  }

  if (!form.message || form.message.length < 10) {
    errors.message = 'Message must be at least 10 characters'
    isValid = false
  } else {
    errors.message = ''
  }

  if (!turnstileToken.value) {
    errors.turnstile = 'Please complete the verification challenge'
    isValid = false
  } else {
    errors.turnstile = ''
  }

  return isValid
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  generalError.value = ''
  successMessage.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        'cf-turnstile-response': turnstileToken.value
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    successMessage.value = 'Thank you! Your message has been sent successfully.'
    
    if (successRef.value) {
      gsap.from(successRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: 'back.out'
      })
    }

    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    turnstileToken.value = ''
    
    // Reset Turnstile widget
    if (turnstileWidgetId.value && typeof window !== 'undefined') {
      const windowWithTurnstile = window as typeof window & {
        turnstile?: {
          reset: (widgetId: string) => void
        }
      }
      if (windowWithTurnstile.turnstile) {
        windowWithTurnstile.turnstile.reset(turnstileWidgetId.value)
      }
    }

    setTimeout(() => {
      gsap.to(successRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          successMessage.value = ''
        }
      })
    }, 5000)
  } catch (error) {
    generalError.value = error instanceof Error ? error.message : 'An error occurred. Please try again.'
    
    if (errorRef.value) {
      gsap.from(errorRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: 'back.out'
      })
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // Generate 15 random particles
  for (let i = 0; i < 15; i++) {
    particles.value.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    })
  }

  // Dynamically load and initialize Turnstile
  const loadAndInitTurnstile = () => {
    if (typeof window === 'undefined') {
      return
    }

    // Prevent double initialization
    if (turnstileInitialized.value || turnstileWidgetId.value) {
      return
    }

    // Get site key from runtime config
    const config = useRuntimeConfig()
    const siteKey = config?.public?.turnstileSiteKey || ''

    if (!siteKey) {
      console.warn('Turnstile site key not configured')
      return
    }

    // Function to render the widget once Turnstile is ready
    const renderWidget = () => {
      const windowWithTurnstile = window as typeof window & {
        turnstile?: {
          render: (container: string, options: {
            sitekey: string
            theme: string
            size: string
            callback: (token: string) => void
            'error-callback': () => void
            'expired-callback': () => void
          }) => string
          reset: (widgetId: string) => void
        }
      }

      if (!windowWithTurnstile.turnstile) {
        // Wait for script to fully load
        setTimeout(renderWidget, 100)
        return
      }

      const container = document.getElementById('turnstile-widget')
      if (!container) {
        setTimeout(renderWidget, 100)
        return
      }

      // Check if widget is already rendered
      if (container.querySelector('.cf-turnstile')) {
        turnstileInitialized.value = true
        return
      }

      turnstileInitialized.value = true

      try {
        turnstileWidgetId.value = windowWithTurnstile.turnstile.render('#turnstile-widget', {
          sitekey: siteKey,
          theme: 'auto',
          size: 'normal',
          callback: (token: string) => {
            turnstileToken.value = token
            errors.turnstile = ''
            turnstileReady.value = true
          },
          'error-callback': () => {
            turnstileToken.value = ''
            errors.turnstile = 'Verification failed. Please try again.'
            turnstileReady.value = false
          },
          'expired-callback': () => {
            turnstileToken.value = ''
            errors.turnstile = 'Verification expired. Please verify again.'
            turnstileReady.value = false
          }
        })
      } catch (error) {
        turnstileInitialized.value = false
        console.error('Turnstile rendering error:', error)
      }
    }

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')
    if (existingScript || (window as any).turnstile) {
      renderWidget()
      return
    }

    // Set up the onload callback before adding the script
    ;(window as any).onTurnstileLoad = () => {
      nextTick(() => {
        renderWidget()
      })
    }

    // Dynamically inject the Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad'
    script.defer = true
    document.head.appendChild(script)
  }

  // Load Turnstile after a short delay to let the component render first
  nextTick(() => {
    loadAndInitTurnstile()
  })

  // Create timeline for coordinated animations
  const tl = gsap.timeline()

  // Set initial states
  gsap.set(titleRef.value, {
    opacity: 0,
    y: 30
  })

  gsap.set(infoCardsRef.value, {
    opacity: 0,
    y: 30
  })

  gsap.set([nameFieldRef.value, emailFieldRef.value, subjectFieldRef.value, messageFieldRef.value], {
    opacity: 0,
    x: -20
  })

  gsap.set(buttonRef.value, {
    opacity: 0,
    y: 20
  })

  // Animate title
  tl.to(titleRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Animate info cards with stagger
  .to(infoCardsRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  }, '-=0.3')

  // Animate form fields
  .to([nameFieldRef.value, emailFieldRef.value], {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.2')

  .to(subjectFieldRef.value, {
    opacity: 1,
    x: 0,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3')

  .to(messageFieldRef.value, {
    opacity: 1,
    x: 0,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3')

  .to(buttonRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3')

  // Add hover effects to info cards
  const cards = document.querySelectorAll('.contact-card')
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        boxShadow: '0 20px 40px rgba(48, 85, 166, 0.15)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 0px 0px rgba(48, 85, 166, 0)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })

  // Add focus effects to form fields
  const inputs = formRef.value ? (formRef.value as HTMLElement).querySelectorAll('input, textarea') : null
  inputs?.forEach((input: Element) => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 20px rgba(48, 85, 166, 0.25)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: '0 0 0px rgba(48, 85, 166, 0)',
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

.contact-card {
  background: linear-gradient(135deg, rgba(48, 85, 166, 0.05) 0%, rgba(254, 222, 199, 0.08) 100%);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.contact-card:hover {
  background: linear-gradient(135deg, rgba(48, 85, 166, 0.1) 0%, rgba(254, 222, 199, 0.15) 100%);
}

input:focus,
textarea:focus {
  border-color: #3055A6;
}

input::placeholder,
textarea::placeholder {
  color: #888888;
}
</style>
