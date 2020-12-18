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
            <search-select
              v-model="create_data.category"
              label="ប្រភេទ"
              hint="ជ្រើសរើសប្រភេទ"
              option_label="name"
              :query="query.categories"
              query_name="categories"
              :hide_selected="true"
              search_field="name"
            />
          </div>
          <div class="row">
            <q-input
              class="full-width"
              v-model="create_data.name"
              label="ឈ្មោះប្រភេទរង"
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
import {computed, defineComponent, reactive, ref} from "@vue/composition-api";
import {createSubCategory} from "pages/setting/sub-setting/sub-category/store/sub-category.store";
import SearchSelect from "components/SearchSelect.vue";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";

export default defineComponent({
  name: "SubCategory.create",
  components: {SearchSelect},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, context){
    const dialog = ref(false);
    const isShow = computed({
      get: () => prop.value,
      set: (value) => {
        context.emit("input", value);
      },
    });
    const query = reactive({
      categories: category_graphql
    })

    const {create_data, createData} = createSubCategory(prop, context);

    return {
      dialog,
      isShow,
      query,
      create_data,
      createData,
    }
  }
})
</script>

<style scoped>

</style>
