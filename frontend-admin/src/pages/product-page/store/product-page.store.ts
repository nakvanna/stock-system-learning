import {computed, reactive, ref} from "@vue/composition-api";
import {product_page_graphql} from "../graphql/product-page.graphql";

let product_selected = ref({});

export const productPageState = () => {
  const valid_option = computed(() => {
    if (product_selected) {// @ts-ignore
      return product_selected.value.node.sku.map((m: any) => {
        return m.product_option.map((m1: any) => {
          return m1.variant_option.name
        })
      })
        .flat()
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
    }
  })

  const image_list = computed(() => {
    if (product_selected) {
      // @ts-ignore
      return product_selected.value.node.sku.map((m: any) => {
        return m.sku_gallery
          .map((m1: any) => {
            return m1.image
          })
      })
        .flat()
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
    }
  })

  // const valid_option = computed(() => {
  //   valid_options.value.filter((value: any, index: any, self: any) => self.indexOf(value) === index)
  // })

  return {
    valid_option,
    image_list,
    product_selected,
  }
}

//--OnDone message--//
function onSuccess(_data: any, context: any) {
  if (_data.success) {
    context.root.$q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: _data.message
    });
  } else {
    context.root.$q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: _data.message
    });
  }
}

/***CRUD Action***/

/*/!*CREATE*!/
export function createBrand(prop: any, context: any) {
  //--variables--//
  const create_data = ref<ProductPageModel>({});
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return {
      ...create_data.value,
    }
  });
  //--end-computed--//

  //--function--//
  const createData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createBrand, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_product_page_graphql, () => ({
    variables: mapped.value,
  }));

  onDone((data: any) => {
    if (data.data.createBrand.success) {
      create_data.value = {};
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createData,
  }
}*/

/*READ*/
export const readBrands = (table: any) => {
  //--variables--//
  const table_options = reactive({
    columns: [
      {name: "_id", field: "_id", align: "left"},
      {
        name: "name",
        label: "ប្រភេទ",
        field: "name",
        sortable: true,
        align: "left"
      }
    ],
    query: product_page_graphql
  });
  //--end-variables--//

  //--return--//
  return {
    table_options
  }
}

/*/!*UPDATE*!/
export function updateBrand(prop: any, context: any, table: any) {
  //--variables--//
  const update_data = ref<ProductPageModel>({});
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updateData = async (id: string, key: string, value: any) => {
    update_data.value._id = id;
    //@ts-ignore
    update_data.value[key] = value;
    context.root.$q.dialog({
      title: 'ផ្ទៀងផ្ទាត់',
      message: 'ពិតជាចង់ដំណើរការ?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await update().then((data: any) => {
        onSuccess(data?.data.updateBrand, context);
      })
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_product_page_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updateBrand.success) {
      update_data.value = {};
      table.value.refetch();
    }
  })
  //--end vue apollo--//

  return {
    updateData
  }
}

/!*DELETE*!/
export function deleteBrand(prop: any, context: any, table: any) {
  //--variables--//
  const id = ref("");
  //--end variables--//

  //--function--//
  const removeData = (_id: string) => {
    id.value = _id;
    context.root.$q.dialog({
      title: 'ផ្ទៀងផ្ទាត់',
      message: 'ពិតជាចង់ដំណើរការ?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove().then((data: any) => {
        onSuccess(data?.data.removeBrand, context);
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove, onDone} = useMutation(remove_product_page_graphql, () => ({
    variables: {id: id.value}
  }));

  onDone((data: any) => {
    if (data.data.removeBrand.success) {
      table.value.refetch();
    }
  })
  //--end remove vue apollo--//

  return {
    removeData
  }
}*/
