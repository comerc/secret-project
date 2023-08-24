import type { CodegenConfig } from '@graphql-codegen/cli'

require('dotenv').config({ path: '.env.local' })

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT!]: {
        headers: {
          'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
        },
      },
    },
  ],
  // schema: 'schema.graphql',
  documents: ['graphqls/**/*.graphql', 'pages/**/*.tsx', 'components/**/*.tsx'], // пример, как можно с отрицанием: ['src/**/*.tsx', '!src/gql/**/*'],
  ignoreNoDocuments: true,
  generates: {
    'generated/': {
      preset: 'client',
      plugins: [],
    },
    // TODO: включить интроспекцию
    // './graphql.schema.json': {
    //   plugins: ['introspection']
    // }
  },
}

export default config
