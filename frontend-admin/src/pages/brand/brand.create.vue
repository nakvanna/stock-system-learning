<template>
  <q-dialog transition-show="slide-down"
            transition-hide="slide-down"
            v-model="isShow"
            persistent
  >
    <q-card>
      <q-card-section class="q-pt-none">
        <q-form
          @submit="create"
        >
          <div class="row">
            <q-input
              class="full-width"
              v-model="create_data.name"
              label="ឈ្មោះខេត្ត"
              hint="បំពេញឈ្មោះ"
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
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
import {computed, defineComponent, ref} from "@vue/composition-api";
import {BrandModel} from "./model/brand.model";
import {createGlobal} from "pages/global.store";
import {create_brand_graphql} from "pages/brand/graphql/create-brand.graphql";

export default defineComponent({
  name: "brand.create",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, context){
    const dialog = ref(false);
    const create_data = ref<BrandModel>({})
    const isShow = computed({
      get: () => prop.value,
      set: (value) => {
        context.emit("input", value);
      },
    });

    //Mapped to field
    const mapped = computed(function () {
      return {
        ...create_data.value,
      }
    });

    //Create apollo
    const {create} = createGlobal(context, mapped, create_brand_graphql)

    return {
      dialog,
      isShow,
      create_data,
      create,
    }
  }
})
</script>

<style scoped>

</style>
