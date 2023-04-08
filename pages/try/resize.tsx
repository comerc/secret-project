import React from 'react'
import cx from 'classnames'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

// TODO: will-change: transform

function ColumnBody({ height, width }) {
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
  const isProd = true // process.env.NODE_ENV === 'production' // предполагаю, что StrictMode отключен в prod-е
  const isRerender = React.useRef(false)
  if (isProd) {
    isRerender.current = !isRerender.current
  } else {
    const RenderCount = React.useRef(0)
    RenderCount.current++
    console.log(RenderCount.current)
    if (RenderCount.current === 1) {
      isRerender.current = true
    }
    if (RenderCount.current === 2) {
      isRerender.current = false
    }
    if (RenderCount.current === 5) {
      RenderCount.current = 1
      isRerender.current = true
    }
  }
  console.log(height, isRerender.current)
  return (
    <div
      className="flex flex-col overflow-x-hidden"
      style={{
        height,
        width,
      }}
      {...{ ref }}
    >
      {Array.from({ length: 30 }, (v, k) => k).map((k) => (
        <div key={k}>{k}</div>
      ))}
      <div
        // HACK: isRerender.current прячет мигание уменьшаемой высоты колоки
        className={cx('sticky bottom-0 bg-white', isRerender.current ? 'visible' : 'invisible')}
      >
        Footer {height}
      </div>
    </div>
  )
}

function Column() {
  return (
    <div className="flex h-full w-32 flex-col">
      <h3>Header</h3>
      <div
        // HACK: overflow-hidden прячет мигание увеличенной высоты колоки
        className="h-full overflow-hidden"
      >
        <AutoSizer>{({ height, width }) => <ColumnBody {...{ height, width }} />}</AutoSizer>
      </div>
    </div>
  )
}

function Board() {
  const ref = React.useRef()
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      overflow: {
        // x: isMenu === hasMenu ? 'scroll' : 'hidden',
        x: 'scroll',
        y: 'hidden',
      },
      // paddingAbsolute: true,
      // showNativeOverlaidScrollbars: true,
      scrollbars: {
        // theme: cx('os-theme-light board', hasMenu && 'has-menu'),
        theme: cx('os-theme-light board has-menu'),
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
    <div className="disable-system-scrollbar h-full overflow-y-hidden" {...{ ref }}>
      <div
        className="mr-[var(--menu-width)] flex h-full bg-[pink] pb-7"
        style={{
          width: 128 * 5,
        }}
      >
        <Column />
        {/* <Column />
        <Column />
        <Column />
        <Column /> */}
      </div>
    </div>
  )
}

function TryResizePage() {
  const [isExpandedHeaderHeight, setIsExpandedHeaderHeight] = React.useState(false)
  const toggleHeaderHeight = () => {
    setIsExpandedHeaderHeight((isExpandedHeaderHeight) => !isExpandedHeaderHeight)
  }
  return (
    <div id="content" className="fixed top-0 left-0 right-0 bottom-0 flex flex-col bg-[green]">
      <div
        id="header"
        className={cx(
          isExpandedHeaderHeight ? 'h-96' : 'h-12',
          'overflow-hidden bg-[var(--board-header-background-color)]',
        )}
      >
        <button
          className="float-right m-1 rounded border p-1 text-[white]"
          onClick={toggleHeaderHeight}
        >
          toggle
        </button>
      </div>
      <Board />
    </div>
  )
}

export default TryResizePage
