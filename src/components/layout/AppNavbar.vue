<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Compass, Menu, X } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'
import BaseIcon from '../ui/BaseIcon.vue'

defineProps({
  overPhoto: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const isScrolled = ref(false)
const isDrawerOpen = ref(false)
const selectedLanguage = ref('ID')
const closeButton = ref(null)
const previousOverflow = ref('')

const navigation = [
  { label: 'Beranda', to: { name: 'home' } },
  { label: 'Eksplorasi', to: '/explore' },
  { label: 'Rencana Jelajah', to: '/plan' },
  { label: 'Referensi & Kredit', to: '/credits' },
]

function updateScrollState() {
  isScrolled.value = window.scrollY > 80
}

function closeDrawer() {
  isDrawerOpen.value = false
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeDrawer()
}

watch(isDrawerOpen, async (open) => {
  if (open) {
    previousOverflow.value = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = previousOverflow.value
  }
})

watch(
  () => route.fullPath,
  () => closeDrawer(),
)

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = previousOverflow.value
})
</script>

<template>
  <header
    class="app-navbar"
    :class="{
      'app-navbar--photo': overPhoto && !isScrolled,
      'app-navbar--sticky': isScrolled,
      'app-navbar--sticky-photo': overPhoto && isScrolled,
    }"
  >
    <div
      class="app-navbar__inner"
      :class="{ 'app-navbar__inner--photo': overPhoto && !isScrolled }"
    >
      <RouterLink
        class="app-navbar__logo"
        :class="{ 'app-navbar__logo--photo': overPhoto && !isScrolled }"
        to="/"
        aria-label="Jelajah Wonosobo, Beranda"
      >
        <BaseIcon :icon="Compass" :size="22" />
        <span>Jelajah Wonosobo</span>
      </RouterLink>

      <nav
        class="app-navbar__menu"
        :class="{
          'app-navbar__menu--photo': overPhoto && !isScrolled,
          'glass-dark': overPhoto && !isScrolled,
        }"
        aria-label="Navigasi utama"
      >
        <RouterLink
          v-for="item in navigation"
          :key="item.label"
          class="app-navbar__link"
          :class="{ 'app-navbar__link--photo': overPhoto && !isScrolled }"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="app-navbar__actions">
        <div
          class="app-navbar__languages"
          :class="{ 'app-navbar__languages--photo': overPhoto && !isScrolled }"
          role="group"
          aria-label="Pilih bahasa"
        >
          <button
            v-for="language in ['ID', 'EN']"
            :key="language"
            class="app-navbar__language"
            :class="{
              'app-navbar__language--selected': selectedLanguage === language,
              'app-navbar__language--photo': overPhoto && !isScrolled,
            }"
            type="button"
            :aria-pressed="selectedLanguage === language"
            @click="selectedLanguage = language"
          >
            {{ language }}
          </button>
        </div>

        <RouterLink class="app-navbar__login" to="/login">
          Login
        </RouterLink>
      </div>

      <button
        class="app-navbar__toggle"
        :class="{ 'app-navbar__toggle--photo': overPhoto && !isScrolled }"
        type="button"
        :aria-expanded="isDrawerOpen"
        aria-controls="mobile-navigation"
        :aria-label="isDrawerOpen ? 'Tutup menu' : 'Buka menu'"
        @click="isDrawerOpen = !isDrawerOpen"
      >
        <BaseIcon :icon="isDrawerOpen ? X : Menu" :size="24" />
      </button>
    </div>
  </header>

  <Transition name="drawer">
    <div
      v-if="isDrawerOpen"
      id="mobile-navigation"
      class="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
    >
      <div class="mobile-drawer__top">
        <RouterLink
          class="mobile-drawer__logo"
          to="/"
          @click="closeDrawer"
        >
          <BaseIcon :icon="Compass" :size="24" />
          <span>Jelajah Wonosobo</span>
        </RouterLink>
        <button
          ref="closeButton"
          class="mobile-drawer__close"
          type="button"
          aria-label="Tutup menu"
          @click="closeDrawer"
        >
          <BaseIcon :icon="X" :size="24" />
        </button>
      </div>

      <nav class="mobile-drawer__links" aria-label="Navigasi mobile">
        <RouterLink
          v-for="item in navigation"
          :key="item.label"
          class="mobile-drawer__link"
          :to="item.to"
          @click="closeDrawer"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink
          class="mobile-drawer__link mobile-drawer__link--login"
          to="/login"
          @click="closeDrawer"
        >
          Login
        </RouterLink>
      </nav>

      <div class="mobile-drawer__languages" role="group" aria-label="Pilih bahasa">
        <button
          v-for="language in ['ID', 'EN']"
          :key="language"
          class="mobile-drawer__language"
          :class="{ 'mobile-drawer__language--selected': selectedLanguage === language }"
          type="button"
          :aria-pressed="selectedLanguage === language"
          @click="selectedLanguage = language"
        >
          {{ language }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.app-navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  padding: 16px 0;
  background: var(--bg-page);
  transition:
    background-color 180ms ease,
    box-shadow 180ms ease,
    padding 180ms ease;
}

.app-navbar--photo {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 24px;
  background: transparent;
}

