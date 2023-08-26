import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

// const token =
//   'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiI9C60L7QtNC10YDQvtGC0LHQvtCz0LAiLCJlbWFpbCI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xMDI1MjQxP3Y9NCIsInN1YiI6IjczYzE5OTE2LTE2MTMtNDk5Ni1hNjk1LWYxMWFjMTEwMjQ3OCIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI3M2MxOTkxNi0xNjEzLTQ5OTYtYTY5NS1mMTFhYzExMDI0NzgifX0.AFpio2CgHOQW2xOOL9GUiZPFdgf5nzQVQx_XxJEctKU'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT!,
  headers: {
    // Authorization: `Bearer ${token}`,
    'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
  },
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link =
  typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          )
        },
        new GraphQLWsLink(
          createClient({
            url: (process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string).replace('http', 'ws'),
            connectionParams: () => {
              //   // Note: getSession() is a placeholder function created by you
              //   const session = getSession();
              //   if (!session) {
              //     return {};
              //   }
              return {
                headers: {
                  // Authorization: `Bearer ${token}`
                  'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
                },
              }
            },
          }),
        ),
        httpLink,
      )
    : httpLink

// Create the Apollo Client instance
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
