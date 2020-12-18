import { boot } from 'quasar/wrappers'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from '@vue/composition-api'
import {createUploadLink} from 'apollo-upload-client'
import {ApolloClient, createHttpLink, InMemoryCache, split} from '@apollo/client/core'

export default boot(({ app }) => {

  const normalLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  })
  const uploadLink = createUploadLink({
    uri: 'http://localhost:3000/graphql',
  })

  const cache = new InMemoryCache();

    const link = split(
  operation => operation.getContext().hasUpload,
    // @ts-ignore
    normalLink,
    uploadLink
  );

  const apolloClient = new ApolloClient({
    link,
    cache,
  })

  app.setup = () => {
    provide(DefaultApolloClient, apolloClient)
    return {}
  }
})
