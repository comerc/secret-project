import Layout from '.../components/try/Layout'

export default function ApiExamplePage() {
  return (
    <Layout>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      <p>
        <em>You must be signed in to see responses.</em>
      </p>
      <h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe className="w-1/3 border-2" src="/api/examples/session" />
      <br />
      <h2>JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <iframe className="w-1/3 border-2" src="/api/examples/jwt" />
    </Layout>
  )
}
