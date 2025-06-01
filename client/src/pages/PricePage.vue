<script setup>
  import ManagePricePopup from "@/components/features/ManagePrice/ManagePricePopup.vue"
  import PriceList from "@/components/features/Price/PriceList.vue"
  import AppPage from "@/components/shared/AppPage.vue"
  import AdminPanel from "@/components/widgets/AdminPanel/AdminPanel.vue"
  import { ref } from "vue"

  const pricePopup = ref({
    visible: false,
    variant: 'add'
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
        <div class="wrapper">
          <button class="secondary" @click="onPopupOpen('add')">Add Price</button>
          <button class="secondary" @click="onPopupOpen('edit')">Edit Price</button>
        </div>
      </template>
    </AdminPanel>
    <PriceList />
    <ManagePricePopup v-model:visible="pricePopup.visible" :variant="pricePopup.variant" />
  </AppPage>
</template>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
