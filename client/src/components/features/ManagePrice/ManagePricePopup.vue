<script setup>
  import AppPopup from "@/components/shared/AppPopup.vue"
  import AddPrice from "./AddPrice.vue"
  import EditPrice from "./EditPrice.vue"

  const { variant } = defineProps({
    variant: "add" | "edit",
  })

  const priceFeatures = {
    add: {
      title: "Add Price",
      component: AddPrice,
    },
    edit: {
      title: "Edit Price",
      component: EditPrice,
    },
  }

  console.log(variant)
</script>

<template>
  <AppPopup
    v-model:visible="isVisible"
    :title="priceFeatures[variant].title"
    class="price-popup"
  >
    <template #body="{ close }">
      <Component :is="priceFeatures[variant].component" @close="close" />
    </template>
  </AppPopup>
</template>

<style>
  .price-popup {
    width: 100%;
    max-width: 1100px;
  }
</style>
