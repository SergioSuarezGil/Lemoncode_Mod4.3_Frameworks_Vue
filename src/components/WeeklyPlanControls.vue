<script setup>
import Button from './common/BaseButton.vue'
import Card from './common/BaseCard.vue'
import FormField from './common/BaseFormField.vue'

defineProps({
  days: {
    type: Array,
    required: true,
  },
  mealTypes: {
    type: Array,
    required: true,
  },
  plannedMealsCount: {
    type: Number,
    required: true,
  },
  filteredMealsCount: {
    type: Number,
    required: true,
  },
  searchTerm: {
    type: String,
    required: true,
  },
  selectedDay: {
    type: String,
    required: true,
  },
  selectedType: {
    type: String,
    required: true,
  },
})

const emit = defineEmits([
  'update:searchTerm',
  'update:selectedDay',
  'update:selectedType',
  'requestClearPlan',
  'requestExport',
])
</script>

<template>
  <Card class="flex flex-col gap-3">
    <h2 class="text-xl font-semibold text-slate-800">Filtros y acciones</h2>

    <div class="flex flex-col gap-3 md:flex-row md:items-end">
      <FormField class="md:flex-1" label="Buscar plato" for-id="weekly-search">
        <input
          id="weekly-search"
          :value="searchTerm"
          type="text"
          placeholder="Ej: arroz"
          @input="emit('update:searchTerm', $event.target.value)"
        />
      </FormField>

      <FormField class="md:flex-1" label="Filtrar por día" for-id="filter-day">
        <select
          id="filter-day"
          :value="selectedDay"
          @change="emit('update:selectedDay', $event.target.value)"
        >
          <option value="Todos">Todos</option>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
      </FormField>

      <FormField class="md:flex-1" label="Filtrar por categoría" for-id="filter-type">
        <select
          id="filter-type"
          :value="selectedType"
          @change="emit('update:selectedType', $event.target.value)"
        >
          <option value="Todos">Todos</option>
          <option v-for="mealType in mealTypes" :key="mealType" :value="mealType">
            {{ mealType }}
          </option>
        </select>
      </FormField>
    </div>

    <p class="text-sm font-semibold text-slate-700">
      Platos totales: {{ plannedMealsCount }} | Platos visibles: {{ filteredMealsCount }}
    </p>

    <div class="flex flex-wrap gap-2">
      <Button type="button" variant="danger" @click="emit('requestClearPlan')">Limpiar plan</Button>
      <Button type="button" variant="success" @click="emit('requestExport')">
        Exportar menú en texto
      </Button>
    </div>
  </Card>
</template>
