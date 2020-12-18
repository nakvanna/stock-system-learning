<template>
  <div>
    <q-select
        v-if="validate"
        :dense="dense"
        :outlined="outlined"
        :hint="hint?hint:null"
        :label="label"
        v-model="select"
        :rules="[ val => !!val.length || 'សូមជ្រើសរើសចន្លោះ']"
        autocomplete="off"
        :readonly="readonly"
        class="q-ma-none q-pa-none"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        @new-value="createValue"
        @keyup.enter.stop
    >
      <template v-slot:after>
        <slot></slot>
      </template>
    </q-select>
    <q-select
        v-else
        :dense="dense"
        :outlined="outlined"
        :hint="hint?hint:null"
        :label="label"
        v-model="select"
        autocomplete="off"
        :readonly="readonly"
        class="q-ma-none q-pa-none"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        @new-value="createValue"
        @keyup.enter.stop
    >
      <template v-slot:after>
        <slot></slot>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import {computed, PropType} from "@vue/composition-api";

export default {
  name: "TagInput",
  props: {
    value: {
      type: (Array as unknown) as PropType<any>
    },
    label: {
      type: String,
      required: true
    },
    hint: {
      type: String,
    },
    validate: {
      type: Boolean,
      default: true
    },
    readonly: {
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
    }
  },
  setup(props: any, {emit}: any) {
    const select = computed({
      get: () => props.value,
      set: (value) => {
        emit('input', value)
      }
    })
    //function
    const createValue = (val: any, done: any) => done(val, 'add-unique');
    return {
      select,
      //function
      createValue
    }
  }
}
</script>

<style scoped>

</style>
