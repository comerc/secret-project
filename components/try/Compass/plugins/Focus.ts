import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

export const FocusPlugin = (): null => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.focus()
  }, [editor])

  return null
}
