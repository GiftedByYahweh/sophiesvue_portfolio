<script setup>
  import { ref } from "vue"
  import AppPage from "@/components/shared/AppPage.vue"
  import {
    CollectionsList,
    CreateCollection,
  } from "@/components/features/portfolio"
  import { AdminPanel } from "@/components/widgets"

  const isVisible = ref(false)

  const openPopup = () => {
    isVisible.value = true
  }
</script>

<template>
  <AppPage>
    <div class="collections">
      <AdminPanel
        title="Collections"
        button-title="New Collection"
        @click="openPopup"
      />
      <CollectionsList />
      <CreateCollection v-model:visible="isVisible" />
    </div>
  </AppPage>
</template>

<style scoped>
  .collections {
    display: grid;
  }
</style>
