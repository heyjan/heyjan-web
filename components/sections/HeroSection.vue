<template>
  <section class="hero-section relative overflow-hidden">
    <!-- Ambient background layers -->
    <div class="bg-layer" aria-hidden="true"></div>
    <div class="bg-dots" aria-hidden="true"></div>

    <div class="hero-grid">
      <!-- LEFT COLUMN -->
      <div class="left-col" ref="leftColRef">
        <p class="eyebrow" ref="eyebrowRef">
          <span class="status-dot" aria-hidden="true"></span>
          Full-Stack Developer / AI Solution Architect
        </p>

        <div class="headline-wrap" ref="headlineRef">
          <span class="headline-intro">This is</span>
          <h1 class="headline-name">
            {{ name }}<span class="headline-underline" ref="underlineRef"></span>
          </h1>
        </div>

        <p class="lede" ref="ledeRef">
          Designing and building enterprise AI that drives efficiency
          and real-world impact &mdash; from data pipelines to production-ready agents.
        </p>

        <div class="ctas-ab" ref="ctasRef">
          <div class="cta-row">
            <span class="cta-label">// dither</span>
            <div class="cta-group">
              <DitherButton to="/jan-mayer" variant="primary" size="md">
                About Jan Mayer
              </DitherButton>
              <DitherButton to="/cv" variant="secondary" size="md">
                View CV
              </DitherButton>
            </div>
          </div>
          <div class="cta-row">
            <span class="cta-label">// flat</span>
            <div class="cta-group">
              <FlatButton to="/jan-mayer" variant="primary" size="md">
                About Jan Mayer
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </FlatButton>
              <FlatButton to="/cv" variant="ghost" size="md">
                View CV
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 3v12M6 9l6 6 6-6M5 21h14"/>
                </svg>
              </FlatButton>
            </div>
          </div>
        </div>

        <div class="facts" ref="factsRef">
          <div class="fact">
            <div class="fact-num">10+</div>
            <div class="fact-lbl">years shipping</div>
          </div>
          <div class="fact">
            <div class="fact-num">7+</div>
            <div class="fact-lbl">projects &middot; last 12mo</div>
          </div>
          <div class="fact">
            <div class="fact-num">EU / DE</div>
            <div class="fact-lbl">remote &middot; ulm</div>
          </div>
        </div>

        <div class="badges" ref="badgesRef">
          <span class="badges-label">Certified</span>
          <div class="badge-stack">
            <a
              href="https://www.credly.com/badges/7c094bab-d491-4b9c-a1b9-b552c242c92a"
              target="_blank"
              rel="noopener noreferrer"
              class="badge-link"
              title="NVIDIA Certified Associate: Generative AI LLMs - view credential on Credly"
            >
              <NuxtImg
                src="/images/nvidia-nca-genl-badge.png"
                alt="NVIDIA Certified Associate: Generative AI LLMs"
                width="120"
                height="140"
                format="webp"
                loading="lazy"
                class="badge-img"
              />
            </a>
            <a
              href="https://www.credly.com/badges/a5c0ee1f-8979-47d3-9be7-cb67b3d0055c"
              target="_blank"
              rel="noopener noreferrer"
              class="badge-link"
              title="Professional Scrum Product Owner I (PSPO I) - view credential on Credly"
            >
              <NuxtImg
                src="/images/pspo-i-badge.png"
                alt="Professional Scrum Product Owner I (PSPO I)"
                width="120"
                height="120"
                format="webp"
                loading="lazy"
                class="badge-img"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: portrait + floating chips -->
      <div class="portrait-stage" ref="portraitRef">
        <div class="portrait-halo" aria-hidden="true"></div>

        <div class="chip c1">
          <div class="chip-ic">AI</div>
          <div class="chip-meta">
            <b>Enterprise GenAI</b>
            <small>RAG &middot; Agents &middot; Eval</small>
          </div>
        </div>

        <div class="chip c2">
          <div class="chip-ic">&#8984;</div>
          <div class="chip-meta">
            <b>Full-Stack</b>
            <small>TS &middot; Nuxt &middot; Python</small>
          </div>
        </div>

        <div class="chip c3">
          <div class="chip-ic">DE</div>
          <div class="chip-meta">
            <b>Data Engineering</b>
            <small>ETL &middot; Spark &middot; Airflow</small>
          </div>
        </div>

        <div class="chip c4">
          <div class="chip-ic">&#9733;</div>
          <div class="chip-meta">
            <b>Product mindset</b>
            <small>PSPO I &middot; Scrum.org</small>
          </div>
        </div>

        <div class="portrait-ring">
          <div class="portrait-inner">
            <NuxtImg
              :src="profileImage"
              :alt="name"
              format="webp"
              loading="eager"
              fetchpriority="high"
              width="360"
              height="360"
              class="portrait-img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

defineProps({
  name: {
    type: String,
    default: 'Jan Mayer'
  },
  profileImage: {
    type: String,
    default: '/images/profile.png'
  }
})

