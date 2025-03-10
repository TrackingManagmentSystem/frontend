<template>
  <AdminLayout>
    <PageBreadcrumb />
    <div class="space-y-5 sm:space-y-6">
      <PaginatedTable
          :columns="columns"
          :items="items"
          :loading="loading"
          textEmpty="Nenhuma Ordem Encontrada"
        />
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import { storeToRefs } from "pinia";
import { useShipmentStore } from "@/store/shipment";
import PaginatedTable from "@/components/tables/PaginatedTable.vue";
import type { Column } from "@/components/tables/types";
import { computed } from "vue";

const shipmentStore = useShipmentStore()
const { list, loading } = storeToRefs(shipmentStore)

const columns: Column[] = [
  { key: 'id', label: 'ID Remessa' },
  { key: 'orderId', label: 'ID Ordem' },
  { key: 'trackingNumber', label: 'Nº rastreio' },
  { key: 'status', label: 'Status' },
  { key: 'platform', label: 'Plataforma' },
  { key: 'trackingMethod', label: 'Metodo' },
  { key: 'lastUpdated', label: 'Ultima Atualização' },
  { key: 'dateCreated', label: 'Criação' },
  { key: 'dateFirstPrinted', label: '1ª Impressão' },
  { key: 'estimatedHandlingLimit', label: 'Dt Estimada Coleta' },
  { key: 'estimatedDeliveryLimit', label: 'Dt Estimada Entrega' },
  { key: 'estimatedDeliveryFinal', label: 'Dt Estimada Entrega Final' },
  { key: 'estimatedDeliveryExtended', label: 'Dt Estimada Entrega Estendida' },
];

const getDateTimeString = (dateTime: string) => {
  const date = new Date(dateTime);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

const items = computed(() => {
  return list.value.map(shipment => {
    return {
      ...shipment,
      status: `${shipment.status} ${shipment.subStatus}`,
      platform: `${shipment.mode}, ${shipment.logisticType} ${shipment.marketPlace}`,
      dateCreated: getDateTimeString(shipment.dateCreated),
      lastUpdated: getDateTimeString(shipment.lastUpdated),
      dateFirstPrinted: getDateTimeString(shipment.dateFirstPrinted),
      estimatedHandlingLimit: shipment.shippingOption.estimatedHandlingLimit
        ? getDateTimeString(shipment.shippingOption.estimatedHandlingLimit)
        : '',
      estimatedDeliveryLimit: shipment.shippingOption.estimatedDeliveryLimit
        ? getDateTimeString(shipment.shippingOption.estimatedDeliveryLimit)
        : '',
      estimatedDeliveryFinal: shipment.shippingOption.estimatedDeliveryFinal
        ? getDateTimeString(shipment.shippingOption.estimatedDeliveryFinal)
        : '',
      estimatedDeliveryExtended: shipment.shippingOption.estimatedDeliveryExtended
        ? getDateTimeString(shipment.shippingOption.estimatedDeliveryExtended)
        : '',
    }
  })
})

shipmentStore.loadList();
console.log('list :>> ', list);
</script>
