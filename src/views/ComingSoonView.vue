<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="coming-soon">
    <p class="coming-soon__eyebrow">Jelajah Wonosobo</p>
    <h1 class="coming-soon__title">{{ route.meta.title }}</h1>
    <p class="coming-soon__description">{{ route.meta.description }}</p>
    <RouterLink class="coming-soon__home" to="/">
      Kembali ke Beranda
    </RouterLink>
  </main>
</template>

<style scoped>
.coming-soon {
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 55vh;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-inline: auto;
  padding: 64px 16px;
}

.coming-soon__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 14px;
}

.coming-soon__title {
  margin: 0;
  color: var(--text-primary);
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.15;
  text-wrap: balance;
}

.coming-soon__description {
  max-width: 36rem;
  margin: 16px 0 24px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.6;
}

.coming-soon__home {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding-inline: 24px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition:
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.coming-soon__home:hover {
  background: var(--color-primary-hover);
  box-shadow: var(--shadow-sm);
}

@media (min-width: 640px) {
  .coming-soon {
    padding-inline: 32px;
  }
}

@media (min-width: 1024px) {
  .coming-soon {
    padding-inline: 48px;
  }

  .coming-soon__title {
    font-size: 56px;
    line-height: 1.1;
  }
}
</style>
