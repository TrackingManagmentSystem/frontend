<template>
  <AdminLayout>
    <PageBreadcrumb />
    <div class="space-y-5 sm:space-y-6">
      <PaginatedTable
          :columns="columns"
          :items="items"
          :loading="loading"
          textEmpty="Nenhuma Ordem Encontrada"
        >
        <template #cell-shipment="{ item }">
          <p class="text-gray-500 text-theme-sm dark:text-gray-400">
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              Remessa:
            </span>
            {{ item?.shippingId }}<br>
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90 mt-2">
              Losística:
            </span>
            {{ item?.logisticType }}<br>
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90 mt-2">
              Dt Criação:
            </span>
            {{ item?.dateCreated }}
          </p>
        </template>
        <template #cell-sender="{ item }">
          <p class="text-gray-500 text-theme-sm dark:text-gray-400">
            {{ `${item?.cityName} ${item?.zipCode}` }}
          </p>
        </template>
        <template #cell-receiver="{ item }">
          <p class="text-gray-500 text-theme-sm dark:text-gray-400">
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90 mt-2">
              Destinatário:
            </span>
            {{ item?.name }}<br>
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90 mt-2">
              Local:
            </span>
            {{ item?.place }}<br>
            <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90 mt-2">
              Dt. Prevista:
            </span>
            {{ item?.estimatedDelivery }}
          </p>
        </template>
        <template #cell-status="{ item }">
          <DropdownMenu :menuItems="item.dropdown">
            <template #icon>
              <Badge color="info" no-break-line>
                {{ item.status }}
              </Badge>
            </template>
          </DropdownMenu>
        </template>
        <template #cell-actions>
          <button>Ação</button>
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
import DropdownMenu from "@/components/common/DropdownMenu.vue";
import ECommerceConsult from "./Modal/ECommerceConsult.vue";

const shipmentStore = useShipmentStore()
const { list, loading } = storeToRefs(shipmentStore)
const eCommerceConsultId = ref<string | undefined>(undefined)

const columns: Column[] = [
  { key: 'shipment', label: 'Remessa' },
  { key: 'sender', label: 'Cliente' },
  { key: 'receiver', label: 'Entrega' },
  { key: 'cost', label: 'Custo de Frete' },
  { key: 'status', label: 'Status' },
  { key: 'lastUpdated', label: 'Ultima Atualização' },
  { key: 'actions', label: 'Ações' },
  { key: 'subStatus', label: 'Sub-Status	' },

  { key: 'subStatusa', label: 'Sub-Status	' },
  { key: 'subStatusas', label: 'Sub-Status	' },
  { key: 's', label: 'Sub-Status	' },
  { key: 'sa', label: 'Sub-Status	' },
  { key: 'sasadsdfdasd', label: 'Subasdfasdfasdf-Status	' },
  { key: 'sasdafaaaaadasd', label: 'Sub-asfdasdfStatus	' },
  { key: 'sasdfssaaaadasd', label: 'Suasdfasdfb-Status	' },
  { key: 'sasdfdassd', label: 'Sub-asdfasdfStatus	' },
  { key: 'sasdfdassd', label: 'Sub-asdfasdfStatus	' },
  { key: 'sasdfdssasd', label: 'Subasdfasdf-Status	' },
  { key: 'sasdddfdasd', label: 'Subasdasdf-Status	' },
  { key: 'sasdfdasd', label: 'Sub-Status	' },
  { key: 'sasdfdddasd', label: 'Sub-Status	' },
  { key: 'sasdffffdasd', label: 'Sub-Status	' },
];

/**
  Etiqueta Ecommerce
  Consultar Ecommerce
 */

const getDateTimeString = (dateTime: string) => {
  const date = new Date(dateTime);
  const options = {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Campo_Grande"
  };
  return `${date.toLocaleDateString('pt-Br')} ${date.toLocaleTimeString('pt-Br')}`
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
      shipment: {
        shippingId: shipment.id,
        dateCreated: getDateTimeString(shipment.dateCreated),
        logisticType: getLogistic(shipment.logisticType),
      },
      order_data: {
        orderId: shipment.orderId,
      },
      sender: shipment.senderAddress,
      receiver: {
        name: shipment.receiverAddress.receiverName,
        place: `${shipment.receiverAddress.cityName} ${shipment.receiverAddress.neighborhoodName}`,
        estimatedDelivery: shipment.shippingOption.estimatedDeliveryTime.date
          ? getDateTimeString(shipment.shippingOption.estimatedDeliveryTime.date)
          : '',
      },
      cost: Number(shipment.shippingOption.cost).toLocaleString(
        'pt-BR', { style: 'currency', currency: 'BRL' }
      ),
      status: {
        status: getStatusLabel(shipment.status),
        dropdown: [
          {
            label: getStatusLabel(shipment.subStatus),
          },
          {
            label: getDateTimeString(shipment.lastUpdated),
          },
          {
            label: `Consultar Ecommerce`,
            onClick: () => {
              console.log('shipment.id :>> ', shipment.id);
              eCommerceConsultId.value = shipment.id.toString();
            }
          }
        ]
      }
    }
  })
})

shipmentStore.loadList();
</script>
