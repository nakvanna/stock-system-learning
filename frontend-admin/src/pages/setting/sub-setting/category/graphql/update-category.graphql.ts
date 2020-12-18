import {gql} from '@apollo/client/core';

export const update_category_graphql =gql`
    mutation updateCategory($id: String!, $update_input: UpdateCategoryInput!){
      updateCategory(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
