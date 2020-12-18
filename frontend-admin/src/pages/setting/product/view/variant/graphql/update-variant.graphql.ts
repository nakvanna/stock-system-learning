import {gql} from '@apollo/client/core';

export const update_variant_graphql =gql`
    mutation updateVariant($id: String!, $update_input: UpdateVariantInput!){
      updateVariant(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
