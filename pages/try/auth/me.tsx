import { useSession } from 'next-auth/react'
import Layout from '.../components/try/Layout'

export default function MePage() {
  const { data } = useSession()

  return (
    <Layout>
      <div className="border-2 text-left">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  )
}

// export default function MePage() {
//   return <div>MePage</div>
// }
