import React from 'react'
import { renderToString } from 'react-dom/server'
import Image from 'next/image'
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
import { useOnClickOutside, useUpdateEffect, useIsFirstRender } from 'usehooks-ts'
import CustomDropdown from '.../components/CustomDropdown'
import MemberIcon from '.../components/MemberIcon'
import CustomButton from '.../components/CustomButton'
import EditCloseButton from '.../components/EditCloseButton'
import cx from 'classnames'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import pluralize from '.../utils/pluralize'
import labelColors from '.../utils/labelColors'
import normalizeUrlName from '.../utils/normalizeUrlName'
import getDueDateMode from '.../utils/getDueDateMode'
import getParentColumnId from '.../utils/getParentColumnId'
// import useScrollWithShadow from '.../utils/useScrollWithShadow'
import { MENU_WIDTH, COLUMN_WIDTH, COLUMN_FOOTER_HEIGHT } from '.../constants'

const _listRefMap = {}
let _cloneSize = 0

// TODO: double-click на пустом месте борды открывает диалог "Добавление списка"

function AddColumnButton() {
  const { state, setState } = React.useContext(BoardContext)
  const [isIdle, setIsIdle] = React.useState(true)
  const [value, setValue] = React.useState('')
  const submit = () => {
    const columnTitle = value.trim()
    if (columnTitle === '') {
      inputRef.current.focus()
      return
    }
    const columnId = nanoid()
    setState({
      ...state,
      columns: {
        ...state.columns,
        [columnId]: {
          id: columnId,
          title: columnTitle,
          issuesOrder: [],
        },
      },
      columnsOrder: [...state.columnsOrder, columnId],
    })
    setValue('')
    setTimeout(() => {
      inputRef.current.focus({ preventScroll: true })
      ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    })
    // TODO: сохранить данные
  }
  const close = () => {
    setIsIdle(true)
  }
  const ref = React.useRef()
  const inputRef = React.useRef()
  // TODO: клики внутри колонок не закрывают эту форму (например: редактировать заголовок, добавить карточку)
  useOnClickOutside(
    ref,
    close,
    'mouseup', // TODO: надо отслеживать target от mousedown, т.к. можно нажать-переместить-отпустить мышку (в оригинале такой же косяк)
  )
  return (
    <div
      className={cx(
        isIdle
          ? 'bg-[#ffffff3d] hover:bg-[var(--dynamic-button-hovered)]'
          : 'bg-[var(--ds-surface-sunken,#ebecf0)]',
        'mr-2 h-max rounded-[3px] transition-[background]',
      )}
      style={{
        width: COLUMN_WIDTH,
      }}
      {...{ ref }}
    >
      <Button
        className={cx(
          isIdle || 'hidden',
          'flex h-10 w-full items-center rounded-[3px] border-0 bg-transparent px-[14px] py-[10px] leading-5 text-[var(--dynamic-text)] shadow-none text-start [&>:last-child]:truncate',
        )}
        icon={<PlusOutlined />}
        onClick={() => {
          ref.current.scrollIntoView({ inline: 'start' })
          setIsIdle(false)
          setTimeout(() => {
            inputRef.current.focus()
          })
        }}
      >
        Добавить ещё одну колонку
      </Button>
      <form // отрабатывает [Enter] для <input>
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <div className={cx(isIdle ? 'pt-0' : 'pt-1', 'px-1')}>
          <Input
            placeholder="Ввести заголовок списка"
            className={cx(
              isIdle && 'hidden',
              'input-border-focused h-[36px] rounded-[3px] px-3 py-0 text-[14px] leading-5',
              'bg-[var(--ds-background-input,#fff)] text-[var(--ds-text,#172b4d)]',
              'placeholder:text-[var(--ds-text-subtle,#5e6c84)]',
            )}
            bordered={false}
            spellCheck={false}
            ref={inputRef}
            onChange={(event) => {
              setValue(event.target.value)
            }}
            onKeyDown={(event) => {
              event.stopPropagation()
            }}
            {...{ value }}
          />
        </div>
        <div
          className={cx(
            isIdle ? 'h-0 opacity-0' : 'h-10 opacity-100',
            'overflow-hidden transition-[height,opacity]',
          )}
        >
          <div className="flex gap-1 px-1 py-1">
            <CustomButton
              tabIndex={value.trim() === '' ? '-1' : '0'}
              primary
              htmlType="submit"
              onClick={submit}
            >
              Добавить список
            </CustomButton>
            <EditCloseButton onClick={close} />
          </div>
        </div>
      </form>
    </div>
  )
}

