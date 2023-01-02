import { Button, Form, Input } from 'antd'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  LexicalCommand,
  LexicalEditor,
} from 'lexical'
import React from 'react'
import { CAN_USE_DOM } from 'shared/canUseDOM'

// import landscapeImage from '../images/landscape.jpg'
// import yellowFlowerImage from '../images/yellow-flower.jpg'
import { $createImageNode, $isImageNode, ImageNode, ImagePayload } from '../nodes/ImageNode'
// import Button from '../../ui/Button'
// import { DialogActions, DialogButtonsList } from '../../ui/Dialog'
// import FileInput from '../../ui/FileInput'
// import TextInput from '../../ui/TextInput'

export type InsertImagePayload = Readonly<ImagePayload>

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND')

// export function InsertImageUriDialogBody({
//   onClick,
// }: {
//   onClick: (payload: InsertImagePayload) => void
// }) {
//   const [src, setSrc] = React.useState('')
//   const [altText, setAltText] = React.useState('')

//   const isDisabled = src === ''

//   return (
//     <>
//       <TextInput
//         label="Image URL"
//         placeholder="i.e. https://source.unsplash.com/random"
//         onChange={setSrc}
//         value={src}
//         data-test-id="image-modal-url-input"
//       />
//       <TextInput
//         label="Alt Text"
//         placeholder="Random unsplash image"
//         onChange={setAltText}
//         value={altText}
//         data-test-id="image-modal-alt-text-input"
//       />
//       <DialogActions>
//         <Button
//           data-test-id="image-modal-confirm-btn"
//           disabled={isDisabled}
//           onClick={() => onClick({ altText, src })}
//         >
//           Confirm
//         </Button>
//       </DialogActions>
//     </>
//   )
// }

// export function InsertImageUploadedDialogBody({
//   onClick,
// }: {
//   onClick: (payload: InsertImagePayload) => void
// }) {
//   const [src, setSrc] = React.useState('')
//   const [altText, setAltText] = React.useState('')

//   const isDisabled = src === ''

//   const loadImage = (files: FileList | null) => {
//     const reader = new FileReader()
//     reader.onload = function () {
//       if (typeof reader.result === 'string') {
//         setSrc(reader.result)
//       }
//       return ''
//     }
//     if (files !== null) {
//       reader.readAsDataURL(files[0])
//     }
//   }

//   return (
//     <>
//       <FileInput
//         label="Image Upload"
//         onChange={loadImage}
//         accept="image/*"
//         data-test-id="image-modal-file-upload"
//       />
//       <TextInput
//         label="Alt Text"
//         placeholder="Descriptive alternative text"
//         onChange={setAltText}
//         value={altText}
//         data-test-id="image-modal-alt-text-input"
//       />
//       <DialogActions>
//         <Button
//           data-test-id="image-modal-file-upload-btn"
//           disabled={isDisabled}
//           onClick={() => onClick({ altText, src })}
//         >
//           Confirm
//         </Button>
//       </DialogActions>
//     </>
//   )
// }

export function InsertImageDialog({
  activeEditor,
  close,
}: {
  activeEditor: LexicalEditor
  close: () => void
}): JSX.Element {
  const onFinish = (values: any) => {
    console.log('Success:', values)
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, values)
    close()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onCancel = () => {
    close()
  }

  return (
    <Form
      name="insert-image"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Image URL"
        name="src"
        rules={[{ required: true, message: 'Please input Image URL' }]}
      >
        <Input placeholder="i.e. https://source.unsplash.com/random" />
      </Form.Item>

      <Form.Item label="Alt Text" name="altText">
        <Input placeholder="Random unsplash image" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
  //
  //   const [mode, setMode] = React.useState<null | 'url' | 'file'>(null)
  //   const hasModifier = React.useRef(false)

  //   React.useEffect(() => {
  //     hasModifier.current = false
  //     const handler = (e: KeyboardEvent) => {
  //       hasModifier.current = e.altKey
  //     }
  //     document.addEventListener('keydown', handler)
  //     return () => {
  //       document.removeEventListener('keydown', handler)
  //     }
  //   }, [activeEditor])

  //   const onClick = (payload: InsertImagePayload) => {
  //     activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
  //     onClose()
  //   }

  //   return (
  //     <>
  //       {!mode && (
  //         <DialogButtonsList>
  //           <Button
  //             data-test-id="image-modal-option-sample"
  //             onClick={() =>
  //               onClick(
  //                 hasModifier.current
  //                   ? {
  //                       altText: 'Daylight fir trees forest glacier green high ice landscape',
  //                       src: landscapeImage,
  //                     }
  //                   : {
  //                       altText: 'Yellow flower in tilt shift lens',
  //                       src: yellowFlowerImage,
  //                     },
  //               )
  //             }
  //           >
  //             Sample
  //           </Button>
  //           <Button data-test-id="image-modal-option-url" onClick={() => setMode('url')}>
  //             URL
  //           </Button>
  //           <Button data-test-id="image-modal-option-file" onClick={() => setMode('file')}>
  //             File
  //           </Button>
  //         </DialogButtonsList>
  //       )}
  //       {mode === 'url' && <InsertImageUriDialogBody onClick={onClick} />}
  //       {mode === 'file' && <InsertImageUploadedDialogBody onClick={onClick} />}
  //     </>
  //   )
}

function ImagesPlugin({ captionsEnabled }: { captionsEnabled?: boolean }): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor')
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload)
          $insertNodes([imageNode])
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event)
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event)
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor)
        },
        COMMAND_PRIORITY_HIGH,
      ),
    )
  }, [captionsEnabled, editor])

  return null
}

const TRANSPARENT_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const img = CAN_USE_DOM ? window.document.createElement('img') : null
if (img != null) {
  img.src = TRANSPARENT_IMAGE
}

function onDragStart(event: DragEvent): boolean {
  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return false
  }
  dataTransfer.setData('text/plain', '_')
  dataTransfer.setDragImage(img!, 0, 0)
  dataTransfer.setData(
    'application/x-lexical-drag',
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: 'image',
    }),
  )

  return true
}

function onDragover(event: DragEvent): boolean {
  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  if (!canDropImage(event)) {
    event.preventDefault()
  }
  return true
}

function onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  const data = getDragImageData(event)
  if (!data) {
    return false
  }
  event.preventDefault()
  if (canDropImage(event)) {
    const range = getDragSelection(event)
    node.remove()
    const rangeSelection = $createRangeSelection()
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range)
    }
    $setSelection(rangeSelection)
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data)
  }
  return true
}

function getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) {
    return null
  }
  const nodes = selection.getNodes()
  const node = nodes[0]
  return $isImageNode(node) ? node : null
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData('application/x-lexical-drag')
  if (!dragData) {
    return null
  }
  const { type, data } = JSON.parse(dragData)
  if (type !== 'image') {
    return null
  }

  return data
}

declare global {
  interface DragEvent {
    rangeOffset?: number
    rangeParent?: Node
  }
}

function canDropImage(event: DragEvent): boolean {
  const target = event.target
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest('code, span.editor-image') &&
    target.parentElement &&
    target.parentElement.closest('div.ContentEditable__root')
  )
}

function getDragSelection(event: DragEvent): Range | null | undefined {
  let range
  const target = event.target as null | Element | Document
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
      ? (target as Document).defaultView
      : (target as Element).ownerDocument.defaultView
  const domSelection = getDOMSelection(targetWindow)
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY)
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0)
    range = domSelection.getRangeAt(0)
  } else {
    throw Error(`Cannot get the selection when dragging`)
  }

  return range
}

export default ImagesPlugin
