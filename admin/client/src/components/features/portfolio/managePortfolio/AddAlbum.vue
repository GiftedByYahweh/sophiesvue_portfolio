<script setup>
  import { ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import CreateForm from "@/components/widgets/CreateForm/CreateForm.vue"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { useRoute } from "vue-router"
  import { createAlbums } from "@/services/album"
  import { useToast } from "@/composables/useToast"

  const isVisible = defineModel("visible")
  const photosModel = ref([])
  const type = ref(false)

  const route = useRoute()
  const portfolio = usePortfolio()
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      createAlbums({
        photos: photosModel.value,
        collectionId: portfolio.currentCollectionId(route.params.collection),
        type: type.value,
      }),
  })

  const onCreate = async () => {
    const result = await mutateAsync()
    if (result.ok) {
      toast.success("Успішно додано фото")
      queryClient.invalidateQueries({ queryKey: ["albumList"] })
      photosModel.value = []
      isVisible.value = false
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }
</script>

<template>
  <AppPopup v-model:visible="isVisible" title="Add albums" class="album-popup">
    <template #body="{ close }">
      <CreateForm
        :is-loading="isPending"
        multiple
        v-model:photos="photosModel"
        v-model:horizontal="type"
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
