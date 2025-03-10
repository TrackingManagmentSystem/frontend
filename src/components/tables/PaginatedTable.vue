<template>
  <div>
    <ComponentCard v-if="props.loading || props.items.length > 0" class-name="overflow-hidden">
      <OverlayLoading :show="props.loading">
        <BaseTable :columns="props.columns" :items="props.items">
          <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="slotScope">
            <slot :name="slotName" v-bind="slotScope" />
          </template>
        </BaseTable>
      </OverlayLoading>
      <Paginator
        v-if="props.paginator && props.paginator.total > props.paginator.page_size"
        :page="props.paginator.current_page"
        :page-size="props.paginator.page_size"
        :total="props.paginator.total"
        @change="(evt: PaginationDto) => emit('paginate', evt)"
      />
    </ComponentCard>
    <EmptyData v-else :title="props.textEmpty">
      <router-link
        v-if="props.routeNameNew && props.textNew" :to="{ name: routeNameNew }"
        class="btn btn-primary"
      >
        {{ textNew }}
      </router-link>
    </EmptyData>
  </div>
</template>

<script setup lang="ts">
import OverlayLoading from "@/components/overlay/OverlayLoading.vue";
import BaseTable from "@/components/tables/components/BaseTable.vue";
import Paginator from "@/components/tables/components/Paginator.vue";
import EmptyData from "@/components/tables/components/EmptyData.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
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
}>(),
  {
    textEmpty: '',
    items: () => [],
    loading: false,
  }
);
</script>
