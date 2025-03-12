<template>
  <div class="min-h-screen xl:flex">
    <app-sidebar />
    <Backdrop />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
      <app-header />
      <div
        class="p-4 mx-auto md:p-6"
        :class="[isExpanded || isHovered ? 'lg:max-w-[100vw-290px]' : 'lg:max-w-[100vw-90px]']"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useSidebar } from '@/composables/useSidebar'
import Backdrop from './Backdrop.vue'
const { isExpanded, isHovered } = useSidebar()
</script>

<style lang="scss" scoped>
@reference "tailwindcss";

.lg\:max-w-\[100vw-290px\] {
  max-width: calc(100vw - 290px);
}
.lg\:max-w-\[100vw-90px\] {
  max-width: calc(100vw - 90px);
}
</style>
