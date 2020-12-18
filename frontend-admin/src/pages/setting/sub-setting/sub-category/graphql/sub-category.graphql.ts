import {gql} from '@apollo/client/core';

export const sub_categories_graphql = gql`
    query sub_categoies(
      $first: Float!
      $after: String!
      $condition: JSON!
    ){
      sub_categories(options: {first: $first, after: $after, condition: $condition}){
        totalCount
        edges {
          cursor
          node {
            _id
            category_id
            category{
              name
            }
            name
            createdAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
`
export const filter_sub_categories_graphql = gql`
    query filter_sub_categoies(
      $first: Float!
      $after: String!
      $condition: JSON!
    ){
      sub_categories(options: {first: $first, after: $after, condition: $condition}){
        totalCount
        edges {
          cursor
          node {
            _id
            name
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
`
