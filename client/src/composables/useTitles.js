import { fetchCategoryTitles } from "@/services/categories"
import { fetchCollectionTitles } from "@/services/collections"
import { usePortfolioStore } from "@/stores/portfolio"
import { useQuery } from "@tanstack/vue-query"
import { watch } from "vue"

export const useTitles = () => {
  const portfolio = usePortfolioStore()

  const { data: categoryTitles, refetch: refetchCategories } = useQuery({
    queryKey: ["categoryTitles"],
    queryFn: fetchCategoryTitles,
    retry: false,
    enabled: false,
  })

  const { data: collectionTitles, refetch: refetchCollection } = useQuery({
    queryKey: ["collectionTitles"],
    queryFn: () => fetchCollectionTitles(category),
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

  const getCollectionTitles = async () => {
    await refetchCollection()
  }

  return {
    getCategoryTitles,
    getCollectionTitles,
  }
}
