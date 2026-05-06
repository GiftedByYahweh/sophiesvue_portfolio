<script setup>
  import { computed } from "vue"
  import PhotoCard from "./PhotoCard.vue"
  import AppLoader from "@/components/shared/AppLoader.vue"

  const {
    data = [],
    isLoading,
    error,
    square,
    listType = "normal",
  } = defineProps({
    data: Array,
    isLoading: Boolean,
    error: Error,
    square: Boolean,
    listType: String,
  })

  const emit = defineEmits({
    onCardClick: null,
  })

  const isEmpty = computed(() => !data.length)

  const getPhotoType = (photo) => {
    return photo === "horizontal" ? photo : ""
  }

  const onCardClick = (title, id) => {
    emit("onCardClick", title, id)
  }
</script>

<template>
  <div class="list-wrapper">
    <AppLoader v-if="isLoading" />
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="isEmpty">{{ `Sorry, there's no data (((` }}</div>
    <TransitionGroup v-else tag="div" name="fade" :class="listType">
      <PhotoCard
        v-for="photo in data"
        :key="photo._id"
        :photo="photo.photo"
        :title="photo.title"
        :square="square"
        :class="{ horizontal: getPhotoType(photo?.type) }"
        @click="onCardClick(photo.title, photo._id)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .normal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
    width: 100%;
  }
  .list-wrapper {
    display: grid;
    place-items: center;
  }
  .mansory {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: dense;
    gap: 16px;
  }
  .mansory .horizontal {
    grid-column: span 2;
  }
  @media (max-width: 768px) {
    .mansory {
      grid-template-columns: 1fr;
    }
    .mansory .horizontal {
      grid-column: span 1;
    }
  }
</style>
