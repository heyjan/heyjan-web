<template>
  <section
    ref="sectionRef"
    class="project-story-section relative overflow-hidden bg-[#0b0d12] text-white"
  >
    <div class="absolute inset-0 -z-10">
      <div class="absolute left-[10%] top-[14%] h-72 w-72 rounded-full bg-primary/18 blur-3xl" />
      <div class="absolute bottom-[12%] right-[8%] h-80 w-80 rounded-full bg-white/8 blur-3xl" />
      <div class="project-story-grid absolute inset-0 opacity-30" />
    </div>

    <div class="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-20 lg:py-24">
      <div class="mb-10 max-w-3xl lg:mb-14">
        <SectionTitle title="Featured Project" />
        <p class="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Openbase is an open-source business intelligence platform built to solve forecasting,
          dashboarding, and controlled data-entry workflows that standard BI tools handled poorly.
        </p>
      </div>

      <div class="hidden lg:block">
        <div class="grid min-h-[78vh] grid-cols-[1.05fr_0.95fr] items-center gap-10">
          <div class="space-y-6">
            <div class="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.28em] text-white/60">
              <span>Open Source</span>
              <span class="h-1 w-1 rounded-full bg-white/40" />
              <span>Business Intelligence Platform</span>
            </div>

            <div class="project-hero-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.38)]">
              <div class="grid min-h-[34rem] grid-cols-[1.05fr_1fr]">
                <div class="flex items-center justify-center bg-[#f4f4f2] p-8">
                  <div class="flex w-full max-w-[26rem] justify-center rounded-[1.5rem] border border-black/6 bg-white px-10 py-12 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
                    <NuxtImg
                      src="/images/openbase-logo.png"
                      alt="Openbase logo"
                      width="512"
                      height="512"
                      loading="lazy"
                      class="h-auto w-full max-w-[19rem] object-contain"
                    />
                  </div>
                </div>

                <div class="relative flex flex-col justify-between bg-[#050608] p-8 text-white">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_45%)] opacity-80" />
                  <div class="relative flex items-center gap-4">
                    <div class="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-white/10 bg-white">
                      <Github class="h-10 w-10 text-black" />
                    </div>
                    <span class="text-6xl font-semibold tracking-tight text-white">GitHub</span>
                  </div>

                  <div class="relative space-y-4">
                    <p class="max-w-sm text-xl leading-relaxed text-white/78">
                      Built in public, maintained in production, and shaped by real forecasting teams.
                    </p>
                    <div class="flex flex-wrap gap-3">
                      <span class="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/72">
                        Nuxt 4 + Vue 3
                      </span>
                      <span class="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/72">
                        Dockerized
                      </span>
                      <span class="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/72">
                        RBAC + Audit Log
                      </span>
                    </div>
                  </div>

                  <Sparkles class="absolute bottom-6 right-6 h-8 w-8 text-white/68" />
                </div>
              </div>

              <div class="border-t border-white/8 bg-black/28 px-8 py-6">
                <div class="flex items-start justify-between gap-6">
                  <div>
                    <p class="text-[11px] font-mono uppercase tracking-[0.32em] text-white/45">
                      Current Focus
                    </p>
                    <p class="mt-2 text-2xl font-serif text-white">
                      {{ activeSlide.callout }}
                    </p>
                  </div>
                  <div class="grid grid-cols-3 gap-3 text-right text-sm text-white/60">
                    <div>
                      <div class="text-2xl font-semibold text-white">5</div>
                      <div>DB adapters</div>
                    </div>
                    <div>
                      <div class="text-2xl font-semibold text-white">12</div>
                      <div>Widget types</div>
                    </div>
                    <div>
                      <div class="text-2xl font-semibold text-white">1</div>
                      <div>Production stack</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-[auto_1fr] items-start gap-6">
            <div class="flex h-[68vh] flex-col items-center justify-between py-1">
              <div class="text-[11px] font-mono uppercase tracking-[0.34em] text-white/38">
                Story
              </div>
              <div class="story-progress-track relative h-full w-px overflow-hidden bg-white/14">
                <div
                  class="story-progress-fill absolute inset-x-0 top-0 origin-top"
                  :style="{ transform: `scaleY(${scrollProgress})` }"
                />
              </div>
              <div class="text-[11px] font-mono uppercase tracking-[0.34em] text-white/38">
                {{ currentSlide + 1 }}/{{ slides.length }}
              </div>
            </div>

            <div ref="viewportRef" class="relative h-[68vh] overflow-hidden">
              <div ref="trackRef" class="will-change-transform">
                <article
                  v-for="(slide, index) in slides"
                  :key="slide.title"
                  class="project-story-panel flex h-[68vh] items-center"
                >
                  <div
                    class="w-full rounded-[1.75rem] border px-8 py-10 transition-all duration-500"
                    :class="currentSlide === index
                      ? 'border-white/14 bg-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.24)]'
                      : 'border-white/8 bg-white/[0.03] opacity-75'"
                  >
                    <div class="mb-6 flex items-center gap-4">
                      <span class="text-sm font-mono uppercase tracking-[0.26em] text-white/45">
                        0{{ index + 1 }}
                      </span>
                      <div class="h-px w-24 bg-white/16" />
                    </div>

                    <p class="text-sm font-mono uppercase tracking-[0.3em] text-primary/90">
                      {{ slide.eyebrow }}
                    </p>
                    <h3 class="mt-4 max-w-xl text-4xl font-serif leading-tight text-white">
                      {{ slide.title }}
                    </h3>
                    <p class="mt-5 max-w-xl text-lg leading-relaxed text-white/72">
                      {{ slide.description }}
                    </p>

                    <div class="mt-8 grid gap-3">
                      <div
                        v-for="detail in slide.details"
                        :key="detail"
                        class="rounded-2xl border border-white/8 bg-black/14 px-4 py-4 text-white/72"
                      >
                        {{ detail }}
                      </div>
                    </div>

                    <div class="mt-8 flex flex-wrap gap-3">
                      <span
                        v-for="tag in slide.tags"
                        :key="tag"
                        class="rounded-full border border-primary/30 bg-primary/12 px-4 py-2 text-sm text-white"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6 lg:hidden">
        <div class="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div class="grid">
            <div class="flex items-center justify-center bg-[#f4f4f2] p-8">
              <NuxtImg
                src="/images/openbase-logo.png"
                alt="Openbase logo"
                width="512"
                height="512"
                loading="lazy"
                class="h-auto w-full max-w-[14rem] object-contain"
              />
            </div>
            <div class="relative bg-[#050608] p-6">
              <div class="mb-6 flex items-center gap-3">
                <div class="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white">
                  <Github class="h-7 w-7 text-black" />
                </div>
                <span class="text-4xl font-semibold tracking-tight text-white">GitHub</span>
              </div>
              <p class="text-base leading-relaxed text-white/72">
                Openbase is a production-tested BI platform designed for flexible analytics,
                controlled data entry, and secure dashboard sharing.
              </p>
            </div>
          </div>
        </div>

        <article
          v-for="(slide, index) in slides"
          :key="`mobile-${slide.title}`"
          class="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6"
        >
          <div class="mb-5 flex items-center gap-4">
            <span class="text-sm font-mono uppercase tracking-[0.26em] text-white/45">
              0{{ index + 1 }}
            </span>
            <div class="h-px w-24 bg-white/16" />
          </div>
          <p class="text-sm font-mono uppercase tracking-[0.3em] text-primary/90">
            {{ slide.eyebrow }}
          </p>
          <h3 class="mt-3 text-3xl font-serif leading-tight text-white">
            {{ slide.title }}
          </h3>
          <p class="mt-4 text-base leading-relaxed text-white/72">
            {{ slide.description }}
          </p>
          <div class="mt-6 space-y-3">
            <div
              v-for="detail in slide.details"
              :key="detail"
              class="rounded-2xl border border-white/8 bg-black/16 px-4 py-4 text-white/72"
            >
              {{ detail }}
            </div>
          </div>
        </article>
      </div>

      <div class="mt-12 flex flex-wrap gap-4">
        <a
          href="https://github.com/heyjan/openbase"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Github class="h-4 w-4" />
          View Openbase on GitHub
          <ArrowUpRight class="h-4 w-4" />
        </a>
        <p class="flex items-center text-sm text-white/55">
          Running in production for Amazon Vendor Central forecasting workflows at Liqui Moly.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Github,
  Sparkles,
} from 'lucide-vue-next'
import SectionTitle from '~/components/ui/SectionTitle.vue'

