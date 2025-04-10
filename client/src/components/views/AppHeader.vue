<script setup lang="ts">
  import { RoutePaths } from "@/router/routes"
</script>

<template>
  <header class="header">
    <div class="content">
      <img src="../../assets/logoBlack.svg" alt="logo" />
      <nav>
        <RouterLink :to="RoutePaths.portfolio.path">PORTFOLIO</RouterLink>
        <RouterLink :to="RoutePaths.about.path">ABOUT ME</RouterLink>
        <RouterLink :to="RoutePaths.price.path">PRICE</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .header {
    height: var(--header-height);
    display: grid;
    place-items: center;
  }

  .content {
    max-width: 1325px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
