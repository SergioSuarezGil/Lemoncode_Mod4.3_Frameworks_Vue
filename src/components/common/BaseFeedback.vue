<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'info',
  },
})

const feedbackClass = computed(() => {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-slate-100 text-slate-700 border border-slate-200',
  }

  return variants[props.status] ?? variants.info
})
</script>

<template>
  <p
    v-if="props.message"
    :class="['rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition', feedbackClass]"
  >
    {{ props.message }}
  </p>
</template>
