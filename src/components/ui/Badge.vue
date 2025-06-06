<template>
  <span :class="[baseStyles, sizeClass, colorStyles, behaviorStyles]">
    <span v-if="startIcon" class="mr-1">
      <component :is="startIcon" @click="$emit('icon-start-click')" />
    </span>
    <slot></slot>
    <span v-if="endIcon" class="ml-1">
      <component :is="endIcon" @click="$emit('icon-end-click')" />
    </span>
  </span>
</template>

<script lang="ts">
export type BadgeVariant = 'light' | 'solid'
export type BadgeSize = 'sm' | 'md'
export type BadgeColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark'
</script>

<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  color?: BadgeColor
  startIcon?: object
  endIcon?: object
  noBreakLine?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'light',
  color: 'primary',
  size: 'md',
})

const baseStyles =
  'inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium capitalize'

const sizeStyles = {
  sm: 'text-theme-xs',
  md: 'text-sm',
}

const variants = {
  light: {
    primary: 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400',
    success: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
    error: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400',
    info: 'bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500',
    light: 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80',
    dark: 'bg-gray-500 text-white dark:bg-white/5 dark:text-white',
  },
  solid: {
    primary: 'bg-brand-500 text-white dark:text-white',
    success: 'bg-success-500 text-white dark:text-white',
    error: 'bg-error-500 text-white dark:text-white',
    warning: 'bg-warning-500 text-white dark:text-white',
    info: 'bg-blue-light-500 text-white dark:text-white',
    light: 'bg-gray-400 dark:bg-white/5 text-white dark:text-white/80',
    dark: 'bg-gray-700 text-white dark:text-white',
  },
}

const sizeClass = computed(() => sizeStyles[props.size])
const colorStyles = computed(() => variants[props.variant][props.color])
const behaviorStyles = computed(() => props.noBreakLine ? 'whitespace-nowrap' : '')
</script>
