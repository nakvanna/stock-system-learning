import {gql} from '@apollo/client/core';

export const brand_graphql = gql`
    query brands(
      $first: Float!
      $after: String!
      $condition: JSON!
    ){
      brands(options: {first: $first, after: $after, condition: $condition}){
        totalCount
        edges {
          cursor
          node {
            _id
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
