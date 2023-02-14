import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  SearchOutlined,
  UserOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  StarOutlined,
  StarFilled,
  LockTwoTone,
  LockOutlined,
  GlobalOutlined,
  TeamOutlined,
  BlockOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  DownOutlined,
  FilterOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  BarsOutlined,
  // LayoutOutlined,
  EllipsisOutlined,
  MoreOutlined,
  BookOutlined,
  ProjectOutlined,
  // ProfileOutlined,
  EditOutlined,
  EyeOutlined,
  ContainerOutlined,
  MessageOutlined,
  CheckSquareOutlined,
  PaperClipOutlined,
  BorderOutlined,
  CreditCardOutlined,
} from '@ant-design/icons'
import {
  // Layout,
  Tooltip,
  Avatar,
  Form,
  Drawer,
  Button,
  Input,
  Checkbox,
  Modal,
  // Icon,
  Dropdown,
  Space,
  Divider,
  theme,
  // TODO: renderCloseIcon,
} from 'antd'
import type { MenuProps } from 'antd'
import cx from 'classnames'
import ClientOnly from '.../components/ClientOnly'
import { useWindowSize, useOnClickOutside } from 'usehooks-ts'
import { resetServerContext } from 'react-beautiful-dnd'
import generateSentence from '.../utils/generateSentence'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import normalizeUrlName from '.../utils/normalizeUrlName'
import labelColors from '.../utils/labelColors'
import pluralize from '.../utils/pluralize'

function CardDetailWindow() {
  const [isOpen, setIsOpen] = React.useState(false) // TODO: состояние определяет '/c/...'
  const close = () => {
    setIsOpen(false)
  }
  return (
    <Modal
      open={isOpen}
      onCancel={close}
      // title="Карточка"
      // transitionName=""
      // maskTransitionName=""
      // style={null}
      // closable={false}
      footer={null}
      destroyOnClose
      // centered
      width={768}
      // mask={false}
      // TODO: адаптивность для мобилки
      className="card-detail-window"
    >
      <div className="relative px-12 pt-3 pb-2">
        <div className="absolute top-5 left-4 flex h-8 w-8 justify-center">
          <CreditCardOutlined className="scale-125" />
        </div>
        <Input.TextArea
          className="mb-[-4px] mt-2 min-h-[32px] resize-none overflow-hidden rounded-[3px] border-0 bg-transparent px-2 py-1 text-xl font-semibold leading-[24px] focus:bg-[var(--ds-background-input,#fff)]"
          spellCheck={false}
          // ref={inputRef}
          autoSize
          // aria-label={name}
          // size={512}
          // value={'Выполнить деплой'}
          // onChange={(event) => {
          //   setValue(event.target.value)
          // }}
          // onBlur={() => {
          //   setIsFocused(false)
          // }}
          // onFocus={() => {
          //   setIsFocused(true)
          // }}
        />
      </div>
    </Modal>
  )
}

function ExtrasButton() {
  const data = [
    { 'add-card': 'Добавить карточку...' },
    { 'copy-list': 'Копировать список...' },
    { 'move-list': 'Переместить список...' },
    { 'list-subscribe': 'Подписаться' },
    'divider',
    { 'sort-cards': 'Сортировать по...' },
    'divider',
    // TODO: добавить автоматизацию
    // { group: 'Автоматизация' },
    // { '': 'Когда карточка добавлена в список...' },
    // { '': 'Каждый день, сортировать по...' },
    // { '': 'Каждый понедельник, сортировать по...' },
    // { '': 'Создать настраиваемое правило...' },
    // 'divider',
    { 'move-cards': 'Переместить все карточки списка...' },
    { 'archive-cards': 'Архивировать все карточки списка...' },
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
        <CustomDropdownItem>
          <div className="truncate">{itemText}</div>
        </CustomDropdownItem>
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
        className="rounded-[3px] border-0 bg-transparent text-[var(--ds-icon-subtle,#6b778c)] shadow-none hover:bg-[var(--ds-background-neutral-hovered,#091e4214)] hover:text-[var(--ds-icon,#172b4d)]"
        icon={<EllipsisOutlined />}
      />
    </CustomDropdown>
  )
}

function DueDateBadge({}) {
  const start = '9 фев'
  const deadline = '11 фев'
  const modes = {
    normal: {
      title: 'Срок карточки истекает не скоро',
    },
    past: {
      status: 'просрочено',
      title: 'Срок карточки истёк',
      style: {
        '--background-color-hovered': 'var(--ds-background-danger-hovered,#eb5a46)',
        '--background-color': 'var(--ds-background-danger,#ec9488)',
        '--text-color': 'var(--ds-text-inverse,#fff)',
      },
    },
    danger: {
      status: 'просрочено',
      title: 'Карточка недавно просрочена',
      style: {
        '--background-color-hovered': 'var(--ds-background-danger-bold-hovered,#b04632)',
        '--background-color': 'var(--ds-background-danger-bold,#eb5a46)',
        '--text-color': 'var(--ds-text-inverse,#fff)',
      },
    },
    warning: {
      status: 'скоро истечёт',
      title: 'До истечения срока карточки осталось менее 24 часов',
      style: {
        '--background-color-hovered': 'var(--ds-background-warning-hovered,#d9b51c)',
        '--background-color': 'var(--ds-background-warning,#f2d600)',
        '--text-color': 'var(--ds-text-inverse,#fff)',
      },
    },
    success: {
      status: 'выполнено',
      title: 'Эта карточка выполнена',
      style: {
        '--background-color-hovered': 'var(--ds-background-success-hovered,#519839)',
        '--background-color': 'var(--ds-background-success,#61bd4f)',
        '--text-color': 'var(--ds-text-inverse,#fff)',
      },
    },
  }
  const [checked, setChecked] = React.useState(true)
  const currentMode = modes['warning']
  return (
    <Badge
      title={checked ? modes['success'].title : currentMode.title}
      style={checked ? modes['success'].style : currentMode.style}
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
        {start}
        {start && ' - '}
        {deadline}
      </BadgeText>
    </Badge>
  )
}

