// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If you don't have the NEXTAUTH_SECRET environment variable set,
  // you will have to pass your secret as `secret` to `getToken`
  // const token = await getToken({ req })

  // const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({
    req,
    // secret,
    // Raw gives the un-decoded JWT
    raw: true,
  });

  res.send(JSON.stringify(token, null, 2))
}
