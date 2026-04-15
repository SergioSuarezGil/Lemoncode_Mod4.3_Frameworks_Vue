<script setup>
import { computed, ref } from 'vue'
import MealForm from '../components/MealForm.vue'
import DayCard from '../components/DayCard.vue'
import WeeklyPlanControls from '../components/WeeklyPlanControls.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import ExportMenuDialog from '../components/ExportMenuDialog.vue'
import { useMealPlannerStore } from '../stores/mealPlanner'
import { copyTextToClipboard, downloadTextFile } from '../utils/menuExport'

const mealPlannerStore = useMealPlannerStore()
const addMealResult = ref({ ok: null, message: '', status: 'info' })
const weeklySearch = ref('')
const selectedFilterDay = ref('Todos')
const selectedFilterType = ref('Todos')
const exportText = ref('')
const exportFeedback = ref({ message: '', status: 'info' })
const isClearModalOpen = ref(false)
const isExportModalOpen = ref(false)

const handleAddMeal = (meal) => {
  addMealResult.value = mealPlannerStore.addMeal(meal)
}

const handleRemoveMeal = (mealId) => {
  mealPlannerStore.removeMeal(mealId)
}

const filteredMeals = computed(() => {
  const query = weeklySearch.value.trim().toLowerCase()

  return mealPlannerStore.meals.filter((meal) => {
    const matchesName = query ? meal.name.toLowerCase().includes(query) : true
    const matchesDay = selectedFilterDay.value === 'Todos' || meal.day === selectedFilterDay.value
    const matchesType =
      selectedFilterType.value === 'Todos' || meal.type === selectedFilterType.value

    return matchesName && matchesDay && matchesType
  })
})

const visibleDays = computed(() => {
  if (selectedFilterDay.value === 'Todos') {
    return mealPlannerStore.days
  }

  return [selectedFilterDay.value]
})

const filteredMealsByDay = computed(() => {
  return visibleDays.value.reduce((acc, day) => {
    acc[day] = filteredMeals.value.filter((meal) => meal.day === day)
    return acc
  }, {})
})

const filteredMealsCount = computed(() => filteredMeals.value.length)

const openClearModal = () => {
  isClearModalOpen.value = true
}

const closeClearModal = () => {
  isClearModalOpen.value = false
}

const closeExportModal = () => {
  isExportModalOpen.value = false
}

const confirmClearWeeklyPlan = () => {
  mealPlannerStore.clearPlan()
  addMealResult.value = {
    ok: true,
    message: 'Plan semanal limpiado.',
    status: 'success',
  }
  closeClearModal()
}

const exportWeeklyPlan = () => {
  exportText.value = mealPlannerStore.exportPlanAsText(filteredMeals.value)
  exportFeedback.value = { message: '', status: 'info' }
  isExportModalOpen.value = true
}

const copyExportText = async () => {
  exportFeedback.value = await copyTextToClipboard(exportText.value)
}

const downloadExportText = () => {
  const date = new Date().toISOString().slice(0, 10)
  const fileName = `menu-semanal-${date}.txt`
  exportFeedback.value = downloadTextFile(exportText.value, fileName)
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <MealForm
      :days="mealPlannerStore.days"
      :meal-types="mealPlannerStore.mealTypes"
      :result="addMealResult"
      @add="handleAddMeal"
    />

    <WeeklyPlanControls
      :days="mealPlannerStore.days"
      :meal-types="mealPlannerStore.mealTypes"
      :planned-meals-count="mealPlannerStore.plannedMealsCount"
      :filtered-meals-count="filteredMealsCount"
      :search-term="weeklySearch"
      :selected-day="selectedFilterDay"
      :selected-type="selectedFilterType"
      @update:search-term="weeklySearch = $event"
      @update:selected-day="selectedFilterDay = $event"
      @update:selected-type="selectedFilterType = $event"
      @request-clear-plan="openClearModal"
      @request-export="exportWeeklyPlan"
    />

    <ConfirmDialog
      :open="isClearModalOpen"
      title="Confirmar limpieza del plan"
      message="Vas a eliminar todos los platos planificados de la semana. Esta acción no se puede deshacer."
      confirm-label="Sí, limpiar plan"
      cancel-label="Cancelar"
      @close="closeClearModal"
      @confirm="confirmClearWeeklyPlan"
    />

    <ExportMenuDialog
      :open="isExportModalOpen"
      title="Menú exportado"
      message="Revisa el texto y usa una acción."
      :export-text="exportText"
      :feedback="exportFeedback"
      @close="closeExportModal"
      @copy="copyExportText"
      @download="downloadExportText"
    />

    <div class="flex flex-col gap-3">
      <DayCard
        v-for="day in visibleDays"
        :key="day"
        :days="mealPlannerStore.days"
        :day="day"
        :meals="filteredMealsByDay[day]"
        @remove="handleRemoveMeal"
      />
    </div>
  </section>
</template>
