<script setup>
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import { RoutePaths } from "@/router/routes"
  import { computed } from "vue"
  import { useRouter } from "vue-router"

  const { price, reverse, border } = defineProps({
    price: Object,
    reverse: Boolean,
    border: Boolean,
  })

  const router = useRouter()

  const photoUrl = computed(() => {
    return `${import.meta.env.VITE_API_URL}/${price.photo}`
  })

  const moveToCategory = () => {
    router.push({
      path: RoutePaths.portfolio.path,
      query: { category: price.category },
    })
  }
</script>

<template>
  <div class="card" :class="{ reverse: reverse, border: border }">
    <AppPhoto class="photo" :src="photoUrl" :alt="price.category" />
    <div class="content">
      <div class="info">
        <div class="header">
          <AppText size="l">{{ price.category }}</AppText>
          <AppText>{{ price.price }} uah</AppText>
        </div>
        <div class="details">
          <AppText v-for="text in price.description">◦ {{ text }}</AppText>
        </div>
        <div class="conditions">
          <AppText>Важливо</AppText>
          <AppText v-for="text in price.importantInfo">◦ {{ text }}</AppText>
        </div>
      </div>
      <AppText hover @click="moveToCategory">view examples →</AppText>
    </div>
  </div>
</template>

<style scoped>
  .card {
    display: grid;
    grid-template-columns: minmax(0, 625px) 1fr;
    grid-template-areas: "photo content";
    width: 100%;
    gap: 30px;
    padding: 50px 0;
  }
  .photo {
    grid-area: photo;
  }
  .content {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-area: content;
    gap: 60px;
  }
  .reverse {
    grid-template-columns: 1fr minmax(0, 625px);
    grid-template-areas: "content photo";
  }
  .border {
    border-bottom: 1px solid var(--neutral-color);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .info {
    display: grid;
    grid-auto-rows: max-content;
    gap: 40px;
  }
</style>