// TODO: редактирование карточки нажимается правой кнопкой мышки

function AddCardForm() {
  const { state, setState } = React.useContext(BoardContext)
  const value = state.addCardForm.title
  const ref = React.useRef()
  const close = (title = '') => {
    const columnId = state.addCardForm.columnId
    const column = state.columns[columnId]
    const index = column.issuesOrder.indexOf('0')
    const issuesOrder = [...column.issuesOrder]
    issuesOrder.splice(index, 1)
    setState({
      ...state,
      columns: {
        ...state.columns,
        [columnId]: {
          ...column,
          issuesOrder,
        },
      },
      addCardForm: {
        columnId: '',
        title,
      },
    })
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.resetAfterIndex(index)
    setTimeout(() => {
      list.scrollToItem(index)
    })
  }
  const submit = () => {
    const title = value.trim()
    if (title === '') {
      document.getElementById('input-card').focus()
      return
    }
    const columnId = state.addCardForm.columnId
    const column = state.columns[columnId]
    const keys = Object.keys(state.issues)
    const id = keys.length === 0 ? '1' : parseInt(keys[keys.length - 1]) + 1 + ''
    const issues = {
      ...state.issues,
      [id]: { id, title, description: '', members: [], labels: [], actions: [] },
    }
    const issuesOrder = [...column.issuesOrder]
    const index = issuesOrder.indexOf('0')
    issuesOrder.splice(index, 1, id)
    setState({
      ...state,
      issues,
      columns: {
        ...state.columns,
        [columnId]: {
          ...column,
          issuesOrder,
        },
      },
      addCardForm: {
        columnId: '',
        title: '',
      },
    })
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.resetAfterIndex(index)
    setTimeout(() => {
      list.scrollToItem(index)
    })
    // TODO: сохранить данные
  }
  useOnClickOutside(
    ref,
    (event) => {
      const element = event.target
      if (element.id === 'dragging-mask') {
        return
      }
      // TODO: если редактирование заголовка колонки или форма новой колонки, то не закрывают эту форму
      close(value)
    },
    'mouseup', // TODO: надо отслеживать target от mousedown, т.к. можно нажать-переместить-отпустить мышку (в оригинале такой же косяк)
  )
  return (
    <div tabIndex="-1" ref={ref} className="mx-2">
      <Input.TextArea
        id="input-card"
        className={cx(
          'focus-borderless resize-none overflow-hidden rounded-[3px] px-3 py-2 text-[14px] leading-5 shadow',
          'bg-[var(--ds-background-input,#fff)] text-[var(--ds-text,#172b4d)]',
          'placeholder:text-[var(--ds-text-subtle,#5e6c84)]',
        )}
        placeholder="Ввести заголовок для этой карточки"
        bordered={false}
        autoSize={{ minRows: 3, maxRows: 3 }}
        onFocus={() => {
          document.getElementById('input-card').setSelectionRange(value.length, value.length)
        }}
        onKeyDown={(event) => {
          event.stopPropagation()
        }}
        onChange={(event) => {
          setState({
            ...state,
            addCardForm: {
              ...state.addCardForm,
              title: event.target.value,
            },
          })
        }}
        {...{ value }}
      />
      <div className="flex gap-1 py-2">
        <CustomButton
          tabIndex={value.trim() === '' ? '-1' : '0'}
          primary
          htmlType="submit"
          onClick={submit}
        >
          Добавить карточку
        </CustomButton>
        <EditCloseButton
          onClick={() => {
            close()
          }}
        />
        {/* <div className="grow" /> */}
        {/* <Button
          className="rounded-[3px] border-0 bg-transparent text-[var(--ds-icon-subtle,#6b778c)] shadow-none hover:bg-[var(--ds-background-neutral-hovered,#091e4214)] hover:text-[var(--ds-icon,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)]"
          icon={<EllipsisOutlined className="scale-125" />}
        /> */}
      </div>
    </div>
  )
}

