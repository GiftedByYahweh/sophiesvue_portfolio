<script setup>
  import { useRoute } from "vue-router"
  import AppFooter from "@/components/views/AppFooter.vue"
  import AppHeader from "@/components/views/AppHeader.vue"

  const route = useRoute()
</script>

<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <Component :is="Component" :key="route.name" />
    </Transition>
  </RouterView>
  <AppFooter />
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
