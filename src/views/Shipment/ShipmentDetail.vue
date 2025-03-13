<template>
  <TabsComponent :tabs="[
    { title: 'Entrega', },
    { title: 'Remessa', },
  ]" active-tab="Entrega" class="bg-white p-3">
    <template #tab-content-Entrega>
      <div class="grid grid-flow-col grid-rows-3 gap-4 text-gray-500">
        <div class="row-span-3 rounded-lg bg-gray-50 p-2 flex flex-col">
          <span class="text-gray-700 mb-1">
            Endereço de Entrega ({{ item.receiverAddress.deliveryPreference }}):
          </span>
          <div v-for="address in item.receiverAddress.translated"
            class="grid grid-flow-col grid-cols-12 gap-4 even:bg-none odd:bg-gray-200">
            <span class="font-semibold col-span-3">{{ address.label }}:</span>
            <span class="col-span-9">
              {{ address.value }}
            </span>
          </div>
        </div>
        <div class="rounded-lg bg-gray-50 p-2 flex flex-col">
          <span class="text-gray-700 mb-1">Destinatário:</span>
          <span>{{ item.receiverAddress.receiverName }}</span>
          <span>{{ item.receiverAddress.receiverPhone }}</span>
        </div>
        <div class="row-span-2 rounded-lg bg-gray-50 p-2 flex flex-col">
          <div class="flex justify-between mb-2">
            <div>
              <span class="text-gray-700 mb-1">Histórico Plataforma:</span>
              <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                Última atualização: {{ item.lastUpdated.date }} {{ item.lastUpdated.time }}
              </span>
            </div>
            <Button variant="outline" size="sm" :start-icon="RefreshIcon">Atualizar</Button>
          </div>
          <div v-for="status in item.statusHistory"
            class="grid grid-flow-col grid-cols-12 gap-4 even:bg-none odd:bg-gray-200">
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
        <div class="row-span-3 rounded-lg bg-gray-50 p-2 flex flex-col">
          <div class="row-span-3 rounded-lg bg-gray-50 p-2 flex flex-col">
            <span class="text-gray-700 mb-1">
              Endereço de Coleta:
            </span>
            <div v-for="address in item.senderAddress.translated"
              class="grid grid-flow-col grid-cols-12 gap-4 even:bg-none odd:bg-gray-200">
              <span class="font-semibold col-span-3">{{ address.label }}:</span>
              <span class="col-span-9">
                {{ address.value }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-span-2 rounded-lg bg-gray-50 p-2 flex flex-col">
          <span class="text-gray-700 mb-1">Remetente: </span>
          {{ item.order.seller.nickname }}
        </div>
        <div class="col-span-2 row-span-2 rounded-lg bg-gray-50 p-2 flex flex-col">
          <span class="font-semibold">Dt Criação: </span>{{ item.dateCreated.date }} {{ item.dateCreated.time }}<br>
          <span class="font-semibold">Custo: </span>{{ item.cost }}<br>
          <span class="font-semibold">Tipo Logística: </span>{{ item.logisticType }}<br>
        </div>
      </div>
    </template>
  </TabsComponent>
</template>

<script lang="ts" setup>
import TabsComponent from '@/components/tabs/TabsComponent.vue';
import Button from '@/components/ui/Button.vue';
import RefreshIcon from '@/icons/RefreshIcon.vue';
import type { ShipmentListItem } from './ShipmentList.vue';


defineProps<{ item: ShipmentListItem }>()
</script>
