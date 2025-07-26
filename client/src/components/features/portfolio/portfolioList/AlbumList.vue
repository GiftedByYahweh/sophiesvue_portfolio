<script setup>
  import { useQuery } from "@tanstack/vue-query"
  import { fetchAlbum } from "@/services/album"
  import { useRoute, useRouter } from "vue-router"
  import { computed, onMounted } from "vue"
  import { useTitles } from "@/composables/useTitles"
  // import { usePortfolioStore } from "@/stores/portfolio"
  import { PhotoList, SwitcherContainer } from "@/components/widgets"

  const { getCollectionTitles } = useTitles()
  // const portfolio = usePortfolioStore()
  const route = useRoute()
  const router = useRouter()

  const currentCollection = computed(() => {
    return route.query.collection
  })

  const currentCategory = computed(() => {
    return route.query.category
  })

  // const switchCollection = (category, collection) => {
  //   router.push({
  //     query: {
  //       category: currentCategory.value,
  //       collection: currentCollection.value,
  //     },
  //   })
  // }

  const { data, isLoading } = useQuery({
    queryKey: ["albumList", currentCollection.value],
    queryFn: () => fetchAlbum(currentCategory.value, currentCollection.value),
    enabled: !!currentCollection.value,
    retry: false,
  })

  onMounted(async () => {
    await getCollectionTitles(currentCategory.value)
  })
</script>

<template>
  <!-- <SwitcherContainer
    :query="currentCategory"
    :list="portfolio.collectionTitles"
    @switch-list="switchCollection"
  > -->
  <PhotoList
    :data="data"
    :is-loading="isLoading"
    :error="error"
    list-type="mansory"
  />
  <!-- </SwitcherContainer> -->
</template>
