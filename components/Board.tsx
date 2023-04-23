import React from 'react'
import { renderToString } from 'react-dom/server'
import { useRouter } from 'next/router'
import {
  EllipsisOutlined,
  EyeOutlined,
  ContainerOutlined,
  MessageOutlined,
  CheckSquareOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  BorderOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Input, Button, Tooltip, Avatar } from 'antd'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd' // 'react-beautiful-dnd'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, areEqual } from 'react-window'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useUpdateEffect, useIsFirstRender } from 'usehooks-ts'
import CustomDropdown from '.../components/CustomDropdown'
import MemberIcon from '.../components/MemberIcon'
import cx from 'classnames'
import dayjs from 'dayjs'
import pluralize from '.../utils/pluralize'
import labelColors from '.../utils/labelColors'
import normalizeUrlName from '.../utils/normalizeUrlName'
import getDueDateMode from '.../utils/getDueDateMode'
import getParentColumnId from '.../utils/getParentColumnId'
// import useScrollWithShadow from '.../utils/useScrollWithShadow'
import { MENU_WIDTH, COLUMN_WIDTH, COLUMN_FOOTER_HEIGHT } from '.../constants'

const _listRefMap = {}
let _cloneSize = 0

function ColumnFooter({ height }) {
  return (
    <div
      className="px-2 pb-2 pt-0.5"
      style={{
        height,
      }}
    >
      <Button
        data-tab-is-list="prev"
        className="flex h-[28px] w-full items-center rounded-[3px] border-0 bg-transparent px-2 py-1 leading-5 text-[var(--ds-text-subtle,#5e6c84)] shadow-none text-start hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)] hover:text-[var(--ds-text,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)] [&>:last-child]:truncate"
        icon={<PlusOutlined />}
      >
        Добавить карточку
      </Button>
    </div>
  )
}

// TODO: ощутимо мигают иконки при drop
function Members({ members }) {
  return (
    <Avatar.Group className="float-right mb-1 mr-[-2px] block" size="small">
      {members.map((member, index, a) => (
        <MemberIcon key={member.login.uuid} {...member} zIndex={a.length - index} />
      ))}
    </Avatar.Group>
  )
}

function DueDateBadge({ start, deadline, mode = 'warning' }) {
  const [checked, setChecked] = React.useState(false)
  const currentMode = getDueDateMode({ deadline, mode: checked ? 'success' : mode })
  return (
    <Badge
      title={currentMode.title}
      style={currentMode.style}
      className="transition [&:hover>.badge-check]:flex [&:hover>.badge-clock]:hidden"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setChecked(!checked)
      }}
    >
      <ClockCircleOutlined className="badge-clock badge-icon" />
      {checked ? (
        <CheckSquareOutlined className="badge-check badge-icon hidden" />
      ) : (
        <BorderOutlined className="badge-check badge-icon hidden" />
      )}
      <BadgeText>
        {!!start && start.format('D MMM - ')}
        {deadline.format('D MMM')}
      </BadgeText>
    </Badge>
  )
}

function StartDateBadge({ start }) {
  return (
    <Badge>
      <ClockCircleOutlined className="badge-clock badge-icon" />
      <BadgeText>Дата начала: {start.format('D MMM')}</BadgeText>
    </Badge>
  )
}

function BadgeText({ children }) {
  return <span className="whitespace-nowrap pl-0.5 pr-1 text-xs">{children}</span>
}

function Badge({ className, style, onClick, title, children }) {
  return (
    <div
      role={onClick ? 'button' : null}
      tabIndex={onClick ? '-1' : null}
      className={cx(
        'mb-1 mr-1 inline-flex max-w-full items-center truncate rounded-[3px] bg-[var(--background-color)] p-0.5 text-[var(--text-color)] hover:bg-[var(--background-color-hovered)]',
        className,
      )}
      {...{ style, onClick, title }}
    >
      {children}
    </div>
  )
}

function Badges() {
  const start = dayjs('2023-02-23')
  const deadline = dayjs('2023-02-24')
  return (
    <div className="float-left ml-[-2px] max-w-full">
      <Badge title="Вы подписаны на эту карточку">
        <EyeOutlined className="badge-icon" />
      </Badge>
      {deadline ? <DueDateBadge {...{ start, deadline }} /> : <StartDateBadge {...{ start }} />}
      <Badge title="Эта карточка с описанием">
        <ContainerOutlined className="badge-icon" />
      </Badge>
      <Badge title="Комментарии">
        <MessageOutlined className="badge-icon" />
        <BadgeText>3</BadgeText>
      </Badge>
      <Badge title="Вложения">
        <PaperClipOutlined className="badge-icon" />
        <BadgeText>3</BadgeText>
      </Badge>
      <Badge title="Элементы списка задач">
        <CheckSquareOutlined className="badge-icon" />
        <BadgeText>8/10</BadgeText>
      </Badge>
    </div>
  )
}

const FrontLabelsContext = React.createContext({})

function FrontLabelsState({ children }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <FrontLabelsContext.Provider value={{ isExpanded, setIsExpanded, hasTooltip: true }}>
      {children}
    </FrontLabelsContext.Provider>
  )
}

