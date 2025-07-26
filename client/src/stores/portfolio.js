import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const usePortfolioStore = defineStore("portfolio", () => {
  const categories = ref([])
  const collections = ref([])

  const categoryTitles = computed(() => {
    return categories.value.map((el) => el.title)
  })

  const collectionTitles = computed(() => {
    return collections.value.map((el) => el.title)
  })

  const currentCategoryId = (title) => {
    const category = categories.value.find((item) => {
      return item.title === title
    })
    return category?._id
  }

  const currentCollectionId = (title) => {
    const collection = collections.value.find((item) => {
      return item.title === title
    })
    return collection?._id
  }

  const setCategoryTitles = (titles) => {
    categories.value = titles
  }

  const setCollectionTitles = (titles) => {
    collections.value = titles
  }

  return {
    categoryTitles,
    collectionTitles,
    collections,
    setCategoryTitles,
    setCollectionTitles,
    currentCategoryId,
    currentCollectionId,
  }
})
