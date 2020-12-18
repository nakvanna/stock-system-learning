import {computed, reactive, ref} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {VariantModel} from "../model/variant.model";
import {create_variant_graphql} from "../graphql/create-variant.graphql";
import {variant_graphql} from "../graphql/brand.graphql";
import {update_variant_graphql} from "../graphql/update-variant.graphql";
import {remove_variant_graphql} from "../graphql/remove-variant.graphql";

/***CRUD Action***/

/*CREATE*/
export function createVariant(prop: any, context: any) {
  //--variables--//
  const create_data = ref<VariantModel[]>([
    {
      name: '',
      create_variant_option_input: []
    }
  ]);
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return create_data.value.map((m: any) => {
      return {
        ...m,
        product_id: prop.product_id,
        create_variant_option_input: m.create_variant_option_input?.map((m1: any) => {
          return {
            variant_id: '',
            name: m1.trim(),
          }
        }),
      }
    })
  });
  //--end-computed--//

  //--function--//
  const createVariantData = async () => {
    await create().then((data: any) => {
      console.log(data)
      const _data = data?.data.createVariant
      if (_data.success) {
        create_data.value = [{
          name: '',
          create_variant_option_input: []
        }];
        context.emit('on-success')
      }
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_variant_graphql, () => ({
    variables: {create_input: {multiple: mapped.value}},
  }));

  onDone(result => {
    console.log(result)
    const data = result?.data.createVariant
    if (data.success) {
      //notify success
      if (data.success) {
        context.root.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: data.message
        });
      } else {
        context.root.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: data.message
        });
      }
    }
  });
  //--end-create-vue apollo--//

  //--return--//
  return {
    create_data,
    createVariantData,
    mapped,
  }
}

/*READ*/
export const readVariants = (table: any) => {
  //--variables--//
  const table_options = reactive({
    columns: [
      {name: "_id", field: "_id", align: "left"},
      {
        name: "name",
        label: "Variant",
        field: "name",
        sortable: true,
        align: "left"
      }
    ],
    query: variant_graphql
  });
  //--end-variables--//

  //--return--//
  return {
    table_options
  }
}

/*UPDATE*/
export function updateVariant(prop: any, context: any) {
  //--variables--//
  const update_data = ref<VariantModel>({});
  //--end variables--//

  //computed
  const mapped = computed(() => {
    const copy = Object.assign({}, update_data.value);
    delete copy._id
    return copy
  })

  //--function--//
  const updateVariantData = async (id: string, key: string, value: any) => {
    update_data.value._id = id;
    //@ts-ignore
    update_data.value[key] = value;
    await update().then((data: any) => {
      const _data = data?.data.updateVariant
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
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update} = useMutation(update_variant_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));
  //--end vue apollo--//

  return {
    updateVariantData
  }
}

/*DELETE*/
export function deleteVariant(prop: any, context: any, table: any) {
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
        const _data = data?.data.removeVariant
        if (_data.success) {
          context.root.$q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: _data.message
          });
          table.value.refetch();
        } else {
          context.root.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: _data.message
          });
        }
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove} = useMutation(remove_variant_graphql, () => ({
    variables: {id: id.value}
  }));
  //--end remove vue apollo--//

  return {
    removeData
  }
}
