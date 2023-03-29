import React from 'react'
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
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import CustomDropdown from '.../components/CustomDropdown'
import MemberIcon from '.../components/MemberIcon'
import cx from 'classnames'
import dayjs from 'dayjs'
import pluralize from '.../utils/pluralize'
import labelColors from '.../utils/labelColors'
import normalizeUrlName from '.../utils/normalizeUrlName'
import getDueDateMode from '.../utils/getDueDateMode'
// import useScrollWithShadow from '.../utils/useScrollWithShadow'

function ListFooter() {
  return (
    <div className="max-h-[38px] min-h-[38px] px-2 pt-0.5 pb-2">
      <Button
        className="flex h-[28px] w-full items-center rounded-[3px] border-0 bg-transparent px-2 py-1 leading-5 text-[var(--ds-text-subtle,#5e6c84)] shadow-none text-start hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)] hover:text-[var(--ds-text,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)] [&>:last-child]:truncate"
        icon={<PlusOutlined />}
      >
        Добавить карточку
      </Button>
    </div>
  )
}

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
      className="transition [&:hover>.badge-clock]:hidden [&:hover>.badge-check]:flex"
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
        'mr-1 mb-1 inline-flex max-w-full items-center truncate rounded-[3px] bg-[var(--background-color)] p-0.5 text-[var(--text-color)] hover:bg-[var(--background-color-hovered)]',
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

const FrontLabelsContext = React.createContext(null)

function FrontLabelsState({ children }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <FrontLabelsContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </FrontLabelsContext.Provider>
  )
}

