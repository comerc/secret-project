import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { JWT } from 'next-auth/jwt'
import { HasuraAdapter } from 'next-auth-hasura-adapter'
import { encode, decode } from '.../utils/jwt'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // profile(profile) {
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name || profile.login,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //   } as NextAuthUserWithStringId
      // },
    }),
  ],
  adapter: HasuraAdapter({
    endpoint: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT!,
    adminSecret: process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
  }),
  theme: {
    colorScheme: 'light', // dark || auto
  },
  callbacks: {
    // Add user ID to the session
    async session({ session, token }) {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub!,
          },
        }
      }
      return session
    },
    // Add the required Hasura claims
    // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
    async jwt({ token }) {
      return {
        ...token,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': 'user',
          'x-hasura-role': 'user',
          'x-hasura-user-id': token.sub,
        },
      }
    },
  },
  // Use JWT strategy so we can forward them to Hasura
  session: {
    strategy: 'jwt',
  },
  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode,
    decode,
  },
}

export default NextAuth(authOptions)
