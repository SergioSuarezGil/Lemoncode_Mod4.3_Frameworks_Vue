<script setup>
import MealList from './MealList.vue'
import Card from './common/BaseCard.vue'

defineProps({
  day: {
    type: String,
    required: true,
  },
  days: {
    type: Array,
    required: true,
  },
  meals: {
    type: Array,
    required: true,
  },
})

defineEmits(['remove'])
</script>

<template>
  <Card class="flex min-h-48 flex-col gap-3 p-4">
    <h3 class="text-lg font-semibold text-slate-800">{{ day }}</h3>
    <MealList :days="days" :meals="meals" @remove="$emit('remove', $event)" />
  </Card>
</template>