function FrontLabel({ id, colorId, name }) {
  const { isExpanded, setIsExpanded, hasTooltip } = React.useContext(FrontLabelsContext)
  const color = labelColors[colorId]
  const title = `Цвет: ${color.name}, название: «${name}»`
  const withTooltip = (children) => {
    return hasTooltip ? (
      <Tooltip
        // TODO: добавить цвет?
        // overlayStyle={{ ...color.style }}
        // overlayInnerStyle={{ color: 'var(--ds-text, #172b4d)' }}
        // color={'var(--background-color)'}
        placement="topLeft"
        title={title}
      >
        {children}
      </Tooltip>
    ) : (
      children
    )
  }
  return withTooltip(
    <div className="inline-flex max-w-[calc(100%-4px)]">
      <button
        style={color.style}
        className={cx(
          isExpanded
            ? 'h-4 min-w-[56px] max-w-full truncate bg-[var(--background-color)] pl-4 pr-2 text-xs'
            : 'h-2 min-w-[40px] max-w-[40px] bg-[var(--foreground-color)]',
          'relative inline-block rounded text-left transition hover:brightness-[.85] hover:saturate-[.85]',
        )}
        tabIndex="-1"
        // aria-label={title} // TODO: опасная операция - могут быть невалидные символы
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
      >
        {isExpanded && (
          <>
            <div className="absolute bottom-1 left-1 top-1 h-2 w-2 rounded-[50%] bg-[var(--foreground-color)]" />
            {name}
          </>
        )}
      </button>
    </div>,
  )
}

function FrontLabels({ labels }) {
  const { isExpanded } = React.useContext(FrontLabelsContext)
  // TODO: добавить режим для дальтоников
  return (
    <div className={cx(isExpanded ? 'mb-1' : 'my-1', 'flex flex-wrap gap-1')}>
      {labels.map((label) => (
        <FrontLabel key={label.id} {...label} />
      ))}
    </div>
  )
}

function ListCard({ issue: { id, title, labels, members }, selected, ...rest }) {
  // TODO: cover
  // TODO: focus:outline-none - заменить на свой вариант, вписанный в размеры (или просто вертикальная полоска справа)
  return (
    <a
      className={cx(
        selected
          ? 'bg-[var(--ds-surface-raised-hovered,#f4f5f7)]'
          : 'bg-[var(--ds-surface-raised,#fff)]',
        'relative mx-2 mb-2 block rounded-[3px] text-sm text-[var(--ds-text,inherit)] shadow', // hover:bg-[var(--ds-surface-raised-hovered,#f4f5f7)]
        // TODO: без hover: видимая задержка при перемещении мышкой, но конфликт с selected при ArrowLeft/ArrowRight
      )}
      {...rest}
    >
      <div className="overflow-hidden px-2 pb-0.5 pt-1.5">
        <FrontLabels {...{ labels }} />
        <div className="mb-1 break-words">{title}</div>
        <Badges />
        <Members {...{ members }} />
      </div>
      {/* <Button
              // TODO: добавить редактирование карточки на месте
              icon={<EditOutlined />}
              size="small"
              className="absolute right-0.5 top-0.5 rounded-[3px] border-0 bg-[var(--ds-surface-raised-hovered,#f4f5f7)]
              opacity-80 shadow-none
              "
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
            /> */}
    </a>
  )
}

// @deprecated
function ListCards({ maxHeight, issues, issuesOrder }) {
  const ref = React.useRef()
  const [initialize, osInstance] = useOverlayScrollbars({
    options: {
      overflow: {
        x: 'hidden',
        y: 'scroll',
      },
      // paddingAbsolute: true,
      // showNativeOverlaidScrollbars: true,
      scrollbars: {
        theme: 'os-theme-light list-cards',
        visibility: 'auto',
        autoHide: 'leave',
        autoHideDelay: 1300,
        dragScroll: true,
        clickScroll: false,
        pointers: ['mouse', 'touch', 'pen'],
      },
    },
    // events, defer
  })
  React.useEffect(() => {
    initialize(ref.current)
  }, [initialize])
  // TODO: тут нужно починить z-index
  // const { boxShadow, onScrollHandler } = useScrollWithShadow()
  return (
    <div
      className="overflow-x-hidden"
      // onScroll={onScrollHandler}
      // style={{ boxShadow }}
      style={{
        maxHeight,
      }}
      ref={ref}
    >
      {issuesOrder.map((id) => (
        <ListCard key={id} issue={issues[id]} />
      ))}
    </div>
  )
}

