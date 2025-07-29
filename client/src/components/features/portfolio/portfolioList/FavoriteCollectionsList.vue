<script setup>
  import { PhotoList } from "@/components/widgets"
  import { RoutePaths } from "@/router/routes"
  import { fetchFavoriteCollections } from "@/services/collections"
  import { useQuery } from "@tanstack/vue-query"
  import { useRouter } from "vue-router"

  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavoriteCollections,
    retry: false,
  })

  const router = useRouter()

  const goToAlbum = (collection, id) => {
    const category = data.value.find((photo) => photo._id === id)
    router.push({
      path: RoutePaths.portfolio.path,
      query: { category: category.categoryTitle, collection: collection },
    })
  }
</script>

<template>
  <PhotoList
    :data="data"
    :is-loading="isLoading"
    :error="error"
    @on-card-click="goToAlbum"
  />
</template>

<style scoped></style>
