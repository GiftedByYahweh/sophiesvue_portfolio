<script setup>
  import { ref, computed } from "vue"
  import { useRouter } from "vue-router"
  import { loginByUsername } from "@/services/account"
  import { useAuth } from "@/composables/useAuth"
  import { useMutation } from "@tanstack/vue-query"
  import AppText from "@/components/shared/AppText.vue"
  import { RoutePaths } from "@/router/routes"

  const router = useRouter()

  const emit = defineEmits({
    onClose: null,
  })

  const auth = useAuth()

  const username = ref("")
  const password = ref("")

  const notValid = computed(() => {
    return !username.value || !password.value
  })

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => loginByUsername(username.value, password.value),
  })

  const onSubmit = async () => {
    try {
      await mutateAsync()
      auth.onLogin()
      emit("onClose")
      await router.replace({ name: RoutePaths.portfolio.name })
    } catch {
      /* mutation exposes error ref */
    }
  }

  const onClose = () => {
    emit("onClose")
  }
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div>
      <AppText variant="secondary" size="m" align="center"> LOGIN </AppText>
      <AppText variant="accent">{{ error?.message }}</AppText>
    </div>

    <input v-model="username" type="text" placeholder="username" />
    <input v-model="password" type="password" placeholder="password" />
    <div class="btns">
      <button
        type="button"
        class="secondary"
        :disabled="isPending"
        @click="onClose"
      >
        Close
      </button>
      <button type="submit" class="primary" :disabled="notValid || isPending">
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
    padding: 15px;
    border: 1px solid var(--secondary-color);
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
</style>
