<script setup>
  import { computed } from "vue"
  import { FileDrop } from "@/components/widgets"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import AppText from "@/components/shared/AppText.vue"

  const emit = defineEmits({
    submit: null,
    close: null,
  })

  const { isLoading, error, multiple } = defineProps({
    isLoading: Boolean,
    error: Error,
    multiple: Boolean,
  })

  const title = defineModel("title")
  const liked = defineModel("liked")
  const horizontalPhoto = defineModel("horizontal")
  const photosModel = defineModel("photos")

  const notAvaliable = computed(() => {
    const titleRequiredAndEmpty =
      title.value === undefined ? false : !title.value
    return titleRequiredAndEmpty || !photosModel.value.length
  })

  const hasLikedField = computed(() => {
    return liked.value !== undefined
  })

  const hasHorizontalField = computed(() => {
    return horizontalPhoto.value !== undefined
  })

  const onSubmit = () => {
    emit("submit")
  }

  const onClose = () => {
    title.value = ""
    photosModel.value = []
    emit("close")
  }
</script>

<template>
  <form @submit.prevent class="form">
    <AppText variant="accent">{{ error }}</AppText>
    <input
      v-if="title !== undefined"
      v-model="title"
      type="text"
      placeholder="add title"
    />
    <div v-if="hasLikedField" class="checkbox-block">
      <input v-model="liked" type="checkbox" />
      <AppText>Mark as liked</AppText>
    </div>
    <div v-if="hasHorizontalField" class="checkbox-block">
      <input v-model="horizontalPhoto" type="checkbox" />
      <AppText>Mark as horizontal photo</AppText>
    </div>
    <FileDrop v-model="photosModel" :multiple="multiple" />
    <div class="btns">
      <button class="secondary" @click="onClose">Close</button>
      <div v-if="isLoading" class="loading-box">
        <AppLoader />
      </div>
      <button
        type="submit"
        class="primary"
        :disabled="notAvaliable || isLoading"
        @click="onSubmit"
      >
        Create
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
</style>
