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
  MoreOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons'
import {
  Drawer,
  Button,
  Input,
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
}

export const getServerSideProps = async ({ query }): IProps => {
  resetServerContext()
  const issues = Array.from({ length: 100 }, (v, k) => k).map((k) => ({
    id: `id-${k}`,
    text: `Issue ${k} ` + generateSentence(),
  }))
  const boardId = nanoid(8)
  const favorites = [
    { boardId, name: 'Minsk4', title: '123', color: '#cd5a91', wallpapper: '/wallpapper.jpg' },
  ]
  return { props: { issues, boardId, favorites } }
}

function InFavoritesButton({ favorites, onChange }) {
  const items = favorites.map(({ boardId, name, title }) => ({
    key: boardId,
    label: (
      <a
        tabIndex={-1}
        href="#"
        name={boardId}
        onClick={(event) => {
          event.preventDefault()
        }}
        className="mx-[-12px] block py-[6px] px-[12px]
        hover:bg-[var(--ds-background-neutral-hovered,#091e420a)]
        active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]"
      >
        <span className="mr-1">{boardId}</span>
        <div>{name}</div>
        <span
          className="inline-block text-xs
          text-[var(--ds-text-subtle,#5e6c84)]"
        >
          {title}
        </span>
      </a>
    ),
  }))
  return (
    <CustomDropdown
      items={items}
      smallSize={true}
      footer={
        items.length === 0 && (
          // TODO: добавить картинку
          <div className="text-center">Чтобы быстро находить важные доски, отмечайте их.</div>
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
  return (
    <CustomDropdown items={[]} placement="bottom">
      <BoardHeaderButton
      // aria-label=""
      // title={value.title}
      // onClick={(e) => e.preventDefault()}
      // icon={value.buttonIcon}
      >
        Фильтр
      </BoardHeaderButton>
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
      // floatRight
      icon={<MoreOutlined rotate={90} />}
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
                tabIndex: '-1', // TODO: пока отключил [TAB], надо включить
                style: menuStyle,
              })}
            </div>
          )}
          {footer && <div className="px-3 py-5">{footer}</div>}
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
      >
        {value.buttonText || value.itemText}
      </BoardHeaderButton>
    </CustomDropdown>
  )
}

// TODO: Using <Button> results in "findDOMNode is deprecated in StrictMode" warning
// https://github.com/ant-design/ant-design/issues/22493

function FavoriteButton({ boardId, favorites, onChange }) {
  const [switchState, setSwitchState] = React.useState(
    favorites.findIndex((item) => item.boardId === boardId) > -1,
  )
  return (
    <BoardHeaderButton
      aria-label="Добавить или удалить доску из избранного"
      title="Нажмите, чтобы добавить или удалить доску из избранного. Избранные доски отображаются вверху вашего списка досок."
      icon={switchState ? <StarFilled /> : <StarOutlined />}
      switchState={switchState}
      onClick={() => {
        onChange(!switchState)
        setSwitchState(!switchState)
      }}
    />
  )
}

function BoardHeaderButton({
  title,
  // floatRight,
  children,
  icon,
  switchState = null,
  onClick,
  'aria-label': ariaLabel,
  tabIndex = 0,
  indent = true,
}) {
  return (
    <Button
      aria-label={ariaLabel}
      title={title}
      icon={icon}
      className={cx(
        'rounded-[3px] border-0 bg-[var(--dynamic-button)]',
        'leading-5 hover:bg-[var(--dynamic-button-hovered)]',
        // floatRight ? 'float-right' : 'float-left ',
        indent && 'mr-1 mb-1',
        children ? (icon ? 'pl-2 pr-3' : 'px-3') : 'w-8 px-1.5',
        switchState ? 'text-[#f2d600]' : 'text-[var(--dynamic-text)]',
        switchState !== null && 'scale-icon',
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
  const [isMoreButton, setIsMoreButton] = React.useState(true)
  const [isMenu, setIsMenu] = React.useState(false)
  const [favorites, setFavorites] = React.useState(props.favorites)
  const handleChangeFavorites = (value) => {
    if (value) {
      setFavorites([...favorites, props.boardId])
    } else {
      setFavorites(favorites.filter((item) => item.boardId !== props.boardId))
    }
  }
  return (
    <div
      id="chrome-container"
      // className="body-dark-board-background"
      className="h-full" // overflow-hidden
      style={{
        '--dynamic-background': 'hsla(0, 0%, 0%, 0.16)',
        '--dynamic-button': 'rgba(255, 255, 255, 0.2)',
        '--dynamic-button-hovered': 'rgba(255, 255, 255, 0.3)',
        '--dynamic-button-pressed': 'rgba(255, 255, 255, 0.4)',
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
            <InFavoritesButton favorites={favorites} onChange={handleChangeFavorites} />
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
                        defaultValue="Minsk4 Minsk4 Minsk4 Minsk4"
                        onEndEdit={(value) => console.log(value)}
                      />
                      <FavoriteButton
                        boardId={props.boardId}
                        favorites={favorites}
                        onChange={handleChangeFavorites}
                      />
                      <PermisionLevelButton />
                      <div className="float-right">
                        <FilterButton />
                        {isMoreButton && (
                          <MoreButton
                            onClick={() => {
                              setIsMoreButton(false)
                              setIsMenu(true)
                            }}
                          />
                        )}
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
                    afterOpenChange={() => {
                      if (!isMenu) setIsMoreButton(true)
                    }}
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
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
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
