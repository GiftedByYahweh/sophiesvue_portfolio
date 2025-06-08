<script setup>
  import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query"
  import { delteteCollection, fetchCollections } from "@/services/collections"
  import { useRoute, useRouter } from "vue-router"
  import { computed, onMounted } from "vue"
  import { PhotoList, SwitcherContainer } from "@/components/widgets"
  import { usePortfolioStore } from "@/stores/portfolio"
  import { useTitles } from "@/composables/useTitles"

  const { getCategoryTitles } = useTitles()

  const queryClient = useQueryClient()

  const route = useRoute()
  const router = useRouter()
  const portfolio = usePortfolioStore()

  const currentCategory = computed(() => {
    return route.query.category
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ["collections", currentCategory],
    queryFn: () => fetchCollections(currentCategory.value),
    retry: false,
  })

  const { mutateAsync } = useMutation({
    mutationFn: (id) => delteteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
    },
  })

  const onDelete = async (id) => {
    await mutateAsync(id)
  }

  const goToAlbum = (collection) => {
    router.push({
      query: { category: currentCategory.value, collection: collection },
    })
  }

  const switchCollection = (category) => {
    router.push({
      query: { category: category },
    })
  }

  onMounted(async () => {
    await getCategoryTitles()
  })
</script>

<template>
  <SwitcherContainer
    :query="currentCategory"
    :list="portfolio.categoryTitles"
    @switch-list="switchCollection"
  >
    <PhotoList
      :data="data"
      :is-loading="isLoading"
      :error="error"
      @on-card-click="goToAlbum"
      @on-delete="onDelete"
    />
  </SwitcherContainer>
</template>

<style scoped>
  .catigories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 426px));
    gap: 20px;
  }
</style>
