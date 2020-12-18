import {computed, reactive, ref} from "@vue/composition-api";
import {useMutation} from "@vue/apollo-composable";
import {SubCategoryModel} from "pages/setting/sub-setting/sub-category/model/sub-category.model";
import {remove_sub_category_graphql} from "../graphql/remove-sub-category.graphql";
import {update_sub_category_graphql} from "../graphql/update-sub-category.graphql";
import {sub_categories_graphql} from "pages/setting/sub-setting/sub-category/graphql/sub-category.graphql";
import {create_sub_category_graphql} from "../graphql/create-sub-category.graphql";

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
export function createSubCategory(prop: any, context: any) {
  //--variables--//
  const create_data = ref<SubCategoryModel>({});
  //--end-variables--//

  //--computed--//
  const mapped = computed(function () {
    return {
      ...create_data.value,
      category_id: create_data.value.category?._id
    }
  });
  //--end-computed--//

  //--function--//
  const createData = async () => {
    await create().then((data: any) => {
      onSuccess(data?.data.createSubCategory, context);
    })
  }
  //--end-function--//

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_sub_category_graphql, () => ({
    variables: mapped.value,
  }));

  onDone((data: any) => {
    if (data.data.createSubCategory.success) {
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
}

/*READ*/
export const readSubCategories = (table: any) => {
  //--variables--//
  const table_options = reactive({
    columns: [
      {name: "_id", field: "_id", align: "left"},
      {
        name: "category",
        label: "ប្រភេទ",
        field: (row: any) => row.category.name,
        sortable: true,
        align: "left"
      },
      {
        name: "name",
        label: "ប្រភេទ",
        field: "name",
        sortable: true,
        align: "left"
      },
    ],
    query: sub_categories_graphql
  });
  //--end-variables--//

  //--return--//
  return {
    table_options
  }
}

/*UPDATE*/
export function updateSubCategory(prop: any, context: any, table: any) {
  //--variables--//
  const update_data = ref<SubCategoryModel>({});
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
        onSuccess(data?.data.updateSubCategory, context);
      })
    })
  }
  //--end function--//

  //--update vue apollo--//
  const {mutate: update, onDone} = useMutation(update_sub_category_graphql, () => ({
    variables: {id: update_data.value!._id, update_input: mapped.value},
  }));

  onDone((data: any) => {
    if (data.data.updateSubCategory.success) {
      table.value.refetch();
    }
  })
  //--end vue apollo--//

  return {
    updateData
  }
}

/*DELETE*/
export function deleteSubCategory(prop: any, context: any, table: any) {
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
        onSuccess(data?.data.removeSubCategory, context);
      })
    })
  }
  //--end function--//

  //--remove vue apollo--//
  const {mutate: remove, onDone} = useMutation(remove_sub_category_graphql, () => ({
    variables: {id: id.value}
  }));

  onDone((data: any) => {
    if (data.data.removeSubCategory.success) {
      table.value.refetch();
    }
  })
  //--end remove vue apollo--//

  return {
    removeData
  }
}

