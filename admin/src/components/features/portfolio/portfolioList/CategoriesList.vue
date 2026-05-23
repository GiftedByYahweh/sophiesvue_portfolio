<script setup>
  import { ref } from "vue"
  import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
  import {
    delteteCategory,
    fetchCategories,
    hideCategory,
    restoreCategory,
  } from "@/services/categories"
  import { useRouter } from "vue-router"
  import { RoutePaths } from "@/router/routes"
  import { PhotoList } from "@/components/widgets"
  import { useToast } from "@/composables/useToast"
  import EditCategory from "../managePortfolio/EditCategory.vue"

  const router = useRouter()
  const queryClient = useQueryClient()
  const toast = useToast()

  const itemToEdit = ref(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: false,
  })

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["categories"] })

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: (id) => delteteCategory(id),
  })

  const { mutateAsync: hideMutate } = useMutation({
    mutationFn: (id) => hideCategory(id),
  })

  const { mutateAsync: restoreMutate } = useMutation({
    mutationFn: (id) => restoreCategory(id),
  })

  const goToCollections = (photo) => {
    if (!photo?.slug) return
    router.push({
      name: RoutePaths.collections.name,
      params: { category: photo.slug },
    })
  }

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
    square
    portfolio="category"
    @on-card-click="goToCollections"
    @on-edit="onEdit"
    @on-toggle-visibility="onToggleVisibility"
    @on-delete="onDelete"
  />
  <EditCategory v-model:item="itemToEdit" />
</template>

<style scoped></style>
