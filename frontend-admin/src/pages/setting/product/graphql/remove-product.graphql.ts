import {gql} from '@apollo/client/core';

export const remove_product_graphql = gql`
  mutation removeProduct($id: String!) {
    removeProduct(id: $id) {
      success
      message
    }
  }
`;
