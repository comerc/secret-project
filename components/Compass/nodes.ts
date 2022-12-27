import { LinkNode, AutoLinkNode } from '@lexical/link'
import { ListNode, ListItemNode } from '@lexical/list'
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HashtagNode } from '@lexical/hashtag'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'

const nodes = [
  HeadingNode,
  QuoteNode,
  LinkNode,
  ListNode,
  ListItemNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  HorizontalRuleNode,
  CodeHighlightNode,
  CodeNode,
  HashtagNode,
]

export default nodes
