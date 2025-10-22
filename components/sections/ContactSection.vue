<template>
  <section id="contact" class="section-padding min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 -z-10">
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <!-- Floating Particles -->
      <div 
        v-for="i in 15" 
        :key="i"
        class="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
          animationDuration: (3 + Math.random() * 4) + 's'
        }"
      ></div>
    </div>

    <div class="max-w-4xl w-full mx-auto relative z-10">
      <!-- Section Title -->
      <div class="mb-12 text-center" ref="titleRef">
        <h2 class="text-4xl md:text-5xl font-serif text-white mb-4">Get In Touch</h2>
        <p class="text-gray-400 text-lg">Let's discuss your project or just say hello</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- Contact Info Cards -->
        <div 
          v-for="(info, index) in contactInfo" 
          :key="index"
          class="contact-card p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition-all duration-300"
          :ref="el => infoCardsRef[index] = el"
        >
            <a :href="info.link" target="_blank">
          <component :is="info.icon" class="w-8 h-8 text-primary mb-4" />
          <h3 class="text-white font-serif text-lg mb-2">{{ info.title }}</h3>
          <p class="text-gray-400">{{ info.value }}</p>
            </a>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="bg-dark-200/50 border border-gray-800 rounded-lg p-8" ref="formRef">
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <!-- Name Field -->
          <div class="form-group" ref="nameFieldRef">
            <label for="name" class="block text-white font-medium mb-2">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-3 bg-dark-300 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
              required
            />
            <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div class="form-group" ref="emailFieldRef">
            <label for="email" class="block text-white font-medium mb-2">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              class="w-full px-4 py-3 bg-dark-300 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
              required
            />
            <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Subject Field -->
        <div class="form-group mb-6" ref="subjectFieldRef">
          <label for="subject" class="block text-white font-medium mb-2">Subject</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            placeholder="Project Inquiry"
            class="w-full px-4 py-3 bg-dark-300 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
            required
          />
          <p v-if="errors.subject" class="text-red-400 text-sm mt-1">{{ errors.subject }}</p>
        </div>

        <!-- Message Field -->
        <div class="form-group mb-8" ref="messageFieldRef">
          <label for="message" class="block text-white font-medium mb-2">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            placeholder="Tell me about your project..."
            rows="6"
            class="w-full px-4 py-3 bg-dark-300 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
            required
          ></textarea>
          <p v-if="errors.message" class="text-red-400 text-sm mt-1">{{ errors.message }}</p>
        </div>

        <!-- Submit Button -->
        <div ref="buttonRef">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-8 py-3 bg-primary text-dark-300 font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else>Sending...</span>
          </button>
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

<script setup>
import { ref, onMounted, reactive } from 'vue'
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
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const generalError = ref('')

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
const titleRef = ref(null)
const infoCardsRef = ref([])
const formRef = ref(null)
const nameFieldRef = ref(null)
const emailFieldRef = ref(null)
const subjectFieldRef = ref(null)
const messageFieldRef = ref(null)
const buttonRef = ref(null)
const successRef = ref(null)
const errorRef = ref(null)

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
    // Simulate API call (replace with actual endpoint)
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    successMessage.value = 'Thank you! Your message has been sent successfully.'
    
    // Animate success message
    if (successRef.value) {
      gsap.from(successRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: 'back.out'
      })
    }

    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''

    // Hide success message after 5 seconds
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
    generalError.value = error.message || 'An error occurred. Please try again.'
    
    // Animate error message
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
        boxShadow: '0 20px 40px rgba(212, 165, 116, 0.15)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 0px 0px rgba(212, 165, 116, 0)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })

  // Add focus effects to form fields
  const inputs = formRef.value?.querySelectorAll('input, textarea')
  inputs?.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 20px rgba(212, 165, 116, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: '0 0 0px rgba(212, 165, 116, 0)',
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
  background: linear-gradient(135deg, rgba(212, 165, 116, 0.05) 0%, rgba(212, 165, 116, 0.02) 100%);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.contact-card:hover {
  background: linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(212, 165, 116, 0.05) 100%);
}

input:focus,
textarea:focus {
  border-color: #D4A574;
}

input::placeholder,
textarea::placeholder {
  color: #666666;
}
</style>
