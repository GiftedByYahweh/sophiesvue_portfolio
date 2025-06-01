<script setup>
  const { src, alt } = defineProps({
    src: String,
    alt: String,
    variant: String,
    square: Boolean,
  })
</script>

<template>
  <img class="app-photo" :class="{ square: square }" :src="src" :alt="alt" />
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
