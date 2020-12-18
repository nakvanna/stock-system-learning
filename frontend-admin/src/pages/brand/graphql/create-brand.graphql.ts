import {gql} from '@apollo/client/core';

export const create_brand_graphql = gql`
  mutation createBrand(
    $name:String!,
  ) {
    createBrand(create_input: {
      name:$name
    }) {
      success
      message
    }
  }
`;
