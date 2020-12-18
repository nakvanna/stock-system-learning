<template>
  <ejs-grid
    ref="grid"
    height=500
    :rowHeight=55
    :allowResizing='true'
    :rowSelected='rowSelectEvent'
    :rowDeselected="rowSelectEvent"
    :dataSource="items"
    :enableHover="false"
    :toolbar='is_search?gridOption.toolbar:null'
    :allowFiltering='true'
    :filterSettings='gridOption.filterSettings'
    :allowSorting='true'
    :detailTemplate='detail_template'
    :allowGrouping='is_group'
    :selectionSettings='gridOption.selectionOptions'
    :enableVirtualization=true
  >
    <slot/>
  </ejs-grid>
</template>

<script lang="ts">
import {computed, onMounted, PropType, reactive, ref, watch} from "@vue/composition-api";
import {
  Aggregate,
  DetailRow,
  Filter,
  GridPlugin,
  Group,
  Resize,
  Sort,
  Toolbar,
  VirtualScroll
} from "@syncfusion/ej2-vue-grids";
import Vue from "vue";
import {DocumentNode} from "graphql";
import {useQuery} from "@vue/apollo-composable";

Vue.use(GridPlugin);
export default {
  name: 'EJSGrid',
  props: {
    query: {
      type: (Object as unknown) as PropType<DocumentNode>,
      required: true
    },
    query_name: {
      type: String,
      required: true
    },
    is_selection: {
      type: Boolean,
      default: true
    },
    is_group: {
      type: Boolean,
      default: false
    },
    is_search: {
      type: Boolean,
      default: false
    },
    value: {
      type: ([Array, null] as unknown) as PropType<Object[] | null>,
      default: null
    },
    detail_template: {
      type: ([Function, null] as unknown) as PropType<Function | null>,
      default: null
    },
    pre_map: {
      type: (Function as unknown) as PropType<Function>,
      required: true
    },
  },
  setup(props: any, {emit, root}: any) {
    //ref or reactive
    const grid = ref()
    const gridOption = reactive({
      toolbar: ["Search"],
      selectionOptions: {persistSelection: true},
      filterSettings: {type: 'Excel'}
    })
    const variables = reactive({
      first: 15,
      after: "",
      condition: JSON.stringify({}),
      isLimit: true,
    });
    //computed
    const selected = computed({
      get: function () {
        return props.value
      },
      set: function (value) {
        emit('input', value)
      }
    })
    //function
    const rowSelectEvent = () => {
      selected.value = grid.value.getSelectedRecords();
    };
    const {result, refetch, loading} = useQuery(
      props.query,
      () => variables,
    );
    const total_record = computed(
      () => result.value?.[props.query_name].totalCount
    );
    const filterTable = (condition: any, first: number = 15, isLimit: boolean = true) => {
      variables.condition = JSON.stringify(condition)
      variables.first = first
      variables.isLimit = isLimit
    };
    const clearSelect = () => {
      grid.value.clearSelection()
      selected.value = []
    }
    onMounted(function () {
      clearSelect()
      setTimeout(() => refetch(), 100)
    })
    //watch
    watch(loading, (value) => {
      if (value) {
        root.$q.loading.show({
          message: 'កំពុងទាញយកទិន្នន័យមកប្រើប្រាស់'
        })
      } else {
        root.$q.loading.hide()
      }
    })
    //computed
    const items = computed<any[]>(() => {
      const data = result.value?.[props.query_name]?.edges?.map(props.pre_map)
      emit('update:record_value', {total_item: data?.length, total_record: total_record.value + 1})
      return data
    });
    return {
      //ref or reactive
      grid,
      selected,
      gridOption,
      //computed
      items,
      //function
      rowSelectEvent,
      filterTable,
      refetch,
      clearSelect
    };
  },
  provide: {
    grid: [VirtualScroll, Filter, Sort, Toolbar, Resize, DetailRow, Group, Aggregate]
  },
}
</script>
<style scoped>
@import "../css/syncfusion/material.css";
</style>