function openAddCardForm(state, setState, columnId, index = -1) {
  const column = state.columns[columnId]
  const issuesOrder = [...column.issuesOrder]
  if (index === -1) {
    index = column.issuesOrder.length
  }
  issuesOrder.splice(index, 0, '0')
  setState({
    ...state,
    columns: {
      ...state.columns,
      [columnId]: {
        ...column,
        issuesOrder,
      },
    },
    addCardForm: {
      ...state.addCardForm,
      columnId,
    },
  })
  const listRef = _listRefMap[columnId]
  const list = listRef.current
  list.resetAfterIndex(index)
  setTimeout(() => {
    list.scrollToItem(index)
    setTimeout(() => {
      document.getElementById('input-card')?.focus({
        preventScroll: true,
        // cursor: 'all', // не надо, т.к. дублирует .select() в .onFocus() и не отрабатывает по [TAB]
      })
    })
  })
}

function ColumnFooter() {
  const { state, setState } = React.useContext(BoardContext)
  return (
    <div className="px-2 pb-2 pt-0.5" style={{ height: COLUMN_FOOTER_HEIGHT }}>
      <Button
        data-tab-is-list="prev"
        className="flex h-[28px] w-full items-center rounded-[3px] border-0 bg-transparent px-2 py-1 leading-5 text-[var(--ds-text-subtle,#5e6c84)] shadow-none text-start hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)] hover:text-[var(--ds-text,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)] [&>:last-child]:truncate"
        icon={<PlusOutlined />}
        onClick={(event) => {
          const columnId = getParentColumnId(event.target)
          openAddCardForm(state, setState, columnId)
        }}
      >
        Добавить карточку
      </Button>
    </div>
  )
}

// ощутимо мигают иконки при drop - просто закрыть DevTools в Chrome
// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/avoiding-image-flickering.md
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
  // TODO: .list-card-cover
  // TODO: focus:outline-none - заменить на свой вариант, вписанный в размеры (или просто вертикальная полоска справа)
  return (
    <a
      className={cx(
        'list-card',
        selected
          ? 'bg-[var(--ds-surface-raised-hovered,#f4f5f7)]'
          : 'bg-[var(--ds-surface-raised,#fff)]',
        'relative mx-2 mb-2 block rounded-[3px] text-sm text-[var(--ds-text,inherit)] shadow',
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
        <ListCard key={id} issue={id === '0' ? { id: '0' } : issues[id]} />
      ))}
    </div>
  )
}

function ActiveListCard({ provided, snapshot, issue }) {
  const {
    // onDeleteItem,
    state,
    setState,
    isMouseFirst,
  } = React.useContext(BoardContext)
  const itemId = snapshot.isDragging ? 'item-clone' : `item-${issue.id}`
  const onMouseMove = () => {
    if (isMouseFirst) {
      setState({ ...state, selectedId: itemId })
    }
  }
  const onMouseLeave = () => {
    if (isMouseFirst) {
      setState({ ...state, selectedId: '' })
    }
  }
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
  return (
    <
      // TODO: справа мешает скролл
      // onDoubleClick={(event) => {
      //   event.stopPropagation()
      //   if (issue.id === '0') {
      //     return
      //   }
      //   const columnId = getParentColumnId(event.target)
      //   openAddCardForm(state, setState, columnId, 0)
      // }}
    >
      <ListCard
        id={itemId}
        selected={state.selectedId === itemId}
        {...{
          issue,
          href,
          onClick,
          onMouseMove,
          onMouseLeave,
          ...provided.dragHandleProps,
        }}
      />
      <div
        className="h-2 mx-2 mt-[-8px]"
        onDoubleClick={(event) => {
          event.stopPropagation()
          const columnId = getParentColumnId(event.target)
          const column = state.columns[columnId]
          const index = column.issuesOrder.indexOf(issue.id)
          openAddCardForm(state, setState, columnId, index + 1)
        }}
      />
    </>
  )
}

function ColumnItem({ provided, snapshot, issue, style }) {
  const { style: draggableStyle, ...draggableProps } = provided.draggableProps
  // HACK: отменил анимацию, т.к. успевал переместить мышку без установки state.selectedId
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md#skipping-the-drop-animation
  if (!!draggableStyle.transition && snapshot.isDropAnimating) {
    draggableStyle.transition = 'transform 0.001s'
  }
  return (
    <div ref={provided.innerRef} {...draggableProps} style={{ ...style, ...draggableStyle }}>
      {issue.id === '0' ? <AddCardForm /> : <ActiveListCard {...{ provided, snapshot, issue }} />}
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
    <Draggable
      isDragDisabled={issue.id === '0'}
      draggableId={issue.id}
      key={issue.id}
      {...{ index }}
    >
      {(provided, snapshot) => <ColumnItem {...{ provided, snapshot, issue, style }} />}
    </Draggable>
  )
}, areEqual)

