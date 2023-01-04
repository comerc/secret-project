// import type { AppProps } from 'next/app'
// import { ApolloProvider } from "@apollo/client"
// import client from ".../repositories/apollo"
// import '.../styles/globals.css'

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <ApolloProvider client={client}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   )
// }

import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import client from '.../repositories/apollo'
import 'antd/dist/reset.css'
// import 'tailwindcss/tailwind.css'
// import '.../styles/vars.css'
import '.../styles/globals.css'
import '.../styles/auth.css'
import '.../styles/antd.css'

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
function MyApp({ Component, pageProps: { session, ...pageProps }, cache }) {
  return (
    <ConfigProvider
      theme={{
        // hashed: false,
        token: {
          colorPrimary: 'orange',
        },
      }}
    >
      <StyleProvider cache={cache} hashPriority="high">
        <SessionProvider session={session}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </SessionProvider>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default MyApp