const slides = [
  {
    eyebrow: 'Why it exists',
    title: 'Built when existing BI tooling became the bottleneck.',
    description: 'Openbase started as a response to rigid analytics tools that could not support forecasting-specific workflows, controlled data entry, or the permission model needed by business teams.',
    details: [
      'Running in production at Liqui Moly for demand forecasting dashboards built on Amazon Vendor Central data.',
      'Designed so non-technical users can work with dashboards without touching SQL.',
    ],
    tags: ['Forecasting', 'Dashboards', 'Production'],
    callout: 'Flexible analytics without the usual BI rigidity.',
  },
  {
    eyebrow: 'How it is built',
    title: 'A full-stack TypeScript platform with one deployable runtime.',
    description: 'The stack combines Nuxt 4, Vue 3, Nitro, Tailwind CSS 4, and ECharts in a single Dockerized application, with a unified query layer spanning PostgreSQL, MySQL, DuckDB, SQLite, and MongoDB.',
    details: [
      'Saved queries support named parameters and strict read-only validation for analytical workloads.',
      'Twelve visualization modules cover KPI cards, time series, tables, outlier tracking, and confidence-band forecasting views.',
    ],
    tags: ['Nuxt 4', 'Multi-DB', 'Docker'],
    callout: 'One deployable stack from UI to API to query execution.',
  },
  {
    eyebrow: 'Why it matters',
    title: 'Security, governance, and AI-assisted dashboarding are built in.',
    description: 'Openbase uses AES-256-GCM encryption, role-based access control, rate limiting, security headers, and audit logging today, with LLM-assisted dashboard creation planned as the next major feature.',
    details: [
      'Writable tables let editors update approved PostgreSQL tables through validated server-side pipelines instead of raw SQL.',
      'Public sharing, PDF export, and upcoming natural-language dashboard creation make the system usable beyond engineering teams.',
    ],
    tags: ['RBAC', 'Audit Logs', 'AI Roadmap'],
    callout: 'Governed analytics now, natural-language dashboarding next.',
  },
] as const

const sectionRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const viewportRef = ref<HTMLElement | null>(null)
const currentSlide = ref(0)
const scrollProgress = ref(0)

const activeSlide = computed(() => slides[currentSlide.value] ?? slides[0])

let ctx: gsap.Context | null = null
let mediaMatcher: gsap.MatchMedia | null = null

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  setTimeout(() => {
    if (!sectionRef.value || !trackRef.value || !viewportRef.value) return

    ctx = gsap.context(() => {
      mediaMatcher = gsap.matchMedia()

      mediaMatcher.add('(min-width: 1024px)', () => {
        const viewportHeight = () => viewportRef.value?.offsetHeight ?? 0

        gsap.to(trackRef.value, {
          y: () => -((slides.length - 1) * viewportHeight()),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.value,
            pin: true,
            pinSpacing: true,
            start: 'top top',
            end: () => `+=${(slides.length - 1) * window.innerHeight}`,
            scrub: 0.45,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              scrollProgress.value = self.progress
              currentSlide.value = Math.round(self.progress * (slides.length - 1))
            },
          },
        })
      })
    }, sectionRef.value)
  }, 100)
})

onUnmounted(() => {
  mediaMatcher?.revert()
  ctx?.revert()
})
</script>

<style scoped>
.project-story-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(circle at center, black 45%, transparent 85%);
}

.project-hero-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), transparent 22%),
    linear-gradient(315deg, rgba(255, 255, 255, 0.05), transparent 18%);
}

.story-progress-fill {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(48, 85, 166, 0.85));
}

.project-story-section :deep(h2) {
  color: white;
}

.project-story-section :deep(.h-px) {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.18), transparent);
}
</style>
