<script setup>
  import { computed, ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import { createCollection } from "@/services/collections"
  import { useToast } from "@/composables/useToast"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import CreateForm from "@/components/widgets/CreateForm/CreateForm.vue"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { useRoute } from "vue-router"

  const isVisible = defineModel("visible")
  const title = ref("")
  const slug = ref("")
  const liked = ref(false)
  const photosModel = ref([])

  const route = useRoute()
  const portfolio = usePortfolio()
  const queryClient = useQueryClient()
  const toast = useToast()

  const photoStatus = computed(() => (liked.value ? "liked" : "unliked"))

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      createCollection({
        title: title.value,
        slug: slug.value,
        status: photoStatus.value,
        photo: photosModel.value[0],
        categoryId: portfolio.currentCategoryId(route.params.category),
      }),
  })

  const onCreate = async () => {
    const result = await mutateAsync()
    if (result.ok) {
      toast.success(`Успішно створено — ${title.value}`)
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      title.value = ""
      slug.value = ""
      photosModel.value = []
      isVisible.value = false
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }
</script>

<template>
  <AppPopup v-model:visible="isVisible" title="Create Collection" class="collection-popup">
    <template #body="{ close }">
      <CreateForm
        :is-loading="isPending"
        v-model:title="title"
        v-model:slug="slug"
        v-model:liked="liked"
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
