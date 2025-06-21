<script setup>
  import { onMounted, ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import PriceForm from "./PriceForm.vue"
  import { editPrice } from "@/services/price"
  import { useTitles } from "@/composables/useTitles"
  import { usePortfolioStore } from "@/stores/portfolio"
  import { textLinesToArray, textCommaToLines } from "@/utils/normalizeTextData"

  const emit = defineEmits({
    close: null,
  })
  const isVisible = defineModel("visible")
  const priceToEdit = defineModel("edit")

  const { getCategoryTitles } = useTitles()
  const portfolio = usePortfolioStore()
  const queryClient = useQueryClient()

  const newPrice = ref({
    ...priceToEdit.value,
    photosModel: [priceToEdit.value.photo],
    description: textCommaToLines(priceToEdit.value.description),
    importantInfo: textCommaToLines(priceToEdit.value.importantInfo),
  })

  const onCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["price"] })
    isVisible.value = false
  }

  const generateObj = () => ({
    price: newPrice.value.price,
    category: newPrice.value.category,
    photo: [newPrice.value.photosModel],
    description: textLinesToArray(newPrice.value.description),
    importantInfo: textLinesToArray(newPrice.value.importantInfo),
  })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => editPrice(generateObj()),
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
    :is-loading="isPending"
    :error="error"
    type="edit"
    v-model:price="newPrice.price"
    v-model:photos="newPrice.photosModel"
    v-model:description="newPrice.description"
    v-model:important-info="newPrice.importantInfo"
    v-model:category="newPrice.category"
    :categories="portfolio.categoryTitles"
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
