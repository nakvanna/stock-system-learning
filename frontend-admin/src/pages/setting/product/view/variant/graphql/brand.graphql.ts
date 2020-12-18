import {gql} from '@apollo/client/core';

export const variant_graphql = gql`
    query variants(
      $first: Float!
      $after: String!
      $condition: JSON!
    ){
      variants(options: {first: $first, after: $after, condition: $condition}){
        totalCount
        edges {
          cursor
          node {
            _id
            product_id
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
