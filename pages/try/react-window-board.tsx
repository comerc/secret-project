import React from 'react'
import ReactWindowBoard from '.../components/try/ReactWindowBoard'
// import { resetServerContext } from 'react-beautiful-dnd'
import ClientOnly from '.../components/ClientOnly'
import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars'
import AutoSizer from 'react-virtualized-auto-sizer'

export const getServerSideProps = async ({ query }) => {
  // resetServerContext() // https://github.com/hello-pangea/dnd/commit/bcb66d32683519fb09f6a651ec2a0f63bd90d304
  return { props: {} }
}

function TryReactWindowBoardPage() {
  React.useEffect(() => {
    OverlayScrollbars.plugin(ClickScrollPlugin)
    OverlayScrollbars(document.body, {
      overflow: {
        x: 'scroll',
        y: 'hidden',
      },
      // paddingAbsolute: true,
      // showNativeOverlaidScrollbars: true,
      scrollbars: {
        theme: 'os-theme-light',
        visibility: 'auto',
        autoHide: 'never',
        autoHideDelay: 1300,
        dragScroll: true,
        clickScroll: true,
        pointers: ['mouse', 'touch', 'pen'],
      },
    })
    // window.addEventListener('mousedown', handleMouseDown)
    // window.addEventListener('mouseup', handleMouseUp)
    // window.addEventListener('mousemove', handleMouseMove)
  }, [])
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
  return (
    <ClientOnly>
      <AutoSizer>
        {({ height, width }) => (
          <>
            <div className="fixed top-0 left-0 right-0 z-[1000]">
              {/* <div className="relative"> */}
              {/* <div
                className="absolute top-0 left-0 flex w-[300px] flex-col bg-[orange] pt-10"
                style={{ height }}
              >
                <div className="">123</div>
                <div className="grow"></div>
                <div className="">123</div>
              </div> */}
              <div
                className="absolute top-0 right-0 flex w-[300px] flex-col bg-[pink] pt-10"
                style={{ height }}
              >
                <div className="">123</div>
                <div className="grow"></div>
                <div className="">123</div>
              </div>
              <div className="absolute top-0 left-0 right-0 flex h-10 bg-[green]">
                <div className="">123</div>
                <div className="grow"></div>
                <div className="">123</div>
              </div>
              {/* </div> */}
            </div>
            <div
              className="pt-10"
              style={{
                height,
                width,
              }}
              // onMouseDown={handleMouseDown}
              // onMouseMove={handleMouseMove}
            >
              <ReactWindowBoard height={height - 40} right={300} />
            </div>
          </>
        )}
      </AutoSizer>
    </ClientOnly>
  )
}

// {/* <div className="relative h-full w-full">
//   <div className="fixed top-0 left-0 right-0 ">
//     <div className="absolute top-0 left-0 bottom-0 bg-[blue]">321</div>
//   </div> */}
// {/* </div> */}

export default TryReactWindowBoardPage
