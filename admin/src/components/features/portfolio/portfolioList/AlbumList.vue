<script setup>
  import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
  import { delteteAlbum, fetchAlbum, hideAlbum, restoreAlbum } from "@/services/album"
  import { useRoute } from "vue-router"
  import { computed, onMounted, ref } from "vue"
  import { useTitles } from "@/composables/useTitles"
  import { PhotoList } from "@/components/widgets"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { useToast } from "@/composables/useToast"
  import EditAlbum from "../managePortfolio/EditAlbum.vue"

  const queryClient = useQueryClient()
  const portfolio = usePortfolio()
  const toast = useToast()
  const { getCategoryTitles, getCollectionTitles } = useTitles()
  const route = useRoute()

  const itemToEdit = ref(null)

  const currentCollection = computed(() => {
    return route.params.collection
  })

  const currentCategory = computed(() => {
    return route.params.category
  })

  const collectionId = computed(() =>
    portfolio.currentCollectionId(currentCollection.value),
  )

  const { data, error, isLoading } = useQuery({
    queryKey: ["albumList", collectionId],
    queryFn: () => fetchAlbum(currentCollection.value),
    enabled: computed(
      () => !!currentCollection.value && !!collectionId.value,
    ),
    retry: false,
  })

  onMounted(async () => {
    await getCategoryTitles()
    await getCollectionTitles(currentCategory.value)
  })

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["albumList"] })

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: (id) => delteteAlbum(id),
  })

  const { mutateAsync: hideMutate } = useMutation({
    mutationFn: (id) => hideAlbum(id),
  })

  const { mutateAsync: restoreMutate } = useMutation({
    mutationFn: (id) => restoreAlbum(id),
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
</script>

<template>
  <PhotoList
    :data="data"
    :is-loading="isLoading"
    :error="error"
    portfolio="album"
    list-type="mansory"
    @on-edit="onEdit"
    @on-toggle-visibility="onToggleVisibility"
    @on-delete="onDelete"
  />
  <EditAlbum v-model:item="itemToEdit" />
</template>
