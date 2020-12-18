import {gql} from '@apollo/client/core';

export const remove_variant_option_graphql = gql`
  mutation removeVariantOption($id: String!) {
    removeVariantOption(id: $id) {
      success
      message
    }
  }
`;
