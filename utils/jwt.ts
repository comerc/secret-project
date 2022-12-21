import * as jose from 'jose'

const convertToUint8Array = (s: String) => {
  return Uint8Array.from(s.split('').map(letter => letter.charCodeAt(0)))
}
  
export const encode = async ({ secret, token }) => {
  if (!token) {
    return ''
  }
  // if (token!.state) {
  //   return jsonwebtoken.sign(token, secret)
  // }
  const encodedToken = await new jose.SignJWT(token)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(convertToUint8Array(secret))
  // console.log(encodedToken)
  return encodedToken
}

export const decode = async ({ secret, token }) => {
  if (!token) {
    return null
  }
  try {
    const { payload } = await jose.jwtVerify(token, convertToUint8Array(secret))
    return payload as JWT
  } catch (error) {
    console.log(error)
    // JWT validation failed or token is invalid
  }
}
