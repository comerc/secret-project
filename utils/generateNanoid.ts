import { customAlphabet, urlAlphabet } from 'nanoid'

const shortLinkNanoid = customAlphabet(urlAlphabet.replaceAll(/(_|-)/g, ''), 8)
const nanoid = customAlphabet('1234567890abcdef', 24)

function generateNanoid(options = {}) {
  const { shortLink = false } = options
  return shortLink ? shortNanoid() : nanoid()
}

export default generateNanoid
