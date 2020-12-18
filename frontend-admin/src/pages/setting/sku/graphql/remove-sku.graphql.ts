import {gql} from '@apollo/client/core';

export const remove_sku_graphql = gql`
  mutation removeSku($id: String!) {
    removeSku(id: $id) {
      success
      message
    }
  }
`;
