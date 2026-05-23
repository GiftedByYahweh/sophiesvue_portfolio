<script setup>
  import { computed, onMounted, ref } from "vue"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import PriceForm from "./PriceForm.vue"
  import { addPrice } from "@/services/price"
  import { useTitles } from "@/composables/useTitles"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { useToast } from "@/composables/useToast"

  const emit = defineEmits({
    close: null,
  })

  const { getCategoryTitles } = useTitles()
  const queryClient = useQueryClient()
  const portfolio = usePortfolio()
  const toast = useToast()

  const price = ref("")
  const description = ref("")
  const importantInfo = ref("")
  const category = ref("")
  const duration = ref("")

  const categoryId = computed(() => {
    const cat = portfolio.categories.find(
      (c) => (c.title ?? c.name) === category.value,
    )
    return cat?.id
  })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () =>
      addPrice({
        categoryId: categoryId.value,
        price: price.value,
        description: description.value,
        importantInfo: importantInfo.value,
        duration: duration.value,
      }),
  })

  const createPrice = async () => {
    if (!categoryId.value) {
      toast.error("Оберіть категорію")
      return
    }
    const result = await mutateAsync()
    if (result.ok) {
      toast.success("Успішно створено")
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
    v-model:price="price"
    v-model:description="description"
    v-model:important-info="importantInfo"
    v-model:duration="duration"
    v-model:category="category"
    type="add"
    :categories="portfolio.categoryTitles"
    :error="error"
    :is-loading="isPending"
    @submit="createPrice"
    @close="$emit('close')"
  />
</template>

<style>
  .price-popup {
    width: 100%;
    max-width: 1100px;
  }
</style>
