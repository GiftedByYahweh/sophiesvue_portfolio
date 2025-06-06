import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const usePortfolioStore = defineStore("portfolio", () => {
  const categories = ref([])
  const collections = ref([])

  const categoryTitles = computed(() => {
    return categories.value.map((el) => el.title)
  })

  const currentCategoryId = (title) => {
    const category = categories.value.find((item) => {
      return item.title === title
    })
    return category._id
  }

  const setCategoryTitles = (titles) => {
    categories.value = titles
  }

  const setCollectionTitles = (titles) => {
    collections.value = titles
  }

  return {
    categoryTitles,
    collections,
    setCategoryTitles,
    setCollectionTitles,
    currentCategoryId,
  }
})
