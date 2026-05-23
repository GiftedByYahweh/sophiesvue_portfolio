<script setup>
  const { src, alt } = defineProps({
    src: String,
    alt: String,
    variant: String,
    square: Boolean,
  })
</script>

<template>
  <img :src="src" :alt="alt" :class="{ square: square }" class="app-photo" />
</template>

<style>
  .app-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .square {
    aspect-ratio: 1 / 1;
  }
</style>
