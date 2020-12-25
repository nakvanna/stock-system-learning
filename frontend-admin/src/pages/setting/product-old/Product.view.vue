<template>
  <div>
    <q-page class="q-px-xs">
      <q-card square>
        <q-card-section class="q-pb-none">
          <div class="row">
            <!--Left Tab-->
            <q-tabs
              dense
              v-model="tab"
              align="left"
              inline-label
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
            >
              <q-tab name="product-view" label="បង្ហាញទំនិញ"/>
              <q-tab name="variant-option" label="បង្ហាញជម្រើស"/>
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
              <q-route-tab to="/settings" icon="fas fa-arrow-alt-circle-left" exact/>
            </q-tabs>
          </div>
          <q-separator/>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="product-view">
              <table class="q-table q-table--cell-separator">
                <tr>
                  <th class="text-left"></th>
                  <th class="text-left">ឈ្មោះទំនិញ</th>
                  <th class="text-left">ឈ្មោះ Slug</th>
                  <th class="text-left">ចំណាំ</th>
                </tr>
                <tr>
                  <td class="text-right text-blue-5 text-bold" style="width: 150px">
                    <div class="column q-ma-sm">
                      <q-avatar @click="isImgPicker = true" size="70px" class="shadow-3 cursor-pointer">
                        <q-img :src="selected_product.thumbnail"/>
                      </q-avatar>
                      <image-cropper :uploaded.sync="selected_product.thumbnail" v-model="isImgPicker"
                                     :img-src="selected_product.thumbnail"/>
                      <div class="text-right">
                        <q-btn @click="updateData(selected_product._id,'profile',selected_product.profile)" icon="save"
                               size="10px" dense
                               flat color="orange-4" rounded/>
                      </div>
                    </div>
                  </td>
                  <td class="text-secondary">
                    {{ selected_product.name }}
                    <q-popup-edit @save="updateData(selected_product._id, 'name', selected_product.name)"
                                  v-model="selected_product.name">
                      <q-input v-model="selected_product.name" dense autofocus/>
                    </q-popup-edit>
                  </td>
                  <td class="text-secondary">
                    {{ selected_product.slug }}
                    <q-popup-edit @save="updateData(selected_product._id, 'slug', selected_product.slug)"
                                  v-model="selected_product.slug">
                      <q-input v-model="selected_product.slug" dense autofocus/>
                    </q-popup-edit>
                  </td>
                  <td class="text-secondary">
                    {{ selected_product.description }}
                    <q-popup-edit
                      @save="updateData(selected_product._id, 'description', selected_product.description)"
                      label-set="កែប្រែ" label-cancel="បិទ" v-model="selected_product.description" buttons
                      title="ចំណាំ">
                      <q-input
                        @keyup.stop
                        rows="2" type="textarea"
                        v-model="selected_product.description"
                        dense autofocus
                      />
                    </q-popup-edit>
                  </td>
                </tr>
              </table>
            </q-tab-panel>

            <q-tab-panel name="variant-option">
              <div>
                <table v-if="selected_product" class="q-table q-table--cell-separator">
                  <tr>
                    <th class="text-left">
                      វ៉ារ្យ៉ង់
                      <q-btn v-if="selected_product._id" @click="dialog.variant_create = true" flat round icon="add"/>
                    </th>
                    <th class="text-left">
                      តម្លៃវ៉ារ្យ៉ង់
                    </th>
                  </tr>
                  <tr :key="index" v-for="(item, index) in selected_product.variant">
                    <td class="text-secondary">
                      {{ item.name }}
                      <q-popup-edit @save="updateVariantData(item._id, 'name', item.name)"
                                    v-model="item.name">
                        <q-input v-model="item.name" dense autofocus/>
                      </q-popup-edit>
                    </td>
                    <td class="text-secondary">
                      <span :key="ind" class="q-pr-lg" v-for="(itm, ind) in item.variant_option">
                        {{ itm.name }}
                        <q-popup-edit @save="updateVariantOptionData(itm._id, 'name', itm.name)"
                                      v-model="itm.name">
                        <q-input v-model="itm.name" dense autofocus/>
                      </q-popup-edit>
                      </span>
                      <q-btn v-if="selected_product._id" @click="showVariantOption(item._id)" flat round
                             icon="add"/>
                    </td>
                  </tr>
                </table>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <q-separator/>
        </q-card-section>
      </q-card>
      <variant-create :product_id="selected_product._id" v-model="dialog.variant_create"/>
      <variant-option-create :variant_id="variant_id" v-model="dialog.variant_option_create"/>
    </q-page>
  </div>
</template>

<script lang="ts">
import {reactive, ref} from "@vue/composition-api";
import {selected_product, updateProduct} from "./store/product.store";
import DataTable from 'components/DataTable.vue';
import SearchSelect from "components/SearchSelect.vue";
import {category_graphql} from "../sub-setting/category/graphql/category.graphql";
import {filter_sub_categories_graphql} from "../sub-setting/sub-category/graphql/sub-category.graphql";
import {brand_graphql} from "../sub-setting/brand/graphql/brand.graphql";
import ImageCropper from "components/ImageCropper.vue";
import {updateVariant} from "pages/setting/product-old/view/variant/store/variant.store";
import {updateVariantOption} from "pages/setting/product-old/view/variant/view/variant-option/store/variant-option.store";
import VariantCreate from "pages/setting/product-old/view/variant/Variant.create.vue";
import VariantOptionCreate from "pages/setting/product-old/view/variant/view/variant-option/VariantOption.create.vue";

export default {
  name: "Product.view",
  components: {VariantOptionCreate, VariantCreate, DataTable, SearchSelect, ImageCropper},
  setup(props: any, context: any) {
    const isImgPicker = ref(false);
    const dialog = reactive({
      variant_create: false,
      variant_option_create: false
    })
    const variant_id = ref('');
    const query = reactive({
      categories: category_graphql,
      sub_categories: filter_sub_categories_graphql,
      brands: brand_graphql,
    });

    function showVariantOption(vid: string) {
      dialog.variant_option_create = true;
      variant_id.value = vid;
    }

    const {updateData} = updateProduct(props, context);
    const {updateVariantData} = updateVariant(props, context);
    const {updateVariantOptionData} = updateVariantOption(props, context);

    return {
      dialog,
      isImgPicker,
      updateData,
      updateVariantData,
      updateVariantOptionData,
      query,
      selected_product,
      variant_id,
      showVariantOption,
      tab: 'product-view'
    };
  }
}
</script>

<style scoped>

</style>
