<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import AppPage from "@/components/shared/AppPage.vue"
  import CategoriesView from "@/components/views/CategoriesView.vue"
  import CollectionsView from "@/components/views/CollectionsView.vue"
  import AlbumView from "@/components/views/AlbumView.vue"

  const route = useRoute()

  const category = computed(() => route.query.category)
  const collection = computed(() => route.query.collection)

  const portfolioList = {
    categories: CategoriesView,
    collections: CollectionsView,
    album: AlbumView,
  }

  const key = computed(() => {
    if (category.value && collection.value) return "album"
    if (category.value) return "collections"
    return "categories"
  })
</script>

<template>
  <AppPage>
    <Transition name="fade" mode="out-in">
      <Component :is="portfolioList[key]" :key="key" />
    </Transition>
  </AppPage>
</template>
