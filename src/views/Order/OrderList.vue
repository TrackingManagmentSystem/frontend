<template>
  <AdminLayout>
    <PageBreadcrumb />
    <div class="space-y-5 sm:space-y-6">
        <PaginatedTable
          :columns="columns"
          :items="items"
          :loading="loading"
          textEmpty="Nenhum Pedido Encontrado"
        >
          <template v-slot:empty-button>
            <Button size="sm" @click="handleSyncOrders">Sincronizar ordens</Button>
          </template>
        </PaginatedTable>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import Button from "@/components/ui/Button.vue";
import { useOrderStore } from "@/store/order";
import { storeToRefs } from "pinia";
import PaginatedTable from "@/components/tables/PaginatedTable.vue";
import type { Column } from "@/components/tables/types";
import { computed } from "vue";

const orderStore = useOrderStore()
const { list, loading } = storeToRefs(orderStore)

const columns: Column[] = [
  { key: 'id', label: 'ID da Ordem' },
  { key: 'shippingId', label: 'ID da Remessa' },
  { key: 'status', label: 'Status' },
  { key: 'buyer', label: 'Comprador' },
  { key: 'seller', label: 'Vendedor' },
  { key: 'items', label: 'Qtd Items' },
  { key: 'tags', label: 'Tags' },
  { key: 'dateCreated', label: 'Data de Criação' },
  { key: 'lastUpdated', label: 'Última Atualização' },
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
      tags: order.tags.join(', '),
      dateCreated: getDateTimeString(order.dateCreated),
      lastUpdated: getDateTimeString(order.lastUpdated),
    }
  })
})

const handleSyncOrders = async () => {
  await orderStore.sync();
  orderStore.loadList();
}

orderStore.loadList();
</script>
