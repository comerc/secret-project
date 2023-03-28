import React from 'react'
import cx from 'classnames'
import AutoSizer from 'react-virtualized-auto-sizer'

function Main({ isExpandedHeaderHeight, height, width }) {
  return (
    <div
      className="flex justify-center border-2 border-[gray]"
      style={{
        height,
        width,
      }}
    >
      {isExpandedHeaderHeight ? 1 : 0}
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
    <div id="content" className="flex h-[500px] max-h-[500px] flex-col overflow-hidden bg-[pink]">
      <div
        id="header"
        className={cx(
          isExpandedHeaderHeight && 'h-20',
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
      <div id="main-wrapper" className="grow">
        {/* <Main {...{ isExpandedHeaderHeight }} /> */}
        <AutoSizer>
          {({ height, width }) => <Main {...{ isExpandedHeaderHeight, height, width }} />}
        </AutoSizer>
      </div>
    </div>
  )
}

export default TryResizePage
