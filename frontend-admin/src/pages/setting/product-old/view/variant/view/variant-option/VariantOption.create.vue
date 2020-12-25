<template>
  <q-dialog transition-show="slide-down"
            transition-hide="slide-down"
            v-model="isShow"
            persistent
  >
    <q-card>
      <q-card-section class="q-pt-none">
        <q-form
          @submit="createData"
        >
          <div class="row">
            <tag-input label="Variant option" v-model="create_data.temp_name"/>
          </div>
          <div class="row q-mt-md">
            <q-btn rounded flat class="bg-blue-1" color="primary" type="submit"
                   label="រក្សាទុក"/>
            <q-space/>
            <q-btn rounded flat class="bg-transparent" color="negative" label="បិទ" v-close-popup/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {computed, ref} from "@vue/composition-api";
import TagInput from "components/TagInput.vue";
import {createVariantOption} from "./store/variant-option.store";

export default {
  name: "VariantOptionCreate",
  components: {TagInput},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    variant_id: {
      type: String
    }
  },
  setup(prop: any, context: any) {
    const dialog = ref(false);
    const isShow = computed({
      get: () => prop.value,
      set: (value) => {
        context.emit("input", value);
      },
    });

    const {create_data, createData, mapped} = createVariantOption(prop, context)

    return {
      dialog,
      isShow,
      create_data,
      createData,
      mapped
    }
  }
}
</script>

<style scoped>

</style>
