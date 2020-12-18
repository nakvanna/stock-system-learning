import {gql} from '@apollo/client/core';

export const create_sku_graphql = gql`
  mutation createSku($create_input: CreateSkuInput!) {
    createSku(create_input: $create_input) {
      success
      message
    }
  }
`;
