<template>
  <div :class="['overlay', { 'fullscreen': fullscreen }]">
    <slot />
    <div v-if="show" class="overlay__backdrop">
      <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = withDefaults(
  defineProps<{
    show: boolean;
    fullscreen?: boolean;
  }>(),
  {
    show: false,
    fullscreen: false,
  }
);
</script>

<style lang="less" scoped>
.overlay {
  position: relative;

  .fullscreen {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }

  &__backdrop {
    position: absolute;
    background-color: black;
    opacity: 0.3;
    inset: 0px;
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