function ColumnItem({ provided, issue, style, isDragging }) {
  const router = useRouter()
  const urlName = React.useMemo(() => normalizeUrlName(issue.title), [issue.title])
  const href = `/c/${issue.id}/${urlName}`
  const onClick = (event) => {
    event.preventDefault()
    router.push(href, undefined, {
      shallow: true,
    })
    // TODO: открывать модальный диалог по месту для лучшей анимации
  }
  const {
    // onDeleteItem, isSelectedId,
    state,
    setState,
    // selectedId,
    dragType,
    isArrowKeyPressed,
  } = React.useContext(BoardContext)
  const itemId = isDragging ? 'item-clone' : `item-${issue.id}`
  const { style: draggableStyle, ...draggableProps } = provided.draggableProps
  const onMouseEnter = (event) => {
    if (isArrowKeyPressed.current || dragType.current !== '') {
      return
    }
    console.log('onMouseEnter', itemId)
    // TODO: если мышка над карточкой, то selected стрелками ломается
    setState({ ...state, selectedId: itemId })
  }
  const onMouseLeave = (event) => {
    if (isArrowKeyPressed.current || dragType.current !== '') {
      return
    }
    console.log('onMouseLeave', itemId)
    // TODO: если мышка над карточкой, то selected стрелками ломается
    setState({ ...state, selectedId: '' })
  }
  return (
    <div
      ref={provided.innerRef}
      {...draggableProps}
      style={{ ...style, ...draggableStyle }}
      // className={cx({
      //   styles.item,
      //   [styles['is-dragging']]: isDragging,
      //   [styles['is-selected']]: !isDragging && isSelectedId(itemId,
      // })}
      // @deprecated
      // onFocus={(event) => {
      //   const regex = /^item-\d+$/g
      //   if (!regex.test(event.target.id)) {
      //     return // for child controls
      //   }
      //   const itemId = event.target.id
      //   setState({ ...state, selectedId: itemId })
      //   setTimeout(() => {
      //     // HACK: после вызова перестаёт работать скролл на Tab по карточкам
      //     event.target.scrollIntoView({ alignToTop: false, block: 'nearest' })
      //   })
      // }}
    >
      <ListCard
        id={itemId}
        selected={state.selectedId === itemId}
        {...{
          issue,
          href,
          onClick,
          onMouseEnter,
          onMouseLeave,
          ...provided.dragHandleProps,
        }}
      />
    </div>
  )
}

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
const ColumnRow = React.memo(function Row({ data, index, style }) {
  const issue = data[index]
  // We are rendering an extra item for the placeholder
  if (!issue) {
    return null
  }
  return (
    <Draggable draggableId={issue.id} key={issue.id} {...{ index }}>
      {(provided) => <ColumnItem {...{ provided, issue, style }} />}
    </Draggable>
  )
}, areEqual)

// Alter Case
const withScrollbars = React.forwardRef(({ children, onScroll, style }, ref) => {
  const refSetter = React.useCallback((scrollbarsRef) => {
    if (scrollbarsRef) {
      ref(scrollbarsRef.view)
    } else {
      ref(null)
    }
  }, [])
  const isFirst = useIsFirstRender() // HACK: отрабатывает отрисовку ColumnHeader (Input.TextArea.autoSize)
  if (isFirst) return <div {...{ ref }} />
  return (
    <div
      className="relative"
      style={{
        height: Math.min(style.height, children.props.style.height) + COLUMN_FOOTER_HEIGHT,
        width: COLUMN_WIDTH,
      }}
    >
      <Scrollbars
        ref={refSetter}
        {...{ onScroll, style }}
        className={cx(
          'overflow-hidden [&>:last-child]:mt-[-2px]',
          '[&>:first-child>div]:bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]',
        )}
        renderView={(props) => {
          // HACK: dnd карточки вниз не дотягивает скрол на размер системного скрола
          return <div className="hide-system-scrollbar mx-0 my-0" {...props} />
        }}
      >
        {children}
      </Scrollbars>
      <div className="absolute bottom-0 left-0 right-0 rounded-b-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
        <ColumnFooter height={COLUMN_FOOTER_HEIGHT} />
      </div>
    </div>
  )
})

// Base Case
const withoutScrollbars = React.forwardRef(({ children, onScroll, style }, ref) => {
  const isFirst = useIsFirstRender() // HACK: отрабатывает отрисовку ColumnHeader (Input.TextArea.autoSize)
  if (isFirst) return <div {...{ ref }} />
  return (
    <div
      className="relative"
      style={{
        height: Math.min(style.height, children.props.style.height) + COLUMN_FOOTER_HEIGHT,
        width: COLUMN_WIDTH,
      }}
    >
      <div
        {...{ ref, style, onScroll }}
        className={cx(
          'hide-system-scrollbar',
          '[&>:first-child]:bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]',
        )}
      >
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 rounded-b-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
        <ColumnFooter height={COLUMN_FOOTER_HEIGHT} />
      </div>
    </div>
  )
})

// BUG: скролирую вторую колонку до конца и перемещаю на место первой - не отрисовывает элементы (эффект наблюдается только в первый раз)
// const withScrollbars = React.forwardRef(({ children, onScroll, style }, ref) => {
//   const ofRef = React.useRef(null)
//   React.useEffect(() => {
//     const viewport = ofRef.current.osInstance().elements().viewport
//     if (onScroll) viewport.addEventListener('scroll', onScroll)
//     return () => {
//       if (onScroll) viewport.removeEventListener('scroll', onScroll)
//     }
//   }, [ofRef, onScroll])
//   return (
//     <OverlayScrollbarsComponent
//       ref={ofRef}
//       options={{
//         overflow: {
//           x: 'hidden',
//           y: 'scroll',
//         },
//         paddingAbsolute: true,
//         showNativeOverlaidScrollbars: true,
//         scrollbars: {
//           theme: 'os-theme-light list-cards',
//           visibility: 'auto',
//           autoHide: 'leave',
//           autoHideDelay: 1300,
//           dragScroll: true,
//           clickScroll: false,
//           pointers: ['mouse', 'touch', 'pen'],
//         },
//       }}
//       {...{ style }}
//     >
//       <div
//         // ref={ref} // TODO: не надо ref?
//         className="[&>div]:bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]"
//       >
//         {children}
//         <div className="sticky bottom-0 z-[1000] rounded-b-[3px]">
//           <ColumnFooter height={COLUMN_FOOTER_HEIGHT} />
//         </div>
//       </div>
//     </OverlayScrollbarsComponent>
//   )
// })

