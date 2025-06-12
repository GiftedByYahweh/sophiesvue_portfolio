<script setup>
  import AppPopup from "@/components/shared/AppPopup.vue"
  import EditProfileForm from "./EditProfileForm.vue"

  const visible = defineModel("visible")
  const currentInfo = defineModel("currentInfo")

  const onSubmit = async () => {}
</script>

<template>
  <AppPopup v-model:visible="visible" title="Edit personal info">
    <template #body="{ close }">
      <EditProfileForm
        v-model="currentInfo"
        @close="close"
        @on-submit="onSubmit"
      />
    </template>
  </AppPopup>
</template>
