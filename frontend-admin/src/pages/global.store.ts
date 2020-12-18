import { useMutation } from "@vue/apollo-composable";
import {reactive} from "@vue/composition-api";
import {brand_graphql} from "pages/brand/graphql/brand.graphql";

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

/*CREATE*/
export function createGlobal(context: any, mapped: any, create_graphql: any){

  const _createGlobal = create_graphql.definitions[0].name.value;

  //--create vue apollo--//
  const {mutate: create, onDone} = useMutation(create_graphql, () => ({
    variables: mapped.value,
  }));

  console.log(JSON.stringify(_createGlobal))

  onDone((data: any) =>{
    if (data.data[_createGlobal].success){
      context.emit('on-success')
      onSuccess(data?.data[_createGlobal], context);
    }
  })
  //--end-create-vue apollo--//

  //--return--//
  return {
    create,
  }
}

/*READ*/
export const readGlobal = (table: any) => {
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
