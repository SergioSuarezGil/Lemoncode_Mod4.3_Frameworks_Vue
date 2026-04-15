<script setup>
import { ref } from 'vue'
import Button from './common/BaseButton.vue'
import Feedback from './common/BaseFeedback.vue'
import { useMealPlannerStore } from '../stores/mealPlanner'

const props = defineProps({
  meals: {
    type: Array,
    required: true,
  },
  days: {
    type: Array,
    required: true,
  },
})

defineEmits(['remove'])

const mealPlannerStore = useMealPlannerStore()
const editingMealId = ref(null)
const editName = ref('')
const editDay = ref('')
const editResult = ref({ message: '', status: 'info' })
const smallButtonClass = 'w-20 px-2 py-1 text-[0.7em]'

const startEdit = (meal) => {
  editingMealId.value = meal.id
  editName.value = meal.name
  editDay.value = meal.day
  editResult.value = { message: '', status: 'info' }
}

const cancelEdit = () => {
  editingMealId.value = null
  editResult.value = { message: '', status: 'info' }
}

const saveEdit = () => {
  const result = mealPlannerStore.updateMeal({
    id: editingMealId.value,
    name: editName.value,
    day: editDay.value,
  })

  editResult.value = {
    message: result.message,
    status: result.status,
  }

  if (result.ok) {
    editingMealId.value = null
  }
}
</script>

<template>
  <ul v-if="meals.length" class="flex list-none flex-col gap-2 p-0">
    <li
      v-for="meal in meals"
      :key="meal.id"
      class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
    >
      <div v-if="editingMealId === meal.id" class="flex flex-col gap-2">
        <label class="text-xs font-semibold text-slate-700" :for="`edit-name-${meal.id}`">
          Nombre
        </label>
        <input
          :id="`edit-name-${meal.id}`"
          v-model="editName"
          type="text"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800"
        />

        <label class="text-xs font-semibold text-slate-700" :for="`edit-day-${meal.id}`">
          Día
        </label>
        <select
          :id="`edit-day-${meal.id}`"
          v-model="editDay"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800"
        >
          <option v-for="day in props.days" :key="day" :value="day">
            {{ day }}
          </option>
        </select>

        <div class="flex flex-wrap gap-2">
          <Button type="button" variant="primary" :class="smallButtonClass" @click="saveEdit">
            Guardar
          </Button>
          <Button type="button" variant="neutral" :class="smallButtonClass" @click="cancelEdit">
            Cancelar
          </Button>
        </div>
      </div>

      <div v-else class="flex items-start gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-slate-800">{{ meal.name }}</p>
          <span class="mt-1 inline-block rounded bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
            {{ meal.type }}
          </span>
        </div>

        <div class="ml-auto flex shrink-0 flex-col items-end gap-1">
          <Button
            type="button"
            variant="neutral"
            :class="smallButtonClass"
            title="Editar"
            @click="startEdit(meal)"
          >
            Editar
          </Button>
          <Button
            type="button"
            variant="danger"
            :class="smallButtonClass"
            title="Eliminar"
            @click="$emit('remove', meal.id)"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </li>
  </ul>

  <Feedback :message="editResult.message" :status="editResult.status" />

  <p v-if="!meals.length" class="text-sm text-slate-500">Sin platos planificados</p>
</template>
