import {gql} from '@apollo/client/core';

export const update_product_graphql =gql`
    mutation updateProduct($id: String!, $update_input: UpdateProductInput!){
      updateProduct(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
