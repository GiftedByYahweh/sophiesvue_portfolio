<script setup>
  import { ref } from "vue"
  import { CollectionsList, CreateCollection } from "@/components/features"
  import { AdminPanel } from "@/components/widgets"

  const isVisible = ref(false)

  const openPopup = () => {
    isVisible.value = true
  }
</script>

<template>
  <div class="collections">
    <AdminPanel
      title="Collections"
      button-title="New Collection"
      @click="openPopup"
    />
    <CollectionsList v-model:visible="isVisible" />
    <CreateCollection v-model:visible="isVisible" />
  </div>
</template>

<style scoped>
  .collections {
    display: grid;
  }
</style>
