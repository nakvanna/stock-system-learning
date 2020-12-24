<template>
  <q-dialog v-model="dialog_data">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="data" label="Example"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {computed, PropType, reactive, ref, watch} from "@vue/composition-api";

export default {
  name: "PopupExample",
  props: {
    value: {
      type: ([Object, String] as unknown) as PropType<any>
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any, context: any) {
    const ref_data = ref({
      data: 'ref_data'
    })
    const reactive_data = reactive({
      data: 'reactive_data'
    })
    const data = computed({
      get: () => props.value,
      set: (value) => {
        ref_data.value.data = value
        reactive_data.data = value
        context.emit('input', value)
      }
    });
    const dialog_data = computed({
      get: () => props.dialog,
      set: (value) => context.emit('update:dialog', value)
    })
    watch(ref_data.value, (value: any) => {
      console.log(value.data, 'ref')
    })
    watch(reactive_data, (value: any) => {
      console.log(value.data, 'reactive')
    })
    watch(props, (value: any) => {
      console.log('Hi')
    })
    return {
      dialog_data,
      data
    }
  }
}
</script>

<style scoped>

</style>
