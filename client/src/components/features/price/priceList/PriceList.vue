<script setup>
  import { useQuery } from "@tanstack/vue-query"
  import PriceCard from "./PriceCard.vue"
  import { fetchPrice } from "@/services/price"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import AppText from "@/components/shared/AppText.vue"

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
      :key="price._id"
      :price="price"
      :reverse="index % 2 !== 0"
      :border="index !== data.length - 1"
    />
  </div>
</template>

<style scoped></style>
