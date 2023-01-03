import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React from 'react'

type Props = {
  defaultSelection?: 'rootStart' | 'rootEnd'
  isMarkdown: false
}

function AutoFocusPlugin({ defaultSelection, isMarkdown }: Props): null {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    editor.focus(
      () => {
        // If we try and move selection to the same point with setBaseAndExtent, it won't
        // trigger a re-focus on the element. So in the case this occurs, we'll need to correct it.
        // Normally this is fine, Selection API !== Focus API, but fore the intents of the naming
        // of this plugin, which should preserve focus too.
        const activeElement = document.activeElement
        const rootElement = editor.getRootElement() as HTMLDivElement
        if (
          rootElement !== null &&
          (activeElement === null || !rootElement.contains(activeElement))
        ) {
          // Note: preventScroll won't work in Webkit.
          rootElement.focus({ preventScroll: true })
        }
      },
      { defaultSelection },
    )
  }, [defaultSelection, editor, isMarkdown])

  return null
}

export default AutoFocusPlugin
