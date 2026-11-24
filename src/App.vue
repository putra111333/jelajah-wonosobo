<script setup>
import { useRoute } from 'vue-router'
import AppFooter from './components/layout/AppFooter.vue'
import AppNavbar from './components/layout/AppNavbar.vue'

const route = useRoute()
</script>

<template>
  <div class="app-shell">
    <AppNavbar :over-photo="route.meta.overPhoto === true" />
    <RouterView v-slot="{ Component, route: pageRoute }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="pageRoute.fullPath" />
      </Transition>
    </RouterView>
    <AppFooter />
  </div>
</template>

<style>
.app-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition-duration: 0.01ms;
  }

  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}
</style>
