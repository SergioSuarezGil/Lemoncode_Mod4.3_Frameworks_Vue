<script setup>
import Button from './BaseButton.vue'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  confirmLabel: {
    type: String,
    default: 'Confirmar',
  },
  cancelLabel: {
    type: String,
    default: 'Cancelar',
  },
  confirmVariant: {
    type: String,
    default: 'danger',
  },
})

const emit = defineEmits(['confirm', 'close'])
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700"
        >
          !
        </div>
        <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
      </div>

      <p v-if="message" class="text-sm text-slate-600">{{ message }}</p>

      <div class="flex justify-end gap-3 pt-6">
        <Button type="button" variant="neutral" @click="emit('close')">{{ cancelLabel }}</Button>
        <Button type="button" :variant="confirmVariant" @click="emit('confirm')">
          {{ confirmLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>
