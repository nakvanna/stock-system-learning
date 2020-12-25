import {gql} from '@apollo/client/core';

export const update_variant_option_graphql = gql`
  mutation updateVariantOption($id: String!, $update_input: UpdateVariantOptionInput!){
    updateVariantOption(id: $id, update_input: $update_input){
      success
      message
    }
  }
`
