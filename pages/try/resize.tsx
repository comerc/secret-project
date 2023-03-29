import React from 'react'
import cx from 'classnames'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import { useEventListener } from 'usehooks-ts'

// TODO: will-change: transform
// reactStrictMode: false и рендерить ColumnBody.Footer только на второй проход AutoSizer?

function ColumnBody({ height, width }) {
  console.log(height)
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
        <div key={k}>{height}</div>
      ))}
      <div className="sticky bottom-0 bg-white">Footer</div>
    </div>
  )
}

function Column() {
  return (
    <div className="flex h-full w-32 flex-col">
      <h3>Header</h3>
      <div className="h-full overflow-hidden">
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
    <div className="h-full overflow-y-hidden" {...{ ref }}>
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
  const [isDummy, setIsDummy] = React.useState(false)
  const toggleHeaderHeight = () => {
    setIsExpandedHeaderHeight((isExpandedHeaderHeight) => !isExpandedHeaderHeight)
  }
  return (
    <div
      id="content"
      className="fixed top-0 left-0 right-0 bottom-0 flex flex-col overflow-hidden bg-[green]"
    >
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
