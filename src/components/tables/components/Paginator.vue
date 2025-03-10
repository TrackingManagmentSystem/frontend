<template>
  <div class="row align-items-center justify-content-center m-1">
    <b-btn class="col-md-3" variant="link" @click="changePage(local_page - 1)" :disabled="local_page === 1">
      Previous
    </b-btn>
    <div class="col-md-3 d-flex">
      <span class="m-auto pr-2">Page</span>
      <b-input :max="totalPages" type="number" v-model="local_page" @change="changePage(local_page)" />
      <span class="m-auto pl-2" style="white-space: nowrap;">{{ ` de ${totalPages}` }}</span>
    </div>
    <b-btn class="col-md-3" variant="link" @click="changePage(local_page + 1)" :disabled="local_page === totalPages">
      Next
    </b-btn>
    <div class="col-md-3 d-inline-flex">
      <b-select :options="pageSizeOptions" v-model="page_size" @change="changepageSize(page_size)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PaginationDto } from '@/repositories/Base/pagination';
import { computed, onMounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'change', data: PaginationDto): void
}>()

const props = withDefaults(
  defineProps<{
    pageSize: number,
    page: number;
    total: number;
  }>(),
  {
    pageSize: 10,
    page: 1,
    total: 0,
  }
)
const local_page = ref(1)
const local_old_page = ref(1)
const page_size = ref(10)

const pageSizeOptions = computed(() => {
  return [
    {
      text: `10 por página`,
      value: 10
    },
    {
      text: `20 por página`,
      value: 20
    },
    {
      text: `30 por página`,
      value: 30
    },
    {
      text: `40 por página`,
      value: 40
    },
    {
      text: `50 por página`,
      value: 50
    }
  ]
});

const totalPages = computed(() => {
  if (!props.total) return 0
  if (props.total % page_size.value === 0) {
    return props.total / page_size.value
  }
  return Math.floor(props.total / page_size.value) + 1
});


const changePage = (page: number) => {
  if (page <= 0 || page > totalPages.value) {
    local_page.value = local_old_page.value
    return
  }
  local_page.value = page
  local_old_page.value = page
  emit('change', {
    page,
    page_size: page_size.value
  })
}

const changepageSize = (page_size: number) => {
  // page_size.value = page_size
  local_page.value = 1
  emit('change', {
    page: local_page.value,
    page_size
  })
}
onMounted(() => {
  page_size.value = props.pageSize
  local_page.value = props.page
  local_old_page.value = props.page
})
</script>

<style scoped></style>
