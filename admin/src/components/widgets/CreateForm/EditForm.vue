<script setup>
  import { computed } from "vue"
  import { FileDrop } from "@/components/widgets"
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import AppText from "@/components/shared/AppText.vue"

  const emit = defineEmits({
    submit: null,
    close: null,
  })

  const { isLoading, error, currentPhoto } = defineProps({
    isLoading: Boolean,
    error: Error,
    currentPhoto: String,
  })

  const title = defineModel("title")
  const slug = defineModel("slug")
  const liked = defineModel("liked")
  const horizontalPhoto = defineModel("horizontal")
  const photosModel = defineModel("photos")

  const hasSlugField = computed(() => slug.value !== undefined)

  const hasLikedField = computed(() => {
    return liked.value !== undefined
  })

  const hasHorizontalField = computed(() => {
    return horizontalPhoto.value !== undefined
  })

  const notAvaliable = computed(() => {
    const titleRequiredAndEmpty =
      title.value === undefined ? false : !title.value
    return titleRequiredAndEmpty
  })

  const onSubmit = () => {
    emit("submit")
  }

  const onClose = () => {
    photosModel.value = []
    emit("close")
  }
</script>

<template>
  <form @submit.prevent class="form">
    <AppText v-if="error" variant="accent">{{ error }}</AppText>
    <label v-if="title !== undefined" class="field">
      <AppText size="s">Назва</AppText>
      <input v-model="title" type="text" placeholder="Назва" />
    </label>
    <label v-if="hasSlugField" class="field">
      <AppText size="s">Slug</AppText>
      <input v-model="slug" type="text" placeholder="slug" />
    </label>
    <div v-if="hasLikedField" class="checkbox-block">
      <input v-model="liked" type="checkbox" />
      <AppText>Позначити як улюблене</AppText>
    </div>
    <div v-if="hasHorizontalField" class="checkbox-block">
      <input v-model="horizontalPhoto" type="checkbox" />
      <AppText>Горизонтальне фото</AppText>
    </div>
    <div v-if="currentPhoto && !photosModel?.length" class="current">
      <AppText size="s">Поточне фото:</AppText>
      <AppPhoto class="preview" :src="currentPhoto" :alt="title" />
    </div>
    <FileDrop v-model="photosModel" />
    <div class="btns">
      <button class="secondary" @click="onClose">Скасувати</button>
      <div v-if="isLoading" class="loading-box">
        <AppLoader />
      </div>
      <button
        type="submit"
        class="primary"
        :disabled="notAvaliable || isLoading"
        @click="onSubmit"
      >
        Зберегти
      </button>
    </div>
  </form>
</template>

<style scoped>
  .form {
    display: grid;
    gap: 20px;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .loading-box {
    position: relative;
    max-width: 100px;
  }
  .checkbox-block {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .field {
    display: grid;
    gap: 4px;
  }
  .current {
    display: grid;
    gap: 6px;
  }
  .preview {
    max-width: 200px;
  }
</style>
