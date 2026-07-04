<template>
  <section class="cs-section">
    <div class="cs-bg-dots" aria-hidden="true" />

    <div class="cs-inner">
      <header class="cs-head reveal d1">
        <div>
          <p class="cs-eyebrow">Selected Work</p>
          <h2 class="cs-title">Featured <em>case studies</em></h2>
        </div>
        <NuxtLink to="/case-studies" class="cs-view-all" aria-label="View all case studies">
          View all
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
      </header>

      <div class="cs-grid" :class="{ 'cs-grid--single': supporting.length === 0 }">
        <!-- Hero case study -->
        <NuxtLink
          v-if="hero"
          :to="hero.url || `/case-studies/${hero.slug}`"
          :external="!!hero.url"
          class="cs-card cs-card--hero reveal d2"
        >
          <div v-if="hero.image" class="cs-thumb">
            <span class="cs-num-badge">01<template v-if="hero.category"> — {{ hero.category }}</template></span>
            <NuxtImg
              :src="hero.image"
              :alt="hero.title"
              class="cs-img"
              loading="lazy"
            />
          </div>
          <div class="cs-body">
            <div v-if="hero.tags?.length" class="cs-tags">
              <span v-for="tag in hero.tags" :key="tag" class="cs-tag">{{ tag }}</span>
            </div>
            <h3 class="cs-card-title">{{ hero.title }}</h3>
            <p class="cs-desc">{{ hero.description }}</p>

            <div v-if="hero.metrics?.length" class="cs-metrics">
              <div v-for="metric in hero.metrics" :key="metric.label" class="cs-metric">
                <div class="cs-metric-val">{{ metric.value }}</div>
                <div class="cs-metric-lbl">{{ metric.label }}</div>
              </div>
            </div>

            <span class="cs-foot">
              Zur Case Study
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </div>
        </NuxtLink>

        <!-- Supporting case studies -->
        <div v-if="supporting.length" class="cs-supporting">
          <NuxtLink
            v-for="(study, i) in supporting"
            :key="study.slug"
            :to="study.url || `/case-studies/${study.slug}`"
            :external="!!study.url"
            class="cs-card cs-card--compact reveal"
            :class="`d${i + 3}`"
          >
            <div v-if="study.image" class="cs-thumb">
              <NuxtImg :src="study.image" :alt="study.title" class="cs-img" loading="lazy" />
            </div>
            <div class="cs-body">
              <div v-if="study.tags?.length" class="cs-tags">
                <span v-for="tag in study.tags" :key="tag" class="cs-tag">{{ tag }}</span>
              </div>
              <h3 class="cs-card-title">{{ study.title }}</h3>
              <p class="cs-desc">{{ study.description }}</p>
            </div>
            <span class="cs-compact-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { casestudies } from '~/data/casestudies'

// Featured section shows at most three studies; "View all" leads to the full list.
const featured = casestudies.slice(0, 3)
const hero = featured[0]
const supporting = featured.slice(1)
</script>

<style scoped>
.cs-section {
  position: relative;
  overflow: hidden;
}

.cs-bg-dots {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: radial-gradient(rgba(26, 26, 26, 0.16) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 80%);
}

.cs-inner {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  padding: 88px 36px 96px;
}

/* --- Section header --- */
.cs-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
}
.cs-eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.cs-eyebrow::before {
  content: "";
  width: 22px;
  height: 1px;
  background: var(--color-primary);
}
.cs-title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.02;
  letter-spacing: -0.025em;
  font-weight: 600;
  color: var(--color-text);
}
.cs-title em {
  font-style: normal;
  color: var(--color-primary);
}
.cs-view-all {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--color-text);
  text-decoration: none;
  padding: 9px 16px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  transition: border-color .2s, color .2s, gap .2s, background .2s;
}
.cs-view-all svg { width: 14px; height: 14px; }
.cs-view-all:hover { border-color: var(--color-primary); color: var(--color-primary); gap: 12px; }

