<script setup>
  import { RoutePaths } from "@/router/routes"
  import { computed, ref } from "vue"
  import { useRoute } from "vue-router"
  import HeaderNav from "./HeaderNav.vue"
  import BurgerMenuBtn from "./BurgerMenuBtn.vue"
  import logoWhite from "@/assets/logoWhite.svg"
  import logoBlack from "@/assets/logoBlack.svg"

  const route = useRoute()

  const isBurgerOpen = ref(false)

  const textColor = computed(() => {
    return route.path === RoutePaths.main.path && !isBurgerOpen.value
      ? "primary"
      : "secondary"
  })
  const logoVariant = computed(() => {
    return route.path === RoutePaths.main.path && !isBurgerOpen.value
      ? logoWhite
      : logoBlack
  })

  const toggleBurgerMenu = () => {
    isBurgerOpen.value = !isBurgerOpen.value
  }

  const onRouteCLick = () => {
    console.log("dfdf")
    if (isBurgerOpen) isBurgerOpen.value = false
  }
</script>

<template>
  <header class="header blur" :class="{ burger: isBurgerOpen }">
    <div class="content">
      <RouterLink :to="RoutePaths.main.path">
        <img :src="logoVariant" alt="" />
      </RouterLink>
      <HeaderNav class="desctop" :text-color="textColor" />
      <BurgerMenuBtn
        class="btn"
        :is-open="isBurgerOpen"
        @click="toggleBurgerMenu"
      />
    </div>
    <HeaderNav
      v-if="isBurgerOpen"
      :text-color="textColor"
      @on-route-click="onRouteCLick"
    />
  </header>
</template>

<style scoped>
  .header {
    width: 100%;
    height: var(--header-height);
    padding: 45px;
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 1;
    transition:
      height 0.5s ease-in-out,
      background-color 0.5s ease-in-out;
    background-color: transparent;
    align-items: start;
    overflow: hidden;

    &.burger {
      height: 100vh;
      background-color: #f8f8f8cc;
      flex-direction: column;
      justify-content: start;
      gap: 60px;
    }
  }
  .content {
    width: 100%;
    max-width: var(--max-content-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .blur {
    backdrop-filter: blur(10px);
  }

  @media screen and (max-width: 800px) {
    .header {
      padding: 45px 20px;
    }
    .desctop {
      display: none;
    }
  }
</style>
