import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const WEEK_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const MEAL_TYPES = ['Desayuno', 'Comida', 'Cena']
const DEFAULT_FAVORITES = ['Pasta al pesto', 'Ensalada César', 'Sopa de verduras']

const normalizeText = (value) => value.trim().toLowerCase()

export const useMealPlannerStore = defineStore(
  'mealPlanner',
  () => {
    const meals = ref([])
    const favorites = ref([...DEFAULT_FAVORITES])

    const days = computed(() => WEEK_DAYS)
    const mealTypes = computed(() => MEAL_TYPES)
    const plannedMealsCount = computed(() => meals.value.length)

    const addMeal = ({ name, day, type }) => {
      const cleanName = name.trim()

      if (!cleanName || !WEEK_DAYS.includes(day) || !MEAL_TYPES.includes(type)) {
        return { ok: false, message: 'Completa todos los campos del plato.', status: 'error' }
      }

      const isDuplicate = meals.value.some((meal) => {
        return (
          normalizeText(meal.name) === normalizeText(cleanName) &&
          meal.day === day &&
          meal.type === type
        )
      })

      if (isDuplicate) {
        return {
          ok: false,
          message: 'Ese plato ya existe para ese día y tipo.',
          status: 'error',
        }
      }

      meals.value.push({
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        name: cleanName,
        day,
        type,
      })

      return { ok: true, message: 'Plato agregado al plan semanal.', status: 'success' }
    }

    const removeMeal = (id) => {
      meals.value = meals.value.filter((meal) => meal.id !== id)
    }

    const updateMeal = ({ id, name, day }) => {
      const cleanName = name.trim()

      if (!cleanName || !WEEK_DAYS.includes(day)) {
        return { ok: false, message: 'Completa el nombre y el día.', status: 'error' }
      }

      const mealIndex = meals.value.findIndex((meal) => meal.id === id)

      if (mealIndex < 0) {
        return { ok: false, message: 'Plato no encontrado.', status: 'error' }
      }

      const currentMeal = meals.value[mealIndex]
      const isDuplicate = meals.value.some((meal) => {
        return (
          meal.id !== id &&
          normalizeText(meal.name) === normalizeText(cleanName) &&
          meal.day === day &&
          meal.type === currentMeal.type
        )
      })

      if (isDuplicate) {
        return {
          ok: false,
          message: 'Ese plato ya existe para ese día y tipo.',
          status: 'error',
        }
      }

      meals.value[mealIndex] = {
        ...currentMeal,
        name: cleanName,
        day,
      }

      return { ok: true, message: 'Plato actualizado.', status: 'success' }
    }

    const addFavorite = (name) => {
      const cleanName = name.trim()
      const normalizedName = normalizeText(cleanName)

      if (!cleanName) {
        return { ok: false, message: 'El favorito no puede estar vacío.', status: 'error' }
      }

      const isDuplicateFavorite = favorites.value.some(
        (favorite) => normalizeText(favorite) === normalizedName
      )

      if (isDuplicateFavorite) {
        return { ok: false, message: 'Ese favorito ya existe.', status: 'error' }
      }

      favorites.value.push(cleanName)
      return { ok: true, message: 'Favorito guardado.', status: 'success' }
    }

    const removeFavorite = (name) => {
      favorites.value = favorites.value.filter((favorite) => favorite !== name)
    }

    const useFavoriteInPlan = ({ favorite, day, type }) => {
      return addMeal({ name: favorite, day, type })
    }

    const clearPlan = () => {
      meals.value = []
    }

    const exportPlanAsText = (customMeals = meals.value) => {
      const lines = ['Plan semanal de comidas', '']

      WEEK_DAYS.forEach((day) => {
        lines.push(`${day}:`)
        const dayMeals = customMeals.filter((meal) => meal.day === day)

        if (!dayMeals.length) {
          lines.push('- Sin platos planificados')
        } else {
          dayMeals.forEach((meal) => {
            lines.push(`- ${meal.type}: ${meal.name}`)
          })
        }

        lines.push('')
      })

      return lines.join('\n').trim()
    }

    return {
      meals,
      favorites,
      days,
      mealTypes,
      plannedMealsCount,
      addMeal,
      removeMeal,
      updateMeal,
      addFavorite,
      removeFavorite,
      useFavoriteInPlan,
      clearPlan,
      exportPlanAsText,
    }
  },
  {
    persist: {
      key: 'meal-planner-state-v2',
      pick: ['meals', 'favorites'],
    },
  }
)
