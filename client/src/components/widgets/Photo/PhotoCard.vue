<script setup>
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"

  defineEmits({
    click: null,
  })

  defineProps({
    title: String,
    photo: String,
    square: Boolean,
  })
</script>

<template>
  <div
    class="card"
    :class="{ 'with-title': title }"
    @click="$emit('click')"
  >
    <div class="photo-wrapper">
      <AppPhoto class="photo" :src="photo" :alt="title" :square="square" />
    </div>
    <AppText v-if="title" class="title">{{ title }} →</AppText>
  </div>
</template>

<style scoped>
  .card {
    cursor: pointer;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }
  .photo-wrapper {
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
  .photo {
    transform: scale(1);
    transition: transform 0.4s ease;
  }
  .photo:hover {
    transform: scale(1.1);
  }
  .with-title {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