// TODO: скролирование по вертикали должно начинаться раньше, чтобы dropable-item не выходил за границы колонки
function ColumnItemList({ id, issuesOrder, issues, index }) {
  // There is an issue I have noticed with react-window that when reordered
  // react-window sets the scroll back to 0 but does not update the UI
  // I should raise an issue for this.
  // As a work around I am resetting the scroll to 0
  // on any list that changes it's index
  const listRef = React.useRef()
  // TODO: а в оригинале скролится только drop-колонка и до начала dnd
  React.useLayoutEffect(() => {
    const list = listRef.current
    if (list) {
      list.scrollTo(0)
    }
  }, [index])
  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  // const calcEstimatedSize = React.useCallback(() => {
  //   const keys = Object.keys(column.items)
  //   if (keys.length === 0) {
  //     return 0
  //   }
  //   const estimatedHeight = keys.reduce((p, i) => p + getSize(i), 0)
  //   const result = estimatedHeight / keys.length
  //   return result
  // }, []) // TODO: оптимизировать
  // TODO: как бы убрать мигание ColumnFooter при ресайзе ColumnItemList?
  React.useEffect(() => {
    _listRefMap[id] = listRef
  }, [])
  const { isExpanded } = React.useContext(FrontLabelsContext)
  const itemData = issuesOrder.map((issueId) => issues[issueId])
  const getItemSize = (index) => {
    const issue = itemData[index]
    if (!issue) {
      return _cloneSize
    }
    const measureLayer = document.getElementById('measure-layer')
    measureLayer.innerHTML = renderToString(
      <FrontLabelsContext.Provider value={{ isExpanded, hasTooltip: false }}>
        <ListCard {...{ issue }} />
      </FrontLabelsContext.Provider>,
    )
    const rect = measureLayer.getBoundingClientRect()
    const size = rect.height
    return size
  }
  useUpdateEffect(() => {
    listRef.current.resetAfterIndex(0, true) // TODO: если второй параметр false, то перерисовка лучше, но с пропуском первого раза
  }, [isExpanded])
  const version = 'V2'
  return (
    // HACK: overflow-hidden прячет мигание увеличенной высоты колонки
    <div className="h-full overflow-hidden rounded-b-[3px]">
      {version === 'V2' && (
        <AutoSizer>
          {({ height, width }) => {
            return (
              <Droppable
                droppableId={id}
                mode="virtual"
                type="row"
                renderClone={(provided, snapshot, rubric) => {
                  _cloneSize = getItemSize(rubric.source.index)
                  return (
                    <ColumnItem
                      provided={provided}
                      isDragging={snapshot.isDragging}
                      issue={itemData[rubric.source.index]}
                    />
                  )
                }}
              >
                {(
                  provided,
                  { isDraggingOver, draggingOverWith, draggingFromThisWith, isUsingPlaceholder },
                ) => {
                  // Add an extra item to our list to make space for a dragging item
                  // Usually the DroppableProvided.placeholder does this, but that won't
                  // work in a virtual list
                  const itemCount =
                    isDraggingOver &&
                    draggingOverWith !== null &&
                    draggingFromThisWith === null &&
                    isUsingPlaceholder
                      ? issuesOrder.length + 1
                      : issuesOrder.length
                  return (
                    <VariableSizeList
                      // useIsScrolling // TODO: для isScrolling
                      height={height - COLUMN_FOOTER_HEIGHT}
                      itemCount={itemCount}
                      itemSize={getItemSize}
                      width={width}
                      outerRef={provided.innerRef}
                      outerElementType={withScrollbars}
                      itemData={itemData}
                      ref={listRef}
                      overscanCount={4}
                      // See notes at calcEstimatedSize
                      // estimatedItemSize={calcEstimatedSize()}
                    >
                      {ColumnRow}
                    </VariableSizeList>
                  )
                }}
              </Droppable>
            )
          }}
        </AutoSizer>
      )}
      {version === 'V1' && (
        <AutoSizer>
          {({ height, width }) => (
            <div
              style={{
                height,
                width,
              }}
            >
              <div className="rounded-b-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
                <ListCards maxHeight={height - COLUMN_FOOTER_HEIGHT} {...{ issues, issuesOrder }} />
                <ColumnFooter height={COLUMN_FOOTER_HEIGHT} />
              </div>
            </div>
          )}
        </AutoSizer>
      )}
    </div>
  )
}

