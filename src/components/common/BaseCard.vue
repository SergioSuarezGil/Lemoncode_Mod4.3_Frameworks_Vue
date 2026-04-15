<script setup>
defineProps({
  as: {
    type: String,
    default: 'article',
  },
})
</script>

<template>
  <component
    :is="as"
    class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
  >
    <slot />
  </component>
</template>
