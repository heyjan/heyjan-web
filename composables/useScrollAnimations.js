import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollAnimations = () => {

  const fadeInUp = (element, options = {}) => {
    const defaults = {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const fadeInLeft = (element, options = {}) => {
    const defaults = {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const fadeInRight = (element, options = {}) => {
    const defaults = {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }

    return gsap.from(element, { ...defaults, ...options })
  }

  const staggerFadeIn = (elements, options = {}) => {
    const defaults = {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }

    return gsap.from(elements, { ...defaults, ...options })
  }

  const parallax = (element, speed = 0.5) => {
    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }

  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    staggerFadeIn,
    parallax,
    gsap,
    ScrollTrigger
  }
}