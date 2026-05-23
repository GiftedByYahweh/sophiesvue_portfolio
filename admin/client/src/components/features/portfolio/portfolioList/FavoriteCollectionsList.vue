<script setup>
  import { onMounted } from "vue"
  import { PhotoList } from "@/components/widgets"
  import { RoutePaths } from "@/router/routes"
  import { fetchFavoriteCollections } from "@/services/collections"
  import { useQuery } from "@tanstack/vue-query"
  import { useRouter } from "vue-router"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { useTitles } from "@/composables/useTitles"

  const portfolio = usePortfolio()
  const { getCategoryTitles } = useTitles()

  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavoriteCollections,
    retry: false,
  })

  const router = useRouter()

  onMounted(async () => {
    await getCategoryTitles()
  })

  const goToAlbum = (photo) => {
    if (!photo?.slug) return
    const cat = portfolio.categories.find(
      (c) => c.id === photo.categoryId,
    )
    if (!cat?.slug) return
    router.push({
      name: RoutePaths.album.name,
      params: { category: cat.slug, collection: photo.slug },
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
