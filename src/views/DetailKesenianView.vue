<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ExperienceDetailLayout from '../components/layout/ExperienceDetailLayout.vue'
import { artsHighlights } from '../data/wonosoboData'

const route = useRoute()
const item = computed(
  () => artsHighlights.find((art) => art.id === route.params.slug) || null,
)
const relatedItems = computed(() =>
  artsHighlights.filter((art) => art.id !== item.value?.id),
)
</script>

<template>
  <ExperienceDetailLayout
    category="kesenian"
    :item="item"
    :related-items="relatedItems"
  />
</template>
