<script setup>
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import { RoutePaths } from "@/router/routes"
  import { useAuthStore } from "@/stores/auth"
  import { computed } from "vue"
  import { useRouter } from "vue-router"

  const emit = defineEmits({
    editPrice: null,
  })
  const priceToEdit = defineModel("edit")

  const { price, reverse, border } = defineProps({
    price: Object,
    reverse: Boolean,
    border: Boolean,
  })

  const router = useRouter()
  const auth = useAuthStore()

  const moveToCategory = () => {
    router.push({
      path: RoutePaths.portfolio.path,
      query: { category: price.category },
    })
  }

  const normalizedDescription = computed(() => {
    return price.description.split(",")
  })

  const normalizedInfo = computed(() => {
    return price.importantInfo.split(",")
  })

  const onEdit = (dataToEdit) => {
    priceToEdit.value = dataToEdit
    emit("editPrice")
  }
</script>

<template>
  <div class="card" :class="{ reverse: reverse, border: border }">
    <AppPhoto class="photo" :src="price.photo" :alt="price.category" />
    <div class="content">
      <div class="info">
        <div class="header">
          <AppText size="l">{{ price.category }}</AppText>
          <div class="wrapper">
            <AppText>{{ price.price }} uah</AppText>
            <button v-if="auth.isAuth" class="secondary" @click="onEdit(price)">
              Edit {{ price.category }}
            </button>
          </div>
        </div>
        <div class="details">
          <AppText v-for="text in normalizedDescription">
            ◦ {{ text }}
          </AppText>
        </div>
        <div class="conditions">
          <AppText uppercase>Важливо</AppText>
          <br />
          <AppText v-for="text in normalizedInfo">◦ {{ text }}</AppText>
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
  .wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media screen and (max-width: 768px) {
    .card {
      grid-template-columns: none;
      grid-template-areas:
        "photo"
        "content";
    }
  }
</style>
