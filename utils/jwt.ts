import * as jose from 'jose'
import { JWT, JWTEncodeParams, JWTDecodeParams } from "next-auth/jwt";
import { Awaitable } from "next-auth";

const convertToUint8Array = (v: string | Uint8Array) => {
  if (v instanceof Uint8Array) {
    return v
  }
  return Uint8Array.from(v.split('').map(letter => letter.charCodeAt(0)))
}
  
function encode({ token, secret }: JWTEncodeParams): Awaitable<string> {
  if (!token) {
    return ''
  }
  const encodedToken = new jose.SignJWT(token!)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(convertToUint8Array(secret))
  return encodedToken
}

function decode({ token, secret }: JWTDecodeParams): Awaitable<JWT | null> {
  if (!token) {
    return null
  }
  const decodedToken = jose.jwtVerify(token!, convertToUint8Array(secret))
    .then(({ payload }) => payload)
  return decodedToken
}

export { encode, decode }