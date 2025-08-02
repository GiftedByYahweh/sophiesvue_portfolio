<script setup>
  import { RoutePaths } from "@/router/routes"
  import { computed } from "vue"
  import { useRoute } from "vue-router"

  defineEmits({
    click: null,
  })
  const { isOpen } = defineProps({
    isOpen: Boolean,
  })

  const route = useRoute()

  const isDark = computed(() => route.path !== RoutePaths.main.path)
</script>

<template>
  <div
    class="burger-menu__btn"
    :class="{ open: isOpen, dark: isDark }"
    @click="$emit('click')"
  >
    <div class="line line-1"></div>
    <div class="line line-2"></div>
    <div class="line line-3"></div>
  </div>
</template>

<style scoped>
  .burger-menu__content {
    position: fixed;
    display: grid;
    height: calc(100vh - var(--header-height));
    width: 100%;
    backdrop-filter: blur(10px);
    z-index: 100;
    top: var(--header-height);
    right: 0;
  }
  .burger-menu__btn {
    width: 30px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    z-index: 100;
  }
  .open .line,
  .dark .line {
    background-color: var(--secondary-color);
  }
  .line {
    width: 100%;
    height: 1.5px;
    background-color: var(--primary-color);
    transition: all 0.3s ease-in-out;
  }
  .burger-menu__btn.open .line-1 {
    transform: translateY(11.25px) rotate(45deg);
  }
  .burger-menu__btn.open .line-2 {
    opacity: 0;
  }
  .burger-menu__btn.open .line-3 {
    transform: translateY(-11.25px) rotate(-45deg);
  }

  @media screen and (min-width: 768px) {
    .burger-menu__btn {
      display: none;
    }
    .burger-menu__content {
      height: calc(100vh - var(--mobile-header-height));
      top: var(--mobile-header-height);
    }
  }
</style>
