<script setup>
defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:selected'])
</script>

<template>
  <button
    class="filter-chip"
    :class="{ 'filter-chip--selected': selected }"
    type="button"
    :disabled="disabled"
    :aria-pressed="selected"
    @click="emit('update:selected', !selected)"
  >
    <slot />
  </button>
</template>

<style scoped>
.filter-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 36px;
  padding-inline: 16px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    border-color 180ms ease;
}

.filter-chip:hover:not(:disabled):not(.filter-chip--selected) {
  border-color: var(--border-strong);
}

.filter-chip--selected {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

.filter-chip:disabled {
  border-color: var(--bg-surface-tint);
  background: var(--bg-surface-tint);
  color: var(--text-muted);
  cursor: not-allowed;
}
</style>
