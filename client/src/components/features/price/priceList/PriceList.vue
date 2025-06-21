<script setup>
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
</script>

<template>
  <div class="list">
    <AppLoader v-if="isLoading" />
    <AppText v-if="error">{{ error }}</AppText>
    <PriceCard
      v-for="(price, index) in data"
      v-model:edit="priceToEdit"
      :key="price._id"
      :price="price"
      :reverse="index % 2 !== 0"
      :border="index !== data.length - 1"
      @edit-price="$emit('editPrice')"
    />
  </div>
</template>
