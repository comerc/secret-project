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
      <div id="chrome-container" className="h-full overflow-hidden">
        <div id="surface" className="flex h-full flex-col">
          <div className="max-h-[44px] min-h-[44px] overflow-hidden">
            <nav
              className="flex max-h-[44px]
              border-b border-[var(--dynamic-text-transparent)] 
              bg-[var(--dynamic-background)]  
              px-1 py-1.5
              backdrop-blur-[6px]" // TODO: transition
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
              <Link
                href="/"
                className="h-8 rounded-[3px] px-1.5 hover:bg-white/30"
                aria-label="Вернуться на главную страницу"
              >
                <div className="h-8 font-bold leading-8 text-white">CSP</div>
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
              <div className="flex flex-1 flex-col"></div>
            </div>
          </main>
        </div>
      </div>
      <Modal
        className="top-[6px] 
        [&>.ant-modal-content]:pointer-events-none
        [&>.ant-modal-content]:bg-white/0
        [&>.ant-modal-content]:p-0
        "
        open={isSearch}
        onCancel={() => {
          setSearch('')
          setIsSearch(false)
        }}
        transitionName=""
        maskTransitionName=""
        style={null}
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
