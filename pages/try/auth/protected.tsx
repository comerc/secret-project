import React from 'react'
import { useSession } from 'next-auth/react'
import Layout from '.../components/try/Layout'
import AccessDenied from '.../components/try/AccessDenied'

export default function ProtectedPage() {
  const { data: session } = useSession()
  const [content, setContent] = React.useState()

  // Fetch content from protected route
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? '\u00a0'}</strong>
      </p>
    </Layout>
  )
}

// export default function ProtectedPage() {
//   return <div>ProtectedPage</div>
// }
