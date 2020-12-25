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
          to="/product-view"/>
        <q-btn
          :disable="grid_data.selected.length!==1"
          color="blue-5"
          flat round size="12px"
          icon="fas fa-list"
          to="/list-create"/>
        <q-btn flat round size="12px" icon="add" @click="dialog = true"/>
        <div class="q-pt-sm text-subtitle2 text-secondary">
          ទិន្នន័យសរុប {{ grid_data.record_value.total_record - 1 }} ទិន្នន័យបានទាញយក
          {{ grid_data.record_value.total_item }}
        </div>
      </div>
    </div>
    <e-j-s-grid
      ref="table"
      v-model="grid_data.selected"
      :query="grid_data.query.products"
      query_name="products"
      :pre_map="mapProduct"
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
        <e-column field='category' headerText='ប្រភេទ' textAlign='Left' width="150"/>
        <e-column field='sub_category' headerText='ប្រភេទរង' textAlign='Left' width="150"/>
        <e-column field='brand' headerText='ម៉ូដ' textAlign='Left' width="150"/>
        <e-column field='name' headerText='ឈ្មោះទំនិញ' textAlign='Left' width="150"/>
        <e-column field='description' headerText='ចំណាំ' textAlign='Left' width="150"/>
        <e-column field='createdAt' headerText='កាលបរិច្ឆេទ' format="d/M/y" type="date" textAlign='Left'/>
      </e-columns>
    </e-j-s-grid>
    <product-create v-model="dialog" @on-success="table.refetch()"/>
  </q-page>
</template>

<script lang="ts">
import {ref} from "@vue/composition-api";
import ProductCreate from './Product.create.vue';
import {readProduct} from "./store/product.store";
import EJSGrid from "components/EJSGrid.vue";

export default {
  name: "Product.index",
  components: {ProductCreate, EJSGrid},
  setup(props: any, context: any) {
    const table = ref();
    const dialog = ref();
    const {grid_data, mapProduct, showAll} = readProduct(table)
    return {
      dialog,
      table,
      mapProduct,
      grid_data,
      showAll
    }
  }
}
</script>

<style scoped>

</style>
