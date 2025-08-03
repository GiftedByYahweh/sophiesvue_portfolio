<script setup>
  import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
  import { delteteAlbum, fetchAlbum } from "@/services/album"
  import { useRoute } from "vue-router"
  import { computed, onMounted } from "vue"
  import { useTitles } from "@/composables/useTitles"
  import { PhotoList } from "@/components/widgets"

  const queryClient = useQueryClient()
  const { getCollectionTitles } = useTitles()
  const route = useRoute()

  const currentCollection = computed(() => {
    return route.query.collection
  })

  const currentCategory = computed(() => {
    return route.query.category
  })

  const { data, error, isLoading } = useQuery({
    queryKey: ["albumList", currentCollection.value],
    queryFn: () => fetchAlbum(currentCategory.value, currentCollection.value),
    enabled: !!currentCollection.value,
    retry: false,
  })

  onMounted(async () => {
    await getCollectionTitles(currentCategory.value)
  })

  const { mutateAsync } = useMutation({
    mutationFn: (id) => delteteAlbum(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albumList"] })
    },
  })

  const onDelete = async (id) => {
    console.log("sldfjbsd")
    await mutateAsync(id)
  }
</script>

<template>
  <PhotoList
    :data="data"
    :is-loading="isLoading"
    :error="error"
    portfolio="album"
    list-type="mansory"
    @on-delete="onDelete"
  />
</template>
