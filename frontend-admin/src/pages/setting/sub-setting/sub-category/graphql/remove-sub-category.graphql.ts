import {gql} from '@apollo/client/core';

export const remove_sub_category_graphql = gql`
  mutation removeCategory($id: String!) {
    removeCategory(id: $id) {
      success
      message
    }
  }
`;
