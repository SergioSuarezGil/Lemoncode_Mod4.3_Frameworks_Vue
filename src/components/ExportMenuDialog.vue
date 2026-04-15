<script setup>
import Button from './common/BaseButton.vue'
import Feedback from './common/BaseFeedback.vue'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Menú exportado',
  },
  message: {
    type: String,
    default: 'Revisa el texto y usa una acción.',
  },
  exportText: {
    type: String,
    default: '',
  },
  feedback: {
    type: Object,
    default: () => ({ message: '', status: 'info' }),
  },
})

const emit = defineEmits(['close', 'copy', 'download'])
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
          class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
        >
          i
        </div>
        <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
      </div>

      <p class="text-sm text-slate-600">{{ message }}</p>

      <div class="mt-4 flex flex-col gap-3">
        <Feedback :message="feedback.message" :status="feedback.status" />
        <textarea
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none"
          :value="exportText"
          rows="10"
          readonly
        />
      </div>

      <div class="flex flex-wrap justify-end gap-3 pt-6">
        <Button type="button" variant="neutral" @click="emit('close')">Cerrar</Button>
        <Button type="button" variant="success" @click="emit('download')">Descargar .txt</Button>
        <Button type="button" variant="primary" @click="emit('copy')">Copiar texto</Button>
      </div>
    </div>
  </div>
</template>
