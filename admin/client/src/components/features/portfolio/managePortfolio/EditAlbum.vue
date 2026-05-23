<script setup>
  import { computed, ref, watch } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import { updateAlbum } from "@/services/album"
  import { useToast } from "@/composables/useToast"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import EditForm from "@/components/widgets/CreateForm/EditForm.vue"

  const item = defineModel("item")

  const title = ref("")
  const slug = ref("")
  const horizontal = ref(false)
  const photosModel = ref([])

  const queryClient = useQueryClient()
  const toast = useToast()

  const isVisible = computed({
    get: () => !!item.value,
    set: (value) => {
      if (!value) item.value = null
    },
  })

  watch(
    item,
    (value) => {
      title.value = value?.title ?? ""
      slug.value = value?.slug ?? ""
      horizontal.value = value?.type === "horizontal"
      photosModel.value = []
    },
    { immediate: true },
  )

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateAlbum(item.value.id, {
        title: title.value,
        slug: slug.value,
        isActive: item.value.isActive,
        type: horizontal.value ? "horizontal" : "normal",
        photo: photosModel.value[0],
      }),
  })

  const onSave = async () => {
    const result = await mutateAsync()
    if (result.ok) {
      toast.success(`Успішно змінено — ${title.value}`)
      queryClient.invalidateQueries({ queryKey: ["albumList"] })
      photosModel.value = []
      item.value = null
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }
</script>

<template>
  <AppPopup v-model:visible="isVisible" title="Редагувати альбом" class="album-popup">
    <template #body="{ close }">
      <EditForm
        :is-loading="isPending"
        :current-photo="item?.photo"
        v-model:title="title"
        v-model:slug="slug"
        v-model:horizontal="horizontal"
        v-model:photos="photosModel"
        @submit="onSave"
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
