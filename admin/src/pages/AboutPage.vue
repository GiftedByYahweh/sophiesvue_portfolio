<script setup>
  import { ref } from "vue"
  import { AboutMe } from "@/components/features/profile"
  import { EditAboutMePopup } from "@/components/features/profile"
  import AppPage from "@/components/shared/AppPage.vue"
  import { AdminPanel } from "@/components/widgets"
  import { useQuery } from "@tanstack/vue-query"
  import { fetchProfile } from "@/services/profile"

  const isEdit = ref(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["about"],
    queryFn: fetchProfile,
    retry: false,
  })

  const openPopup = () => {
    isEdit.value = true
  }
</script>

<template>
  <AppPage>
    <AdminPanel
      title="Profile"
      button-title="Edit Profile"
      @click="openPopup"
    />
    <AboutMe :about="data" :is-loading="isLoading" :error="error" />
    <EditAboutMePopup v-model:visible="isEdit" v-model:current-info="data" />
  </AppPage>
</template>

<style scoped></style>
