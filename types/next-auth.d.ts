import { DefaultSession } from 'next-auth'

// https://next-auth.js.org/getting-started/typescript

declare module 'next-auth' {
  interface Session {
    address: string
    accessToken: string
    user: {
      id: string
      createdAt: string
      lazyMintIdCounter: number
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}