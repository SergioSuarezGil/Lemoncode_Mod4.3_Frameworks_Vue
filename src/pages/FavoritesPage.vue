<script setup>
import { ref } from 'vue'
import Button from '../components/common/BaseButton.vue'
import Card from '../components/common/BaseCard.vue'
import Feedback from '../components/common/BaseFeedback.vue'
import FormField from '../components/common/BaseFormField.vue'
import { useMealPlannerStore } from '../stores/mealPlanner'

const mealPlannerStore = useMealPlannerStore()

const favoriteName = ref('')
const selectedDay = ref(mealPlannerStore.days[0] ?? 'Lunes')
const selectedType = ref(mealPlannerStore.mealTypes[0] ?? 'Comida')
const feedback = ref({ message: '', status: 'info' })

const handleAddFavorite = () => {
  const result = mealPlannerStore.addFavorite(favoriteName.value)
  feedback.value = {
    message: result.message,
    status: result.status,
  }

  if (result.ok) {
    favoriteName.value = ''
  }
}

const useFavorite = (favorite) => {
  const result = mealPlannerStore.useFavoriteInPlan({
    favorite,
    day: selectedDay.value,
    type: selectedType.value,
  })

  feedback.value = {
    message: result.message,
    status: result.status,
  }
}
</script>

<template>
  <section class="flex flex-col">
    <Card class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-slate-800">Lista de platos favoritos</h2>

      <form
        class="flex flex-col gap-3 md:flex-row md:items-end"
        @submit.prevent="handleAddFavorite"
      >
        <FormField
          class="md:flex-1"
          label="Nuevo favorito"
          for-id="favorite-name"
          help="Evita repetir platos."
        >
          <input
            id="favorite-name"
            v-model="favoriteName"
            type="text"
            placeholder="Ej: Tacos de pollo"
            maxlength="50"
            required
          />
        </FormField>
        <Button class="w-fit" type="submit" variant="primary">Guardar favorito</Button>
      </form>

      <Feedback :message="feedback.message" :status="feedback.status" />

      <div class="flex flex-col gap-3 md:flex-row md:items-end">
        <FormField class="md:flex-1" label="Dia para reutilizar" for-id="favorite-day">
          <select id="favorite-day" v-model="selectedDay">
            <option v-for="day in mealPlannerStore.days" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
        </FormField>

        <FormField class="md:flex-1" label="Tipo" for-id="favorite-type">
          <select id="favorite-type" v-model="selectedType">
            <option
              v-for="mealType in mealPlannerStore.mealTypes"
              :key="mealType"
              :value="mealType"
            >
              {{ mealType }}
            </option>
          </select>
        </FormField>
      </div>

      <ul class="flex list-none flex-col gap-2 p-0">
        <li
          v-for="favorite in mealPlannerStore.favorites"
          :key="favorite"
          class="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
        >
          <span class="text-sm font-semibold text-slate-800">{{ favorite }}</span>

          <div class="flex flex-wrap gap-2">
            <Button type="button" variant="success" @click="useFavorite(favorite)">
              Usar en plan
            </Button>
            <Button
              type="button"
              variant="danger"
              @click="mealPlannerStore.removeFavorite(favorite)"
            >
              Eliminar
            </Button>
          </div>
        </li>
      </ul>
    </Card>
  </section>
</template>
