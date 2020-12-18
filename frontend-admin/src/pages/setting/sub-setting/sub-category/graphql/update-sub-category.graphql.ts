import {gql} from '@apollo/client/core';

export const update_sub_category_graphql =gql`
    mutation updateSubCategory($id: String!, $update_input: UpdateSubCategoryInput!){
      updateSubCategory(id: $id, update_input: $update_input){
        success
        message
      }
    }
`
