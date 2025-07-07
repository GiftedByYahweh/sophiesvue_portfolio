<script setup>
  import { ref } from "vue"
  import { AlbumList, AddAlbum } from "@/components/features/portfolio"
  import { AdminPanel } from "@/components/widgets"

  const isVisible = ref(false)

  const openPopup = () => {
    isVisible.value = true
  }
</script>

<template>
  <div class="album">
    <AdminPanel
      class="panel"
      title="Album"
      button-title="New Album"
      @click="openPopup"
    />
    <AlbumList v-model:visible="isVisible" />
    <AddAlbum v-model:visible="isVisible" />
  </div>
</template>

<style scoped>
  .album {
    display: grid;
    place-items: center;
  }
  .panel {
    width: 100%;
  }
</style>
