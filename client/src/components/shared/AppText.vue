<script setup>
  import { computed } from "vue"

  defineOptions({
    inheritAttrs: false,
  })

  const {
    element = "p",
    variant = "primary",
    size = "m",
    textStyle,
    weight,
    align,
    uppercase,
    hover,
  } = defineProps({
    element: String,
    variant: String,
    size: String,
    textStyle: String,
    weight: String,
    align: String,
    uppercase: Boolean,
    hover: Boolean,
  })

  const additionalClasses = computed(() => {
    return [
      `text-${size}`,
      `text-${variant}`,
      weight && `text-w-${weight}`,
      textStyle && `text-${textStyle}`,
      align && `text-${align}`,
      uppercase && "text-uppercase",
      hover && "text-hover",
    ]
      .filter(Boolean)
      .join(" ")
  })
</script>

<template>
  <component v-bind="$attrs" :is="element" :class="[additionalClasses]">
    <slot></slot>
  </component>
</template>

<style>
  .text-accent {
    color: var(--accent-color);
  }
  .text-primary {
    color: var(--primary-color);
  }
  .text-secondary {
    color: var(--secondary-color);
  }
  .text-m {
    font-size: 14px;
    line-height: 1.5;
  }
  .text-title {
    font-family: "Inter", sans-serif;
    font-size: 70px;
    line-height: 1.5;
  }
  .text-w-400 {
    font-weight: 400;
  }
  .text-w-500 {
    font-weight: 500;
  }
  .text-w-600 {
    font-weight: 600;
  }
  .text-italic {
    font-style: italic;
  }
  .text-uppercase {
    text-transform: uppercase;
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: var(--accent-color);
    }
  }
</style>
