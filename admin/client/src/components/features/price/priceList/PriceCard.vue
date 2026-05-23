<script setup>
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import { RoutePaths } from "@/router/routes"
  import { useAuth } from "@/composables/useAuth"
  import { usePortfolio } from "@/composables/usePortfolio"
  import { ref, computed } from "vue"
  import { useRouter } from "vue-router"

  const emit = defineEmits({
    editPrice: null,
  })
  const priceToEdit = defineModel("edit")

  const { variants, reverse, border } = defineProps({
    variants: Array,
    reverse: Boolean,
    border: Boolean,
  })

  const router = useRouter()
  const auth = useAuth()
  const portfolio = usePortfolio()

  const activeIdx = ref(0)
  const current = computed(() => variants[activeIdx.value])

  const moveToCategory = () => {
    const slug = portfolio.currentCategorySlug(current.value.category)
    if (!slug) return
    router.push({
      name: RoutePaths.collections.name,
      params: { category: slug },
    })
  }

  const onEdit = () => {
    priceToEdit.value = current.value
    emit("editPrice")
  }
</script>

<template>
  <div class="card" :class="{ reverse: reverse, border: border }">
    <AppPhoto class="photo" :src="current.photoLink" :alt="current.category" />
    <div class="content">
      <div class="info">
        <div class="header">
          <AppText size="l" uppercase>{{ current.category }}</AppText>
          <div v-if="variants.length > 1" class="tabs">
            <button
              v-for="(v, i) in variants"
              :key="v.id"
              class="tab"
              :class="{ active: i === activeIdx }"
              @click="activeIdx = i"
            >
              {{ v.duration }}
            </button>
          </div>
          <div class="wrapper">
            <AppText>{{ current.price }} грн</AppText>
            <button v-if="auth.isAuth" class="secondary" @click="onEdit">
              Edit {{ current.category }}
            </button>
          </div>
        </div>
        <div class="details">
          <AppText v-for="text in current.description.split('\n')">
            ◦ {{ text }}
          </AppText>
        </div>
        <div class="conditions">
          <AppText uppercase>Важливо</AppText>
          <br />
          <AppText v-for="text in current.importantInfo.split('\n')"
            >◦ {{ text }}</AppText
          >
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
    aspect-ratio: 1 / 1;
    width: 100%;
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
  .wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tabs {
    display: flex;
    border: 1px solid var(--accent-color);
  }
  .tab {
    padding: 8px 18px;
    background: transparent;
    color: var(--secondary-color);
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
  }
  .tab.active {
    background: var(--accent-color);
    color: var(--primary-color);
  }
  @media screen and (max-width: 768px) {
    .card {
      grid-template-columns: none;
      grid-template-areas:
        "photo"
        "content";
    }
    .header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
    }
    .header .tabs {
      grid-row: 2;
      grid-column: 1 / -1;
      width: 100%;
    }
    .header .tab {
      flex: 1;
    }
  }
</style>
