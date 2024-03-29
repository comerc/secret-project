import { readFileSync } from 'fs'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'

import { IResolvers } from '@graphql-tools/utils'
// import { combineResolvers } from 'graphql-resolvers'
// import { isAuthenticated, isBookOwner } from '@/authorization'

const schemaString = readFileSync('./try-schema.graphql', { encoding: 'utf8' })

const typeDefs = gql(schemaString)

interface Context {
  // username: string
  // models: any
}

const allBooks = [
  {
    id: '1',
    title: 'Another awesome book',
    description: '123',
    author: {
      id: '1',
      firstName: 'Alex',
      lastName: 'Kislov',
    },
  },
  {
    id: '2',
    title: 'Awesome book',
    description: '123',
    author: {
      id: '1',
      firstName: 'Alex',
      lastName: 'Kislov',
    },
  },
]

const resolvers: IResolvers<any, Context> = {
  Query: {
    getAllBooks2: () => {
      return allBooks
    },
    getBook2: (
      parent,
      params,
      // , { models }
    ) => {
      // console.log(params)
      // console.log(models)
      return allBooks.find(({ id }) => params.id === id)
    },
  },
  Mutation: {
    // deleteBook2: combineResolvers(
    //   isAuthenticated,
    //   isBookOwner,
    //   async (parent, { id }, { models }) => {
    //     return await models.Message.destroy({ where: { id } });
    //   },
    // ),
    addBook2: (
      parent,
      params,
      // , { models }
    ) => {
      console.log(params)
      // console.log(models)
      allBooks.push({
        id: allBooks.length + 1,
        ...params.book,
        author: {
          id: '1',
          firstName: 'Alex',
          lastName: 'Kislov',
        },
      })
      return true
    },
  },
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

export default startServerAndCreateNextHandler(server as any)
