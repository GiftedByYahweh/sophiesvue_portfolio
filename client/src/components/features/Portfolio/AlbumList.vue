<script setup>
  import { useQuery } from "@tanstack/vue-query"
  import { fetchAlbum } from "@/services/album"
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import { useRoute } from "vue-router"
  import { computed, onMounted } from "vue"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import { useTitles } from "@/composables/useTitles"

  const { getCollections } = useTitles()
  const route = useRoute()

  const currentCollection = computed(() => {
    return route.query.collection
  })

  const { data, isLoading } = useQuery({
    queryKey: ["albumList", currentCollection.value],
    queryFn: () => fetchAlbum(currentCollection.value),
    retry: false,
  })

  onMounted(() => {
    getCollections()
  })
</script>

<template>
  <AppLoader v-if="isLoading" />
  <div v-else class="album">
    <AppPhoto
      v-for="album in data"
      class="photo"
      :key="album.id"
      :src="album.photo"
      :alt="album.title"
    />
  </div>
</template>

<style scoped>
  .album {
    column-width: 425px;
    column-gap: 16px;
    direction: rtl;
  }
  .photo {
    margin-bottom: 16px;
  }
</style>