function Badge({
  children,
  style = {
    '--background-color-hovered': 'transparent',
    '--background-color': 'transparent',
    '--text-color': 'var(--ds-text-subtle,#5e6c84)',
  },
  className,
  onClick,
  title,
}) {
  // TODO: добавить title
  return (
    <Tooltip title={title} placement="bottomLeft">
      <div
        role={onClick ? 'button' : null}
        tabIndex={onClick ? '-1' : null}
        onClick={onClick}
        style={style}
        className={cx(
          'mr-1 mb-1 inline-flex max-w-full items-center truncate rounded-[3px] bg-[var(--background-color)] p-0.5 text-[var(--text-color)] hover:bg-[var(--background-color-hovered)]',
          className,
        )}
      >
        {children}
      </div>
    </Tooltip>
  )
}

function BadgeText({ children }) {
  return <span className="whitespace-nowrap pl-0.5 pr-1 text-xs">{children}</span>
}

function Badges() {
  return (
    <div className="ml-[-2px] max-w-full">
      <Badge title="Вы подписаны на эту карточку">
        <EyeOutlined className="badge-icon" />
      </Badge>
      <DueDateBadge />
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

function FrontLabel({ id, colorId, name }) {
  const { isExpanded, setIsExpanded } = React.useContext(LabelsContext)
  const color = labelColors[colorId]
  const title = `Цвет: ${color.name}, название: «${name}»`
  return (
    <Tooltip
      // TODO: добавить цвет
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
            'relative inline-block rounded transition hover:brightness-[.85] hover:saturate-[.85]',
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

function FrontLabels() {
  const { isExpanded } = React.useContext(LabelsContext)
  const labels = [
    {
      id: 1,
      colorId: '1-1',
      name: 'Готово',
    },
    {
      id: 2,
      colorId: '1-2',
      name: 'Готово',
    },
    {
      id: 3,
      colorId: '1-3',
      name: 'Готово',
    },
    {
      id: 4,
      colorId: '1-4',
      name: 'Готово',
    },
    {
      id: 5,
      colorId: '1-5',
      name: 'Готово',
    },
    {
      id: 6,
      colorId: '1-6',
      name: 'Готово',
    },
    {
      id: 7,
      colorId: '5-6',
      name: 'Моя очень-очень-очень длинная метка',
    },
  ]
  // TODO: добавить режим для дальтоников
  return (
    <div className={cx(isExpanded ? 'mb-1' : 'my-1', 'flex flex-wrap gap-1')}>
      {labels.map((label) => (
        <FrontLabel key={label.id} {...label} />
      ))}
    </div>
  )
}

function ListCard({ id, title }) {
  const router = useRouter()
  const urlName = React.useMemo(() => normalizeUrlName(title), [title])
  // TODO: cover
  return (
    <a
      href={`/c/${id}/${urlName}`}
      className="relative mb-2 block rounded-[3px] bg-[var(--ds-surface-raised,#fff)] text-sm text-[var(--ds-text,inherit)] shadow"
      onClick={(event) => {
        console.log('a')
        event.preventDefault()
        router.push(`/c/${id}/${urlName}`, undefined, {
          shallow: true,
        })
        // TODO: открывать модальный диалог по месту для лучшей анимации
      }}
    >
      <div className="px-2 pt-1.5 pb-0.5">
        <FrontLabels />
        <div className="mb-1 break-words">{title}</div>
        <Badges />
      </div>
      {/* <Button
        // TODO: добавить редактирование карточки на месте
        icon={<EditOutlined />}
        size="small"
        className="absolute right-0.5 top-0.5 rounded-[3px] border-0
        bg-[var(--ds-surface-raised-hovered,#f4f5f7)] opacity-80
        "
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
      /> */}
    </a>
  )
}

function ListHeader({ name }) {
  const [value, setValue] = React.useState(name)
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = React.useRef()
  const issuesCount = 98
  return (
    <div className="relative flex-none pt-1.5 pb-2.5 pl-2 pr-10">
      <Input.TextArea
        className="mb-[-4px] min-h-[28px] resize-none overflow-hidden rounded-[3px] border-0 bg-transparent px-2 py-1 font-semibold leading-[20px] focus:bg-[var(--ds-background-input,#fff)]"
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
      <p className="mx-2 text-sm text-[var(--ds-text-subtle,#5e6c84)]">
        {pluralize(issuesCount, ['карточка', 'карточки', 'карточек'])}
      </p>
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

function ListFooter() {
  return (
    <div className="max-h-[38px] min-h-[38px] px-2 pt-0.5 pb-2">
      <Button
        className="h-[28px] w-full justify-start rounded-[3px] border-0 bg-transparent px-2 py-1 text-[var(--ds-text-subtle,#5e6c84)] shadow-none hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)] hover:text-[var(--ds-text,#172b4d)]"
        icon={<PlusOutlined />}
      >
        Добавить карточку
      </Button>
    </div>
  )
}

const LabelsContext = React.createContext(null)

function LabelsState({ children }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <LabelsContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </LabelsContext.Provider>
  )
}

function Board({ issues }) {
  const columns = [
    { id: 'column1', name: 'Backlog' },
    { id: 'column2', name: 'To Do' },
  ]
  // const cards = [
  //   { id: 'card1', name: 'Выполнить деплой' },
  //   { id: 'card2', name: 'Прикрутить CI & CD' },
  // ]
  return (
    <div id="board" className="ml-2.5 mr-2 flex max-h-max select-none gap-2 pb-2">
      <LabelsState>
        {columns.map(({ id, name }) => (
          <div
            key={id}
            className="flex w-[272px] flex-col rounded-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]"
          >
            <ListHeader name={name} />
            <div className="max-h-[500px] overflow-x-hidden overflow-y-scroll px-2">
              {issues.map((issue) => (
                <ListCard key={issue.id} {...issue} />
              ))}
            </div>
            <ListFooter />
          </div>
        ))}
      </LabelsState>

      {/* <Image
    priority
    src="/wallpapper.jpg"
    fill
    // width="5760" height="3840"
    style={{
      objectFit: 'cover',
    }}
  /> */}
    </div>
  )
}

type IProps = {
  issues: []
  boardId: string
  favorites: []
  users: []
}

export const getServerSideProps = async ({ query: { breadcrumbs } }): IProps => {
  resetServerContext()
  const users = await fetch('https://randomuser.me/api/?results=20')
    .then((res) => res.json())
    .then((data) => data.results)
  const issues = Array.from({ length: 20 }, (v, k) => k).map((k) => ({
    id: `id-${k}`,
    title: `Issue ${k} ` + generateSentence(),
    description: '',
  }))
  const route = breadcrumbs[0] // TODO: w || u || b || c
  const routes = ['b', 'c']
  if (!routes.includes(route)) {
    return {
      notFound: true,
    }
  }
  const boardId = breadcrumbs[1] // if route === 'b'
  const urlName =
    route === 'b' ? normalizeUrlName('Пупер: My  Name  43 -- Супер!- -') : breadcrumbs[2] // TODO: get boardName from DB
  const favorites = [
    {
      boardId,
      name: 'Minsk4',
      workspace: 'Andrew Ka',
      color: '#cd5a91',
      wallpapper: '/wallpapper.jpg',
    },
    {
      boardId: nanoid(8),
      name: 'Minsk16',
      workspace: 'Andrew Ka',
      color: '#cd5a91',
      wallpapper: '/wallpapper.jpg',
    },
  ]
  return { props: { issues, boardId, issueId: null, urlName, favorites, users } }
}

function HeaderDivider() {
  return (
    <div className="float-left ml-1 mr-2 mt-2 mb-3 inline-block h-4 border-l border-[var(--dynamic-text-transparent)]" />
  )
}

function MenuDivider() {
  return <hr className="my-2 border-[var(--ds-border,#091e4221)]" />
}

function MenuButton({ icon, children, subtitle }) {
  return (
    <Button className="h-auto w-full items-start rounded-[3px] border-0 bg-transparent px-3 py-1.5 text-[var(--ds-text-subtle,inherit)] shadow-none hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)]">
      <div className="flex h-5 w-3.5 items-center leading-none">{icon}</div>
      <div className="ml-2 flex grow flex-col items-start leading-5">
        <div className="font-semibold">{children}</div>
        <div className="text-[var(--ds-text-subtle,#5E6C84)]">{subtitle}</div>
      </div>
    </Button>
  )
  // return (
  //   <a
  //     role="button"
  //     className="relative flex flex-col rounded-[3px] bg-transparent py-1.5 pl-9 pr-1.5 leading-5 text-[var(--ds-text-subtle,inherit)] hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)]"
  //   >
  //     <div className="absolute left-[12px] top-[9px] leading-none">{icon}</div>
  //     <div className="font-semibold">{children}</div>
  //     <div className="text-[var(--ds-text-subtle,#5E6C84)]">{subtitle}</div>
  //   </a>
  // )
}

function ShareButton() {
  const [isOpen, setIsOpen] = React.useState(false)
  const close = () => {
    setIsOpen(false)
  }
  return (
    <>
      <BoardHeaderButton
        // aria-label=""
        title="Поделиться доской"
        onClick={(e) => {
          setIsOpen(true)
        }}
        className="float-left"
        icon={<UserAddOutlined />}
        colors="bg-[var(--ds-background-input,#FFFFFF)] text-[var(--ds-text,#000000)] hover:bg-[var(--ds-background-input-hovered,#ffffffe5)]"
      >
        Поделиться
      </BoardHeaderButton>
      <Modal
        open={isOpen}
        onCancel={close}
        title="Поделиться доской"
        // transitionName=""
        // maskTransitionName=""
        // style={null}
        // closable={false}
        footer={null}
        destroyOnClose
        centered
        // width={760}
        // mask={false}
        // wrapClassName="search-modal"
      >
        123
      </Modal>
    </>
  )
}

function UserIcon({ login: { uuid, username }, picture: { thumbnail }, name, zIndex }) {
  return (
    <Tooltip title={`${name.first} ${name.last} (${username})`} placement="bottomLeft">
      <a
        className="hover:[&>.ant-avatar]:bg-[#c1c7d0] hover:[&>.ant-avatar>img]:opacity-80"
        href="#"
        onClick={(event) => {
          event.preventDefault()
        }}
      >
        <Avatar src={thumbnail} style={{ zIndex: zIndex }} />
      </a>
    </Tooltip>
  )
}

function UsersButton({ users }) {
  const maxCount = 5
  return (
    <Avatar.Group
      className={cx(
        'float-left mb-1 mr-1',
        users.length > maxCount &&
          '[&>:last-child]:bg-[var(--dynamic-button)] [&>:last-child]:text-[var(--dynamic-text)] hover:[&>:last-child]:bg-[var(--dynamic-button-hovered)]',
      )}
      maxCount={maxCount}
      maxPopoverPlacement="bottomLeft"
      maxPopoverTrigger="click"
    >
      {users.map((user, index, a) => (
        <UserIcon key={user.login.uuid} {...user} zIndex={a.length - index} />
      ))}
    </Avatar.Group>
  )
}

function InFavoritesButton({ favorites, onDelete }) {
  const items = favorites.map(({ boardId, name, workspace, color, wallpapper }) => (
    <div key={boardId} className="pt-1 pb-1">
      <div className="flex h-8 select-none rounded-[3px] hover:bg-[var(--ds-background-neutral,#EBECF0)]">
        <div
          className="h-8 w-[52px] flex-none rounded-[3px]"
          style={{
            backgroundColor: color,
            // TODO: wallpapper
          }}
        />
        <div className="flex grow flex-col truncate pl-2">
          <div className="truncate text-[14px] font-[500] leading-[18px]">{name}</div>
          <div className="truncate text-[12px] leading-[12px] text-[var(--ds-text-subtle,#5E6C84)]">
            {workspace}
          </div>
        </div>
        <div className="flex w-8 flex-none items-center justify-center">
          <Button
            className="border-[var(--ds-border,#091e4221)] [&>.anticon]:text-[#f2d600] [&:hover>.anticon]:scale-125 [&:focus>.anticon]:scale-125"
            title={`Нажмите, чтобы удалить доску "${name}" из избранного.`}
            icon={<StarFilled />}
            size="small"
            onClick={() => onDelete(boardId)}
          ></Button>
        </div>
      </div>
    </div>
  ))
  return (
    <CustomDropdown
      smallSize
      footer={
        items.length === 0 ? (
          // TODO: добавить картинку
          <div className="mt-3 text-center">Чтобы быстро находить важные доски, отмечайте их.</div>
        ) : (
          // TODO: добавить перестановку через drag'n'drop
          items
        )
      }
    >
      <BoardHeaderButton
        aria-label="Избранные"
        // title="" // TODO: добавить title
        colors="bg-transparent text-[var(--dynamic-text)] hover:bg-[var(--dynamic-button-hovered)]"
        // var(--header-menu-background)
        // var(--header-menu-color)
      >
        В избранном
        <DownOutlined />
      </BoardHeaderButton>
    </CustomDropdown>
  )
}

function FilterItem({ background, icon, text, isFirst }) {
  return (
    <Checkbox
      value={text} // TODO: реализовать фильтр
      className={cx(
        'w-full items-center [&>.ant-checkbox]:top-0',
        isFirst ? 'text-[var(--ds-text-subtle,#5e6c84)]' : 'text-[var(--ds-text, #172b4d)]', // TODO: first:
      )}
    >
      {icon ? (
        <Space>
          <div className={cx('flex h-6 w-6 items-center justify-center rounded-[50%]', background)}>
            {icon}
          </div>
          {text}
        </Space>
      ) : (
        text
      )}
    </Checkbox>
  )
}

function FilterButton() {
  const [isAllDeadlineItems, setAllDeadlineItems] = React.useState(false)
  const [filterCount, setFilterCount] = React.useState(8)
  const isFilter = filterCount > 0
  const [isOpen, setOpen] = React.useState(false)
  const [form] = Form.useForm()
  const memberItems = [
    {
      icon: <UserOutlined className="text-[var(--ds-icon-subtle,#6B778C)]" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Нет участников',
    },
    {
      icon: <UserOutlined className="text-[white]" />,
      background: 'bg-[green]',
      text: 'Карточки, назначенные мне',
    },
  ]
  const deadlineItems = [
    {
      icon: <CalendarOutlined className="text-[var(--ds-icon-subtle,#6B778C)]" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Без даты',
    },
    {
      icon: <ClockCircleOutlined className="text-[var(--ds-icon-inverse,#FFFFFF)]" />,
      background: 'bg-[var(--ds-background-danger-bold,#EB5A46)]',
      text: 'Просроченные',
    },
    {
      icon: <ClockCircleOutlined className="text-[var(--ds-icon-inverse,#FFFFFF)]" />,
      background: 'bg-[var(--ds-background-warning-bold,#F2D600)]',
      text: 'Срок истекает в течение суток',
    },
    {
      icon: <ClockCircleOutlined className="var(--ds-icon,#42526E)" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Срок истекает в течение недели',
    },
    {
      icon: <ClockCircleOutlined className="var(--ds-icon,#42526E)" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Срок истекает в течение месяца',
    },
    {
      text: 'Отмечено как выполненное',
    },
    {
      text: 'Не отмечено как выполненное',
    },
  ]
  return (
    <CustomDropdown
      items={[]}
      placement="bottom"
      header="Фильтр"
      footer={
        <Form
          className="w-full"
          form={form}
          layout="vertical"
          // initialValues={{ requiredMarkValue: requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
        >
          <Form.Item
            // className="bg-[red]"
            label="Ключевое слово"
            help="Поиск карточек, участников, меток и т. д."
          >
            <Input placeholder="Введите ключевое слово..." />
          </Form.Item>
          <Form.Item label="Участники">
            <Checkbox.Group className="flex w-full select-none flex-col [&>.ant-checkbox-wrapper]:ml-0">
              <Space direction="vertical" className="w-full">
                {memberItems.map((item, index) => (
                  <FilterItem key={index} {...item} isFirst={index === 0} />
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Срок">
            <Checkbox.Group className="flex w-full select-none flex-col [&>.ant-checkbox-wrapper]:ml-0">
              <Space direction="vertical" className="w-full">
                {(isAllDeadlineItems ? deadlineItems : deadlineItems.slice(0, 3)).map(
                  (item, index) => (
                    <FilterItem key={index} {...item} isFirst={index === 0} />
                  ),
                )}
              </Space>
            </Checkbox.Group>
            {isAllDeadlineItems || (
              <Button
                className="ml-6 mt-2 p-0 text-[var(--ds-link,#5e6c84)] hover:text-[var(--ds-link,#172b4d)] hover:underline "
                type="link"
                onClick={() => setAllDeadlineItems(true)}
              >
                Показать все параметры
                <DownOutlined />
              </Button>
            )}
          </Form.Item>
        </Form>
        // TODO: фильтр по меткам
        // TODO: выбор типа совпадения
      }
      onOpenChange={(flag) => {
        setOpen(flag)
        if (flag) {
          setAllDeadlineItems(false) // TODO: сворачивать, только если не отмечено из расширенного списка
          // setFilter(true)
        } else {
          // setFilter(false)
        }
      }}
    >
      <div className="float-left mb-1 mr-1 inline-flex">
        <BoardHeaderButton
          // aria-label=""
          title="Фильтр карточек"
          // onClick={(event) => {
          //   event.preventDefault()
          // }}
          indent={false}
          icon={<FilterOutlined />}
          colors={cx(
            (isOpen || isFilter) &&
              'bg-[var(--dynamic-button-highlighted)] text-[var(--dynamic-button-highlighted-text)] hover:bg-[var(--dynamic-button-highlighted-hovered)] hover:text-[var(--dynamic-button-highlighted-text)]',
          )}
          className={cx(isFilter && 'rounded-r-none')}
        >
          Фильтр
          {isFilter && (
            <span className="ml-2 rounded-[20px] bg-[var(--dynamic-button-highlighted-hovered)] px-1.5">
              {filterCount}
            </span>
          )}
        </BoardHeaderButton>
        {isFilter && (
          <BoardHeaderButton
            // aria-label=""
            title="Очистить фильтры"
            indent={false}
            colors="bg-[var(--dynamic-button-highlighted)] text-[var(--dynamic-button-highlighted-text)] hover:bg-[var(--dynamic-button-highlighted-hovered)] hover:text-[var(--dynamic-button-highlighted-text)]"
            className="rounded-l-none"
            icon={<CloseOutlined />}
            onClick={(event) => {
              event.stopPropagation()
              setFilterCount(0)
            }}
          />
        )}
      </div>
    </CustomDropdown>
  )
}

function PlusButton() {
  const handleClick = () => {}
  const ariaLabel = 'Создать доску или рабочее пространство'
  return (
    <div tabIndex={0} className="mr-1 mb-1 ml-2">
      <div className="lg:hidden">
        <BoardHeaderButton
          aria-label={ariaLabel}
          tabIndex={-1}
          indent={false}
          icon={<PlusOutlined />}
          onClick={handleClick}
        />
      </div>
      <div className="hidden lg:block">
        <BoardHeaderButton
          aria-label={ariaLabel}
          tabIndex={-1}
          indent={false}
          onClick={handleClick}
        >
          Создать
        </BoardHeaderButton>
      </div>
    </div>
  )
}

function MoreButton({ onClick }) {
  // TODO: во время анимации появляется горизонтальная прокрутка окна
  return (
    <BoardHeaderButton
      className="float-left"
      icon={<MoreOutlined />}
      onClick={onClick}
    ></BoardHeaderButton>
  )
}

function CloseButton({ onClick }) {
  // неудачная попытка повторить кнопку модального диалога antd
  // TODO: для Drawer нужно увеличить размер
  return (
    <button
      tabIndex="-1"
      className="h-[22px] w-[22px] rounded-[4px] text-[14px] leading-[22px]
        transition-colors
        hover:bg-black/[0.06]
        active:bg-black/[0.15]
        [&>.anticon]:m-0
        [&>.anticon]:align-[-2px]
        [&>.anticon]:text-black/[0.45]
        [&:hover>.anticon]:text-black/[0.88]"
      type="button"
      aria-label="Close"
      onClick={onClick}
    >
      <CloseOutlined
      // style={{
      //   color: '#6b778c', // TODO: var(--ds-icon-subtle,#6b778c);
      // }}
      />
    </button>
  )
}

function CustomDropdownItem({ children }) {
  return (
    <a
      tabIndex={-1}
      href="#"
      onClick={(event) => {
        event.preventDefault()
      }}
      className="mx-[-12px] block py-[6px] px-[12px] text-sm text-[var(--ds-text,#172b4d)] hover:bg-[var(--ds-background-neutral-hovered,#091e420a)] active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]"
    >
      {children}
    </a>
  )
}

function CustomDropdown({
  header,
  footer,
  items = [],
  onClick,
  onOpenChange,
  placement = 'bottomLeft',
  smallSize = false,
  children,
}) {
  const [open, setOpen] = React.useState(false)
  // const { width, height } = useWindowSize() // TODO: ошибки в смещении при уменьшении размера экрана
  const { token } = theme.useToken()
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    // borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  }
  const menuStyle = {
    boxShadow: 'none',
  }
  return (
    <Dropdown
      trigger={['click']}
      onOpenChange={(flag) => {
        setOpen(flag)
        if (onOpenChange) {
          onOpenChange(flag)
        }
      }}
      open={open}
      placement={placement} // TODO: ошибки в смещении при уменьшении размера экрана
      menu={{
        items,
        onClick: (event) => {
          if (onClick) {
            onClick(event)
          }
          setOpen(false)
        },
      }}
      dropdownRender={(menu) => (
        <div
          style={{
            ...contentStyle,
            // TODO: ошибки в смещении при уменьшении размера экрана
            // width: `${width}px`
          }}
          className={cx(
            'rounded-[3px]',
            // TODO: max-w-
            // TODO: FilterButton - 384px (а надо?)
            smallSize ? 'w-[304px]' : 'w-[370px]',
          )}
        >
          {header && (
            <div className="relative mb-2">
              <span className="mx-3 block truncate border-b border-[var(--ds-border,#091e4221)] px-7 text-center leading-10 text-[var(--ds-text-subtle,#5e6c84)]">
                {header}
              </span>
              <a
                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-[var(--ds-icon-subtle,#6b778c)]  hover:text-[var(--ds-icon,#172b4d)]"
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  setOpen(false)
                }}
              >
                <CloseOutlined />
              </a>
            </div>
          )}
          {!header && !footer && <div className="pt-3" />}
          {items.length > 0 && (
            <div
              className="overflow-y-auto overflow-x-hidden
                px-3 pb-3
                [&>.ant-dropdown-menu]:p-0
                [&>.ant-dropdown-menu>.ant-dropdown-menu-item]:p-0
                [&>.ant-dropdown-menu>.ant-dropdown-menu-item:hover]:bg-black/0
                [&>.ant-dropdown-menu>.ant-dropdown-menu-item-divider]:my-2
                [&>.ant-dropdown-menu>.ant-dropdown-menu-item-divider]:bg-[var(--ds-border,#091e4221)]"
              // TODO: ошибки в смещении при уменьшении размера экрана
              // style={{
              //   maxHeight: `calc(${height}px - 48px)`,
              // }}
            >
              {React.cloneElement(menu as React.ReactElement, {
                tabIndex: '-1', // TODO: пок`а отключил [TAB], надо включить
                style: menuStyle,
              })}
            </div>
          )}
          {footer && <div className="px-3 pt-2 pb-5">{footer}</div>}
        </div>
      )}
    >
      {children}
    </Dropdown>
  )
}

function PermisionLevelButton() {
  const [selected, setSelected] = React.useState('public')
  const map = {
    private: {
      icon: <LockTwoTone twoToneColor="#eb5a46" />, // TODO: var(--ds-icon-accent-red,#eb5a46)
      buttonIcon: <LockOutlined />,
      itemText: 'Приватная',
      title: 'Просматривать и изменять эту доску могут только её участники.',
    },
    workspace: {
      icon: <TeamOutlined style={{ color: '#42526e' }} />, // TODO: var(--ds-icon,#42526e);
      buttonIcon: <TeamOutlined />,
      itemText: 'Рабочее пространство', // TODO: itemSubText
      buttonText: 'Для рабочего пространства',
      title: 'Просматривать и изменять эту доску могут все участники рабочего пространства.',
    },
    // TODO: добавить режим 'enterprise'
    // enterprise: {
    //   icon: <BlockOutlined style={{ color: '#6b778c' }} />, // TODO: var(--ds-icon-subtle,#6b778c);
    //   buttonIcon: <BlockOutlined />,
    //   itemText: 'Организация',
    //   title:
    //     'Просматривать эту доску могут все сотрудники организации. Чтобы предоставить это разрешение, доску нужно добавить в корпоративное рабочее пространство.',
    // },
    // TODO: добавить подтверждение перед включением публичного режима
    public: {
      icon: <GlobalOutlined style={{ color: '#61bd4f' }} />, // TODO: var(--ds-icon-accent-green,#61bd4f);
      buttonIcon: <GlobalOutlined />,
      itemText: 'Публичная',
      title: 'Публичные доски доступны для всех в Интернете.',
    },
  }
  const items = Object.entries(map).map(([key, { icon, itemText, title }]) => ({
    key,
    label: (
      <CustomDropdownItem>
        <span className="flex items-center">
          <span className="mr-1 inline-flex">{icon}</span>
          {itemText}
          {key === selected && (
            <span className="ml-2 inline-flex text-[var(--ds-icon,#42526e)]">
              <CheckOutlined />
            </span>
          )}
        </span>
        <span className="mt-1 inline-block text-xs text-[var(--ds-text-subtle,#5e6c84)]">
          {title}
        </span>
      </CustomDropdownItem>
    ),
  }))
  const value = map[selected]
  return (
    <CustomDropdown
      header="Изменение видимости"
      items={items}
      onClick={(event) => {
        setSelected(event.key)
      }}
    >
      <BoardHeaderButton
        aria-label="Изменить уровень доступа к доске"
        title={value.title}
        onClick={(e) => e.preventDefault()}
        icon={value.buttonIcon}
        className="float-left"
      >
        {value.buttonText || value.itemText}
      </BoardHeaderButton>
    </CustomDropdown>
  )
}

// TODO: Using <Button> results in "findDOMNode is deprecated in StrictMode" warning
// https://github.com/ant-design/ant-design/issues/22493

function FavoriteButton({ boardId, favorites, onChange }) {
  const switchState = favorites.findIndex((item) => item.boardId === boardId) > -1
  return (
    <BoardHeaderButton
      className={cx(
        'float-left',
        '[&:hover>.anticon]:scale-125 [&:focus>.anticon]:scale-125',
        switchState && '[&>.anticon]:text-[#f2d600]',
      )}
      aria-label="Добавить или удалить доску из избранного"
      title="Нажмите, чтобы добавить или удалить доску из избранного. Избранные доски отображаются вверху вашего списка досок."
      icon={switchState ? <StarFilled /> : <StarOutlined />}
      onClick={() => {
        onChange(!switchState)
      }}
    ></BoardHeaderButton>
  )
}

function BoardHeaderButton({
  className,
  title,
  children,
  icon,
  onClick,
  'aria-label': ariaLabel,
  tabIndex = 0,
  indent = true,
  colors,
}) {
  return (
    <Button
      aria-label={ariaLabel}
      title={title}
      icon={icon}
      className={cx(
        // FIX: вынес, т.к. не работает переопределение цветов в className (для FilterButton)
        colors ||
          'bg-[var(--dynamic-button)] text-[var(--dynamic-text)] hover:bg-[var(--dynamic-button-hovered)]',
        'rounded-[3px] border-0 leading-5',
        indent && 'mr-1 mb-1',
        children ? 'px-3' : 'w-8 px-0',
        className,
      )}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {children}
    </Button>
  )
}

function BoardNameButton({ defaultValue, onEndEdit }) {
  const inputRef = React.useRef()
  const textRef = React.useRef()
  const [state, setState] = React.useState({
    isInput: false,
    width: 0,
    value: defaultValue,
  })
  return (
    <div
      className="relative float-left mr-1 mb-1 h-[32px] rounded-[3px] 
        text-[18px] font-bold leading-8 
        text-[var(--dynamic-text)]
        hover:bg-[var(--dynamic-button-hovered)]"
      style={{
        maxWidth: 'calc(100% - 24px)',
        transition: '.1s ease',
      }}
    >
      <a
        href="#"
        aria-label="Редактировать название доски"
        title="Нажмите, чтобы отредактировать название доски."
        onClick={(event) => {
          event.preventDefault()
          setState({
            ...state,
            isInput: true,
            width: textRef.current.offsetWidth,
          })
          setTimeout(() => {
            inputRef.current.focus({
              preventScroll: true,
              cursor: 'all',
            })
          })
        }}
      >
        <h1
          ref={textRef}
          className="mb-3 min-w-[25px] max-w-full 
            truncate whitespace-pre px-3"
        >
          {state.value}
        </h1>
      </a>
      <Input
        className={cx(
          'absolute top-0 left-0 right-0 bottom-0',
          'h-[32px] rounded-[3px] px-3 py-0 text-[18px] font-bold leading-5',
          state.isInput || 'hidden',
        )}
        ref={inputRef}
        maxlengt={512}
        spellCheck={false}
        onBlur={() => {
          let value = state.value.trim()
          if (value == '') {
            value = defaultValue
          }
          textRef.current.innerText = value // for textRef.current.offsetWidth
          setState({
            isInput: false,
            width: textRef.current.offsetWidth,
            value,
          })
          onEndEdit(value)
        }}
        value={state.value}
        onChange={(event) => {
          const value = event.target.value
          textRef.current.innerText = value // for textRef.current.offsetWidth
          setState({
            ...state,
            value,
            width: textRef.current.offsetWidth,
          })
        }}
      />
    </div>
  )
}

function NavHeaderButton({ icon }) {
  return (
    <div role="presentation">
      <Button
        className="border-white/0 hover:bg-white/30 hover:text-white"
        shape="circle"
        ghost
        icon={icon}
      ></Button>
    </div>
  )
}

function SearchPrefixIcon({ onClick }) {
  return (
    <Button
      className={cx(
        'h-[22px] w-[22px] min-w-[22px] border-0 bg-transparent',
        onClick ? 'text-white' : 'text-black',
      )}
      size="small"
      shape="circle"
      icon={<SearchOutlined />}
      onClick={onClick}
    />
  )
}

function Search({ defaultValue, close }) {
  const inputRef = React.useRef()
  React.useEffect(() => {
    inputRef.current.focus()
  }, [])
  const ref = React.useRef(null)
  useOnClickOutside(ref, close)
  return (
    <div ref={ref}>
      <Input
        ref={inputRef}
        className="ant-input-affix-wrapper-focused pointer-events-auto rounded-[5px] pl-1"
        placeholder="Поиск в CSP"
        prefix={<SearchPrefixIcon />}
        defaultValue={defaultValue}
      />
      <div className="search-results pointer-events-auto mt-2 h-96 rounded-[3px] bg-white p-8">
        <div
          // TODO: overflow-y-auto неправильно работает
          className=""
        >
          <Button>OK</Button>
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </div>
        <div>Footer</div>
      </div>
    </div>
  )
}

function SearchButton() {
  const [isSearch, setIsSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const inputContainerRef = React.useRef()
  const inputRef = React.useRef()
  const buttonContainerRef = React.useRef()
  const buttonRef = React.useRef()
  const close = () => {
    setSearch('')
    setIsSearch(false)
    setTimeout(() => {
      if (window.getComputedStyle(inputContainerRef.current).display === 'block') {
        inputRef.current.focus()
        inputRef.current.blur()
      } else if (window.getComputedStyle(buttonContainerRef.current).display === 'block') {
        buttonRef.current.focus()
        buttonRef.current.blur()
      }
    })
  }
  return (
    <>
      <div ref={inputContainerRef} className={cx('hidden', isSearch || 'md:block')}>
        <Input
          className="rounded-[5px] border-white/30 bg-white/[.15] pl-1 text-white caret-white hover:bg-white/30 [&>input]:bg-white/0 [&>input::placeholder]:text-white"
          placeholder="Поиск"
          prefix={<SearchPrefixIcon onClick={() => setIsSearch(true)} />}
          onClick={() => setIsSearch(true)}
          onChange={(event) => {
            setSearch(event.target.value)
            setIsSearch(true)
          }}
          value={search}
          ref={inputRef}
        />
      </div>
      <div ref={buttonContainerRef} className={cx('md:hidden', isSearch && 'hidden')}>
        <Button
          className="rounded-[3px] border-white/0 hover:bg-white/30 hover:text-white"
          ghost
          icon={<SearchOutlined />}
          onClick={() => setIsSearch(true)}
          ref={buttonRef}
        />
      </div>
      <Modal
        className="top-[6px] pb-0
          [&>.ant-modal-content]:pointer-events-none
          [&>.ant-modal-content]:rounded-[3px]
          [&>.ant-modal-content]:bg-white/0
          [&>.ant-modal-content]:p-0
          [&>.ant-modal-content]:shadow-none"
        open={isSearch}
        onCancel={close}
        transitionName=""
        // maskTransitionName=""
        // style={null}
        closable={false}
        footer={null}
        destroyOnClose
        width={760}
        mask={false}
        wrapClassName="search-modal"
      >
        <Search defaultValue={search} close={close} />
      </Modal>
    </>
  )
}

function BoardPage(props: IProps) {
  const router = useRouter()
  const { breadcrumbs } = router.query
  const [isUrlName, setIsUrlName] = React.useState(false)
  React.useEffect(() => {
    if (breadcrumbs === undefined) {
      return
    }
    const route = breadcrumbs[0]
    if (route === 'b') {
      const urlName = breadcrumbs[2]
      if (urlName !== props.urlName) {
        router.push(`/${breadcrumbs[0]}/${breadcrumbs[1]}/${props.urlName}`, undefined, {
          shallow: true,
        })
        return
      }
    }
    setIsUrlName(true)
    if (route === 'c') {
      setIsOpen(true)
    }
  }, [breadcrumbs])
  // const [isMoreButton, setIsMoreButton] = React.useState(true)
  const [isMenu, setIsMenu] = React.useState(false)
  const [favorites, setFavorites] = React.useState(props.favorites)
  const handleChangeFavorites = (value) => {
    if (value) {
      setFavorites([
        ...favorites,
        {
          boardId: props.boardId,
          name: 'Minsk4',
          workspace: 'Andrew Ka',
          color: '#cd5a91',
          wallpapper: '/wallpapper.jpg',
        },
      ])
    } else {
      setFavorites(favorites.filter((item) => item.boardId !== props.boardId))
    }
  }
  const handleDeleteFavorites = (boardId) => {
    setFavorites(favorites.filter((item) => item.boardId !== boardId))
  }
  if (!isUrlName) {
    return
  }
  return (
    <div
      id="chrome-container"
      // className="body-dark-board-background"
      className="h-full bg-[#cd5a91]" // overflow-hidden
    >
      <div id="surface" className="flex h-full flex-col">
        <div className="max-h-[44px] min-h-[44px] overflow-hidden">
          <nav
            className="flex max-h-[44px]
              border-b border-[var(--dynamic-text-transparent)] 
              bg-[var(--dynamic-background)]  
              px-1 py-1.5
              backdrop-blur-[6px]" // TODO: transition
          >
            <Link
              href="/"
              className="mr-1 mb-1 h-8 rounded-[3px] px-1.5 hover:bg-[var(--dynamic-button-hovered)]"
              aria-label="Вернуться на главную страницу"
            >
              <div className="h-8 text-[18px] font-bold leading-8 text-[var(--dynamic-text)]">
                CSP
              </div>
            </Link>
            <InFavoritesButton favorites={favorites} onDelete={handleDeleteFavorites} />
            <PlusButton />
            <div className="flex grow"></div>
            <div className="flex space-x-1">
              <SearchButton />
              <NavHeaderButton icon={<BellOutlined />} />
              <NavHeaderButton icon={<QuestionCircleOutlined />} />
              <NavHeaderButton icon={<UserOutlined />} />
            </div>
          </nav>
        </div>
        <main className="flex grow flex-col">
          <div className="flex flex-1 flex-row">
            <div id="content-wrapper" className="flex flex-1 flex-col">
              <div id="content" className="relative grow">
                <div id="board-wrapper" className="absolute top-0 left-0 right-0 bottom-0">
                  <div
                    id="board-main-content"
                    className={cx(
                      isMenu && `md:mr-[339px]`, // !! соответствует Drawer.width
                      'mr-0 flex h-full flex-col',
                    )}
                    style={{
                      transition: 'margin 0.3s ease-in', // !! 0.3s for Drawer.afterOpenChange
                    }}
                  >
                    <div
                      id="board-header"
                      className="h-auto
                        bg-[var(--board-header-background-color)]
                        pt-2 pr-1 pb-1 pl-2.5"
                    >
                      <BoardNameButton
                        defaultValue="Minsk4"
                        onEndEdit={(value) => console.log(value)}
                      />
                      <FavoriteButton
                        boardId={props.boardId}
                        favorites={favorites}
                        onChange={handleChangeFavorites}
                      />
                      <HeaderDivider />
                      <PermisionLevelButton />
                      <div className="float-right">
                        <FilterButton />
                        <HeaderDivider />
                        <UsersButton users={props.users} />
                        <ShareButton />
                        <HeaderDivider />
                        {/* {isMoreButton && ( */}
                        <MoreButton
                          onClick={() => {
                            // setIsMoreButton(false)
                            setIsMenu(!isMenu)
                          }}
                        />
                        {/* )} */}
                      </div>
                    </div>
                    <div id="board-warnings"></div>
                    <div
                      id="board-canvas"
                      className="grow"
                      style={{
                        background:
                          'linear-gradient(to bottom,var(--board-header-background-color),#0000 80px,#0000)',
                      }}
                    >
                      <Board issues={props.issues} />
                    </div>
                  </div>
                  <Drawer
                    className="relative bg-[var(--ds-surface-overlay,#f4f5f7)]"
                    bodyStyle={{
                      padding: '0 12px',
                    }}
                    // title="Меню"
                    placement="right"
                    // onClose={() => {
                    //   setIsMenu(false)
                    // }}
                    // afterOpenChange={() => {
                    //   if (!isMenu) setIsMoreButton(true)
                    // }}
                    open={isMenu}
                    mask={false}
                    getContainer={false}
                    width={339 + 6}
                    closable={false}
                    // extra={
                    //   <CloseButton
                    //     onClick={() => {
                    //       setIsMenu(false)
                    //     }}
                    //   />
                    // }
                  >
                    <div className="flex h-12 items-center justify-center px-9">
                      <h3 className="truncate text-base font-semibold leading-5">Меню</h3>
                    </div>
                    <a
                      className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-[var(--ds-icon-subtle,#6b778c)]  hover:text-[var(--ds-icon,#172b4d)]"
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        setIsMenu(false)
                      }}
                    >
                      <CloseOutlined className="scale-125" />
                    </a>
                    <hr className="mb-2 border-[var(--ds-border,#091e4221)]" />
                    <MenuButton icon={<ProjectOutlined />} subtitle="Добавьте описание для доски">
                      О доске
                    </MenuButton>
                    <MenuButton>Сменить фон</MenuButton>
                    <MenuButton icon={<EllipsisOutlined />}>Ещё</MenuButton>
                    <MenuDivider />
                    <MenuButton icon={<BarsOutlined />}>Действия</MenuButton>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <CardDetailWindow />
    </div>
  )
}

export default BoardPage
