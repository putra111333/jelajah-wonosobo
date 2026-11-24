<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ExperienceDetailLayout from '../components/layout/ExperienceDetailLayout.vue'
import { featuredDestinations } from '../data/wonosoboData'

const route = useRoute()
const item = computed(
  () => featuredDestinations.find((destination) => destination.id === route.params.slug) || null,
)
const relatedItems = computed(() =>
  featuredDestinations.filter((destination) => destination.id !== item.value?.id),
)
</script>

<template>
  <ExperienceDetailLayout
    category="wisata"
    :item="item"
    :related-items="relatedItems"
  />
</template>
