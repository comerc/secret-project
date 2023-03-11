import React from 'react'
import ClientOnly from '.../components/ClientOnly'
import generateSentence from '.../utils/generateSentence'
import { OverlayScrollbars } from 'overlayscrollbars'

function TryOverlayScrollbarsPage() {
  // const osInstance = OverlayScrollbars(document.querySelector('#myElement'), {})
  React.useEffect(() => {
    OverlayScrollbars(document.body, {
      overflow: {
        // x: 'scroll',
        y: 'hidden',
      },
      // paddingAbsolute: true,
      // // showNativeOverlaidScrollbars: true,
      // scrollbars: {
      //   theme: 'os-theme-dark',
      //   visibility: 'auto',
      //   autoHide: 'never',
      //   autoHideDelay: 1300,
      //   dragScroll: true,
      //   clickScroll: false,
      //   pointers: ['mouse', 'touch', 'pen'],
      // },
    })
  }, [])
  return (
    <ClientOnly>
      <div className="mx-4 h-full w-[2000px] overflow-y-scroll">{generateSentence(1000)}</div>
    </ClientOnly>
  )
}

export default TryOverlayScrollbarsPage
