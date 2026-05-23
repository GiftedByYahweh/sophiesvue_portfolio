<script setup>
  import { ref } from "vue"
  import AppPage from "@/components/shared/AppPage.vue"
  import { AlbumList, AddAlbum } from "@/components/features/portfolio"
  import { AdminPanel } from "@/components/widgets"

  const isVisible = ref(false)

  const openPopup = () => {
    isVisible.value = true
  }
</script>

<template>
  <AppPage>
    <div class="album">
      <AdminPanel
        class="panel"
        title="Album"
        button-title="New Album"
        @click="openPopup"
      />
      <AlbumList />
      <AddAlbum v-model:visible="isVisible" />
    </div>
  </AppPage>
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
