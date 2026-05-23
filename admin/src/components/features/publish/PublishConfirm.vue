<script setup>
  import AppText from "@/components/shared/AppText.vue"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import { usePublish } from "@/composables/usePublish"
  import { useToast } from "@/composables/useToast"

  const emit = defineEmits({ close: null })
  const { isPublishing, publishPortfolio } = usePublish()
  const toast = useToast()

  const onConfirm = async () => {
    const result = await publishPortfolio()
    if (result.ok) {
      toast.success(result.message)
      emit("close")
    } else {
      toast.error(result.message)
    }
  }
</script>

<template>
  <div class="wrapper">
    <AppText class="description">
      Запустить новий білд публічного сайту з поточною версією контенту.
      Зміни зʼявляться на сайті за кілька хвилин після завершення білду.
    </AppText>
    <div class="btns">
      <button class="secondary" :disabled="isPublishing" @click="$emit('close')">
        Скасувати
      </button>
      <div v-if="isPublishing" class="loading-box">
        <AppLoader />
      </div>
      <button class="primary" :disabled="isPublishing" @click="onConfirm">
        Опублікувати
      </button>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    display: grid;
    gap: 16px;
    max-width: 420px;
  }
  .description {
    line-height: 1.4;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 12px;
    border-top: 1px solid var(--neutral-color);
  }
  .loading-box {
    position: relative;
    max-width: 80px;
  }
</style>
