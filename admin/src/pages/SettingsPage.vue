<script setup>
  import { ref, computed, watch } from "vue"
  import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query"
  import AppPage from "@/components/shared/AppPage.vue"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import AppText from "@/components/shared/AppText.vue"
  import AppFileInput from "@/components/shared/AppFileInput.vue"
  import { fetchSettings, saveSettings } from "@/services/settings"
  import { useToast } from "@/composables/useToast"

  const queryClient = useQueryClient()
  const toast = useToast()

  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    retry: false,
  })

  const form = ref(null)
  const photoFiles = ref([])
  const previewUrl = ref("")

  watch(
    data,
    (val) => {
      if (val && !form.value) {
        form.value = { ...val }
        previewUrl.value = val.mainPhotoLink
      }
    },
    { immediate: true },
  )

  watch(photoFiles, (files) => {
    const file = files[0]
    if (file instanceof File) {
      previewUrl.value = URL.createObjectURL(file)
    } else {
      previewUrl.value = form.value?.mainPhotoLink ?? ""
    }
  })

  const photoFile = computed(() => {
    const file = photoFiles.value[0]
    return file instanceof File ? file : null
  })

  const isDirty = computed(() => {
    if (!data.value || !form.value) return false
    return (
      photoFile.value !== null ||
      form.value.instLink !== data.value.instLink ||
      form.value.mainSubTitle !== data.value.mainSubTitle ||
      form.value.mainTitleColor !== data.value.mainTitleColor ||
      form.value.mainHeaderColor !== data.value.mainHeaderColor
    )
  })

  const reset = () => {
    form.value = { ...data.value }
    photoFiles.value = []
    previewUrl.value = data.value?.mainPhotoLink ?? ""
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => saveSettings({ ...form.value, photo: photoFile.value }),
  })

  const onSave = async () => {
    const result = await mutateAsync()
    if (result.ok) {
      toast.success("Налаштування збережено")
      photoFiles.value = []
      queryClient.invalidateQueries({ queryKey: ["settings"] })
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }
</script>

<template>
  <AppPage>
    <div class="settings-header">
      <AppText size="l">Settings</AppText>
    </div>

    <AppLoader v-if="isLoading" />

    <form v-if="form" @submit.prevent class="form">
      <div class="body">
        <div class="photo-section">
          <img :src="previewUrl" alt="Main photo" class="photo-preview" />
          <AppFileInput v-model="photoFiles" :multiple="false" />
        </div>

        <div class="fields">
          <label class="field">
            <AppText>Instagram link</AppText>
            <input
              v-model="form.instLink"
              type="text"
              placeholder="https://instagram.com/..."
            />
          </label>

          <label class="field">
            <AppText>Subtitle</AppText>
            <input
              v-model="form.mainSubTitle"
              type="text"
              placeholder="based in kyiv"
            />
          </label>

          <label class="field">
            <AppText>Title color</AppText>
            <div class="color-row">
              <input
                v-model="form.mainTitleColor"
                type="color"
                class="color-input"
              />
              <input
                v-model="form.mainTitleColor"
                type="text"
                class="color-text"
                placeholder="#ffffff"
              />
            </div>
          </label>

          <label class="field">
            <AppText>Header color (on main page)</AppText>
            <div class="color-row">
              <input
                v-model="form.mainHeaderColor"
                type="color"
                class="color-input"
              />
              <input
                v-model="form.mainHeaderColor"
                type="text"
                class="color-text"
                placeholder="#ffffff"
              />
            </div>
          </label>
        </div>
      </div>

      <div class="actions">
        <button v-if="isDirty" type="button" class="secondary" @click="reset">
          Reset
        </button>
        <div v-if="isPending" class="loading-box">
          <AppLoader />
        </div>
        <button
          type="submit"
          class="primary"
          :disabled="!isDirty || isPending"
          @click="onSave"
        >
          Save
        </button>
      </div>
    </form>
  </AppPage>
</template>

<style scoped>
  .settings-header {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--neutral-color);
    margin-bottom: 30px;
  }
  .form {
    display: grid;
    gap: 30px;
  }
  .body {
    display: grid;
    grid-template-columns: minmax(200px, 400px) 1fr;
    gap: 40px;
    align-items: start;
  }
  .photo-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .photo-preview {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
  .fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .color-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .color-input {
    width: 44px;
    height: 38px;
    padding: 2px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .color-text {
    flex: 1;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }
  .loading-box {
    position: relative;
    max-width: 100px;
  }
</style>
