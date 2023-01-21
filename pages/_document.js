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
    return (
      <Html>
        <Head />
        <body>
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
