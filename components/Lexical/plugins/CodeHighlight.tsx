import { registerCodeHighlighting } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React from 'react'

export default function CodeHighlightPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    return registerCodeHighlighting(editor)
  }, [editor])

  return null
}
