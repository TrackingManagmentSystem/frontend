<template>
  <TabsComponent :tabs="[
    { title: 'Entrega', },
    { title: 'Remessa', },
  ]" active-tab="Entrega" class="bg-white dark:bg-white/[0.03] dark:border-gray-800 p-3">
    <template #tab-content-Entrega>
      <div class="grid grid-flow-col grid-rows-3 gap-4 text-gray-500">
        <div class="row-span-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800 p-2 flex flex-col">
          <span class="text-gray-700 mb-1">
            Endereço de Entrega ({{ props.item.receiverAddress.deliveryPreference }}):
          </span>
          <div v-for="address in props.item.receiverAddress.translated"
            class="grid grid-flow-col grid-cols-12 gap-4 even:bg-none odd:bg-gray-200 dark:odd:bg-blue-200">
            <span class="font-semibold col-span-3">{{ address.label }}:</span>
            <span class="col-span-9">
              {{ address.value }}
            </span>
          </div>
        </div>
        <div class="rounded-lg bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800 p-2 flex flex-col">
          <span class="text-gray-700 mb-1">Destinatário:</span>
          <span>{{ props.item.receiverAddress.receiverName }}</span>
          <span>{{ props.item.receiverAddress.receiverPhone }}</span>
        </div>
        <div class="row-span-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800 p-2 flex flex-col">
          <div class="flex justify-between mb-2">
            <div>
              <span class="text-gray-700 mb-1">Histórico Plataforma:</span>
              <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                Última atualização: {{ props.item.lastUpdated.date }} {{ props.item.lastUpdated.time }}
              </span>
            </div>
            <Button
              variant="outline"
              size="xs"
              :start-icon="RefreshIcon"
              @click="handleUpdate"
            >Atualizar</Button>
          </div>
          <div v-for="status in props.item.statusHistory"
            class="grid grid-flow-col grid-cols-12 gap-4 even:bg-none odd:bg-gray-200 dark:odd:bg-blue-200">
            <span class="font-semibold col-span-5">{{ status.label }}:</span>
            <span class="col-span-7">
              {{ status.date }} {{ status.time }}
            </span>
          </div>
        </div>
      </div>
    </template>
    <template #tab-content-Remessa>
      <div class="grid grid-flow-col grid-rows-3 gap-4 text-gray-500">
        <div class="row-span-3 rounded-lg p-2 flex flex-col">
          <div class="row-span-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800 p-2 flex flex-col">
            <span class="text-gray-700 mb-1">
              Endereço de Coleta:
            </span>
            <div v-for="address in props.item.senderAddress.translated"
              class="grid grid-flow-col grid-cols-12 gap-4 even:bg-none odd:bg-gray-200 dark:odd:bg-blue-200">
              <span class="font-semibold col-span-3">{{ address.label }}:</span>
              <span class="col-span-9">
                {{ address.value }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-span-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800 p-2 flex flex-col">
          <span class="text-gray-700 mb-1">Remetente: </span>
          {{ props.item.order.seller.nickname }}
        </div>
        <div class="col-span-2 row-span-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] dark:border-gray-800 p-2 flex flex-col">
          <span class="font-semibold">Dt Criação: </span>{{ props.item.dateCreated.date }} {{ props.item.dateCreated.time }}<br>
          <span class="font-semibold">Custo: </span>{{ props.item.cost }}<br>
          <span class="font-semibold">Tipo Logística: </span>{{ props.item.logisticType }}<br>
        </div>
      </div>
    </template>
  </TabsComponent>
</template>

<script lang="ts" setup>
import { useShipmentStore } from '@/store/shipment';
import TabsComponent from '@/components/tabs/TabsComponent.vue';
import Button from '@/components/ui/Button.vue';
import RefreshIcon from '@/icons/RefreshIcon.vue';
import { ref, watch } from 'vue';
import type { ShipmentListItem } from '@/utils/parser/shipment';

const props = defineProps<{ item: ShipmentListItem }>()

const shipmentStore = useShipmentStore()

// const shipment = ref(props.item)
// watch(() => props.item, () => {
//   shipment.value = {...props.item }
// })

const handleUpdate = async () => {
  await shipmentStore.syncShipment(props.item.id.toString())
  // const shipment = await shipmentStore.syncShipment(props.item.id.toString())
  // shipment.value = shipment
}
</script>
