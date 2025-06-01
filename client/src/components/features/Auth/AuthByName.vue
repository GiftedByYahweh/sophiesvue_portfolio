<script setup>
  import AppPopup from "@/components/shared/AppPopup.vue"

  import AuthForm from "./AuthForm.vue"

  const isVisible = defineModel("visible")
</script>

<template>
  <AppPopup v-model:visible="isVisible" title="sophiesvue">
    <template #body="{ close }">
      <AuthForm @on-close="close" />
    </template>
  </AppPopup>
</template>

<style scoped></style>