.app-navbar--sticky {
  position: sticky;
  padding: 10px 0;
  background: rgba(245, 250, 246, 0.85);
  box-shadow: var(--shadow-sm);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

.app-navbar--sticky-photo {
  position: fixed;
  right: 0;
  left: 0;
}

.app-navbar__inner {
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-inline: auto;
  padding-inline: 16px;
}

.app-navbar__logo {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  color: var(--forest-950);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-decoration: none;
}

.app-navbar__logo--photo {
  color: var(--text-on-image);
}

.app-navbar__menu {
  display: flex;
  min-height: 44px;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  box-shadow: var(--shadow-nav);
}

.app-navbar__menu--photo {
  border-color: rgba(218, 241, 222, 0.18);
  background: rgba(5, 31, 32, 0.35);
  box-shadow: var(--shadow-nav);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

.app-navbar__link {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.app-navbar__link:hover {
  color: var(--text-primary);
}

.app-navbar__link.router-link-exact-active {
  background: var(--color-secondary);
  color: var(--color-secondary-contrast);
}

.app-navbar__link--photo {
  color: rgba(255, 255, 255, 0.7);
}

.app-navbar__link--photo:hover,
.app-navbar__link--photo.router-link-exact-active {
  color: var(--text-on-image);
}

.app-navbar__link--photo.router-link-exact-active {
  background: rgba(255, 255, 255, 0.16);
}

.app-navbar__actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 12px;
}

.app-navbar__languages {
  display: flex;
  align-items: center;
  gap: 2px;
}

.app-navbar__language {
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
}

.app-navbar__language--selected {
  background: var(--forest-950);
  color: var(--text-on-image);
}

.app-navbar__language--photo {
  color: var(--text-on-image);
}

.app-navbar__language--photo.app-navbar__language--selected {
  background: var(--bg-surface);
  color: var(--forest-950);
}

.app-navbar__login {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-radius: var(--radius-full);
  background: var(--forest-950);
  color: var(--text-on-image);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.app-navbar__login:hover {
  background: var(--forest-900);
}

.app-navbar--photo .app-navbar__login {
  background: var(--bg-surface);
  color: var(--forest-950);
}

.app-navbar--photo .app-navbar__login:hover {
  background: var(--color-secondary);
}

.app-navbar--photo :focus-visible {
  outline-color: var(--text-inverse);
}

.app-navbar__toggle {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  color: var(--forest-950);
  cursor: pointer;
}

.mobile-drawer {
  position: fixed;
  z-index: 50;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 24px 32px;
  background: var(--bg-inverse);
  color: var(--text-inverse);
}

.mobile-drawer__top {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
}

.mobile-drawer__logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-inverse);
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
}

.mobile-drawer__close {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-inverse);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-inverse);
  cursor: pointer;
}

.mobile-drawer__links {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 40px;
}

.mobile-drawer__link {
  display: flex;
  min-height: 72px;
  align-items: center;
  border-bottom: 1px solid var(--border-inverse);
  color: var(--text-inverse);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-decoration: none;
}

.mobile-drawer__link--login {
  margin-top: 12px;
  border-bottom: 0;
  color: var(--sage-400);
}

.mobile-drawer__languages {
  display: flex;
  gap: 8px;
  padding-top: 24px;
  border-top: 1px solid var(--border-inverse);
}

.mobile-drawer__language {
  min-width: 44px;
  min-height: 36px;
  border: 1px solid var(--border-inverse);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-inverse);
  font-family: var(--font-sans);
  font-size: 12px;
  cursor: pointer;
}

.mobile-drawer__language--selected {
  border-color: var(--color-secondary);
  background: var(--color-secondary);
  color: var(--forest-950);
}

.mobile-drawer :focus-visible {
  outline-color: var(--text-inverse);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 180ms ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

@media (min-width: 640px) and (max-width: 1023px) {
  .app-navbar__inner {
    gap: 8px;
    padding-inline: 20px;
  }

  .app-navbar__logo {
    gap: 6px;
    font-size: 16px;
  }

  .app-navbar__logo :deep(.lucide) {
    width: 20px;
    height: 20px;
  }

  .app-navbar__menu {
    gap: 0;
  }

  .app-navbar__link {
    padding-inline: 7px;
    font-size: 11px;
  }

  .app-navbar__actions {
    gap: 6px;
  }

  .app-navbar__login {
    min-height: 36px;
    padding-inline: 12px;
    font-size: 12px;
  }
}

@media (min-width: 640px) and (max-width: 720px) {
  .app-navbar__menu,
  .app-navbar__actions {
    display: none;
  }

  .app-navbar__toggle {
    display: inline-flex;
  }
}

@media (max-width: 640px) {
  .app-navbar {
    padding: 12px 0;
  }

  .app-navbar--photo {
    padding-top: 16px;
  }

  .app-navbar--sticky {
    padding: 8px 0;
  }

  .app-navbar__inner {
    padding-inline: 16px;
  }

  .app-navbar__logo {
    font-size: 18px;
  }

  .app-navbar__menu,
  .app-navbar__actions {
    display: none;
  }

  .app-navbar__toggle {
    display: inline-flex;
  }

  .app-navbar__toggle--photo {
    border-color: rgba(218, 241, 222, 0.3);
    background: rgba(5, 31, 32, 0.35);
    color: var(--text-on-image);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-navbar,
  .app-navbar__link,
  .app-navbar__login,
  .drawer-enter-active,
  .drawer-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
