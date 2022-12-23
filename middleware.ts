import { withAuth, NextAuthMiddlewareOptions } from "next-auth/middleware"
import * as jose from 'jose'
import { JWT } from "next-auth/jwt"
import { decode } from '.../utils/jwt'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === "/admin") {
//         return token?.userRole === "admin"
//       }
//       // `/me` only requires the user to be logged in
//       return !!token
//     },
//   },
// })

export default withAuth({
  jwt: { decode },
  callbacks: {
    async authorized({ token, req }) {
      return !!token
    }
  },
} as NextAuthMiddlewareOptions)

export const config = { matcher: ["/admin", "/me"] }