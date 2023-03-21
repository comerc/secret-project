import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'

import { validateUrl } from '../utils/url'

function LinkPlugin(): JSX.Element {
  return <LexicalLinkPlugin validateUrl={validateUrl} />
}

export default LinkPlugin
