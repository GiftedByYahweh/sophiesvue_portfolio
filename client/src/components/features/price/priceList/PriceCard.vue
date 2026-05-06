<script setup>
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import { RoutePaths } from "@/router/routes"
  import { computed, ref } from "vue"
  import { useRouter } from "vue-router"
  import SwitcherButton from "./SwitcherButton.vue"

  const SWITCHER_VARIANTS = {
    ONE: "1 год",
    TWO: "2 год",
  }

  const { price, reverse, border } = defineProps({
    price: Object,
    reverse: Boolean,
    border: Boolean,
  })

  const router = useRouter()

  const state = ref(SWITCHER_VARIANTS.ONE)

  const isSwitcherVisible = computed(() => {
    return price.category.toLowerCase() === "personal"
  })

  const moveToCategory = () => {
    router.push({
      path: RoutePaths.portfolio.path,
      query: { category: price.category },
    })
  }

  const normalizedDescription = computed(() => {
    if (isSwitcherVisible.value && state.value === SWITCHER_VARIANTS.TWO) {
      return price.description2.split("\n")
    }
    return price.description.split("\n")
  })

  const normalizedInfo = computed(() => {
    if (isSwitcherVisible.value && state.value === SWITCHER_VARIANTS.TWO) {
      return price.importantInfo2.split("\n")
    }
    return price.importantInfo.split("\n")
  })
</script>

<template>
  <div class="card" :class="{ reverse: reverse, border: border }">
    <AppPhoto class="photo" :src="price.photo" :alt="price.category" />
    <div class="content">
      <div class="info">
        <div class="header">
          <AppText size="l" uppercase>{{ price.category }}</AppText>
          <SwitcherButton
            v-if="isSwitcherVisible"
            class="desctop"
            v-model="state"
            :options="[SWITCHER_VARIANTS.ONE, SWITCHER_VARIANTS.TWO]"
          />
          <AppText>{{ price.price }} грн/год</AppText>
        </div>
        <SwitcherButton
          v-if="isSwitcherVisible"
          class="mobile"
          v-model="state"
          :options="[SWITCHER_VARIANTS.ONE, SWITCHER_VARIANTS.TWO]"
        />
        <div class="details">
          <AppText v-for="text in normalizedDescription" :key="text">
            ◦ {{ text }}
          </AppText>
        </div>
        <div class="conditions">
          <AppText uppercase>Важливо</AppText>
          <br />
          <AppText v-for="text in normalizedInfo" :key="text">◦ {{ text }}</AppText>
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
    max-height: 690px;
    grid-area: photo;
  }
  .content {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-area: content;
    gap: 30px;
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
    gap: 20px;
  }
  .mobile {
    display: none;
  }
  @media screen and (max-width: 768px) {
    .card {
      grid-template-columns: none;
      grid-template-areas:
        "photo"
        "content";
    }
    .desctop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }
  }
</style>
