<script setup>
  import { RoutePaths } from "@/router/routes"
  import AppText from "@/components/shared/AppText.vue"
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <RouterLink :to="RoutePaths.main.path">
        <img src="../../assets/logoWhite.svg" />
      </RouterLink>

      <nav class="nav-block">
        <ul class="nav-list">
          <li>
            <AppText :to="RoutePaths.portfolio.path" element="RouterLink" hover>
              PORTFOLIO
            </AppText>
          </li>
          <li>
            <AppText :to="RoutePaths.about.path" element="RouterLink" hover>
              ABOUT ME
            </AppText>
          </li>
          <li>
            <AppText :to="RoutePaths.price.path" element="RouterLink" hover>
              PRICE
            </AppText>
          </li>
        </ul>
        <AppText
          element="a"
          href="https://www.instagram.com/sophiesvue"
          target="_blank"
          hover
        >
          inst →
        </AppText>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    background-color: var(--secondary-color);
    padding: 45px;
    display: flex;
    justify-content: center;
  }
  .footer-content {
    width: 100%;
    max-width: var(--max-content-width);
    display: flex;
    justify-content: space-between;
  }
  .nav-block {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 250px;
  }
  .nav-list {
    display: grid;
    gap: 15px;
    list-style: none;
  }
</style>
