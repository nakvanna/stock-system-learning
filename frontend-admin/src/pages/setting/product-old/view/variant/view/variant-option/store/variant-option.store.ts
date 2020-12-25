import {computed, reactive, ref} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {VariantOptionModel} from "../model/variant-option.model";
import {create_variant_option_graphql} from "pages/setting/product-old/view/variant/view/variant-option/graphql/create-variant-option.graphql";
import {variant_option_graphql} from "../graphql/variant-option.graphql";
import {update_variant_option_graphql} from "../graphql/update-variant-option.graphql";
import {remove_variant_option_graphql} from "../graphql/remove-variant-option.graphql";

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

/*CREATE*/
export function createVariantOption(prop: any, context: any) {
  //--variables--//
  const create_data = ref<VariantOptionModel>({
    temp_name: []
  });
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return create_data.value.temp_name.map((n: any) => {
      return {
        variant_id: prop.variant_id,
        name: n
      }
    })
  });
  //--end-computed--//

  //--function--//
  const createData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createVariantOption, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_variant_option_graphql, () => ({
    variables: {create_input: {multiple: mapped.value}},
  }));

  onDone((data: any) => {
    if (data.data.createVariantOption.success) {
      create_data.value = {
        temp_name: []
      };
      context.emit('on-success')
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createData,
    mapped
  }
}

/*READ*/
export const readVariantOptions = (table: any) => {
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
    query: variant_option_graphql
  });
  //--end-variables--//

  //--return--//
  return {
    table_options
  }
}

/*UPDATE*/
export function updateVariantOption(prop: any, context: any) {
  //--variables--//
  const update_data = ref<VariantOptionModel>({});
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updateVariantOptionData = async (id: string, key: string, value: any) => {
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
        onSuccess(data?.data.updateVariantOption, context);
      })
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_variant_option_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updateVariantOption.success) {
      update_data.value = {};
    }
  })
  //--end vue apollo--//

  return {
    updateVariantOptionData
  }
}

/*DELETE*/
export function deleteVariantOption(prop: any, context: any, table: any) {
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
        onSuccess(data?.data.removeVariantOption, context);
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove, onDone} = useMutation(remove_variant_option_graphql, () => ({
    variables: {id: id.value}
  }));

  onDone((data: any) => {
    if (data.data.removeVariantOption.success) {
      table.value.refetch();
    }
  })
  //--end remove vue apollo--//

  return {
    removeData
  }
}
