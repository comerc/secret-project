import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createCache, extractStyle } from '@ant-design/cssinjs'

// TODO: [Antd v5] support css-in-js in shadowdom https://github.com/ant-design/ant-design/issues/38911

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
              __html: `</script>${extractStyle(cache)}<script>`,
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
          className="body-dark-board-background"
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
        </body>
      </Html>
    )
  }
}

export default MyDocument
