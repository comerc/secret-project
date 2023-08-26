import { useSubscription } from '@apollo/client'
import { graphql as gql } from 'generated/gql'

const SUB_USERS = gql(`#graphql
  subscription SubUsers($limit: Int!) {
    users(limit: $limit) {
      id
      name
    }
  }
`)

function TrySubPage() {
  // `data` is typed!
  const { loading, error, data } = useSubscription(SUB_USERS, {
    variables: { limit: 3 },
  })
  if (error) return <p>Error : {error.message}</p>
  if (loading) return <p>Loading...</p>
  return (
    <div>
      {data?.users.map((member) => (
        <p key={member.id}>{member.name}</p>
      ))}
    </div>
  )
}

export default TrySubPage
