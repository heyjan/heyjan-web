<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled"
    :class="[
      'flat-btn',
      `flat-btn--${variant}`,
      `flat-btn--${size}`,
      { 'flat-btn--disabled': disabled }
    ]"
  >
    <slot />
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
.flat-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.flat-btn--sm { padding: 8px 14px; font-size: 13px; }
.flat-btn--md { padding: 12px 20px; font-size: 14.5px; }
.flat-btn--lg { padding: 14px 24px; font-size: 16px; }

.flat-btn--primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 6px 18px -8px rgba(48, 85, 166, 0.55);
}
.flat-btn--primary:hover {
  background: #28488c;
  transform: translateY(-1px);
}

.flat-btn--secondary,
.flat-btn--ghost {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.flat-btn--secondary:hover,
.flat-btn--ghost:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-1px);
}

.flat-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.flat-btn :deep(svg) {
  width: 14px;
  height: 14px;
}

.flat-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
