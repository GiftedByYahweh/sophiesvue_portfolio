<script setup></script>

<template>
  <div className="loader">
    <div className="justify-content-center jimu-primary-loading"></div>
  </div>
</template>

<style>
  .loader {
    position: relative;
  }
  .jimu-primary-loading::before,
  .jimu-primary-loading::after {
    position: absolute;
    top: 0;
    content: "";
  }
  .jimu-primary-loading::before {
    left: -19.992px;
  }
  .jimu-primary-loading::after {
    left: 19.992px;
    animation-delay: 0.32s !important;
    animation-delay: 0.32s !important;
  }
  .jimu-primary-loading::before,
  .jimu-primary-loading::after,
  .jimu-primary-loading {
    background: var(--accent-color);
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    width: 13.6px;
    height: 32px;
  }
  .jimu-primary-loading {
    text-indent: -9999em;
    margin: auto;
    position: absolute;
    right: calc(50% - 6.8px);
    top: calc(50% - 16px);
    animation-delay: 0.16s !important;
    animation-delay: 0.16s !important;
  }
  @keyframes loading-keys-app-loading {
    0%,
    80%,
    100% {
      opacity: 0.75;
      box-shadow: 0 0 var(--accent-color);
      height: 32px;
    }

    40% {
      opacity: 1;
      box-shadow: 0 -8px var(--accent-color);
      height: 40px;
    }
  }
  @keyframes loading-keys-app-loading {
    0%,
    80%,
    100% {
      opacity: 0.75;
      box-shadow: 0 0 var(--accent-color);
      height: 32px;
    }

    40% {
      opacity: 1;
      box-shadow: 0 -8px var(--accent-color);
      height: 40px;
    }
  }
</style>