function ColumnExtrasButton() {
  const data = [
    { 'add-card': 'Добавить карточку…' },
    { 'copy-list': 'Копировать список…' },
    { 'move-list': 'Переместить список…' },
    { 'list-subscribe': 'Подписаться' },
    'divider',
    { 'sort-cards': 'Сортировать по…' },
    'divider',
    // TODO: добавить автоматизацию
    // { group: 'Автоматизация' },
    // { '': 'Когда карточка добавлена в список…' },
    // { '': 'Каждый день, сортировать по…' },
    // { '': 'Каждый понедельник, сортировать по…' },
    // { '': 'Создать настраиваемое правило…' },
    // 'divider',
    { 'move-cards': 'Переместить все карточки списка…' },
    { 'archive-cards': 'Архивировать все карточки списка…' },
    'divider',
    { 'close-list': 'Архивировать список' },
  ]
  const items = data.map((currentValue, index) => {
    if (currentValue === 'divider') {
      return { type: 'divider' }
    }
    const [key, itemText] = Object.entries(currentValue)[0]
    return {
      key,
      label: (
        <CustomDropdown.Item>
          <div className="truncate">{itemText}</div>
        </CustomDropdown.Item>
      ),
    }
  })
  // TODO: useOnClickOutside
  return (
    <CustomDropdown
      header="Действия со списком"
      items={items}
      onClick={(event) => {
        // setSelected(event.key)
      }}
      smallSize
    >
      <Button
        data-tab-is-list="next"
        className="rounded-[3px] border-0 bg-transparent text-[var(--ds-icon-subtle,#6b778c)] shadow-none hover:bg-[var(--ds-background-neutral-hovered,#091e4214)] hover:text-[var(--ds-icon,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)]"
        icon={<EllipsisOutlined />}
      />
    </CustomDropdown>
  )
}

const ColumnHeaderInputContext = React.createContext({})

function ColumnHeaderInputState({ children }) {
  const [focused, setFocused] = React.useState(null)
  return (
    <ColumnHeaderInputContext.Provider value={{ focused, setFocused }}>
      {children}
    </ColumnHeaderInputContext.Provider>
  )
}

function ColumnHeader({ title, dragHandleProps }) {
  const [value, setValue] = React.useState(title)
  const inputRef = React.useRef()
  const { focused, setFocused } = React.useContext(ColumnHeaderInputContext)
  const isFocused = focused === inputRef.current
  const issuesCount = 98 // TODO: отображать реальное кол-во issues
  const isFilter = true // TODO: реализовать isFilter через Context
  // TODO: Esc - закончить редактирование
  // TODO: перехватывать arrow-keys при редактировании
  return (
    <div
      className="relative flex-none cursor-pointer rounded-t-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)] py-1.5 pl-2 pr-10"
      onClick={(event) => {
        event.preventDefault()
        if (isFocused) {
          const element = document.getElementById('board-wrapper')
          element.focus()
        }
      }}
      {...dragHandleProps}
      tabIndex="-1" // HACK: removed tabIndex="0" from dragHandleProps
    >
      <Input.TextArea
        className={cx(
          isFilter && 'mb-[-4px]',
          'min-h-[28px] resize-none overflow-hidden rounded-[3px] bg-transparent px-2 py-1 font-semibold leading-5 text-[var(--ds-text,#172b4d)] focus:bg-[var(--ds-background-input,#fff)]',
        )}
        bordered={false}
        spellCheck={false}
        ref={inputRef}
        autoSize
        // aria-label={title} // TODO: опасная операция - могут быть невалидные символы
        size={512}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onBlur={() => {
          setFocused(null)
          // setIsFocused(false)
        }}
        onFocus={() => {
          setFocused(inputRef.current)
          // setIsFocused(true)
        }}
      />
      {isFilter && (
        <p className="mx-2 text-sm text-[var(--ds-text-subtle,#5e6c84)]">
          {pluralize(issuesCount, ['карточка', 'карточки', 'карточек'])}
        </p>
      )}
      <div
        className={cx(isFocused && 'hidden', 'absolute bottom-0 left-0 right-0 top-0')}
        onClick={(event) => {
          event.preventDefault()
          inputRef.current.focus({
            preventScroll: true,
            cursor: 'all',
          })
        }}
      />
      <div className="absolute right-1 top-1">
        <ColumnExtrasButton />
      </div>
    </div>
  )
}

function Column({ column: { id, title, issuesOrder }, issues, index }) {
  const handleMouseDown = (event) => {
    if (event.target.parentElement.dataset.columnId) {
      return
    }
    event.stopPropagation() // запрещает передавать событие для горизонтального скрола в дочерних элементах
  }
  return (
    <Draggable draggableId={id} {...{ index }}>
      {({ innerRef, draggableProps, dragHandleProps }) => {
        const { style, ...rest } = draggableProps
        return (
          <div
            data-column-id={id} // !! зависит handleMouseDown
            className="mr-2 flex flex-col"
            ref={innerRef}
            style={{
              width: COLUMN_WIDTH,
              ...style,
            }}
            {...rest}
            onMouseDown={handleMouseDown}
            // TODO: doubleClick вызывает inline-форму добавления новой карточки
          >
            <ColumnHeader {...{ title, dragHandleProps }} />
            <ColumnItemList {...{ id, issuesOrder, issues, index }} />
          </div>
        )
      }}
    </Draggable>
  )
}

function Columns() {
  const { state, setState } = React.useContext(BoardContext)
  return (
    <FrontLabelsState>
      {state.columnsOrder.map((id, index) => (
        <Column key={id} column={state.columns[id]} issues={state.issues} {...{ index }} />
      ))}
    </FrontLabelsState>
  )
}

