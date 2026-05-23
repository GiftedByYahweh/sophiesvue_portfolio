<script setup>
  import { AuthForm } from "@/components/features/auth"
</script>

<template>
  <div class="auth-page">
    <AuthForm />
  </div>
</template>

<style scoped>
  .auth-page {
    width: 100%;
    display: grid;
    place-items: center;
  }
</style>
