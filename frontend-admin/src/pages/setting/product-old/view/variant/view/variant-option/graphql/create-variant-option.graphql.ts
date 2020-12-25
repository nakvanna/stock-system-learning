import {gql} from '@apollo/client/core';

export const create_variant_option_graphql = gql`
  mutation createVariantOption($create_input: CreateVariantOptionInputs!) {
    createVariantOption(create_input: $create_input) {
      success
      message
    }
  }
`;
