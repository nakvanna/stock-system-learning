<template>
  <q-page>
    {{ variant_options }}
    <!--    {{ variants }}-->
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="table_option.data"
        :columns="variants"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
        :rows-per-page-options="[0]"
      />

      <div class="q-mt-md">
        Selected: {{ JSON.stringify(selected) }}
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {selected_product} from "./store/product.store";
import {computed, reactive, ref} from "@vue/composition-api";

export default {
  name: "ProductListCreate",
  setup() {
    const selected = ref([]);
    const test_data = ref([]);
    const table_option = reactive({
      columns: [
        {name: "_id", field: "_id", align: "left"},
        {
          name: "name",
          label: "Brand",
          field: "name",
          sortable: true,
          align: "left"
        }
      ],

      data: [
        {
          size: 'A',
          color: 'ក',
        }, {
          size: 'A',
          color: 'ខ',
        }, {
          size: 'A',
          color: 'គ',
        }, {
          size: 'B',
          color: 'ក',
        }, {
          size: 'B',
          color: 'ខ',
        }, {
          size: 'B',
          color: 'គ',
        }, {
          size: 'C',
          color: 'ក',
        }, {
          size: 'C',
          color: 'ខ',
        }, {
          size: 'C',
          color: 'គ',
        },
      ]
    });

    const variants = computed(() => {
      return selected_product.value.variant.map((m: any) => {
        return {field: m.name.toLowerCase(), label: m.name, align: "left"}
      })
    })

    const variant_options = computed(() => {
      return selected_product.value.variant.map((m: any) => {
        return m.variant_option
      })
    })

    function getSelectedString() {
      return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${table_option.data.length}`
    }

    return {
      selected_product,
      table_option,
      selected,
      getSelectedString,
      variants,
      variant_options
    }
  }
}
</script>

<style scoped>

</style>
