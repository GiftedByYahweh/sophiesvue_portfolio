<script setup>
  import AppPopup from "@/components/shared/AppPopup.vue"
  import FileCard from "./FileCard.vue"

  const { photos } = defineProps({
    photos: Array,
  })

  const emit = defineEmits({
    onDelete: null,
    onDeleteAll: null,
  })

  const visible = defineModel()

  const onDelete = (fileName) => {
    emit("onDelete", fileName)
  }

  const onDeleteAll = () => {
    emit("onDeleteAll")
  }
</script>

<template>
  <AppPopup
    v-model:visible="visible"
    title="Selected photos"
    class="file-popup"
  >
    <template #body="{ close }">
      <div class="content">
        <div class="list">
          <FileCard
            v-for="photo in photos"
            :key="photo.name"
            :photo="photo"
            class="photo"
            @on-delete="onDelete(photo.name)"
          />
        </div>
        <div class="wrapper">
          <button @click="close" class="secondary">Close</button>
          <button @click="onDeleteAll" class="primary">Delete All</button>
        </div>
      </div>
    </template>
  </AppPopup>
</template>

<style>
  .file-popup {
    max-width: 500px;
    width: 100%;
  }
</style>

<style scoped>
  .content {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 10px;
  }
  .list {
    height: 400px;
    display: grid;
    overflow-y: auto;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-template-rows: max-content;
    align-items: start;
    gap: 10px;
    padding: 10px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }
</style>
