<template>
  <q-page v-if="result" class="bg-grey-3">
    {{ image_list }}
    <div class="q-pa-lg row bg-white" style="margin-left: 150px; margin-right: 150px">
      <div class="col-6">
        <div class="full-width">
          <q-img
            v-if="!selected.length"
            spinner-color="red"
            :src="product_selected.node.thumbnail"
            style="height: 60%; width: 380px"
          />
          <q-img
            v-else
            spinner-color="red"
            :src="selected[0].sku_gallery[0].image"
            style="height: 60%; width: 380px"
          />
        </div>
        <div class="row q-gutter-xs">
          <q-card :key="image_index" v-for="(image, image_index) in image_list" class="list-image-card">
            <q-img
              class="col q-pl-md"
              :src="image"
              spinner-color="red"
              style="height: 100%"
            />
          </q-card>
        </div>
      </div>
      <div class="col-6">
        <span v-if="!selected.length" class="text-h4 q-pt-md">{{ product_selected.node.name }}</span>
        <span v-else class="text-h5 q-pt-md">{{ selected[0].name }}</span>
        <p>{{ product_selected.node.description }}</p>
        <div>
          <q-rating
            v-model="rating"
            max="5"
            size="1.5em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            no-dimming
          />
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col">
              <span v-if="product_selected.node.sku.length > 1" class="text-center text-h6">
                <span class="text-weight-bold text-h5" v-if="!selected.length">
                  Price:
                  ${{ Math.min.apply(Math, product_selected.node.sku.map(m => m.price)).toFixed(2) }}
                  -
                  ${{ Math.max.apply(Math, product_selected.node.sku.map(m => m.price)).toFixed(2) }}
                </span>
                <span class="text-weight-bold text-h5" v-else>
                  ${{ selected[0].price }}
                </span>
              </span>
              <span class="text-weight-bold text-h5" v-else-if="product_selected.node.sku.length === 1">
                Price: ${{ product_selected.node.sku[0].price }}
              </span>
              <span v-else class="text-negative text-center text-h5 text-weight-bold">
                Unavailable
              </span>
            </div>
          </div>
          <div class="row" v-for="(variant, variant_index) in product_selected.node.variant">
            <div class="col">
            <span class="text-center text-h6">
              <span v-show="false">{{ helper_arr_reactive }}</span>
              {{ variant.name }}:
              <span class="text-weight-bold">
                {{ variant_name[variant_index] }}
              </span>
            </span>
              <ul class="sku-option q-pa-md q-gutter-sm">
                <li
                  v-for="(variant_option, variant_option_index) in variant.variant_option"
                  :key="variant_option_index"
                >
                  <span
                    id="span-hover"
                    v-if="valid_option.includes(variant_option.name)"
                    @click="setVariantValue(product_selected.node.sku, variant_index, variant_option)"
                    class="text-h6 q-px-md cursor-pointer"
                    :class="variant_name[variant_index] === variant_option.name ? 'list-selected': 'list-non-selected'"
                  >
                    {{ variant_option.name }}
                  </span>
                  <span
                    v-else
                    class="bg-grey-5 list-unable-selected text-h6 q-px-md cursor-not-allowed">{{ variant_option.name }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col">
            <span class="text-center text-h6">
              Quantity:
            </span>
              <div class="q-pa-md">
                <q-btn outline size="9px" round icon="fas fa-minus"/>
                <span class="q-px-lg text-bold">10</span>
                <q-btn outline size="9px" round icon="fas fa-plus"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
            <span class="text-center text-h6 text-weight-bold">
            </span>
              <div class="q-pa-md q-gutter-sm">
                <q-btn color="deep-orange" glossy label="Buy now"/>
                <q-btn color="orange" glossy label="Add to cart"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">

import {reactive, ref} from "@vue/composition-api";
import {useQuery} from "@vue/apollo-composable";
import {product_page_graphql} from "pages/product-page/graphql/product-page.graphql";
import {productPageState} from "pages/product-page/store/product-page.store";

export default {
  name: "ProductPageIndex",
  setup() {
    const rating = ref(2.5);
    const helper_arr_reactive = ref();
    let variant_value = reactive(['', '']);
    let variant_name = reactive(['', '']);
    const selected = ref([]);
    const variables = reactive({
      first: 15,
      after: "",
      condition: JSON.stringify({}),
    });

    function setVariantValue(sku: any, index: number, value: any) {
      variant_value[index] = value._id;
      variant_name[index] = value.name;
      helper_arr_reactive.value = value.name;
      selected.value = sku.filter((f: any) => f.product_option.every((c: any) => variant_value.includes(c.variant_option_id)))
    }

    const {result} = useQuery(
      product_page_graphql,
      () => variables,
    );

    const {product_selected, valid_option, image_list} = productPageState();

    return {
      valid_option,
      image_list,
      product_selected,
      selected,
      helper_arr_reactive,
      setVariantValue,
      variant_value,
      variant_name,
      result,
      rating
    }
  }
}
</script>

<style lang="sass" scoped>
.list-image-card
  width: 75px
  height: 75px

.sku-card
  width: 50px
  height: 50px

ul.sku-option li
  display: inline-block

.list-selected
  border: red solid 2px


.list-non-selected
  border: slategray solid 2px

.list-unable-selected
  border: #1D1D1D dashed 2px

#span-hover:hover
  border: #C10015 solid 2px

</style>
