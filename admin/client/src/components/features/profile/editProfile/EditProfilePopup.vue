<script setup>
  import AppPopup from "@/components/shared/AppPopup.vue"
  import EditProfileForm from "./EditProfileForm.vue"

  const visible = defineModel("visible")
  const currentInfo = defineModel("currentInfo")
</script>

<template>
  <AppPopup v-model:visible="visible" title="Edit personal info">
    <template #body="{ close }">
      <EditProfileForm v-model="currentInfo" @close="close" />
    </template>
  </AppPopup>
</template>
