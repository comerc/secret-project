import React from 'react'
import Link from 'next/link'
import {
  UserOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  StarFilled,
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Input, Modal } from 'antd'
import cx from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'
import HeaderButton from '.../components/HeaderButton'
import CustomDropdown from '.../components/CustomDropdown'

function CircleButton({ icon, title }) {
  return (
    <div role="presentation">
      <Button
        className="border-0 bg-transparent text-[var(--dynamic-text)] shadow-none hover:bg-[var(--dynamic-button-hovered)]"
        shape="circle"
        {...{ icon, title }}
      ></Button>
    </div>
  )
}

function Search({ defaultValue, close }) {
  const inputRef = React.useRef()
  React.useEffect(() => {
    inputRef.current.focus()
  }, [])
  const ref = React.useRef()
  useOnClickOutside(ref, close)
  return (
    <div ref={ref}>
      <Input
        ref={inputRef}
        className="pointer-events-auto rounded-[5px] border border-solid border-[var(--ds-border-focused,#388BFF)] bg-[white] pl-1 text-[var(--ds-text,#172b4d)]"
        bordered={false}
        placeholder="Поиск в CSP"
        prefix={<SearchPrefixIcon />}
        onKeyDown={(event) => {
          event.stopPropagation()
        }}
        onBlur={() => {
          if (process.env.NODE_ENV === 'production') {
            close()
          }
        }}
        {...{ defaultValue }}
      />
      <div className="search-results pointer-events-auto mt-2 h-96 rounded-[3px] bg-white p-8">
        <div
          // TODO: overflow-y-auto неправильно работает
          className=""
        >
          <Button>OK</Button>
          <p>some contents…</p>
          <p>some contents…</p>
          <p>some contents…</p>
        </div>
        <div>Footer</div>
      </div>
    </div>
  )
}

function SearchPrefixIcon({ onClick }) {
  return (
    <Button
      className={cx(
        'h-[22px] w-[22px] min-w-[22px] border-0 bg-transparent shadow-none',
        onClick ? 'text-white' : 'text-black',
      )}
      size="small"
      shape="circle"
      icon={<SearchOutlined />}
      {...{ onClick }}
    />
  )
}

function SearchButton() {
  const SEARCH_MODAL_WIDTH = 760
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
  const getRight = () => {
    const bodyRect = document.body.getBoundingClientRect()
    const element = document.getElementById('search-button')
    const elementRect = element.getBoundingClientRect()
    const right = bodyRect.right - elementRect.right
    return bodyRect.width - right * 2 > SEARCH_MODAL_WIDTH ? right : 'unset'
  }
  const right = isSearch ? getRight() : 'unset'
  return (
    <div id="search-button">
      <div ref={inputContainerRef} className={cx('hidden', isSearch || 'md:block')}>
        <Input
          className="rounded-[5px] border border-solid border-white/30 bg-white/[.15] pl-1 caret-white hover:bg-white/30 [&>input::placeholder]:text-white"
          bordered={false}
          placeholder="Поиск"
          prefix={
            <SearchPrefixIcon
              onClick={() => {
                setIsSearch(true)
              }}
            />
          }
          onClick={() => {
            setIsSearch(true)
            // const bodyRect = document.body.getBoundingClientRect()
          }}
          onChange={(event) => {
            setSearch(event.target.value)
            setIsSearch(true)
          }}
          value={search}
          ref={inputRef}
          onKeyDown={(event) => {
            event.stopPropagation()
          }}
        />
      </div>
      <div ref={buttonContainerRef} className={cx('md:hidden', isSearch && 'hidden')}>
        <Button
          className="rounded-[3px] border-0 bg-transparent text-[var(--dynamic-text)] shadow-none hover:bg-[var(--dynamic-button-hovered)]"
          icon={<SearchOutlined />}
          onClick={() => {
            setIsSearch(true)
          }}
          ref={buttonRef}
        />
      </div>
      <Modal
        className={cx(
          'top-[6px] pb-0',
          '[&>.ant-modal-content]:pointer-events-none',
          '[&>.ant-modal-content]:rounded-[3px]',
          '[&>.ant-modal-content]:bg-white/0',
          '[&>.ant-modal-content]:p-0',
          '[&>.ant-modal-content]:shadow-none',
          right !== 'unset' && 'absolute mx-0',
        )}
        style={{
          right,
        }}
        open={isSearch}
        onCancel={close}
        transitionName=""
        // maskTransitionName=""
        // style={null}
        closable={false}
        footer={null}
        destroyOnClose
        width={SEARCH_MODAL_WIDTH}
        mask={false}
        wrapClassName="search-modal"
      >
        <Search defaultValue={search} {...{ close }} />
      </Modal>
    </div>
  )
}