const List = React.forwardRef(function List2({ isAddCardForm, ...props }, ref) {
  const isFirst = useIsFirstRender() // HACK: отрабатывает отрисовку ColumnHeader (для Input.TextArea.autoSize)
  const outerElementType = React.useMemo(() => {
    return React.forwardRef(function OuterElement({ children, onScroll, style }, ref) {
      // TODO: в оригинале горизонтальный скрол "прилипает" к половине ширины колонки, т.е. докручивает до нужного положения
      const refSetter = (scrollbarsRef) => {
        if (scrollbarsRef) {
          ref(scrollbarsRef.view)
        } else {
          ref(null)
        }
      }
      if (isFirst) {
        return <div {...{ ref }} />
      }
      return (
        <div
          className="relative overflow-hidden rounded-b-[3px]"
          style={{
            height:
              Math.min(style.height, children.props.style.height) +
              (isAddCardForm ? 0 : COLUMN_FOOTER_HEIGHT),
            width: COLUMN_WIDTH,
          }}
        >
          <Scrollbars
            // TODO: колёсико мышки не работает при позиционировании мышки над скролами
            // https://github.com/RobPethick/react-custom-scrollbars-2/issues/44
            // onWheel={(event) => console.log(event)}
            ref={refSetter}
            {...{ onScroll, style }}
            className={cx(
              'overflow-hidden [&>:last-child]:mt-[-2px]',
              '[&>:first-child>div]:bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]',
            )}
            renderView={(props) => {
              // HACK: dnd карточки вниз не дотягивает скрол на размер системного скрола из-за отрицательного margin
              return <div className="hide-system-scrollbar mx-0 my-0" {...props} />
            }}
          >
            {children}
          </Scrollbars>
          {isAddCardForm || (
            <div className="absolute bottom-0 left-0 right-0 rounded-b-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
              <ColumnFooter />
            </div>
          )}
        </div>
      )
    })
  }, [isAddCardForm, isFirst])
  return <VariableSizeList {...props} {...{ ref, outerElementType }} />
})

// Alter Case
// const withScrollbars = React.forwardRef(({ children, onScroll, style }, ref) => {
//   // TODO: горизонтальный скрол "прилипает" к половине ширины колонки, т.е. докручивает до нужного положения
//   const refSetter = (scrollbarsRef) => {
//     if (scrollbarsRef) {
//       ref(scrollbarsRef.view)
//     } else {
//       ref(null)
//     }
//   }
//   const isFirst = useIsFirstRender() // HACK: отрабатывает отрисовку ColumnHeader (Input.TextArea.autoSize)
//   if (isFirst) {
//     return <div {...{ ref }} />
//   }
//   return (
//     <div
//       className="relative overflow-hidden rounded-b-[3px]"
//       style={{
//         height: Math.min(style.height, children.props.style.height) + COLUMN_FOOTER_HEIGHT,
//         width: COLUMN_WIDTH,
//       }}
//     >
//       <Scrollbars
//         // TODO: колёсико мышки не работает при позиционировании мышки над скролами
//         // https://github.com/RobPethick/react-custom-scrollbars-2/issues/44
//         // onWheel={(event) => console.log(event)}
//         ref={refSetter}
//         {...{ onScroll, style }}
//         className={cx(
//           'overflow-hidden [&>:last-child]:mt-[-2px]',
//           '[&>:first-child>div]:bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]',
//         )}
//         renderView={(props) => {
//           // HACK: dnd карточки вниз не дотягивает скрол на размер системного скрола из-за отрицательного margin
//           return <div className="hide-system-scrollbar mx-0 my-0" {...props} />
//         }}
//       >
//         {children}
//       </Scrollbars>
//       <div className="absolute bottom-0 left-0 right-0 rounded-b-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
//         <ColumnFooter />
//       </div>
//     </div>
//   )
// })

// Base Case
// const withoutScrollbars = React.forwardRef(({ children, onScroll, style }, ref) => {
//   const isFirst = useIsFirstRender() // HACK: отрабатывает отрисовку ColumnHeader (Input.TextArea.autoSize)
//   if (isFirst) return <div {...{ ref }} />
//   return (
//     <div
//       className="relative"
//       style={{
//         height: Math.min(style.height, children.props.style.height) + COLUMN_FOOTER_HEIGHT,
//         width: COLUMN_WIDTH,
//       }}
//     >
//       <div
//         {...{ ref, style, onScroll }}
//         className={cx(
//           'hide-system-scrollbar',
//           '[&>:first-child]:bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]',
//         )}
//       >
//         {children}
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 rounded-b-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
//         <ColumnFooter />
//       </div>
//     </div>
//   )
// })

