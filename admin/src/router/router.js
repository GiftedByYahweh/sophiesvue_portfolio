import { createWebHistory, createRouter } from "vue-router"
import { RoutePaths, routes } from "./routes"
import { useAuth } from "@/composables/useAuth"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuth()
  await auth.ensureHydrated()

  if (to.meta.requiresAuth && !auth.isAuth.value) {
    next({ name: RoutePaths.auth.name })
    return
  }

  if (to.name === RoutePaths.auth.name && auth.isAuth.value) {
    next({ name: RoutePaths.portfolio.name })
    return
  }

  next()
})

export default router
