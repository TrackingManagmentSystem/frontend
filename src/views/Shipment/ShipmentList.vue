<template>
  <AdminLayout>
    <PageBreadcrumb />
    <div class="space-y-5 sm:space-y-6">
      <PaginatedTable
          :columns="columns"
          :items="items"
          :loading="loading"
          textEmpty="Nenhuma Remessa Encontrada"
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
          <button @click="expandRowBelow">Ação Linha</button>
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
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import { storeToRefs } from "pinia";
import { useShipmentStore } from "@/store/shipment";
import PaginatedTable from "@/components/tables/PaginatedTable.vue";
import type { Column } from "@/components/tables/types";
import { computed, ref } from "vue";
import Badge from "@/components/ui/Badge.vue";
import { parseDateTimeString, parseMoney } from "@/utils/parser";
import ECommerceConsult from "./Modal/ECommerceConsult.vue";
import type { Shipment } from "@/repositories/Shipment/ShipmentRepository";
import { getStatusLabel, parseAddress, parseStatusHistory, translateLogistic } from "@/utils/parser/shipment";
import ShipmentDetail from "./ShipmentDetail.vue";

const shipmentStore = useShipmentStore()
const { list, loading } = storeToRefs(shipmentStore)
const eCommerceConsultId = ref<string | undefined>(undefined)

const columns: Column[] = [
  { key: 'id', label: 'Remessa' },
  { key: 'seller', label: 'Cliente' },
  { key: 'receiver', label: 'Entrega' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Ações' },
];

/**
  Etiqueta Ecommerce
  Consultar Ecommerce
 */

export type ShipmentListItem = Shipment & {
  seller: string;
  reciever: {
    place: string;
    estimatedDelivery: { date: string; time: string; } | string;
  }
  receiverAddress: Shipment['receiverAddress'] & {
    translated: Record<string, string>;
  }
  senderAddress: Shipment['senderAddress'] & {
    translated: Record<string, string>;
  }
  statusHistory: {
    date: string | null;
    time: string | null;
    label: string;
  }[]
  dateCreated: { date: string; time: string; };
  lastUpdated: { date: string; time: string; };
  cost: string;
}

const items = computed(() => {
  return list.value.map(shipment => {
    return {
      ...shipment,
      seller: shipment.order.seller.nickname,
      receiver: {
        place: `${shipment.receiverAddress.cityName} ${shipment.receiverAddress.neighborhoodName}`,
        estimatedDelivery: shipment.shippingOption.estimatedDeliveryTime.date
          ? parseDateTimeString(shipment.shippingOption.estimatedDeliveryTime.date)
          : '',
      },
      status: getStatusLabel(shipment.status),

      receiverAddress: {
        ...shipment.receiverAddress,
        translated: parseAddress(shipment.receiverAddress)
      },
      senderAddress: {
        ...shipment.senderAddress,
        translated: parseAddress(shipment.senderAddress)
      },
      statusHistory: parseStatusHistory(shipment.statusHistory),
      dateCreated: parseDateTimeString(shipment.dateCreated),
      lastUpdated: parseDateTimeString(shipment.lastUpdated),
      logisticType: translateLogistic(shipment.logisticType),
      cost: parseMoney(shipment.shippingOption.cost),
    }
  })
})

shipmentStore.loadList();
</script>
