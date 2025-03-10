<template>
  <div>
    <ComponentCard v-if="props.loading || props.items.length > 0" class-name="overflow-x-auto">
      <OverlayLoading :show="props.loading">
        <BaseTable :columns="props.columns" :items="props.items">
          <!-- <template v-if="selectable" v-slot:head(selected)>
            <b-check v-model="selectAll" @change="onRowSelected(items)">
              <slot name="select-text" />
            </b-check>
          </template> -->
          <!-- <template v-if="selectable" v-slot:cell(selected)="{ item }">
            <b-check v-model="item.rowSelected" @change="onRowSelected(item)"/>
          </template> -->
          <!-- <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope"> -->

          <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="slotScope">
            <slot :name="slotName" v-bind="slotScope" />
          </template>
        </BaseTable>
      </OverlayLoading>
      <Paginator
        v-if="props.paginator && props.paginator.total > props.paginator.page_size"
        :page="props.paginator.current_page"
        :page-size="props.paginator.page_size"
        :total="props.paginator.total"
        @change="(evt: PaginationDto) => emit('paginate', evt)"
      />
    </ComponentCard>
    <EmptyData v-else :title="props.textEmpty">
      <router-link
        v-if="props.routeNameNew && props.textNew" :to="{ name: routeNameNew }"
        class="btn btn-primary"
      >
        {{ textNew }}
      </router-link>
    </EmptyData>
  </div>
</template>

<script setup lang="ts">
import OverlayLoading from "@/components/overlay/OverlayLoading.vue";
import BaseTable from "@/components/tables/components/BaseTable.vue";
import Paginator from "@/components/tables/components/Paginator.vue";
import EmptyData from "@/components/tables/components/EmptyData.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import type { PaginationDto, PaginationResponse } from "@/repositories/Base/pagination";
import type { Column } from "./types";

const emit = defineEmits<{
  (e: 'paginate', data: PaginationDto): void
}>()

const props = withDefaults(
  defineProps<{
  textEmpty: string;
  columns?: Column[];
  items: Array<any>;
  loading: boolean;
  // selectable: boolean;
  paginator?: PaginationResponse;
  routeNameNew?: string;
  textNew?: string;
}>(),
  {
    textEmpty: '',
    items: () => [],
    loading: false,
    // selectable: false,
  }
);

//   computed: {
//       localFields(){
//           if(this.selectable) {
//               return ['selected', ...this.fields]
//           }
//           return this.fields
//       }
//   },
//   watch: {
//       items(newVal, oldVal) {
//           if(newVal.length===0) {//} || this.items !== this.selected){
//               this.selectAll = false
//           }
//       }
//   },
//   data() {
//       return {
//           ref: null,
//           selectAll: false,
//           selected: []
//       }
//   },
//   mounted() {
//       this.ref = this._uid
//   },
//   methods: {
//       async onRowSelected(checked) {
//           if (Array.isArray(checked)) {
//               if (this.selectAll){
//                   this.selected = []
//               } else{
//                   this.selected = this.items
//               }
//           }else {
//               console.log(this.selected)
//               if(checked.rowSelected){
//                   this.selected = this.selected.filter(i => i.id !== checked.id)
//               }else{
//                   this.selected = [...this.selected, checked]
//               }
//           }

//           this.$emit('select', this.selected)
//       },
//   }
// }
</script>
