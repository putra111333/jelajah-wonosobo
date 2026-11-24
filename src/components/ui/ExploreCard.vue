<script setup>
import { ChevronRight } from 'lucide-vue-next'
import BaseBadge from './BaseBadge.vue'
import BaseIcon from './BaseIcon.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    class="explore-card"
    :to="item.detailPath"
    :aria-label="`Lihat detail ${item.name}`"
  >
    <div
      class="explore-card__visual"
      :class="`explore-card__visual--${item.visual}`"
    >
      <img
        v-if="item.image"
        class="explore-card__image"
        :src="item.image"
        :alt="item.imageAlt || item.name"
      />
      <span v-else class="explore-card__placeholder" aria-hidden="true" />
      <BaseBadge class="explore-card__rank" variant="neutral">
        #{{ item.rank }}
      </BaseBadge>
      <BaseBadge class="explore-card__category" variant="neutral">
        {{ item.categoryLabel }}
      </BaseBadge>
    </div>

    <div class="explore-card__content">
      <p class="explore-card__eyebrow">{{ item.subcategory }}</p>
      <h2 class="explore-card__title">{{ item.name }}</h2>
      <p class="explore-card__description">{{ item.description }}</p>
      <span class="explore-card__link">
        Lihat detail
        <BaseIcon :icon="ChevronRight" :size="18" />
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.explore-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
  color: inherit;
  text-decoration: none;
  transition:
    box-shadow 200ms ease,
    transform 200ms ease;
}

.explore-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.explore-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

.explore-card__visual {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(ellipse at 76% 32%, rgba(218, 241, 222, 0.62), transparent 25%),
    linear-gradient(155deg, var(--sage-400), var(--forest-700) 62%, var(--forest-950));
}

.explore-card__visual--lake,
.explore-card__visual--carica {
  background:
    radial-gradient(ellipse at 56% 68%, rgba(218, 241, 222, 0.7), transparent 28%),
    linear-gradient(155deg, var(--mint-100), var(--forest-700) 66%, var(--forest-950));
}

.explore-card__visual--sunrise {
  background:
    radial-gradient(ellipse at 52% 34%, rgba(245, 184, 61, 0.42), transparent 23%),
    linear-gradient(155deg, var(--sage-400), var(--forest-800) 58%, var(--forest-950));
}

.explore-card__visual--volcanic {
  background:
    radial-gradient(ellipse at 48% 65%, rgba(142, 182, 155, 0.58), transparent 30%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.explore-card__visual--culinary {
  background:
    radial-gradient(ellipse at 55% 60%, rgba(218, 241, 222, 0.68), transparent 26%),
    linear-gradient(145deg, var(--sage-400), var(--forest-800));
}

.explore-card__visual--culture {
  background:
    radial-gradient(ellipse at 30% 38%, rgba(218, 241, 222, 0.45), transparent 24%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.explore-card__placeholder,
.explore-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.explore-card__rank,
.explore-card__category {
  position: absolute;
  top: 16px;
}

.explore-card__rank {
  left: 16px;
}

.explore-card__category {
  right: 16px;
}

.explore-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.explore-card__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.4;
}

.explore-card__title {
  margin: 0;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.explore-card__description {
  display: -webkit-box;
  overflow: hidden;
  margin: 8px 0 20px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.explore-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 500;
}

.explore-card:hover .explore-card__image,
.explore-card:hover .explore-card__placeholder {
  transform: scale(1.04);
}

@media (prefers-reduced-motion: reduce) {
  .explore-card,
  .explore-card__image,
  .explore-card__placeholder {
    transition: none;
  }

  .explore-card:hover {
    transform: none;
  }

  .explore-card:hover .explore-card__image,
  .explore-card:hover .explore-card__placeholder {
    transform: none;
  }
}
</style>