// TODO: как заменить на useOverlayScrollbars?
// https://github.com/KingSora/OverlayScrollbars/issues/148
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
//           <ColumnFooter  />
//         </div>
//       </div>
//     </OverlayScrollbarsComponent>
//   )
// })

// TODO: скролирование по вертикали должно начинаться раньше, чтобы dropable-item не выходил за границы колонки - проблема больше не наблюдается
function ColumnItemList({ id, issuesOrder, issues, index, isAddCardForm }) {
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
  }, [id])
  const { isExpanded } = React.useContext(FrontLabelsContext)
  const itemData = issuesOrder.map((id) => (id === '0' ? { id: '0' } : issues[id]))
  const getItemSize = (index) => {
    const issue = itemData[index]
    if (!issue) {
      return _cloneSize
    }
    if (issue.id === '0') {
      return 124 // CARD_FORM_HEIGHT
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
    <div data-element="column-item-list" className="h-full overflow-hidden rounded-b-[3px]">
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
                    <ColumnItem {...{ provided, snapshot }} issue={itemData[rubric.source.index]} />
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
                      ? itemData.length + 1
                      : itemData.length
                  return (
                    <List
                      // useIsScrolling // TODO: для isScrolling
                      height={height - (isAddCardForm ? 0 : COLUMN_FOOTER_HEIGHT)}
                      itemCount={itemCount}
                      itemSize={getItemSize}
                      width={width}
                      outerRef={provided.innerRef}
                      // outerElementType={withScrollbars}
                      isAddCardForm={isAddCardForm}
                      itemData={itemData}
                      ref={listRef}
                      overscanCount={4}
                      // See notes at calcEstimatedSize
                      // estimatedItemSize={calcEstimatedSize()}
                    >
                      {ColumnRow}
                    </List>
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
                <ColumnFooter />
              </div>
            </div>
          )}
        </AutoSizer>
      )}
    </div>
  )
}

const ArchiveCards = React.memo(function ArchiveCards2() {
  return <div></div>
})

const MoveCards = React.memo(function MoveCards2() {
  return <div></div>
})

const SortCards = React.memo(function SortCards2() {
  return <div></div>
})

const MoveList = React.memo(function MoveList2() {
  return <div></div>
})

const CopyList = React.memo(function CopyList2() {
  return <div></div>
})

