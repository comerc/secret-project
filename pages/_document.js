import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createCache, extractStyle } from '@ant-design/cssinjs'
import { MENU_WIDTH, COLUMN_FOOTER_HEIGHT } from '.../constants'

// TODO: [Antd v5] support css-in-js in shadowdom https://github.com/ant-design/ant-design/issues/38911

// TODO: fonts-constructor https://gwfh.mranftl.com/fonts/bellota?subsets=cyrillic,latin

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} cache={cache} />,
      })
    const initialProps = await Document.getInitialProps(ctx)
    // console.log(initialProps.styles)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* This is hack, `extractStyle` does not currently support returning JSX or related data. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `</script>${extractStyle(cache)}
              <link rel="preload" href="/fonts/bellota-v16-cyrillic_latin-regular.woff" as="font" type="font/woff" crossorigin />
              <link rel="preload" href="/fonts/bellota-v16-cyrillic_latin-regular.woff2" as="font" type="font/woff2" crossorigin />
              <script>`,
            }}
          />
        </>
      ),
    }
  }
  render() {
    // const { breadcrumbs } = this.props.__NEXT_DATA__.query
    return (
      <Html>
        <Head />
        <body
          className="body-dark-board-background root hide-system-scrollbar"
          style={{
            '--dynamic-background': 'hsla(0, 0%, 0%, 0.16)',
            '--dynamic-button': 'rgba(255, 255, 255, 0.2)',
            '--dynamic-button-hovered': 'rgba(255, 255, 255, 0.3)',
            '--dynamic-button-pressed': 'rgba(255, 255, 255, 0.4)',
            '--dynamic-button-highlighted': '#DFE1E6',
            '--dynamic-button-highlighted-text': '#172B4D',
            '--dynamic-button-highlighted-hovered': '#FFFFFF',
            '--dynamic-icon': '#ffffff',
            '--dynamic-text': '#ffffff',
            '--dynamic-text-transparent': 'hsla(0, 0%, 100%, 0.16)',
            '--dynamic-background-transparent': 'hsla(0, 0%, 0%, 0.16)',
            '--menu-width': `${MENU_WIDTH}px`,
            '--body-dark-board-background': '#cd5a91',
            '--column-footer-height': `${COLUMN_FOOTER_HEIGHT}px`,
          }}
        >
          <div id="nocss">
            Your browser was unable to load all of resources. They may have been blocked by your
            firewall, proxy or browser configuration.
            <br />
            Press Ctrl+F5 or Ctrl+Shift+R to have your browser try again and if that doesn't work.
            <hr />
          </div>
          <Main />
          <NextScript />
          {/* <link type="text/css" href="path/to/overlayscrollbars.css" rel="stylesheet" /> */}
          {/* <script
            src="https://cdnjs.cloudflare.com/ajax/libs/overlayscrollbars/2.1.0/browser/overlayscrollbars.browser.es6.min.js"
            integrity="sha512-1ZEhZBqxxLcq+dqd/djJm4jmpuT2qvHvsLGHkvKbCwde7AN6uz+WSIQpEOmDirXOrbeUIy0hbgajST3wtykKNw=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          ></script> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
