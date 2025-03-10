<template>
  <table class="min-w-full">
    <thead>
      <tr class="border-b border-gray-200 dark:border-gray-700">
        <th
          v-for="(col, index) in localColumns"
          :key="index"
          class="px-5 py-3 text-left sm:px-6"
        >
          <slot :name="`head-${col.key}`" :column="col">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
              {{ col.label }}
            </p>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
      <tr
        v-for="(item, rowIndex) in items"
        :key="rowIndex"
        class="border-t border-gray-100 dark:border-gray-800"
      >
        <td v-for="(col, colIndex) in localColumns" :key="colIndex" class="px-5 py-4 sm:px-6">
          <slot :name="`cell-${col.key}`" :item="item" :column="col">
            <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ item[col.key] }}</p>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import type { Column } from '../types';

const props = defineProps<{
  columns?: Array<Column>,
  items: Array<any>
}>();

const localColumns = computed<Column[]>(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns
  }

  if (props.items.length === 0) {
    return [];
  }

  return Object.keys(props.items[0]).map(key => {
    const capitalized = key.slice(0, 1).toUpperCase() + key.slice(1, key.length);
    return {
      key,
      label: capitalized,
    };
  })

})
</script>
