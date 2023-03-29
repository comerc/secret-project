import React from 'react'
import { Button, Modal } from 'antd'
import { useOverlayScrollbars } from 'overlayscrollbars-react'
import ReactWindowBoard from '.../components/try/ReactWindowBoard'
import ClientOnly from '.../components/ClientOnly'
// import { resetServerContext } from 'react-beautiful-dnd'
import { useElementSize } from 'usehooks-ts'
import cx from 'classnames'

export const getServerSideProps = async ({ query }) => {
  // resetServerContext() // https://github.com/hello-pangea/dnd/commit/bcb66d32683519fb09f6a651ec2a0f63bd90d304
  return { props: {} }
}

function TryReactWindowBoardPage() {
  const [isMenu, setIsMenu] = React.useState(false)
  const [hasMenu, setHasMenu] = React.useState(false)
  const [boardHeaderRef, { height: boardHeaderHeight }] = useElementSize()
  const [windowRef, { width: windowWidth, height: windowHeight }] = useElementSize()
  console.log(boardHeaderHeight)
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      overflow: {
        x: 'scroll',
        y: 'hidden',
      },
      // paddingAbsolute: true,
      // showNativeOverlaidScrollbars: true,
      scrollbars: {
        theme: cx('os-theme-light', isMenu && 'is-menu'),
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
    initialize(document.body)
  }, [initialize])
  // TODO: useCapture for addEventListener & removeEventListener
  // React.useEffect(() => {
  //   window.addEventListener('mousedown', handleMouseDown)
  //   window.addEventListener('mouseup', handleMouseUp)
  //   window.addEventListener('mousemove', handleMouseMove)
  //   return () => {
  //     window.removeEventListener('mousedown', handleMouseDown)
  //     window.removeEventListener('mouseup', handleMouseUp)
  //     window.removeEventListener('mousemove', handleMouseMove)
  //   }
  // }, [])
  const positionRef = React.useRef({
    startX: null,
    startScrollX: null,
  })
  const handleMouseDown = ({ target, clientX }) => {
    console.log('handleMouseDown')
    positionRef.current = {
      startX: clientX,
      startScrollX: window.scrollX,
    }
    // window.addEventListener('mouseup', handleMouseUp)
    // window.addEventListener('mousemove', handleMouseMove)
  }
  const handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = positionRef.current
    if (startScrollX !== null) {
      const scrollX = startScrollX + clientX - startX
      window.scrollTo(scrollX, 0)
      const windowScrollX = window.scrollX
      console.log('handleMouseMove', scrollX, windowScrollX)
      if (scrollX !== windowScrollX) {
        positionRef.current = {
          startX: clientX - windowScrollX + startScrollX,
          startScrollX,
        }
      }
    }
  }
  const handleMouseUp = () => {
    console.log('handleMouseUp')
    // window.removeEventListener('mousemove', handleMouseMove)
    // window.removeEventListener('mouseup', handleMouseUp)
    positionRef.current = {
      startX: null,
      startScrollX: null,
    }
  }
  const headerHeight = 40
  const menuWidth = 300
  return (
    <ClientOnly>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[pink]" ref={windowRef}>
        <div
          className="flex overflow-hidden bg-[green]"
          style={{
            height: headerHeight,
          }}
        >
          <div>123</div>
          <div className="grow"></div>
          <div>444</div>
        </div>
        <div
          className="absolute top-0 left-0 right-0 flex flex-wrap"
          style={{
            marginTop: headerHeight,
            marginRight: isMenu ? menuWidth : 0,
          }}
          ref={boardHeaderRef}
        >
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div className="grow"></div>
          <div>
            <Button
              onClick={() => {
                setIsMenu(!isMenu)
                setTimeout(() => {
                  setHasMenu(!hasMenu)
                })
              }}
            >
              {isMenu ? 'Close' : 'Open'}
            </Button>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          marginTop: headerHeight + boardHeaderHeight,
        }}
        // onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
      >
        <ReactWindowBoard
          height={windowHeight - (headerHeight + boardHeaderHeight)}
          right={isMenu ? menuWidth : 0}
        />
      </div>
      {isMenu && (
        <div
          className="fixed top-0 right-0 bottom-0"
          style={{
            marginTop: headerHeight,
          }}
        >
          <div
            className="absolute top-0 right-0 bottom-0 z-[1000] flex flex-col bg-[gray]"
            style={{
              width: menuWidth,
            }}
          >
            <div className="">
              <h3>Menu</h3>
            </div>
            <div className="grow"></div>
            <div className="">
              <Button
                onClick={() =>
                  Modal.confirm({
                    content: 'REALLY?' + `${windowHeight - (headerHeight + boardHeaderHeight)}`,
                  })
                }
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </ClientOnly>
  )
}

export default TryReactWindowBoardPage
