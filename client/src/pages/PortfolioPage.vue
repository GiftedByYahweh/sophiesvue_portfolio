<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import AppPage from "@/components/shared/AppPage.vue"
  import { AlbumList } from "@/components/features/portfolio"
  import CategoriesView from "@/components/views/CategoriesView.vue"
  import CollectionsView from "@/components/views/CollectionsView.vue"

  const route = useRoute()

  const category = computed(() => route.query.category)
  const collection = computed(() => route.query.collection)

  const portfolioList = {
    categories: CategoriesView,
    collections: CollectionsView,
    album: AlbumList,
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
