<script setup>
  import { ref } from "vue"
  import { CategoriesList, CreateCategory } from "@/components/features"
  import { AdminPanel } from "@/components/widgets"

  const isVisible = ref(false)

  const openPopup = () => {
    isVisible.value = true
  }
</script>

<template>
  <div class="categories">
    <AdminPanel
      title="Categories"
      button-title="New Category"
      @click="openPopup"
    />
    <CategoriesList v-model:visible="isVisible" />
    <CreateCategory v-model:visible="isVisible" />
  </div>
</template>

<style scoped>
  .categories {
    display: grid;
  }
</style>
