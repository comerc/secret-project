import React from 'react'
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
} from '@ant-design/icons'
import {
  Tooltip,
  Avatar,
  Form,
  Drawer,
  Button,
  Input,
  Checkbox,
  Modal,
  Icon,
  Dropdown,
  Space,
  Divider,
  theme,
  renderCloseIcon,
} from 'antd'
import type { MenuProps } from 'antd'
import cx from 'classnames'
import ClientOnly from '.../components/ClientOnly'
import { useWindowSize, useOnClickOutside } from 'usehooks-ts'
import { resetServerContext } from 'react-beautiful-dnd'
import generateSentence from '.../utils/generateSentence'
import { nanoid } from 'nanoid'
import Image from 'next/image'

type IProps = {
  issues: []
  boardId: string
  favorites: []
  users: []
}

export const getServerSideProps = async ({ query }): IProps => {
  resetServerContext()
  const users = await fetch('https://randomuser.me/api/?results=20')
    .then((res) => res.json())
    .then((data) => data.results)
  const issues = Array.from({ length: 100 }, (v, k) => k).map((k) => ({
    id: `id-${k}`,
    text: `Issue ${k} ` + generateSentence(),
  }))
  const boardId = nanoid(8)
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
  return { props: { issues, boardId, favorites, users } }
}

