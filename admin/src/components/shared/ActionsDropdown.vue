<script setup>
  import { ref, useTemplateRef, onBeforeUnmount, watch } from "vue"
  import { MoreVertical } from "@lucide/vue"

  defineProps({
    items: { type: Array, required: true },
  })

  const isOpen = ref(false)
  const rootRef = useTemplateRef("rootRef")

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const onSelect = (item) => {
    close()
    item.onSelect?.()
  }

  const onDocumentClick = (event) => {
    if (!rootRef.value) return
    if (!rootRef.value.contains(event.target)) close()
  }

  const onKeydown = (event) => {
    if (event.key === "Escape") close()
  }

  watch(isOpen, (open) => {
    if (open) {
      document.addEventListener("mousedown", onDocumentClick)
      document.addEventListener("keydown", onKeydown)
    } else {
      document.removeEventListener("mousedown", onDocumentClick)
      document.removeEventListener("keydown", onKeydown)
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener("mousedown", onDocumentClick)
    document.removeEventListener("keydown", onKeydown)
  })
</script>

<template>
  <div ref="rootRef" class="actions">
    <button
      type="button"
      class="trigger"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click.stop="toggle"
    >
      <MoreVertical :size="18" />
    </button>
    <Transition name="fade">
      <ul v-if="isOpen" class="menu" role="menu">
        <li
          v-for="item in items"
          :key="item.label"
          role="menuitem"
          class="item"
          :class="{ danger: item.variant === 'danger' }"
          @click.stop="onSelect(item)"
        >
          <component :is="item.icon" :size="16" class="icon" />
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
  .actions {
    position: relative;
    display: inline-block;
  }
  .trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.85);
    color: #333;
    cursor: pointer;
  }
  .trigger:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  .menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 180px;
    margin: 0;
    padding: 6px 0;
    list-style: none;
    background-color: var(--primary-color, #fff);
    border: 1px solid var(--neutral-color, #e5e5e5);
    border-radius: 4px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    z-index: 10;
  }
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    font-size: 14px;
    color: #1a1a1a;
    cursor: pointer;
    user-select: none;
  }
  .item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .item.danger {
    color: var(--accent-color, #c0392b);
  }
  .icon {
    flex-shrink: 0;
  }
</style>