function reorderList(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

function CustomDragDropContext({ children }) {
  const { state, setState, dragType } = React.useContext(BoardContext)
  const { focused } = React.useContext(ColumnHeaderInputContext)
  const onBeforeDragStart = (result) => {
    setState({ ...state, selectedId: '' })
    dragType.current = result.type
    // if (focused) {
    //   const element = document.getElementById('board-wrapper')
    //   element.focus()
    // }
    // TODO: убрать focus для перетаскиваемого элемента, или оставить, как фичу?
  }
  const onDragEnd = (result) => {
    dragType.current = ''
    if (!result.destination) {
      return
    }
    if (result.type === 'column') {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const columnsOrder = reorderList(
        state.columnsOrder,
        result.source.index,
        result.destination.index,
      )
      setState({
        ...state,
        columnsOrder,
      })
      return
    }
    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId]
      const issuesOrder = reorderList(
        column.issuesOrder,
        result.source.index,
        result.destination.index,
      )
      // updating column entry
      setState({
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            issuesOrder,
          },
        },
      })
      const index = Math.min(result.source.index, result.destination.index)
      _listRefMap[column.id].current.resetAfterIndex(index)
      return
    }
    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId]
    const destinationColumn = state.columns[result.destination.droppableId]
    const item = sourceColumn.issuesOrder[result.source.index]
    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      issuesOrder: [...sourceColumn.issuesOrder],
    }
    newSourceColumn.issuesOrder.splice(result.source.index, 1)
    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      issuesOrder: [...destinationColumn.issuesOrder],
    }
    // in line modification of items
    newDestinationColumn.issuesOrder.splice(result.destination.index, 0, item)
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    }
    setState(newState)
    _listRefMap[newDestinationColumn.id].current.resetAfterIndex(result.destination.index)
    _listRefMap[newSourceColumn.id].current.resetAfterIndex(result.source.index)
  }
  return <DragDropContext {...{ onBeforeDragStart, onDragEnd }}>{children}</DragDropContext>
}

function Canvas({ isMenu, hasMenu, children }) {
  const ref = React.useRef()
  // const [initialize, osInstance] = useOverlayScrollbars({
  //   options: {
  //     overflow: {
  //       x: isMenu === hasMenu ? 'scroll' : 'hidden',
  //       y: 'hidden',
  //     },
  //     scrollbars: {
  //       theme: cx('os-theme-light board', hasMenu && 'has-menu'),
  //       visibility: 'auto',
  //       autoHide: 'never',
  //       autoHideDelay: 1300,
  //       dragScroll: true,
  //       clickScroll: true,
  //       pointers: ['mouse', 'touch', 'pen'],
  //     },
  //   },
  //   // events,
  //   defer: true,
  // })
  // React.useEffect(() => {
  //   initialize(ref.current)
  // }, [initialize])
  // TODO: enable doNestedScroll
  // const isMenuRef = React.useRef()
  // React.useEffect(() => {
  //   isMenuRef.current = isMenu
  // }, [isMenu])
  // const isActiveRef = React.useRef(false)
  // const timeoutIdRef = React.useRef(null)
  // const clientXRef = React.useRef()
  // const doNestedScroll = () => {
  //   if (!isActiveRef.current) {
  //     return
  //   }
  //   const INDENT = 150 // TODO: половина размера карточки
  //   const TIMEOUT = 16
  //   const SCROLL = 4
  //   const { viewport } = osInstance().elements()
  //   if (clientXRef.current > viewport.clientWidth - INDENT - (isMenuRef.current ? MENU_WIDTH : 0)) {
  //     viewport.scrollTo({ left: viewport.scrollLeft + SCROLL })
  //     timeoutIdRef.current = setTimeout(doNestedScroll, TIMEOUT)
  //     return
  //   }
  //   if (clientXRef.current < INDENT) {
  //     viewport.scrollTo({ left: viewport.scrollLeft - SCROLL })
  //     timeoutIdRef.current = setTimeout(doNestedScroll, TIMEOUT)
  //     return
  //   }
  //   timeoutIdRef.current = null
  // }
  const positionRef = React.useRef({
    startX: null,
    startScrollX: null,
  })
  const handleMouseDown = ({ target, clientX }) => {
    // if (['os-scrollbar-track', 'os-scrollbar-handle'].includes(target.className)) {
    if (target === ref.current.trackHorizontal) {
      return
    }
    // const { viewport } = osInstance().elements()
    // const { scrollLeft: windowScrollX, scrollWidth, clientWidth } = viewport
    const { scrollLeft: windowScrollX, clientWidth, scrollWidth } = ref.current.getValues()
    if (scrollWidth > clientWidth) {
      positionRef.current = {
        startX: clientX,
        startScrollX: windowScrollX,
      }
    }
    // TODO: enable doNestedScroll
    // isActiveRef.current = true
    // clientXRef.current = clientX
    // if (timeoutIdRef.current === null) {
    //   doNestedScroll()
    // }
  }
  const handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = positionRef.current
    if (startScrollX !== null) {
      const scrollX = startScrollX - clientX + startX
      // const { viewport } = osInstance().elements()
      // const { scrollLeft: windowScrollX, scrollWidth, clientWidth } = viewport
      const { scrollLeft: windowScrollX, clientWidth, scrollWidth } = ref.current.getValues()
      if (
        (scrollX > windowScrollX && windowScrollX < scrollWidth - clientWidth) ||
        (scrollX < windowScrollX && windowScrollX > 0)
      ) {
        // viewport.scrollTo({ left: scrollX })
        ref.current.scrollLeft(scrollX)
      }
      if (scrollX !== windowScrollX) {
        // const { scrollLeft: windowScrollX } = viewport
        const windowScrollX = ref.current.getScrollLeft()
        positionRef.current = {
          startX: clientX + windowScrollX - startScrollX,
          startScrollX,
        }
      }
    }
    // TODO: enable doNestedScroll
    // clientXRef.current = clientX
    // if (timeoutIdRef.current === null) {
    //   doNestedScroll()
    // }
  }
  const handleMouseUp = () => {
    positionRef.current = {
      startX: null,
      startScrollX: null,
    }
    // TODO: enable doNestedScroll
    // timeoutIdRef.current = null
    // isActiveRef.current = false
  }
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.addEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  const [hasScroll, setHasScroll] = React.useState(false)
  return (
    <Scrollbars
      // className="h-full overflow-y-hidden"
      {...{ ref }}
      onMouseDown={handleMouseDown}
      style={{
        background:
          'linear-gradient(to bottom,var(--board-header-background-color),#0000 80px,#0000)',
      }}
      renderView={(props) => {
        // HACK: dnd колонки вправо не дотягивает скрол на размер системного скрола
        return <div className="hide-system-scrollbar mx-0 my-0" {...props} />
      }}
      renderTrackHorizontal={() => {
        return (
          <div
            className={cx(
              'absolute bottom-0 left-0 mx-[24px] mb-[8px] h-[12px] rounded-[4px] bg-[#00000026]',
              hasScroll || 'invisible',
              hasMenu ? 'right-[var(--menu-width)]' : 'right-0 ',
            )}
          />
        )
      }}
      renderThumbHorizontal={() => {
        return <div className="h-full rounded-[inherit] bg-[#ffffff66]" />
      }}
      onUpdate={({ scrollWidth, clientWidth }) => {
        setHasScroll(scrollWidth - clientWidth > 1)
      }}
    >
      <div className="flex h-full pb-7">
        <div className="flex flex-col">{children}</div>
      </div>
    </Scrollbars>
  )
}

