<script setup>
  import { ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import { createCategory } from "@/services/categories"
  import { useToast } from "@/composables/useToast"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import CreateForm from "@/components/widgets/CreateForm/CreateForm.vue"

  const isVisible = defineModel("visible")
  const title = ref("")
  const slug = ref("")
  const photosModel = ref([])

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => createCategory(title.value, slug.value, photosModel.value[0]),
  })

  const onCreate = async () => {
    const result = await mutateAsync()
    if (result.ok) {
      toast.success(`Успішно створено — ${title.value}`)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
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
  <AppPopup v-model:visible="isVisible" title="Create category" class="category-popup">
    <template #body="{ close }">
      <CreateForm
        :is-loading="isPending"
        v-model:title="title"
        v-model:slug="slug"
        v-model:photos="photosModel"
        @submit="onCreate"
        @close="close"
      />
    </template>
  </AppPopup>
</template>

<style>
  .category-popup {
    width: 100%;
    max-width: 500px;
  }
</style>
