<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ExperienceDetailLayout from '../components/layout/ExperienceDetailLayout.vue'
import { culinaryHighlights } from '../data/wonosoboData'

const route = useRoute()
const item = computed(
  () => culinaryHighlights.find((culinary) => culinary.id === route.params.slug) || null,
)
const relatedItems = computed(() =>
  culinaryHighlights.filter((culinary) => culinary.id !== item.value?.id),
)
</script>

<template>
  <ExperienceDetailLayout
    category="kuliner"
    :item="item"
    :related-items="relatedItems"
  />
</template>