/* --- Grid: hero + supporting --- */
.cs-grid {
  display: grid;
  grid-template-columns: 1.32fr 1fr;
  gap: 20px;
  align-items: stretch;
}
.cs-grid--single { grid-template-columns: minmax(0, 760px); justify-content: start; }

.cs-supporting {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
}

.cs-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border-soft);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: transform .25s cubic-bezier(.2, .7, .2, 1), box-shadow .25s, border-color .25s;
}
.cs-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-border);
  box-shadow: 0 22px 44px -28px rgba(26, 40, 80, 0.4);
}
.cs-card--compact { flex: 1; flex-direction: row; align-items: stretch; }

.cs-thumb {
  position: relative;
  width: 100%;
  background: var(--color-surface-alt);
  overflow: hidden;
}
.cs-card--hero .cs-thumb { aspect-ratio: 16 / 10; }
.cs-card--compact .cs-thumb { width: 168px; flex-shrink: 0; }
.cs-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .3s ease;
}
.cs-card:hover .cs-img { transform: scale(1.05); }

.cs-num-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  border: 1px solid var(--color-border-soft);
  border-radius: 999px;
  padding: 4px 11px;
  letter-spacing: 0.04em;
}

.cs-body {
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.cs-card--compact .cs-body { padding: 18px 20px; justify-content: center; }

.cs-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 12px;
}
.cs-tag {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.02em;
  color: var(--color-text-muted);
  background: var(--color-surface-alt);
  border-radius: 5px;
  padding: 3px 8px;
}
.cs-card--hero .cs-tag { font-size: 11px; }

.cs-card-title {
  margin: 0;
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.18;
  color: var(--color-text);
}
.cs-card--hero .cs-card-title { font-size: 25px; }
.cs-card--compact .cs-card-title { font-size: 16px; }

.cs-desc {
  margin: 11px 0 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--color-text-muted);
}
.cs-card--hero .cs-desc { max-width: 46ch; }
.cs-card--compact .cs-desc {
  font-size: 13px;
  margin-top: 7px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* result metric row on hero */
.cs-metrics {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border-soft);
  display: flex;
  flex-wrap: wrap;
  gap: 34px;
}
.cs-metric-val {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}
.cs-metric-lbl {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 3px;
}

.cs-foot {
  margin-top: auto;
  padding-top: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-primary);
}
.cs-foot svg { width: 15px; height: 15px; transition: transform .2s; }
.cs-card:hover .cs-foot svg { transform: translateX(3px); }

.cs-compact-arrow {
  align-self: center;
  margin: 0 18px 0 -4px;
  color: var(--color-border);
  transition: color .2s, transform .2s;
}
.cs-card--compact:hover .cs-compact-arrow { color: var(--color-primary); transform: translateX(3px); }
.cs-compact-arrow svg { width: 18px; height: 18px; }

/* entrance */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  animation: cs-rise .7s cubic-bezier(.2, .7, .2, 1) forwards;
}
.reveal.d1 { animation-delay: .05s; }
.reveal.d2 { animation-delay: .15s; }
.reveal.d3 { animation-delay: .25s; }
.reveal.d4 { animation-delay: .35s; }
@keyframes cs-rise { to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .reveal { animation: none; opacity: 1; transform: none; }
}

/* responsive */
@media (max-width: 900px) {
  .cs-grid, .cs-grid--single { grid-template-columns: 1fr; justify-content: stretch; }
}
@media (max-width: 560px) {
  .cs-inner { padding: 56px 20px 64px; }
  .cs-head { flex-direction: column; align-items: flex-start; }
  .cs-card--compact { flex-direction: column; }
  .cs-card--compact .cs-thumb { width: 100%; aspect-ratio: 16 / 9; }
  .cs-compact-arrow { display: none; }
  .cs-metrics { gap: 24px; }
}
</style>
