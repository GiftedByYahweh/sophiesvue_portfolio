<script setup>
  import { PriceList, ManagePricePopup } from "@/components/features/price"
  import AppPage from "@/components/shared/AppPage.vue"
  import { AdminPanel } from "@/components/widgets"
  import { ref } from "vue"

  const priceToEdit = ref({})
  const pricePopup = ref({
    visible: false,
    variant: "add",
  })

  const onPopupOpen = (val) => {
    pricePopup.value.visible = true
    pricePopup.value.variant = val
  }
</script>

<template>
  <AppPage>
    <AdminPanel title="Manage Price">
      <template #actions>
        <button class="secondary" @click="onPopupOpen('add')">Add Price</button>
      </template>
    </AdminPanel>
    <PriceList v-model:edit="priceToEdit" @edit-price="onPopupOpen('edit')" />
    <ManagePricePopup
      v-model:visible="pricePopup.visible"
      v-model:edit="priceToEdit"
      :variant="pricePopup.variant"
    />
  </AppPage>
</template>
