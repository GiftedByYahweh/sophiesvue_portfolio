<script setup>
  import { computed, ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import { createCollection } from "@/services/collections"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import CreateForm from "@/components/widgets/CreateForm/CreateForm.vue"
  import { usePortfolioStore } from "@/stores/portfolio"
  import { useRoute } from "vue-router"

  const isVisible = defineModel("visible")
  const title = ref("")
  const liked = ref(false)
  const photosModel = ref([])

  const route = useRoute()
  const portfolio = usePortfolioStore()
  const queryClient = useQueryClient()

  const photoStatus = computed(() => {
    return liked.value ? "liked" : "unliked"
  })

  const onCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["collections"] })
    title.value = ""
    photosModel.value = []
    isVisible.value = false
  }

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () =>
      createCollection({
        title: title.value,
        status: photoStatus.value,
        photo: photosModel.value[0],
        categoryId: portfolio.currentCategoryId(route.query.category),
      }),
    onSuccess: onCreateSuccess,
  })

  const onCreate = async () => {
    await mutateAsync()
  }
</script>

<template>
  <AppPopup
    v-model:visible="isVisible"
    title="Create Collection"
    class="collection-popup"
  >
    <template #body="{ close }">
      <CreateForm
        :is-loading="isPending"
        :error="error"
        v-model:liked="liked"
        v-model:title="title"
        v-model:photos="photosModel"
        @submit="onCreate"
        @close="close"
      />
    </template>
  </AppPopup>
</template>

<style>
  .collection-popup {
    width: 100%;
    max-width: 500px;
  }
</style>
