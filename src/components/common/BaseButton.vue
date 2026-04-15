<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
})

const baseClass =
  'inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-[0.04em] shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-px'

const variantClass = computed(() => {
  const variants = {
    primary: 'bg-slate-900 text-white hover:shadow-lg hover:brightness-110 focus:ring-slate-300',
    neutral:
      'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 focus:ring-slate-200',
    success:
      'bg-emerald-600 text-white hover:shadow-lg hover:brightness-110 focus:ring-emerald-300',
    danger: 'bg-rose-400 text-white hover:shadow-lg hover:brightness-105 focus:ring-rose-200',
  }

  return variants[props.variant] ?? variants.primary
})
</script>

<template>
  <button :type="props.type" data-ripple-light="true" :class="[baseClass, variantClass]">
    <slot />
  </button>
</template>
