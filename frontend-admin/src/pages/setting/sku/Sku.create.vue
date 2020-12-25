<template>
  <q-page class="q-px-xs">
    <q-card square>
      <q-card-section class="q-pb-none">
        <div class="row">
          <q-tabs
            dense
            align="left"
            inline-label
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-route-tab to="/sku-create" label="បន្ថែម"/>
          </q-tabs>
          <q-space/>
          <!--Right Tab-->
          <q-tabs
            dense
            align="left"
            inline-label
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-route-tab to="/settings/sku" icon="fas fa-arrow-alt-circle-left"/>
          </q-tabs>
        </div>
        <q-card style="min-width: 650px">
          <q-card-section class="q-mb-lg">
            <q-form
              @submit="createData"
            >
              <div>
                <div align="center">
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
                  <!--                  <search-select
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
                                      v-model="product_condition.filter.sub_category_id.$eq"
                                      label="ប្រភេទរង"
                                      hint="ជ្រើសរើសប្រភេទរង"
                                      option_label="name"
                                      :query="query.sub_categories"
                                      query_name="sub_categories"
                                      :hide_selected="true"
                                      search_field="name"
                                      ref="sub_cate_ref"
                                    />-->
                  <search-select
                    dense
                    use-chips
                    outlined
                    class="col-4"
                    v-model="create_data.product_id"
                    label="ទំនិញ"
                    hint="ជ្រើសរើសទំនិញ"
                    option_label="name"
                    :query="query.products"
                    query_name="products"
                    :hide_selected="true"
                    search_field="name"
                    ref="product_ref"
                    @input="create_data.create_product_option_input = []"
                  />
                </div>

                <q-slide-transition :duration="1000">
                  <div class="q-pa-xs" v-if="create_data.product_id">
                    <span v-if="!create_data.product_id.variant" class="text-h6">Variants</span>
                    <div class="row q-pa-xs bg-grey-3" :key="index"
                         v-for="(item, index) in create_data.product_id.variant">
                      <q-select
                        class="full-width"
                        dense outlined
                        v-model="create_data.create_product_option_input[index]"
                        :options="item.variant_option"
                        :label="item.name"
                        :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                      />
                    </div>
                  </div>
                </q-slide-transition>

                <div class="row">
                  <q-input
                    class="full-width q-pt-xs"
                    outlined
                    dense
                    v-model="create_data.name"
                    label="កំណត់ឈ្មោះលម្អិត"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </div>
                <div class="row">
                  <q-input
                    outlined
                    class="col-4"
                    dense
                    v-model="create_data.sku"
                    label="SKU"
                    hint="ឧទារហ៍ JB-SM-Black"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                  <q-input
                    outlined
                    class="col-4 q-pl-xs"
                    dense
                    type="number"
                    v-model.number="create_data.weight"
                    label="ទម្ងន់"
                    hint="ឧទារហ៍ 0.5"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                  <q-input
                    outlined
                    class="col-4 q-pl-xs"
                    dense
                    type="number"
                    v-model.number="create_data.price"
                    label="តម្លៃ"
                    hint="ឧទារហ៍ 25"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </div>
              </div>
              <div class="row q-mt-md">
                <q-btn rounded flat class="bg-blue-1" color="primary" type="submit"
                       label="រក្សាទុក"/>
                <q-space/>
                <q-btn rounded flat class="bg-transparent" color="negative" label="បិទ" to="/settings/sku"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
        <q-separator/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from "@vue/composition-api";
import SearchSelect from "components/SearchSelect.vue";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {product_graphql} from "pages/setting/product-old/graphql/product.graphql";
import {createSku} from "pages/setting/sku/store/sku.store";
import ImageCropper from "components/ImageCropper.vue";

export default defineComponent({
  name: "SkuCreate",
  components: {ImageCropper, SearchSelect},
  setup(prop, context) {
    const isImgPicker = ref(false)
    const sub_cate_ref = ref();
    const product_ref = ref();
    const sub_category_condition = reactive({
      filter: {
        category_id: {
          $eq: null
        }
      }
    });
    const product_condition = reactive({
      filter: {
        sub_category_id: {
          $eq: null
        }
      }
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
    const filter_product = computed(() => {
      const copy = Object.assign({}, JSON.parse(JSON.stringify(product_condition.filter)));
      if (copy.sub_category_id.$eq == null) {
        delete copy.sub_category_id
      } else {
        // @ts-ignore
        copy.sub_category_id.$eq = copy.sub_category_id.$eq?._id
      }
      return copy;
    })

    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      products: product_graphql,
    });

    watch(() => filter_sub_category.value, (val) => {
      sub_cate_ref.value.filterSelect(val)
    });
    watch(() => filter_product.value, (val) => {
      product_ref.value.filterSelect(val)
    });

    const {create_data, createData} = createSku(prop, context);

    return {
      create_data,
      createData,
      query,
      sub_category_condition,
      product_condition,
      filter_sub_category,
      filter_product,
      sub_cate_ref,
      product_ref,
      isImgPicker
    }
  }
})
</script>

<style scoped>

</style>
