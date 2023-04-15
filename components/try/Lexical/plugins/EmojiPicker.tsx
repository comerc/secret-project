import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  LexicalTypeaheadMenuPlugin,
  TypeaheadOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin'
import { $createTextNode, $getSelection, $isRangeSelection, TextNode } from 'lexical'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from '../Lexical.module.css'

class EmojiOption extends TypeaheadOption {
  title: string
  emoji: string
  keywords: Array<string>

  constructor(
    title: string,
    emoji: string,
    options: {
      keywords?: Array<string>
    },
  ) {
    super(title)
    this.title = title
    this.emoji = emoji
    this.keywords = options.keywords || []
  }
}
function EmojiMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: EmojiOption
}) {
  let className = 'item'
  if (isSelected) {
    className += ' selected'
  }
  return (
    <li
      key={option.key}
      tabIndex="-1"
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={'typeahead-item-' + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <span className="text">
        {option.emoji} {option.title}
      </span>
    </li>
  )
}

type Emoji = {
  emoji: string
  description: string
  category: string
  aliases: Array<string>
  tags: Array<string>
  unicode_version: string
  ios_version: string
  skin_tones?: boolean
}

const MAX_EMOJI_SUGGESTION_COUNT = 10

function EmojiPickerPlugin() {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = React.useState<string | null>(null)
  const [emojis, setEmojis] = React.useState<Array<Emoji>>([])

  React.useEffect(() => {
    // @ts-ignore
    import('../utils/emojiList.ts').then((file) => setEmojis(file.default))
  }, [])

  const emojiOptions = React.useMemo(
    () =>
      emojis != null
        ? emojis.map(
            ({ emoji, aliases, tags }) =>
              new EmojiOption(aliases[0], emoji, {
                keywords: [...aliases, ...tags],
              }),
          )
        : [],
    [emojis],
  )

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch(':', {
    minLength: 0,
  })

  const options: Array<EmojiOption> = React.useMemo(() => {
    return emojiOptions
      .filter((option: EmojiOption) => {
        return queryString != null
          ? new RegExp(queryString, 'gi').exec(option.title) || option.keywords != null
            ? option.keywords.some((keyword: string) => new RegExp(queryString, 'gi').exec(keyword))
            : false
          : emojiOptions
      })
      .slice(0, MAX_EMOJI_SUGGESTION_COUNT)
  }, [emojiOptions, queryString])

  const onSelectOption = React.useCallback(
    (selectedOption: EmojiOption, nodeToRemove: TextNode | null, closeMenu: () => void) => {
      editor.update(() => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection) || selectedOption == null) {
          return
        }

        if (nodeToRemove) {
          nodeToRemove.remove()
        }

        selection.insertNodes([$createTextNode(selectedOption.emoji)])

        closeMenu()
      })
    },
    [editor],
  )

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) => {
        if (anchorElementRef.current == null || options.length === 0) {
          return null
        }

        return anchorElementRef.current && options.length
          ? ReactDOM.createPortal(
              <div className={`${styles['typeahead-popover']} ${styles['emoji-menu']}`}>
                <ul>
                  {options.map((option: EmojiOption, index) => (
                    <div key={option.key}>
                      <EmojiMenuItem
                        index={index}
                        isSelected={selectedIndex === index}
                        onClick={() => {
                          setHighlightedIndex(index)
                          selectOptionAndCleanUp(option)
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(index)
                        }}
                        option={option}
                      />
                    </div>
                  ))}
                </ul>
              </div>,
              anchorElementRef.current,
            )
          : null
      }}
    />
  )
}

export default EmojiPickerPlugin
