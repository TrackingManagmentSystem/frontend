<template>
  <AdminLayout>
    <PageBreadcrumb />
    <div class="space-y-5 sm:space-y-6">
        <PaginatedTable
          :columns="columns"
          :items="items"
          :loading="loading"
          textEmpty="No Orders founded"
        >
          <template v-slot:empty-button>
            <Button size="sm" @click="handleSyncOrders">Sync Orders</Button>
          </template>
          <template #cell-status="{ item }">
            <Badge color="info" no-break-line>
              {{ item }}
            </Badge>
          </template>
          <template #cell-tags="{ item }">
            <Badge v-for="tag in item" size="sm" no-break-line>
              {{ getStatusLabel(tag) }}
            </Badge>
          </template>
          <template #cell-shipment="{ item }">
            <Button size="xs" @click="handleSyncShipment(item)">
              Search Shipment
            </Button>
          </template>
        </PaginatedTable>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import Badge from "@/components/ui/Badge.vue";
import Button from "@/components/ui/Button.vue";
import { useOrderStore } from "@/store/order";
import { useShipmentStore } from "@/store/shipment";
import { storeToRefs } from "pinia";
import PaginatedTable from "@/components/tables/PaginatedTable.vue";
import type { Column } from "@/components/tables/types";
import { computed } from "vue";
import { parseDateTimeString } from "@/utils/parser";
import { getStatusLabel } from "@/utils/parser/shipment";

const orderStore = useOrderStore()
const shipmentStore = useShipmentStore()
const { list, loading } = storeToRefs(orderStore)

const columns: Column[] = [
  { key: 'id', label: 'Order ID' },
  { key: 'status', label: 'Status' },
  // { key: 'buyer', label: 'Comprador' },
  { key: 'seller', label: 'Seller' },
  // { key: 'items', label: 'Qtd Items' },
  { key: 'tags', label: 'Tags' },
  // { key: 'dateCreated', label: 'Data de Criação' },
  { key: 'lastUpdated', label: 'Last Update' },
  { key: 'shipment', label: 'Shipment' },
];

const getDateTimeString = (dateTime: string) => {
  const date = new Date(dateTime);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

const items = computed(() => {
  return list.value.map(order => {
    return {
      ...order,
      buyer: order.buyer.nickname,
      seller: order.seller.nickname,
      items: order.items.length,
      status: getStatusLabel(order.status),
      dateCreated: parseDateTimeString(order.dateCreated),
      lastUpdated: parseDateTimeString(order.lastUpdated),
      shipment: order.shippingId,
    }
  })
})

const handleSyncOrders = async () => {
  await orderStore.sync();
  orderStore.loadList();
}

const handleSyncShipment = async (shipmentId: string) => {
  await shipmentStore.sync(shipmentId);
}

orderStore.loadList();
</script>
