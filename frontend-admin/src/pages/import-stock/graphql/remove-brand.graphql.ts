import {gql} from '@apollo/client/core';

export const remove_brand_graphql = gql`
  mutation removeBrand($id: String!) {
    removeBrand(id: $id) {
      success
      message
    }
  }
`;
