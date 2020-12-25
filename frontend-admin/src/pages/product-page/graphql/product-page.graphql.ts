import {gql} from '@apollo/client/core';

export const product_page_graphql = gql`
  query products(
    $first: Float!
    $after: String!
    $condition: JSON!
  ){
    products(options: {first: $first, after: $after, condition: $condition}){
      totalCount
      edges {
        cursor
        node {
          _id
          thumbnail
          name
          description
          sku{
            name
            price
            product_option{
              variant_option_id
              variant_option{
                name
              }
            }
            sku_gallery{
              image
            }
          }
          variant{
            name
            variant_option{
              _id
              name
            }
          }
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
