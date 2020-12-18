import { gql } from "@apollo/client/core";

export const create_upload_graphql = gql `
  mutation createUpload(
    $files:[Upload!]!
  ) {
    createUpload(create_input: {
      files: $files
    }) {
      success
      message
      files
    }
  }
`;
