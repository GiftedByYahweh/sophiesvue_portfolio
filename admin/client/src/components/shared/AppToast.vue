<script setup>
  import { useToast } from "@/composables/useToast"
  import AppText from "./AppText.vue"

  const toast = useToast()
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="toast.visible.value"
        class="toast"
        :class="toast.type.value"
        @click="toast.hide()"
      >
        <span class="icon">{{ toast.type.value === 'success' ? '✓' : '✕' }}</span>
        <AppText>{{ toast.message.value }}</AppText>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .toast {
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 200;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 20px;
    border-radius: 2px;
    cursor: pointer;
    min-width: 240px;
    max-width: 400px;
    background-color: var(--primary-color);
  }

  .toast.success {
    border: 1.5px solid var(--secondary-color);
  }

  .toast.success .icon {
    color: var(--secondary-color);
  }

  .toast.error {
    border: 1.5px solid var(--accent-color);
  }

  .toast.error .icon {
    color: var(--accent-color);
  }

  .icon {
    font-size: 24px;
    line-height: 1;
    flex-shrink: 0;
  }

  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.25s ease;
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
