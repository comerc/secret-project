import type { EditorState } from 'lexical'

import type { ComponentProps, MouseEventHandler } from 'react'
import { useEffect, useState, useRef } from 'react'
import { useDebouncedState, useEventListener } from '@react-hookz/web'
import isEqual from 'react-fast-compare'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
// import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
// import { getAuth } from 'firebase/auth'
// import { doc, getFirestore, updateDoc } from 'firebase/firestore'
// import type { FirebaseError } from 'firebase/app'
import { FocusPlugin } from './plugins/focus'
import nodes from './nodes'
import transformers from './transformers'
import matchers from './autolink'

const onError = (error: Error) => {
  throw error
}

const Placeholder = (
  <p className="pointer-events-none absolute inset-y-16 inset-x-4 m-0 select-none text-base text-zinc-500">
    Start typing...
  </p>
)

const Editor = ({ initialEditorState }) => {
  const [lastEditorState, setLastEditorState] = useState<EditorState | null>(null)
  const [editorState, setEditorState] = useDebouncedState<EditorState | null>(null, 500, 1000)
  // const containerWithScrollRef = useRef<HTMLDivElement>(null)
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: 'Compass',
    editorState: initialEditorState,
    onError,
    nodes,
  }

  const clickEventHandler: MouseEventHandler = (event) => {
    const parent = (event.target as HTMLElement).parentNode

    if (!parent) {
      return
    }

    const href = parent.nodeName === 'A' ? (parent as HTMLAnchorElement).getAttribute('href') : null

    if (!href) {
      return
    }

    event.preventDefault()
    window.open(href, '_blank')
  }

  // const saveContent = () => {
  //   const content = JSON.stringify(editorState)
  //   // const { currentUser } = getAuth()
  //   const firestore = getFirestore()

  //   if (!currentUser || !content || isEqual(lastEditorState, editorState)) {
  //     return
  //   }

  //   const profile = doc(firestore, 'users', currentUser.uid)

  //   updateDoc(profile, {
  //     content,
  //     lastUpdated: new Date(),
  //   }).catch((error) => {
  //     toast.error((error as FirebaseError).message)
  //   })

  //   setLastEditorState(editorState)
  // }

  useEventListener(window, 'click', clickEventHandler, { passive: true })
  // useEffect(saveContent, [editorState, lastEditorState])

  return (
    <div
      // ref={containerWithScrollRef}
      className="prose prose-zinc relative mx-auto px-4 py-8 sm:py-16" // dark:prose-invert
    >
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable className="outline-none" />}
          placeholder={Placeholder}
        />
        <OnChangePlugin onChange={setEditorState} />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <TablePlugin />
        <AutoLinkPlugin matchers={matchers} />
        {/* <AutoScrollPlugin scrollRef={containerWithScrollRef} /> */}
        <MarkdownShortcutPlugin transformers={transformers} />
        <HashtagPlugin />
        <FocusPlugin />
      </LexicalComposer>
    </div>
  )
}

export default Editor

// TODO: how to clear text
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerCon
// const [editor] = useLexicalComposerContext();
// editor.update(() => {
//   $getRoot().clear();
// })
