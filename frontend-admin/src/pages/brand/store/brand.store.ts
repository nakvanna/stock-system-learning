import { computed, reactive, ref } from "@vue/composition-api";
import { useMutation } from "@vue/apollo-composable";
import { BrandModel } from "pages/brand/model/brand.model";
import { brand_graphql } from "pages/brand/graphql/brand.graphql";
import { create_brand_graphql } from "pages/brand/graphql/create-brand.graphql";
import { remove_brand_graphql } from "pages/brand/graphql/remove-brand.graphql";
import { update_brand_graphql } from "pages/brand/graphql/update-brand.graphql";

/***CRUD Action***/

/*CREATE*/
export function createBrand(prop: any, context: any){
  //--variables--//
  const create_data = ref<BrandModel>({
    name: ''
  });
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
      const _data = data?.data.createBrand
      if (_data.success) {
        create_data.value = {};
        context.emit('on-success')
      }
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_brand_graphql, () => ({
    variables: mapped.value,
  }));

  onDone(result => {
    const data = result?.data.createBrand
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
    createData,
  }
}

/*READ*/
export const readBrands = (table: any) => {
  //--variables--//
  const table_options = reactive({
    columns: [
      {name: "_id", field: "_id", align: "left"},
      {
        name: "name",
        label: "Brand",
        field: "name",
        sortable: true,
        align: "left"
      }
    ],
    query: brand_graphql
  });
  //--end-variables--//

  //--return--//
  return {
    table_options
  }
}

/*UPDATE*/
export function updateBrand(prop:any, context:any, table: any){
  //--variables--//
  const update_data = ref<BrandModel>({
    _id: '',
    name: '',
  });
  //--end variables--//

  //--function--//
  const updateData = async (_data: any) => {
    update_data.value = _data;
    await update().then((data: any)=>{
      const _data = data?.data.updateBrand
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
  }
  //--end function--//

  //--update vue apollo--//
  const { mutate: update } = useMutation( update_brand_graphql, () => ({
    variables: { id: update_data.value!._id, update_input: {name:update_data.value.name} },
  }));
  //--end vue apollo--//

  return {
    updateData
  }
}

/*DELETE*/
export function deleteBrand(prop:any, context:any, table: any){
  //--variables--//
  const id = ref("");
  //--end variables--//

  //--function--//
  const removeData = (_id: string)=> {
    id.value = _id;
    context.root.$q.dialog({
      title: 'ផ្ទៀងផ្ទាត់',
      message: 'ពិតជាចង់ដំណើរការ?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove().then((data: any) => {
        const _data = data?.data.removeBrand
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
  const {mutate: remove} = useMutation(remove_brand_graphql, () => ({
    variables: {id: id.value}
  }));
  //--end remove vue apollo--//

  return {
    removeData
  }
}
