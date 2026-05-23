<script setup>
  import { ref } from "vue"
  import AppPage from "@/components/shared/AppPage.vue"
  import {
    CategoriesList,
    CreateCategory,
  } from "@/components/features/portfolio"
  import { AdminPanel } from "@/components/widgets"

  const isVisible = ref(false)

  const openPopup = () => {
    isVisible.value = true
  }
</script>

<template>
  <AppPage>
    <div class="categories">
      <AdminPanel
        title="Categories"
        button-title="New Category"
        @click="openPopup"
      />
      <CategoriesList />
      <CreateCategory v-model:visible="isVisible" />
    </div>
  </AppPage>
</template>

<style scoped>
  .categories {
    display: grid;
  }
</style>
