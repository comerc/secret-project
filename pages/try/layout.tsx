import React from 'react'
import Link from 'next/link'
import {
  SearchOutlined,
  UserOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Button, Input, Modal, Icon } from 'antd'
import cx from 'classnames'

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
      className="relative float-left mr-1 mb-1 h-[32px] 
        cursor-pointer rounded-[3px] 
        bg-black/0 text-[18px] font-bold leading-8 
        text-[var(--dynamic-text)]
        hover:bg-[var(--dynamic-button-hovered)]"
      style={{
        'max-width': 'calc(100% - 24px)',
        transition: '.1s ease',
      }}
    >
      <h1
        ref={textRef}
        className={cx('mb-3 inline-block min-w-[25px] max-w-full truncate whitespace-pre px-3')}
        onClick={() => {
          setState({
            ...state,
            isInput: true,
            width: textRef.current.offsetWidth,
          })
          setTimeout(() => {
            inputRef.current.focus({
              cursor: 'all',
            })
          })
        }}
      >
        {state.value}
      </h1>
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

function Search({ defaultValue }) {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current.focus()
  }, [])
  return (
    <>
      <Input
        ref={ref}
        className="ant-input-affix-wrapper-focused pointer-events-auto rounded-[5px]"
        placeholder="Поиск в CSP"
        prefix={<SearchPrefixIcon />}
        defaultValue={defaultValue}
      />
      <div className="pointer-events-auto mt-2 h-96 rounded-[3px] bg-white p-8">
        <Button>OK</Button>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </div>
    </>
  )
}

function TryLayoutPage({ issues }) {
  const [isSearch, setIsSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')
  return (
    <>
      <div
        id="chrome-container"
        className="body-dark-board-background"
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
          <div
            className="max-h-[44px] min-h-[44px]"
            // overflow-hidden
          >
            <nav
              className="flex max-h-[44px]
              border-b border-[var(--dynamic-text-transparent)] 
              bg-[var(--dynamic-background)]  
              px-1 py-1.5
              backdrop-blur-[6px]" // TODO: transition
            >
              <Link
                href="/"
                className="h-8 rounded-[3px] px-1.5 hover:bg-white/30"
                aria-label="Вернуться на главную страницу"
              >
                <div className="h-8 text-[18px] font-bold leading-8 text-white">CSP</div>
              </Link>
              <div className="flex grow"></div>
              <div className="flex space-x-1">
                <div className={cx('hidden', isSearch || 'md:block')}>
                  <Input
                    className="rounded-[5px] border-white/30 bg-white/[.15] text-white hover:bg-white/30 [&>input]:bg-white/0 [&>input::placeholder]:text-white"
                    placeholder="Поиск"
                    prefix={<SearchPrefixIcon onClick={() => setIsSearch(true)} />}
                    onClick={() => setIsSearch(true)}
                    onChange={(event) => {
                      setSearch(event.target.value)
                      setIsSearch(true)
                    }}
                    value={search}
                  />
                </div>
                <div className={cx('md:hidden', isSearch && 'hidden')}>
                  <Button
                    className="rounded-[3px] border-white/0 hover:bg-white/30 hover:text-white"
                    ghost
                    icon={<SearchOutlined />}
                    onClick={() => setIsSearch(true)}
                  />
                </div>
                <div role="presentation">
                  <Button
                    className="border-white/0 hover:bg-white/30 hover:text-white"
                    shape="circle"
                    ghost
                    icon={<BellOutlined />}
                  ></Button>
                </div>
                <div role="presentation">
                  <Button
                    className="border-white/0 hover:bg-white/30 hover:text-white"
                    shape="circle"
                    ghost
                    icon={<QuestionCircleOutlined />}
                  ></Button>
                </div>
                <div role="presentation">
                  <Button
                    className="border-white/0 hover:bg-white/30 hover:text-white"
                    shape="circle"
                    ghost
                    icon={<UserOutlined />}
                  ></Button>
                </div>
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
                      className="mr-0 flex h-full flex-col"
                      style={{
                        transition: 'margin .1s ease-in',
                      }}
                    >
                      <div
                        id="board-header"
                        className="h-auto
                        bg-[var(--board-header-background-color)]
                        pt-2 pr-1 pb-1 pl-3"
                      >
                        <BoardNameButton
                          defaultValue="Minsk2 Minsk4 Minsk4 Minsk4 Minsk4 Minsk4 Minsk4 Minsk4 Minsk4 Minsk4
                            Minsk4 Minsk4 Minsk4 Minsk4 Minsk4"
                          onEndEdit={(value) => console.log(value)}
                        />
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
                        <div id="board"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Modal
        className="top-[6px]
          [&>.ant-modal-content]:pointer-events-none
          [&>.ant-modal-content]:bg-white/0
          [&>.ant-modal-content]:p-0"
        open={isSearch}
        onCancel={() => {
          setSearch('')
          setIsSearch(false)
        }}
        transitionName=""
        maskTransitionName=""
        // style={null}
        closable={false}
        footer={null}
        destroyOnClose
        width={760}
      >
        <Search defaultValue={search} />
      </Modal>
    </>
  )
}

export default TryLayoutPage
