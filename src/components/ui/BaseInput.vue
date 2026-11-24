<script setup>
import { computed, useId } from 'vue'
import { Check, CircleAlert } from 'lucide-vue-next'
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
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
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
  textarea: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const generatedId = useId()
const inputId = computed(() => props.id || `input-${generatedId}`)
const helperId = computed(() => `${inputId.value}-helper`)
const errorId = computed(() => `${inputId.value}-error`)
const describedBy = computed(() => {
  if (props.error) return errorId.value
  return props.helper ? helperId.value : undefined
})
</script>

<template>
  <div class="base-field">
    <label v-if="label" class="base-field__label" :for="inputId">
      {{ label }}
    </label>

    <div
      class="base-field__control"
      :class="{
        'base-field__control--textarea': textarea,
        'base-field__control--error': error,
        'base-field__control--success': success && !error,
        'base-field__control--disabled': disabled,
      }"
    >
      <BaseIcon
        v-if="icon"
        class="base-field__leading-icon"
        :icon="icon"
        :size="18"
      />

      <textarea
        v-if="textarea"
        :id="inputId"
        class="base-field__input base-field__input--textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :required="required"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        v-bind="$attrs"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <input
        v-else
        :id="inputId"
        class="base-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        v-bind="$attrs"
        @input="emit('update:modelValue', $event.target.value)"
      />

      <span
        v-if="success && !error"
        class="base-field__status-icon base-field__status-icon--success"
        aria-hidden="true"
      >
        <BaseIcon :icon="Check" :size="18" />
      </span>
      <slot name="trailing" />
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

.base-field__control--textarea {
  align-items: flex-start;
  min-height: 120px;
  padding-block: 14px;
  border-radius: var(--radius-md);
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

.base-field__control--success:not(:focus-within) {
  border-color: var(--success);
}

.base-field__control--disabled {
  border-color: var(--border-default);
  background: var(--bg-surface-tint);
  box-shadow: none;
  cursor: not-allowed;
}

.base-field__input {
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
}

.base-field__input::placeholder {
  color: var(--text-muted);
  opacity: 1;
}

.base-field__input:disabled {
  color: var(--text-muted);
  cursor: not-allowed;
}

.base-field__input--textarea {
  min-height: 88px;
  resize: vertical;
}

.base-field__leading-icon {
  flex: none;
  color: var(--text-muted);
}

.base-field__status-icon {
  display: inline-flex;
  flex: none;
}

.base-field__status-icon--success {
  color: var(--success);
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
