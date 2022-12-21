import "next-auth/jwt"
import type { DefaultUser } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

// declare module "next-auth/jwt" {
//   interface JWT {
//     /** The user's role. */
//     userRole?: "admin"
//   }
// }

// https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}