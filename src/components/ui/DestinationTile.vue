<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '#',
  },
  aspect: {
    type: String,
    default: 'wide',
    validator: (value) => ['wide', 'compact'].includes(value),
  },
  visual: {
    type: String,
    default: 'mountain',
  },
})

const altText = computed(() => props.imageAlt || props.title)
</script>

<template>
  <a
    class="destination-tile"
    :class="[`destination-tile--${aspect}`, `destination-tile--${visual}`]"
    :href="href"
  >
    <img
      v-if="image"
      class="destination-tile__image"
      :src="image"
      :alt="altText"
    />
    <span v-else class="destination-tile__placeholder" aria-hidden="true" />
    <span class="photo-overlay destination-tile__overlay" aria-hidden="true" />
    <span class="destination-tile__content">
      <span v-if="location" class="destination-tile__location">
        {{ location }}
      </span>
      <span class="destination-tile__title">{{ title }}</span>
    </span>
  </a>
</template>

<style scoped>
.destination-tile {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 7 / 4;
  border-radius: var(--radius-lg);
  background: var(--bg-inverse);
  box-shadow: var(--shadow-md);
  color: var(--text-on-image);
  isolation: isolate;
}

.destination-tile__placeholder {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 75% 30%, rgba(218, 241, 222, 0.28), transparent 34%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.destination-tile--lake .destination-tile__placeholder {
  background:
    radial-gradient(ellipse at 58% 64%, rgba(218, 241, 222, 0.28), transparent 34%),
    linear-gradient(145deg, var(--forest-800), var(--forest-950));
}

.destination-tile--sunrise .destination-tile__placeholder {
  background:
    radial-gradient(ellipse at 70% 28%, rgba(218, 241, 222, 0.45), transparent 22%),
    linear-gradient(155deg, var(--sage-400), var(--forest-800) 58%, var(--forest-950));
}

.destination-tile--volcanic .destination-tile__placeholder {
  background:
    radial-gradient(ellipse at 42% 52%, rgba(142, 182, 155, 0.32), transparent 28%),
    linear-gradient(145deg, var(--forest-800), var(--forest-950));
}

.destination-tile--compact {
  aspect-ratio: 5 / 4;
}

.destination-tile__image,
.destination-tile__placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.destination-tile__overlay {
  transition: opacity 200ms ease;
}

.destination-tile__overlay::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(5, 31, 32, 0) 30%,
    rgba(5, 31, 32, 0.82) 100%
  );
  content: '';
  opacity: 0;
  transition: opacity 200ms ease;
}

.destination-tile__content {
  position: absolute;
  right: 20px;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.destination-tile__location {
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  line-height: 1.4;
}

.destination-tile__title {
  color: var(--text-on-image);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
}

.destination-tile:hover .destination-tile__image {
  transform: scale(1.04);
}

.destination-tile:hover .destination-tile__placeholder {
  transform: scale(1.04);
}

.destination-tile:hover .destination-tile__overlay {
  opacity: 1;
}

.destination-tile:hover .destination-tile__overlay::after {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .destination-tile__image,
  .destination-tile__placeholder,
  .destination-tile__overlay,
  .destination-tile__overlay::after {
    transition: none;
  }

  .destination-tile:hover .destination-tile__image,
  .destination-tile:hover .destination-tile__placeholder {
    transform: none;
  }
}
</style>
