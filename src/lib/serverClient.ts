import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  HttpOptions
} from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

loadDevMessages()
loadErrorMessages()

export const { getClient } = registerApolloClient(() => {
  const headers: HttpOptions['headers'] = {
    Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      }
    },
    link: new HttpLink({
      uri: 'https://graphql.datocms.com/',
      headers,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: { cache: 'no-cache' }
    })
  })
})
