<script setup>
  import { AboutMe } from "@/components/features/profile"
  import AppPage from "@/components/shared/AppPage.vue"
  import { useQuery } from "@tanstack/vue-query"
  import { fetchProfile } from "@/services/profile"

  const { data, isLoading, error } = useQuery({
    queryKey: ["about"],
    queryFn: fetchProfile,
    retry: false,
  })
</script>

<template>
  <AppPage>
    <AboutMe :about="data" :is-loading="isLoading" :error="error" />
  </AppPage>
</template>

<style scoped></style>
