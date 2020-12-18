<template>
  <div>
    <data-table
      ref="table"
      :columns="table_options.columns"
      :query="table_options.query"
      query_name="categories"
    >
      <template v-slot:top>
        <div class="row full-width">
          <q-space/>
          <q-btn flat round dense icon="add" @click="dialog.category_create =  true"/>
        </div>
      </template>
      <template v-slot:body-cell-_id="props">
        <q-td auto-width :props="props">
          <q-btn @click="updateData(props.value, 'status', false)" size="10px" color="red-5" round flat icon="delete"/>
        </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          {{ props.value }}
          <q-popup-edit v-model="props.value">
            <q-input
              v-model="props.value"
              @keyup.enter="updateData(props.row._id, 'name', props.value)"
              dense autofocus
            />
          </q-popup-edit>
        </q-td>
      </template>
    </data-table>
    <category-create v-model="dialog.category_create" @on-success="table.refetch()"></category-create>
  </div>
</template>

<script lang="ts">
import {reactive, ref} from "@vue/composition-api";
import DataTable from 'components/DataTable.vue';
import CategoryCreate from './Category.create.vue';
import {deleteCategory, readCategories, updateCategory,} from "pages/setting/sub-setting/category/store/category.store";

export default {
  name: "Category.index",
  components: {DataTable, CategoryCreate},
  setup(props: any, context: any) {
    const table = ref();
    const dialog = reactive({
      category_create: false
    });
    const {table_options} = readCategories(table);
    const {removeData} = deleteCategory(props, context, table);
    const {updateData} = updateCategory(props, context, table);
    return {
      table,
      table_options,
      dialog,
      updateData,
      removeData,
    }
  }
}
</script>

<style scoped>

</style>
