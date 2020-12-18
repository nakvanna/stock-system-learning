import {gql} from '@apollo/client/core';

export const create_sub_category_graphql = gql`
  mutation createSubCategory(
    $category_id:String!,
    $name:String!,
  ) {
    createSubCategory(create_input: {
      category_id:$category_id
      name:$name
    }) {
      success
      message
    }
  }
`;
