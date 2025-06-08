<script setup>
  import { computed } from "vue"

  const API = import.meta.env.VITE_API_URL

  const { src, alt } = defineProps({
    src: String,
    alt: String,
    variant: String,
    square: Boolean,
  })

  const picture = computed(() => {
    return `${API}/${src}`
  })
</script>

<template>
  <img
    :src="picture"
    :alt="alt"
    :class="{ square: square }"
    class="app-photo"
  />
</template>

<style>
  .app-photo {
    width: 100%;
    height: 100%;
    height: auto;
    object-fit: cover;
  }
  .square {
    aspect-ratio: 1 / 1;
  }
</style>
