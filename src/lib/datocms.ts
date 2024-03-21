import { ApolloClient, InMemoryCache } from '@apollo/client'

export const clientConfig = {
  uri: 'https://graphql.datocms.com/',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`
  },
  cache: new InMemoryCache()
}

export const client = new ApolloClient(clientConfig)
