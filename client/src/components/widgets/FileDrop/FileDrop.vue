<script setup>
  import AppFileInput from "@/components/shared/AppFileInput.vue"
  import { computed, ref } from "vue"
  import FileCard from "./FileCard.vue"
  import AppText from "@/components/shared/AppText.vue"
  import FilePopup from "./FilePopup.vue"

  const MAX_CARDS_TO_SHOW = 3

  const { multiple } = defineProps({ multiple: Boolean })
  const photosModel = defineModel()

  const visiblePopup = ref(false)

  const isListVisible = computed(() => {
    return photosModel.value?.length > 0
  })

  const limitedPhotosToShow = computed(() => {
    return photosModel.value.slice(0, MAX_CARDS_TO_SHOW)
  })

  const isMoreThenThree = computed(() => {
    return photosModel.value.length > MAX_CARDS_TO_SHOW
  })

  const deleteSelectedFileByName = (currentFileName) => {
    photosModel.value = photosModel.value?.filter(
      (item) => item.name !== currentFileName,
    )
  }

  const deleteAllFiles = () => {
    photosModel.value = []
    visiblePopup.value = false
  }

  const openPopup = () => {
    visiblePopup.value = true
  }
</script>

<template>
  <div class="file-drop">
    <AppFileInput v-model="photosModel" :multiple="multiple" />
    <div v-if="isListVisible" class="list">
      <FileCard
        v-for="photo in limitedPhotosToShow"
        :key="photo.name"
        :photo="photo"
        @on-delete="deleteSelectedFileByName(photo.name)"
      />
      <AppText
        v-if="isMoreThenThree"
        class="show-more"
        role="button"
        @click="openPopup"
      >
        show more
      </AppText>
    </div>
    <FilePopup
      v-model="visiblePopup"
      :photos="photosModel"
      @on-delete="deleteSelectedFileByName"
      @on-delete-all="deleteAllFiles"
    />
  </div>
</template>

<style scoped>
  .file-drop {
    display: grid;
    gap: 10px;
  }
  .more-btn {
    cursor: pointer;
  }
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-auto-flow: column;
    align-items: center;
    gap: 5px;
  }
  .show-more {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
