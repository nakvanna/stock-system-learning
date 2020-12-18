<template>
  <q-page>
    <div class="row bg-grey-2 q-pa-xs">
      <div class="flex q-gutter-xs full-width">
        <q-btn flat round
               size="12px"
               color="blue-5"
               icon="sync"
               @click="table.refetch()"/>
        <q-btn
          :disable="grid_data.selected.length!==1"
          color="blue-5"
          flat round size="12px"
          icon="preview"
          to="/product-view" @click=""/>
        <q-btn flat round size="12px" icon="add" to="/sku-create"/>
        <div class="q-pt-sm text-subtitle2 text-secondary">
          ទិន្នន័យសរុប {{ grid_data.record_value.total_record - 1 }} ទិន្នន័យបានទាញយក
          {{ grid_data.record_value.total_item }}
        </div>
      </div>
    </div>
    <e-j-s-grid
      ref="table"
      v-model="grid_data.selected"
      :query="grid_data.query.skus"
      query_name="skus"
      :pre_map="mapSku"
      :record_value.sync="grid_data.record_value"
      is_group
    >
      <e-columns>
        <e-column type='checkbox' width='50'></e-column>
        <e-column
          field='_id'
          :visible="false"
          :isPrimaryKey='true'
        />
        <e-column field='product' headerText='ផលិតផល' textAlign='Left' width="150"/>
        <e-column field='name' headerText='ឈ្មោះលម្អិត' textAlign='Left' width="150"/>
        <e-column field='sku' headerText='ឈ្មោះកាត់' textAlign='Left' width="150"/>
        <e-column field='price' headerText='តម្លៃ' format='C2' textAlign='Left' width="150"/>
        <e-column field='discount' headerText='ចុះតម្លៃ' textAlign='Left' width="150"/>
        <e-column field='weight' headerText='ទម្ងន់' textAlign='Left' width="150"/>
        <e-column field='createdAt' headerText='កាលបរិច្ឆេទ' format="d/M/y" type="date" textAlign='Left'/>
      </e-columns>
    </e-j-s-grid>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from "@vue/composition-api";
import DataTable from 'components/DataTable.vue';
import {deleteSku, readSku, updateSku} from "pages/setting/sku/store/sku.store";
import EJSGrid from "components/EJSGrid.vue";

export default defineComponent({
    name: "Sku.index",
    components: {DataTable, EJSGrid},
    setup(prop, context) {
      const table = ref();
      const {removeData} = deleteSku(prop, context, table);
      const {updateData} = updateSku(prop, context, table);
      const {grid_data, mapSku, showAll} = readSku(table)

      return {
        table,
        removeData,
        updateData,
        grid_data,
        mapSku,
        showAll,
      }
    }
  }
)
</script>

<style scoped>

</style>