const BoardContext = React.createContext({})

export function BoardState({ children, columns, columnsOrder, issues }) {
  const [state, setState] = React.useState({ columns, columnsOrder, issues, selectedId: '' })
  // const selectedId = React.useRef('')
  React.useLayoutEffect(() => {
    const element = document.getElementById('board-wrapper')
    element.focus()
  }, [])
  // const onAddItem = (columnId) => () => {
  //   let text = prompt('Please enter title')
  //   const column = state.columns[columnId]
  //   const items = column.items
  //   const newState = {
  //     ...state,
  //     columns: {
  //       ...state.columns,
  //       [column.id]: {
  //         ...column,
  //         items: [{ id: nanoid(), text, columnId }, ...items],
  //       },
  //     },
  //   }
  //   setState(newState)
  //   _listRefMap[column.id].current.resetAfterIndex(0)
  // }
  // const onDeleteItem = (columnId, itemId) => () => {
  //   const column = state.columns[columnId]
  //   const items = column.items
  //   const index = items.findIndex((item) => item.id === itemId)
  //   const newColumn = {
  //     ...column,
  //     items: [...column.items],
  //   }
  //   newColumn.items.splice(index, 1)
  //   const newState = {
  //     ...state,
  //     columns: {
  //       ...state.columns,
  //       [columnId]: newColumn,
  //     },
  //   }
  //   setState(newState)
  //   _listRefMap[column.id].current.resetAfterIndex(index)
  // }
  // const isSelectedId = (itemId) => itemId === state.selectedId
  // @deprecated
  // const setSelectedId = (selectedId) => {
  //   const newState = { ...state, selectedId }
  //   setState(newState)
  // }
  const isArrowKeyPressed = React.useRef(false)
  const focusFirstItem = (columnId) => {
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.scrollTo(0)
    const column = state.columns[columnId]
    // TODO: если в колонке нет карточек, то переходить к следующей колонке
    const id = column.issuesOrder[0]
    const itemId = `item-${id}`
    const element = document.getElementById(itemId)
    element.focus()
  }
  const selectFirstItem = (columnId) => {
    const column = state.columns[columnId]
    // TODO: если в колонке нет карточек, то переходить к следующей колонке
    const id = column.issuesOrder[0]
    const itemId = `item-${id}`
    setState({ ...state, selectedId: itemId })
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.scrollTo(0)
  }
  const scrollToItem = (columnId, index) => {
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.scrollToItem(index)
  }
  const onKeyDown = (event) => {
    if (isArrowKeyPressed.current) {
      // TODO: обрабатывать удерживаемую нажатой клавишу стрелки
      return
    }
    if (event.code === 'Tab') {
      isArrowKeyPressed.current = true
      const tabIsList = event.target.dataset.tabIsList
      if ((tabIsList === 'prev' && event.shiftKey) || (tabIsList === 'next' && !event.shiftKey)) {
        const columnId = getParentColumnId(event.target)
        focusFirstItem(columnId)
        event.preventDefault()
      }
      return
    }
    const cases = {
      ArrowDown: () => {
        isArrowKeyPressed.current = true
        if (state.selectedId === '') {
          selectFirstItem(state.columnsOrder[0])
          return
        }
        for (const column of Object.values(state.columns)) {
          const index = column.issuesOrder.findIndex((id) => `item-${id}` === state.selectedId)
          if (index !== -1) {
            if (column.issuesOrder.length === index + 1) {
              // const id = column.issuesOrder[index]
              // const itemId = `item-${id}`
              // setState({ ...state, selectedId: itemId })
              scrollToItem(column.id, index)
              // const element = document.getElementById(itemId)
              // if (element) {
              //   element.parentElement.scrollIntoView({ alignToTop: false, block: 'nearest' }) // TODO: портит курсор
              // } else {
              //   selectFirstItem(column.id)
              // }
            } else {
              const id = column.issuesOrder[index + 1]
              const itemId = `item-${id}`
              setState({ ...state, selectedId: itemId })
              scrollToItem(column.id, index + 1)
              // const element = document.getElementById(itemId)
              // if (element) {
              //   element.parentElement.scrollIntoView({ alignToTop: false, block: 'nearest' }) // TODO: портит курсор
              // } else {
              //   selectFirstItem(column.id)
              // }
            }
            break
          }
        }
      },
      ArrowUp: () => {
        isArrowKeyPressed.current = true
        for (const column of Object.values(state.columns)) {
          const index = column.issuesOrder.findIndex((id) => `item-${id}` === state.selectedId)
          if (index !== -1) {
            if (index === 0) {
              // const id = column.issuesOrder[index]
              // const itemId = `item-${id}`
              // setState({ ...state, selectedId: itemId })
              scrollToItem(column.id, index)
              // const element = document.getElementById(itemId)
              // if (element) {
              //   element.parentElement.scrollIntoView({ alignToTop: false, block: 'nearest' }) // TODO: портит курсор
              // } else {
              //   selectFirstItem(column.id)
              // }
            } else {
              const id = column.issuesOrder[index - 1]
              const itemId = `item-${id}`
              setState({ ...state, selectedId: itemId })
              scrollToItem(column.id, index - 1)
              // const element = document.getElementById(itemId)
              // if (element) {
              //   element.parentElement.scrollIntoView({ alignToTop: false, block: 'nearest' }) // TODO: портит курсор
              // } else {
              //   selectFirstItem(column.id)
              // }
            }
            break
          }
        }
      },
      ArrowLeft: () => {
        isArrowKeyPressed.current = true
        for (const column of Object.values(state.columns)) {
          // TODO: если в колонке нет карточек, то переходить к следующей колонке
          const index = column.issuesOrder.findIndex((id) => `item-${id}` === state.selectedId)
          if (index !== -1) {
            const columnsOrderIndex = state.columnsOrder.findIndex(
              (columnId) => columnId === column.id,
            )
            if (columnsOrderIndex > 0) {
              const columnId = state.columnsOrder[columnsOrderIndex - 1]
              selectFirstItem(columnId)
            }
            break
          }
        }
      },
      ArrowRight: () => {
        isArrowKeyPressed.current = true
        for (const column of Object.values(state.columns)) {
          // TODO: если в колонке нет карточек, то переходить к предыдущей колонке
          const index = column.issuesOrder.findIndex((id) => `item-${id}` === state.selectedId)
          if (index !== -1) {
            const columnsOrderIndex = state.columnsOrder.findIndex(
              (columnId) => columnId === column.id,
            )
            if (columnsOrderIndex + 1 !== state.columnsOrder.length) {
              const columnId = state.columnsOrder[columnsOrderIndex + 1]
              selectFirstItem(columnId)
            }
            break
          }
        }
      },
    }
    const onCase = cases[event.code]
    if (onCase) {
      onCase()
      if (state.selectedId === '') {
        const columnId = state.columnsOrder[0]
        selectFirstItem(columnId)
      }
      event.preventDefault()
    }
  }
  const onKeyUp = () => {
    isArrowKeyPressed.current = false
  }
  const dragType = React.useRef('')
  return (
    <BoardContext.Provider
      value={{
        state,
        setState,
        // selectedId,
        isArrowKeyPressed,
        dragType,
      }}
    >
      <div
        id="board-wrapper"
        tabIndex="-1" // for fire onKeyDown after .focus()
        {...{ onKeyDown, onKeyUp }}
      >
        {children}
      </div>
    </BoardContext.Provider>
  )
}

function Board({ isMenu, hasMenu }) {
  return (
    <>
      <div
        id="measure-layer"
        style={{
          visibility: 'hidden',
          position: 'absolute',
          bottom: 0,
          // zIndex: 1000,
          width: COLUMN_WIDTH,
        }}
      />
      <Canvas {...{ isMenu, hasMenu }}>
        <ColumnHeaderInputState>
          <CustomDragDropContext>
            <Droppable droppableId="all-droppables" direction="horizontal" type="column">
              {(provided) => (
                <div
                  id="board"
                  className="ml-2.5 flex h-full select-none"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Columns />
                  {provided.placeholder}
                  {/* // TODO: кнопка "Добавьте ещё одну колонку" */}
                  <div style={{ width: hasMenu ? MENU_WIDTH : 0 }} />
                  {/* <Image
                    // TODO: обои
                    priority
                    src="/wallpapper.jpg"
                    fill
                    // width="5760" height="3840"
                    style={{
                      objectFit: 'cover',
                    }}
                  /> */}
                </div>
              )}
            </Droppable>
          </CustomDragDropContext>
        </ColumnHeaderInputState>
      </Canvas>
    </>
  )
}

export default Board
