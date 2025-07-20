<script setup>
  import { ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import CreateForm from "@/components/widgets/CreateForm/CreateForm.vue"
  import { usePortfolioStore } from "@/stores/portfolio"
  import { useRoute } from "vue-router"
  import { createAlbums } from "@/services/album"

  const isVisible = defineModel("visible")
  const photosModel = ref([])

  const route = useRoute()
  const portfolio = usePortfolioStore()
  const queryClient = useQueryClient()

  const onCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["albums"] })
    photosModel.value = []
    isVisible.value = false
  }

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () =>
      createAlbums({
        photos: photosModel.value,
        collectionId: portfolio.currentCollectionId(route.query.collection),
      }),
    onSuccess: onCreateSuccess,
  })

  const onCreate = async () => {
    await mutateAsync()
  }
</script>

<template>
  <AppPopup v-model:visible="isVisible" title="Add albums" class="album-popup">
    <template #body="{ close }">
      <CreateForm
        :is-loading="isPending"
        :error="error"
        multiple
        v-model:photos="photosModel"
        @submit="onCreate"
        @close="close"
      />
    </template>
  </AppPopup>
</template>

<style>
  .album-popup {
    width: 100%;
    max-width: 500px;
  }
</style>
