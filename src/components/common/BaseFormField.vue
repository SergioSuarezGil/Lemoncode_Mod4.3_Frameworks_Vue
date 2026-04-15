<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  forId: {
    type: String,
    required: true,
  },
  help: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="base-form-field">
    <label class="base-form-field__label" :for="forId">{{ label }}</label>
    <slot />

    <p v-if="error" class="base-form-field__error">{{ error }}</p>
    <p v-else-if="help" class="base-form-field__help">{{ help }}</p>
  </div>
</template>

<style scoped>
.base-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.base-form-field__label {
  font-size: 0.88em;
  font-weight: 600;
  color: #334155;
}

.base-form-field__help {
  font-size: 0.75em;
  color: #64748b;
}

.base-form-field__error {
  font-size: 0.75em;
  font-weight: 600;
  color: #b91c1c;
}

.base-form-field :deep(input),
.base-form-field :deep(select),
.base-form-field :deep(textarea) {
  border: 0.06rem solid #cbd5e1;
  border-radius: 0.5rem;
  background-color: #ffffff;
  padding: 0.63rem 0.75rem;
  font-size: 0.88em;
  color: #1e293b;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-form-field :deep(input:focus),
.base-form-field :deep(select:focus),
.base-form-field :deep(textarea:focus) {
  border-color: #0f172a;
  box-shadow: 0 0 0 0.13rem #e2e8f0;
}
</style>
