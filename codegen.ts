
import type { CodegenConfig } from '@graphql-codegen/cli'

require('dotenv').config({ path: '.env.local' })

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.HASURA2_GRAPHQL_URL]: {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['pages/**/*.tsx', 'components/**/*.tsx'], // пример, как можно с отрицанием: ['src/**/*.tsx', '!src/gql/**/*'],
  ignoreNoDocuments: true,
  generates: {
    'gql/': {
      preset: 'client',
      plugins: []
    },
    // TODO: включить интроспекцию
    // './graphql.schema.json': {
    //   plugins: ['introspection']
    // }
  }
}

export default config