const eyebrowRef = ref(null)
const headlineRef = ref(null)
const underlineRef = ref(null)
const ledeRef = ref(null)
const ctasRef = ref(null)
const factsRef = ref(null)
const badgesRef = ref(null)
const portraitRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()

  gsap.set([
    eyebrowRef.value,
    headlineRef.value,
    ledeRef.value,
    ctasRef.value,
    factsRef.value,
    badgesRef.value
  ], { opacity: 0, y: 20 })

  gsap.set(underlineRef.value, { scaleX: 0, transformOrigin: 'left center' })
  gsap.set(portraitRef.value, { opacity: 0, scale: 0.9 })

  tl.to(eyebrowRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to(headlineRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35')
    .to(underlineRef.value, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .to(portraitRef.value, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6')
    .to(ledeRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
    .to(ctasRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to(factsRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to(badgesRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}

/* Ambient background */
.bg-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(900px 600px at 55% 40%, rgba(48, 85, 166, 0.10), transparent 60%),
    radial-gradient(700px 500px at 70% 75%, rgba(254, 222, 199, 0.55), transparent 65%);
}

.bg-dots {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.55;
  background-image: radial-gradient(rgba(26, 26, 26, 0.18) 1px, transparent 1px);
  background-size: 26px 26px;
  background-position: 0 0;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

/* Hero grid: tight 2-col, no center void */
.hero-grid {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 28px 24px 64px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 56px;
  align-items: center;
}

/* Eyebrow */
.eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--color-text-muted);
  margin: 0 0 22px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
  animation: status-pulse 2.4s ease-in-out infinite;
}

@keyframes status-pulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18); }
  50%      { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0.06); }
}

/* Headline */
.headline-wrap {
  display: block;
  margin: 0;
}

.headline-intro {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(40px, 5.4vw, 76px);
  line-height: 0.98;
  letter-spacing: -0.03em;
  font-weight: 600;
  color: var(--color-text);
}

.headline-name {
  position: relative;
  display: inline-block;
  margin: 4px 0 0;
  font-family: var(--font-serif);
  font-size: clamp(48px, 6.4vw, 92px);
  line-height: 0.98;
  letter-spacing: -0.03em;
  font-weight: 600;
  color: var(--color-primary);
  width: max-content;
  max-width: 100%;
}

.headline-underline {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-highlight));
  border-radius: 3px;
}

/* Lede */
.lede {
  margin: 22px 0 0;
  max-width: 46ch;
  font-size: 18px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

/* CTAs — A/B layout: dither row + flat row stacked */
.ctas-ab {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.cta-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
  min-width: 52px;
  opacity: 0.7;
}

.cta-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Quick facts strip */
.facts {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  max-width: 540px;
}

.fact {
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 14px 16px;
}

.fact-num {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.fact-lbl {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
  text-transform: lowercase;
  letter-spacing: 0.02em;
}

/* Badges */
.badges {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.badges-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.badge-stack {
  display: flex;
  gap: 10px;
  align-items: center;
}

.badge-link {
  display: inline-block;
  transition: opacity 0.2s, transform 0.2s;
  border-radius: 10px;
}

.badge-link:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.badge-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.badge-img {
  height: 5rem;
  width: auto;
  display: block;
}

/* Portrait stage */
.portrait-stage {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 520px;
}

.portrait-halo {
  position: absolute;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, rgba(48, 85, 166, 0.14) 0%, transparent 55%),
    radial-gradient(circle at 65% 70%, rgba(254, 222, 199, 0.55) 0%, transparent 60%);
  filter: blur(8px);
  z-index: 0;
}

.portrait-ring {
  position: relative;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  padding: 8px;
  background:
    conic-gradient(from 200deg,
      var(--color-primary) 0deg,
      var(--color-highlight) 120deg,
      var(--color-primary) 240deg,
      var(--color-highlight) 360deg);
  z-index: 1;
  box-shadow:
    0 30px 60px -30px rgba(48, 85, 166, 0.35),
    0 12px 32px -16px rgba(0, 0, 0, 0.15);
}

.portrait-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-surface-alt);
  position: relative;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Floating info chips */
.chip {
  position: absolute;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow:
    0 12px 28px -16px rgba(0, 0, 0, 0.18),
    0 2px 6px -2px rgba(0, 0, 0, 0.06);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text);
  transition: transform 0.25s ease;
  animation: chip-float 6s ease-in-out infinite;
}

.chip:hover {
  transform: translateY(-3px);
}

.chip-ic {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--color-surface-alt);
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
}

.chip-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.chip-meta b {
  font-weight: 600;
  font-size: 13px;
  font-family: var(--font-sans);
}

.chip-meta small {
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.chip.c1 { top: 4%;    left: -4%;   animation-delay: 0s; }
.chip.c2 { top: 28%;   right: -8%;  animation-delay: 1.4s; }
.chip.c3 { bottom: 18%; left: -10%; animation-delay: 2.8s; }
.chip.c4 { bottom: 4%;  right: -2%; animation-delay: 4.2s; }

@keyframes chip-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

/* Responsive */
@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 12px;
  }
  .portrait-stage {
    min-height: 420px;
    order: -1;
  }
  .portrait-ring { width: 280px; height: 280px; }
  .portrait-halo { width: 380px; height: 380px; }
  .chip.c1 { left: 2%; }
  .chip.c2 { right: 2%; }
  .chip.c3 { left: 2%; }
  .chip.c4 { right: 2%; }
}

@media (max-width: 640px) {
  .hero-grid { padding: 20px 20px 40px; }
  .headline-name { font-size: 48px; }
  .headline-intro { font-size: 40px; }
  .facts { grid-template-columns: 1fr 1fr; }
  .chip { font-size: 12px; padding: 8px 10px; }
  .chip-meta b { font-size: 12px; }
  .chip-meta small { font-size: 10px; }
  .lede { font-size: 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .status-dot,
  .chip {
    animation: none;
  }
}
</style>
