<script setup>
defineProps({
  value: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  overlap: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <article class="stat-card" :class="{ 'stat-card--overlap': overlap }">
    <p class="stat-card__value">
      <slot name="value">{{ value }}</slot>
    </p>
    <p class="stat-card__label">
      <slot>{{ label }}</slot>
    </p>
  </article>
</template>

<style scoped>
.stat-card {
  display: flex;
  min-width: 150px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition:
    box-shadow 200ms ease,
    transform 200ms ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-card--overlap {
  margin-top: -32px;
}

.stat-card__value {
  margin: 0;
  color: var(--text-primary);
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.stat-card__label {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.4;
}

@media (min-width: 640px) {
  .stat-card--overlap {
    margin-top: -48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card,
  .stat-card:hover {
    transform: none;
    transition: none;
  }
}
</style>
