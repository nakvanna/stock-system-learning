import {computed, ref, watch} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {SkuModel} from "pages/setting/sku/model/sku.model";
import {sku_graphql} from "pages/setting/sku/graphql/sku.graphql";
import {update_sku_graphql} from "../graphql/update-sku.graphql";
import {remove_sku_graphql} from "../graphql/remove-sku.graphql";
import {create_sku_graphql} from "../graphql/create-sku.graphql";

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

export const selected_sku = ref({}) as any;
/***CRUD Action***/

/*CREATE*/
export function createSku(prop: any, context: any) {
  //--variables--//
  const create_data = ref<SkuModel>({
    discount: 0,
    create_product_option_input: []
  });
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return {
      ...create_data.value,
      product_id: create_data.value.product_id?._id,
      create_product_option_input: create_data.value.create_product_option_input.map((m: any) => {
        return {
          sku_id: '',
          variant_option_id: m._id
        }
      })
    }
  });
  //--end-computed--//

  //--function--//
  const createData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createSku, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_sku_graphql, () => ({
    variables: {create_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.createSku.success) {
      create_data.value = {
        discount: 0,
        create_product_option_input: []
      };
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createData,
  }
}

/*READ*/
export const readSku = (table: any) => {
  //variables
  const grid_data = ref({
    selected: [],
    record_value: {
      total_record: 0,
      total_item: 0
    },
    query: {
      skus: sku_graphql,
    },
    filter: {
      study_year: {
        $eq: null
      },
      grade: {
        $eq: null
      },
    }
  })
  //computed
  const filter = computed(() => {
    return Object.assign({}, grid_data.value.filter);
  })
  //watch
  watch(filter, (condition: any) => {
    table?.value?.filterTable(condition, 15, true)
  })
  //set selected value
  watch(grid_data.value, (value: any) => {
    if (value.selected.length) {
      selected_sku.value = JSON.parse(JSON.stringify(value.selected[0]))
    }
  })
  //functions
  const showAll = () => table?.value?.filterTable(filter.value, 0, false);
  const mapSku = (x: any) => {
    return {
      ...x.node,
      discount: '%' + x.node.discount,
      product: x.node.product.name,
      createdAt: new Date(new Date(x.node.createdAt).toDateString()),
    }
  };

  const dateStatusMessage = (duration: { from: any, to: any }) => {
    if (new Date(new Date().toDateString()) >= new Date(duration.from) && new Date(new Date().toDateString()) <= new Date(duration.to)) {
      return {
        message: 'ដល់',
        color: 'blue-5',
      }
    }
    if (new Date(duration.to) < new Date()) {
      return {
        message: 'ហួស',
        color: 'red-5',
      }
    }
    if (new Date() < new Date(duration.to)) {
      return {
        message: 'មិនទាន់ដល់',
        color: 'orange-5',
      }
    }
  }
  //return
  return {
    //variables
    grid_data,
    //computed
    //functions
    mapSku,
    showAll,
    dateStatusMessage
  }
};

/*UPDATE*/
export function updateSku(prop: any, context: any, table: any) {
  //--variables--//
  const update_data = ref<SkuModel>({
    discount: 0,
    create_product_option_input: []
  });
  //--end variables--//

  //--computed--//
  const mapped = computed(function () {
    return update_data.value
  })

  //--function--//
  const updateData = async (_data: any, id: string) => {
    update_data.value._id = id;
    context.root.$q.dialog({
      title: 'ផ្ទៀងផ្ទាត់',
      message: 'ពិតជាចង់ដំណើរការ?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await update().then((data: any) => {
        onSuccess(data?.data.updateSku, context);
      })
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_sku_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updateSku.success) {
      table.value.refetch();
    }
  })
  //--end vue apollo--//

  return {
    updateData
  }
}

/*DELETE*/
export function deleteSku(prop: any, context: any, table: any) {
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
        onSuccess(data?.data.removeSku, context);
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove, onDone} = useMutation(remove_sku_graphql, () => ({
    variables: {id: id.value}
  }));

  onDone((data: any) => {
    if (data.data.removeSku.success) {
      table.value.refetch();
    }
  })
  //--end remove vue apollo--//

  return {
    removeData
  }
}
