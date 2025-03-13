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
          <TabsComponent
            :tabs="[
              { title: 'Histórico', },
              { title: 'Entrega', },
              { title: 'Remessa', },
              { title: 'Pedido', },
            ]"
            active-tab="Entrega"
            class="bg-white p-3"
          >
            <template #tab-content-Histórico>Histórico</template>
            <template #tab-content-Entrega>
              <div class="flex text-gray-500" style="justify-content: space-around;">
                <div class="flex flex-col">
                  <span class="text-gray-700">Endereço de Entrega ({{ item.receiverAddress.deliveryPreference }}):</span>
                  {{ item.receiverAddress.addressLine }}<br>
                  {{ item.receiverAddress.comment }}<br>
                  {{ item.receiverAddress.stateName }}<br>
                  {{ item.receiverAddress.cityName }}<br>
                  {{ item.receiverAddress.neighborhoodName }}<br>
                  {{ item.receiverAddress.streetName }}<br>
                  {{ item.receiverAddress.streetNumber }}<br>
                  {{ item.receiverAddress.zipCode }}<br>
                </div>

                <div class="flex flex-col">
                  <span class="text-gray-700">Destinatário:</span>
                  {{ item.receiverAddress.receiverName }}<br>
                  {{ item.receiverAddress.receiverPhone }}<br>
                </div>
              </div>
            </template>
            <template #tab-content-Remessa>Remessa</template>
            <template #tab-content-Pedido>Pedido</template>
          </TabsComponent>
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
import { getStatusLabel } from "@/utils/parser";
import ECommerceConsult from "./Modal/ECommerceConsult.vue";
import TabsComponent from "@/components/tabs/TabsComponent.vue";

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

const getDateTimeString = (dateTime: string, options?: Intl.DateTimeFormatOptions) => {
  const date = new Date(dateTime);
  const defaultDateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // Thu
    day: "2-digit",   // 18
    month: "short",   // Mar
  };

  const defaultTimeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use AM/PM format
  };

  return {
    date: date.toLocaleDateString("pt-Br", options ?? defaultDateOptions).replace(",", ""),
    time: date.toLocaleTimeString("pt-Br", options ?? defaultTimeOptions),
  }
}

const getLogistic = (type: string): string => {
  const logisticType = {
    drop_off: 'Mercado Envios',
    xd_drop_off: 'Mercado Envios Coletas e Places',
    self_service: 'Mercado Envios Flex',
    fulfillment: 'Mercado Envios Full',
  };
  return logisticType[type] as string;
}

const items = computed(() => {
  return list.value.map(shipment => {
    return {
      ...shipment,
      // dateCreated: getDateTimeString(shipment.dateCreated),
      // logisticType: getLogistic(shipment.logisticType),
      seller: shipment.order.seller.nickname,
      receiver: {
        place: `${shipment.receiverAddress.cityName} ${shipment.receiverAddress.neighborhoodName}`,
        estimatedDelivery: shipment.shippingOption.estimatedDeliveryTime.date
          ? getDateTimeString(shipment.shippingOption.estimatedDeliveryTime.date)
          : '',
      },
      status: getStatusLabel(shipment.status),
      // cost: Number(shipment.shippingOption.cost).toLocaleString(
      //   'pt-BR', { style: 'currency', currency: 'BRL' }
      // ),
    }
  })
})

shipmentStore.loadList();
</script>
