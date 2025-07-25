<script setup>
  import { onMounted, ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import PriceForm from "./PriceForm.vue"
  import { addPrice } from "@/services/price"
  import { useTitles } from "@/composables/useTitles"
  import { usePortfolioStore } from "@/stores/portfolio"
  import { textLinesToArray } from "@/utils/normalizeTextData"

  const emit = defineEmits({
    close: null,
  })

  const { getCategoryTitles } = useTitles()
  const queryClient = useQueryClient()
  const portfolio = usePortfolioStore()

  const price = ref("")
  const description = ref("")
  const importantInfo = ref("")
  const category = ref("")
  const photosModel = ref([])

  const onCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["price"] })
    emit("close")
  }

  const generateObj = () => ({
    price: price.value,
    category: category.value,
    photo: photosModel.value[0],
    description: textLinesToArray(description.value),
    importantInfo: textLinesToArray(importantInfo.value),
  })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => addPrice(generateObj()),
    onSuccess: onCreateSuccess,
  })

  const createPrice = async () => {
    try {
      await mutateAsync()
    } catch (e) {
      console.log()
    }
  }

  const onClose = () => {
    emit("close")
  }

  onMounted(async () => {
    await getCategoryTitles()
  })
</script>

<template>
  <PriceForm
    :error="error"
    :is-loading="isPending"
    type="add"
    v-model:price="price"
    v-model:photos="photosModel"
    v-model:description="description"
    v-model:important-info="importantInfo"
    :categories="portfolio.categoryTitles"
    v-model:category="category"
    @submit="createPrice"
    @close="onClose"
  />
</template>

<style>
  .price-popup {
    width: 100%;
    max-width: 1100px;
  }
</style>
