import {gql} from '@apollo/client/core';

export const create_variant_graphql = gql`
  mutation createVariant($create_input: CreateVariantInputs!) {
    createVariant(create_input: $create_input) {
      success
      message
    }
  }
`;
