<script setup>
  import { computed } from "vue"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import AppText from "@/components/shared/AppText.vue"

  const emit = defineEmits({
    submit: null,
    close: null,
  })

  const { isLoading, error, categories, type } = defineProps({
    isLoading: Boolean,
    error: Error,
    categories: Array,
    type: "add" | "edit",
  })

  const price = defineModel("price")
  const description = defineModel("description")
  const importantInfo = defineModel("importantInfo")
  const duration = defineModel("duration")
  const category = defineModel("category")

  const buttonTitle = computed(() => {
    return type === "edit" ? "Edit" : "Create"
  })

  const notAvaliable = computed(() => {
    return (
      !price.value ||
      !category.value ||
      !duration.value ||
      !description.value ||
      !importantInfo.value
    )
  })

  const onSubmit = () => {
    emit("submit")
  }

  const onClose = () => {
    emit("close")
  }
</script>

<template>
  <form @submit.prevent class="form">
    <AppText variant="accent">{{ error }}</AppText>
    <div class="container">
      <div class="right">
        <select v-model="category">
          <option disabled value="">Category...</option>
          <option v-for="title in categories">
            {{ title }}
          </option>
        </select>
        <input
          v-model="price"
          type="number"
          max="10000"
          placeholder="price (uah)"
        />
        <input v-model="duration" type="text" placeholder="1 година" />
      </div>
      <div class="textarea-wrapper">
        <textarea v-model="description" type="text" placeholder="description" />
        <textarea
          v-model="importantInfo"
          type="text"
          placeholder="important info"
        />
      </div>
    </div>
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
        {{ buttonTitle }}
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
  .container {
    display: grid;
    grid-template-columns: minmax(100px, 300px) 1fr;
    gap: 20px;
  }
  .textarea-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .right {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
