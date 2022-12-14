import type { Klass, LexicalNode } from 'lexical'

import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HashtagNode } from '@lexical/hashtag'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { MarkNode } from '@lexical/mark'
import { OverflowNode } from '@lexical/overflow'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
// import { TableCellNode, TableNode, TableRowNode } from '@lexical/table' // TODO: добавить таблицу в Markdown

// import { CollapsibleContainerNode } from '../plugins/CollapsiblePlugin/CollapsibleContainerNode'
// import { CollapsibleContentNode } from '../plugins/CollapsiblePlugin/CollapsibleContentNode'
// import { CollapsibleTitleNode } from '../plugins/CollapsiblePlugin/CollapsibleTitleNode'
// import { AutocompleteNode } from './AutocompleteNode'
import { EmojiNode } from './nodes/Emoji'
// import { EquationNode } from './EquationNode'
// import { ExcalidrawNode } from './ExcalidrawNode'
// import { FigmaNode } from './FigmaNode'
import { ImageNode } from './nodes/Image'
// import { KeywordNode } from './KeywordNode'
// import { MentionNode } from './nodes/Mention'
// import { PollNode } from './PollNode'
// import { StickyNode } from './StickyNode'
// import { TableNode as NewTableNode } from './TableNode'
// import { TweetNode } from './TweetNode'
// import { YouTubeNode } from './YouTubeNode'

const EditorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  // NewTableNode,
  // TableNode,
  // TableCellNode,
  // TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  // PollNode,
  // StickyNode,
  ImageNode,
  // MentionNode,
  EmojiNode,
  // ExcalidrawNode,
  // EquationNode,
  // AutocompleteNode,
  // KeywordNode,
  HorizontalRuleNode,
  // TweetNode,
  // YouTubeNode,
  // FigmaNode,
  MarkNode,
  // CollapsibleContainerNode,
  // CollapsibleContentNode,
  // CollapsibleTitleNode,
]

export default EditorNodes
