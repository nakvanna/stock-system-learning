import {gql} from '@apollo/client/core';

export const variant_option_graphql = gql`
  query variant_options(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    variant_options(options: {first: $first, after: $after, condition: $condition}){
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
