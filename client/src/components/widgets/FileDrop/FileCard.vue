<script setup>
  import { computed } from "vue"

  const API = import.meta.env.VITE_API_URL

  const emit = defineEmits({
    onDelete: null,
  })

  const { photo } = defineProps({
    photo: {
      type: [File, String],
    },
  })

  const photoUrl = computed(() => {
    if (typeof photo === "string") return photo
    return URL.createObjectURL(photo)
  })

  const onDelete = (fileName) => {
    emit("onDelete", fileName)
  }
</script>

<template>
  <div class="card">
    <img :src="photoUrl" :alt="photo.name" class="img" />
    <button class="close" @click="onDelete">&times;</button>
  </div>
</template>

<style scoped>
  .card {
    padding: 5px;
    border-radius: 2px;
    border: 1px solid var(--accent-color);
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 4px;
    width: 100%;
    position: relative;
  }
  .img {
    width: 100px;
  }
</style>
