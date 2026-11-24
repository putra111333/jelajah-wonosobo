<script setup>
import { computed } from 'vue'
import { ArrowLeft, MapPin } from 'lucide-vue-next'
import BaseIcon from '../components/ui/BaseIcon.vue'
import { exploreItems } from '../data/exploreItems'
import { useRoute } from 'vue-router'

const route = useRoute()
const item = computed(() =>
  exploreItems.find(
    (entry) =>
      entry.category === route.params.category &&
      entry.id === route.params.itemId,
  ),
)
</script>

<template>
  <main class="explore-detail">
    <div class="explore-detail__container">
      <RouterLink class="explore-detail__back" to="/explore">
        <BaseIcon :icon="ArrowLeft" :size="18" />
        Kembali ke eksplorasi
      </RouterLink>

      <article v-if="item" class="explore-detail__card">
        <div
          class="explore-detail__visual"
          :class="`explore-detail__visual--${item.visual}`"
          aria-hidden="true"
        />
        <div class="explore-detail__content">
          <p class="explore-detail__eyebrow">{{ item.categoryLabel }}</p>
          <h1>{{ item.name }}</h1>
          <p class="explore-detail__description">{{ item.description }}</p>
          <p class="explore-detail__location">
            <BaseIcon :icon="MapPin" :size="18" />
            {{ item.subcategory }}
          </p>
        </div>
      </article>

      <section v-else class="explore-detail__not-found" role="status">
        <p class="explore-detail__eyebrow">Pilihan tidak ditemukan</p>
        <h1>Konten ini belum tersedia.</h1>
        <p>Kembali ke eksplorasi untuk melihat semua pilihan yang tersedia.</p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.explore-detail {
  width: 100%;
  flex: 1;
  padding: 40px 0 88px;
}

.explore-detail__container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

.explore-detail__back {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}

.explore-detail__card {
  overflow: hidden;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.explore-detail__visual {
  min-height: 240px;
  background:
    radial-gradient(ellipse at 76% 32%, rgba(218, 241, 222, 0.62), transparent 25%),
    linear-gradient(155deg, var(--sage-400), var(--forest-700) 62%, var(--forest-950));
}

.explore-detail__visual--lake,
.explore-detail__visual--carica {
  background:
    radial-gradient(ellipse at 56% 68%, rgba(218, 241, 222, 0.7), transparent 28%),
    linear-gradient(155deg, var(--mint-100), var(--forest-700) 66%, var(--forest-950));
}

.explore-detail__visual--sunrise {
  background:
    radial-gradient(ellipse at 52% 34%, rgba(245, 184, 61, 0.42), transparent 23%),
    linear-gradient(155deg, var(--sage-400), var(--forest-800) 58%, var(--forest-950));
}

.explore-detail__visual--culinary {
  background:
    radial-gradient(ellipse at 55% 60%, rgba(218, 241, 222, 0.68), transparent 26%),
    linear-gradient(145deg, var(--sage-400), var(--forest-800));
}

.explore-detail__visual--culture,
.explore-detail__visual--volcanic {
  background:
    radial-gradient(ellipse at 30% 38%, rgba(218, 241, 222, 0.45), transparent 24%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.explore-detail__content {
  padding: 32px;
}

.explore-detail__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 14px;
}

.explore-detail h1 {
  margin: 0;
  color: var(--text-primary);
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.explore-detail__description,
.explore-detail__not-found > p:last-child {
  max-width: 640px;
  margin: 16px 0;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.6;
}

.explore-detail__location {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 14px;
}

.explore-detail__not-found {
  padding: 48px 32px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
}

@media (min-width: 640px) {
  .explore-detail {
    padding-top: 56px;
  }

  .explore-detail__container {
    padding-inline: 32px;
  }

  .explore-detail__visual {
    min-height: 360px;
  }
}

@media (min-width: 1024px) {
  .explore-detail__container {
    padding-inline: 48px;
  }

  .explore-detail__visual {
    min-height: 440px;
  }
}

@media (max-width: 639px) {
  .explore-detail__content {
    padding: 24px 20px;
  }

  .explore-detail h1 {
    font-size: 30px;
  }
}
</style>
