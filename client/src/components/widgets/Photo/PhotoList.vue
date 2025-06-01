<script setup>
  import { computed, ref } from "vue"
  import PhotoCard from "./PhotoCard.vue"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import ComfirmPopup from "./ComfirmPopup.vue"

  const {
    data = [],
    isLoading,
    error,
    square,
  } = defineProps({
    data: Array,
    isLoading: Boolean,
    error: Error,
    square: Boolean,
    portfolio: String,
  })

  const emit = defineEmits({
    onCardClick: null,
    onDelete: null,
  })

  const photoName = ref("")
  const photoId = ref("")

  const isEmpty = computed(() => {
    return !data.length
  })

  const popupDelete = computed(() => {
    return !!photoName.value
  })

  const onCardClick = (title) => {
    emit("onCardClick", title)
  }

  const onPopupOpen = (id, name) => {
    photoId.value = id
    photoName.value = name
  }

  const onPopupClose = () => {
    photoName.value = ""
  }

  const onDelete = async (id) => {
    emit("onDelete", id)
    onPopupClose()
  }
</script>

<template>
  <div class="list-wrapper">
    <AppLoader v-if="isLoading" />
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="isEmpty">{{ `Sorry, there's no data (((` }}</div>
    <TransitionGroup v-else tag="div" name="fade" class="list">
      <PhotoCard
        v-for="photo in data"
        :key="photo._id"
        :photo="photo.photo"
        :title="photo.title"
        :square="square"
        @delete="onPopupOpen(photo._id, photo.title)"
        @click="onCardClick(photo.title)"
      />
    </TransitionGroup>
    <ComfirmPopup
      v-model="popupDelete"
      :name="photoName"
      :portfolio="portfolio"
      @delete="onDelete(photoId)"
      @close="onPopupClose"
    />
  </div>
</template>

<style scoped>
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
    width: 100%;
  }
  .list-wrapper {
    display: grid;
    place-items: center;
  }
</style>
