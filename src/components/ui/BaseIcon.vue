<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },
  size: {
    type: [Number, String],
    default: 20,
  },
})
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :stroke-width="1.5"
    aria-hidden="true"
  />
</template>
