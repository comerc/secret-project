import React from 'react'
import type { LexicalEditor } from 'lexical'
import { $createCodeNode, $isCodeNode } from '@lexical/code'
import { exportFile, importFile } from '@lexical/file'
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown'
// import { useCollaborationContext } from '@lexical/react/LexicalCollaborationContext'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
// import { CONNECTED_COMMAND, TOGGLE_CONNECT_COMMAND } from '@lexical/yjs'
import {
  $createTextNode,
  $getRoot,
  $isParagraphNode,
  CLEAR_HISTORY_COMMAND,
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical'
import { Modal } from 'antd'
// import useModal from '../../hooks/useModal'
// import Button from '../../ui/Button'
import { MARKDOWN_TRANSFORMERS } from './markdownTransformers'
// import { SPEECH_TO_TEXT_COMMAND, SUPPORT_SPEECH_RECOGNITION } from '../SpeechToTextPlugin'

// async function sendEditorState(editor: LexicalEditor): Promise<void> {
//   const stringifiedEditorState = JSON.stringify(editor.getEditorState())
//   try {
//     await fetch('http://localhost:1235/setEditorState', {
//       body: stringifiedEditorState,
//       headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json',
//       },
//       method: 'POST',
//     })
//   } catch {
//     // NO-OP
//   }
// }

// async function validateEditorState(editor: LexicalEditor): Promise<void> {
//   console.log('validateEditorState')
//   const stringifiedEditorState = JSON.stringify(editor.getEditorState())
//   let response = null
//   try {
//     response = await fetch('http://localhost:1235/validateEditorState', {
//       body: stringifiedEditorState,
//       headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json',
//       },
//       method: 'POST',
//     })
//   } catch {
//     // NO-OP
//   }
//   if (response !== null && response.status === 403) {
//     throw new Error('Editor state validation failed! Server did not accept changes.')
//   }
// }

function ActionsPlugin({
  isRichText,
  isMarkdown,
  setIsMarkdown,
}: {
  isRichText: boolean
  isMarkdown: boolean
  setIsMarkdown: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [isEditable, setIsEditable] = React.useState(() => {
    return editor.isEditable()
  })
  // const [isSpeechToText, setIsSpeechToText] = React.useState(false)
  // const [connected, setConnected] = React.useState(false)
  const [isEditorEmpty, setIsEditorEmpty] = React.useState(true)
  // const [modal, showModal] = useModal()
  // const { isCollabActive } = useCollaborationContext()

  React.useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      // editor.registerCommand<boolean>(
      //   CONNECTED_COMMAND,
      //   (payload) => {
      //     const isConnected = payload
      //     setConnected(isConnected)
      //     return false
      //   },
      //   COMMAND_PRIORITY_EDITOR,
      // ),
    )
  }, [editor])

  React.useEffect(() => {
    return editor.registerUpdateListener(({ dirtyElements, prevEditorState, tags }) => {
      // If we are in read only mode, send the editor state
      // to server and ask for validation if possible.
      // if (
      //   !isEditable &&
      //   dirtyElements.size > 0 &&
      //   !tags.has('historic') &&
      //   !tags.has('collaboration')
      // ) {
      //   validateEditorState(editor)
      // }
      editor.getEditorState().read(() => {
        const root = $getRoot()
        const children = root.getChildren()
        if (children.length > 1) {
          setIsEditorEmpty(false)
        } else {
          if ($isParagraphNode(children[0])) {
            const paragraphChildren = children[0].getChildren()
            setIsEditorEmpty(paragraphChildren.length === 0)
          } else {
            setIsEditorEmpty(false)
          }
        }
        // TODO: кнопка "Clear" включается при переключении isMarkdown
      })
    })
  }, [editor, isEditable])

  // Костыль: если isInitialEditable == false, то не переключается кнопка "Read-Only Mode"
  React.useEffect(() => {
    setIsEditable(editor.isEditable())
  }, [editor, isEditable])

  const handleMarkdownToggle = React.useCallback(() => {
    editor.update(() => {
      const root = $getRoot()
      // const firstChild = root.getFirstChild()
      // const value = $isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown'
      // if (value) {
      //   $convertFromMarkdownString(firstChild.getTextContent(), MARKDOWN_TRANSFORMERS)
      // } else {
      //   const markdown = $convertToMarkdownString(MARKDOWN_TRANSFORMERS)
      //   root.clear().append($createCodeNode('markdown').append($createTextNode(markdown)))
      // }
      // root.selectEnd()

      if (isMarkdown) {
        const firstChild = root.getFirstChild()
        if (firstChild) {
          $convertFromMarkdownString(firstChild.getTextContent(), MARKDOWN_TRANSFORMERS)
        }
      } else {
        const markdown = $convertToMarkdownString(MARKDOWN_TRANSFORMERS)
        root.clear().append($createCodeNode('markdown').append($createTextNode(markdown)))
      }
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined) // TODO: костыль на переключение isMarkdown
      root.selectEnd()
      setIsMarkdown(!isMarkdown)
    })
  }, [editor, isMarkdown, setIsMarkdown])

  return (
    <div className="actions">
      {/* {SUPPORT_SPEECH_RECOGNITION && (
        <button
          onClick={() => {
            editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText)
            setIsSpeechToText(!isSpeechToText)
          }}
          className={'action-button action-button-mic ' + (isSpeechToText ? 'active' : '')}
          title="Speech To Text"
          aria-label={`${isSpeechToText ? 'Enable' : 'Disable'} speech to text`}
        >
          <i className="mic" />
        </button>
      )} */}
      {/* <button
        className="action-button import"
        onClick={() => importFile(editor)}
        title="Import"
        aria-label="Import editor state from JSON"
      >
        <i className="import" />
      </button> */}
      {/* <button
        className="action-button export"
        onClick={() =>
          exportFile(editor, {
            fileName: `Playground ${new Date().toISOString()}`,
            source: 'Playground',
          })
        }
        title="Export"
        aria-label="Export editor state to JSON"
      >
        <i className="export" />
      </button> */}
      <button
        className="action-button clear"
        disabled={isEditorEmpty}
        onClick={() => {
          Modal.confirm({
            content: 'Are you sure you want to clear the editor?',
            maskClosable: true,
            afterClose() {
              editor.focus()
            },
            onOk() {
              editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
              setIsMarkdown(false)
            },
          })
          // showModal('Clear editor', (onClose) => (
          //   <ShowClearDialog editor={editor} onClose={onClose} />
          // ))
        }}
        title="Clear"
        aria-label="Clear editor contents"
      >
        <i className="clear" />
      </button>
      <button
        className={`action-button ${!isEditable ? 'unlock' : 'lock'}`}
        onClick={() => {
          // Send latest editor state to commenting validation server
          if (isEditable) {
            // sendEditorState(editor)
          }
          editor.setEditable(!isEditable)
          if (!isEditable) {
            editor.focus()
          }
        }}
        title="Read-Only Mode"
        aria-label={`${!isEditable ? 'Unlock' : 'Lock'} read-only mode`}
      >
        <i className={!isEditable ? 'unlock' : 'lock'} />
      </button>
      <button
        className={`action-button ${isMarkdown ? 'active' : ''}`}
        onClick={handleMarkdownToggle}
        title="Convert From Markdown"
        aria-label="Convert from markdown"
      >
        <i className="markdown" />
      </button>
      {/* {isCollabActive && (
        <button
          className="action-button connect"
          onClick={() => {
            editor.dispatchCommand(TOGGLE_CONNECT_COMMAND, !connected)
          }}
          title={`${connected ? 'Disconnect' : 'Connect'} Collaborative Editing`}
          aria-label={`${
            connected ? 'Disconnect from' : 'Connect to'
          } a collaborative editing server`}
        >
          <i className={connected ? 'disconnect' : 'connect'} />
        </button>
      )} */}
      {/* {modal} */}
    </div>
  )
}

// function ShowClearDialog({
//   editor,
//   onClose,
// }: {
//   editor: LexicalEditor
//   onClose: () => void
// }): JSX.Element {
//   return (
//     <>
//       Are you sure you want to clear the editor?
//       <div className="Modal__content">
//         <Button
//           onClick={() => {
//             editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
//             editor.focus()
//             onClose()
//           }}
//         >
//           Clear
//         </Button>{' '}
//         <Button
//           onClick={() => {
//             editor.focus()
//             onClose()
//           }}
//         >
//           Cancel
//         </Button>
//       </div>
//     </>
//   )
// }

export default ActionsPlugin
