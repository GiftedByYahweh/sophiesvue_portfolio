import { ref } from "vue"

const isPublishing = ref(false)

export function usePublish() {
  async function publishPortfolio() {
    const url = import.meta.env.VITE_PORTFOLIO_DEPLOY_HOOK_URL
    if (!url) {
      return { ok: false, message: "Deploy hook URL не налаштовано" }
    }
    isPublishing.value = true
    try {
      const res = await fetch(url, { method: "POST" })
      return res.ok
        ? { ok: true, message: "Білд запущено" }
        : { ok: false, message: `Помилка ${res.status}` }
    } catch {
      return { ok: false, message: "Помилка мережі" }
    } finally {
      isPublishing.value = false
    }
  }

  return { isPublishing, publishPortfolio }
}
