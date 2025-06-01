import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
  const isAuth = ref(null)

  const onLogin = () => {
    isAuth.value = true
  }

  const onLogout = () => {
    isAuth.value = false
  }

  return {
    isAuth,
    onLogin,
    onLogout,
  }
})
