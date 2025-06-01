<script setup>
  import { onMounted, ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import PriceForm from "./PriceForm.vue"
  import { splitText } from "@/utils/textarea"
  import { addPrice } from "@/services/price"
  import { useTitles } from "@/composables/useTitles"
  import { usePortfolioStore } from "@/stores/portfolio"

  const emit = defineEmits({
    close: null,
  })

  const { getCategoryTitles } = useTitles()
  const queryClient = useQueryClient()
  const portfolio = usePortfolioStore()

  const isVisible = defineModel("visible")
  const price = ref("")
  const description = ref("")
  const importantInfo = ref("")
  const category = ref("")
  const photosModel = ref([])

  const onCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["price"] })
    isVisible.value = false
  }

  const generateObj = () => ({
    price: price.value,
    category: category.value,
    photo: photosModel.value[0],
    description: splitText(description.value),
    importantInfo: splitText(importantInfo.value),
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
    v-model:price="price"
    v-model:photosModel="photosModel"
    v-model:description="description"
    v-model:important-info="importantInfo"
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
