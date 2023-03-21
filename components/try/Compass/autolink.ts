import type { LinkMatcher } from '@lexical/react/LexicalAutoLinkPlugin'

const urlMatcher =
  // eslint-disable-next-line prefer-named-capture-group
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/u

const emailMatcher: LinkMatcher = (text: string) => {
  const match = urlMatcher.exec(text)
  return (
    match && {
      index: match.index,
      length: match[0].length,
      text: match[0],
      url: match[0],
    }
  )
}

const matchers: LinkMatcher[] = [emailMatcher]

export default matchers
