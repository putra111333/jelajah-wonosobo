<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'dark', 'secondary', 'outline', 'ghost', 'light-search'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="$slots.leading" class="base-button__icon">
      <slot name="leading" />
    </span>
    <slot />
    <span v-if="$slots.trailing" class="base-button__icon">
      <slot name="trailing" />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 120ms ease;
}

.base-button--sm {
  min-height: 36px;
  padding-inline: 16px;
  font-size: 13px;
}

.base-button--md {
  min-height: 44px;
  padding-inline: 24px;
  font-size: 14px;
}

.base-button--lg {
  min-height: 52px;
  padding-inline: 32px;
  font-size: 16px;
}

.base-button--primary {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

.base-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
  box-shadow: var(--shadow-sm);
}

.base-button--primary:active:not(:disabled) {
  background: var(--color-primary-active);
  transform: scale(0.98);
}

.base-button--dark {
  background: var(--color-ink);
  color: var(--color-primary-contrast);
}

.base-button--dark:hover:not(:disabled) {
  background: var(--forest-900);
}

.base-button--dark:active:not(:disabled) {
  background: var(--forest-800);
  transform: scale(0.98);
}

.base-button--secondary {
  background: var(--color-secondary);
  color: var(--color-secondary-contrast);
}

.base-button--secondary:hover:not(:disabled) {
  background: var(--color-secondary-hover);
  color: var(--forest-900);
}

.base-button--secondary:active:not(:disabled) {
  background: var(--color-secondary-active);
  color: var(--forest-900);
  transform: scale(0.98);
}

.base-button--outline {
  border-color: var(--border-strong);
  background: transparent;
  color: var(--color-primary);
}

.base-button--outline:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: var(--bg-surface-tint);
  color: var(--color-primary-hover);
}

.base-button--outline:active:not(:disabled) {
  border-color: var(--color-primary);
  background: var(--color-secondary);
  color: var(--color-primary-active);
  transform: scale(0.98);
}

.base-button--ghost {
  background: transparent;
  color: var(--color-primary);
}

.base-button--ghost:hover:not(:disabled) {
  background: var(--bg-surface-tint);
  color: var(--color-primary-hover);
}

.base-button--ghost:active:not(:disabled) {
  background: var(--color-secondary);
  color: var(--color-primary-active);
  transform: scale(0.98);
}

.base-button--light-search {
  background: var(--bg-surface);
  color: var(--color-ink);
}

.base-button--light-search:hover:not(:disabled) {
  background: var(--color-secondary);
}

.base-button--light-search:active:not(:disabled) {
  background: var(--color-secondary-hover);
  transform: scale(0.98);
}

.base-button:disabled {
  cursor: not-allowed;
  box-shadow: none;
}

.base-button--primary:disabled {
  background: var(--color-secondary);
  color: var(--text-muted);
}

.base-button--dark:disabled {
  background: var(--border-default);
  color: var(--text-muted);
}

.base-button--secondary:disabled,
.base-button--light-search:disabled {
  background: var(--bg-surface-tint);
  color: var(--text-muted);
}

.base-button--outline:disabled {
  border-color: var(--border-default);
  background: transparent;
  color: var(--text-muted);
}

.base-button--ghost:disabled {
  background: transparent;
  color: var(--text-muted);
}

.base-button__icon {
  display: inline-flex;
  flex: none;
}

.base-button__icon :deep(.lucide) {
  width: 18px;
  height: 18px;
}
</style>
