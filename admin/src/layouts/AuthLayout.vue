<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style scoped>
  .auth-layout {
    display: grid;
    min-height: 100vh;
    width: 100%;
    place-items: center;
  }
</style>
