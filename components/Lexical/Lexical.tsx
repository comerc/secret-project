import React from 'react'
import { LexicalComposer, InitialEditorStateType } from '@lexical/react/LexicalComposer'
import { SharedAutocompleteContext } from './context/SharedAutocomplete'
// import { SharedHistoryContext } from './context/SharedHistory'
import editorNodes from './editorNodes'
// import {TableContext} from './plugins/TablePlugin';
import theme from './themes/editor'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
// import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
// import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'

// import {createWebsocketProvider} from './collaboration';
// import {useSettings} from './context/SettingsContext';
// import {useSharedHistoryContext} from './context/SharedHistory';
// import TableCellNodes from './nodes/TableCellNodes';
import ActionsPlugin from './plugins/Actions'
// import AutocompletePlugin from './plugins/AutocompletePlugin';
// import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLink'
import ClickableLinkPlugin from './plugins/ClickableLink'
// import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlight'
// import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import ComponentPickerPlugin from './plugins/ComponentPicker'
// import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlock'
import EmojiPickerPlugin from './plugins/EmojiPicker'
// import EmojisPlugin from './plugins/Emojis'
// import EquationsPlugin from './plugins/EquationsPlugin';
// import ExcalidrawPlugin from './plugins/ExcalidrawPlugin';
// import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditor'
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbar'
import HorizontalRulePlugin from './plugins/HorizontalRule'
import ImagesPlugin from './plugins/Images'
// import KeywordsPlugin from './plugins/KeywordsPlugin';
import LinkPlugin from './plugins/Link'
// import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { MARKDOWN_TRANSFORMERS } from './plugins/markdownTransformers'
// import {MaxLengthPlugin} from './plugins/MaxLengthPlugin';
import MentionsPlugin from './plugins/Mentions'
// import PollPlugin from './plugins/PollPlugin';
// import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
// import TabFocusPlugin from './plugins/TabFocusPlugin';
// import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
// import TableCellResizer from './plugins/TableCellResizer';
// import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
// import {TablePlugin as NewTablePlugin} from './plugins/TablePlugin';
import ToolbarPlugin from './plugins/Toolbar'
// import TreeViewPlugin from './plugins/TreeViewPlugin';
// import TwitterPlugin from './plugins/TwitterPlugin';
// import YouTubePlugin from './plugins/YouTubePlugin';
// import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

import styles from './Lexical.module.css'

function Editor({
  initialEditorState,
  isInitialEditable,
}: {
  initialEditorState: InitialEditorStateType
  isInitialEditable: boolean
}) {
  const initialConfig = {
    namespace: 'Lexical',
    editorState: initialEditorState,
    nodes: [...editorNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: theme,
    editable: isInitialEditable,
  }
  // const {historyState} = useSharedHistoryContext();
  const [floatingAnchorElem, setFloatingAnchorElem] = React.useState<HTMLDivElement | null>(null)
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }
  // const cellEditorConfig = {
  //   namespace: 'SecretProject',
  //   nodes: [...TableCellNodes],
  //   onError: (error: Error) => {
  //     throw error
  //   },
  //   theme: PlaygroundEditorTheme,
  // }
  const [isMarkdown, setIsMarkdown] = React.useState(false)
  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* <SharedHistoryContext> */}
      {/* <TableContext> */}
      <SharedAutocompleteContext>
        {/* <div className={styles.shell}>1234</div> */}
        <div className={styles.shell}>
          {!isMarkdown && <ToolbarPlugin />}
          <div className="editor-container">
            {/* <DragDropPaste /> */}
            <AutoFocusPlugin />
            <ClearEditorPlugin />
            <ComponentPickerPlugin />
            <EmojiPickerPlugin />
            {/* <AutoEmbedPlugin /> */}
            <MentionsPlugin />
            {/* <EmojisPlugin /> */}
            <HashtagPlugin />
            {/* <KeywordsPlugin /> */}
            {/* <SpeechToTextPlugin /> */}
            <AutoLinkPlugin />
            {/* {isCollab ? (
                <CollaborationPlugin
                  id="main"
                  providerFactory={createWebsocketProvider}
                  shouldBootstrap={!skipCollaborationInit}
                />
              ) : (
                <HistoryPlugin externalHistoryState={historyState} />
              )} */}
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className={`editor${isMarkdown ? ' is-markdown' : ''}`} ref={onRef}>
                    <ContentEditable className={styles.ContentEditable__root} />
                  </div>
                </div>
              }
              placeholder={<div className={styles.Placeholder__root}>Enter some rich text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS} />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
            {/* <TablePlugin /> */}
            {/* <TableCellResizer /> */}
            {/* <NewTablePlugin cellEditorConfig={cellEditorConfig}>
                    <AutoFocusPlugin />
                    <RichTextPlugin
                      contentEditable={<ContentEditable className="TableNode__contentEditable" />}
                      placeholder={null}
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                    <MentionsPlugin />
                    <HistoryPlugin />
                    <ImagesPlugin captionsEnabled={false} />
                    <LinkPlugin />
                    <ClickableLinkPlugin />
                    <FloatingTextFormatToolbarPlugin />
                  </NewTablePlugin> */}
            <ImagesPlugin />
            <LinkPlugin />
            {/* <PollPlugin /> */}
            {/* <TwitterPlugin /> */}
            {/* <YouTubePlugin /> */}
            {/* <FigmaPlugin /> */}
            <ClickableLinkPlugin />
            <HorizontalRulePlugin />
            {/* <EquationsPlugin /> */}
            {/* <ExcalidrawPlugin /> */}
            {/* <TabFocusPlugin /> */}
            <TabIndentationPlugin />
            {/* <CollapsiblePlugin /> */}
            {!isMarkdown && floatingAnchorElem && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                {/* <CodeActionMenuPlugin anchorElem={floatingAnchorElem} /> */}
                <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
                {/* <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} /> */}
                <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
              </>
            )}
            {/* <AutocompletePlugin /> */}
            {/* <div>{showTableOfContents && <TableOfContentsPlugin />}</div> */}
            <ActionsPlugin
              isRichText={true}
              isMarkdown={isMarkdown}
              setIsMarkdown={setIsMarkdown}
            />
          </div>
        </div>
      </SharedAutocompleteContext>
      {/* </TableContext> */}
      {/* </SharedHistoryContext> */}
    </LexicalComposer>
  )
}

export default Editor
