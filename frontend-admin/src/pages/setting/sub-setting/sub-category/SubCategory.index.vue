<template>
  <div>
    <data-table
      ref="table"
      :columns="table_options.columns"
      :query="table_options.query"
      query_name="sub_categories"
    >
      <template v-slot:top>
        <div class="row full-width">
          <q-space/>
          <q-btn flat round dense icon="add" @click="dialog = true"/>
        </div>
      </template>
      <template v-slot:body-cell-_id="props">
        <q-td auto-width :props="props">
          <q-btn @click="updateData(props.value, 'status', false)" size="10px" color="red-5" round flat icon="delete"/>
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td :props="props">
          {{ props.value }}
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
    <sub-category-create v-model="dialog" @on-success="table.refetch()"></sub-category-create>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "@vue/composition-api";
import DataTable from 'components/DataTable.vue';
import SubCategoryCreate from './SubCategory.create.vue'
import {
  deleteSubCategory,
  readSubCategories,
  updateSubCategory
} from "pages/setting/sub-setting/sub-category/store/sub-category.store";

export default defineComponent({
    name: "SubCategory.index",
    components: {DataTable, SubCategoryCreate},
    setup(prop, context) {
      const table = ref();
      const dialog = ref();
      const {table_options} = readSubCategories(table);
      const {removeData} = deleteSubCategory(prop, context, table);
      const {updateData} = updateSubCategory(prop, context, table);
      return {
        table,
        table_options,
        dialog,
        removeData,
        updateData,
      }
    }
  }
)
</script>

<style scoped>

</style>
