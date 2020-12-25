<!--<template>-->
<!--  <div>-->
<!--    <data-table-->
<!--      ref="table"-->
<!--      :columns="table_options.columns"-->
<!--      :query="table_options.query"-->
<!--      query_name="brands"-->
<!--    >-->
<!--      <template v-slot:top>-->
<!--        <div class="row full-width">-->
<!--          <q-space/>-->
<!--          <q-btn flat round dense icon="add" @click="dialog = true"/>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template v-slot:body-cell-_id="props">-->
<!--        <q-td auto-width :props="props">-->
<!--          <q-btn @click="updateData(props.value, 'status', false)" size="10px" color="red-5" round flat icon="delete"/>-->
<!--        </q-td>-->
<!--      </template>-->
<!--      <template v-slot:body-cell-name="props">-->
<!--        <q-td :props="props">-->
<!--          {{ props.value }}-->
<!--          <q-popup-edit v-model="props.value">-->
<!--            <q-input-->
<!--              v-model="props.value"-->
<!--              @keyup.enter="updateData(props.row._id, 'name', props.value)"-->
<!--              dense autofocus-->
<!--            />-->
<!--          </q-popup-edit>-->
<!--        </q-td>-->
<!--      </template>-->
<!--    </data-table>-->
<!--    <brand-create v-model="dialog" @on-success="table.refetch()"></brand-create>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {defineComponent, ref} from "@vue/composition-api";-->
<!--import DataTable from 'components/DataTable.vue';-->
<!--import BrandCreate from "./Brand.create.vue";-->

<!--export default defineComponent({-->
<!--    name: "Brand.index",-->
<!--    components: {DataTable, BrandCreate},-->
<!--    setup(prop, context) {-->
<!--      const table = ref();-->
<!--      const dialog = ref();-->
<!--      const {table_options} = readBrands(table);-->
<!--      const {updateData} = updateBrand(prop, context, table);-->
<!--      return {-->
<!--        table,-->
<!--        table_options,-->
<!--        dialog,-->
<!--        updateData,-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--)-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
