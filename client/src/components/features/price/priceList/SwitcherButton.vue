<script setup>
  import { defineProps, defineEmits } from "vue"

  const props = defineProps({
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
    background: #e5e5e5;
    padding: 3px;
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
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    color: black;
  }
</style>
