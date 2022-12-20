import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import jwt from "jsonwebtoken"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
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
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async session({ session, token, user }) { 
      const encodedToken = jwt.sign(token, process.env.NEXTAUTH_SECRET, { algorithm: 'HS256'})
      session.id = token.id
      session.token = encodedToken
      return session
    },
    async jwt({ token, user }) { 
      const isUserSignedIn = user ? true : false
      if(isUserSignedIn) {
        token.id = user.id
        token["https://hasura.io/jwt/claims"] = {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.id,
        }
      }
      return token
    },
  },
  session: {
		strategy: 'jwt',
	},
  // jwt: {
  //   // secret: process.env.NEXTAUTH_SECRET,
  //   // The maximum age of the NextAuth.js issued JWT in seconds.
  //   // Defaults to `session.maxAge`.
  //   // maxAge: 60 * 60 * 24 * 30,
  //   // You can define your own encode/decode functions for signing and encryption
  //   encode: async ({ secret, token }) => {
	// 		if (token.state) {
  //       return jwt.sign(token, secret)
	// 		}
  //     // console.log(token)
  //     const jwtClaims = {
  //       "sub": token.id,
  //       "name": token.name,
  //       // "email": token.email,
  //       "iat": Date.now() / 1000,
  //       "exp": Math.floor(Date.now() / 1000) + (24*60*60),
  //       "https://hasura.io/jwt/claims": {
  //         "x-hasura-allowed-roles": ["user"],
  //         "x-hasura-default-role": "user",
  //         "x-hasura-role": "user",
  //         "x-hasura-user-id": token.id,
  //       }
  //     };
  //     const encodedToken = jwt.sign(jwtClaims, secret);
  //     return encodedToken;
  //   },
  //   decode: async ({ secret, token }) => {
  //     return jwt.verify(token, secret)
  //   },
  // },
}

export default NextAuth(authOptions)
