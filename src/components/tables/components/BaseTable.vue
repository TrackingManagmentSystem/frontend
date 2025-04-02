<template>
  <table class="min-w-full">
    <thead>
      <!-- <tr class="border-b border-gray-200 dark:border-gray-700"> -->
      <tr class="border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
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
      <template v-for="(item, rowIndex) in items" :key="rowIndex">
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <td v-for="(col, colIndex) in localColumns" :key="colIndex" class="px-5 py-4 sm:px-6">
              <slot
                :name="`cell-${col.key}`"
                :item="item[col.key]"
                :column="col"
                :expand-row-below="() => toggleExpand(rowIndex)"
              >
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                  <template v-if="item[col.key] && item[col.key].date && item[col.key].time">
                    <span class="mb-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                      {{ item[col.key].date }}
                    </span>
                    <span class="text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                      {{ item[col.key].time }}
                    </span>
                  </template>
                  <template v-else>
                    {{ item[col.key] }}
                  </template>
                </p>
              </slot>
            </td>
          </tr>
          <!-- Linha expandida -->
          <tr v-if="expandedRows.has(rowIndex)" class="bg-gray-50 dark:bg-gray-900">
            <td :colspan="localColumns.length" class="p-4">
              <slot name="row-expanded" :item="item" />
            </td>
          </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
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

});

const expandedRows = ref(new Set<number>());

const toggleExpand = (rowIndex: number) => {
  if (expandedRows.value.has(rowIndex)) {
    expandedRows.value.delete(rowIndex);
  } else {
    expandedRows.value.add(rowIndex);
  }
};
</script>
