<script setup>
defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (value) =>
      ['glass', 'neutral', 'brand', 'success', 'warning', 'error', 'info'].includes(value),
  },
  glassTone: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value),
  },
})
</script>

<template>
  <span
    class="base-badge"
    :class="[
      `base-badge--${variant}`,
      variant === 'glass' ? `glass-${glassTone}` : '',
    ]"
  >
    <slot />
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 24px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.base-badge--glass {
  color: var(--text-on-image);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.base-badge--neutral {
  background: var(--bg-surface-tint);
  color: var(--forest-800);
}

.base-badge--brand {
  background: var(--color-secondary);
  color: var(--forest-800);
}

.base-badge--success {
  background: var(--success-bg);
  color: var(--success);
}

.base-badge--warning {
  background: var(--warning-bg);
  color: var(--warning);
}

.base-badge--error {
  background: var(--error-bg);
  color: var(--error);
}

.base-badge--info {
  background: var(--info-bg);
  color: var(--info);
}
</style>
