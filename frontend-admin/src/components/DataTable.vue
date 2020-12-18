<template>
  <q-table
    square
    ref="table"
    class="sticky-header-table shadow-0"
    :data="Object.freeze(items)"
    :columns="columns"
    :loading="table_options.loading"
    row-key="index"
    virtual-scroll
    :virtual-scroll-item-size="48"
    :virtual-scroll-sticky-size-start="48"
    :pagination="table_options.pagination"
    :rows-per-page-options="[0]"
    dense
    separator="cell"
  >
    <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props"/>
    </template>
    <template v-slot:bottom>
      <div class="row full-width">
        <div class="q-pa-none q-ma-none q-mt-sm text-primary">ទិន្នន័យសរុប {{ totalRecord }}</div>
        <q-space/>
        <q-btn :disable="!hasNextPage" class="text-blue" flat color="blue-5" @click="loadMore"
               label="មើលទៀត"/>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive, ref} from "@vue/composition-api";
import {useQuery} from "@vue/apollo-composable";
import {DocumentNode} from "graphql";
export default defineComponent({
  name: 'DataTable',
  props: {
    query: {
      type: (Object as unknown) as PropType<DocumentNode>,
      required: true
    },
    query_name: {
      type: String,
      required: true
    },
    columns: {
      type: (Array as unknown) as PropType<Object[]>,
      required: true
    },
  },
  setup(props, {emit}) {
    const table = ref()
    const variables = reactive({
      first: 15,
      after: "",
      condition: JSON.stringify({}),
    });
    //computed
    const items = computed<any[]>(() => {
      const data = result.value?.[props.query_name]?.edges?.map(function (x: any) {
        return x.node
      });
      emit('input', data)
      return data
    });
    const {result, fetchMore, refetch} = useQuery(
      props.query,
      () => variables,
    );
    const hasNextPage = computed(
      () => result.value?.[props.query_name].pageInfo.hasNextPage
    );
    const totalRecord = computed(
      () => result.value?.[props.query_name].totalCount
    );
    const table_options = reactive({
      loading: false,
      pagination: {
        rowsPerPage: 0
      },
    });
    //read
    async function loadMore() {
      await fetchMore({
        variables: {
          after: result.value?.[props.query_name].pageInfo.endCursor
        },
        //@ts-ignore
        updateQuery: (previousResult: any, {fetchMoreResult}) => {
          const newEdges = fetchMoreResult?.[props.query_name].edges;
          const pageInfo = fetchMoreResult?.[props.query_name].pageInfo;
          return newEdges.length
            ? {
              ...previousResult,
              [props.query_name]: {
                ...previousResult?.[props.query_name],
                // Concat edges
                edges: [
                  ...previousResult?.[props.query_name].edges,
                  ...newEdges
                ],
                // Override with new pageInfo
                pageInfo
              }
            }
            : previousResult;
        }
      });
      setTimeout(function () {
        table.value.scrollTo(items.value.length - 1);
      }, 100);
    }
    function filterTable(condition: any) {
      variables.condition = JSON.stringify(condition)
    }
    return {
      table,
      refetch,
      variables,
      table_options,
      items,
      loadMore,
      hasNextPage,
      totalRecord,
      filterTable
    };
  }
})
</script>
