import {gql} from '@apollo/client/core';

export const update_brand_graphql =gql`
    mutation updateBrand($id: String!, $update_input: UpdateBrandInput!){
      updateBrand(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
