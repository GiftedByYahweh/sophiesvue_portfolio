<script setup>
  import { computed } from "vue"
  import { useQuery } from "@tanstack/vue-query"
  import PriceCard from "./PriceCard.vue"
  import { fetchPrice } from "@/services/price"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import AppText from "@/components/shared/AppText.vue"

  defineEmits({
    editPrice: null,
  })
  const priceToEdit = defineModel("edit")

  const { data, isLoading, error } = useQuery({
    queryKey: ["price"],
    queryFn: fetchPrice,
    retry: false,
  })

  const groups = computed(() => {
    if (!data.value) return []
    const map = new Map()
    for (const price of data.value) {
      if (!map.has(price.categoryId)) map.set(price.categoryId, [])
      map.get(price.categoryId).push(price)
    }
    return [...map.values()]
  })
</script>

<template>
  <div class="list">
    <AppLoader v-if="isLoading" />
    <AppText v-if="error">{{ error }}</AppText>
    <PriceCard
      v-for="(variants, index) in groups"
      v-model:edit="priceToEdit"
      :key="variants[0].categoryId"
      :variants="variants"
      :reverse="index % 2 !== 0"
      :border="index !== groups.length - 1"
      @edit-price="$emit('editPrice')"
    />
  </div>
</template>