function FrontLabel({ id, colorId, name }) {
  const { isExpanded, setIsExpanded } = React.useContext(FrontLabelsContext)
  const color = labelColors[colorId]
  const title = `Цвет: ${color.name}, название: «${name}»`
  return (
    <Tooltip
      // TODO: добавить цвет?
      // overlayStyle={{ ...color.style }}
      // overlayInnerStyle={{ color: 'var(--ds-text, #172b4d)' }}
      // color={'var(--background-color)'}
      placement="topLeft"
      title={title}
    >
      <div className="inline-flex max-w-[calc(100%-4px)]">
        <button
          style={color.style}
          className={cx(
            isExpanded
              ? 'h-4 min-w-[56px] max-w-full truncate bg-[var(--background-color)] pl-4 pr-2 text-xs'
              : 'h-2 min-w-[40px] max-w-[40px] bg-[var(--foreground-color)]',
            'relative inline-block rounded text-left transition hover:brightness-[.85] hover:saturate-[.85]',
          )}
          tabIndex={-1}
          aria-label={title}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded && (
            <>
              <div className="absolute top-1 bottom-1 left-1 h-2 w-2 rounded-[50%] bg-[var(--foreground-color)]" />
              {name}
            </>
          )}
        </button>
      </div>
    </Tooltip>
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

function ListCard({ id, title, labels, members }) {
  const router = useRouter()
  const urlName = React.useMemo(() => normalizeUrlName(title), [title])
  // TODO: cover
  return (
    <a
      href={`/c/${id}/${urlName}`}
      className="relative mb-2 block rounded-[3px] bg-[var(--ds-surface-raised,#fff)] text-sm text-[var(--ds-text,inherit)] shadow hover:bg-[var(--ds-surface-raised-hovered,#f4f5f7)]"
      onClick={(event) => {
        event.preventDefault()
        router.push(`/c/${id}/${urlName}`, undefined, {
          shallow: true,
        })
        // TODO: открывать модальный диалог по месту для лучшей анимации
      }}
    >
      <div className="overflow-hidden px-2 pt-1.5 pb-0.5">
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

function ListCards({ issues }) {
  const ref = React.useRef()
  const [initialize, instance] = useOverlayScrollbars({
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
      className="max-h-[500px] overflow-hidden px-2"
      // onScroll={onScrollHandler}
      // style={{ boxShadow }}
      {...{ ref }}
    >
      {issues.map((issue) => (
        <ListCard key={issue.id} {...issue} />
      ))}
    </div>
  )
}

function ExtrasButton() {
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
        className="rounded-[3px] border-0 bg-transparent text-[var(--ds-icon-subtle,#6b778c)] shadow-none hover:bg-[var(--ds-background-neutral-hovered,#091e4214)] hover:text-[var(--ds-icon,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)]"
        icon={<EllipsisOutlined />}
      />
    </CustomDropdown>
  )
}

function ListHeader({ name }) {
  const [value, setValue] = React.useState(name)
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = React.useRef()
  const issuesCount = 98
  const isFilter = true // TODO: реализовать isFilter через Context
  return (
    <div className="relative flex-none pt-1.5 pb-2.5 pl-2 pr-10">
      <Input.TextArea
        className="mb-[-4px] min-h-[28px] resize-none overflow-hidden rounded-[3px] bg-transparent px-2 py-1 font-semibold leading-5 text-[var(--ds-text,#172b4d)] focus:bg-[var(--ds-background-input,#fff)]"
        bordered={false}
        spellCheck={false}
        ref={inputRef}
        autoSize
        aria-label={name}
        size={512}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
        onFocus={() => {
          setIsFocused(true)
        }}
      />
      {isFilter && (
        <p className="mx-2 text-sm text-[var(--ds-text-subtle,#5e6c84)]">
          {pluralize(issuesCount, ['карточка', 'карточки', 'карточек'])}
        </p>
      )}
      <div
        className={cx(
          isFocused && 'hidden',
          'absolute top-0 left-0 right-0 bottom-0 cursor-pointer',
        )}
        onClick={() => {
          event.preventDefault()
          inputRef.current.focus({
            preventScroll: true,
            cursor: 'all',
          })
        }}
      />
      <div className="absolute top-1 right-1">
        <ExtrasButton />
      </div>
    </div>
  )
}

function Canvas({ isMenu, hasMenu, children }) {
  const ref = React.useRef()
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      overflow: {
        x: isMenu === hasMenu ? 'scroll' : 'hidden',
        y: 'hidden',
      },
      // paddingAbsolute: true,
      // showNativeOverlaidScrollbars: true,
      scrollbars: {
        theme: cx('os-theme-light board', hasMenu && 'has-menu'),
        visibility: 'auto',
        autoHide: 'never',
        autoHideDelay: 1300,
        dragScroll: true,
        clickScroll: true,
        pointers: ['mouse', 'touch', 'pen'],
      },
    },
    // events, defer
  })
  React.useEffect(() => {
    // initialize(document.body)
    initialize(ref.current)
  }, [initialize])
  return (
    <div
      className="flex grow flex-col"
      // className={cx('grow overflow-auto', hasMenu && 'pr-[var(--menu-width)]')}
      style={{
        background:
          'linear-gradient(to bottom,var(--board-header-background-color),#0000 80px,#0000)',
      }}
      {...{ ref }}
    >
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 flex-col">
          <div className={cx('grow' && hasMenu && 'pr-[var(--menu-width)]')}>{children}</div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[26px] bg-[var(--window-background)]" />
    </div>
  )
}

function Board({ issues, isMenu, hasMenu }) {
  const columns = [
    // { id: 'column0', name: 'Backlog' },
    {
      id: 'column1',
      name: 'To Do To Do To Do To Do To Do To Do To Do To Do To Do To Do To Do',
    },
    { id: 'column2', name: 'In Progress' },
    { id: 'column3', name: 'Done' },
  ]
  // const cards = [
  //   { id: 'card1', name: 'Выполнить деплой' },
  //   { id: 'card2', name: 'Прикрутить CI & CD' },
  // ]
  return (
    <Canvas {...{ isMenu, hasMenu }}>
      <div id="board" className="ml-2.5 mr-2 flex max-h-max select-none gap-2 pb-2">
        <FrontLabelsState>
          {columns.map(({ id, name }) => (
            <div key={id}>
              <div className="flex min-w-[272px] max-w-[272px] flex-col rounded-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
                <ListHeader {...{ name }} />
                <ListCards {...{ issues }} />
                <ListFooter />
              </div>
            </div>
          ))}
        </FrontLabelsState>
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
    </Canvas>
  )
}

export default Board
