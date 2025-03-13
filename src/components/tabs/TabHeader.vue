<template>
  <nav class="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
      <button
        v-for="(tab, index) in props.tabs"
        :key="index"
        class="inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out bg-transparent"
        :class="{
          'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200': props.activeTab?.title !== tab.title,
          'border-brand-500 text-brand-500': props.activeTab?.title == tab.title
        }"
        @click="emit('tab-clicked', tab)"
      >
        <component v-if="tab.icon" :is="tab.icon" />
        {{ tab.title }}
        <Badge v-if="tab.notification" :color="tab.notification.color">
          {{ tab.notification.value }}
        </Badge>
      </button>
    </nav>
</template>

<script lang="ts" setup>
import Badge from '../ui/Badge.vue';
import type { Tab } from './TabsComponent.vue';

const emit = defineEmits<{
  (event: 'tab-clicked', tab: Tab): void;
}>();
const props = defineProps<{
  tabs: Tab[];
  activeTab?: Tab;
}>()
</script>
