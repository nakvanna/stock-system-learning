import {gql} from '@apollo/client/core';

export const sku_graphql = gql`
    query skus(
      $first: Float!
      $after: String!
      $condition: JSON!
    ){
      skus(options: {first: $first, after: $after, condition: $condition}){
        totalCount
        edges {
          cursor
          node {
            _id
            product_id
            product{
              name
            }
            sku
            name
            ranking
            discount
            price
            weight
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
