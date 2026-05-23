<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import AuthLayout from "@/layouts/AuthLayout.vue"
  import MainLayout from "@/layouts/MainLayout.vue"
  import AppToast from "@/components/shared/AppToast.vue"

  const route = useRoute()

  const layoutComponent = computed(() => {
    return route.meta.layout === "AuthLayout" ? AuthLayout : MainLayout
  })
</script>

<template>
  <component :is="layoutComponent">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="route.name" />
      </Transition>
    </RouterView>
  </component>
  <AppToast />
</template>
