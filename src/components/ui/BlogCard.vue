<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  summary: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '#',
  },
})
</script>

<template>
  <a class="blog-card" :href="href">
    <img class="blog-card__image" :src="image" :alt="imageAlt || title" />
    <div class="blog-card__content">
      <p v-if="date" class="blog-card__date">{{ date }}</p>
      <h3 class="blog-card__title">{{ title }}</h3>
      <p v-if="summary" class="blog-card__summary">{{ summary }}</p>
    </div>
  </a>
</template>

<style scoped>
.blog-card {
  display: block;
  overflow: hidden;
  padding: 12px;
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
  color: inherit;
  text-decoration: none;
  transition: box-shadow 200ms ease;
}

.blog-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.blog-card__content {
  padding: 20px 12px 12px;
}

.blog-card__date {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.4;
}

.blog-card__title {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  transition: color 180ms ease;
}

.blog-card__summary {
  display: -webkit-box;
  overflow: hidden;
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.5;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.blog-card:hover {
  box-shadow: var(--shadow-lg);
}

.blog-card:hover .blog-card__title {
  color: var(--color-primary);
}

@media (prefers-reduced-motion: reduce) {
  .blog-card,
  .blog-card__title {
    transition: none;
  }
}
</style>
