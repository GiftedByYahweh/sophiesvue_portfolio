<script setup>
  import { AboutMe } from "@/components/features"
  import AppPage from "@/components/shared/AppPage.vue"
  import AdminPanel from "@/components/widgets/AdminPanel/AdminPanel.vue"
</script>

<template>
  <AppPage>
    <AdminPanel title="Profile" button-title="Edit Profile" />
    <AboutMe />
  </AppPage>
</template>

<style scoped></style>
