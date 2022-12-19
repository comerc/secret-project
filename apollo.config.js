require('dotenv').config({ path: '.env.local' })

module.exports = {
  client: {
    includes: ['pages/**/*.tsx', 'components/**/*.tsx'],
    service: {
      name: 'secret-projet',
      url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
      // optional headers
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET, 
        // 'x-hasura-role': 'user',
      },
      // optional disable SSL validation check
      // skipSSLValidation: true,
      // alternative way
      // localSchemaFile: './schema.graphql', // or './schema.json'
    },
  },
}
  