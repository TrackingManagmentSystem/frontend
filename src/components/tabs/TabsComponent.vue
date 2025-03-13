<template>
  <div class="rounded-xl border border-gray-200 dark:border-gray-800">
    <div class="border-b border-gray-200 dark:border-gray-800">
      <TabHeader :tabs="props.tabs" :active-tab="active" @tab-clicked="activateTab" />
    </div>

    <div class="pt-4 dark:border-gray-800">
      <template v-for="(tab) in props.tabs">
        <div v-show="tab.title === active?.title">
          <slot :name="`tab-content-${tab.title}`" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export type Tab = {
  title: string;
  icon?: Component;
  notification?: {
    value: number;
    color: BadgeColor;
  };
};
</script>

<script lang="ts" setup>
import { onMounted, ref, type Component } from 'vue';
import type { BadgeColor } from '../ui/Badge.vue';
import TabHeader from './TabHeader.vue';

const props = defineProps<{
  tabs: Tab[];
  activeTab?: string;
}>()

const active = ref<Tab | null>(null);

const activateTab = (tab: Tab | null = null) => {
  active.value = tab
}

onMounted(() => {
  if (props.activeTab) {
    activateTab(
      props.tabs.find((tab) => tab.title === props.activeTab)
    )
  }
})
</script>
