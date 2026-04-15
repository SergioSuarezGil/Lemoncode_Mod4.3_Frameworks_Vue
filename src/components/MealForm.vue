<script setup>
import { computed, ref, watch } from 'vue'
import Card from './common/BaseCard.vue'
import Button from './common/BaseButton.vue'
import Feedback from './common/BaseFeedback.vue'
import FormField from './common/BaseFormField.vue'

const props = defineProps({
  days: {
    type: Array,
    required: true,
  },
  mealTypes: {
    type: Array,
    required: true,
  },
  result: {
    type: Object,
    default: () => ({
      ok: null,
      message: '',
      status: 'info',
    }),
  },
})

const emit = defineEmits(['add'])

const dishName = ref('')
const day = ref(props.days[0] ?? 'Lunes')
const type = ref(props.mealTypes[0] ?? 'Comida')

const feedback = computed(() => ({
  message: props.result?.message ?? '',
  status: props.result?.status ?? 'info',
}))

watch(
  () => props.result?.ok,
  (isOk) => {
    if (!isOk) {
      return
    }

    dishName.value = ''
    day.value = props.days[0] ?? 'Lunes'
    type.value = props.mealTypes[0] ?? 'Comida'
  }
)

const handleSubmit = () => {
  if (!dishName.value.trim() || !day.value) {
    return
  }

  emit('add', {
    name: dishName.value,
    day: day.value,
    type: type.value,
  })
}
</script>

<template>
  <Card>
    <form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
      <h2 class="text-xl font-semibold text-slate-800">Añadir plato</h2>

      <FormField label="Nombre del plato" for-id="meal-name" help="Máximo 50 caracteres.">
        <input
          id="meal-name"
          v-model="dishName"
          type="text"
          placeholder="Ej: Arroz con pollo"
          maxlength="50"
          required
        />
      </FormField>

      <div class="flex flex-col gap-3 md:flex-row md:items-end">
        <FormField class="flex-1" label="Día" for-id="meal-day">
          <select id="meal-day" v-model="day" required>
            <option v-for="weekDay in days" :key="weekDay" :value="weekDay">
              {{ weekDay }}
            </option>
          </select>
        </FormField>

        <FormField class="flex-1" label="Tipo" for-id="meal-type">
          <select id="meal-type" v-model="type" required>
            <option v-for="mealType in mealTypes" :key="mealType" :value="mealType">
              {{ mealType }}
            </option>
          </select>
        </FormField>
      </div>

      <Feedback :message="feedback.message" :status="feedback.status" />
      <Button class="w-fit" type="submit" variant="primary">Agregar</Button>
    </form>
  </Card>
</template>
