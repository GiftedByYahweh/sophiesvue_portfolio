<script setup>
  import { ref, computed, watch } from "vue"
  import { loginByUsername } from "@/services/account"
  import { useAuthStore } from "@/stores/auth"
  import { useQuery } from "@tanstack/vue-query"
  import { setToken } from "@/utils/localStorage"
  import AppText from "@/components/shared/AppText.vue"

  const emit = defineEmits({
    onClose: null,
  })

  const auth = useAuthStore()

  const username = ref("")
  const password = ref("")

  const notValid = computed(() => {
    return !username.value || !password.value
  })

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: () => loginByUsername(username.value, password.value),
    retry: false,
    enabled: !notValid,
  })

  const onLogin = async () => {
    await refetch()
  }

  const onClose = () => {
    emit("onClose")
  }

  watch(data, () => {
    auth.onLogin()
    setToken(data.value)
    onClose()
  })
</script>

<template>
  <form class="form" @submit.prevent>
    <AppText variant="accent">{{ error }}</AppText>
    <input v-model="username" type="text" placeholder="username" />
    <input v-model="password" type="password" placeholder="password" />
    <div class="btns">
      <button
        type="button"
        class="secondary"
        :disabled="isFetching"
        @click="onClose"
      >
        Close
      </button>
      <button
        type="submit"
        class="primary"
        :disabled="notValid || isFetching"
        @click="onLogin"
      >
        Login
      </button>
    </div>
  </form>
</template>

<style scoped>
  .form {
    display: grid;
    gap: 20px;
    place-items: center;
    width: 300px;
    max-width: 100%;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
</style>
