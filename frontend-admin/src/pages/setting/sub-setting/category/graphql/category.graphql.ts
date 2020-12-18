import {gql} from '@apollo/client/core';

//Read and Query all in one
export const category_graphql = gql`
  query categories(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    categories(options: {first: $first, after: $after, condition: $condition}){
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
