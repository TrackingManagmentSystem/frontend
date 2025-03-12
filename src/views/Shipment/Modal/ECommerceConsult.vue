<template>
  <ModalClosable v-if="isOpen" @close="handleClose" fullScreenBackdrop>
    <template #body>
      <OverlayLoading :show="loading">
        <BaseTable :columns="columns" :items="items" />
      </OverlayLoading>
    </template>
  </ModalClosable>
</template>

<script lang="ts" setup>
import OverlayLoading from '@/components/overlay/OverlayLoading.vue';
import BaseTable from '@/components/tables/components/BaseTable.vue';
import ModalClosable from '@/components/ui/ModalClosable.vue';
import { useShipmentStore } from '@/store/shipment';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const shipmentStore = useShipmentStore()
const { actual, loading } = storeToRefs(shipmentStore)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps<{ shipmentId?: string; }>();

const isOpen = ref(false);
const columns = [
  { key: 'id', label: 'Código Remessa' },
  { key: 'orderId', label: 'Nº Pedido' },
  { key: 'dateHandling', label: 'A Caminho' },
  { key: 'dateReturned', label: 'Retorno' },
  { key: 'dateDelivered', label: 'Entregue' },
  { key: 'dateFirstVisit', label: 'Data da 1ª Visita' },
  { key: 'dateNotDelivered', label: 'Data da Falha na Entrega	' },
  { key: 'dateCancelled', label: 'Data de Cancelamento	' },
  { key: 'dateFirstPrinted', label: 'Data da Etiqueta Impressa' },
  { key: 'status', label: 'Status	delivered' },
];

const items = computed(() => {
  if (actual.value) {
    return [{
      id: actual.value.id,
      orderId: actual.value.orderId,
      dateHandling: actual.value.statusHistory.dateHandling,
      dateReturned: actual.value.statusHistory.dateReturned,
      dateDelivered: actual.value.statusHistory.dateDelivered,
      dateFirstVisit: actual.value.statusHistory.dateFirstVisit,
      dateNotDelivered: actual.value.statusHistory.dateNotDelivered,
      dateCancelled: actual.value.statusHistory.dateCancelled,
      dateFirstPrinted: actual.value.dateFirstPrinted,
      status: actual.value.status,
      subStatus: actual.value.subStatus,
    }]
  }
  return []
});

watch(() => props.shipmentId, (value) => {
  if (value) {
    isOpen.value = true;
    shipmentStore.syncShipment(value);
  }
});

const handleClose = () => {
  isOpen.value = false;
  actual.value = null;
  emit('close')
}
</script>