function ColumnExtrasButton({ id }) {
  const { state, setState } = React.useContext(BoardContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const [back, setBack] = React.useState('')
  const backHeaders = {
    'copy-list': 'Копирование списка',
    'move-list': 'Перемещение списка',
    'sort-cards': 'Сортировать список',
    'move-cards': 'Переместить в список',
    'archive-cards': 'Архивировать список?',
  }
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
  const items =
    back === ''
      ? data.map((currentValue, index) => {
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
      : []
  const backFooters = {
    'copy-list': <CopyList />,
    'move-list': <MoveList />,
    'sort-cards': <SortCards />,
    'move-cards': <MoveCards />,
    'archive-cards': <ArchiveCards />,
  }
  return (
    <CustomDropdown
      smallSize
      header={backHeaders[back] || 'Действия со списком'}
      footer={backFooters[back]}
      hasBack={back !== ''}
      resetBack={() => {
        setBack('')
      }}
      onClick={(event) => {
        if (event.key === 'add-card') {
          openAddCardForm(state, setState, id, 0)
          setIsOpen(false)
          return
        }
        if (!!backHeaders[event.key]) {
          setBack(event.key)
        }
        // setSelected(event.key)
      }}
      onOpenChange={(flag) => {
        if (!flag && back !== '') {
          setTimeout(() => {
            setBack('')
          })
        }
      }}
      {...{ items, isOpen, setIsOpen }}
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
  const [focused, setFocused] = React.useState('')
  return (
    <ColumnHeaderInputContext.Provider value={{ focused, setFocused }}>
      {children}
    </ColumnHeaderInputContext.Provider>
  )
}

function ColumnHeader({ id, title, issuesOrder, ...dragHandleProps }) {
  const [value, setValue] = React.useState(title)
  const { focused, setFocused } = React.useContext(ColumnHeaderInputContext)
  const issuesCount = issuesOrder.length // TODO: тут надо показывать общее кол-во карточек, а не после фильтра
  const isFilter = true // TODO: реализовать isFilter через Context
  const columnExtrasTabWrapperId = `column-extras-tab-wrapper-${id}`
  const inputId = `input-column-header-${id}`
  const isFocused = focused === inputId
  return (
    <div
      className="relative flex-none cursor-pointer rounded-t-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)] py-1.5 pl-2 pr-10"
      onClick={(event) => {
        event.stopPropagation()
        if (isFocused) {
          const element = document.getElementById(inputId).parentNode
          element.focus()
        }
      }}
      {...dragHandleProps}
      tabIndex="-1" // HACK: removed tabIndex="0" from dragHandleProps
    >
      <Input.TextArea
        id={inputId}
        className={cx(
          isFilter && 'mb-[-4px]',
          // 'cursor-pointer focus:cursor-text',
          'min-h-[28px] resize-none overflow-hidden rounded-[3px] bg-transparent px-2 py-1 font-semibold leading-5 text-[var(--ds-text,#172b4d)] focus:bg-[var(--ds-background-input,#fff)]',
        )}
        bordered={false}
        spellCheck={false}
        autoSize
        // aria-label={title} // TODO: опасная операция - могут быть невалидные символы
        size={512}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onBlur={() => {
          setFocused('')
        }}
        onFocus={() => {
          setFocused(inputId)
          document.getElementById(inputId).select()
        }}
        onKeyDown={(event) => {
          event.stopPropagation()
          if (event.key === 'Escape') {
            document.getElementById(columnExtrasTabWrapperId).focus()
          }
        }}
        onClick={(event) => {
          event.stopPropagation()
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
          event.stopPropagation()
          const element = document.getElementById(inputId)
          element.focus({
            preventScroll: true,
            // cursor: 'all', // не надо, т.к. дублирует .select() в .onFocus() и не отрабатывает по [TAB]
          })
        }}
      />
      <div id={columnExtrasTabWrapperId} tabIndex="-1" className="absolute right-1 top-1">
        <ColumnExtrasButton {...{ id }} />
      </div>
    </div>
  )
}

function Column({ column: { id, title, issuesOrder }, issues, index, isAddCardForm }) {
  return (
    <Draggable draggableId={id} {...{ index }}>
      {(provided, snapshot) => {
        const { style: draggableStyle, ...draggableProps } = provided.draggableProps
        // HACK: отменил анимацию для согласованности с ColumnItem
        if (!!draggableStyle.transition && snapshot.isDropAnimating) {
          draggableStyle.transition = 'transform 0.001s'
        }
        return (
          <div
            data-column-id={id}
            className="mr-2 flex flex-col"
            ref={provided.innerRef}
            style={{
              width: COLUMN_WIDTH,
              ...draggableStyle,
            }}
            {...draggableProps}
            // TODO: doubleClick вызывает inline-форму добавления новой карточки
          >
            <ColumnHeader {...{ id, title, issuesOrder, ...provided.dragHandleProps }} />
            <ColumnItemList {...{ id, issuesOrder, issues, index, isAddCardForm }} />
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
      {state.columnsOrder.map((id, index) => {
        const column = state.columns[id]
        const isAddCardForm = column.issuesOrder.indexOf('0') !== -1
        return <Column key={id} issues={state.issues} {...{ index, column, isAddCardForm }} />
      })}
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
  const { state, setState } = React.useContext(BoardContext)
  const { focused } = React.useContext(ColumnHeaderInputContext)
  const [isDragging, setDragging] = React.useState(false)
  const onBeforeDragStart = () => {
    if (focused) {
      const element = document.getElementById(focused).parentNode
      element.focus()
    }
    setDragging(true)
    // TODO: убрать focus для перетаскиваемого элемента, или оставить, как фичу?
  }
  const onDragUpdate = () => {
    // #POC
    // if (event.type === 'row' && event.destination) {
    //   const columnId = event.destination.droppableId
    //   const element = document.querySelector(`[data-column-id="${columnId}"]`)
    //   element.scrollIntoView()
    // }
  }
  const onDragEnd = (event) => {
    setDragging(false)
    if (!event.destination) {
      return
    }
    if (event.type === 'column') {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const columnsOrder = reorderList(
        state.columnsOrder,
        event.source.index,
        event.destination.index,
      )
      setState({
        ...state,
        columnsOrder,
      })
      return
    }
    const activeElementId = document.activeElement.id
    const restoreFocus = (column = null) => {
      setTimeout(() => {
        if (activeElementId === 'input-card') {
          if (column !== null) {
            const listRef = _listRefMap[column.id]
            const list = listRef.current
            const index = column.issuesOrder.indexOf('0')
            list.scrollToItem(index)
          }
          document.getElementById('input-card').focus({
            preventScroll: true,
          })
        } else if (document.activeElement.tagName === 'BODY') {
          // TODO: из-за виртуального списка, форма может умереть при дропе после длинноого скролла (как вариант - sticky для формы)
          // https://github.com/bvaughn/react-window/issues/55
          // https://codesandbox.io/s/0mk3qwpl4l
          // https://codesandbox.io/s/grouped-list-with-sticky-headers-shgok
          document.getElementById('board-wrapper').focus()
        }
      })
    }
    // reordering in same list
    if (event.source.droppableId === event.destination.droppableId) {
      const column = state.columns[event.source.droppableId]
      const issuesOrder = reorderList(
        column.issuesOrder,
        event.source.index,
        event.destination.index,
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
      const index = Math.min(event.source.index, event.destination.index)
      _listRefMap[column.id].current.resetAfterIndex(index)
      restoreFocus() // как в оригинале: если в той же колонке, то не скролится к форме
      return
    }
    // moving between lists
    const sourceColumn = state.columns[event.source.droppableId]
    const destinationColumn = state.columns[event.destination.droppableId]
    const item = sourceColumn.issuesOrder[event.source.index]
    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      issuesOrder: [...sourceColumn.issuesOrder],
    }
    newSourceColumn.issuesOrder.splice(event.source.index, 1)
    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      issuesOrder: [...destinationColumn.issuesOrder],
    }
    // in line modification of items
    newDestinationColumn.issuesOrder.splice(event.destination.index, 0, item)
    setState({
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    })
    _listRefMap[newSourceColumn.id].current.resetAfterIndex(event.source.index)
    _listRefMap[newDestinationColumn.id].current.resetAfterIndex(event.destination.index)
    restoreFocus(newDestinationColumn)
  }
  return (
    <DragDropContext {...{ onBeforeDragStart, onDragUpdate, onDragEnd }}>
      {children}
      {/* // убирает hover:, пока выполняется dnd, и отключает прокрутку мыши колёсиком внутри колонок */}
      {isDragging && <div id="dragging-mask" className="fixed bottom-0 left-0 right-0 top-0" />}
    </DragDropContext>
  )
}

const BoardContext = React.createContext({})

export function BoardState({ children, columns, columnsOrder, issues }) {
  const [state, setState] = React.useState({
    columns,
    columnsOrder,
    issues,
    selectedId: '',
    addCardForm: {
      columnId: '',
      title: '',
    },
  })
  // TODO: при перетаскивании карточек можно добиться эффекта захвата скролов (и внутри колонки и общего) по клавишам-стрелкам - как отловить-исправить?
  React.useLayoutEffect(() => {
    const element = document.getElementById('board-wrapper')
    element.focus()
  }, [])
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
  const [isMouseFirst, setIsMouseFirst] = React.useState(false)
  const onMouseMove = (event) => {
    setIsMouseFirst(true)
  }
  const focusFirstItem = (columnId) => {
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.scrollTo(0)
    const column = state.columns[columnId]
    if (column.issuesOrder.length === 0) {
      return false
    }
    const id = column.issuesOrder[0]
    const itemId = `item-${id}`
    const element = document.getElementById(itemId)
    element.focus()
    return true
  }
  const selectFirstItem = (columnId) => {
    const column = state.columns[columnId]
    if (column.issuesOrder.length === 0) {
      return false
    }
    const id = column.issuesOrder[0]
    const itemId = `item-${id}`
    setState({ ...state, selectedId: itemId })
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.scrollTo(0)
    const element = document.querySelector(`[data-column-id="${columnId}"]`)
    element.scrollIntoView()
    return true
  }
  const scrollToItem = (columnId, index) => {
    const listRef = _listRefMap[columnId]
    const list = listRef.current
    list.scrollToItem(index)
    const element = document.querySelector(`[data-column-id="${columnId}"]`)
    element.scrollIntoView()
  }
  const selectNextColumn = (columnsOrder) => {
    for (const columnId of columnsOrder) {
      const column = state.columns[columnId]
      const index = column.issuesOrder.findIndex((id) => `item-${id}` === state.selectedId)
      if (index !== -1) {
        const columnsOrderIndex = columnsOrder.findIndex((columnId) => columnId === column.id)
        if (columnsOrderIndex + 1 !== columnsOrder.length) {
          for (const columnId of columnsOrder.slice(columnsOrderIndex + 1)) {
            if (selectFirstItem(columnId)) {
              break
            }
          }
        }
        break
      }
    }
  }
  const onKeyDown = (event) => {
    setIsMouseFirst(false)
    if (event.code === 'Tab') {
      const tabIsList = event.target.dataset.tabIsList
      if ((tabIsList === 'prev' && event.shiftKey) || (tabIsList === 'next' && !event.shiftKey)) {
        const columnId = getParentColumnId(event.target)
        if (focusFirstItem(columnId)) {
          event.preventDefault()
        }
      }
      return
    }
    const cases = {
      ArrowDown: () => {
        for (const column of Object.values(state.columns)) {
          const index = column.issuesOrder.findIndex((id) => `item-${id}` === state.selectedId)
          if (index !== -1) {
            if (column.issuesOrder.length === index + 1) {
              scrollToItem(column.id, index)
            } else {
              const id = column.issuesOrder[index + 1]
              const itemId = `item-${id}`
              setState({ ...state, selectedId: itemId })
              scrollToItem(column.id, index + 1)
            }
            break
          }
        }
      },
      ArrowUp: () => {
        for (const column of Object.values(state.columns)) {
          const index = column.issuesOrder.findIndex((id) => `item-${id}` === state.selectedId)
          if (index !== -1) {
            if (index === 0) {
              scrollToItem(column.id, index)
            } else {
              const id = column.issuesOrder[index - 1]
              const itemId = `item-${id}`
              setState({ ...state, selectedId: itemId })
              scrollToItem(column.id, index - 1)
            }
            break
          }
        }
      },
      ArrowLeft: () => {
        selectNextColumn([...state.columnsOrder].reverse())
      },
      ArrowRight: () => {
        selectNextColumn(state.columnsOrder)
      },
    }
    const onCase = cases[event.code]
    if (onCase) {
      if (state.selectedId === '') {
        for (const columnId of state.columnsOrder) {
          if (selectFirstItem(columnId)) {
            break
          }
        }
      } else {
        onCase()
      }
      event.preventDefault()
    }
  }
  return (
    <BoardContext.Provider
      value={{
        state,
        setState,
        isMouseFirst,
      }}
    >
      <div
        id="board-wrapper"
        className={cx(isMouseFirst && 'is-mouse-first')}
        tabIndex="-1" // for fire onKeyDown after .focus()
        {...{ onKeyDown, onMouseMove }}
      >
        {children}
      </div>
      <div
        id="board-screen-width"
        className="fixed left-0 right-0 top-0" // bottom-0 pointer-events-none
      />
    </BoardContext.Provider>
  )
}

function Board({ hasMenu }) {
  const positionRef = React.useRef({
    startX: null,
    startScrollX: null,
  })
  const handleMouseDown = ({ target, clientX }) => {
    if (target.id !== 'board' && target.dataset.element !== 'column-item-list') {
      return
    }
    positionRef.current = {
      startX: clientX,
      startScrollX: window.scrollX,
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
  const handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = positionRef.current
    const scrollX = startScrollX - clientX + startX
    // TODO: data for custom system scroll: console.log(window.scrollX, document.body.scrollWidth, document.body.clientWidth)
    window.scrollTo(scrollX, 0)
    const windowScrollX = window.scrollX
    if (scrollX !== windowScrollX) {
      positionRef.current = {
        startX: clientX + windowScrollX - startScrollX,
        startScrollX,
      }
    }
  }
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    positionRef.current = {
      startX: null,
      startScrollX: null,
    }
  }
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
      <ColumnHeaderInputState>
        <CustomDragDropContext>
          <Droppable droppableId="all-droppables" direction="horizontal" type="column">
            {(provided) => (
              <div
                id="board"
                className="flex h-full select-none pl-2.5"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background:
                    'linear-gradient(to bottom,var(--board-header-background-color),#0000 80px,#0000)',
                }}
                onMouseDown={handleMouseDown}
              >
                <Columns />
                {provided.placeholder}
                <AddColumnButton />
                {hasMenu && <div className="w-[var(--menu-width)]" />}
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
    </>
  )
}

export default Board
