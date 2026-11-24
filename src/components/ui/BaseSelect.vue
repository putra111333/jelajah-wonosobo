<script setup>
import { computed, useId } from 'vue'
import { ChevronDown, CircleAlert } from 'lucide-vue-next'
import BaseIcon from './BaseIcon.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Pilih opsi',
  },
  helper: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const generatedId = useId()
const selectId = computed(() => props.id || `select-${generatedId}`)
const helperId = computed(() => `${selectId.value}-helper`)
const errorId = computed(() => `${selectId.value}-error`)
const describedBy = computed(() => {
  if (props.error) return errorId.value
  return props.helper ? helperId.value : undefined
})
const isEmpty = computed(() => props.modelValue === '')

function optionValue(option) {
  return typeof option === 'object' ? option.value : option
}

function optionLabel(option) {
  return typeof option === 'object' ? option.label : option
}
</script>

<template>
  <div class="base-field">
    <label v-if="label" class="base-field__label" :for="selectId">
      {{ label }}
    </label>

    <div
      class="base-field__control"
      :class="{
        'base-field__control--error': error,
        'base-field__control--disabled': disabled,
      }"
    >
      <BaseIcon
        v-if="icon"
        class="base-field__leading-icon"
        :icon="icon"
        :size="18"
      />
      <select
        :id="selectId"
        class="base-field__select"
        :class="{ 'base-field__select--placeholder': isEmpty }"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        v-bind="$attrs"
        @change="emit('update:modelValue', $event.target.value)"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="optionValue(option)"
          :value="optionValue(option)"
          :disabled="typeof option === 'object' && option.disabled"
        >
          {{ optionLabel(option) }}
        </option>
      </select>
      <BaseIcon
        class="base-field__chevron"
        :icon="ChevronDown"
        :size="16"
      />
    </div>

    <p v-if="error" :id="errorId" class="base-field__message base-field__message--error">
      <BaseIcon :icon="CircleAlert" :size="14" />
      {{ error }}
    </p>
    <p v-else-if="helper" :id="helperId" class="base-field__message">
      {{ helper }}
    </p>
  </div>
</template>

<style scoped>
.base-field {
  width: 100%;
}

.base-field__label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.base-field__control {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 48px;
  padding-inline: 20px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  box-shadow: var(--shadow-xs);
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

.base-field__control:hover:not(.base-field__control--disabled) {
  border-color: var(--border-strong);
}

.base-field__control:focus-within {
  border-color: var(--color-primary);
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(142, 182, 155, 0.45);
}

.base-field__control--error {
  border-color: var(--error);
}

.base-field__control--error:focus-within {
  border-color: var(--error);
  outline: 2px solid var(--error);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(179, 38, 30, 0.15);
}

.base-field__control--disabled {
  border-color: var(--border-default);
  background: var(--bg-surface-tint);
  box-shadow: none;
  cursor: not-allowed;
}

.base-field__select {
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: none;
  appearance: none;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
}

.base-field__select--placeholder {
  color: var(--text-muted);
}

.base-field__select:disabled {
  color: var(--text-muted);
  cursor: not-allowed;
}

.base-field__leading-icon,
.base-field__chevron {
  flex: none;
  color: var(--text-muted);
}

.base-field__message {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.4;
}

.base-field__message--error {
  color: var(--error);
}

.base-field__message :deep(.lucide) {
  flex: none;
}
</style>
