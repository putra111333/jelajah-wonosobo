<script setup>
import { ref } from 'vue'
import { ArrowRight, Facebook, Instagram, Youtube } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import BaseInput from '../ui/BaseInput.vue'

const emit = defineEmits(['subscribe'])
const email = ref('')

const navigationGroups = [
  {
    heading: 'Jelajahi',
    links: [
      { label: 'Beranda', to: '/' },
      { label: 'Eksplorasi', to: '/explore' },
    ],
  },
  {
    heading: 'Rencanakan',
    links: [{ label: 'Rencana Jelajah', to: '/plan' }],
  },
  {
    heading: 'Informasi',
    links: [{ label: 'Referensi & Kredit', to: '/credits' }],
  },
]

const socialLinks = [
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/' },
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/' },
  { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/' },
]

function submitNewsletter() {
  emit('subscribe', email.value)
}
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <div class="app-footer__grid">
        <nav class="app-footer__links" aria-label="Navigasi footer">
          <div
            v-for="group in navigationGroups"
            :key="group.heading"
            class="app-footer__link-group"
          >
            <h2 class="app-footer__heading">{{ group.heading }}</h2>
            <RouterLink
              v-for="link in group.links"
              :key="link.label"
              class="app-footer__link"
              :to="link.to"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </nav>

        <section class="app-footer__newsletter" aria-labelledby="newsletter-title">
          <h2 id="newsletter-title" class="app-footer__heading">
            Temukan cerita Wonosobo
          </h2>
          <p class="app-footer__description">
            Inspirasi wisata dan budaya, langsung ke kotak masuk Anda.
          </p>
          <form class="app-footer__form" @submit.prevent="submitNewsletter">
            <BaseInput
              v-model="email"
              type="email"
              placeholder="Alamat email"
              aria-label="Alamat email"
              autocomplete="email"
              required
            >
              <template #trailing>
                <BaseButton
                  class="app-footer__submit"
                  variant="primary"
                  size="sm"
                  type="submit"
                >
                  Kirim
                  <template #trailing>
                    <BaseIcon :icon="ArrowRight" :size="16" />
                  </template>
                </BaseButton>
              </template>
            </BaseInput>
          </form>

          <div class="app-footer__socials" aria-label="Media sosial">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              class="app-footer__social-link"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BaseIcon :icon="social.icon" :size="16" />
            </a>
          </div>
        </section>
      </div>

      <div class="app-footer__copyright">
        <p>© {{ new Date().getFullYear() }} Jelajah Wonosobo. Semua hak dilindungi.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background: var(--bg-inverse);
  color: var(--text-inverse);
}

.app-footer__inner {
  width: 100%;
  max-width: 1296px;
  margin-inline: auto;
  padding: 48px 16px 24px;
}

.app-footer__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 40px;
}

.app-footer__newsletter {
  order: -1;
}

.app-footer__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 16px;
}

.app-footer__link-group {
  display: contents;
}

.app-footer__heading {
  margin: 0 0 16px;
  color: var(--text-inverse);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.app-footer__link-group .app-footer__heading {
  display: none;
}

.app-footer__link {
  color: var(--text-inverse-muted);
  font-size: 14px;
  line-height: 1.5;
  text-decoration: none;
  text-underline-offset: 4px;
  transition: color 180ms ease;
}

.app-footer__link:hover {
  color: var(--text-inverse);
  text-decoration: underline;
}

.app-footer__description {
  max-width: 340px;
  margin: -8px 0 16px;
  color: var(--text-inverse-muted);
  font-size: 12px;
  line-height: 1.5;
}

.app-footer__form {
  max-width: 440px;
}

.app-footer__form :deep(.base-field__control) {
  min-height: 48px;
  padding-inline: 16px 4px;
  border-color: var(--border-inverse);
  background: var(--bg-inverse-raised);
  box-shadow: none;
}

.app-footer__form :deep(.base-field__control:hover) {
  border-color: var(--border-strong);
}

.app-footer__form :deep(.base-field__control:focus-within) {
  border-color: var(--border-strong);
  outline: 2px solid var(--text-inverse);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(142, 182, 155, 0.35);
}

.app-footer__form :deep(.base-field__input) {
  color: var(--text-inverse);
}

.app-footer__form :deep(.base-field__input::placeholder) {
  color: var(--text-inverse-muted);
}

.app-footer__form :deep(.app-footer__submit) {
  min-height: 40px;
  padding-inline: 14px;
  background: var(--color-primary);
  color: var(--text-inverse);
}

.app-footer__form :deep(.app-footer__submit:hover:not(:disabled)) {
  background: var(--sage-400);
  color: var(--forest-950);
}

.app-footer__socials {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.app-footer__social-link {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--forest-800);
  color: var(--text-inverse);
  transition: background-color 180ms ease;
}

.app-footer__social-link:hover {
  background: var(--forest-700);
}

.app-footer__copyright {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--forest-800);
  text-align: center;
}

.app-footer__copyright p {
  margin: 0;
  color: var(--text-inverse-muted);
  font-size: 12px;
  line-height: 1.4;
}

.app-footer :deep(:focus-visible) {
  outline-color: var(--text-inverse);
}

@media (min-width: 640px) {
  .app-footer__inner {
    padding: 56px 32px 28px;
  }

  .app-footer__grid {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 1.2fr);
    gap: 48px;
  }

  .app-footer__newsletter {
    order: 0;
  }

  .app-footer__links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 24px;
  }

  .app-footer__link-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .app-footer__link-group .app-footer__heading {
    display: block;
    margin-bottom: 0;
  }
}

@media (min-width: 1024px) {
  .app-footer__inner {
    padding: 64px 48px 32px;
  }

  .app-footer__grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 24px;
  }

  .app-footer__links {
    grid-column: span 3;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }

  .app-footer__newsletter {
    grid-column: span 2;
  }

  .app-footer__copyright {
    padding-top: 32px;
  }
}

@media (max-width: 639px) {
  .app-footer__link-group {
    display: contents;
  }

  .app-footer__link-group .app-footer__heading {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-footer__link,
  .app-footer__form :deep(.app-footer__submit),
  .app-footer__social-link {
    transition-duration: 0.01ms;
  }
}
</style>
