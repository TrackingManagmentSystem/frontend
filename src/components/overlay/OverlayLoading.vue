<template>
  <div v-if="show" :class="['overlay', { 'fullscreen': fullscreen }]">
    <div class="backdrop"></div>
    <div class="overlay-content">
      <div class="loading-icon" v-if="show">
        <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>
      <slot />
    </div>
  </div>
  <slot v-else />
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

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.fullscreen {
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.overlay-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  position: absolute;
  z-index: 20;
}
</style>
