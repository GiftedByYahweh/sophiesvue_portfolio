<script setup>
  import { ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import { createCategory } from "@/services/categories"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import CreateForm from "@/components/widgets/CreateForm/CreateForm.vue"

  const isVisible = defineModel("visible")
  const title = ref("")
  const photosModel = ref([])

  const queryClient = useQueryClient()

  const onCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] })
    title.value = ""
    photosModel.value = []
    isVisible.value = false
  }

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => createCategory(title.value, photosModel.value[0]),
    onSuccess: onCreateSuccess,
  })

  const onCreate = async () => {
    try {
      await mutateAsync()
    } catch (e) {
      console.log()
    }
  }
</script>

<template>
  <AppPopup
    v-model:visible="isVisible"
    title="Create category"
    class="category-popup"
  >
    <template #body="{ close }">
      <CreateForm
        :is-loading="isPending"
        :error="error"
        v-model:title="title"
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
