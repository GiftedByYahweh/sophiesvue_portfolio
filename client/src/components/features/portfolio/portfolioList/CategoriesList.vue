<script setup>
  import { useQuery } from "@tanstack/vue-query"
  import { fetchCategories } from "@/services/categories"
  import { useRouter } from "vue-router"
  import { PhotoList } from "@/components/widgets"

  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: false,
  })

  const goToCollections = (title) => {
    router.push({
      query: { category: title },
    })
  }
</script>

<template>
  <PhotoList
    :data="data"
    :is-loading="isLoading"
    :error="error"
    square
    @on-card-click="goToCollections"
  />
</template>