function HeaderDivider() {
  return (
    <div className="float-left ml-1 mr-2 mt-2 mb-3 inline-block h-4 border-l border-[var(--dynamic-text-transparent)]" />
  )
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
      {users.map(({ login: { uuid, username }, picture: { thumbnail }, name }, index, a) => (
        <a
          key={uuid}
          className="hover:[&>.ant-avatar]:bg-[#c1c7d0] hover:[&>.ant-avatar>img]:opacity-80"
          href="#"
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          <Tooltip title={`${name.first} ${name.last} (${username})`} placement="bottomRight">
            <Avatar src={thumbnail} style={{ zIndex: a.length - index }} className="" />
          </Tooltip>
        </a>
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
            className="[&>.anticon]:text-[#f2d600] [&:hover>.anticon]:scale-125 [&:focus>.anticon]:scale-125"
            title={`Нажмите, чтобы удалить доску "${name}" из избранного.`}
            icon={<StarFilled />}
            // ghost
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
      >
        <Space>
          В избранном
          <DownOutlined />
        </Space>
      </BoardHeaderButton>
    </CustomDropdown>
  )
}

function FilterButton() {
  const [isAllDeadlineItems, setAllDeadlineItems] = React.useState(false)
  const [filterCount, setFilterCount] = React.useState(0)
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
          <Form.Item label="Ключевое слово" help="Поиск карточек, участников, меток и т. д.">
            <Input placeholder="Введите ключевое слово..." />
          </Form.Item>
          <Form.Item label="Участники">
            <Checkbox.Group className="flex w-full select-none flex-col [&>.ant-checkbox-wrapper]:ml-0">
              <Space direction="vertical" className="w-full">
                {memberItems.map(({ background, icon, text }, index) => (
                  <Checkbox
                    key={index}
                    value={index}
                    className="w-full items-center text-[var(--ds-text-subtle,#5e6c84)]
                        [&>.ant-checkbox]:top-0"
                  >
                    {icon ? (
                      <Space>
                        <div
                          className={cx(
                            'flex h-6 w-6 items-center justify-center rounded-[50%]',
                            background,
                          )}
                        >
                          {icon}
                        </div>
                        {text}
                      </Space>
                    ) : (
                      text
                    )}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Срок">
            <Checkbox.Group className="flex w-full select-none flex-col [&>.ant-checkbox-wrapper]:ml-0">
              <Space direction="vertical" className="w-full">
                {(isAllDeadlineItems ? deadlineItems : deadlineItems.slice(0, 3)).map(
                  ({ background, icon, text }, index) => (
                    <Checkbox
                      key={index}
                      value={index}
                      className="w-full items-center text-[var(--ds-text-subtle,#5e6c84)]
                        [&>.ant-checkbox]:top-0"
                    >
                      {icon ? (
                        <Space>
                          <div
                            className={cx(
                              'flex h-6 w-6 items-center justify-center rounded-[50%]',
                              background,
                            )}
                          >
                            {icon}
                          </div>
                          {text}
                        </Space>
                      ) : (
                        text
                      )}
                    </Checkbox>
                  ),
                )}
              </Space>
            </Checkbox.Group>
            {isAllDeadlineItems || (
              <button
                className="ml-6 mt-2 text-[var(--ds-link,#5e6c84)] hover:underline"
                type="button"
                onClick={() => setAllDeadlineItems(true)}
              >
                <Space>
                  Показать все параметры
                  <DownOutlined />
                </Space>
              </button>
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
    <div tabIndex={0} className="mr-1 mb-1">
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

function CloseButton({ onClick }) {
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
          className={cx('relative rounded-[3px]', smallSize ? 'w-[304px]' : 'w-[370px]')} // TODO: max-w-
        >
          {header && (
            <div className="mb-2 h-10 text-center">
              <span
                className="mx-3 block truncate 
                  border-b border-[var(--ds-border,#091e4221)] 
                  px-8 leading-10"
              >
                {header}
              </span>
              <div className="absolute right-0 top-0 py-[10px] pl-[8px] pr-[12px]">
                <CloseButton
                  onClick={() => {
                    setOpen(false)
                  }}
                />
              </div>
            </div>
          )}
          {!header && !footer && <div className="pt-3" />}
          {items.length > 0 && (
            <div
              className="overflow-y-auto overflow-x-hidden
                px-3 pb-3
                [&>.ant-dropdown-menu]:p-0
                [&>.ant-dropdown-menu>.ant-dropdown-menu-item]:p-0
                [&>.ant-dropdown-menu>.ant-dropdown-menu-item:hover]:bg-black/0"
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
  const items = Object.entries(map).map(([key, { icon, itemText, title }]) => ({
    key,
    label: (
      <a
        tabIndex={-1}
        href="#"
        name={key}
        onClick={(event) => {
          event.preventDefault()
        }}
        className="mx-[-12px] block py-[6px] px-[12px]
        hover:bg-[var(--ds-background-neutral-hovered,#091e420a)]
        active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]"
      >
        <span className="mr-1">{icon}</span>
        <Space>
          {itemText}
          {key === selected && (
            <span
              style={{ color: '#42526e' }} // TODO: var(--ds-icon,#42526e);
            >
              <CheckOutlined />
            </span>
          )}
        </Space>
        <span
          className="inline-block text-xs
          text-[var(--ds-text-subtle,#5e6c84)]"
        >
          {title}
        </span>
      </a>
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
  React.useEffect(() => {
    inputRef.current.input.spellcheck = false
  }, [])
  return (
    <div
      className="relative float-left mr-1 mb-1 h-[32px] rounded-[3px] 
        bg-[var(--dynamic-button)] text-[18px] font-bold leading-8 
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
          'h-[32px] rounded-[3px] text-[18px] font-bold leading-5 transition-none',
          state.isInput || 'hidden',
        )}
        ref={inputRef}
        maxlengt={512}
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
        'h-[22px] w-[22px] min-w-[22px] border-0',
        onClick ? 'text-white' : 'text-black',
      )}
      size="small"
      shape="circle"
      ghost
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

function TryLayoutPage(props: IProps) {
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
  return (
    <div
      id="chrome-container"
      // className="body-dark-board-background"
      className="h-full bg-[#cd5a91]" // overflow-hidden
      style={{
        '--dynamic-background': 'hsla(0, 0%, 0%, 0.16)',
        '--dynamic-button': 'rgba(255, 255, 255, 0.2)',
        '--dynamic-button-hovered': 'rgba(255, 255, 255, 0.3)',
        '--dynamic-button-pressed': 'rgba(255, 255, 255, 0.4)',
        '--dynamic-button-highlighted': '#DFE1E6',
        '--dynamic-button-highlighted-text': '#172B4D',
        '--dynamic-button-highlighted-hovered': '#FFFFFF',
        '--dynamic-icon': '#ffffff',
        '--dynamic-text': '#ffffff',
        '--dynamic-text-transparent': 'hsla(0, 0%, 100%, 0.16)',
        '--dynamic-background-transparent': 'hsla(0, 0%, 0%, 0.16)',
      }}
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
              className="mr-1 mb-1 h-8 rounded-[3px] px-1.5 hover:bg-white/30 "
              aria-label="Вернуться на главную страницу"
            >
              <div className="h-8 text-[18px] font-bold leading-8 text-white">CSP</div>
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
                        pt-2 pr-1 pb-1 pl-3"
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
                      <div id="board">
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
                    </div>
                  </div>
                  <Drawer
                    className="bg-[var(--ds-surface-overlay,#f4f5f7)]"
                    title="Меню"
                    placement="right"
                    onClose={() => {
                      setIsMenu(false)
                    }}
                    // afterOpenChange={() => {
                    //   if (!isMenu) setIsMoreButton(true)
                    // }}
                    open={isMenu}
                    mask={false}
                    getContainer={false}
                    width={339}
                    // closable={false}
                    // extra={
                    //   <CloseButton
                    //     onClick={() => {
                    //       setIsMenu(false)
                    //     }}
                    //   />
                    // }
                  >
                    <MenuButton icon={<ProjectOutlined />} subtitle="Добавьте описание для доски">
                      О доске
                    </MenuButton>
                    <MenuButton>Сменить фон</MenuButton>
                    <MenuButton icon={<EllipsisOutlined />}>Ещё</MenuButton>
                    <hr className="my-4" />
                    <MenuButton icon={<BarsOutlined />}>Действия</MenuButton>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TryLayoutPage
