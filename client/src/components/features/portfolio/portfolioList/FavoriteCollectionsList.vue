<script setup>
  import { PhotoList } from "@/components/widgets"
  import { fetchFavoriteCollections } from "@/services/collections"
  import { useQuery } from "@tanstack/vue-query"

  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavoriteCollections,
    retry: false,
  })
</script>

<template>
  <PhotoList :data="data" :is-loading="isLoading" :error="error" />
</template>

<style scoped></style>
