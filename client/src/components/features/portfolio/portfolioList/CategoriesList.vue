<script setup>
  import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
  import { delteteCategory, fetchCategories } from "@/services/categories"
  import { useRouter } from "vue-router"
  import { PhotoList } from "@/components/widgets"

  const router = useRouter()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: false,
  })

  const { mutateAsync } = useMutation({
    mutationFn: (id) => delteteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const goToCollections = (title) => {
    router.push({
      query: { category: title },
    })
  }

  const onDelete = async (id) => {
    await mutateAsync(id)
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
    @on-delete="onDelete"
  />
</template>

<style scoped></style>
