import {gql} from '@apollo/client/core';

export const update_sku_graphql =gql`
    mutation updateSku($id: String!, $update_input: UpdateSkuInput!){
      updateSku(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
