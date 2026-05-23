<script setup>
  import { computed, onMounted, ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import PriceForm from "./PriceForm.vue"
  import { editPrice } from "@/services/price"
  import { useTitles } from "@/composables/useTitles"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { useToast } from "@/composables/useToast"

  const emit = defineEmits({
    close: null,
  })
  const priceToEdit = defineModel("edit")

  const { getCategoryTitles } = useTitles()
  const portfolio = usePortfolio()
  const queryClient = useQueryClient()
  const toast = useToast()

  const newPrice = ref({
    ...priceToEdit.value,
  })

  const categoryId = computed(() => {
    const cat = portfolio.categories.find(
      (c) => (c.title ?? c.name) === newPrice.value.category,
    )
    return cat?.id ?? priceToEdit.value.categoryId
  })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () =>
      editPrice(priceToEdit.value.id, {
        categoryId: categoryId.value,
        price: newPrice.value.price,
        description: newPrice.value.description,
        importantInfo: newPrice.value.importantInfo,
        duration: newPrice.value.duration,
      }),
  })

  const savePrice = async () => {
    const result = await mutateAsync()
    if (result.ok) {
      toast.success(`Успішно змінено — ${newPrice.value.category}`)
      queryClient.invalidateQueries({ queryKey: ["price"] })
      emit("close")
    } else {
      toast.error(result.message ?? "Помилка")
    }
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
    v-model:description="newPrice.description"
    v-model:important-info="newPrice.importantInfo"
    v-model:duration="newPrice.duration"
    v-model:category="newPrice.category"
    :categories="portfolio.categoryTitles"
    @submit="savePrice"
    @close="$emit('close')"
  />
</template>

<style>
  .price-popup {
    width: 100%;
    max-width: 1100px;
  }
</style>
