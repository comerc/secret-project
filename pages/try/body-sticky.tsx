import React from 'react'
import ClientOnly from '.../components/ClientOnly'
import generateSentence from '.../utils/generateSentence'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

// !! set css:
// body { width: unset; }

function TryBodyStickyPage() {
  const [initialize, osInstance] = useOverlayScrollbars({
    options: {
      overflow: {
        x: 'scroll',
        y: 'hidden',
      },
      scrollbars: {
        theme: 'os-theme-dark',
        visibility: 'auto',
        autoHide: 'never',
        // autoHideDelay: 1300,
        dragScroll: true,
        clickScroll: true,
        pointers: ['mouse', 'touch', 'pen'],
      },
    },
    // events,
    defer: true,
  })
  React.useEffect(() => {
    initialize(document.body)
  }, [initialize])
  const MAIN_HEADER_HEIGHT = 48
  const MENU_WIDTH = 100
  return (
    <ClientOnly>
      <div>
        <div id="container" className="flex h-screen w-max flex-col">
          <div
            id="main-header"
            className="sticky left-0 w-screen bg-slate-100"
            style={{ height: MAIN_HEADER_HEIGHT }}
          >
            <b>Main Header</b> {generateSentence(3)}
          </div>
          <div
            id="board-header"
            className="sticky left-0 w-screen bg-slate-200"
            style={{ paddingRight: MENU_WIDTH }}
          >
            <b>Board Header</b> {generateSentence(3)}
          </div>
          <div id="board-scroll" className="grow bg-slate-300">
            <b>Board Scroll</b> {generateSentence(3)}
          </div>
        </div>
        <div
          id="menu"
          className="fixed bottom-0 right-0 z-[10000] bg-slate-400"
          style={{ top: MAIN_HEADER_HEIGHT, width: MENU_WIDTH }}
        >
          Menu
        </div>
      </div>
    </ClientOnly>
  )
}

export default TryBodyStickyPage
