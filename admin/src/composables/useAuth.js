import { ref } from "vue"
import { apiClient } from "@/api"

const isAuth = ref(false)
const hydrated = ref(false)

async function hydrateFromSession() {
  try {
    const result = await apiClient.account.session()
    isAuth.value = !!result?.ok
  } catch {
    isAuth.value = false
  } finally {
    hydrated.value = true
  }
}

async function ensureHydrated() {
  if (!hydrated.value) await hydrateFromSession()
}

function onLogin() {
  isAuth.value = true
  hydrated.value = true
}

async function onLogout() {
  try {
    await apiClient.account.logout()
  } catch {
    /* cookie may already be invalid */
  }
  isAuth.value = false
}

export function useAuth() {
  return {
    isAuth,
    hydrated,
    ensureHydrated,
    hydrateFromSession,
    onLogin,
    onLogout,
  }
}
