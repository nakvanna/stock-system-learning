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
              label="ឈ្មោះប្រភេទ"
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
import {computed, ref} from "@vue/composition-api";
import {createGlobal} from "pages/global.store";
import {create_category_graphql} from "pages/setting/sub-setting/category/graphql/create-category.graphql";
import {CategoryModel} from "pages/setting/sub-setting/category/model/category.model";

export default {
  name: "Category.create",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any, context: any) {
    const create_data = ref<CategoryModel>({});
    const isShow = computed({
      get: () => props.value,
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

    const {create} = createGlobal(context, mapped, create_category_graphql);

    return {
      isShow,
      create_data,
      create,
    }
  }
}
</script>

<style scoped>

</style>
