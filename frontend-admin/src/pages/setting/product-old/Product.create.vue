<template>
  <q-dialog transition-show="slide-down"
            transition-hide="slide-down"
            v-model="isShow"
            persistent
  >
    <q-card style="min-width: 750px">
      <q-card-section class="q-pt-none">
        <q-form
          @submit="createData"
        >
          <div>
            <div align="center" class="q-pt-md">
              <q-avatar @click="isImgPicker = true" size="125px" class="shadow-3 cursor-pointer">
                <q-img :src="create_data.thumbnail"/>
              </q-avatar>
              <image-cropper
                :uploaded.sync="create_data.thumbnail"
                v-model="isImgPicker"
                :img-src="create_data.thumbnail"
              />
            </div>
            <div class="row q-mt-md">
              <search-select
                class="col-4"
                dense
                outlined
                label="ប្រភេទ"
                v-model="sub_category_condition.filter.category_id.$eq"
                hint="ជ្រើសរើសប្រភេទ"
                option_label="name"
                :query="query.categories"
                query_name="categories"
                :hide_selected="true"
                search_field="name"
              />
              <search-select
                dense
                outlined
                class="col-4 q-pl-xs"
                v-model="create_data.sub_category_id"
                label="ប្រភេទរង"
                hint="ជ្រើសរើសប្រភេទរង"
                option_label="name"
                :query="query.sub_categories"
                query_name="sub_categories"
                :hide_selected="true"
                search_field="name"
                ref="sub_cate"
              />
              <search-select
                dense
                outlined
                class="col-4 q-pl-xs"
                v-model="create_data.brand_id"
                label="ម៉ូដ"
                hint="ជ្រើសរើសម៉ូដ"
                option_label="name"
                :query="query.brands"
                query_name="brands"
                :hide_selected="true"
                search_field="name"
              />
            </div>
            <div class="row q-mt-md">
              <q-input
                outlined
                dense
                class="col-6"
                v-model="create_data.name"
                label="ឈ្មោះម៉ូដ"
                hint="បំពេញឈ្មោះ"
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                outlined
                dense
                class="col-6 q-pl-xs"
                v-model="create_data.slug"
                label="ឈ្មោះម៉ូដ"
                hint="បំពេញឈ្មោះ"
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-mt-md">
              <q-input
                outlined
                dense
                type="textarea"
                rows="2"
                class="full-width"
                v-model="create_data.description"
                label="ចំណាំ"
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
          </div>

          <div class="q-pa-md bg-grey-3">
            <div class="row">
              <span class="text-h6">Variants</span>
              <q-space/>
              <q-btn flat round dense icon="add" @click="plus"/>
            </div>
            <q-separator/>
            <div :key="index" v-for="(item, index) in create_data.create_variant_input" class="row q-mt-md">
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
          <q-separator class="q-mt-lg"/>
          <div class="row q-mt-md">
            <q-btn rounded flat class="bg-blue-1" color="primary" type="submit"
                   label="រក្សាទុក"/>
            <q-space/>
            <q-btn rounded flat class="bg-transparent" color="negative" label="បិទ" v-close-popup/>
          </div>
        </q-form>
        <!--        {{ mapped }}-->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {computed, reactive, ref, watch} from "@vue/composition-api";
import {createProduct} from "./store/product.store";
import SearchSelect from "components/SearchSelect.vue";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {brand_graphql} from "pages/setting/sub-setting/brand/graphql/brand.graphql";
import ImageCropper from "components/ImageCropper.vue";
import TagInput from "components/TagInput.vue";

export default {
  name: "Product.create",
  components: {TagInput, SearchSelect, ImageCropper},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any, context: any) {
    const dialog = ref(false);
    const isImgPicker = ref(false)
    const sub_cate = ref();
    const sub_category_condition = reactive({
      filter: {
        category_id: {
          $eq: null
        }
      }
    });
    const isShow = computed({
      get: () => props.value,
      set: (value) => {
        context.emit("input", value);
      },
    });
    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      brands: brand_graphql,
    });

    const filter_sub_category = computed(() => {
      const copy = Object.assign({}, JSON.parse(JSON.stringify(sub_category_condition.filter)));
      if (copy.category_id.$eq == null) {
        delete copy.category_id
      } else {
        // @ts-ignore
        copy.category_id.$eq = copy.category_id.$eq?._id
      }
      return copy;
    })

    function plus() {
      create_data?.value?.create_variant_input?.push({product_id: '', name: '', create_variant_option_input: []})
    }

    function minus(index: number) {
      create_data?.value?.create_variant_input?.splice(index, 1)
    }

    watch(() => filter_sub_category.value, (val) => {
      sub_cate.value.filterSelect(val)
    });

    const {create_data, createData, mapped} = createProduct(props, context);

    return {
      dialog,
      isShow,
      query,
      create_data,
      createData,
      sub_category_condition,
      sub_cate,
      filter_sub_category,
      plus,
      minus,
      mapped,
      isImgPicker
    }
  }
}
</script>

<style scoped>

</style>
