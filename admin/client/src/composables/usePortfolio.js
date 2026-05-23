import { computed, reactive, ref } from "vue"

const categories = ref([])
const collections = ref([])

const getLabel = (item) => item.title ?? item.name
const getId = (item) => item.id

const categoryTitles = computed(() => categories.value.map(getLabel))

const collectionTitles = computed(() => collections.value.map(getLabel))

function currentCategoryId(slug) {
  const category = categories.value.find((item) => item.slug === slug)
  return category ? getId(category) : undefined
}

function currentCollectionId(slug) {
  const collection = collections.value.find((item) => item.slug === slug)
  return collection ? getId(collection) : undefined
}

function currentCategorySlug(name) {
  const category = categories.value.find((item) => getLabel(item) === name)
  return category?.slug
}

function setCategoryTitles(titles) {
  categories.value = titles ?? []
}

function setCollectionTitles(titles) {
  collections.value = titles ?? []
}

export function usePortfolio() {
  return reactive({
    categories,
    collections,
    categoryTitles,
    collectionTitles,
    currentCategoryId,
    currentCollectionId,
    currentCategorySlug,
    setCategoryTitles,
    setCollectionTitles,
  })
}
