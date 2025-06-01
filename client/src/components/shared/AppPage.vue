<template>
  <main class="page">
    <slot></slot>
  </main>
</template>

<style scoped>
  .page {
    max-width: calc(var(--max-content-width) + 90px);
    padding: calc(var(--header-height) + 20px) 45px 45px 45px;
    margin: auto;
    display: grid;
    grid-template-rows: auto;
    min-height: 100vh;
  }

  @media screen and (max-width: 800px) {
    .page {
      padding: calc(var(--header-height) + 20px) 20px 45px 20px;
    }
  }
</style>
