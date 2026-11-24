<script setup>
import { Star } from 'lucide-vue-next'
import BaseBadge from './BaseBadge.vue'
import BaseIcon from './BaseIcon.vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  duration: {
    type: String,
    default: '',
  },
  rating: {
    type: [String, Number],
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  price: {
    type: String,
    default: '',
  },
  visual: {
    type: String,
    default: 'mountain',
  },
  href: {
    type: String,
    default: '#',
  },
})
</script>

<template>
  <a class="tour-card" :class="`tour-card--${visual}`" :href="href">
    <img
      v-if="image"
      class="tour-card__image"
      :src="image"
      :alt="imageAlt || name"
    />
    <span v-else class="tour-card__placeholder" aria-hidden="true" />
    <span class="photo-overlay tour-card__overlay" aria-hidden="true" />

    <BaseBadge
      v-if="duration"
      class="tour-card__badge tour-card__badge--duration"
      variant="glass"
    >
      {{ duration }}
    </BaseBadge>
    <BaseBadge
      v-if="rating !== ''"
      class="tour-card__badge tour-card__badge--rating"
      variant="glass"
    >
      <BaseIcon class="tour-card__star" :icon="Star" :size="12" />
      {{ rating }}
    </BaseBadge>

    <div class="tour-card__details">
      <p v-if="date" class="tour-card__date">{{ date }}</p>
      <div class="tour-card__summary">
        <h3 class="tour-card__name">{{ name }}</h3>
        <p v-if="price" class="tour-card__price">{{ price }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>
.tour-card {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 5.5;
  border-radius: var(--radius-lg);
  background: var(--bg-inverse);
  box-shadow: var(--shadow-md);
  color: var(--text-on-image);
  isolation: isolate;
  transition:
    box-shadow 200ms ease,
    transform 200ms ease;
}

.tour-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.tour-card__placeholder {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 72% 28%, rgba(218, 241, 222, 0.3), transparent 28%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.tour-card--sunrise .tour-card__placeholder {
  background:
    radial-gradient(ellipse at 68% 25%, rgba(218, 241, 222, 0.45), transparent 22%),
    linear-gradient(150deg, var(--sage-400), var(--forest-800) 55%, var(--forest-950));
}

.tour-card--culture .tour-card__placeholder {
  background:
    radial-gradient(ellipse at 35% 45%, rgba(142, 182, 155, 0.34), transparent 26%),
    linear-gradient(135deg, var(--forest-800), var(--forest-950));
}

.tour-card__overlay {
  transition: opacity 200ms ease;
}

.tour-card__badge {
  position: absolute;
  z-index: 1;
  top: 12px;
}

.tour-card__badge--duration {
  left: 12px;
}

.tour-card__badge--rating {
  right: 12px;
}

.tour-card__star {
  color: var(--rating);
}

.tour-card__details {
  position: absolute;
  right: 12px;
  bottom: 12px;
  left: 12px;
  z-index: 1;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: rgba(5, 31, 32, 0.4);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

.tour-card__date {
  margin: 0 0 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  line-height: 1.4;
}

.tour-card__summary {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.tour-card__name {
  margin: 0;
  color: var(--text-on-image);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
}

.tour-card__price {
  flex: none;
  margin: 0;
  color: var(--text-on-image);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.tour-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.tour-card:hover .tour-card__image {
  transform: scale(1.03);
}

.tour-card:hover .tour-card__placeholder {
  transform: scale(1.03);
}

@media (prefers-reduced-motion: reduce) {
  .tour-card,
  .tour-card__image,
  .tour-card__placeholder,
  .tour-card__overlay {
    transition: none;
  }

  .tour-card:hover,
  .tour-card:hover .tour-card__image,
  .tour-card:hover .tour-card__placeholder {
    transform: none;
  }
}
</style>
