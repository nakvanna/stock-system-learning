import {gql} from '@apollo/client/core';

export const create_category_graphql = gql`
  mutation createCategory(
    $name:String!,
  ) {
    createCategory(create_input: {
      name:$name
    }) {
      success
      message
    }
  }
`;
