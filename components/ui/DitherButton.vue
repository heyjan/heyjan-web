<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="type"
    :disabled="disabled"
    :class="[
      'dither-btn',
      `dither-btn--${variant}`,
      `dither-btn--${size}`,
      { 'dither-btn--disabled': disabled }
    ]"
  >
    <span class="dither-btn__content">
      <slot />
    </span>
    <span class="dither-btn__dither" aria-hidden="true"></span>
    <span class="dither-btn__shine" aria-hidden="true"></span>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false
})
</script>

<style scoped>
/* 1-bit dither pattern variables */
.dither-btn {
  /* Light dots for dark backgrounds (bg-6 style) */
  --gd: radial-gradient(circle 1px at 0px 0px, white 1px, transparent 0);
  /* Dark dots for light backgrounds (bg-2 style) */
  --gl: radial-gradient(circle 1px at 0px 0px, var(--color-primary) 1px, transparent 0);
  
  /* Text shadow outlines for readability (8-directional) */
  --shadow-light:
    -1px -1px 0 white,
    0 -1px 0 white,
    1px -1px 0 white,
    1px 0 0 white,
    1px 1px 0 white,
    0 1px 0 white,
    -1px 1px 0 white,
    -1px 0 0 white;
  
  --shadow-dark:
    -1px -1px 0 var(--color-primary),
    0 -1px 0 var(--color-primary),
    1px -1px 0 var(--color-primary),
    1px 0 0 var(--color-primary),
    1px 1px 0 var(--color-primary),
    0 1px 0 var(--color-primary),
    -1px 1px 0 var(--color-primary),
    -1px 0 0 var(--color-primary);
  
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  isolation: isolate;
}

.dither-btn:hover {
  transform: translateY(-2px);
}

.dither-btn:active {
  transform: translateY(0);
}

/* Size variants */
.dither-btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.dither-btn--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.dither-btn--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Primary variant (dark button with light dither dots - bg-6) */
.dither-btn--primary {
  background: 
    var(--gd) 0px 0px / 4px 4px,
    var(--gd) 2px 2px / 4px 4px,
    var(--color-primary);
  color: white;
  border: 2px solid var(--color-primary);
  box-shadow: 0 4px 14px -3px rgba(48, 85, 166, 0.4);
}

.dither-btn--primary:hover {
  box-shadow: 0 6px 20px -3px rgba(48, 85, 166, 0.5);
}

/* Secondary variant (light button with dark dither dots - bg-2) */
.dither-btn--secondary {
  background: 
    var(--gl) 0px 0px / 4px 4px,
    var(--gl) 2px 2px / 4px 4px,
    white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.dither-btn--secondary:hover {
  /* Transition to bg-6 style on hover */
  --gl: radial-gradient(circle 1px at 0px 0px, white 1px, transparent 0);
  background: 
    var(--gl) 0px 0px / 4px 4px,
    var(--gl) 2px 2px / 4px 4px,
    var(--color-primary);
  color: white;
}

/* Ghost variant (subtle dither - bg-1 style) */
.dither-btn--ghost {
  --gl-ghost: radial-gradient(circle 1px at 0px 0px, var(--color-border) 1px, transparent 0);
  background: 
    var(--gl-ghost) 0px 0px / 4px 4px,
    var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.dither-btn--ghost:hover {
  border-color: var(--color-primary);
  --gl-ghost: radial-gradient(circle 1px at 0px 0px, var(--color-primary) 1px, transparent 0);
  background: 
    var(--gl-ghost) 0px 0px / 4px 4px,
    var(--gl-ghost) 2px 2px / 4px 4px,
    var(--color-surface);
}

/* Content layer */
.dither-btn__content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Text shadows for readability on dithered backgrounds */
.dither-btn--primary .dither-btn__content {
  text-shadow: var(--shadow-dark);
}

.dither-btn--secondary .dither-btn__content {
  text-shadow: var(--shadow-light);
}

.dither-btn--secondary:hover .dither-btn__content {
  text-shadow: var(--shadow-dark);
}

.dither-btn--ghost .dither-btn__content {
  text-shadow: 
    -1px -1px 0 var(--color-surface),
    0 -1px 0 var(--color-surface),
    1px -1px 0 var(--color-surface),
    1px 0 0 var(--color-surface),
    1px 1px 0 var(--color-surface),
    0 1px 0 var(--color-surface),
    -1px 1px 0 var(--color-surface),
    -1px 0 0 var(--color-surface);
}

/* Hide the dither span since we're using direct background now */
.dither-btn__dither {
  display: none;
}

/* Shine effect layer */
.dither-btn__shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
  pointer-events: none;
}

.dither-btn:hover .dither-btn__shine {
  left: 100%;
}

/* Disabled state */
.dither-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
