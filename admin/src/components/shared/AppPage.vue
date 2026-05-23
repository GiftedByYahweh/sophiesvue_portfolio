<template>
  <main class="page">
    <slot></slot>
  </main>
</template>

<style scoped>
  .page {
    max-width: calc(var(--max-content-width) + 90px);
    padding: 30px 45px 45px 45px;
    margin: auto;
    display: grid;
    grid-template-rows: auto;
  }
</style>
