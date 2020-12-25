<template>
  <q-page>
    {{ create_data }}
    <div class="row q-pa-md q-gutter-lg">
      <span class="text-h6 text-bold">បន្ថែមទំនិញថ្មី</span>
      <q-space/>
      <q-btn outline icon="fas fa-arrow-alt-circle-left"/>
    </div>
    <q-separator/>
    <div class="row">
      <div class="col-8">
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <q-form
                @submit=""
              >
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
                    class="full-width"
                    v-model="create_data.name"
                    label="ចំណងជើង"
                    hint="បំពេញឈ្មោះ"
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </div>
                <div class="row q-mt-md">
                  <strong>ពណ៌នា</strong>
                  <q-editor
                    class="full-width" :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                  ['bold', 'italic', 'strike', 'underline'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]"
                    toolbar-outline v-model="create_data.description"
                    min-height="5rem"/>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-pa-md">
          <q-card style="height: 100px;min-width: 100%">
            <q-card-section>
              <strong>Media</strong>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <strong>Variants</strong>
              <div class="row q-gutter-sm">
                <q-checkbox v-model="is_variant" label="តើទំនិញនេះមានជម្រើសច្រើនមែនទ?"/>
                <q-space/>
                <q-btn v-if="is_variant" flat round dense icon="add" @click="plus"/>
              </div>
              <div v-if="is_variant" :key="index" v-for="(item, index) in create_data.create_variant_input"
                   class="row q-mt-md">
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
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-4">
        <div class="row q-pa-md">
          <q-card style="min-width: 100%">
            <q-card-section>
              <strong>Other</strong>
              <div class="row q-mt-md">
                <q-select
                  outlined dense
                  class="full-width"
                  v-model="create_data.product_status"
                  :options="['Draft', 'Active']"
                  label="Status"
                />
              </div>
              <div class="row q-mt-md">
                <tag-input
                  class="full-width"
                  dense outlined
                  label="Tags"
                  :value="['Good', 'High Rate']"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="full-width">
        <q-card style="min-width: 100%">
          <q-card-section>
            <strong>Other</strong>
            <table style="border: #1D1D1D solid 1px"
                   class="q-table q-table--cell-separator">
              <tr>
                <th class="text-left">
                  Variant
                </th>
                <th class="text-left">
                  SKU
                </th>
                <th class="text-left">
                  Price
                </th>
                <th class="text-left">
                  Barcode
                </th>
                <th></th>
              </tr>
              <tr
                :key="option_index"
                v-for="(option, option_index)
                in matrix"
              >
                <td class="text-secondary">
                  {{ option }}
                </td>
                <td class="text-secondary">
                  SKU
                </td>
                <td class="text-secondary">
                  Price
                </td>
                <td class="text-secondary">
                  Barcode
                </td>
                <td class="text-negative">
                  <q-btn flat round icon="fas fa-trash-alt"/>
                </td>
              </tr>
            </table>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">

import SearchSelect from "components/SearchSelect.vue";
import {computed, reactive, ref, watch} from "@vue/composition-api";
import {createProduct} from "pages/setting/product-old/store/product.store";
import {category_graphql} from "pages/setting/sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {brand_graphql} from "pages/setting/sub-setting/brand/graphql/brand.graphql";
import TagInput from "components/TagInput.vue";

export default {
  name: "Product.create",
  components: {TagInput, SearchSelect},
  setup(props: any, context: any) {
    const is_variant = ref(false);
    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      brands: brand_graphql,
    });

    const sub_category_condition = reactive({
      filter: {
        category_id: {
          $eq: null
        }
      }
    });

    const matrix = computed(() => {
      let result = [];
      const variant = create_data.value.create_variant_input;
      if (variant?.length === 1) {// @ts-ignore
        result = variant[0].create_variant_option_input
      } else if (variant?.length === 2) {
        //@ts-ignore
        const variant1 = variant[0].create_variant_option_input;
        //@ts-ignore
        const variant2 = variant[1].create_variant_option_input;
        // @ts-ignore
        for (let i = 0; i < variant1?.length; i++) {
          for (let j = 0; j < variant2?.length; j++) {
            // @ts-ignore
            result.push(variant1[i] + '/' + variant2[j])
          }
        }
      } else {
        //@ts-ignore
        const variant1 = variant[0].create_variant_option_input;
        //@ts-ignore
        const variant2 = variant[1].create_variant_option_input;
        //@ts-ignore
        const variant3 = variant[2].create_variant_option_input;
        // @ts-ignore
        for (let i = 0; i < variant1?.length; i++) {
          for (let j = 0; j < variant2?.length; j++) {
            for (let k = 0; k < variant3?.length; k++) {
              // @ts-ignore
              result.push(variant1[i] + '/' + variant2[j] + '/' + variant3[k])
            }
          }
        }
      }
      return result;
    })

    watch(is_variant, (val: any) => {
      if (is_variant.value === false) {
        create_data.value.create_variant_input = [{create_variant_option_input: []}]
      }
    })

    function plus() {
      //@ts-ignore
      if (create_data?.value?.create_variant_input?.length < 3) {
        create_data?.value?.create_variant_input?.push({product_id: '', name: '', create_variant_option_input: []})
      }
    }

    function minus(index: number) {
      //@ts-ignore
      if (create_data?.value?.create_variant_input?.length > 1) {
        create_data?.value?.create_variant_input?.splice(index, 1)
      } else {
        is_variant.value = false;
      }
    }

    function removeSku(index: number) {

    }

    const {create_data, createData, mapped} = createProduct(props, context);

    return {
      query,
      sub_category_condition,
      create_data,
      is_variant,
      plus, minus,
      matrix,
    }
  }
}
</script>

<style scoped>

</style>
