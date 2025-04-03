<template>
  <AdminLayout>
    <PageBreadcrumb />
    <div class="space-y-5 sm:space-y-6">
      <PaginatedTable
          :columns="columns"
          :items="items"
          :loading="loading"
          textEmpty="No Shipment Found"
        >
        <template #cell-receiver="{ item }">
          <p class="text-gray-500 text-theme-sm dark:text-gray-400">
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90 mt-2">
              {{ item?.place }}
            </span>
            <span class="mb-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
              {{ item.estimatedDelivery.date }}
            </span>
            <span class="text-theme-sm font-medium text-gray-700 dark:text-gray-400">
              {{ item.estimatedDelivery.time }}
            </span>
          </p>
        </template>
        <template #cell-status="{ item }">
          <Badge color="info" no-break-line>
            {{ item }}
          </Badge>
        </template>
        <template #cell-actions="{ expandRowBelow }">
          <Button @click="expandRowBelow" size="xs">Details</Button>
        </template>
        <template #row-expanded="{ item }">
          <ShipmentDetail :item="item" />
        </template>
      </PaginatedTable>
    </div>

    <ECommerceConsult
      :shipment-id="eCommerceConsultId"
      @close="() => { eCommerceConsultId = undefined }"
    />
  </AdminLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useShipmentStore } from "@/store/shipment";
import { parseShipment } from "@/utils/parser/shipment";
import type { Column } from "@/components/tables/types";
import Badge from "@/components/ui/Badge.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PaginatedTable from "@/components/tables/PaginatedTable.vue";
import ECommerceConsult from "./Modal/ECommerceConsult.vue";
import ShipmentDetail from "./ShipmentDetail.vue";
import Button from "@/components/ui/Button.vue";

const shipmentStore = useShipmentStore()
const { list, loading } = storeToRefs(shipmentStore)
const eCommerceConsultId = ref<string | undefined>(undefined)

const columns: Column[] = [
  { key: 'id', label: 'Shipment ID' },
  { key: 'seller', label: 'Client' },
  { key: 'receiver', label: 'Deliver' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Action' },
];
const items = computed(() => list.value.map(parseShipment))

shipmentStore.loadList();
</script>