function PlusButton() {
  const handleClick = () => {}
  const ariaLabel = 'Создать доску или рабочее пространство'
  return (
    <div tabIndex="0" className="mb-1 ml-2 mr-1">
      <div className="lg:hidden">
        <HeaderButton
          aria-label={ariaLabel}
          tabIndex="-1"
          indent={false}
          icon={<PlusOutlined />}
          onClick={handleClick}
          // исключён active:bg- (как в оригинале)
          colors="bg-[var(--dynamic-button)] text-[var(--dynamic-text)] hover:bg-[var(--dynamic-button-hovered)]"
        />
      </div>
      <div className="hidden lg:block">
        <HeaderButton aria-label={ariaLabel} tabIndex="-1" indent={false} onClick={handleClick}>
          Создать
        </HeaderButton>
      </div>
    </div>
  )
}

function InBoardStarsButton({ boardStars, onDelete }) {
  const items = boardStars.map(({ board }) => (
    <div key={board.id} className="pb-1 pt-1">
      <div className="flex h-8 select-none rounded-[3px] hover:bg-[var(--ds-background-neutral,#EBECF0)]">
        <div
          className="h-8 w-[52px] flex-none rounded-[3px]"
          style={{
            backgroundColor: board.prefs.backgroundColor,
            // TODO: board.prefs.backgroundImage
          }}
        />
        <div className="flex grow flex-col truncate pl-2">
          <div className="truncate text-[14px] font-[500] leading-[18px]">{board.name}</div>
          <div className="truncate text-[12px] leading-[12px] text-[var(--ds-text-subtle,#5E6C84)]">
            {board.organization.displayName}
          </div>
        </div>
        <div className="flex w-8 flex-none items-center justify-center">
          <Button
            className="border-[var(--ds-border,#091e4221)] shadow-none [&:focus>.anticon]:scale-125 [&:hover>.anticon]:scale-125 [&>.anticon]:text-[#f2d600]"
            title={`Нажмите, чтобы удалить доску "${board.name}" из избранного.`}
            icon={<StarFilled />}
            size="small"
            onClick={() => onDelete(board.id)}
          ></Button>
        </div>
      </div>
    </div>
  ))
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <CustomDropdown
      smallSize
      footer={
        items.length === 0 ? (
          // TODO: добавить картинку
          <div className="pb-2 pt-3 text-center">
            Чтобы быстро находить важные доски, отмечайте их.
          </div>
        ) : (
          // TODO: добавить перестановку через drag'n'drop
          <div className="pb-2 pt-3">{items}</div>
        )
      }
      {...{ isOpen, setIsOpen }}
    >
      <HeaderButton
        aria-label="Избранные"
        // title="" // TODO: добавить title
        colors="bg-transparent text-[var(--dynamic-text)] hover:bg-[var(--dynamic-button-hovered)]"
        // var(--header-menu-background)
        // var(--header-menu-color)
      >
        В избранном
        <DownOutlined />
      </HeaderButton>
    </CustomDropdown>
  )
}

function Header({ boardStars, handleDeleteBoardStars }) {
  return (
    <div className="max-h-[44px] min-h-[44px] overflow-hidden">
      <nav // TODO: transition
        className="flex max-h-[44px] border-b border-[var(--dynamic-text-transparent)] bg-[var(--dynamic-background)] px-1 py-1.5 backdrop-blur-[6px]"
      >
        <Link
          href="/"
          className="mb-1 mr-1 h-8 rounded-[3px] px-1.5 hover:bg-[var(--dynamic-button-hovered)]"
          aria-label="Вернуться на главную страницу"
        >
          <div className="flex h-8 items-center gap-1 text-[18px] font-bold leading-8 text-[var(--dynamic-text)]">
            <HeartOutlined />
            Secret
          </div>
        </Link>
        <InBoardStarsButton onDelete={handleDeleteBoardStars} {...{ boardStars }} />
        <PlusButton />
        <div className="flex grow"></div>
        <div className="flex space-x-1">
          <SearchButton />
          <CircleButton icon={<BellOutlined />} title="Уведомления" />
          <CircleButton icon={<QuestionCircleOutlined />} title="Информация" />
          <CircleButton icon={<UserOutlined />} title="Учётная запись" />
        </div>
      </nav>
    </div>
  )
}

export default Header
