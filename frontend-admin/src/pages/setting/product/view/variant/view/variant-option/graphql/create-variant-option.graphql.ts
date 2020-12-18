import {gql} from '@apollo/client/core';

export const create_variant_option_graphql = gql`
  mutation createVariantOption(
    $name:String!,
  ) {
    createVariantOption(create_input: {
      name:$name
    }) {
      success
      message
    }
  }
`;
