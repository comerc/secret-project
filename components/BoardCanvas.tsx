import React from 'react'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import cx from 'classnames'

function BoardCanvas({ isMenu, hasMenu, children }) {
  const overlayScrollbarsRef = React.useRef()
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
    initialize(overlayScrollbarsRef.current)
  }, [])
  return (
    <div
      className="flex grow flex-col"
      // className={cx('grow overflow-auto', hasMenu && 'pr-[var(--menu-width)]')}
      style={{
        background:
          'linear-gradient(to bottom,var(--board-header-background-color),#0000 80px,#0000)',
      }}
      ref={overlayScrollbarsRef}
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

export default BoardCanvas
