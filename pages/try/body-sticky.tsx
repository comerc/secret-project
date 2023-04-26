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
  return (
    <ClientOnly>
      <div>
        <div id="container" className="h-screen w-max bg-slate-200">
          <div id="header" className="sticky left-0 w-screen bg-slate-300">
            Header <br />
            Menu
          </div>
          <div id="scroll">{generateSentence(10)}</div>
        </div>
      </div>
    </ClientOnly>
  )
}

export default TryBodyStickyPage
