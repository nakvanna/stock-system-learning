import {gql} from '@apollo/client/core';

export const create_product_graphql = gql`
  mutation createProduct($create_input: CreateProductInput!
  ) {
    createProduct(create_input: $create_input) {
      success
      message
    }
  }
`;
