<template>
  <q-page v-if="result" class="bg-grey-3">
    <div class="q-pa-lg row bg-white" style="margin-left: 150px; margin-right: 150px">
      <div class="row q-gutter-md">
        <q-card
          :key="index" v-for="(item, index) in result.products.edges"
          class="my-card cursor-pointer" @click="productSelected(item)">
          <q-img :src="item.node.thumbnail"/>
          <q-card-section>
            <q-btn
              @click.stop="addCart()"
              fab
              color="cyan"
              icon="fas fa-cart-plus"
              class="absolute"
              style="top: 0; right: 9px; transform: translateY(-50%);"
            />
            <div class="row no-wrap q-pt-md items-center">
              <div class="col ellipsis">
                {{ item.node.name }}
              </div>
            </div>
            <q-rating
              v-model="stars"
              max="5"
              size="1.5em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              <span v-if="item.node.sku.length > 1">
                ${{ Math.min.apply(Math, item.node.sku.map(m => m.price)).toFixed(2) }}
                -
                ${{ Math.max.apply(Math, item.node.sku.map(m => m.price)).toFixed(2) }}
              </span>
              <span v-else-if="item.node.sku.length === 1">
                ${{ item.node.sku[0].price.toFixed(2) }}
              </span>
              <span v-else class="text-negative">
                Unavailable
              </span>
            </div>
            <div class="text-caption text-grey">
              {{ item.node.description }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {useQuery} from "@vue/apollo-composable";
import {product_page_graphql} from "pages/product-page/graphql/product-page.graphql";
import {reactive, ref} from "@vue/composition-api";
import {productPageState} from "pages/product-page/store/product-page.store";

export default {
  setup(props: any, context: any) {
    const stars = ref(3.5);
    const variables = reactive({
      first: 15,
      after: "",
      condition: JSON.stringify({}),
    });

    function productSelected(data: any) {
      context.root.$router.push('/view/sale')
      product_selected.value = data;
    }

    function addCart() {
      alert('Add cart..!')
    }

    const {product_selected} = productPageState();

    const {result} = useQuery(
      product_page_graphql,
      () => variables,
    );

    return {
      stars,
      result,
      productSelected,
      addCart,
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 200px
</style>

