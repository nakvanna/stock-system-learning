<template>
  <div>
    <q-select
      v-if="validate"
      :outlined="outlined"
      :label="label?label:'Search selection'"
      :hint="hint?hint:null"
      v-model="selected_value"
      :options="Object.freeze(items)"
      :option-label="option_label?option_label:null"
      :option-value="option_value?option_value:null"
      :multiple="multi"
      :rules="multi?[ val => !!val.length || 'សូមជ្រើសរើសចន្លោះ']:[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']"
      use-input
      fill-input
      @input-value="setModel"
      :hide-selected="hide_selected"
      input-debounce="0"
      @filter="filterFn"
      emit-value
      clearable
      autocomplete="off"
      :dense="dense"
      stack-label
      :readonly="readonly"
    >
      <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
        <slot :name="slot" v-bind="props"/>
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            មិនមានទិន្នន័យ
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-select
      v-else
      :outlined="outlined"
      :label="label?label:'Search selection'"
      :hint="hint?hint:null"
      v-model="selected_value"
      :options="Object.freeze(items)"
      :option-label="option_label?option_label:null"
      :option-value="option_value?option_value:null"
      :multiple="multi"
      use-input
      fill-input
      @input-value="setModel"
      :hide-selected="hide_selected"
      input-debounce="0"
      @filter="filterFn"
      emit-value
      clearable
      autocomplete="off"
      :dense="dense"
      stack-label
      :readonly="readonly"
      class="q-ma-none q-pa-none"
    >
      <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
        <slot :name="slot" v-bind="props"/>
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            មិនមានទិន្នន័យ
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import {computed, PropType, reactive, ref} from "@vue/composition-api";
import {useQuery} from "@vue/apollo-composable";
import {DocumentNode} from "graphql";

export default {
  name: "SearchSelect",
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Boolean,
      default: true
    },
    value: {
      type: ([Object, String, Array, null] as unknown) as PropType<Object | String | Object[] | String[] | null>
    },
    option_label: {
      type: String,
    },
    option_value: {
      type: String,
    },
    label: {
      type: String,
    },
    hint: {
      type: String,
    },
    multi: {
      type: Boolean,
      default: false
    },
    hide_selected: {
      type: Boolean,
      default: false
    },
    is_autocomplete: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    query: {
      type: (Object as unknown) as PropType<DocumentNode>,
      required: true
    },
    query_name: {
      type: String,
      required: true
    },
    search_field: {
      type: String,
      required: true
    },
    group_by: {
      type: String || null,
      default: null
    }
  },
  setup(props: any, {emit}: any) {
    const selected_value = computed({
      get: () => props.value,
      set: (value) => {
        if (props.multi) {
          value == null ? emit("input", []) : emit("input", value);
        } else {
          emit("input", value)
        }
      },
    });

    const variables = reactive({
      first: 15,
      after: "",
      condition: JSON.stringify({}),
      filter: {},
      groupBy: props.group_by,
    });

    //computed
    const items = computed(function () {
      return result.value?.[props.query_name]?.edges?.map((x: any) => x.node);
    });

    const {result} = useQuery(
      props.query,
      () => variables,
      {fetchPolicy: 'no-cache',}
    );

    function filterFn(val: any, update: any,) {
      update(() => {
        const resultData: any = result.value?.[props.query_name];
        const hasResult = resultData.edges;
        const needle = val.toLowerCase()
        let condition = needle ? {[props.search_field]: {$regex: needle, $options: 'i'}} : {}
        const hasFiltered = !!Object.keys(variables.filter).length
        if (!(val && val.trim())) {
          if (hasFiltered) {
            condition = Object.assign(condition, variables.filter)
          }
          variables.condition = JSON.stringify(hasFiltered ? condition : {});
        }
        if (hasResult && (val && val.trim())) {
          if (hasFiltered) {
            condition = Object.assign(condition, variables.filter)
          }
          variables.condition = JSON.stringify((val && val.trim()) ? condition : {});
        }
      })
    }

    function setModel(val: any) {
      if (props.is_autocomplete) {
        emit('input', val)
      }
    }

    function filterSelect(condition: any) {
      variables.filter = condition;
      variables.condition = JSON.stringify(condition);
    }

    return {
      filterSelect,
      setModel,
      items,
      selected_value,
      filterFn,
    }
  }
}
</script>

<style scoped>

</style>
