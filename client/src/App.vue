<script setup>
  import { useRoute } from "vue-router"
  import AppFooter from "@/components/views/AppFooter.vue"
  import { getToken } from "./utils/localStorage"
  import { useAuthStore } from "./stores/auth"
  import AppHeader from "@/components/views/header/AppHeader.vue"

  const route = useRoute()
  const auth = useAuthStore()
  const authToken = getToken()

  if (authToken) {
    auth.onLogin()
  }
</script>

<template>
  <AppHeader />
  <div class="sophievue-content">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" :key="route.name" />
      </Transition>
    </RouterView>
  </div>
  <AppFooter />
</template>

<style>
  .sophievue-content {
    min-height: 100vh;
  }
</style>
