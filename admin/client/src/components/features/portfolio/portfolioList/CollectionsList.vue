<script setup>
  import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query"
  import {
    delteteCollection,
    fetchCollections,
    hideCollection,
    restoreCollection,
    setCollectionLiked,
  } from "@/services/collections"
  import { useRoute, useRouter } from "vue-router"
  import { computed, onMounted, ref } from "vue"
  import { PhotoList, SwitcherContainer } from "@/components/widgets"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { useTitles } from "@/composables/useTitles"
  import { RoutePaths } from "@/router/routes"
  import { useToast } from "@/composables/useToast"
  import EditCollection from "../managePortfolio/EditCollection.vue"

  const { getCategoryTitles } = useTitles()

  const queryClient = useQueryClient()
  const toast = useToast()

  const route = useRoute()
  const router = useRouter()
  const portfolio = usePortfolio()

  const itemToEdit = ref(null)

  const currentCategory = computed(() => {
    return route.params.category
  })

  const currentCategoryTitle = computed(() => {
    const cat = portfolio.categories.find((c) => c.slug === currentCategory.value)
    return cat?.title ?? currentCategory.value
  })

  const categoryId = computed(() =>
    portfolio.currentCategoryId(currentCategory.value),
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ["collections", categoryId],
    queryFn: () => fetchCollections(currentCategory.value),
    enabled: computed(() => !!currentCategory.value && !!categoryId.value),
    retry: false,
  })

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["collections"] })
    queryClient.invalidateQueries({ queryKey: ["favorites"] })
  }

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: (id) => delteteCollection(id),
  })

  const { mutateAsync: hideMutate } = useMutation({
    mutationFn: (id) => hideCollection(id),
  })

  const { mutateAsync: restoreMutate } = useMutation({
    mutationFn: (id) => restoreCollection(id),
  })

  const { mutateAsync: toggleLikedMutate } = useMutation({
    mutationFn: (item) => setCollectionLiked(item.id, item, !item.isLiked),
  })

  const onDelete = async (id) => {
    const result = await deleteMutate(id)
    if (result.ok) {
      toast.success("Успішно видалено")
      invalidate()
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }

  const onEdit = (item) => {
    itemToEdit.value = item
  }

  const onToggleVisibility = async (item) => {
    const result = item.isActive
      ? await hideMutate(item.id)
      : await restoreMutate(item.id)
    if (result.ok) {
      toast.success(item.isActive ? `Приховано — ${item.title}` : `Відновлено — ${item.title}`)
      invalidate()
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }

  const onToggleLike = async (item) => {
    const result = await toggleLikedMutate(item)
    if (result.ok) {
      toast.success(item.isLiked ? `Знято позначення — ${item.title}` : `Позначено як улюблене — ${item.title}`)
      invalidate()
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }

  const goToAlbum = (photo) => {
    if (!photo?.slug) return
    router.push({
      name: RoutePaths.album.name,
      params: { category: currentCategory.value, collection: photo.slug },
    })
  }

  const switchCollection = (categoryName) => {
    const slug = portfolio.currentCategorySlug(categoryName)
    if (!slug) return
    router.push({
      name: RoutePaths.collections.name,
      params: { category: slug },
    })
  }

  onMounted(async () => {
    await getCategoryTitles()
  })
</script>

<template>
  <SwitcherContainer
    :query="currentCategoryTitle"
    :list="portfolio.categoryTitles"
    @switch-list="switchCollection"
  >
    <PhotoList
      :data="data"
      :is-loading="isLoading"
      :error="error"
      likeable
      @on-card-click="goToAlbum"
      @on-edit="onEdit"
      @on-toggle-visibility="onToggleVisibility"
      @on-toggle-like="onToggleLike"
      @on-delete="onDelete"
    />
  </SwitcherContainer>
  <EditCollection v-model:item="itemToEdit" />
</template>

<style scoped>
  .catigories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 426px));
    gap: 20px;
  }
</style>
