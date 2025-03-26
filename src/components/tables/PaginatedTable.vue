<template>
  <div
    v-if="props.loading || props.items.length > 0"
    class="bg-white border border-gray-200 dark:bg-white/[0.03] dark:border-gray-800 rounded-2xl overflow-hidden"
  >
    <OverlayLoading :show="props.loading">
      <div class="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between pt-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          {{ props.title }}
        </h3>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar />
          <Button :start-icon="ControlsIcon" size="sm" variant="outline">Filters</Button>
        </div>
      </div>
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <BaseTable :columns="props.columns" :items="props.items">
          <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="slotScope">
            <slot :name="slotName" v-bind="slotScope" />
          </template>
        </BaseTable>
        <Paginator
          v-if="props.paginator && props.paginator.total > props.paginator.page_size"
          :page="props.paginator.current_page"
          :page-size="props.paginator.page_size"
          :total="props.paginator.total"
          @change="(evt: PaginationDto) => emit('paginate', evt)"
        />
      </div>
    </OverlayLoading>
  </div>
  <EmptyData v-else :title="props.textEmpty">
    <slot name="empty-button">
      <router-link
        v-if="props.routeNameNew && props.textNew" :to="{ name: routeNameNew }"
        class="btn btn-primary"
      >
        {{ textNew }}
      </router-link>
    </slot>
  </EmptyData>
</template>

<script setup lang="ts">
import OverlayLoading from "@/components/overlay/OverlayLoading.vue";
import BaseTable from "@/components/tables/components/BaseTable.vue";
import Paginator from "@/components/tables/components/Paginator.vue";
import EmptyData from "@/components/tables/components/EmptyData.vue";
import SearchBar from "@/components/layout/header/SearchBar.vue";
import Button from "@/components/ui/Button.vue";
import ControlsIcon from "@/icons/ControlsIcon.vue";
import type { PaginationDto, PaginationResponse } from "@/repositories/Base/pagination";
import type { Column } from "./types";

const emit = defineEmits<{
  (e: 'paginate', data: PaginationDto): void
}>()

const props = withDefaults(
  defineProps<{
  textEmpty: string;
  columns?: Column[];
  items: Array<any>;
  loading: boolean;
  paginator?: PaginationResponse;
  routeNameNew?: string;
  textNew?: string;
  title?: string;
}>(),
  {
    textEmpty: '',
    items: () => [],
    loading: false,
  }
);
</script>
