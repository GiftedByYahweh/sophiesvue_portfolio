import { fetchCategoryTitles } from "@/services/categories"
import { fetchCollectionTitles } from "@/services/collections"
import { usePortfolioStore } from "@/stores/portfolio"
import { useQuery } from "@tanstack/vue-query"
import { watch } from "vue"
import { useRoute } from "vue-router"

export const useTitles = () => {
  const portfolio = usePortfolioStore()
  const route = useRoute()

  const { data: categoryTitles, refetch: refetchCategories } = useQuery({
    queryKey: ["categoryTitles"],
    queryFn: fetchCategoryTitles,
    retry: false,
    enabled: false,
  })

  const { data: collectionTitles, refetch: refetchCollections } = useQuery({
    queryKey: ["collectionTitles"],
    queryFn: () => fetchCollectionTitles(route.query.category),
    retry: false,
    enabled: false,
  })

  watch(categoryTitles, (value) => {
    portfolio.setCategoryTitles(value)
  })

  watch(collectionTitles, (value) => {
    portfolio.setCollectionTitles(value)
  })

  const getCategoryTitles = async () => {
    await refetchCategories()
  }

  const getCollectionTitles = async (category) => {
    await refetchCollections(category)
  }

  return {
    getCategoryTitles,
    getCollectionTitles,
  }
}
