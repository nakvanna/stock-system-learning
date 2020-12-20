<template>
  <q-dialog
    transition-show="slide-down"
    transition-hide="slide-down"
    v-model="isShow"
    persistent
  >
    <q-card style="min-width: 750px">
      <q-card-section class="q-pt-md">
        <q-form
          @submit="createVariantData"
        >
          <div class="q-pa-md bg-grey-3">
            <div class="row">
              <span class="text-h6">Variants</span>
              <q-space/>
              <q-btn flat round dense icon="add" @click="plus"/>
            </div>
            <q-separator/>
            <div :key="index" v-for="(item, index) in create_data" class="row q-mt-md">
              <q-input
                outlined
                dense
                class="col-4"
                v-model="item.name"
                label="ឈ្មោះជម្រើស"
                hint="ឧទារហ៍ Color"
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <tag-input
                class="col-8 q-pl-xs"
                dense outlined
                label="តម្លៃជម្រើស"
                v-model="item.create_variant_option_input"
              >
                <q-btn
                  size="10px" round
                  icon="delete"
                  color="red-4" flat
                  @click="minus(index)"
                />
              </tag-input>
            </div>
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
import {createVariant} from "./store/variant.store";

export default {
  name: "VariantCreate",
  components: {TagInput},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    product_id: {
      type: String,
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

    function plus() {
      create_data.value.push({name: "", create_variant_option_input: []})
    }

    function minus(index: number) {
      if (create_data.value.length > 1) {
        create_data.value.splice(index, 1)
      }
    }

    const {create_data, createVariantData, mapped} = createVariant(prop, context);

    return {
      plus,
      minus,
      dialog,
      isShow,
      create_data,
      createVariantData,
      mapped
    }
  }
}
</script>

<style scoped>

</style>
