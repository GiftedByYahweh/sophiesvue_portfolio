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
    portfolio,
    listType = "normal",
    likeable,
  } = defineProps({
    data: Array,
    isLoading: Boolean,
    error: Error,
    square: Boolean,
    portfolio: String,
    listType: String,
    likeable: Boolean,
  })

  const emit = defineEmits({
    onCardClick: null,
    onEdit: null,
    onToggleVisibility: null,
    onToggleLike: null,
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

  const getPhotoType = (photo) => {
    return photo === "horizontal" ? photo : ""
  }

  const onCardClick = (photo) => {
    emit("onCardClick", photo)
  }

  const onPopupOpen = (id, name) => {
    const elementName = name ?? "this element"
    photoId.value = id
    photoName.value = elementName
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
    <TransitionGroup v-else tag="div" name="fade" :class="listType">
      <PhotoCard
        v-for="photo in data"
        :key="photo.id"
        :photo="photo.photo"
        :title="photo.title"
        :square="square"
        :is-active="photo.isActive"
        :is-liked="likeable ? !!photo.isLiked : undefined"
        :likeable="likeable"
        :class="{ horizontal: getPhotoType(photo?.type) }"
        @click="onCardClick(photo)"
        @edit="emit('onEdit', photo)"
        @toggle-visibility="emit('onToggleVisibility', photo)"
        @toggle-like="emit('onToggleLike', photo)"
        @delete="onPopupOpen(photo.id, photo.title)"
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
