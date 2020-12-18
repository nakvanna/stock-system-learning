import {gql} from '@apollo/client/core';

export const remove_variant_graphql = gql`
  mutation removeVariant($id: String!) {
    removeVariant(id: $id) {
      success
      message
    }
  }
`;
