<script setup>
  import AppText from "@/components/shared/AppText.vue"
  import { RoutePaths } from "@/router/routes"
  import { INSTAGRAM_URL } from "@/utils/consts"
  import logoWhite from "@/assets/logoWhite.svg"
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div>
        <img :src="logoWhite" />
      </div>
      <nav class="nav-block">
        <ul class="nav-list">
          <li>
            <AppText
              :to="RoutePaths.portfolio.path"
              element="RouterLink"
              variant="primary"
              hover
            >
              PORTFOLIO
            </AppText>
          </li>
          <li>
            <AppText
              :to="RoutePaths.about.path"
              element="RouterLink"
              variant="primary"
              hover
            >
              ABOUT ME
            </AppText>
          </li>
          <li>
            <AppText
              :to="RoutePaths.price.path"
              element="RouterLink"
              variant="primary"
              hover
            >
              PRICE
            </AppText>
          </li>
        </ul>
        <AppText
          element="a"
          :href="INSTAGRAM_URL"
          target="_blank"
          variant="primary"
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
    gap: 40px;
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

  @media screen and (max-width: 800px) {
    .footer {
      padding: 45px 20px;
    }
    .footer-content {
      flex-direction: column;
      align-items: start;
    }
    .nav-block {
      max-width: initial;
    }
  }
</style>
