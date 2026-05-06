<script setup>
  import { defineProps, defineEmits } from "vue"

  defineProps({
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(["update:modelValue"])

  function onSelect(option) {
    emit("update:modelValue", option)
  }
</script>

<template>
  <div class="toggle">
    <div
      v-for="option in options"
      :key="option"
      class="toggle-option"
      :class="{ active: option === modelValue }"
      @click="onSelect(option)"
    >
      {{ option }}
    </div>
  </div>
</template>

<style scoped>
  .toggle {
    display: flex;
    border: 1px solid var(--accent-color);
    width: fit-content;
    cursor: pointer;
    user-select: none;
  }

  .toggle-option {
    flex: 1;
    padding: 6px 14px;
    transition: all 0.3s ease;
    text-align: center;
    font-weight: 500;
    color: #555;
  }

  .toggle-option.active {
    background: var(--accent-color);
    color: var(--primary-color);
  }
</style>
